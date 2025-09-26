// backend/embedProjects.js

import dotenv from "dotenv";
dotenv.config();

import { supabase } from "../src/lib/supabaseClient.js";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedProjects() {
  try {
    // Fetch projects from Supabase
    const { data: projects, error } = await supabase
      .from("projects")
      .select("id, title, description");

    if (error) throw error;
    if (!projects || projects.length === 0) {
      console.log("No projects found to embed.");
      return;
    }

    console.log(`Found ${projects.length} projects. Creating embeddings...`);

    for (let project of projects) {
      const input = `${project.title} - ${project.description}`;
      const embeddingResponse = await client.embeddings.create({
        model: "text-embedding-ada-002",
        input,
      });

      const embedding = embeddingResponse.data[0].embedding;

      const { data, error: insertError } = await supabase
        .from("embeddings")
        .insert({
          source_type: "project",
          source_id: project.id,
          content: input,
          embedding: embedding,
        });

      if (insertError) {
        console.error(`Error inserting embedding for project ${project.id}:`, insertError);
      } else {
        console.log(`Inserted embedding for project ${project.id}`);
      }
    }

    console.log("All project embeddings created!");
  } catch (err) {
    console.error("Error embedding projects:", err);
  }
}

embedProjects();