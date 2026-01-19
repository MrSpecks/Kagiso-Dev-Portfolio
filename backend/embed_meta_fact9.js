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

// --- 2. Privacy Policy Meta Facts ---

const metaFacts9 = [
  {
    title: "Privacy Policy: POPIA Compliance and Data Protection Commitment",
    content:
      "Kagiso Mfusi is committed to protecting personal information and respecting privacy in accordance with South Africa's Protection of Personal Information Act (POPIA) and other applicable data protection laws. The Privacy Policy explains how personal information is collected, used, disclosed, and safeguarded when clients visit the website, engage services, or communicate. Privacy protection is treated as a fundamental right and is maintained throughout all business interactions.",
  },
  {
    title: "Information Collection: Personal Data You Provide Voluntarily",
    content:
      "Personal information is collected when clients voluntarily provide it, including name, email address, phone number, and company name through contact forms or email communications. When engaging services, business information, project requirements, technical specifications, billing details, and payment information are collected. Newsletter subscriptions capture email addresses and communication preferences. Project collaboration requires technical information, system access credentials (encrypted), API keys, and project-specific data necessary for service delivery.",
  },
  {
    title: "Information Collection: Automatically Collected Usage Data",
    content:
      "When visiting the website, certain information is automatically collected including IP address, browser type, operating system, referring URLs, pages viewed, time spent on pages, access times, and dates. Website interaction data is collected through Vercel Analytics to understand user behavior and improve website performance. Device information collected includes device type, unique device identifiers, and mobile network information when accessing via mobile. This data helps optimize user experience and website functionality.",
  },
  {
    title: "Information NOT Collected: Children and Sensitive Data Protection",
    content:
      "Kagiso Mfusi explicitly does not knowingly collect personal information from individuals under 18 years of age. Sensitive personal information including race, health data, biometric data, religious beliefs, and political opinions is not collected unless absolutely necessary and explicitly consented to for specific project requirements. Collection practices follow the principle of data minimization, ensuring only information necessary for service delivery is gathered.",
  },
  {
    title: "Information Usage: Service Delivery and Project Management",
    content:
      "Collected information is used for legitimate purposes including providing, maintaining, and improving professional services such as web development, AI solutions, and consulting. Information is used for responding to inquiries, providing project updates, sending service-related notifications, and maintaining client relationships. Project management uses information to manage projects, coordinate deliverables, track milestones, and ensure successful project completion. Usage is always purpose-driven and necessary for contractual obligations.",
  },
  {
    title: "Information Usage: Billing, Communication, and Compliance",
    content:
      "Information is used for processing invoices, tracking payments, managing financial records, and fulfilling contractual obligations. Communication uses include responding to inquiries and sending project updates. Website improvement uses include analyzing website usage, improving user experience, optimizing performance, and developing new features. Legal compliance uses include complying with legal obligations, enforcing terms and policies, and protecting rights and interests. Marketing communications are sent only with explicit consent and may be opted out at any time.",
  },
  {
    title: "POPIA Legal Basis for Processing: Consent and Contractual Necessity",
    content:
      "Under POPIA, personal information is processed based on lawful grounds including explicit consent for specific purposes such as receiving marketing communications. Contractual necessity applies when processing is required to perform contractual obligations when providing services to clients. Legal obligation requires processing to comply with South African laws and regulations. Legitimate interests justify processing when necessary for legitimate business interests, provided these do not override privacy rights.",
  },
  {
    title: "Information Sharing: Third-Party Service Providers",
    content:
      "Limited information is shared with trusted third-party service providers carefully selected and required to maintain appropriate security standards and confidentiality. Vercel provides website hosting and analytics data (US-based service with international data transfer safeguards). Email service providers handle project communications and service notifications via Outlook/Microsoft services. Payment processors handle secure payment processing without storing credit card information on company systems. Cloud storage providers store project files securely and encrypted.",
  },
  {
    title: "Information Sharing: Non-Disclosure and Data Protection Standards",
    content:
      "All third-party providers comply with POPIA or equivalent data protection standards. Personal information is not sold, rented, or traded to third parties for marketing purposes. Information is used solely for purposes outlined in the Privacy Policy. Disclosure occurs only when required by law to comply with court orders, subpoenas, or legal processes; to protect rights, property, or safety; to investigate fraud or security issues; or to respond to government or regulatory requests.",
  },
  {
    title: "International Data Transfers: POPIA Chapter 9 Compliance",
    content:
      "International service providers such as Vercel hosting in the US mean data may transfer outside South Africa. Transfers comply with POPIA Chapter 9 requirements, ensuring transfers are made only to countries with adequate data protection laws or where appropriate safeguards are in place. Service providers commit to protecting data according to standards equivalent to POPIA. Contractual protections (data processing agreements) are implemented with all international providers. Clients have the right to object to international transfers; alternatives can be discussed.",
  },
  {
    title: "Data Security: Encryption and Access Controls",
    content:
      "Industry-standard security measures protect information including SSL/TLS encryption for data in transit (HTTPS) and encryption for sensitive data at rest. Strict access controls limit who can view or process personal information. Regular security updates, firewalls, and monitoring prevent unauthorized access. Strong password policies and multi-factor authentication are implemented where applicable. Encrypted backups prevent data loss while maintaining security. Security is continuously monitored and updated to address emerging threats.",
  },
  {
    title: "Data Retention: Project Lifecycle and Financial Records",
    content:
      "Personal information is retained only as long as necessary for its purpose. Active project information is retained throughout the project lifecycle and for 90 days post-completion for support and warranty purposes. Financial records are maintained for minimum 5 years as required by South African tax laws (SARS requirements). Communications are retained up to 3 years for business records and potential dispute resolution. Marketing data is retained until unsubscribe or deletion request. After retention periods expire, information is securely deleted or anonymized unless legal obligations require longer retention.",
  },
  {
    title: "POPIA Data Subject Rights: Access, Correction, and Deletion",
    content:
      "Under POPIA, clients have the right to access personal information held and receive a copy in structured, commonly used format. Clients may request correction of inaccurate, outdated, or incomplete information. Deletion of personal information can be requested subject to legal retention requirements. Clients may object to processing based on legitimate interests or direct marketing. Clients may request restriction of processing in certain circumstances such as while verifying accuracy. Clients may receive personal information in portable format and transfer to another service provider.",
  },
  {
    title: "POPIA Data Subject Rights: Withdrawal and Complaint",
    content:
      "Clients have the right to withdraw previously given consent at any time (does not affect lawfulness of prior processing). Clients have the right to lodge a complaint with the Information Regulator if they believe privacy rights have been violated. To exercise these rights, submit a written request to kagisomfusi@outlook.com with 'POPIA Data Subject Request' in the subject line. Responses are provided within 30 days as required by law. There is no fee for reasonable requests, though excessive or repetitive requests may incur charges.",
  },
  {
    title: "Cookies and Tracking: Essential and Analytics Technologies",
    content:
      "Website uses minimal tracking technologies including essential cookies required for website functionality, security, and user preferences (such as theme selection). Analytics cookies via Vercel Analytics collect anonymous usage data to improve website performance without personally identifiable information. Users can control cookies through browser settings. Most browsers allow refusing cookies or deleting existing cookies. Disabling certain cookies may affect website functionality.",
  },
  {
    title: "Children's Privacy Protection and Policy Updates",
    content:
      "Services are not directed to individuals under 18 years of age, and no knowingly collected personal information from children is stored. If inadvertent collection from a child occurs, immediate deletion is performed upon notification. Privacy Policy may be updated periodically to reflect changes in practices, technology, legal requirements, or business operations. Material changes are communicated via email to active clients or through prominent website notice. The 'Last Updated' date indicates latest revision. Continued service use after changes constitutes acceptance of updated terms.",
  },
];

// --- 3. Main Embedding Logic ---

/**
 * Creates an embedding for each privacy policy meta fact and uploads it to Supabase.
 */
async function embedMetaFacts9() {
  let successCount = 0;
  let failureCount = 0;
  const totalCount = metaFacts9.length;

  console.log(`Starting embedding process for ${totalCount} privacy policy meta facts...`);

  for (const fact of metaFacts9) {
    const factId = uuidv4();
    try {
      console.log(`\t[INFO] Embedding: "${fact.title}"`);

      // 1. Create the embedding
      const embedding = await getJinaEmbedding(fact.content);

      // 2. Insert the data into the 'embeddings' table
      const { data, error } = await supabase.from("embeddings").insert({
        id: factId,
        source_type: "privacy_policy",
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

  console.log("--- Privacy Policy Embeddings Summary ---");
  console.log(`Total records processed: ${totalCount}`);
  console.log(`Successfully embedded: ${successCount}`);
  console.log(`Failed to embed: ${failureCount}`);
  console.log("---------------------------------------");
}

embedMetaFacts9();
