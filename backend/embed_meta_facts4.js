import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./supabaseClient.js"; // Assumes you have this setup to connect to Supabase
import { v4 as uuidv4 } from "uuid";
import https from "https";

// Initialize API constants from environment variables
const JINA_API_KEY = process.env.VERCEL_JINA_API_KEY || process.env.JINA_API_KEY; // Updated to check Vercel prefix

// --- 1. Jina API Helper Function (Copied from template) ---

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

// --- 2. Input Data Definitions ---

// Type definitions (for reference)
// type ExperienceItem = { id: string; type: 'experience'; title: string; company: string; period: string; location: string; description: string; responsibilities: string[]; impact: string[]; technicalSkills: string[]; }
// type EducationItem = { id: string; type: 'education'; title: string; institution: string; period: string; location: string; description: string; responsibilities: string[]; impact: string[]; academicProgression: string[]; }

const experience = [
    {
      id: "exp-sps",
      type: 'experience',
      title: "UI/UX Designer & Systems Developer",
      company: "SPS Software",
      period: "2025 - Present",
      location: "GP, Remote",
      description: "I engineered intelligent AI workflows and streamlined the development of scalable web applications using React, Node.js, and cloud technologies, delivering business value through system automations.",
      responsibilities: [
        "Design and prototype user interfaces (UI) and user experiences (UX) for new features and products using Figma.",
        "Develop and deploy scalable full-stack web applications using React, Next.js, and Node.js.",
        "Integrate AI models and build automated workflows to streamline internal business processes.",
        "Collaborate with stakeholders to translate business requirements into technical solutions.",
      ],
      impact: [
        "Led the design of the main platform UI, resulting in a 25% increase in user engagement metrics.",
        "Implemented a serverless data processing pipeline that reduced manual reporting time by 40 hours per month.",
        "Gained advanced proficiency in cloud deployment, CI/CD practices, LLM engineering, and microservice architecture.",
      ],
      technicalSkills: ["React", "Next.js", "Node.js", "Figma", "Tailwind CSS", "Serverless Functions", "Cloud APIs"],
    },
    {
      id: "exp-ats",
      type: 'experience',
      title: "Systems Administrator Skills Program",
      company: "Afrika Tikkun Services",
      period: "2024",
      location: "Randburg, GP",
      description: "I developed and built crucial proficiency in cloud, project management and systems administration, which directly contributed to securing my Microsoft Azure Fundamentals and IBM Project Management Foundations certifications among others, strengthening my capability to contribute to scalable enterprise-grade cloud projects.",
      responsibilities: [
        "Completed intensive training focused on cloud migration, resource administration, identity and access management, governance and cost optimization.",
        "Participated in simulated enterprise projects, applying Agile methodologies to mock on-prem to cloud migration projects.",
        "Gained hands-on experience with virtualization technologies and cloud infrastructure and migration fundamentals.",
      ],
      impact: [
        "Established a strong foundational understanding of IT infrastructure, bridging the gap between development and operations (DevOps).",
        "Achieved certifications in fundamental systems administration concepts.",
        "Significantly enhanced troubleshooting and problem-solving skills in complex environments.",
      ],
      technicalSkills: ["Azure Fundamentals", "Cloud Migration", "Virtualization", "IAM", "Project Management"],
    },
    {
      id: "exp-fnbcsr",
      type: 'experience',
      title: "Client Services Representative",
      company: "First National Bank - FNB",
      period: "2019 - 2023",
      location: "Johannesburg, GP",
      description: "I leveraged ~9700 hours of direct client support to build deep operational expertise in banking workflows, which led to the proactive identification of recurring customer pain points suitable for AI-driven automation.",
      responsibilities: [
        "Provided frontline customer support, resolving complex banking queries and technical issues.",
        "Managed a high volume of daily interactions while maintaining a 95%+ customer satisfaction rating.",
        "Identified systemic issues in banking processes and documented recurring customer needs.",
      ],
      impact: [
        "Developed unparalleled empathy and understanding of end-user needs, now applied directly to UI/UX design and stakeholder engagement.",
        "Operational expertise provided context for future automation projects, highlighting key areas for cost and time savings.",
        "Improved communication and crisis management skills crucial for team leadership.",
      ],
      technicalSkills: ["CRM Software", "Banking Systems", "Operational Analysis", "Soft Skills"],
    },
    {
      id: "exp-fnbint",
      type: 'experience',
      title: "Junior JAVA Developer Intern",
      company: "First National Bank - FNB",
      period: "2018 - 2019",
      location: "Randburg, GP",
      description: "Gained foundational experience in enterprise software development, focusing on backend systems and secure coding practices within the financial technology sector.",
      responsibilities: [
        "Assisted senior developers in maintaining and debugging legacy JAVA enterprise applications.",
        "Wrote unit tests and integration tests for new feature deployments.",
        "Participated in daily standups and adhered to Agile software development methodologies.",
      ],
      impact: [
        "Solidified core programming principles and object-oriented design concepts.",
        "Learned the importance of code quality, version control, and secure development practices in a regulated industry.",
        "Gained exposure to the full SDLC in a large corporate environment.",
      ],
      technicalSkills: ["JAVA", "Spring Framework", "SQL", "Git", "Jira", "Bitbucket"],
    },
];

