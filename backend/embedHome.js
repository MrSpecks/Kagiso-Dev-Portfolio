import dotenv from "dotenv";
dotenv.config();

// Standard Node imports for file operations
import fs from "fs";
import path from "path";
import https from "https"; // Required for Jina API call

// Supabase and UUID imports
import { supabase } from "./supabaseClient.js"; // Assume this provides an initialized Supabase client
import { v4 as uuidv4 } from "uuid";

// Initialize API constants from environment variables
// NOTE: Ensure JINA_API_KEY is defined in your .env file
const JINA_API_KEY = process.env.JINA_API_KEY;

// --- Jina API Helper Function ---

/**
 * Fetches the embedding for a given text input using the Jina API.
 * @param {string} input The text content to embed.
 * @returns {Promise<number[]>} A promise that resolves to the embedding vector (array of numbers).
 */
async function getJinaEmbedding(input) {
    if (!JINA_API_KEY) {
        throw new Error("JINA_API_KEY is not set in environment variables.");
    }

    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.jina.ai',
            path: '/v1/embeddings',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JINA_API_KEY}`
            }
        };

        const payload = {
            "model": "jina-embeddings-v3",
            "task": "retrieval.passage",
            "input": [input]
        };

        const req = https.request(options, (res) => {
            let chunks = [];
            res.on('data', (d) => {
                chunks.push(d);
            });

            res.on('end', () => {
                const body = Buffer.concat(chunks).toString();

                if (res.statusCode !== 200) {
                    try {
                        const errorResult = JSON.parse(body);
                        return reject(new Error(`Jina API Error (${res.statusCode}): ${errorResult.detail || body}`));
                    } catch {
                        return reject(new Error(`Jina API Error (${res.statusCode}): ${body}`));
                    }
                }

                try {
                    const result = JSON.parse(body);
                    const embedding = result.data[0].embedding;
                    resolve(embedding);
                } catch (e) {
                    reject(new Error("Failed to parse Jina API response: " + e.message + "\nRaw Body: " + body));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(JSON.stringify(payload));
        req.end();
    });
}

// --- END: Jina API Helper Function ---

/**
 * Aggressively cleans raw TypeScript/JSX code content to produce dense,
 * human-readable text optimized for RAG embeddings.
 * @param {string} rawCodeContent The content of the .tsx file.
 * @returns {string} The cleaned, text-only content.
 */
function cleanCodeForRAG(rawCodeContent) {
    let cleanText = rawCodeContent;

    // --- 1. Remove Imports, Comments, and Setup ---
    // Remove all import statements (start with 'import' until ';')
    cleanText = cleanText.replace(/import\s+[^;]+;/g, '');
    // Remove single-line comments (//...)
    cleanText = cleanText.replace(/\/\/.*$/gm, '');
    // Remove multi-line comments (/*...*/)
    cleanText = cleanText.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove environment variable/API key placeholders
    cleanText = cleanText.replace(/process\.env\.[\w_]+/g, 'ENVIRONMENT_VARIABLE');

    // --- 2. Remove Component Logic and Dynamic State ---
    // Remove hooks and state declarations (e.g., useQuery, useState)
    cleanText = cleanText.replace(/const\s+\{[^}]+\}\s+=\s+use[^;]+;/g, '');
    cleanText = cleanText.replace(/const\s+[^=]+\s+=\s+\w+\(/g, ''); // Removes function calls like const data = fetchData(
    // Remove component function definitions (e.g., const Home = () => {)
    cleanText = cleanText.replace(/const\s+[^=]+\s*=\s*.*?\s*=>\s*\{/gs, '');

    // --- 3. Handle Structured Data (e.g., array definitions) ---
    const arrayContentMatch = cleanText.match(/const\s+\w+\s*=\s*\[[\s\S]*?\];/g);

    if (arrayContentMatch) {
        arrayContentMatch.forEach(match => {
            const arrayNameMatch = match.match(/const\s+(\w+)/);
            const arrayName = arrayNameMatch ? arrayNameMatch[1].toUpperCase() : 'PAGE_DATA';
            
            const structuredData = match
                .replace(/const\s+[^=]+\s*=\s*\[/, '')
                .replace(/\];?/g, '')
                .replace(/\{/g, ' - ')
                .replace(/\}/g, ' ')
                .replace(/\s+/g, ' ');

            cleanText = cleanText.replace(match, `\n-- START: ${arrayName} --\n${structuredData}\n-- END: ${arrayName} --\n`);
        });
    }

    // --- 4. IMPROVED: Extract Text from JSX and Remove Code/Tags ---
    // Remove the 'return (' and ');' wrapping the main JSX block to isolate content
    cleanText = cleanText.replace(/return\s*\(/g, ' '); 
    cleanText = cleanText.replace(/\);/g, ' '); 

    // Aggressively remove all angle brackets and their contents (JSX tags)
    cleanText = cleanText.replace(/<[^>]+>/g, '');
    
    // Remove all embedded JS expressions like {item.title}
    cleanText = cleanText.replace(/\{[^}]+\}/g, '');
    
    // Remove CSS class definitions or style attributes
    cleanText = cleanText.replace(/(class|style|className)=["'][^"']*["']/gi, '');

    // --- 5. Final Text Cleanup ---
    cleanText = cleanText.replace(/[;,\."':`]/g, ' ');
    cleanText = cleanText.replace(/function\s+\w+\s*\([^)]*\)\s*\{/g, '');
    cleanText = cleanText.replace(/[\r\n]+/g, ' ');
    cleanText = cleanText.replace(/\s+/g, ' ').trim(); 

    return cleanText;
}


