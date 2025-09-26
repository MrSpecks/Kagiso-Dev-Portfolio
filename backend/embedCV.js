import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import pdf from "pdf-parse";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedCV() {
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

    // Embed each chunk
    for (let i = 0; i < chunks.length; i++) {
      const embedding = await client.embeddings.create({
        model: "text-embedding-ada-002",
        input: chunks[i],
      });

      await supabase.from("embeddings").insert({
        id: uuidv4(),
        source_type: "cv",
        source_id: "cv_document",
        content: chunks[i],
        embedding: embedding.data[0].embedding,
      });
    }

    console.log("CV embedded successfully!");
  } catch (err) {
    console.error("Error embedding CV:", err);
  }
}

embedCV();