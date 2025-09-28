// /api/ask.js
// FIX: Import the built-in 'Readable' class from the 'stream' module
import { Readable } from 'stream'; 
import { askAgent } from "../lib/queryAgent.js";

export const config = {
  // Disable the default Next.js/Vercel body parsing
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Manual body parsing for when bodyParser is disabled
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString();
    const { question } = JSON.parse(body);
    
    if (!question) {
      return res.status(400).end("Question is required");
    }

    // 1. Call askAgent function, which returns a WHATWG ReadableStream
    const whatwgReadableStream = await askAgent(question);

    // 2. FIX: Convert the WHATWG stream to a Node.js Readable stream
    // Readable.from() is the standard way to wrap a Web Stream for piping.
    const nodeReadableStream = Readable.from(whatwgReadableStream);

    // 3. Set necessary HTTP headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.status(200);

    // 4. Pipe the Node.js ReadableStream (which now has the .pipe method) 
    // directly to the response stream.
    nodeReadableStream.pipe(res);

  } catch (err) {
    console.error("API error:", err);
    
    // Set response headers for error and write error message
    res.setHeader('Content-Type', 'text/plain');
    res.status(500).end("Error contacting AI agent.");
  }
}