import dotenv from "dotenv";
dotenv.config();

// Note: Using https for Jina API calls, removing the unused OpenAI import
import { supabase } from "./supabaseClient.js"; // Assume this provides an initialized Supabase client
import { v4 as uuidv4 } from "uuid";
import pdf from "pdf-parse";
import https from "https"; // Required for Jina API call

// Initialize API constants from environment variables
// NOTE: Ensure JINA_API_KEY is defined in your .env file
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
        // Configuration for the HTTPS request to the Jina API
        const options = {
            hostname: 'api.jina.ai',
            path: '/v1/embeddings',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JINA_API_KEY}`
            }
        };

        // The Jina API expects an array of inputs, even for a single string.
        const payload = {
            "model": "jina-embeddings-v3", // Updated model name
            "task": "retrieval.passage", // Updated task type for document chunks
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

// --- END: Jina API Helper Function ---

async function embedCV() {
  let failureCount = 0;

  try {
    console.log("Fetching CV from Supabase storage...");

    const { data, error } = await supabase.storage
      .from("Curriculum Vitae") // make sure the bucket name matches exactly
      .download("Kagiso Mfusi CV (09-2025-04).pdf"); // actual filename

    if (error) throw error;
    if (!data) throw new Error("No file data returned from Supabase");

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    const pdfData = await pdf(buffer);
    const text = pdfData.text;

    // Split text into manageable chunks
    const chunkSize = 1000; // characters
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    console.log(`Embedding ${chunks.length} chunks...`);

    // Embed each chunk with retry logic
    for (let i = 0; i < chunks.length; i++) {
      const chunkContent = chunks[i];
      const MAX_RETRIES = 5;
      let attempt = 0;
      let embedding = null;
      let lastError = null;

      while (attempt < MAX_RETRIES) {
        try {
          // 1. Create the embedding using Jina API
          embedding = await getJinaEmbedding(chunkContent);
          
          // Success, break out of retry loop
          break; 
        } catch (err) {
          lastError = err;
          attempt++;
          if (attempt >= MAX_RETRIES) {
            console.error(`\t[FAILURE] Failed to embed chunk ${i + 1} after ${MAX_RETRIES} attempts. Error:`, lastError.message || lastError);
            failureCount++;
            // Skip to the next chunk
            continue; 
          }
          // Wait using exponential backoff: 1s, 2s, 4s, 8s, 16s...
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      // Only proceed to database insertion if embedding was successfully generated
      if (embedding) {
        try {
          // 2. Insert the data into the 'embeddings' table
          const { error: insertError } = await supabase.from("embeddings").insert({
            id: uuidv4(),
            source_type: "cv",
            source_id: "cv_document",
            content: chunkContent,
            embedding: embedding, // 'embedding' is already the array of numbers
          });

          if (insertError) {
            throw insertError;
          }

          console.log(`\t[SUCCESS] Embedded chunk ${i + 1}/${chunks.length}`);
        } catch (err) {
          console.error(`\t[FAILURE] Database Error for chunk ${i + 1}:`, err.message || err);
          failureCount++;
        }
      }
    }

    if (failureCount === 0) {
      console.log("--- Summary ---");
      console.log(`CV embedded successfully! Total chunks: ${chunks.length}`);
    } else {
      console.log("--- Summary ---");
      console.log(`CV embedding completed with ${failureCount} failures.`);
    }

  } catch (err) {
    console.error("Critical Error embedding CV:", err.message || err);
  }
}

embedCV();
