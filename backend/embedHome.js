// backend/embedHome.js

import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedHome() {
  try {
    // Adjust path to your Home.tsx file
    const homePath = path.join("../src/pages/Home.tsx");
    const homeContent = fs.readFileSync(homePath, "utf-8");

    console.log("Embedding Home page content...");

    const embeddingResponse = await client.embeddings.create({
      model: "text-embedding-ada-002",
      input: homeContent,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const { data, error } = await supabase.from("embeddings").insert({
      id: uuidv4(),
      source_type: "home_page",
      source_id: "home",
      content: homeContent,
      embedding,
    });

    if (error) throw error;

    console.log("Home page embedded successfully!");
  } catch (err) {
    console.error("Error embedding Home page:", err);
  }
}

embedHome();