async function embedHome() {
    let embedding = null;
    let lastError = null;

    try {
        // Path to your Home.tsx page
        const homePath = path.join("../src/pages/Home.tsx");
        const rawHomeContent = fs.readFileSync(homePath, "utf-8");

        console.log("Cleaning and Embedding Home page content...");

        // Apply the cleaning function here!
        const cleanedContent = cleanCodeForRAG(rawHomeContent);
        
        // Check if content is empty after cleaning (if so, skip embedding)
        if (!cleanedContent) {
            console.warn("Cleaned content is empty. Skipping embedding.");
            return;
        }

        // --- Embedding with Exponential Backoff (New Logic) ---
        const MAX_RETRIES = 5;
        let attempt = 0;
        
        while (attempt < MAX_RETRIES) {
            try {
                // Use the Jina API helper function
                embedding = await getJinaEmbedding(cleanedContent);
                console.log(`\t[SUCCESS] Embedding generated on attempt ${attempt + 1}.`);
                break; // Success!
            } catch (err) {
                lastError = err;
                attempt++;
                if (attempt >= MAX_RETRIES) {
                    console.error(`\t[FAILURE] Failed to embed Home page after ${MAX_RETRIES} attempts. Error:`, lastError.message || lastError);
                    // If max retries reached, we break and proceed to the final check (where embedding is null)
                    break;
                }
                // Wait using exponential backoff: 1s, 2s, 4s, 8s, 16s...
                const delay = Math.pow(2, attempt) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        
        if (!embedding) {
            // If embedding is still null after retries, skip database insert
            console.log("Skipping database insert due to embedding failure.");
            return;
        }
        
        // --- Database Insertion ---
        // Store the CLEANED content in the database for the LLM to read later
        const { error } = await supabase.from("embeddings").insert({
            id: uuidv4(),
            source_type: "home_page", // Updated source type
            source_id: "home", // Updated source id
            content: cleanedContent, // IMPORTANT: Storing cleanedContent in the 'content' field
            embedding,
        });

        if (error) throw error;

        console.log("Home page embedded successfully!");
        console.log(`\n--- Cleaned Content Summary (${cleanedContent.length} chars) ---`);
        console.log(cleanedContent.substring(0, 500) + '...');

    } catch (err) {
        // Catch errors from fetching file, cleaning, or database insert
        console.error("Critical Error embedding Home page:", err.message || err);
    }
}

embedHome();
