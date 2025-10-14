import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import https from "https"; // Import the native https module

// Initialize API constants from environment variables
const JINA_API_KEY = process.env.JINA_API_KEY;

// --- Jina API Helper Function (Copied from embed_processor.js) ---

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
                'Authorization': `Bearer ${JINA_API_KEY}`
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

// Static content derived from manually scraped Certifications page,
// bypassing the empty content issue from reading the live component file.
const STATIC_CERTIFICATIONS_CONTENT = `
Oracle Autonomous Database 2025 Certified Professional
Oracle
October 2025
Professional Oracle certification in deploying, managing, and optimizing Autonomous Databases with AI-driven performance and automation.`;

/**
 * Ensures the content is a single, clean string with minimal whitespace.
 * (Note: This function is simplified since the input is already clean text.)
 * @param {string} rawTextContent The static text content.
 * @returns {string} The final cleaned, text-only content.
 */
function cleanContent(rawTextContent) {
    let cleanText = rawTextContent;
    cleanText = cleanText.replace(/[\r\n]+/g, ' ');
    cleanText = cleanText.replace(/\s+/g, ' ').trim(); 
    return cleanText;
}

// --- Main Embedding Function ---

async function embedCertificationsPage() {
    try {
        console.log("Cleaning and Embedding Certifications page content...");

        // Use the static, complete text content
        const cleanedContent = cleanContent(STATIC_CERTIFICATIONS_CONTENT);
        
        if (!cleanedContent) {
            console.warn("Cleaned content is empty. Skipping embedding.");
            return;
        }

        // Use the new custom function to get the embedding (Replaced OpenAI call)
        const embedding = await getJinaEmbedding(cleanedContent);

        // Store the CLEANED content in the database
        const { data, error } = await supabase.from("embeddings").insert({
            id: uuidv4(),
            source_type: "certifications_page",
            source_id: "certifications",
            content: cleanedContent, // IMPORTANT: Using cleanedContent
            embedding,
        });

        if (error) throw error;

        console.log("Certifications page embedded successfully!");
        console.log(`\n--- Cleaned Content Summary (${cleanedContent.length} chars) ---`);
        console.log(cleanedContent.substring(0, 500) + '...');
        console.log(`Embedding dimensions: ${embedding.length}`);

    } catch (err) {
        console.error("Error embedding Certifications page:", err.message);
    }
}

embedCertificationsPage();
