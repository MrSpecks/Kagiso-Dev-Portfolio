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

// --- 2. Terms of Service Meta Facts ---

const metaFacts10 = [
  {
    title: "Terms of Service: Agreement Scope and Service Overview",
    content:
      "These Terms of Service govern professional services provided by Kagiso Mfusi including website development, AI system development, automation solutions, consulting services, multicloud architecture, and UI/UX design. By engaging services, contacting for consultations, or entering into a service agreement, clients agree to be bound by these Terms. Services are provided on a project-by-project basis as an independent contractor, not as an employee or retainer consultant. Each project is governed by specific scope of work, timeline, and deliverables agreed upon in writing.",
  },
  {
    title: "Services Offered: Development and Architecture Solutions",
    content:
      "Website Development services include custom website design, development, and deployment using modern frameworks and technologies. AI System Development covers AI model integration, automation solutions, machine learning implementations, and intelligent system design. Automation Solutions handle business process automation, workflow optimization, and system integration. Multicloud Architecture provides cloud infrastructure design, deployment, and optimization across multiple cloud platforms. UI/UX Design includes user interface and experience design, usability optimization, and design systems.",
  },
  {
    title: "Services NOT Offered: Limitations and Exclusions",
    content:
      "Services do not include full-time employment or retainer-based engagements unless explicitly agreed. 24/7 emergency support outside agreed maintenance contracts is not provided. Legal, financial, or accounting services are excluded. Content creation (copywriting, photography, videography) is not offered unless specified in project scope. Services involving illegal, unethical, or harmful activities are not undertaken. Service scope is clearly defined in project proposals to ensure mutual understanding of what will and will not be delivered.",
  },
  {
    title: "Pricing Structure: Value-Based and Outcome-Driven Approach",
    content:
      "Pricing is outcome-driven and value-based rather than hourly or arbitrary rates. Project fees are determined based on value delivered, project complexity, required expertise, and business impact. Each project receives a detailed, transparent quote after thorough discovery and requirements analysis. Most projects are quoted as fixed-price engagements with clear deliverables and timelines. For certain consulting or ongoing work, hourly or daily rates may apply (agreed in advance). All costs, including third-party services, are disclosed upfront in project proposals with no hidden fees.",
  },
  {
    title: "Payment Schedule: Deposits and Milestone Structure",
    content:
      "Standard payment terms structure deposits and milestones. Typically 30-50% deposit is required before project commencement to secure resources and cover initial costs. For larger projects, payments are structured around key milestones (for example: 30% deposit, 30% at mid-point, 40% on completion). Final payment is due upon project completion and delivery of all deliverables, before final handover. Payment terms state payment is due within 7-14 days of invoice date (specific terms stated on each invoice). Overdue invoices may incur interest at 2% per month or the maximum legal rate, whichever is lower.",
  },
  {
    title: "Payment Methods and Third-Party Costs Responsibility",
    content:
      "Accepted payment methods include bank transfer or EFT (South African bank accounts), international wire transfer (for international clients), PayPal or other digital payment platforms (subject to processing fees), and credit/debit card payments (if arranged). Clients are responsible for all third-party costs including hosting, domain registration, API subscriptions, software licenses, and external services required for the project. These are typically paid directly by the client or reimbursed if paid on client's behalf (with prior written approval).",
  },
  {
    title: "Project Phases: Discovery Through Deployment",
    content:
      "Discovery Phase includes initial consultation to understand requirements, objectives, constraints, and success criteria through requirements gathering, technical feasibility assessment, project scope definition, timeline and budget estimation, and proposal preparation. Design/Planning Phase provides detailed planning including architecture and technical design, UI/UX wireframes and mockups (if applicable), data modeling, technology stack finalization, and project roadmap definition. Development/Implementation Phase includes iterative development with milestone check-ins, regular progress reports and demonstrations, client feedback incorporation, and code reviews.",
  },
  {
    title: "Project Testing and Deployment: Quality Assurance and Handover",
    content:
      "Testing and Quality Assurance includes functional testing of all features, performance and security testing, cross-browser and device compatibility testing (for web projects), user acceptance testing (UAT) with client participation, and bug fixes and refinements. Deployment and Handover include production deployment and configuration, comprehensive documentation delivery, knowledge transfer and training (if included in scope), source code and asset handover, and post-launch support period (typically 30 days included).",
  },
  {
    title: "Intellectual Property Rights: Client Ownership Upon Payment",
    content:
      "Upon full payment, clients own all rights, title, and interest in final deliverables specifically created for their project. For development projects, clients receive full source code ownership (unless otherwise specified for proprietary components). All project documentation created becomes client property. Ownership transfer is contingent on full payment of all invoices; the contractor retains rights until final payment is received. Work product ownership is comprehensive, allowing clients to use, modify, and distribute deliverables.",
  },
  {
    title: "Intellectual Property: Contractor Retained Rights and Portfolio",
    content:
      "The contractor retains ownership of pre-existing code libraries, frameworks, tools, methodologies, or intellectual property developed before or outside of the client's project. Generic, non-client-specific components, utilities, or patterns that can be used in other projects remain contractor property. Methodologies, workflows, and professional expertise gained through the project are retained. Right to showcase the project in portfolio is retained with client permission (client identity can be anonymized if requested). This distinction ensures contractors can build upon experience across multiple projects.",
  },
  {
    title: "Third-Party Components and Client-Provided Materials Ownership",
    content:
      "Open-source libraries, frameworks, and third-party services used in projects remain subject to their original licenses. The contractor ensures compliance with all licensing requirements and documents all third-party dependencies. Clients retain all rights to materials, content, branding, and intellectual property they provide. They grant the contractor a limited license to use these materials solely for delivering the project. Upon project completion, client-provided materials are either returned or deleted per agreement.",
  },
  {
    title: "Confidentiality: Mutual Obligations and Duration",
    content:
      "Both parties agree to maintain confidentiality of business information and strategies, technical specifications and source code, financial information and pricing details, proprietary processes and methodologies, and any information marked confidential or reasonably considered confidential. The contractor commits to protecting client data in accordance with POPIA (see Privacy Policy), implementing appropriate security measures, not sharing confidential information with third parties without consent (except as required for project delivery or legal compliance), and securely deleting or returning data upon completion (unless retention is legally required).",
  },
  {
    title: "Service Warranties: Professional Standards and Deliverable Conformance",
    content:
      "The contractor warrants that services will be performed in a professional and workmanlike manner consistent with industry standards. Deliverables will substantially conform to agreed specifications at the time of delivery. The contractor has the right and authority to provide services and grant intellectual property rights specified. Work will not knowingly infringe on third-party intellectual property rights. These warranties provide clients with assurance of quality and legal compliance.",
  },
  {
    title: "Warranty Period and Coverage: 30-Day Standard Support",
    content:
      "Standard warranty coverage extends for 30 days on deliverables from final delivery date (extended warranties may be purchased separately). Coverage includes fixes for defects, bugs, or non-conformance to specifications at no additional charge. Warranty does not cover issues caused by client modifications, third-party changes, hosting problems, or feature additions beyond original scope. The contractor's obligation is limited to correcting defects. Liability for warranty claims is not unlimited; if issues cannot be remedied, refund obligation is evaluated case-by-case.",
  },
  {
    title: "Disclaimer: No Guarantee of Business Results or Error-Free Operation",
    content:
      "EXCEPT AS EXPRESSLY STATED, SERVICES ARE PROVIDED 'AS IS' WITHOUT WARRANTIES OF ANY KIND. Specific business outcomes, traffic, revenue, or other metrics are not guaranteed unless explicitly stated in writing. Systems are not warranted to operate error-free or without interruption. Third-party services, APIs, hosting, or platforms failures are not the contractor's responsibility. Technology evolves rapidly; indefinite compatibility or future-proofing cannot be guaranteed. These disclaimers allocate risk appropriately between parties.",
  },
  {
    title: "Limitation of Liability: Capped Damages and Exclusions",
    content:
      "Total liability for any claims arising from services shall not exceed the total amount paid by the client for the specific project giving rise to the claim. This applies to all causes of action including contract breach, negligence, or other torts. TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE CONTRACTOR SHALL NOT BE LIABLE FOR indirect, incidental, consequential, or punitive damages; loss of profits, revenue, data, or business opportunities; cost of substitute services or downtime; damages from third-party services or hosting issues; or issues caused by client actions, modifications, or negligence.",
  },
  {
    title: "Liability Exceptions: Willful Misconduct and Gross Negligence",
    content:
      "Liability limitations do not apply to damages caused by willful misconduct, gross negligence, fraud, or violations of law that cannot be limited by contract. These exceptions protect clients from the most egregious contractor failures. The contractor remains fully liable for intentional wrongdoing and illegal conduct. This balanced approach protects both parties—clients from unlimited liability, contractors from liability for matters beyond their control.",
  },
  {
    title: "Client Responsibilities: Communication, Information, and Timely Payment",
    content:
      "Clients agree to respond to requests for information, feedback, and approvals within reasonable timeframes (typically 5-7 business days). They must provide accurate, complete information and materials necessary for project success. Access to systems, accounts, and resources required for project work must be provided. Payments must be made according to agreed schedules and terms. Clients must understand that changes beyond agreed scope may require additional time and cost. Project requirements must comply with applicable laws and not involve illegal activities. Clients must confirm they have rights to all materials and assets provided.",
  },
  {
    title: "Change Management: Scope Adjustments and Timeline Modifications",
    content:
      "Changes to project scope, requirements, or deliverables after commencement must be submitted in writing. The contractor assesses impact on timeline and budget, providing a change order for approval before proceeding. Additional charges may apply for out-of-scope changes. Project timelines may be adjusted if client feedback or approvals are delayed, scope changes are requested, required information is not provided timely, or force majeure events occur. Timeline impacts are communicated proactively to maintain transparency.",
  },
  {
    title: "Termination and Dispute Resolution: Cancellation and Legal Procedures",
    content:
      "Either party may terminate the engagement according to the Cancellation Policy. Upon termination, clients remain liable for all work completed and costs incurred; work product for paid work is delivered; confidentiality obligations continue; and final accounting and settlement is conducted. Disputes are first addressed through good faith negotiation. If negotiation fails, mediation through a mutually agreed independent mediator is attempted before pursuing legal action. These Terms are governed by the laws of the Republic of South Africa; legal proceedings are conducted in South African courts.",
  },
  {
    title: "General Provisions: Independent Contractor and Entire Agreement",
    content:
      "The contractor operates as an independent contractor; nothing creates an employment, partnership, joint venture, or agency relationship. These Terms, together with project-specific agreements and policies, constitute the entire agreement and supersede all prior understandings. Modifications must be in writing and signed by both parties. If any provision is unenforceable, remaining provisions continue in effect. Failure to enforce any provision does not waive the right to enforce it later. Clients may not assign or transfer these Terms without written consent; the contractor may assign with reasonable notice.",
  },
  {
    title: "Force Majeure and Electronic Communications (ECTA)",
    content:
      "Neither party is liable for failure to perform due to causes beyond reasonable control including natural disasters, pandemics, government actions, or infrastructure failures. Under South Africa's Electronic Communications and Transactions Act (ECTA), agreements formed electronically via email or electronic signatures are valid and enforceable. Digital signatures and email confirmations constitute valid acceptance of terms. Clear information about services, pricing, and terms is provided before engagement as required by ECTA. Consumer protection provisions of ECTA apply where relevant.",
  },
];

// --- 3. Main Embedding Logic ---

/**
 * Creates an embedding for each terms of service meta fact and uploads it to Supabase.
 */
async function embedMetaFacts10() {
  let successCount = 0;
  let failureCount = 0;
  const totalCount = metaFacts10.length;

  console.log(`Starting embedding process for ${totalCount} terms of service meta facts...`);

  for (const fact of metaFacts10) {
    const factId = uuidv4();
    try {
      console.log(`\t[INFO] Embedding: "${fact.title}"`);

      // 1. Create the embedding
      const embedding = await getJinaEmbedding(fact.content);

      // 2. Insert the data into the 'embeddings' table
      const { data, error } = await supabase.from("embeddings").insert({
        id: factId,
        source_type: "terms_of_service",
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

  console.log("--- Terms of Service Embeddings Summary ---");
  console.log(`Total records processed: ${totalCount}`);
  console.log(`Successfully embedded: ${successCount}`);
  console.log(`Failed to embed: ${failureCount}`);
  console.log("------------------------------------------");
}

embedMetaFacts10();
