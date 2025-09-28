/**
 * Script to create text embeddings for each individual project record
 * and insert them into the 'embeddings' table in Supabase.
 *
 * It uses the provided projects_rows.json data, concatenating key fields
 * (title, tech stack, summary, and category) for the embedding content.
 */

// NOTE: This setup assumes the existence of 'dotenv', 'supabaseClient.js', and
// your OpenAI API key in the environment variables, similar to your context.

import dotenv from "dotenv";
// Initialize dotenv to load environment variables (like OPENAI_API_KEY)
dotenv.config();

// Placeholder imports for external services required in the provided context
// Replace these with your actual client implementations.
import { supabase } from "../src/lib/supabaseClient.js"; // Assume this provides an initialized Supabase client
import OpenAI from "openai"; // Assume 'openai' package is installed and configured

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- START: Injected JSON Data from projects_rows.json ---
const projectsData = [
  {"idx":0,"id":"009c48c0-2473-437e-a7a7-aab17e8c5ca9","title":"OSINT Tool","tech_stack":["Python","BeautifulSoup","Javascript","Domain API"],"summary":"OSINT tool is an open-source, powerful reconnaissance and OSINT (Open-Source Intelligence)tool designed to streamline and automate the process of gathering critical information.","demo_url":"https://reconX-f0yv5z9in-mrspecks-projects.vercel.app/","repo_url":"https://github.com/MrSpecks/ReconX","screenshot_url":"/api/placeholder/600/400","created_at":"2025-09-26 03:37:35.93407","description":"ReconX is an open-source, powerful reconnaissance and OSINT (Open-Source Intelligence) tool designed to streamline and automate the process of gathering critical information.","category":"Web Tool"},
  {"idx":1,"id":"4b11e695-aede-43c2-bca8-f1d071938ad0","title":"Property Reviews Dashboard","tech_stack":["React","Typescript","TailwindCSS","API Integration","Data Normalization","Dashboard UI"],"summary":"A modern reviews management dashboard built to help property managers track and improve guest experience. The app integrates with a reviews API, normalizes data \r\nand provides an interface to filter, approve, and publish guest feedback. Only manager-approved reviews appear on the public property page, ensuring trust and consistency.","demo_url":"https://flexliving-reviews-dashboard-n1rnorflb-mrspecks-projects.vercel.app/","repo_url":"https://github.com/MrSpecks/flexliving-reviews-dashboard","screenshot_url":"/api/placeholder/600/400","created_at":"2025-09-26 03:37:35.93407","description":"A modern reviews management dashboard built to help property managers track and improve guest experience. The app integrates with a reviews API, normalizes data across multiple channels, and provides an interface to filter, approve, and publish guest feedback. Only manager-approved reviews appear on the public property page, ensuring trust and consistency.","category":"Web App"},
  {"idx":2,"id":"57235f9a-af5f-496d-ab47-fcf4488f51ab","title":"AI Brochure Maker","tech_stack":["Python","Jupyter Notebook","BeautifulSoup","OpenAI API"],"summary":"The AI Brochure Maker is a Jupyter Notebook project that automates the creation of professional company brochures. It scrapes and analyzes website content, identifies the most relevant information (e.g., About, Company, Careers pages), and generates a polished brochure draft using a Large Language Model.","demo_url":"https://demo-aibrochure.example.com","repo_url":"https://github.com/MrSpecks/LLM-Engineering-Projects/tree/main/AI-Brochure-Maker","screenshot_url":"/api/placeholder/600/400","created_at":"2025-09-26 03:37:35.93407","description":"The AI Brochure Maker is a Jupyter Notebook project that automates the creation of professional company brochures. It scrapes and analyzes website content, identifies the most relevant information (e.g., About, Company, Careers pages), and generates a polished brochure draft using a Large Language Model.","category":"AI Tool"},
  {"idx":3,"id":"61208c47-e5bc-44c9-98ae-3d0b48020f52","title":"CMS Reconnaisance Tool","tech_stack":["Python","Typescript","Javascript","CSS"],"summary":"This tool is a high-performance, intelligent CMS Reconnaissance tool designed for authorized penetration testing engagements. It detects the backend technologies used by a wide range of websites (including PHP, JSP, Java EE, React, Vue, WordPress, and custom stacks)","demo_url":"https://neo-shell-f0yv5z9in-mrspecks-projects.vercel.app/","repo_url":"https://github.com/MrSpecks/NeoShell","screenshot_url":"/api/placeholder/600/400","created_at":"2025-09-26 03:37:35.93407","description":"This tool is a high-performance, intelligent CMS Reconnaissance tool designed for authorized penetration testing engagements. It detects the backend technologies used by a wide range of websites (including PHP, JSP, Java EE, React, Vue, WordPress, and custom stacks)","category":"Web Tool"},
  {"idx":4,"id":"792c34db-7d5a-452d-b079-3c7026490eed","title":"API Documentation Tool (In Development)","tech_stack":["React","Node.js","Swagger","Docker"],"summary":"An interactive API documentation generator that automatically creates beautiful docs from OpenAPI specifications with testing capabilities.","demo_url":"https://api-docs.example.com","repo_url":"https://github.com/MrSpecks/api-docs","screenshot_url":"/api/placeholder/600/400","created_at":"2025-09-26 03:37:35.93407","description":"An interactive API documentation generator that automatically creates beautiful docs from OpenAPI specifications with testing capabilities.","category":"Tool"},
  {"idx":5,"id":"7d271174-870b-4d50-9c0f-acbc0ee61f85","title":"AI Q&A Code Assistant","tech_stack":["Python","Jupyter Notebook","OpenAI API","Streamlit"],"summary":"The AI Q&A Bot is a Jupyter Notebook project that allows you to interactively ask technical or general questions and receive AI-generated answers in real-time. It leverages a Large Language Model to provide accurate and context-aware responses, making it a valuable tool for developers and learners.","demo_url":"https://Question%26Answer.example.com","repo_url":"https://github.com/MrSpecks/LLM-Engineering-Projects/tree/main/Question%26Answer-bot","screenshot_url":"/api/placeholder/600/400","created_at":"2025-09-26 03:37:35.93407","description":"The AI Q&A Bot is a Jupyter Notebook project that allows you to interactively ask technical or general questions and receive AI-generated answers in real-time. It leverages a Large Language Model to provide accurate and context-aware responses, making it a valuable tool for developers and learners.","category":"AI Tool"},
  {"idx":6,"id":"8cd91044-59e5-41d7-8bc4-146c8265d2e2","title":"Personal Portfolio RAG Agent","tech_stack":["React","Supabase","TailwindCSS","OpenRouter","RAG Pipeline"],"summary":"A Retrieval-Augmented Generation (RAG) agent integrated into my portfolio website. It's trained on my own site content and connected to Supabase for persistent learning. The agent not only answers visitor questions but also logs unknown queries to Supabase, creating a feedback loop that helps me continuously improve its knowledge base","demo_url":"https://chat-app.example.com","repo_url":"https://github.com/username/chat-app","screenshot_url":"/api/placeholder/600/400","created_at":"2025-09-26 03:37:35.93407","description":"A Retrieval-Augmented Generation (RAG) agent integrated into my portfolio website. It's trained on my own site content and connected to Supabase for persistent learning. The agent not only answers visitor questions but also logs unknown queries to Supabase, creating a feedback loop that helps me continuously improve its knowledge base.","category":"Web App"},
  {"idx":7,"id":"ca8cf7ef-66bd-468b-a9a7-642fbdb30cd5","title":"Website Scraper & Summarizer","tech_stack":["Python","Jupyter Notebook","BeautifulSoup","OpenAI API"],"summary":"This project is a Jupyter Notebook application that allows you to scrape the contents of a website and automatically generate a concise summary using a Large Language Model (LLM). It combines web scraping techniques with natural language processing to produce easy-to-read summaries of online content.","demo_url":"https://websitescraper%26summarizer.example.com","repo_url":"https://github.com/MrSpecks/LLM-Engineering-Projects/tree/main/Webscrapper-summarizer","screenshot_url":"/api/placeholder/600/400","created_at":"2025-09-26 03:37:35.93407","description":"This project is a Jupyter Notebook application that allows you to scrape the contents of a website and automatically generate a concise summary using a Large Language Model (LLM). It combines web scraping techniques with natural language processing to produce easy-to-read summaries of online content.","category":"AI Tool"},
  {"idx":8,"id":"e3b3c30f-4e79-4d69-ad22-2ee9a22f2403","title":"Personal Portfolio Website","tech_stack":["React","Tailwind CSS","Lucide","TypeScript","Vercel"],"summary":"A modern, responsive portfolio website showcasing projects and skills. Built with React, featuring smooth animations and dark mode support.","demo_url":"https://portfolio.example.com","repo_url":"https://github.com/MrSpecks/MrSpecks-/tree/main/portfolio","screenshot_url":"/api/placeholder/600/400","created_at":"2025-09-26 03:37:35.93407","description":"A modern, responsive portfolio website showcasing projects and skills. Built with React, featuring smooth animations and dark mode support.","category":"Website"}
];
// --- END: Injected JSON Data ---

