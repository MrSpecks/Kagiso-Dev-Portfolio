import OpenAI from "openai";
import { supabase } from "./supabaseClient.js"; // Assumes this client is available in backend/ or lib/

// ----- CONFIG -----
// The environment variables must be correctly configured where this script runs.
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
    // In a production environment, this should ideally be handled at a higher level
    // or loaded more robustly. For this context, we will acknowledge the check.
    console.error("❌ OPENROUTER_API_KEY is not set in environment variables.");
}

// Initialize OpenRouter client
const openrouter = new OpenAI({
    apiKey: OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});


// ----- HELPERS: CASUAL CONVERSATION & COSINE SIMILARITY -----

// Define static responses for common, non-RAG queries
const casualResponses = [
    { keywords: ["how are you", "doing good", "you good"], responses: [
        "I'm doing great, thanks for asking! How can I help you explore Kagiso's portfolio today?",
        "I'm feeling ready to help you discover more about Kagiso's projects and skills!",
        "I'm functioning perfectly and ready to assist! What can I tell you about Kae's work?"
    ]},
    { keywords: ["hello", "hi there", "hey"], responses: [
        "Hi there! I'm Kae's AI assistant. Ask me anything about Kagiso's projects, skills, or certifications.",
        "Hello! Excited to help you learn more about Kagiso. What would you like to explore first?",
        "Hey! Welcome. I can quickly pull details on Kagiso Mfusi's professional background."
    ]},
    { keywords: ["bye", "goodbye", "later", "cya"], responses: [
        "It was great chatting! Feel free to come back anytime to explore more about Kagiso.",
        "Bye! Hope you enjoyed exploring Kagiso's portfolio. See you next time!",
        "Take care! Don't hesitate to reach out again if you have more questions."
    ]},
    { keywords: ["thanks", "thank you", "cheers"], responses: [
        "You're welcome! Happy to help.",
        "No problem at all. Is there anything else I can clarify for you?",
    ]}
];

/**
 * Checks if the question is a casual greeting/farewell and returns a response string if true.
 * @param {string} question The user's question.
 * @returns {string | null} A casual response or null if the query requires RAG.
 */
function checkCasualQuery(question) {
    const lower = question.toLowerCase().trim();
    for (const entry of casualResponses) {
        if (entry.keywords.some(k => lower.includes(k))) {
            const randomIndex = Math.floor(Math.random() * entry.responses.length);
            return entry.responses[randomIndex];
        }
    }
    return null;
}

/**
 * Calculates the cosine similarity between two vectors.
 */
function cosineSimilarity(a, b) {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    // Avoid division by zero
    if (normA === 0 || normB === 0) return 0;
    return dot / (normA * normB);
}


// ----- EMBEDDING RETRIEVAL STUBS -----
// NOTE: These functions are stubs and assume embedding generation is handled elsewhere 
// or replaced with a functional embedding model if the project requires it.

// This is a placeholder for generating a real query embedding. 
// In a full RAG implementation, this would call an embedding model (e.g., OpenAI or HuggingFace).
async function generateQueryEmbedding(question) {
    // In the previous version, this would be a full API call to OpenAI. 
    // Here we return a dummy vector to allow the supabase query to run, 
    // although the cosine similarity logic is also currently incomplete without a real embedding.
    return Array(1536).fill(0); // Dummy vector for demonstration/testing
}

/**
 * Fetches relevant documents from Supabase using vector similarity search.
 */
async function getRelevantEmbeddings(question, topK = 5) {
    // In a robust application, you would ensure queryEmbedding is non-zero before searching.
    const queryEmbedding = await generateQueryEmbedding(question); 

    // Using the Supabase RPC function 'match_documents' for vector similarity search
    const { data: documents, error: queryError } = await supabase.rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: 0.78, 
        match_count: topK,
    });

    if (queryError) {
        console.error("Error searching Supabase for context:", queryError);
        return [];
    }
    
    // NOTE: If the Supabase RPC returns scored documents, the custom scoring logic 
    // using cosineSimilarity might be redundant, but we keep it simple here.
    return documents;
}

/**
 * Formats the retrieved chunks into a single string context for the LLM.
 */
function buildContext(relevantChunks) {
    // Format: [source_type:source_id] content
    return relevantChunks
        .map(chunk => `[${chunk.source_type}:${chunk.source_id}] ${chunk.content}`)
        .join("\n---\n"); // Separator between chunks
}


// ----- MAIN STREAMING FUNCTION -----

/** * Asks the RAG agent and returns the AsyncIterator from the LLM client
 * for streaming, or a string for casual chat.
 * @param {string} question The user's question.
 * @returns {Promise<AsyncIterable<object> | string>} 
 */
export async function askAgent(question) {
    
    // --- 1. SYSTEM INSTRUCTION DEFINITION ---
    const systemPrompt = "You are Kae's AI Assistant, a friendly, professional, and highly knowledgeable AI chat agent for Kagiso Mfusi's personal portfolio.\
Your primary function is to answer questions based *strictly and solely* on the provided context (Kagiso's portfolio content).\
1.  **Identity:** The user's full name is **Kagiso Mfusi**. He is also professionally known as **Kae** or **KG**. Refer to him using these names or as 'Kagiso' or 'the developer'.\
2.  **Constraint:** If you do not know the answer to a question then politely state that you do not have the answer and encourage the user to ask Kagiso directly.\
3.  **Tone:** Keep the tone friendly, human-like, and approachable while staying accurate.\
";

    try {
        // ----- CASUAL CONVERSATION LOGIC (Implemented from selection) -----
        const casualResponseText = checkCasualQuery(question);

        // 1. Handle casual conversations by returning the string directly.
        if (casualResponseText) {
            return casualResponseText;
        }
        // ----- END CASUAL CONVERSATION LOGIC -----

        // --- 2. RAG RETRIEVAL ---
        console.log("Searching for relevant context...");
        const topChunks = await getRelevantEmbeddings(question);
        const context = buildContext(topChunks);

        if (!context) {
            // Fallback if RAG retrieval fails or returns no relevant docs
            return "I couldn't find any relevant information in the portfolio to answer that question.";
        }
        
        console.log("Context sent to OpenRouter:", context);

        // --- 3. LLM GENERATION (Streaming) ---
        // This returns an Async Iterator object (which does not have .pipe or .next() directly usable in the custom pull function).
        const stream = await openrouter.chat.completions.create({
            model: "deepseek/deepseek-r1-distill-llama-70b:free",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` },
            ],
            max_tokens: 500,
            stream: true, // Crucial for streaming
        });

        // 4. Return the LLM's Async Iterator directly.
        return stream;

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
