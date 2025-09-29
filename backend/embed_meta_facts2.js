import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js"; // Assumes you have this setup to connect to Supabase
import { v4 as uuidv4 } from "uuid";
import https from "https"; 

// Initialize API constants from environment variables
const JINA_API_KEY = process.env.VERCEL_JINA_API_KEY || process.env.JINA_API_KEY; // Updated to check Vercel prefix

// --- 1. Jina API Helper Function ---

/**
 * Fetches the embedding for a given text input using the Jina API.
 * @param {string} input The text content to embed.
 * @returns {Promise<number[]>} A promise that resolves to the embedding vector (array of numbers).
 */
async function getJinaEmbedding(input) {
    if (!JINA_API_KEY) {
        throw new Error("JINA_API_KEY is not set in environment variables.");
    }
    
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.jina.ai',
            path: '/v1/embeddings',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JINA_API_KEY}`
            }
        };

        // CRITICAL: Ensure the 'task' matches the protocol used for other documents.
        const payload = {
            "model": "jina-embeddings-v3",
            "task": "retrieval.passage", 
            "input": [input]
        };

        const req = https.request(options, (res) => {
            let chunks = [];
            res.on('data', (d) => {
                chunks.push(d);
            });

            res.on('end', () => {
                const body = Buffer.concat(chunks).toString();
                
                if (res.statusCode !== 200) {
                    try {
                        const errorResult = JSON.parse(body);
                        return reject(new Error(`Jina API Error (${res.statusCode}): ${errorResult.detail || body}`));
                    } catch {
                        return reject(new Error(`Jina API Error (${res.statusCode}): ${body}`));
                    }
                }
                
                try {
                    const result = JSON.parse(body);
                    const embedding = result.data[0].embedding;
                    resolve(embedding);
                } catch (e) {
                    reject(new Error("Failed to parse Jina API response: " + e.message + "\nRaw Body: " + body));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(JSON.stringify(payload));
        req.end();
    });
}

// --- 2. Anchor Chunks Definition ---

const metaFacts = [
    // --- Original Facts ---
    {
        title: "Quantitative Summary",
        content: "Kagiso Mfusi's quantitative professional summary is as follows: Kagiso has **31 total certifications earned** across AI, cloud infrastructure, and software development, which includes key expertise in Oracle AI, Microsoft Azure, and Python Machine Learning. Kagiso has **8+ projects completed and showcased** in the portfolio, including the Personal Portfolio RAG Agent, an AI Brochure Maker, and an OSINT Reconnaissance Tool. Kagiso has **over 7 years of total experience** in systems development, cloud architecture, and full-stack development, with specialization in LLM engineering."
    },
    {
        title: "Core Specializations and Tech Stack",
        content: "Kagiso's core specializations and technical expertise lie at the intersection of **AI & Systems Development** and **Cloud Infrastructure**. Primary technologies include **Python, TypeScript, React, Next.js, and Node.js**. Cloud and DevOps proficiency covers **Azure, Docker, CI/CD, and Supabase**. Core methodologies include **LLM Engineering, Generative AI, RAG Pipeline implementation, and Agentic AI** architectures, alongside strong foundational skills in **PostgreSQL, Java, and Tailwind CSS** for full-stack delivery."
    },
    {
        title: "Contact and Location Details",
        content: "Kagiso Mfusi's primary contact information is: Email: **kagisomfusi@outlook.com**. Phone: **+27 (075) 130-4807**. Location: **Johannesburg, GP**. Kagiso is available for collaboration and typically responds to messages **within 24 hours**. For urgent matters, reaching out via phone or LinkedIn is recommended."
    },
    {
        title: "Kagiso's Professional Narrative, Experience, Education, and Hobbies",
        content: "Kagiso Mfusi's detailed professional profile, experience, education, and interests: Professional Narrative: Kagiso is a passionate systems developer with a love for creating scalable, innovative solutions and leveraging AI to push the boundaries of resilient, cloud-native architecture. His journey, which began in high school, has led to expertise across cloud computing, AI, cybersecurity, and full-stack development, emphasizing clean code, user-centric design, and strategic problem-solving. Experience: UI/UX Designer & Systems Developer at SPS Software (2025 - Present, GP, Remote), where he engineered intelligent AI workflows using React, Node.js, and cloud technologies. Systems Administrator Skills Program at Afrika Tikkun Services (2024, Randburg, GP), developing crucial proficiency in cloud, project management, and systems administration. Client Services Representative at First National Bank (2019 - 2023, Johannesburg, GP), where he leveraged ~9700 hours of direct client support to identify recurring customer pain points suitable for AI-driven automation. Junior JAVA Developer Intern at First National Bank (2018 - 2019, Randburg, GP), contributing production-ready code in an agile DevOps environment and enhancing proficiency in Java, Git, and Atlassian toolsets. Education: Systems Admin Skills Training from Digital Youth ICT Academy (2024) which helped secure Microsoft Azure Fundamentals and IBM Project Management Foundations certifications. Higher Certificate in IT: Systems Development from CTU Training Solutions (2018 - 2019) with distinctions, including an intensive JAVA Programming Bootcamp. Completed the first year of a Bachelor of Science (BSc), IT at Richfield Graduate Institute of Technology (2017) with distinctions. Graduated with a National Senior Certificate (Matric) from Florida Park High School (2016) with a Bachelors pass and two distinctions. Interests & Hobbies: Open Source Contributing, Machine Learning, Cloud Architecture, Tech Research, DevOps & Automation, and Exercise & Fitness, focusing on optimizing his 'biological operating system for peak performance'."
    },
    // --- New Technical Capability Facts derived from rag_capabilities_summary.md ---
    {
        title: "RAG Pipeline Architecture (Proficiency: 9/10)",
        content: "Demonstrated: Successful end-to-end implementation of the RAG model: Embedding $\rightarrow$ Storage $\rightarrow$ Retrieval $\rightarrow$ Context Augmentation $\rightarrow$ LLM Generation. This is the core success of the project, proven by the agent's ability to answer complex, grounded queries."
    },
    {
        title: "Vector Embedding with Jina-Embeddings-v3 (Proficiency: 9/10)",
        content: "Demonstrated: Direct, functional code implementation (`embed_meta_facts.js`) to call the Jina AI API, correctly using `Bearer` token authentication and specifying the `jina-embeddings-v3` model with the appropriate `retrieval.passage` task for high-accuracy semantic encoding."
    },
    {
        title: "Supabase/PostgreSQL Vector Database Implementation (Proficiency: 9/10)",
        content: "Demonstrated: Strategic choice and implementation of a scalable, production-grade vector database solution (PostgreSQL with the `vector` extension). This capability is central to storing the high-dimensional vectors efficiently for rapid search operations."
    },
    {
        title: "Semantic Search using Cosine Similarity (Proficiency: 9/10)",
        content: "Demonstrated: Deep architectural understanding and implementation of the core retrieval mechanism. The system effectively translates the user's natural language query into a vector and performs a **Cosine Similarity** calculation against the entire database to retrieve semantically relevant context chunks."
    },
    {
        title: "Vercel Serverless Deployment & Orchestration (Proficiency: 9/10)",
        content: "Demonstrated: Successful orchestration of a complex, stateful pipeline (requiring API keys and external database connections) within Vercel's serverless environment. This proves expertise in deploying high-performance, scalable backend logic optimized for low latency."
    },
    {
        title: "LLM Strategy & Integration using OpenRouter (Proficiency: 8/10)",
        content: "Demonstrated: Strategic decision to use an LLM routing layer (OpenRouter) instead of a single API provider. This showcases advanced thinking regarding **model resilience, cost optimization, and failover**, ensuring the agent remains functional and economical under various loads."
    },
    {
        title: "Node.js/TypeScript API Orchestration (Proficiency: 8/10)",
        content: "Demonstrated: Writing clean, robust, and asynchronous JavaScript/Node.js code (`embed_meta_facts.js`) to manage secure `https` API calls, handle response parsing, and perform database transactions. This validates core proficiency in backend development for AI services."
    },
    {
        title: "Data Structuring & Engineering for RAG (Proficiency: 8/10)",
        content: "Demonstrated: Intentional design of highly dense, multi-faceted data chunks (`metaFacts`) optimized specifically for high-precision vector retrieval. The data model uses unique IDs and a `source_type` (`meta_fact`) for reliable data governance and retrieval filtering."
    }
];

// --- 3. Main Embedding Logic ---

/**
 * Creates an embedding for each meta fact and uploads it to Supabase.
 */
async function embedMetaFacts2() {
    let successCount = 0;
    let failureCount = 0;
    const totalCount = metaFacts.length;

    console.log(`Starting embedding process for ${totalCount} meta facts...`);

    for (const fact of metaFacts) {
        // Use a unique ID for each meta fact
        const factId = uuidv4(); 
        try {
            console.log(`\t[INFO] Embedding: "${fact.title}"`);
            
            // 1. Create the embedding
            const embedding = await getJinaEmbedding(fact.content);

            // 2. Insert the data into the 'embeddings' table
            const { data, error } = await supabase.from("embeddings").insert({
                id: factId,
                // New, specific source type for these high-value chunks
                source_type: "meta_fact", 
                source_id: factId, // Use the unique UUID as the source ID
                content: fact.content,
                embedding,
            });

            if (error) {
                throw error;
            }

            console.log(`\t[SUCCESS] Embedded: "${fact.title}" (ID: ${factId})`);
            successCount++;

        } catch (err) {
            console.error(`\t[FAILURE] Error embedding "${fact.title}" (ID: ${factId}):`, err.message || err);
            failureCount++;
        }
    }

    console.log("--- Meta Facts Embedding Summary ---");
    console.log(`Total records processed: ${totalCount}`);
    console.log(`Successfully embedded: ${successCount}`);
    console.log(`Failed to embed: ${failureCount}`);
    console.log("------------------------------------");
}

embedMetaFacts2();