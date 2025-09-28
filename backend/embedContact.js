// backend/embedContact.js

import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedContact() {
  try {
    // Path to your Contact.tsx page
    const contactPath = path.join("../src/pages/Contact.tsx");
    const contactContent = fs.readFileSync(contactPath, "utf-8");

    console.log("Embedding Contact page content...");

    const embeddingResponse = await client.embeddings.create({
      model: "text-embedding-ada-002",
      input: contactContent,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const { data, error } = await supabase.from("embeddings").insert({
      id: uuidv4(),
      source_type: "contact_page",
      source_id: "contact",
      content: contactContent,
      embedding,
    });

    if (error) throw error;

    console.log("Contact page embedded successfully!");
  } catch (err) {
    console.error("Error embedding Contact page:", err);
  }
}

embedContact();