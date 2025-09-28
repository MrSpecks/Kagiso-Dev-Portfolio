// /api/ask.js
import { askAgent } from "../lib/queryAgent.js";

export const config = {
  // Disable the default Next.js/Vercel body parsing
  // This is often required when you want to stream responses,
  // as it avoids buffer limits that conflict with long-lived streams.
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Since bodyParser is disabled, we need to read the body manually.
    // This is common for Vercel/Next.js when using the streaming API config.
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString();
    const { question } = JSON.parse(body);
    
    if (!question) {
      return res.status(400).end("Question is required");
    }

    // 1. Call the new askAgent function, which returns a ReadableStream
    const readableStream = await askAgent(question);

    // 2. Set necessary HTTP headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.status(200);

    // 3. Pipe the ReadableStream directly to the response stream
    // This connects the LLM output directly to the HTTP response
    readableStream.pipe(res);

    // The stream piping handles the end of the response, 
    // so we don't need a manual res.end() here.

  } catch (err) {
    console.error("API error:", err);
    
    // Set response headers for error and write error message
    res.setHeader('Content-Type', 'text/plain');
    res.status(500).end("Error contacting AI agent.");
  }
}