const education = [
    {
      id: "edu-dyict",
      type: 'education',
      title: "Systems Administration Skills Program",
      institution: "Digital Youth ICT Academy",
      period: "2024",
      location: "Johannesburg, GP",
      description: "I developed and built crucial proficiency in cloud, project management and systems administration, which directly contributed to securing my Microsoft Azure Fundamentals and IBM Project Management Foundations certifications among others, strengthening my capability to contribute to scalable enterprise-grade cloud projects.",
      responsibilities: [
        "Completed intensive training focused on cloud migration, resource administration, identity and access management, governance and cost optimization.",
        "Participated in simulated enterprise projects, applying Agile methodologies to mock on-prem to cloud migration projects.",
        "Gained hands-on experience with virtualization technologies and cloud infrastructure and migration fundamentals.",
      ],
      impact: [
        "Established a strong foundational understanding of IT infrastructure, bridging the gap between development and operations (DevOps).",
        "Achieved certifications in fundamental systems administration concepts.",
        "Significantly enhanced troubleshooting and problem-solving skills in complex environments.",
      ],
      academicProgression: ["Azure Fundamentals", "Cloud Migration", "Virtualization", "IAM", "Project Management"],
    },
    {
      id: "edu-ctu",
      type: 'education',
      title: "National Certificate: Information Technology: Systems Development",
      institution: "CTU Training Solutions",
      period: "2018 - 2019",
      location: "Johannesburg, GP",
      description: "I earned my Higher Certificate in Information Technology specializing in Systems Development with distinctions, solidifying my foundational development skills through an intensive work-integrated-learning JAVA Programming Bootcamp",
      responsibilities: [
        "Mastered fundamental programming concepts and logic with a focus on JAVA development.",
        "Gained hands-on proficiency in Internet Programming, focusing on web-based application development and related technologies.",
        "Developed essential professional and business skills through the Soft Skills module.",
        "Successfully applied knowledge across all core modules to achieve Competent status for the Systems Development qualification.",
      ],
      impact: [
        "Earned a MICT Seta accredited qualification.",
        "Solidified foundational programming skills with exceptional results in all core programming modules (89% in Programming, 93% in Internet Programming, and 86% in Internet Programming).",
        "Developed essential soft skills, achieving an 89% final mark in the Soft Skills module.",
      ],
      academicProgression: ["Programming", "Internet Programming", "Soft Skills", "Systems Development"],
    },
    {
      id: "edu-richfield",
      type: 'education',
      title: "Bachelor of Science in Information Technology (BSc)",
      institution: "Richfield Graduate Institute of Technology",
      period: "2017 - 2018",
      location: "Johannesburg, GP",
      description: "I successfully completed the first year of my Bachelor of Science in Information Technology with distinctions, confirming a strong academic aptitude for complex IT concepts and foundational systems knowledge.",
      responsibilities: [
        "Built a strong foundational IT knowledge base in Networking and Operating Systems.",
        "Focused on core development concepts, including VB.NET Programming and Object-Oriented Programming principles.",
        "Gained hands-on exposure to fundamental Database concepts, Cybersecurity, and ethical practices in IT.",
        "Developed essential professional skills in IT Project Management and sharpened problem-solving, analytical, and critical thinking skills.",
      ],
      impact: [
        "Established a robust academic foundation in core IT disciplines, passing all modules for the 2017 academic year.",
        "Demonstrated a strong aptitude for networking and web technologies by achieving a distinction in both modules.",
      ],
      academicProgression: ["Information Systems", "Mathematics", "Networks", "Programming", "Web Technology"],
    },
    {
      id: "edu-fphs",
      type: 'education',
      title: "National Senior Certificate - Matric",
      institution: "Florida Park High School",
      period: "2016",
      location: "Johannesburg, GP",
      description: "Achieved the required academic foundation for university entrance, focusing on Mathematics, Business Studies, and Computer Application Technology (CAT).",
      responsibilities: [
        "Achieved distinction in Business Studies and Life Orientation, and strong results in Accounting and Computer Application Technology.",
        "Participated in various extracurricular activities, building teamwork and leadership skills.",
      ],
      impact: [
        "Provided the necessary technical and mathematical literacy to pursue a career in technology.",
        "Built early interest in programming and logic through high school CAT courses.",
      ],
      academicProgression: ["Computer Application Technology", "Business Studies", "Mathematics", "Accounting", "Life Orientation"],
    },
];

