import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js"; // Assumes you have this setup to connect to Supabase
import { v4 as uuidv4 } from "uuid";
import https from "https"; 

// Initialize API constants from environment variables
const JINA_API_KEY = process.env.JINA_API_KEY;

// --- 1. Jina API Helper Function ---

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

        // CRITICAL: Ensure the 'task' matches the protocol used for other documents.
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

// --- 2. Anchor Chunks Definition ---

const metaFacts = [
    {
        title: "Quantitative Summary",
        content: "Kagiso Mfusi's quantitative professional summary is as follows: Kagiso has **31 total certifications earned** across AI, cloud infrastructure, and software development, which includes key expertise in Oracle AI, Microsoft Azure, and Python Machine Learning. Kagiso has **8+ projects completed and showcased** in the portfolio, including the Personal Portfolio RAG Agent, an AI Brochure Maker, and an OSINT Reconnaissance Tool. Kagiso has **7+ years of total experience** in systems development, cloud architecture, and full-stack development, with specialization in LLM engineering."
    },
    {
        title: "Core Specializations and Tech Stack",
        content: "Kagiso's core specializations and technical expertise lie at the intersection of **AI & Systems Development** and **Cloud Infrastructure**. Primary technologies include **Python, TypeScript, React, Next.js, and Node.js**. Cloud and DevOps proficiency covers **Azure, Docker, CI/CD, and Supabase**. Core methodologies include **LLM Engineering, Generative AI, RAG Pipeline implementation, and Agentic AI** architectures, alongside strong foundational skills in **PostgreSQL, Java, and Tailwind CSS** for full-stack delivery."
    },
    {
        title: "Contact and Location Details",
        content: "Kagiso Mfusi's primary contact information is: Email: **kagisomfusi@outlook.com**. Phone: **+27 (075) 130-4807**. Location: **Johannesburg, GP**. Kagiso is available for collaboration and typically responds to messages **within 24 hours**. For urgent matters, reaching out via phone or LinkedIn is recommended."
    }
];

// --- 3. Main Embedding Logic ---

/**
 * Creates an embedding for each meta fact and uploads it to Supabase.
 */
async function embedMetaFacts() {
    let successCount = 0;
    let failureCount = 0;
    const totalCount = metaFacts.length;

    console.log(`Starting embedding process for ${totalCount} meta facts...`);

    for (const fact of metaFacts) {
        // Use a unique ID for each meta fact
        const factId = uuidv4(); 
        try {
            console.log(`\t[INFO] Embedding: "${fact.title}"`);
            
            // 1. Create the embedding
            const embedding = await getJinaEmbedding(fact.content);

            // 2. Insert the data into the 'embeddings' table
            const { data, error } = await supabase.from("embeddings").insert({
                id: factId,
                // New, specific source type for these high-value chunks
                source_type: "meta_fact", 
                source_id: factId, // Use the unique UUID as the source ID
                content: fact.content,
                embedding,
            });

            if (error) {
                throw error;
            }

            console.log(`\t[SUCCESS] Embedded: "${fact.title}" (ID: ${factId})`);
            successCount++;

        } catch (err) {
            console.error(`\t[FAILURE] Error embedding "${fact.title}" (ID: ${factId}):`, err.message || err);
            failureCount++;
        }
    }

    console.log("--- Meta Facts Embedding Summary ---");
    console.log(`Total records processed: ${totalCount}`);
    console.log(`Successfully embedded: ${successCount}`);
    console.log(`Failed to embed: ${failureCount}`);
    console.log("------------------------------------");
}

embedMetaFacts();
