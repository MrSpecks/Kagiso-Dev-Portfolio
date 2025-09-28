// backend/embedCertifications.js

import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedCertifications() {
  try {
    // Path to your Certifications.tsx page
    const certPath = path.join("../src/pages/Certifications.tsx");
    const certContent = fs.readFileSync(certPath, "utf-8");

    console.log("Embedding Certifications page content...");

    const embeddingResponse = await client.embeddings.create({
      model: "text-embedding-ada-002",
      input: certContent,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const { data, error } = await supabase.from("embeddings").insert({
      id: uuidv4(),
      source_type: "certifications_page",
      source_id: "certifications",
      content: certContent,
      embedding,
    });

    if (error) throw error;

    console.log("Certifications page embedded successfully!");
  } catch (err) {
    console.error("Error embedding Certifications page:", err);
  }
}

embedCertifications();
