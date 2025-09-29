import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import https from "https"; // Import the native https module

// Initialize API constants from environment variables
const JINA_API_KEY = process.env.JINA_API_KEY;

// --- Jina API Helper Function ---

/**
 * Fetches the embedding for a given text input using the Jina API.
 * This function is wrapped in a Promise to allow async/await usage.
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
                'Authorization': `Bearer jina_b42afff6847940009eab9193fd3e7d59LTIJadBhOPfXArOw7hhWBY2bqYpA`
            }
        };

        // The API expects an array of inputs, even for a single string.
        const payload = {
            "model": "jina-embeddings-v3", // Using a stable model name
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
                    // Extract the embedding array from the first result object
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

// --- Data Cleaning Logic ---

/**
 * Aggressively cleans raw TypeScript/JSX code content to produce dense,
 * human-readable text optimized for RAG embeddings.
 * @param {string} rawCodeContent The content of the .tsx file.
 * @returns {string} The cleaned, text-only content.
 */
function cleanCodeForRAG(rawCodeContent) {
    let cleanText = rawCodeContent;

    // --- 1. Remove Imports, Comments, and Setup ---
    cleanText = cleanText.replace(/import\s+[^;]+;/g, '');
    cleanText = cleanText.replace(/\/\/.*$/gm, '');
    cleanText = cleanText.replace(/\/\*[\s\S]*?\*\//g, '');
    cleanText = cleanText.replace(/process\.env\.[\w_]+/g, 'ENVIRONMENT_VARIABLE');

    // --- 2. Remove Component Logic and Dynamic State ---
    cleanText = cleanText.replace(/const\s+\{[^}]+\}\s+=\s+use[^;]+;/g, '');
    cleanText = cleanText.replace(/const\s+[^=]+\s+=\s+\w+\(/g, '');
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

// --- Main Embedding Function ---

async function embedContact() {
    try {
        // Path to your Contact.tsx page
        const contactPath = path.join("../src/pages/Contact.tsx");
        const rawContactContent = fs.readFileSync(contactPath, "utf-8");

        console.log("Cleaning and Embedding Contact page content...");

        // Apply the cleaning function
        const cleanedContent = cleanCodeForRAG(rawContactContent);
        
        // Check if content is empty after cleaning
        if (!cleanedContent) {
            console.warn("Cleaned content is empty. Skipping embedding.");
            return;
        }

        // Use the new custom function to get the embedding
        const embedding = await getJinaEmbedding(cleanedContent);

        // Store the CLEANED content in the database for the LLM to read later
        const { data, error } = await supabase.from("embeddings").insert({
            id: uuidv4(),
            source_type: "contact_page",
            source_id: "contact",
            content: cleanedContent, // Storing cleanedContent in the 'content' field
            embedding,
        });

        if (error) throw error;

        console.log("Contact page embedded successfully!");
        console.log(`\n--- Cleaned Content Summary (${cleanedContent.length} chars) ---`);
        console.log(cleanedContent.substring(0, 500) + '...');
        console.log(`Embedding dimensions: ${embedding.length}`);

    } catch (err) {
        console.error("Error embedding Contact page:", err);
    }
}

embedContact();