/**
 * Creates an embedding for each project entry and uploads it to Supabase.
 */
async function embedEachProject() {
  let successCount = 0;
  let failureCount = 0;
  const totalCount = projectsData.length;

  console.log(`Starting embedding process for ${totalCount} projects...`);

  for (const project of projectsData) {
    try {
      // 1. Construct the content to be embedded
      // Join the tech stack array into a readable string for better context.
      const techStackString = project.tech_stack.join(', ');
      
      const contentToEmbed = `Project Title: ${project.title}. Category: ${project.category}. Tech Stack: ${techStackString}. Summary: ${project.summary}`;

      // 2. Create the embedding using OpenAI
      const embeddingResponse = await client.embeddings.create({
        model: "text-embedding-ada-002",
        input: contentToEmbed,
      });

      const embedding = embeddingResponse.data[0].embedding;

      // 3. Insert the data into the 'embeddings' table
      const { data, error } = await supabase.from("embeddings").insert({
        // Use the existing unique ID from the project data
        id: project.id,
        // Specific source type for individual project records
        source_type: "project",
        // Use the same ID as the source ID for traceability
        source_id: project.id,
        // Store the text content that was embedded
        content: contentToEmbed,
        // Store the generated embedding vector
        embedding,
      });

      if (error) {
        throw error;
      }

      console.log(`\t[SUCCESS] Embedded: "${project.title}"`);
      successCount++;

    } catch (err) {
      console.error(`\t[FAILURE] Error embedding "${project.title}" (ID: ${project.id}):`, err.message || err);
      failureCount++;
    }
  }

  console.log("--- Embedding Summary ---");
  console.log(`Total records processed: ${totalCount}`);
  console.log(`Successfully embedded: ${successCount}`);
  console.log(`Failed to embed: ${failureCount}`);
  console.log("-------------------------");
}

embedEachProject();
