import { askAgent } from "../../../backend/queryAgent.js"; // adjust path if needed
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    const answer = await askAgent(question);

    res.status(200).json({ answer });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
}