// --- 3. Transformation Logic to create metaFacts4 ---

/**
 * Formats an experience or education item into a highly structured string
 * for embedding, ensuring the requested field order is maintained.
 * @param {ExperienceItem | EducationItem} item The data item.
 * @returns {string} The structured content string.
 */
function formatMetaFactContent(item) {
    if (item.type === 'experience') {
        const responsibilitiesText = (item.responsibilities || []).join(' | ');
        const impactText = (item.impact || []).join(' | ');
        const skillsText = (item.technicalSkills || []).join(', ');

        // Experience Order: id, type, title, company, period, location, description, responsibilities, impact, technicalSkills
        return [
            `ID: ${item.id}`,
            `Type: ${item.type}`,
            `Title: ${item.title}`,
            `Company: ${item.company}`,
            `Period: ${item.period}`,
            `Location: ${item.location}`,
            `Description: ${item.description}`,
            `Responsibilities: ${responsibilitiesText}`,
            `Impact: ${impactText}`,
            `Technical Skills: ${skillsText}`,
        ].join('\n---\n'); // Separated by a clear delimiter for embedding model
    } else if (item.type === 'education') {
        const responsibilitiesText = (item.responsibilities || []).join(' | ');
        const impactText = (item.impact || []).join(' | ');
        const academicText = (item.academicProgression || []).join(', ');

        // Education Order: id, type, title, institution, period, location, description, responsibilities, impact, academicProgression
        return [
            `ID: ${item.id}`,
            `Type: ${item.type}`,
            `Title: ${item.title}`,
            `Institution: ${item.institution}`,
            `Period: ${item.period}`,
            `Location: ${item.location}`,
            `Description: ${item.description}`,
            `Responsibilities: ${responsibilitiesText}`,
            `Impact: ${impactText}`,
            `Academic Progression: ${academicText}`,
        ].join('\n---\n'); // Separated by a clear delimiter for embedding model
    }
    return '';
}

// Combine all experience and education items into the required metaFacts structure
const metaFacts4 = [
    ...experience.map(exp => ({
        // Use a descriptive title for easy identification
        title: `${exp.title} at ${exp.company} (${exp.period})`,
        content: formatMetaFactContent(exp)
    })),
    ...education.map(edu => ({
        // Use a descriptive title for easy identification
        title: `${edu.title} at ${edu.institution} (${edu.period})`,
        content: formatMetaFactContent(edu)
    }))
];

// --- 4. Main Embedding Logic (Updated function name and array) ---

/**
 * Creates an embedding for each meta fact and uploads it to Supabase.
 */
async function embedMetaFacts4() {
    let successCount = 0;
    let failureCount = 0;
    const totalCount = metaFacts4.length;

    console.log(`Starting embedding process for ${totalCount} structured "About Me" facts...`);

    for (const fact of metaFacts4) {
        // Use a unique ID for each meta fact
        const factId = uuidv4();
        try {
            console.log(`\t[INFO] Embedding: "${fact.title}"`);

            // 1. Create the embedding
            const embedding = await getJinaEmbedding(fact.content);

            // 2. Insert the data into the 'embeddings' table
            const { data, error } = await supabase.from("embeddings").insert({
                id: factId,
                // Specific source type for these high-value chunks
                source_type: "about_me_fact",
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

    console.log("--- About Me Facts Embedding Summary ---");
    console.log(`Total records processed: ${totalCount}`);
    console.log(`Successfully embedded: ${successCount}`);
    console.log(`Failed to embed: ${failureCount}`);
    console.log("------------------------------------");
}

embedMetaFacts4();
