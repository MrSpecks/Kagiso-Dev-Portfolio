import OpenAI from "openai";
import { supabase } from "./supabaseClient.js"; // Assumes this client is available in backend/ or lib/

// ----- CONFIG: LLM (OpenRouter) -----
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
    console.error("❌ OPENROUTER_API_KEY is not set in environment variables.");
}

// Initialize OpenRouter client for chat completion
const openrouter = new OpenAI({
    apiKey: OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

// 🚀 JINA CONFIGURATION 🚀
const JINA_API_KEY = process.env.JINA_API_KEY;
const JINA_API_URL = "https://api.jina.ai/v1/embeddings";

// 🎯 TARGET MODEL: Jina-Embeddings-v3-base-en (1024 dimensions)
const JINA_MODEL_NAME = "jina-embeddings-v3"; 

if (!JINA_API_KEY) {
    console.error("❌ JINA_API_KEY is not set in environment variables. RAG retrieval will fail.");
}

// --- CONSTANTS ---
// Dimension set to 1024, matching the Supabase vector column size.
const EMBEDDING_DIMENSION = 1024; 

// ----- HELPERS: CASUAL CONVERSATION -----
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

// ===============================================
// ----- NEW HELPER: UNKNOWN QUERY LOGGING -----
// ===============================================

/**
 * Logs a question to a dedicated Supabase table (`unknown_queries`)
 * when the RAG agent cannot find sufficient context to generate an answer.
 * This aids in continuous improvement of the knowledge base.
 * * NOTE: Ensure you have a table named `unknown_queries` in Supabase
 * with a column `query_text` (type: text) configured.
 * * @param {string} question The user's original question.
 */
async function logUnknownQuery(question) {
    try {
        const { error } = await supabase
            .from('unknown_queries')
            .insert([
                { query_text: question }
            ]);

        if (error) {
            console.error("Supabase Error logging unknown query:", error);
        } else {
            console.log("Successfully logged unknown query to Supabase:", question);
        }
    } catch (e) {
        console.error("General error during unknown query logging:", e);
    }
}


// ----- EMBEDDING RETRIEVAL (UPDATED for Jina AI) -----

/**
 * Generates a high-dimensional vector embedding for the user's question using the Jina AI API.
 * @param {string} question The user's question.
 * @returns {Promise<number[]>} The vector embedding (1024 dimensions).
 */
async function generateQueryEmbedding(question) {
    try {
        if (!JINA_API_KEY) {
            console.warn("Jina AI API token missing, returning dummy vector. RAG will fail.");
            return Array(EMBEDDING_DIMENSION).fill(0);
        }

        console.log("Generating query embedding using Jina AI..."); 
        
        const response = await fetch(JINA_API_URL, { 
            method: 'POST', 
            headers: { 
                // Use Jina API Key for authentication
                'Authorization': `Bearer ${JINA_API_KEY}`, 
                'Content-Type': 'application/json' 
            }, 
            // Jina API Body Format
            body: JSON.stringify({ 
                "model": JINA_MODEL_NAME, 
                // CRITICAL: 'retrieval.query' tells Jina to optimize the vector for finding passages (documents)
                "task": "retrieval.query", 
                "input": [question] 
            }), 
        }); 

        if (!response.ok) { 
            const errorBody = await response.text(); 
            throw new Error(`Jina AI API error: ${response.status} - ${errorBody}`); 
        } 

        const jsonResponse = await response.json(); 

        // Jina API returns the embedding in jsonResponse.data[0].embedding
        if (
            jsonResponse.data && 
            jsonResponse.data.length > 0 && 
            jsonResponse.data[0].embedding &&
            // We MUST check the dimension size to avoid a fatal Supabase error
            jsonResponse.data[0].embedding.length === EMBEDDING_DIMENSION
        ) { 
            return jsonResponse.data[0].embedding; 
        } else { 
            // CRITICAL: Log the actual response body for debugging in Vercel logs
            console.error("Jina Response Structure Error. Received body:", JSON.stringify(jsonResponse, null, 2));
            throw new Error(`Invalid embedding response structure or dimension from Jina AI. Expected ${EMBEDDING_DIMENSION}D. See logs for details.`); 
        }

    } catch (e) {
        console.error("Error generating query embedding:", e);
        return Array(EMBEDDING_DIMENSION).fill(0);
    }
}

/**
 * Fetches relevant documents from Supabase using vector similarity search.
 */
async function getRelevantEmbeddings(question, topK = 8) {
    const queryEmbedding = await generateQueryEmbedding(question);

    if (queryEmbedding.every(v => v === 0)) {
        console.error("Query embedding is all zeros. Skipping Supabase RPC.");
        return [];
    }

    // Using the Supabase RPC function 'match_documents' for vector similarity search
    const { data: documents, error: queryError } = await supabase.rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: 0.55, 
        match_count: topK,
    });

    if (queryError) {
        console.error("Error searching Supabase for context:", queryError);
        return [];
    }

    return documents;
}

