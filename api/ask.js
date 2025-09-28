// /api/ask.js - Updated to handle streaming and Async Iterator
import { Readable, Transform } from 'stream'; // ADD Transform import
import { askAgent } from "../lib/queryAgent.js";

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Manual body parsing
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString();
    const { question } = JSON.parse(body);
    
    if (!question) {
      return res.status(400).end("Question is required");
    }

    // 1. Get the agent's response (either string or AsyncIterator)
    const agentResponse = await askAgent(question);

    // 2. Handle Casual (String) Response
    if (typeof agentResponse === 'string') {
        res.setHeader('Content-Type', 'text/plain');
        return res.status(200).end(agentResponse);
    }
    
    // 3. Streaming Response (agentResponse is the Async Iterator)
    
    // Transformer to clean the chunk objects from the LLM and extract pure text
    const transformStream = new Transform({
        objectMode: true, // The input chunks are JavaScript objects
        transform(chunk, encoding, callback) {
            // Extract the text content from the LLM's response object structure
            const textChunk = chunk.choices[0]?.delta?.content || "";
            if (textChunk) {
                // Push the plain text string out
                this.push(textChunk);
            }
            callback();
        }
    });

    // Set necessary HTTP headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.status(200);

    // Pipe the flow: AsyncIterator -> Node Readable -> Transformer (text) -> Response
    Readable.from(agentResponse) 
        .pipe(transformStream)  // Extracts the 'content' text from the LLM chunk object
        .pipe(res);             // Pipes the clean text to the client

  } catch (err) {
    console.error("API error:", err);
    res.setHeader('Content-Type', 'text/plain');
    res.status(500).end("Error contacting AI agent.");
  }
}