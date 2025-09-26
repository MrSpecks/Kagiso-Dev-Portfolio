import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import fetch from "node-fetch"; // required if using Hugging Face Inference API

// Hugging Face Inference API setup
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";

// Helper to get embedding from Hugging Face
async function getEmbedding(text) {
  return fetch(`https://api-inference.huggingface.co/embeddings/${EMBEDDING_MODEL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  })
  .then(response => response.json())
  .then(result => {
    if (result.error){
    console.error("HF Embedding Response:", result);
    throw new Error(result.error);
    }
    return result.embedding;
  });
}

// Compute cosine similarity
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

export async function queryRAG(query, topK = 5) {
  try {
    // Step 1: Get query embedding
    const queryEmbedding = await getEmbedding(query);

    // Step 2: Fetch all embeddings from Supabase
    const { data: embeddings, error } = await supabase
      .from("embeddings")
      .select("id, source_type, source_id, content, embedding");

    if (error) throw error;

    // Step 3: Compute similarities
    const scored = embeddings.map((row) => ({
      ...row,
      score: cosineSimilarity(queryEmbedding, row.embedding),
    }));

    // Step 4: Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Step 5: Return top K
    return scored.slice(0, topK);
  } catch (err) {
    console.error("Error querying RAG:", err);
    return [];
  }
}

// Example usage
(async () => {
  const results = await queryRAG("Show me my certifications");
  console.log("Top results:", results.map(r => ({ content: r.content, score: r.score })));
})();