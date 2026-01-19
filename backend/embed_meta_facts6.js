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

const metaFacts6 = [
  // --- PORTFOLIO & PERSONAL FACTS ---
  {
    title: "Kagiso Mfusi: Core Identity & Value Proposition",
    content:
      "Kagiso Mfusi is an AI Automation Architect and Multicloud & AI Systems Engineer. His core value proposition is designing AI automation systems that eliminate manual work and scale operations. He uniquely combines deep enterprise operational context, gained from over 9,700 hours in banking, with technical expertise in AI engineering, cloud architecture, and end-to-end delivery. He believes AI and cloud are not separate problems but interconnected parts of a single architecture.",
  },
  {
    title: "Kagiso Mfusi: Key Technical Skills & Expertise",
    content:
      "Kagiso's technical expertise is focused on AI and cloud. Core skills include: AI Engineering (RAG pipelines, Gen AI, LLM integration), Cloud Architecture (multicloud systems, serverless), and Full-Stack Development (React, Next.js, TypeScript, Tailwind, Python, Supabase). His expertise is validated by 33 certifications, including Oracle Certified Multicloud Architect Professional and Microsoft Certified: Azure Fundamentals (AZ-900).",
  },
  {
    title: "Kagiso Mfusi: Career Journey & Impact",
    content:
      "Kagiso's career transitioned from Client Services at First National Bank (FNB) (2019-2023) to a Full-Stack & AI Systems Engineer at SPS Software (2025-Present). This journey provides him with a unique ability to connect deep operational pain points to high-level technical solutions. His work has shown measurable impact, such as an 85% reduction in manual document analysis time and 95% accuracy in entity extraction.",
  },
  {
    title: "Project: Personal Portfolio RAG Agent (Internal)",
    content:
      "The portfolio website itself includes its own RAG agent to answer user questions. This agent demonstrates mastery of the full-stack AI pipeline. It uses Jina-v3 for vector embeddings, Supabase with pgvector for storage and similarity search, and a Vercel Serverless Function for deployment. It also features a continuous learning feedback loop by logging unfamiliar questions to Supabase.",
  },
  // --- AI DOCUMENT INTELLIGENCE PLATFORM FACTS ---
  {
    title: "Project: AI Document Intelligence Platform (Overview & Tech Stack)",
    content:
      "The AI Document Intelligence Platform is Kagiso's flagship project. It's a production-grade, SaaS-ready RAG platform that transforms unstructured documents (like PDFs, DOCX, and images) into structured, actionable intelligence. The tech stack includes Next.js 14 (App Router), TypeScript, Supabase (Postgres + pgvector), and OpenRouter for LLM requests. It's designed for enterprise use, turning documents into intelligence.",
  },
  {
    title: "Project: AI Document Intelligence Platform (Key Features)",
    content:
      "Key features of the AI Document Intelligence Platform include: 1) Ingestion of PDF, DOCX, TXT, and images (with OCR fallback). 2) A credit-based usage and subscription model, monetized with Paystack for South African businesses. 3) Enterprise-grade security, including Role-Based Access Control (RBAC) for user/admin paths and Row-Level Security (RLS) for data isolation. 4) A carefully engineered RAG pipeline for grounded, structured JSON insights.",
  },
  {
    title: "Project: AI Document Intelligence Platform (AI & RAG System)",
    content:
      "The AI system for the Document Intelligence Platform uses a 1000-token chunking strategy with overlap for context continuity. It performs Top-K retrieval from pgvector and uses context assembly with domain-specific prompts (e.g., for invoices, CVs) to generate structured JSON output. This RAG pipeline ensures responses are grounded and data is actionable.",
  },
  {
    title: "Project: AI Document Intelligence Platform (Security Design)",
    content:
      "Security is a core design principle for the AI Document Intelligence Platform. It enforces data isolation using Supabase's Row-Level Security (RLS) policies. The Supabase service role key is never embedded in client-side code; admin features safely use a service-role client on the server to bypass RLS for administrative tasks.",
  },
  // --- OTHER PROJECT FACTS ---
  {
    title: "Kagiso Mfusi: Other Notable Projects",
    content:
      "Besides the AI Document Platform, Kagiso has built: 1) An Interactive Ames Housing Market Dashboard using Python, Streamlit, and Plotly for data visualization. 2) An AI Brochure Maker that scrapes websites (BeautifulSoup) and generates content (OpenAI API). 3) An AI Q&A Code Assistant for real-time explanations in Jupyter Notebooks. 4) A Property Reviews Dashboard using React and TypeScript.",
  },
];

// --- 3. Main Embedding Logic ---

/**
 * Creates an embedding for each meta fact and uploads it to Supabase.
 */
async function embedMetaFacts6() {
  let successCount = 0;
  let failureCount = 0;
  const totalCount = metaFacts6.length;

  console.log(`Starting embedding process for ${totalCount} meta facts...`);

  for (const fact of metaFacts6) {
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

embedMetaFacts6();