import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import https from "https"; // Import the native https module

// Initialize API constants from environment variables
const JINA_API_KEY = process.env.JINA_API_KEY;

// --- Jina API Helper Function (Copied from embed_processor.js) ---

/**
 * Fetches the embedding for a given text input using the Jina API.
 * This function is wrapped in a Promise to allow async/await usage.
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

        // The API expects an array of inputs, even for a single string.
        const payload = {
            "model": "jina-embeddings-v3", // Using a stable model name
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
                    // Extract the embedding array from the first result object
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

// Static content derived from manually scraped Certifications page,
// bypassing the empty content issue from reading the live component file.
const STATIC_CERTIFICATIONS_CONTENT = `
Certifications
Professional certifications and achievements that showcase my commitment to continuous learning and expertise.

Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate
Oracle
September 2025
Oracle foundational certification in AI concepts and applications.

Oracle Cloud Infrastructure 2025 Certified Generative AI Professional
Oracle
August 2025
Official Oracle certification on applying generative AI in cloud environments.

GitHub Copilot Challenge
Microsoft
July 2025
Hands-on challenge demonstrating effective use of GitHub Copilot for coding tasks.

Machine Learning with Python
FreeCodeCamp
July 2025
Covers practical machine learning concepts and implementations using Python.

UX Foundations: Prototyping
LinkedIn Learning
June 2025
Covers UX prototyping methods and tools for testing user experiences.

AI Automation with Anthropic Claude and Agentic Computer Use
LinkedIn Learning
June 2025
Explains how to automate workflows with Claude and agentic computer use methods.

Prompt Engineering and AI Agents
LinkedIn Learning
June 2025
Practical guide to crafting effective prompts and designing agentic workflows.

Agentic AI Fundamentals: Architectures, Frameworks, and Applications
LinkedIn Learning
June 2025
Overview of agentic AI concepts, system architectures, and business applications.

Building with Google Gemini Advanced and Ultra
LinkedIn Learning
June 2025
Covers practical techniques for building apps with Google Gemini Advanced and Ultra models.

Scrum: The Basics
LinkedIn Learning
June 2025
Introduction to Scrum methodology, roles, and sprint cycles.

Agentic AI for Developers: Concepts and Application for Enterprises
LinkedIn Learning
June 2025
Developer-focused course for applying agentic AI concepts in enterprise contexts.

Figma Essential Training
LinkedIn Learning
June 2025
Fundamentals of Figma for UI/UX design, prototyping, and collaboration.

Vibe Coding Fundamentals
LinkedIn Learning
June 2025
Foundational programming principles taught through an engaging Vibe coding approach.

Accelerate Development with Artificial Intelligence and Cursor
LinkedIn Learning
May 2025
Learn how to speed up development workflows by integrating AI capabilities with Cursor.

Scrum: Advanced
LinkedIn Learning
May 2025
Advanced Scrum practices for scaling agile teams and complex projects.

Tech on the Go: No-Code For Coders
LinkedIn Learning
May 2025
Introduces no-code techniques for developers to rapidly prototype solutions.

Build AI Agents and Chatbots with LangGraph
LinkedIn Learning
May 2025
Practical course on building AI-powered chatbots and agents with LangGraph.

Cloud Architecture Design Patterns
Coursera
April 2025
Learned to design scalable and reliable systems by applying modern cloud architecture patterns to real-world challenges.

Financial Literacy and Entreprenurial Skills
Fin1K
March 2025
Certificate of attendance for the Fin1K Financial Literacy and Entrepreneurial Skills virtual workshop

HCIA-5G V2.0 Course
Huawei
January 2025
Covered the fundamentals of 5G architecture, deployment, and core technologies for modern telecom infrastructure.

Fundamentals of Sustainability and Technology
IBM
October 2024
Learned how technology intersects with sustainability, focusing on efficiency and sustainable innovation.

Cybersecurity Fundamentals
IBM
October 2024
Built a solid foundation in cybersecurity principles, essential protections, and modern security practices.

Explore Emerging Tech
IBM
October 2024
Explored disruptive technologies in AI, cloud, and cybersecurity with a focus on practical enterprise use cases.

5G Basics: What It's All About
Huawei
October 2024
Introduced the basics of 5G technology, its role in telecom, and applications across industries.

Next-Generation Cyber Security (CRA Training Program)
Huawei
September 2024
Completed Huawei’s CRA cybersecurity program focused on enterprise security challenges and defense strategies.

Next-Generation Cyber Security
Huawei
September 2024
Studied advanced cybersecurity practices and threat management in next-gen digital infrastructures.

Project Management Fundamentals
IBM
September 2024
Gained practical project management skills, including lifecycle management and agile methodologies.

Microsoft Certified: Azure Fundamentals (AZ-900)
Microsoft
August 2024
Demonstrated knowledge of Azure cloud concepts, services, and core solutions as part of Microsoft’s foundational certification.

Cybersecurity Foundations
LinkedIn Learning Community
July 2024
Built essential skills in cybersecurity, including security concepts, risk awareness, and defense basics.

Cybersecurity Awareness: Cybersecurity Terminology
LinkedIn Learning Community
July 2024
Learned the key terminology and concepts necessary to understand and communicate security practices.

Career Skills in Software Development
LinkedIn Learning Community
July 2024
Developed professional and technical career skills tailored for software development and teamwork.
            
Continuous Learning
I believe in staying current with the latest technologies and best practices. These certifications represent my commitment to professional growth and excellence.
`;

/**
 * Ensures the content is a single, clean string with minimal whitespace.
 * (Note: This function is simplified since the input is already clean text.)
 * @param {string} rawTextContent The static text content.
 * @returns {string} The final cleaned, text-only content.
 */
function cleanContent(rawTextContent) {
    let cleanText = rawTextContent;
    cleanText = cleanText.replace(/[\r\n]+/g, ' ');
    cleanText = cleanText.replace(/\s+/g, ' ').trim(); 
    return cleanText;
}

// --- Main Embedding Function ---

async function embedCertificationsPage() {
    try {
        console.log("Cleaning and Embedding Certifications page content...");

        // Use the static, complete text content
        const cleanedContent = cleanContent(STATIC_CERTIFICATIONS_CONTENT);
        
        if (!cleanedContent) {
            console.warn("Cleaned content is empty. Skipping embedding.");
            return;
        }

        // Use the new custom function to get the embedding (Replaced OpenAI call)
        const embedding = await getJinaEmbedding(cleanedContent);

        // Store the CLEANED content in the database
        const { data, error } = await supabase.from("embeddings").insert({
            id: uuidv4(),
            source_type: "certifications_page",
            source_id: "certifications",
            content: cleanedContent, // IMPORTANT: Using cleanedContent
            embedding,
        });

        if (error) throw error;

        console.log("Certifications page embedded successfully!");
        console.log(`\n--- Cleaned Content Summary (${cleanedContent.length} chars) ---`);
        console.log(cleanedContent.substring(0, 500) + '...');
        console.log(`Embedding dimensions: ${embedding.length}`);

    } catch (err) {
        console.error("Error embedding Certifications page:", err.message);
    }
}

embedCertificationsPage();
