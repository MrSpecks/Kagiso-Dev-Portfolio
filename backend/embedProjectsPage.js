// backend/embedProjects.js

import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedProjectsPage() {
  try {
    // Adjust path to your Projects.tsx file
    const projectsPath = path.join("../src/pages/Projects.tsx");
    const projectsContent = fs.readFileSync(projectsPath, "utf-8");

    console.log("Embedding Projects page content...");

    const embeddingResponse = await client.embeddings.create({
      model: "text-embedding-ada-002",
      input: projectsContent,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const { data, error } = await supabase.from("embeddings").insert({
      id: uuidv4(),
      source_type: "projects_page",
      source_id: "projects",
      content: projectsContent,
      embedding,
    });

    if (error) throw error;

    console.log("Projects page embedded successfully!");
  } catch (err) {
    console.error("Error embedding Projects page:", err);
  }
}

embedProjectsPage();
