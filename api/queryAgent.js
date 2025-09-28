// /api/queryAgent.js


import { askAgent } from "../lib/queryAgent.js";


export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}


try {
const { question } = req.body;
if (!question) return res.status(400).json({ error: "Question is required" });


const answer = await askAgent(question);
res.status(200).json({ answer });
} catch (err) {
console.error("API error in queryAgent:", err);
res.status(500).json({ error: "Something went wrong" });
}
}