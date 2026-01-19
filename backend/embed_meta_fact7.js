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

// --- 2. Refund Policy Meta Facts ---

const metaFacts7 = [
  {
    title: "Refund Policy: Overview and Consumer Protection Compliance",
    content:
      "Kagiso Mfusi's Refund Policy outlines terms and conditions under which refunds are provided for professional services including web development, AI system development, automation solutions, and consulting services. The policy is committed to fair business practices and full compliance with the South African Consumer Protection Act (CPA), ensuring clients have clear understanding of their rights and refund eligibility criteria. Services are professional and value-driven, with transparent refund procedures that protect both parties.",
  },
  {
    title: "Refund Eligibility: Full Refund for Early Cancellation",
    content:
      "Clients are eligible for a full refund minus processing fees (maximum 5%) if they cancel their project within 7 days of the initial deposit payment and before any work has commenced. This cooling-off period aligns with Consumer Protection Act standards and gives clients a risk-free evaluation period. Processing fees cover payment method charges. Early cancellation must be submitted in writing via email to kagisomfusi@outlook.com within the seven-day window to qualify.",
  },
  {
    title: "Refund Eligibility: Service Delivery Failures",
    content:
      "If Kagiso Mfusi fails to deliver agreed-upon services within the specified timeline and scope, and cannot reach a mutually acceptable resolution with the client, the client may be eligible for a partial or full refund of payments made for undelivered work. This eligibility extends to situations where service quality issues cannot be remedied or where the service provider's breach of contract is material. Refund determination is based on work completion status and value delivered.",
  },
  {
    title: "Refund Eligibility: Material Breach and Technical Impossibility",
    content:
      "Material breach of the service agreement by Kagiso Mfusi, if unresolved within 14 days of written notice, qualifies clients for refund consideration. Additionally, if project completion becomes technically impossible as specified and no acceptable alternative solution can be proposed, clients may receive a refund. These conditions protect clients from scenarios where delivery is genuinely not feasible. Both situations require documented evidence and written communication to establish breach conditions.",
  },
  {
    title: "Non-Refundable Items: Completed Work and Custom Development",
    content:
      "Any work that has been completed, delivered, and accepted by the client is non-refundable, including completed project phases, deliverables, and milestones. Custom development work, once provided to the client, is non-refundable, even if the client chooses not to proceed with the project. This includes custom code, designs, and solutions where development time has been invested. These terms are standard in professional services to protect contractor investment in intellectual work.",
  },
  {
    title: "Non-Refundable Items: Third-Party Costs and Services",
    content:
      "Third-party service costs are non-refundable, including expenses for APIs, hosting, domain registration, software licenses, and external services paid on the client's behalf. Similarly, consulting and strategy sessions are non-refundable once conducted, as the service involves professional time investment in discovery meetings, consultation sessions, strategy development, and planning. These costs represent actual vendor expenses and professional engagement time that cannot be reversed.",
  },
  {
    title: "Non-Refundable Items: Change of Mind and Non-Delivery",
    content:
      "Refunds will not be issued if clients simply change their mind about the project after work has commenced, unless otherwise agreed in writing. This applies regardless of business circumstances or internal priority shifts. This policy protects the service provider from scope uncertainty and ensures commitment from clients. However, exceptions can be negotiated with explicit written agreement for specific situations.",
  },
  {
    title: "Refund Request Timeframes and Deadlines",
    content:
      "Clients must submit written refund requests within specific timeframes to be eligible. For early cancellation, requests must be within 7 days of initial deposit payment and before work commencement. For service issues, claims must be submitted within 14 days of becoming aware of the problem. For project completion issues, requests must be made within 30 days of final project delivery. Requests submitted after these windows may not be honored unless required by law under the Consumer Protection Act.",
  },
  {
    title: "Refund Process: Step-by-Step Request and Review Procedure",
    content:
      "To request a refund, clients must submit a detailed written request via email to kagisomfusi@outlook.com including their name, project details, payment information, and reason for the refund request. The refund request will be reviewed within 5 business days with a determination response provided. Supporting documentation or evidence may be requested to substantiate the claim. If approved, refunds are processed within 14-30 business days depending on payment method and financial institution processing times.",
  },
  {
    title: "Refund Methods: Original Payment Channel Returns",
    content:
      "Refunds are issued to the original payment method used for the transaction. For bank transfer or EFT, refunds are transferred back to the originating bank account within 5-10 business days after approval. Credit or debit card refunds appear on card statements within 10-14 business days depending on card issuer processing. PayPal or other platform refunds are credited within 7-10 business days. International transfers may take up to 30 business days and may be subject to currency conversion rates at the time of refund processing.",
  },
  {
    title: "Partial Refunds: Milestone-Based Project Calculation",
    content:
      "For projects with completed milestones, partial refunds are calculated based on the proportion of completed milestones versus total project value. Completed and approved milestones are non-refundable because they represent delivered work product. The refund calculation compares what was delivered against the full project scope. All partial refund calculations are documented and provided to the client for review before processing to ensure transparency.",
  },
  {
    title: "Partial Refunds: Time-Based and Value-Based Projects",
    content:
      "For time-based or hourly engagements, refunds are calculated based on hours worked versus total hours contracted. For value-based projects with flexible pricing, refunds are calculated based on the proportion of deliverables completed and value already provided. Both calculation methods ensure fairness by reflecting the work actually performed versus what was contracted. Documentation of calculation methodology is provided to clients for verification and agreement.",
  },
  {
    title: "Consumer Protection Act Compliance and Legal Rights",
    content:
      "Under South Africa's Consumer Protection Act (CPA), clients have statutory rights that cannot be limited by this policy. These include the right to fair, honest, and transparent dealings; the right to receive services of good quality suitable for intended purposes; the right to services performed professionally with reasonable care and skill; and the right to cancel advance bookings under certain circumstances. Nothing in the Refund Policy limits rights under the CPA or other applicable South African consumer protection laws.",
  },
];

// --- 3. Main Embedding Logic ---

/**
 * Creates an embedding for each refund policy meta fact and uploads it to Supabase.
 */
async function embedMetaFacts7() {
  let successCount = 0;
  let failureCount = 0;
  const totalCount = metaFacts7.length;

  console.log(`Starting embedding process for ${totalCount} refund policy meta facts...`);

  for (const fact of metaFacts7) {
    const factId = uuidv4();
    try {
      console.log(`\t[INFO] Embedding: "${fact.title}"`);

      // 1. Create the embedding
      const embedding = await getJinaEmbedding(fact.content);

      // 2. Insert the data into the 'embeddings' table
      const { data, error } = await supabase.from("embeddings").insert({
        id: factId,
        source_type: "refund_policy",
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

  console.log("--- Refund Policy Embeddings Summary ---");
  console.log(`Total records processed: ${totalCount}`);
  console.log(`Successfully embedded: ${successCount}`);
  console.log(`Failed to embed: ${failureCount}`);
  console.log("---------------------------------------");
}

embedMetaFacts7();
