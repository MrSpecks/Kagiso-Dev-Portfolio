// --- /api/query.js ---
import { queryRAG } from "../lib/query.js";


export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}


try {
const { query, topK } = req.body;
if (!query) {
return res.status(400).json({ error: "Query text is required" });
}


const results = await queryRAG(query, topK || 5);
return res.status(200).json({ results });
} catch (err) {
console.error("API query error:", err);
return res.status(500).json({ error: "Something went wrong" });
}
}