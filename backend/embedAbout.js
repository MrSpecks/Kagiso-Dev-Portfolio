// backend/embedAbout.js

import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const aboutId = uuidv4(); // Unique ID for the About page embedding
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedAbout() {
  try {
    // Adjust path to your About.tsx file
    const aboutPath = path.join("../src/pages/About.tsx");
    const aboutContent = fs.readFileSync(aboutPath, "utf-8");

    console.log("Embedding About page content...");

    const embeddingResponse = await client.embeddings.create({
      model: "text-embedding-ada-002",
      input: aboutContent,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const { data, error } = await supabase.from("embeddings").insert({
        id: uuidv4(),
      source_type: "about_page",
      source_id: "about", // just a fixed ID since it's one page
      content: aboutContent,
      embedding,
    });

    if (error) throw error;

    console.log("About page embedded successfully!");
  } catch (err) {
    console.error("Error embedding About page:", err);
  }
}

embedAbout();