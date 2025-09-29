import { supabase } from "../src/lib/supabaseClient.js";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedData() {
  // Fetch certifications
  const { data: certs } = await supabase.from("certifications").select("id, title, description");
  for (let cert of certs) {
    const input = `${cert.title} - ${cert.description}`;
    const embedding = await client.embeddings.create({
      model: "jina-embeddings-v3-small-en",
      input
    });
    await supabase.from("embeddings").insert({
      source_type: "certification",
      source_id: cert.id,
      content: input,
      embedding: embedding.data[0].embedding
    });
  }
  console.log("Certifications embedded!");
}

embedData();