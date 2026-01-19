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

// --- 2. Cancellation Policy Meta Facts ---

const metaFacts8 = [
  {
    title: "Cancellation Policy: Overview and Fair Treatment Principles",
    content:
      "Kagiso Mfusi's Cancellation Policy outlines the terms under which either party may cancel professional service engagements. The policy is designed with commitment to fair, transparent business practices in accordance with South African law, specifically the Consumer Protection Act (CPA). Both contractor and client cancellation rights are clearly defined with distinct procedures for early cancellation (pre-commencement), mid-project cancellation, and cancellation for cause scenarios. The policy ensures protection of both parties' interests.",
  },
  {
    title: "Client Cancellation: Early Cancellation Within 7 Days",
    content:
      "Clients may cancel within 7 days of the service agreement with full refund of deposit minus processing fees (maximum 5%). This cooling-off period provides clients with risk-free project evaluation time before work commences. Written notice via email to kagisomfusi@outlook.com is required. After 7 days but before work starts, clients may cancel with 50% of deposit retained to cover project preparation, planning, and opportunity cost, with remaining 50% refunded within 14 business days.",
  },
  {
    title: "Client Cancellation: Mid-Project Cancellation Requirements",
    content:
      "If clients cancel after work has commenced, a minimum of 14 days written notice is required for orderly project wind-down and documentation handover. Clients remain responsible for payment of all work completed up to the effective cancellation date, including completed project phases and milestones, work-in-progress calculated on pro-rata basis, third-party service costs already incurred, and non-refundable expenses paid on their behalf. Comprehensive documentation of all completed work and source code (if applicable) will be provided within 7 business days of final payment.",
  },
  {
    title: "Client Cancellation: Rights to Completed Work Products",
    content:
      "Upon mid-project cancellation, clients retain full rights to all completed deliverables and work product provided up to the cancellation date, subject to full payment of outstanding invoices. Work product ownership is contingent on payment settlement. Upon final payment, comprehensive documentation, source code, and transition materials are delivered to ensure seamless handover. All deliverables completed and paid for become the client's property, enabling them to continue development with other contractors if desired.",
  },
  {
    title: "Client Cancellation for Cause: Contractor Material Breach",
    content:
      "Clients may cancel immediately without penalty if Kagiso Mfusi materially breaches the service agreement and fails to remedy the breach within 14 days of written notice. In such cases, clients are entitled to a refund of all payments made for undelivered work, calculated based on completed milestones. Material breach scenarios include failure to deliver agreed-upon milestones beyond reasonable timelines without valid justification, engagement in fraudulent or illegal conduct related to the project, or unethical behavior affecting service quality.",
  },
  {
    title: "Contractor Cancellation: Non-Payment and Overdue Invoices",
    content:
      "Kagiso Mfusi reserves the right to cancel the project engagement if any invoice remains unpaid for more than 30 days beyond the due date, despite two written reminders. Alternatively, if payment for completed milestones is not received within agreed payment terms (typically 7-14 days of invoice), the contractor may terminate. Upon cancellation for non-payment, clients remain liable for all outstanding payments for completed work, and the contractor retains all intellectual property rights and work product until full payment is received.",
  },
  {
    title: "Contractor Cancellation: IP Retention and Access Suspension",
    content:
      "When the contractor cancels due to non-payment, access to project deliverables, code repositories, and work product is suspended until payment is received. The contractor may pursue legal remedies to recover outstanding amounts plus interest at 2% per month (or maximum legal rate) and collection costs. This protection mechanism ensures contractors can recover their investment in unpaid work. The suspension is lifted immediately upon full payment of all outstanding invoices.",
  },
  {
    title: "Contractor Cancellation: Material Breach by Client",
    content:
      "Kagiso Mfusi may terminate the engagement immediately if the client materially breaches the service agreement and fails to remedy within 14 days of written notice. Grounds for termination include engaging in abusive, harassing, or discriminatory conduct; requesting illegal, unethical, or harmful activities; failing to provide necessary access or information after repeated requests; breaching confidentiality obligations; or misusing proprietary information shared during engagement.",
  },
  {
    title: "Cancellation for Force Majeure: Uncontrollable Circumstances",
    content:
      "Either party may cancel without liability if project completion becomes impossible due to causes beyond reasonable control. Force majeure events include acts of God (natural disasters, pandemics, extreme weather), government actions or legal prohibitions, war or terrorism, civil unrest or national emergencies, and critical infrastructure failures. In force majeure situations, payment obligations are calculated based on work completed up to the cancellation date, with refunds processed for undelivered work.",
  },
  {
    title: "Project Suspension: Temporary Hold and Resumption Terms",
    content:
      "Projects may be temporarily suspended by mutual written agreement for a maximum of 90 days without formal cancellation or resumption decision. If suspension exceeds 30 days, minimum 14 days notice is required to resume work. Projects suspended for more than 60 days may require scope, timeline, and pricing revalidation before resumption. Capacity cannot be guaranteed upon resumption; restart timelines will be communicated upon request. If projects remain on hold beyond 90 days without communication, they are deemed automatically cancelled.",
  },
  {
    title: "Cancellation Process: Written Notice Requirements",
    content:
      "All cancellations must be submitted in writing via email to kagisomfusi@outlook.com. The written notice must include client name and project identification details, effective cancellation date (minimum 14 days from notice unless otherwise agreed), reason for cancellation (optional but helpful), and request for final accounting and deliverables handover. Acknowledgment of cancellation receipt will be provided within 2 business days. A project wind-down plan outlining final deliverables, outstanding payments, and handover timeline will be provided.",
  },
  {
    title: "Post-Cancellation Obligations: Final Invoice and Settlement",
    content:
      "Upon project cancellation, a final invoice is issued within 7 business days detailing all completed work, outstanding payments, and applicable refunds. Final payments are due within 14 days of invoice unless otherwise agreed in writing. Upon final payment, all work product is transferred with comprehensive documentation. Project-related data is retained for 90 days post-cancellation for potential resumption or dispute resolution, then securely deleted unless requested otherwise. Confidentiality obligations survive project cancellation indefinitely.",
  },
  {
    title: "Intellectual Property on Cancellation: Paid vs. Unpaid Work",
    content:
      "Upon cancellation, clients receive full ownership rights to all completed deliverables for which full payment has been made. Unpaid work product remains the property of the contractor until payment is received; rights transfer only upon full payment. Each party retains ownership of any pre-existing intellectual property brought to the project. Open-source components remain subject to their original licenses regardless of cancellation. The contractor retains rights to proprietary processes, methodologies, tools, and frameworks used during the project.",
  },
  {
    title: "Consumer Protection Act Compliance: CPA Cooling-Off and Fair Terms",
    content:
      "Under South Africa's Consumer Protection Act (CPA), clients have specific cancellation rights. A 5-business-day cooling-off period may apply for certain services, during which cancellation is allowed without penalty (subject to CPA terms). Cancellation penalties must be reasonable and proportionate to actual losses incurred. Clear communication about cancellation procedures and financial implications is guaranteed. The contractor will not create unreasonable barriers to exercising cancellation rights. Nothing in this policy limits statutory rights under the CPA or other applicable South African law.",
  },
  {
    title: "Dispute Resolution for Cancellation Issues",
    content:
      "If disputes arise regarding project cancellation, both parties commit to good faith discussions to reach amicable resolution. If direct discussion fails, mediation through an independent mediator is recommended before pursuing legal action. Clients may lodge complaints with the National Consumer Commission at 086 010 3600 or www.thencc.gov.za. As a last resort, disputes are resolved through South African courts under South African law.",
  },
];

// --- 3. Main Embedding Logic ---

/**
 * Creates an embedding for each cancellation policy meta fact and uploads it to Supabase.
 */
async function embedMetaFacts8() {
  let successCount = 0;
  let failureCount = 0;
  const totalCount = metaFacts8.length;

  console.log(`Starting embedding process for ${totalCount} cancellation policy meta facts...`);

  for (const fact of metaFacts8) {
    const factId = uuidv4();
    try {
      console.log(`\t[INFO] Embedding: "${fact.title}"`);

      // 1. Create the embedding
      const embedding = await getJinaEmbedding(fact.content);

      // 2. Insert the data into the 'embeddings' table
      const { data, error } = await supabase.from("embeddings").insert({
        id: factId,
        source_type: "cancellation_policy",
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

  console.log("--- Cancellation Policy Embeddings Summary ---");
  console.log(`Total records processed: ${totalCount}`);
  console.log(`Successfully embedded: ${successCount}`);
  console.log(`Failed to embed: ${failureCount}`);
  console.log("---------------------------------------------");
}

embedMetaFacts8();
