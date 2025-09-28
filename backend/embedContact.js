import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Initialize OpenAI client with API key from environment variables
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    // Remove component function definitions (e.g., const Contact = () => {)
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


async function embedContact() {
    try {
        // Path to your Contact.tsx page
        const contactPath = path.join("../src/pages/Contact.tsx");
        const rawContactContent = fs.readFileSync(contactPath, "utf-8");

        console.log("Cleaning and Embedding Contact page content...");

        // Apply the cleaning function here!
        const cleanedContent = cleanCodeForRAG(rawContactContent);
        
        // Check if content is empty after cleaning (if so, skip embedding)
        if (!cleanedContent) {
            console.warn("Cleaned content is empty. Skipping embedding.");
            return;
        }

        // Use the cleaned content for the embedding
        const embeddingResponse = await client.embeddings.create({
            model: "text-embedding-ada-002",
            input: cleanedContent, // IMPORTANT: Using cleanedContent for embedding
        });

        const embedding = embeddingResponse.data[0].embedding;

        // Store the CLEANED content in the database for the LLM to read later
        const { data, error } = await supabase.from("embeddings").insert({
            id: uuidv4(),
            source_type: "contact_page", // Updated source type
            source_id: "contact", // Updated source id
            content: cleanedContent, // IMPORTANT: Storing cleanedContent in the 'content' field
            embedding,
        });

        if (error) throw error;

        console.log("Contact page embedded successfully!");
        console.log(`\n--- Cleaned Content Summary (${cleanedContent.length} chars) ---`);
        console.log(cleanedContent.substring(0, 500) + '...');

    } catch (err) {
        console.error("Error embedding Contact page:", err);
    }
}

embedContact();
