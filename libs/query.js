// --- /lib/query.js ---
import { supabase } from "./supabaseClient.js";
import { InferenceClient } from "huggingface_hub";


// ----- CONFIG -----
const HF_TOKEN = process.env.HF_TOKEN;
const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";


if (!HF_TOKEN) {
throw new Error("HF_TOKEN is not set in environment variables.");
}


const hf = new InferenceClient({
provider: "hf-inference",
apiKey: HF_TOKEN,
});


// ----- HELPERS -----
export async function getEmbedding(text) {
try {
const embedding = await hf.feature_extraction({
model: EMBEDDING_MODEL,
inputs: text,
});
return embedding[0];
} catch (err) {
console.error("Hugging Face Embedding Error:", err);
throw err;
}
}


export function cosineSimilarity(a, b) {
const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
return dot / (normA * normB);
}


export async function queryRAG(query, topK = 5) {
try {
if (!supabase) {
throw new Error("Supabase client is not initialized. Check SUPABASE_URL and SUPABASE_ANON_KEY.");
}


const queryEmbedding = await getEmbedding(query);


const { data: embeddings, error } = await supabase
.from("embeddings")
.select("id, source_type, source_id, content, embedding");


if (error) throw error;


const scored = embeddings.map((row) => {
let parsedEmbedding;
try {
parsedEmbedding = Array.isArray(row.embedding)
? row.embedding
: JSON.parse(row.embedding);
} catch (e) {
console.error("⚠ Error parsing embedding for row:", row.id);
parsedEmbedding = [];
}


return {
...row,
score: parsedEmbedding.length
? cosineSimilarity(queryEmbedding, parsedEmbedding)
: -1,
};
});


const topResults = scored
.filter((row) => row.score > 0)
.sort((a, b) => b.score - a.score)
.slice(0, topK);


return topResults;
} catch (err) {
console.error("RAG Query Error:", err);
throw err;
}
}