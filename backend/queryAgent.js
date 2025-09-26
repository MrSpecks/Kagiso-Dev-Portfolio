import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import fetch from "node-fetch";
import OpenAI from "openai";

// ----- CONFIG -----
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const TOP_K = 5; // number of embeddings to retrieve

// Validate API keys
if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set in environment variables.");
}
if (!HUGGINGFACE_API_KEY) {
  console.error("HUGGINGFACE_API_KEY is not set in environment variables.");
}
if (!OPENROUTER_API_KEY) {
  console.error("OPENROUTER_API_KEY is not set in environment variables.");
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const openrouter = new OpenAI({ apiKey: OPENROUTER_API_KEY, baseURL: "https://openrouter.ai/api/v1" });

// ----- HELPERS -----

// Get embedding from Hugging Face API
async function getEmbedding(text) {
  if (!HUGGINGFACE_API_KEY) {
    throw new Error("HUGGINGFACE_API_KEY is not configured.");
  }
  const res = await fetch(`https://api-inference.huggingface.co/embeddings/${EMBEDDING_MODEL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  });
  const data = await res.json();
  if (data.error) {
    console.error("Hugging Face Embedding API Error:", data.error);
    throw new Error(`Hugging Face Embedding API Error: ${data.error}`);
  }
  return data.embedding;
}

// Cosine similarity between two vectors
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

// Retrieve top-K relevant embeddings from Supabase
async function getRelevantEmbeddings(query, topK = TOP_K) {
  try {
    const queryEmbedding = await getEmbedding(query);

    const { data: embeddings, error } = await supabase
      .from("embeddings")
      .select("id, source_type, source_id, content, embedding");

    if (error) {
      console.error("Supabase Embedding Fetch Error:", error);
      throw new Error(`Supabase Embedding Fetch Error: ${error.message}`);
    }

    const scored = embeddings.map((row) => ({
      ...row,
      score: cosineSimilarity(queryEmbedding, row.embedding),
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, topK);
  } catch (err) {
    console.error("Error in getRelevantEmbeddings:", err);
    throw err; // Re-throw to be caught by askAgent
  }
}

// Build context string for LLM
function buildContext(relevantChunks) {
  return relevantChunks.map((chunk) => `[${chunk.source_type} - ${chunk.source_id}]: ${chunk.content}`).join("\n\n");
}

// ----- MAIN FUNCTION -----

export async function askAgent(question) {
  try {
    // 1. Retrieve top embeddings
    const topChunks = await getRelevantEmbeddings(question);

    // 2. Build context
    const context = buildContext(topChunks);

    // 3. Query LLM
    if (!OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not configured for LLM calls.");
    }
    const response = await openrouter.chat.completions.create({
      model: "meta-llama/llama-3.3-8b-instruct:free",
      messages: [
        { role: "system", content: "You are a helpful AI assistant that answers questions based on the provided context. If you do not know an answer to something you say you don't know." },
        { role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content;

  } catch (err) {
    console.error("Error in askAgent:", err);
    // Return a more user-friendly error message
    return `Error contacting AI agent: ${err.message || "An unknown error occurred."}`;
  }
}

// ----- EXAMPLE USAGE -----
(async () => {
  const question = "Show me my certifications";
  const answer = await askAgent(question);
  console.log("Agent answer:\n", answer);
})();