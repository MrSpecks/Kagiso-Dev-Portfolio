import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import https from "https";

// Initialize API constants from environment variables
const JINA_API_KEY =
  process.env.VERCEL_JINA_API_KEY || process.env.JINA_API_KEY;

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
      hostname: "api.jina.ai",
      path: "/v1/embeddings",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JINA_API_KEY}`,
      },
    };

    const payload = {
      model: "jina-embeddings-v3",
      task: "retrieval.passage",
      input: [input],
    };

    const req = https.request(options, (res) => {
      let chunks = [];
      res.on("data", (d) => {
        chunks.push(d);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks).toString();

        if (res.statusCode !== 200) {
          try {
            const errorResult = JSON.parse(body);
            return reject(
              new Error(
                `Jina API Error (${res.statusCode}): ${
                  errorResult.detail || body
                }`
              )
            );
          } catch {
            return reject(new Error(`Jina API Error (${res.statusCode}): ${body}`));
          }
        }

        try {
          const result = JSON.parse(body);
          const embedding = result.data[0].embedding;
          resolve(embedding);
        } catch (e) {
          reject(
            new Error(
              "Failed to parse Jina API response: " +
                e.message +
                "\nRaw Body: " +
                body
            )
          );
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(JSON.stringify(payload));
    req.end();
  });
}

// --- 2. Contact Details Meta Facts ---

const metaFacts11 = [
  {
    title: "Contact Details: Primary Contact Methods and Response Times",
    content:
      "Kagiso Mfusi can be reached primarily via email at kagisomfusi@outlook.com, the preferred contact method for all inquiries. Email response time is typically within 24-48 hours during business days (Monday-Friday, 9:00 AM - 5:00 PM SAST). For urgent matters or scheduled consultations, clients can call +27 69 628 7623, though it is recommended to email first to schedule a call for best response times. For project-related matters, active clients may receive expedited responses, and emergency support outside business hours is available for clients with active maintenance contracts.",
  },
  {
    title: "Business Hours: Operating Schedule and Response Expectations",
    content:
      "Standard business hours are Monday-Friday, 9:00 AM - 5:00 PM SAST. Saturday and Sunday are non-business days. Response expectations include email inquiries within 24-48 hours, project updates within agreed timelines, emergency support per maintenance agreement, and consultations by scheduled appointment. For urgent project-related matters, active clients may receive expedited responses. Emergency support outside business hours is available only for clients with active maintenance contracts. All communication is professional and timely within established guidelines.",
  },
  {
    title: "Location and Service Delivery: South Africa Based, Worldwide Remote",
    content:
      "Kagiso Mfusi is based in South Africa and operates within the South African timezone (SAST). Services are provided remotely to clients worldwide without geographic limitations. This enables collaboration with international clients while maintaining South African business roots and compliance with local regulations. Remote service delivery means clients can engage regardless of their location, with all communication conducted through digital channels optimized for productivity and clear understanding.",
  },
  {
    title: "Professional Networks: LinkedIn, GitHub, and Certifications",
    content:
      "Professional presence is maintained across multiple platforms. LinkedIn profile showcases professional background and network at linkedin.com/in/kagiso-m-95b329224. GitHub profile (github.com/MrSpecks) displays code repositories, open-source contributions, and project portfolios. Credly profile (credly.com/users/kagiso-mfusi) displays professional certifications and digital badges including Oracle Certified Multicloud Architect Professional and Microsoft Azure Fundamentals certifications. These platforms provide verification of expertise and enable professional networking.",
  },
  {
    title: "Preferred Communication Methods: Priority and Best Practices",
    content:
      "Email is the primary and preferred communication method for initial inquiries, detailed project discussions, document sharing, and formal communications. Email allows for thoughtful responses and maintains a written record. Scheduled phone or video calls are suitable for in-depth consultations, project kickoffs, and complex technical discussions. Phone calls should be scheduled via email for optimal preparation and time management. Project management tools (Trello, Asana, GitHub) are used for active projects to track tasks and progress updates, enabling streamlined collaboration.",
  },
  {
    title: "Project Inquiry Preparation: Information to Include",
    content:
      "To receive the most accurate and helpful response, inquiries should include your name and company (if applicable), type of service needed, brief project description, desired timeline or urgency, budget range (if determined), specific technical requirements, any relevant background information, and preferred contact method. Detailed inquiries help in providing faster, more accurate initial assessments. Including this information demonstrates serious interest and enables more productive first discussions. Inquiries lacking key information may require follow-up before proceeding.",
  },
  {
    title: "Services Available: Development, Consulting, and Design",
    content:
      "Development services include web development, AI systems, and automation solutions. Consulting services include AI strategy, technology architecture, and process optimization. Design services include UI/UX design, system design, and cloud architecture. These service categories cover the full spectrum of technology consulting and development needs. Portfolio and case studies showcasing completed projects are available for review. Specific service availability can be confirmed in initial inquiry responses based on current capacity and project requirements.",
  },
  {
    title: "Emergency Support: Conditions and Maintenance Contracts",
    content:
      "Emergency support for critical production issues may be available after business hours only for clients with active maintenance or support agreements. Emergency contact procedures are outlined in service agreements specific to each project. Response time is based on severity level (Critical, High, Medium, Low) with defined SLAs. Emergency support availability depends on maintenance contract terms. For clients without active maintenance agreements, urgent new projects should be emailed with 'URGENT' in the subject line for expedited consideration.",
  },
  {
    title: "Privacy and Data Protection: POPIA Compliance",
    content:
      "All communications and information shared are handled in accordance with the Privacy Policy and South Africa's Protection of Personal Information Act (POPIA). Privacy is treated as a fundamental right and protected throughout all interactions. Kagiso Mfusi respects privacy and never shares information with third parties without explicit consent. Contact information is used solely for responding to inquiries and providing services. Data retention follows POPIA requirements with secure deletion after retention periods expire.",
  },
  {
    title: "Getting Started: First Contact and Project Inquiry Process",
    content:
      "To initiate engagement, send an email to kagisomfusi@outlook.com with project details, objectives, timeline, and budget range if available. Include any specific technical requirements, relevant background information, and preferred communication method. Expect a response within 24-48 hours with initial assessment and next steps. If budget or timeline is uncertain, initial consultation is offered to discuss feasibility and provide guidance. Once project scope is clear, detailed proposal and formal engagement terms will be provided.",
  },
];

// --- 3. Main Embedding Logic ---

/**
 * Creates an embedding for each contact details meta fact and uploads it to Supabase.
 */
async function embedMetaFacts11() {
  let successCount = 0;
  let failureCount = 0;
  const totalCount = metaFacts11.length;

  console.log(`Starting embedding process for ${totalCount} contact details meta facts...`);

  for (const fact of metaFacts11) {
    const factId = uuidv4();
    try {
      console.log(`\t[INFO] Embedding: "${fact.title}"`);

      // 1. Create the embedding
      const embedding = await getJinaEmbedding(fact.content);

      // 2. Insert the data into the 'embeddings' table
      const { data, error } = await supabase.from("embeddings").insert({
        id: factId,
        source_type: "contact_details",
        source_id: factId,
        content: fact.content,
        embedding,
      });

      if (error) {
        throw error;
      }

      console.log(`\t[SUCCESS] Embedded: "${fact.title}" (ID: ${factId})`);
      successCount++;
    } catch (err) {
      console.error(
        `\t[FAILURE] Error embedding "${fact.title}" (ID: ${factId}):`,
        err.message || err
      );
      failureCount++;
    }
  }

  console.log("--- Contact Details Embeddings Summary ---");
  console.log(`Total records processed: ${totalCount}`);
  console.log(`Successfully embedded: ${successCount}`);
  console.log(`Failed to embed: ${failureCount}`);
  console.log("----------------------------------------");
}

embedMetaFacts11();
