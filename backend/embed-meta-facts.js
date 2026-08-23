import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js"; // Assumes you have this setup to connect to Supabase
import { v4 as uuidv4 } from "uuid";
import https from "https";

// Initialize API constants from environment variables
const JINA_API_KEY =
  process.env.VERCEL_JINA_API_KEY || process.env.JINA_API_KEY; // Updated to check Vercel prefix

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
      hostname: "api.jina.ai",
      path: "/v1/embeddings",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JINA_API_KEY}`,
      },
    };

    // CRITICAL: Ensure the 'task' matches the protocol used for other documents.
    const payload = {
      model: "jina-embeddings-v3",
      task: "retrieval.passage",
      input: [input],
    };

    const req = https.request(options, (res) => {
      let chunks = [];
      res.on("data", (d) => {
        chunks.push(d);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks).toString();

        if (res.statusCode !== 200) {
          try {
            const errorResult = JSON.parse(body);
            return reject(
              new Error(
                `Jina API Error (${res.statusCode}): ${
                  errorResult.detail || body
                }`
              )
            );
          } catch {
            return reject(new Error(`Jina API Error (${res.statusCode}): ${body}`));
          }
        }

        try {
          const result = JSON.parse(body);
          const embedding = result.data[0].embedding;
          resolve(embedding);
        } catch (e) {
          reject(
            new Error(
              "Failed to parse Jina API response: " +
                e.message +
                "\nRaw Body: " +
                body
            )
          );
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(JSON.stringify(payload));
    req.end();
  });
}

// --- 2. Anchor Chunks Definition ---

const misaveniFacts = [
  // --- MISAVENI PHARMACY WEBSITE PROJECT FACTS ---
  {
    title: "Project: Misaveni Pharmacy Website (Overview & Purpose)",
    content:
      "Misaveni Pharmacy is a real neighbourhood pharmacy in Etwatwa, Benoni, South Africa, that had no website before this project. Kagiso built it end-to-end as a production-ready 3-page brochure site: a landing page, a services page, and a contact page, with WhatsApp, click-to-call, and directions as the only contact mechanisms - no forms, no backend, no database, keeping the data-collection surface at zero by design.",
  },
  {
    title: "Project: Misaveni Pharmacy Website (Governed SDLC & Design System)",
    content:
      "The build followed a governed, gate-enforced software development lifecycle: Architecture Decision Records for key choices, an honestly-maintained alert register for open risks, and an automated quality-gate runner wired into CI that checks for raw colour literals outside the token file, accent-colour overuse, placeholder copy, and required legal links before any commit lands. The brand's colour palette was derived by programmatically pixel-sampling the client's own logo rather than guessing, then verified for accessible contrast.",
  },
  {
    title: "Project: Misaveni Pharmacy Website (Tech Stack & Compliance)",
    content:
      "Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion, deployed on Vercel. As a South African pharmacy, the site follows real content-compliance rules: no advertising of scheduled or prescription medicines, no health outcome claims, and a standing medical-advice disclaimer in the footer.",
  },
];

// --- 3. Main Embedding Logic ---

/**
 * Creates an embedding for each meta fact and uploads it to Supabase.
 */
async function embedMisaveniFacts() {
  let successCount = 0;
  let failureCount = 0;
  const totalCount = misaveniFacts.length;

  console.log(`Starting embedding process for ${totalCount} meta facts...`);

  for (const fact of misaveniFacts) {
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
      console.error(
        `\t[FAILURE] Error embedding "${fact.title}" (ID: ${factId}):`,
        err.message || err
      );
      failureCount++;
    }
  }

  console.log("--- Meta Facts Embedding Summary ---");
  console.log(`Total records processed: ${totalCount}`);
  console.log(`Successfully embedded: ${successCount}`);
  console.log(`Failed to embed: ${failureCount}`);
  console.log("------------------------------------");
}

embedMisaveniFacts();
