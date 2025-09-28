// /lib/queryAgent.js

import OpenAI from "openai";
import { supabase } from "./supabaseClient.js";

// ----- CONFIG -----
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  throw new Error("❌ OPENROUTER_API_KEY is not set in environment variables.");
}

// Initialize OpenRouter client
const openrouter = new OpenAI({
  apiKey: OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ----- HELPERS -----
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

// ----- CASUAL CONVERSATION -----
const casualResponses = [
  { keywords: ["how are you"], responses: [
    "I'm doing great, thanks for asking! How can I help you explore Kagiso's portfolio today?",
    "I'm feeling ready to help you discover more about Kagiso's projects and skills!"
  ]},
  { keywords: ["hello", "hi there"], responses: [
    "Hi there! I'm Kae's AI assistant. Ask me anything about Kagiso's projects, skills, or certifications.",
    "Hello! Excited to help you learn more about Kagiso. What would you like to explore first?"
  ]},
  { keywords: ["bye", "goodbye"], responses: [
    "It was great chatting! Feel free to come back anytime to explore more about Kagiso.",
    "Bye! Hope you enjoyed exploring Kagiso's portfolio. See you next time!"
  ]}
];

function checkCasualQuery(question) {
  const lower = question.toLowerCase();
  for (const entry of casualResponses) {
    if (entry.keywords.some(k => lower.includes(k))) {
      // FIX: Return the response string directly, not wrapped in an object
      return entry.responses[Math.floor(Math.random() * entry.responses.length)];
    }
  }
  return null;
}

// ----- EMBEDDING RETRIEVAL -----
// (getRelevantEmbeddings, buildContext, and generateQueryEmbedding remain unchanged)
async function getRelevantEmbeddings(question, topK = 5) {
  const queryEmbedding = await generateQueryEmbedding(question);

  const { data: rows, error } = await supabase
    .from("embeddings")
    .select("id, source_type, source_id, content, embedding");
  if (error) {
    console.error("Error fetching embeddings from Supabase:", error);
    return [];
  }

  const scored = rows.map((row) => {
    let parsedEmbedding;
    try {
      parsedEmbedding = Array.isArray(row.embedding) ? row.embedding : JSON.parse(row.embedding);
    } catch (e) {
      console.error("⚠ Error parsing embedding for row:", row.id);
      parsedEmbedding = [];
    }

    return {
      ...row,
      score: parsedEmbedding.length ? cosineSimilarity(queryEmbedding, parsedEmbedding) : -1,
    };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}

function buildContext(relevantChunks) {
  return relevantChunks
    .map(chunk => `[${chunk.source_type}:${chunk.source_id}] ${chunk.content}`)
    .join("\n\n");
}

async function generateQueryEmbedding(question) {
  // Replace with actual HuggingFace feature_extraction or other embedding logic
  return [];
}


// ----- MAIN STREAMING FUNCTION -----
/**
 * Asks the RAG agent and returns a ReadableStream for the response.
 * For casual responses, it converts the string into a stream.
 * @param {string} question The user's question.
 * @returns {Promise<ReadableStream>} A promise that resolves to a ReadableStream.
 */
export async function askAgent(question) {
  const systemPrompt = `You are Kae's AI assistant for his personal portfolio website.
You have a friendly, professional, and approachable personality. You can engage in casual conversation, but when answering questions about Kagiso's projects, skills, certifications, or website content, you can only use the provided context chunks. Never invent information or speculate.
- If the context does not contain the answer, say: "That's a great question! I don't have details yet, but you might check Kagiso’s project page or upcoming updates."
- Summarize context dynamically to avoid repeating previous answers.
- Provide concise, factual answers in short paragraphs or bullet points.
- When appropriate, suggest related questions to encourage engagement.
- Keep tone friendly, human-like, and approachable while staying accurate.`;

  try {
    const casualResponseText = checkCasualQuery(question);

    // 1. Handle casual conversations by creating a stream from the string.
    if (casualResponseText) {
      const encoder = new TextEncoder();
      return new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(casualResponseText));
          controller.close();
        },
      });
    }

    // 2. RAG Logic (Retrieval)
    const topChunks = await getRelevantEmbeddings(question);
    const context = buildContext(topChunks);

    console.log("Context sent to OpenRouter:", context);

    // 3. LLM Generation (Streaming)
    // FIX: Add 'stream: true' to the chat completion request.
    const stream = await openrouter.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` },
      ],
      max_tokens: 500,
      stream: true, // Crucial for streaming
    });

    // 4. Transform the LLM's iterator into a standard ReadableStream.
    // This allows it to be correctly returned and piped by the API route.
    const readableStream = new ReadableStream({
        async pull(controller) {
            const { value, done } = await stream.next();

            if (done) {
                controller.close();
                return;
            }

            // Extract the content chunk
            const chunk = value.choices[0]?.delta?.content || "";
            if (chunk) {
                const encoder = new TextEncoder();
                controller.enqueue(encoder.encode(chunk));
            }
        },
        cancel(reason) {
            console.warn("Stream cancelled:", reason);
            stream.return(); // Clean up the underlying stream
        }
    });

    return readableStream;

  } catch (err) {
    console.error("Error in askAgent:", err);
    
    // Convert the error message into a stream for consistent return type
    const errorText = `⚠ Agent error: ${err.message || "Unknown issue."}`;
    const encoder = new TextEncoder();
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(errorText));
        controller.close();
      }
    });
  }
}