import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import https from "https"; // Required for Jina API call

// Initialize API constants from environment variables
const JINA_API_KEY = process.env.JINA_API_KEY;

// --- Jina API Helper Function (Copied for self-containment) ---

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

// --- START: Injected JSON Data from certifications_rows.json ---
const certificationsData = [
  {
    "idx": 33,
    "id": "c7d8e9f0-a1b2-43c4-d5e6-f7a8b9c0d1e2", // Placeholder UUID for the new entry
    "title": "Oracle Autonomous Database Professional (2025)",
    "provider": "Oracle",
    "date_earned": "2025-10-01",
    "description": "Professional-level certification validating expertise in deploying, managing, and optimizing Oracle Autonomous Databases on OCI. Focus areas include automated scaling, backup and recovery, AI-driven performance tuning, Data Guard, and secure development using APEX, Machine Learning, and JSON, Text, Spatial, and Graph features.",
    "file_url": "https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Oracle%20Autonomous%20Database%20Professional%20(2025).pdf",
    "created_at": "2025-10-01 12:00:00.000000",
    "tags": "{\"OCI\",\"Autonomous Database\",\"Database Management\",\"AI-Driven Optimization\",\"Oracle APEX\",\"Machine Learning\"}"
}
];
// --- END: Injected JSON Data ---

/**
 * Creates an embedding for each certification entry and uploads it to Supabase.
 */
async function embedEachCertification() {
  let successCount = 0;
  let failureCount = 0;
  const totalCount = certificationsData.length;

  console.log(`Starting embedding process for ${totalCount} certifications...`);

  for (const cert of certificationsData) {
    try {
      // 1. Construct the content to be embedded
      // We combine the most descriptive fields into a single string.
      const contentToEmbed = `Certification: ${cert.title}. Provider: ${cert.provider}. Tags: ${cert.tags}. Description: ${cert.description}`;

      // 2. Create the embedding using the Jina API helper (Replaced OpenAI call)
      const embedding = await getJinaEmbedding(contentToEmbed);

      // 3. Insert the data into the 'embeddings' table
      const { data, error } = await supabase.from("embeddings").insert({
        // Use the existing unique ID from the certification data
        id: cert.id,
        // Specific source type for individual certification records
        source_type: "certification",
        // Use the same ID as the source ID for traceability
        source_id: cert.id,
        // Store the text content that was embedded
        content: contentToEmbed,
        // Store the generated embedding vector
        embedding,
      });

      if (error) {
        throw error;
      }

      console.log(`\t[SUCCESS] Embedded: "${cert.title}"`);
      successCount++;

    } catch (err) {
      console.error(`\t[FAILURE] Error embedding "${cert.title}" (ID: ${cert.id}):`, err.message || err);
      failureCount++;
    }
  }

  console.log("--- Embedding Summary ---");
  console.log(`Total records processed: ${totalCount}`);
  console.log(`Successfully embedded: ${successCount}`);
  console.log(`Failed to embed: ${failureCount}`);
  console.log("-------------------------");
}

embedEachCertification();
