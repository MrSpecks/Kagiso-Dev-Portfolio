import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js"; // Assumes you have this setup to connect to Supabase
import { v4 as uuidv4 } from "uuid";
import https from "https"; 

// Initialize API constants from environment variables
const JINA_API_KEY = process.env.VERCEL_JINA_API_KEY || process.env.JINA_API_KEY; // Updated to check Vercel prefix

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

const metaFacts3 = [
// --- NEW PROJECT FACTS ---
    {
        title: "AI-Generated Company Brochure Builder (Sep 2025)",
        content: "Built a system that **automatically scrapes company websites** (identifying sections like About, Careers, Customers, etc.) and uses **GPT-4o-mini** to generate tailored brochures in real time, adapting tone (professional, humorous, promotional). **Impact:** Reduced brochure creation time by **80%**, lowered marketing costs, and ensured **brand consistency** by extracting messaging directly from official sources. Scalable for sales, recruitment, and proposal generation workflows."
    },
    {
        title: "AI-Powered Code Explainer – Interactive Developer Assistant (Sep 2025)",
        content: "Designed an intelligent assistant using **OpenAI's GPT-4o-mini** for **real-time, step-by-step code explanations** inside **Jupyter Notebooks**. Leveraged streaming responses for dynamic UX. **Impact:** Cut developer onboarding time by up to **50%** by enabling real-time Q&A on codebases, boosting team productivity with instant explanations, and creating a foundation for enterprise-grade internal documentation tools."
    },
    {
        title: "Website Scraper & Summarizer (Sep 2025)",
        content: "Developed a **Python-powered tool** that scrapes websites and delivers concise, **AI-generated summaries**. Integrates **BeautifulSoup** for clean data extraction and **Ollama's LLaMA 3.2** for **local LLM-powered summarization**, ensuring **privacy-first AI**. **Impact:** Increased research efficiency by up to **70%**, improved decision-making speed for analysts, and is a scalable foundation for competitive intelligence and content monitoring dashboards."
    },
    {
        title: "CMS Reconnaissance & Webshell Payload Generator (Feb 2025 - Mar 2025)",
        content: "Developed an **asynchronous Python-based reconnaissance system** using **aiohttp** for high-performance concurrent requests. It automates the detection of backend technologies and logs results in a structured **JSON** format, including a custom tech stack detection module. **Impact:** Accelerated penetration testing workflows by up to **60%**, improved recon accuracy, and enabled security engineers to scan and prepare payloads across hundreds of targets in parallel."
    },
];

// --- 3. Main Embedding Logic ---

/**
 * Creates an embedding for each meta fact and uploads it to Supabase.
 */
async function embedMetaFacts3() {
    let successCount = 0;
    let failureCount = 0;
    const totalCount = metaFacts3.length;

    console.log(`Starting embedding process for ${totalCount} meta facts...`);

    for (const fact of metaFacts3) {
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

embedMetaFacts3();