/**
 * Formats the retrieved chunks into a single string context for the LLM.
 */
function buildContext(relevantChunks) {
    return relevantChunks
        .map(chunk => `[${chunk.source_type}:${chunk.source_id}] ${chunk.content}`)
        .join("\n---\n");
}


// ----- MAIN STREAMING FUNCTION -----

/** * Asks the RAG agent and returns the AsyncIterator from the LLM client 
 * for streaming, or a string for casual chat/error.
 * * @param {string} question The user's question.
 * @returns {Promise<AsyncIterable<object> | string>}
 */
export async function askAgent(question) {

    // --- 1. SYSTEM INSTRUCTION DEFINITION ---
    const systemPrompt = `You are Kae's AI Assistant, the official knowledge engine for Kagiso Mfusi's portfolio.\
Format all responses as plain, conversational text. DO NOT use any Markdown formatting, including asterisks for bolding, bullet points, or section headings.   \
*AUTHORITY RULE:* You must generate answers based only on the facts provided in the CONTEXT below. Use the context to synthesize complete, clear, and relevant answers.*\
*IDENTITY:* The user is asking about the developer, Kagiso Mfusi (also known as Kae or KG or he). Refer to him using one of these names or as 'Kagiso', 'Kae', 'KG', 'he', 'him', or 'the developer'.\
*CONSTRAINT:* Your entire output must be the final, conversational answer directed at the user. Never include any internal reasoning, tool names, data structure references, or quotes of the system instructions or prompt snippets.\
*FALLBACK:* If the context is insufficient to form a direct answer, clearly state that the portfolio information does not contain the answer, and *DO NOT* use external knowledge.\
*TONE:* Keep the tone friendly, enthusiastic, professional, and concise. Ensure answers are accurate, brief and to the point. Very matter of fact`;

    try {
        // ----- CASUAL CONVERSATION LOGIC -----
        const casualResponseText = checkCasualQuery(question);

        if (casualResponseText) { 
            return casualResponseText; 
        } 

        // --- 2. RAG RETRIEVAL ---  
        console.log("Searching for relevant context...");  
        const topChunks = await getRelevantEmbeddings(question);  
        const context = buildContext(topChunks);  

        if (!context) {  
            // === LOGIC ADDED HERE: Log the query before returning the fallback ===
            await logUnknownQuery(question);
            return "I couldn't find any relevant information in the portfolio to answer that question. Please try asking about Kagiso's projects, skills, or experience.";  
        }  

        console.log("Context sent to OpenRouter:", context);  

        // --- 3. LLM GENERATION (Streaming) ---  
        const stream = await openrouter.chat.completions.create({  
            model: "shisa-ai/shisa-v2-llama3.3-70b:free", 
            messages: [  
                { role: "system", content: systemPrompt },  
                { role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` },  
            ],  
            max_tokens: 500,  
            stream: true, 
        });  

        return stream;

    } catch (err) {
        // --- 4. CLEAN ERROR HANDLING ---
        console.error("Error in askAgent:", err);
        return `⚠ Agent error: I encountered a critical issue while processing your request. Please check the backend logs for embedding or LLM failures.`;
    }
}
