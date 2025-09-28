/**
 * Script to create text embeddings for each individual certification record
 * and insert them into the 'embeddings' table in Supabase.
 *
 * It uses the provided certifications_rows.json data, concatenating key fields
 * (title, provider, description, tags) for the embedding content.
 */

// NOTE: This setup assumes the existence of 'dotenv', 'supabaseClient.js', and
// your OpenAI API key in the environment variables, similar to your context.

import dotenv from "dotenv";
// Initialize dotenv to load environment variables (like OPENAI_API_KEY)
dotenv.config();

// Placeholder imports for external services required in the provided context
// Replace these with your actual client implementations.
import { supabase } from "./supabaseClient.js"; // Assume this provides an initialized Supabase client
import OpenAI from "openai"; // Assume 'openai' package is installed and configured

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- START: Injected JSON Data from certifications_rows.json ---
const certificationsData = [
  {"idx":0,"id":"ede5c30d-ef23-45ee-bb64-33cb72230a1e","title":"Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate","provider":"Oracle","date_earned":"2025-09-04","description":"Oracle foundational certification in AI concepts and applications.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Oracle%20Cloud%20Infrastructure%20AI%20Foundations%20Associate%20-%20Oracle%20MyLearn.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{Oracle,AI,Certification}"},
  {"idx":1,"id":"1d95db63-4c9d-49f4-908e-c0ad11d836e2","title":"Oracle Cloud Infrastructure 2025 Certified Generative AI Professional","provider":"Oracle","date_earned":"2025-08-25","description":"Official Oracle certification on applying generative AI in cloud environments.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Oracle%20Cloud%20Infrastructure%20Certified%20Generative%20AI%20Professional.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{Oracle,\"Generative AI\",\"Cloud Certification\"}"},
  {"idx":2,"id":"054dc81a-3af2-4105-8f16-934f49a3ef2a","title":"GitHub Copilot Challenge","provider":"Microsoft","date_earned":"2025-07-09","description":"Hands-on challenge demonstrating effective use of GitHub Copilot for coding tasks.","file_url":"https://www.credly.com/badges/205bce38-5efa-4244-be12-f706e90ce901/linked_in_profile","created_at":"2025-09-26 04:11:47.720164","tags":"{\"GitHub Copilot\",\"AI Pair Programming\",Coding}"},
  {"idx":3,"id":"9181e870-da4d-4350-9624-72945b9126d6","title":"Machine Learning with Python","provider":"FreeCodeCamp","date_earned":"2025-07-03","description":"Covers practical machine learning concepts and implementations using Python.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Machine%20Learning%20with%20Python.pdf\r\n","created_at":"2025-09-26 04:11:47.720164","tags":"{\"Machine Learning\",Python,AI}"},
  {"idx":4,"id":"1ce03670-8655-4b2c-8b3a-c9909eeafa28","title":"UX Foundations: Prototyping","provider":"LinkedIn Learning","date_earned":"2025-06-27","description":"Covers UX prototyping methods and tools for testing user experiences.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/UX%20Foundations.pdf\r\n\r\n","created_at":"2025-09-26 04:11:47.720164","tags":"{UX,Prototyping,Design}"},
  {"idx":5,"id":"c97fdc1f-cfcf-4b60-8348-d5e71c3b7001","title":"AI Automation with Anthropic Claude and Agentic Computer Use","provider":"LinkedIn Learning","date_earned":"2025-06-25","description":"Explains how to automate workflows with Claude and agentic computer use methods.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/AI%20Automation%20with%20Anthropic%20Claude.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{\"AI Automation\",\"Anthropic Claude\",\"Agentic AI\"}"},
  {"idx":6,"id":"3c668df8-e019-4c87-90a1-4765eb40371e","title":"Prompt Engineering and AI Agents","provider":"LinkedIn Learning","date_earned":"2025-06-23","description":"Practical guide to crafting effective prompts and designing agentic workflows.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Prompt%20Engineering%20and%20AI%20Agents.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{\"Prompt Engineering\",\"AI Agents\",LLM}"},
  {"idx":7,"id":"702d6e08-d0d5-4293-b015-b959121a192a","title":"Agentic AI Fundamentals: Architectures, Frameworks, and Applications","provider":"LinkedIn Learning","date_earned":"2025-06-21","description":"Overview of agentic AI concepts, system architectures, and business applications.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Agentic%20AI%20Fundamentals.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{\"Agentic AI\",\"AI Systems\",Frameworks}"},
  {"idx":8,"id":"c6aaa4d2-4f73-4bd2-a0bd-72d58edfa93b","title":"Building with Google Gemini Advanced and Ultra","provider":"LinkedIn Learning","date_earned":"2025-06-19","description":"Covers practical techniques for building apps with Google Gemini Advanced and Ultra models.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Building%20with%20Google%20Gemini.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{\"Google Gemini\",LLM,AI}"},
  {"idx":9,"id":"d3199df6-c5ae-438e-a9e4-e9633328ed10","title":"Scrum: The Basics","provider":"LinkedIn Learning","date_earned":"2025-06-16","description":"Introduction to Scrum methodology, roles, and sprint cycles.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Scrum%20The%20Basics.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{Scrum,Agile}"},
  {"idx":10,"id":"8f395429-1b8c-4756-8c46-0a013abffe35","title":"Agentic AI for Developers: Concepts and Application for Enterprises","provider":"LinkedIn Learning","date_earned":"2025-06-13","description":"Developer-focused course for applying agentic AI concepts in enterprise contexts.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Agentic%20AI%20for%20Developers.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{\"Agentic AI\",\"Enterprise AI\",Development}"},
  {"idx":11,"id":"470c74d6-5978-4b5a-946d-f663f31bf449","title":"Figma Essential Training","provider":"LinkedIn Learning","date_earned":"2025-06-11","description":"Fundamentals of Figma for UI/UX design, prototyping, and collaboration.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Figma%20Essential.pdf\r\n","created_at":"2025-09-26 04:11:47.720164","tags":"{Design,UI/UX,Figma}"},
  {"idx":12,"id":"61235f86-a497-4c62-823d-fcaf11fcd297","title":"Vibe Coding Fundamentals","provider":"LinkedIn Learning","date_earned":"2025-06-09","description":"Foundational programming principles taught through an engaging Vibe coding approach.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Vibe%20Coding%20Fundamentals.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{Coding,Fundamentals,Programming}"},
  {"idx":13,"id":"25836a60-3d35-48dc-8427-35eaafb6b6c0","title":"Accelerate Development with Artificial Intelligence and Cursor","provider":"LinkedIn Learning","date_earned":"2025-06-07","description":"Learn how to speed up development workflows by integrating AI capabilities with Cursor.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Development%20with%20Artificial%20Intelligence.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{AI,Development,Productivity,Cursor}"},
  {"idx":14,"id":"bbf01c8a-3dbf-478e-b9f2-895710d39c3a","title":"Scrum: Advanced","provider":"LinkedIn Learning","date_earned":"2025-06-04","description":"Advanced Scrum practices for scaling agile teams and complex projects.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Scrum%20Advanced.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{Scrum,Agile,\"Project Management\"}"},
  {"idx":15,"id":"066d843d-e68c-474a-9b40-0d112b8352a2","title":"Tech on the Go: No-Code For Coders","provider":"LinkedIn Learning","date_earned":"2025-05-19","description":"Introduces no-code techniques for developers to rapidly prototype solutions.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/No-Code%20for%20Coders.pdf\r\n\r\n","created_at":"2025-09-26 04:11:47.720164","tags":"{No-Code,Low-Code,Development}"},
  {"idx":16,"id":"ed331bd7-39e5-4fb3-8ea5-5fc963185c9a","title":"Build AI Agents and Chatbots with LangGraph","provider":"LinkedIn Learning","date_earned":"2025-05-08","description":"Practical course on building AI-powered chatbots and agents with LangGraph.","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Build%20AI%20Agents%20and%20Chatbots.pdf","created_at":"2025-09-26 04:11:47.720164","tags":"{LangGraph,\"AI Agents\",Chatbots}"},
  {"idx":17,"id":"dd0dfda5-4e47-4c20-b152-b3803ce507b7","title":"Cloud Architecture Design Patterns","provider":"Coursera","date_earned":"2025-04-25","description":"Learned to design scalable and reliable systems by applying modern cloud architecture patterns to real-world challenges.","file_url":"https://www.coursera.org/","created_at":"2025-09-26 03:52:37.415884","tags":"{\"Cloud Architecture\",\"Design Patterns\",Reliability,\"Scalable Systems\"}"},
  {"idx":18,"id":"1035d8d1-06b9-4ed0-814d-df57c8ed1929","title":"Financial Literacy and Entreprenurial Skills","provider":"Fin1K","date_earned":"2025-03-26","description":"Certificate of attendance for the Fin1K Financial Literacy and Entrepreneurial Skills virtual workshop","file_url":"https://qlkwqrbqvtwxnkfsleqj.supabase.co/storage/v1/object/public/Certifications/Financial%20Literacy%20and%20Entrepreneurial%20Skills.pdf\n","created_at":"2025-03-26 08:58:33","tags":"[\"Personal Finance Management\", \"Banking & Debit Orders\", \"Financial Goal Setting\", \"Rights & Responsibilities\", \"Code of Banking Practice\", \"Starting a Business\";]"},
  {"idx":19,"id":"bb19973c-e57b-41db-98bc-2ad9b4599bde","title":"HCIA-5G V2.0 Course","provider":"Huawei","date_earned":"2025-01-15","description":"Covered the fundamentals of 5G architecture, deployment, and core technologies for modern telecom infrastructure.","file_url":"/certifications/HCIA 5G.pdf","created_at":"2025-09-26 03:52:37.415884","tags":"{Huawei,5G,Infrastructure}"},
  {"idx":20,"id":"38b6824d-7eab-410e-a7b9-dc7eb2b32109","title":"Fundamentals of Sustainability and Technology","provider":"IBM","date_earned":"2024-10-26","description":"Learned how technology intersects with sustainability, focusing on efficiency and sustainable innovation.","file_url":"https://www.credly.com/badges/d47c1b1a-9311-4d06-9d18-7d1811698d89","created_at":"2025-09-26 03:52:37.415884","tags":"{Sustainability,Technology,IBM}"},
  {"idx":21,"id":"fd7061f7-598b-4e8c-8f76-26f9d52b92e1","title":"Cybersecurity Fundamentals","provider":"IBM","date_earned":"2024-10-23","description":"Built a solid foundation in cybersecurity principles, essential protections, and modern security practices.","file_url":"https://www.credly.com/badges/0b902b8d-d715-4444-8398-f07127eb03b1","created_at":"2025-09-26 03:52:37.415884","tags":"{Cybersecurity,IBM,Essentials}"},
  {"idx":22,"id":"b7804902-1916-4be4-8195-ffd692efb0b7","title":"Explore Emerging Tech","provider":"IBM","date_earned":"2024-10-20","description":"Explored disruptive technologies in AI, cloud, and cybersecurity with a focus on practical enterprise use cases.","file_url":"https://www.credly.com/badges/589d3e65-f5a0-4275-929a-4b149b2b2cc1","created_at":"2025-09-26 03:52:37.415884","tags":"{\"Emerging Tech\",AI,Cloud,Cybersecurity}"},
  {"idx":23,"id":"80405462-d7d8-4ebc-8f6e-b1f71d16771c","title":"5G Basics: What It's All About","provider":"Huawei","date_earned":"2024-10-09","description":"Introduced the basics of 5G technology, its role in telecom, and applications across industries.","file_url":"https://www.credly.com/badges/02e7ae71-8ef7-4a47-8ba2-349e64448ec7","created_at":"2025-09-26 03:52:37.415884","tags":"{Huawei,5G,Telecom}"},
  {"idx":24,"id":"dabf240d-3e30-4f96-a5f1-502fa4acf6bd","title":"Next-Generation Cyber Security (CRA Training Program)","provider":"Huawei","date_earned":"2024-09-17","description":"Completed Huawei’s CRA cybersecurity program focused on enterprise security challenges and defense strategies.","file_url":"/certifications/CyberSecurity Prog.pdf","created_at":"2025-09-26 03:52:37.415884","tags":"{Cybersecurity,Huawei,\"CRA Program\"}"},
  {"idx":25,"id":"3b088809-2a60-4f9d-8ee6-bf50985423c8","title":"Next-Generation Cyber Security","provider":"Huawei","date_earned":"2024-09-10","description":"Studied advanced cybersecurity practices and threat management in next-gen digital infrastructures.","file_url":"/certifications/CyberSecurity Exam.pdf","created_at":"2025-09-26 03:52:37.415884","tags":"{Cybersecurity,Huawei,Next-Gen}"},
  {"idx":26,"id":"3a639fa7-16e6-4e67-b470-7198eb056db7","title":"Project Management Fundamentals","provider":"IBM","date_earned":"2024-09-03","description":"Gained practical project management skills, including lifecycle management and agile methodologies.","file_url":"https://www.credly.com/badges/bac33223-b77c-45f3-a2ca-6260c23043ae","created_at":"2025-09-26 03:52:37.415884","tags":"{\"Project Management\",IBM,\"Project Lifecycle Management\"}"},
  {"idx":27,"id":"6657c946-00af-4a3a-815e-52ab8546bcd8","title":"Microsoft Certified: Azure Fundamentals (AZ-900)","provider":"Microsoft","date_earned":"2024-08-24","description":"Demonstrated knowledge of Azure cloud concepts, services, and core solutions as part of Microsoft’s foundational certification.","file_url":"/certifications/AZ 900.pdf","created_at":"2025-09-26 03:52:37.415884","tags":"{\"Azure Services\",AZ-900,\"Cloud Concepts\",Fundamentals}"},
  {"idx":28,"id":"5307b103-408b-4cfc-bf7d-a0b80ccef3c1","title":"Cybersecurity Foundations","provider":"LinkedIn Learning Community","date_earned":"2024-07-30","description":"Built essential skills in cybersecurity, including security concepts, risk awareness, and defense basics.","file_url":"/certifications/Cybersecurity Foundations.pdf","created_at":"2025-09-26 03:52:37.415884","tags":"{Cybersecurity,Foundations}"},
  {"idx":29,"id":"68a125be-11fa-40a8-b833-051a14e09309","title":"Cybersecurity Awareness: Cybersecurity Terminology","provider":"LinkedIn Learning Community","date_earned":"2024-07-27","description":"Learned the key terminology and concepts necessary to understand and communicate security practices.","file_url":"/certifications/Cybersecurity Awareness.pdf","created_at":"2025-09-26 03:52:37.415884","tags":"{Cybersecurity,Awareness,Terminology,\"Information Security Awareness\"}"},
  {"idx":30,"id":"ef90bea7-1bec-4951-9a92-18d7ce56545f","title":"Career Skills in Software Development","provider":"LinkedIn Learning Community","date_earned":"2024-07-11","description":"Developed professional and technical career skills tailored for software development and teamwork.","file_url":"/certifications/Career Skills Software Dev.pdf","created_at":"2025-09-26 03:52:37.415884","tags":"{\"Tech Career Skills\",\"Career Management\",Development,\"Software Development\"}"}
];
// --- END: Injected JSON Data ---

