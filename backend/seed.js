import dotenv from "dotenv";
import path from 'path';
dotenv.config({path: path.resolve("./.env")}); // make sure .env is loaded
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

// Debug: print out environment variables


// Init clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Minimal test insert
async function run() {
  const testText = "Hello world, this is my first embedding seed test.";

  // Create embedding
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: testText,
  });

  const vector = embedding.data[0].embedding;

  // Insert into Supabase
  const { data, error } = await supabase
    .from("documents")
    .insert({
      content: testText,
      embedding: vector,
    })
    .select();

  if (error) {
    console.error("Insert error:", error);
  } else {
    console.log("Inserted row:", data);
  }
}

run();