/**
 * Creates an embedding for each certification entry and uploads it to Supabase.
 */
async function embedEachCertification() {
  let successCount = 0;
  let failureCount = 0;
  const totalCount = certificationsData.length;

  console.log(`Starting embedding process for ${totalCount} certifications...`);

  for (const cert of certificationsData) {
    try {
      // 1. Construct the content to be embedded
      // We combine the most descriptive fields into a single string.
      const contentToEmbed = `Certification: ${cert.title}. Provider: ${cert.provider}. Tags: ${cert.tags}. Description: ${cert.description}`;

      // 2. Create the embedding using OpenAI
      const embeddingResponse = await client.embeddings.create({
        model: "text-embedding-ada-002",
        input: contentToEmbed,
      });

      const embedding = embeddingResponse.data[0].embedding;

      // 3. Insert the data into the 'embeddings' table
      const { data, error } = await supabase.from("embeddings").insert({
        // Use the existing unique ID from the certification data
        id: cert.id,
        // Specific source type for individual certification records
        source_type: "certification",
        // Use the same ID as the source ID for traceability
        source_id: cert.id,
        // Store the text content that was embedded
        content: contentToEmbed,
        // Store the generated embedding vector
        embedding,
      });

      if (error) {
        throw error;
      }

      console.log(`\t[SUCCESS] Embedded: "${cert.title}"`);
      successCount++;

    } catch (err) {
      console.error(`\t[FAILURE] Error embedding "${cert.title}" (ID: ${cert.id}):`, err.message || err);
      failureCount++;
    }
  }

  console.log("--- Embedding Summary ---");
  console.log(`Total records processed: ${totalCount}`);
  console.log(`Successfully embedded: ${successCount}`);
  console.log(`Failed to embed: ${failureCount}`);
  console.log("-------------------------");
}

embedEachCertification();
