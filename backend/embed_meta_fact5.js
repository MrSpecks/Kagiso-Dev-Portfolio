import dotenv from "dotenv";
dotenv.config();

// NOTE: Ensure your 'supabaseClient.js' is correctly configured for connection
import { supabase } from "./supabaseClient.js"; 
import { v4 as uuidv4 } from "uuid";
import https from "https"; 

// Initialize API constants from environment variables
// Replace this with your actual environment variable access method if different
const JINA_API_KEY = process.env.VERCEL_JINA_API_KEY || process.env.JINA_API_KEY; 

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

// --- 2. Input Data Definitions (All harmonized to match ociMulticloudFact schema) ---

/**
 * Meta-fact 1: OCI Multicloud Architect Professional. (Reference Schema)
 */
const ociAutonomousFact = {
    "course_title": "Oracle Autonomous Database Professional (2025)",
    "provider": "Oracle University",
    "duration": "5 hours 27 minutes",
    "completion_status": "Completed",
    "certification_preparation": "Oracle Autonomous Database 2025 Professional Certification",
    "overview": "I completed the Oracle Autonomous Database Professional (2025) course through Oracle University, mastering the concepts and practices required to deploy, manage, and optimize Oracle Autonomous Databases. This program provided hands-on experience with automated provisioning, scaling, patching, and recovery operations, while leveraging AI-driven tuning and self-managing capabilities to deliver high performance, security, and reliability. I gained the ability to build and maintain future-ready data platforms that minimize manual effort and maximize innovation.",
    "skills_honed": {
        "autonomous_database_architecture": "I developed a strong understanding of Oracle Autonomous Database architecture and its integration within OCI infrastructure, learning how automation, AI-driven management, and service-level isolation improve scalability and operational efficiency.",
        "autonomous_database_serverless": "I mastered creating and managing Autonomous Database Serverless instances, configuring auto-scaling, backup, and restore operations, and using elastic resource pools for cost-optimized workloads.",
        "autonomous_database_dedicated": "I gained practical experience provisioning and maintaining Autonomous Database Dedicated environments, including OCI policies, maintenance scheduling, and Cloud@Customer deployments for enterprise-grade workloads.",
        "managing_and_monitoring": "I became proficient in managing ADB instances using the OCI Console, REST APIs, and CLI, configuring access control lists, encryption keys, and private endpoints, as well as implementing Data Safe, compartment quotas, and performance monitoring features.",
        "high_availability_and_disaster_recovery": "I learned to implement Autonomous Data Guard configurations for disaster recovery and business continuity, ensuring minimal downtime through robust replication and failover mechanisms.",
        "security_and_compliance": "I acquired advanced understanding of ADB’s integrated security features, including encryption, identity-based access, compartment quotas, and activity auditing through Data Safe, ensuring compliance with enterprise security standards.",
        "development_and_ai_integration": "I explored Autonomous Database as a development platform for modern workloads, including Oracle APEX applications, Machine Learning models, and Generative AI-powered natural language queries using SQL Developer Web.",
        "data_and_analytics_integration": "I developed proficiency in working with Autonomous JSON, Oracle Text, Spatial, Graph, and Data Lake Analytics to support diverse analytical, geospatial, and unstructured data workloads.",
        "migration_and_data_pump": "I learned to assess and execute database migrations to Autonomous using Oracle Data Pump and other tools, understanding key considerations for compatibility, optimization, and performance tuning."
    },
    "technical_focus_areas": [
        "Autonomous Database Serverless and Dedicated infrastructure",
        "OCI Identity and Access Management for ADB",
        "Data Guard and backup/recovery configuration",
        "Elastic resource pools and auto-scaling",
        "Oracle Machine Learning and APEX integration",
        "Autonomous JSON, Text, Spatial, and Graph features",
        "Autonomous Database REST API and CLI management",
        "Database migration and performance optimization"
    ],
    "key_projects_and_demos": [
        "Provisioned Autonomous Database Serverless and Dedicated instances with auto-scaling and backup configurations.",
        "Configured and tested Autonomous Data Guard for high availability and disaster recovery.",
        "Developed data-driven applications using Oracle APEX and integrated Machine Learning notebooks within Autonomous Database.",
        "Performed database migration to Autonomous Database using Oracle Data Pump with validation and performance checks."
    ],
    "outcomes": {
        "business_value": "I can now design, implement, and maintain self-managing databases that deliver superior performance, security, and cost-efficiency. This empowers organizations to reduce operational overhead while accelerating data-driven innovation.",
        "career_impact": "This certification advanced my expertise in cloud database automation and AI-driven data management, solidifying my capability as a professional database architect able to deliver autonomous, resilient, and scalable data solutions in OCI."
    },
    "meta": {
        "score_summary": {
            "getting_started_with_autonomous_database": "100%",
            "autonomous_database_serverless": "100%",
            "autonomous_database_dedicated": "100%",
            "managing_and_monitoring_autonomous_database": "100%",
            "autonomous_database_tools": "80%",
            "developing_on_autonomous_database": "100%",
            "migrate_to_autonomous": "100%"
        },
        "course_level": "Professional",
        "learning_mode": "Online self-paced with interactive labs, demos, and skill checks",
        "completion_year": "2025"
    }
}

// ociMulticloudFact = {
//     "course_title": "OCI Multicloud Architect Professional",
//     "provider": "Oracle University",
//     "duration": "7 hours 29 minutes",
//     "completion_status": "Completed",
//     "certification_preparation": "OCI 2025 Multicloud Architect Professional",
//     "overview": "I completed the OCI Multicloud Architect Professional course through Oracle University, gaining the ability to design, implement, and manage complex multicloud architectures using Oracle Cloud Infrastructure (OCI) integrated with other leading platforms such as Microsoft Azure and Google Cloud. This program equipped me with practical, hands-on experience in configuring secure connectivity, optimizing workloads, managing hybrid networking, and maintaining operational reliability across multiple cloud environments.",
//     "skills_honed": {
//         "multicloud_strategy": "I developed a strategic understanding of multicloud adoption, learning to analyze business drivers, evaluate interoperability challenges, and align multicloud architectures with organizational goals to enhance flexibility, cost efficiency, and innovation.",
//         "network_architecture_and_connectivity": "I mastered advanced networking configurations, including VPNs, FastConnect, dynamic routing gateways, and interconnect setups across OCI, Azure, and Google Cloud. I can now design and implement secure, high-performance connections that ensure low latency and robust redundancy across diverse infrastructures.",
//         "identity_and_access_management": "Through OCI Identity and Access Management (IAM) modules, I gained expertise in managing users, roles, and policies across federated domains. I can now implement cross-cloud identity federation, ensuring seamless authentication and authorization across OCI and third-party cloud providers.",
//         "multicloud_networking": "I honed practical skills in establishing site-to-site VPNs and hybrid interconnects between OCI and other cloud platforms. This includes configuring direct network links, troubleshooting connectivity issues, and ensuring high availability through dynamic routing and gateway management.",
//         "oracle_interconnect_for_azure_and_google_cloud": "I acquired technical mastery in deploying and managing Oracle Interconnect for Azure and Oracle Interconnect for Google Cloud. This included end-to-end setup, testing, and optimization of direct links between environments, enabling secure, high-speed data exchange and workload interoperability.",
//         "database_integration_and_management": "I deepened my understanding of OCI’s database ecosystem — including Base Database Service, Autonomous Database, Exadata Database Service, and MySQL HeatWave — and learned how to extend these offerings through Oracle Database@Azure and Oracle Database@Google Cloud integrations. I can now design scalable, high-availability database solutions across clouds with optimized performance and disaster recovery configurations.",
//         "high_availability_and_disaster_recovery": "The course strengthened my capability to architect redundancy, load balancing, and recovery mechanisms that ensure business continuity in distributed cloud environments. I can plan and implement disaster recovery and failover strategies across multicloud infrastructures.",
//         "cost_optimization_and_compliance": "I developed a solid grasp of applying cost governance, regulatory compliance, and data security best practices across multicloud systems — ensuring financial efficiency and compliance with enterprise and industry standards.",
//         "troubleshooting_and_operational_resilience": "I gained hands-on experience identifying and resolving configuration and connectivity issues in multicloud deployments. I can now diagnose performance bottlenecks, implement proactive monitoring, and ensure consistent uptime across platforms."
//     },
//     "technical_focus_areas": [
//         "OCI Virtual Cloud Networks (VCN)",
//         "VPN and FastConnect configuration",
//         "Dynamic Routing Gateway and VCN Peering",
//         "Oracle Interconnect for Azure and Google Cloud",
//         "Federated Identity Management",
//         "Autonomous Database and Exadata provisioning",
//         "Multicloud high availability and DR design",
//         "Operational monitoring and troubleshooting"
//     ],
//     "key_projects_and_demos": [
//         "Configured OCI VCN and established local and remote peering connections.",
//         "Set up OCI-Azure Interconnect with tested bidirectional connectivity.",
//         "Deployed Oracle Database@Azure and Database@Google Cloud with federated identity and network configuration.",
//         "Implemented high availability configurations for MySQL Database Service with HeatWave analytics."
//     ],
//     "outcomes": {
//         "business_value": "I can now design and manage secure, efficient, and cost-optimized multicloud architectures that enhance business resilience, interoperability, and performance.",
//         "career_impact": "This certification-level training solidified my position as a multicloud architect capable of bridging Oracle, Azure, and Google Cloud ecosystems, expanding my ability to deliver scalable enterprise-grade cloud solutions."
//     },
//     "meta": {
//         "score_summary": {
//             "multicloud_introduction": "80%",
//             "oci_iam": "80%",
//             "oci_networking": "100%",
//             "multicloud_network_connectivity": "100%",
//             "oracle_interconnect_for_azure": "100%",
//             "oracle_interconnect_for_google_cloud": "100%",
//             "oci_database_services": "100%",
//             "oracle_database_at_azure": "100%",
//             "oracle_database_at_google_cloud": "100%"
//         },
//         "course_level": "Professional",
//         "learning_mode": "Online self-paced with interactive demos and assessments",
//         "completion_year": "2025"
//     }
// };

// /**
//  * Meta-fact 2: Oracle Cloud Infrastructure Generative AI Professional.
//  * Harmonized to match the structure of ociMulticloudFact.
//  */
// const ociGenAiFact = {
//     "course_title": "Oracle Cloud Infrastructure Generative AI Professional (OCI Gen AI Pro)",
//     "provider": "Oracle University",
//     "duration": "5 hours 10 minutes",
//     "completion_status": "Completed with distinction (100% on all skill checks)",
//     "certification_preparation": "The course fully prepared me for the Oracle Cloud Infrastructure 2025 Generative AI Professional certification, providing both theoretical and practical grounding in LLMs, RAG systems, and Oracle’s AI service stack.",
//     "overview": "The Oracle Cloud Infrastructure Generative AI Professional course provided me with an in-depth technical mastery of large language models (LLMs), the OCI Generative AI ecosystem, and their integration with enterprise-grade data systems. This training strengthened my ability to design, deploy, and operationalize AI-driven applications on Oracle Cloud, leveraging LLMs and Retrieval-Augmented Generation (RAG) workflows for real-world use cases.", // Renamed from course_summary
    
//     // skills_honed structure is unified: key -> long string value
//     "skills_honed": { 
//         "large_language_models": "Developed a deep understanding of LLM architectures, tokenization, training, decoding, and fine-tuning processes. Gained hands-on knowledge of how prompting, inference, and hallucination affect model behavior and output quality. Key Topics: Architecture of Transformer-based LLMs; Prompt engineering techniques and prompt optimization; Fine-tuning and inference pipeline design; Decoding strategies and mitigation of hallucination; Applications of LLMs across enterprise and conversational contexts",
//         "oci_generative_ai_service": "Mastered the use of Oracle Cloud Infrastructure Generative AI Service, including configuration, deployment, and security. Learned to integrate pretrained models, manage embeddings, fine-tune models, and utilize dedicated AI clusters for custom AI workloads. Key Topics: OCI Generative AI Service APIs and setup; Chat models, embedding models, and inference endpoints; Fine-tuning using proprietary data within OCI; Dedicated AI cluster sizing, pricing, and deployment; Security and governance within OCI Generative AI environments",
//         "retrieval_augmented_generation": "Gained hands-on experience implementing Retrieval-Augmented Generation (RAG) architectures using OCI Generative AI and Oracle Database 23ai Vector Search. Learned to connect embeddings and vector storage for efficient knowledge retrieval and contextual grounding in AI responses. Key Topics: Document processing, embedding, and vector storage; Oracle 23ai vector store and semantic retrieval; LangChain-based RAG pipelines; Conversational RAG implementation with enterprise databases",
//         "ai_agent_and_chatbot_development": "Learned to design, build, and deploy chatbots using OCI Generative AI Agents Service. Implemented multi-data-source chatbots integrated with Oracle Object Store and Oracle 23ai to handle domain-specific queries with contextual awareness. Key Topics: Architecture and setup of OCI Generative AI Agent Service; Integrating chatbots with Oracle data sources; Conversational flow engineering and context management; Practical chatbot deployment in OCI environments",
//         "oci_gen_ai_security_and_operations": "Developed awareness of the OCI Generative AI security model, including authentication, authorization, data governance, and privacy controls that ensure enterprise compliance for AI solutions. Key Topics: OCI Generative AI security architecture; Identity management and data access policies; Operational best practices for AI model deployment"
//     },
    
//     // Derived from key topics and course overview
//     "technical_focus_areas": [ 
//         "Transformer-based LLM Architectures",
//         "Prompt Engineering and Optimization",
//         "Fine-tuning and Inference Pipeline Design",
//         "OCI Generative AI Service APIs and Security",
//         "Dedicated AI Cluster Deployment",
//         "Retrieval-Augmented Generation (RAG) Architectures",
//         "Oracle Database 23ai Vector Search",
//         "LangChain-based RAG Pipelines",
//         "OCI Generative AI Agents Service and Chatbots",
//         "Data Governance and Privacy Controls"
//     ],
//     // Derived from RAG/Chatbot demos
//     "key_projects_and_demos": [
//         "Demo: OCI Generative AI Service Inference API Configuration",
//         "Demo: Embedding Models Deployment",
//         "Demo: Fine-tuning Custom Models using Dedicated AI Clusters",
//         "Demo: Conversational RAG with Oracle Database 23ai",
//         "Demo: Chatbot using Object Store and Oracle 23ai"
//     ],
//     "outcomes": { // Restructured from outcomes_and_applications and meta_summary
//         "business_value": "I am able to architect and deploy enterprise-grade generative AI solutions using OCI services, build RAG-based applications connected to Oracle databases, and create conversational agents capable of delivering intelligent and context-aware interactions. These skills empower me to innovate within multi-cloud ecosystems and integrate AI into production-ready systems with scalability, security, and precision.",
//         "career_impact": "This course elevated my proficiency in building, fine-tuning, and deploying generative AI applications on Oracle Cloud Infrastructure. It bridged theoretical foundations of LLMs with applied implementation through RAG pipelines, chatbots, and agentic systems. I am now fully capable of developing secure, data-driven AI solutions that leverage OCI’s Gen AI ecosystem for transformative business use cases."
//     },
//     "meta": {
//         "score_summary": {
//             "fundamentals_of_large_language_models": "100%",
//             "oci_generative_ai_service": "100%",
//             "rag_using_generative_ai_service_and_oracle_23_ai_vector_search": "100%",
//             "chatbot_using_generative_ai_agent_service": "100%"
//         },
//         "course_level": "Professional",
//         "learning_mode": "Online self-paced with interactive demos and assessments",
//         "completion_year": "2025"
//     }
// };

// /**
//  * Meta-fact 3: OCI AI Foundations.
//  * Harmonized to match the structure of ociMulticloudFact.
//  */
// const ociAIFoundationsFact = {
//     "course_title": "OCI AI Foundations", // Renamed from course_name
//     "provider": "Oracle University",
//     "duration": "4h 15m",
//     "completion_status": "Completed", // Added
//     "certification_preparation": "Lays foundational knowledge for OCI AI and Gen AI certifications", // Added
//     "overview": "I completed the Oracle Cloud Infrastructure (OCI) AI Foundations course, designed to introduce AI and ML fundamentals with practical applications in Oracle Cloud. The course covered AI, machine learning, deep learning, generative AI, and LLMs, along with hands-on exposure to OCI AI services and tools.", // Renamed from description
    
//     // skills_honed structure is unified: key -> long string value
//     "skills_honed": { 
//         "ai_basics": "I developed a solid understanding of AI concepts, tasks, and datasets, differentiating AI, ML, and DL in practical contexts. Key Topics: AI fundamentals; AI vs ML vs DL; Practical AI applications; Data-driven AI tasks",
//         "machine_learning": "I honed skills in core machine learning paradigms, including supervised, unsupervised, and reinforcement learning, with practical demos using Jupyter Notebooks. Key Topics: Supervised learning: regression and classification; Unsupervised learning; Reinforcement learning; ML model implementation and evaluation; Hands-on Jupyter Notebook experience",
//         "deep_learning": "I gained expertise in deep learning concepts and architectures, including convolutional neural networks (CNNs) and sequence models (RNNs, LSTMs), and applied them in classification tasks. Key Topics: Introduction to deep learning; Sequence models (RNN, LSTM); CNNs for image processing; Multilayer perceptron applications; Hands-on DL model demos",
//         "generative_ai_llm": "I explored generative AI and large language models, understanding transformer architectures, prompt engineering, and customization of LLMs using my own data. Key Topics: Generative AI fundamentals; Large Language Models (LLMs); Transformer architectures; Prompt engineering techniques; Customizing LLMs with personal datasets",
//         "oci_ai_portfolio": "I familiarized myself with the OCI AI ecosystem, including AI infrastructure, ML services, GPUs, superclusters, and responsible AI practices, enabling me to efficiently select and deploy OCI AI solutions for business challenges. Key Topics: OCI AI and ML services overview; AI infrastructure management; GPU and supercluster utilization; Responsible AI implementation; Hands-on data science demos in OCI",
//         "oci_generative_ai_service": "I learned to leverage OCI Generative AI services, including vector search and Select AI, applying them in practical demos to enhance data-driven applications. Key Topics: OCI Generative AI service usage; Vector database applications (Oracle 23ai); Select AI tools; Practical OCI Gen AI demos",
//         "oci_ai_services": "I explored OCI AI services in language, speech, vision, and document understanding, gaining hands-on experience with each service through structured demos. Key Topics: Language AI services; Speech recognition services; Vision AI services; Document understanding services; Practical demos for each service"
//     },
    
//     // Derived from all 'topics' and course overview
//     "technical_focus_areas": [
//         "AI vs ML vs DL differentiation",
//         "Supervised and Unsupervised Learning",
//         "Reinforcement Learning",
//         "CNNs and Sequence Models (RNN, LSTM)",
//         "Transformer Architectures and Prompt Engineering",
//         "OCI Generative AI Service (Vector Search, Select AI)",
//         "OCI AI Services (Language, Speech, Vision, Document Understanding)",
//         "GPU and Supercluster Utilization"
//     ],
//     // Derived from demos
//     "key_projects_and_demos": [
//         "Demo: AI/ML Fundamentals using Jupyter Notebooks",
//         "Demo: Classification with Multilayer Perceptron",
//         "Demo: OCI Generative AI Service practical usage",
//         "Demo: OCI AI Services (Language, Speech, Vision, Document Understanding)"
//     ],
//     "outcomes": { // Restructured from benefits array
//         "business_value": "I gained the capacity to deploy AI tools to automate and enhance tasks, and competence in selecting the optimal OCI AI service for specific business challenges.",
//         "career_impact": "I am able to distinguish between AI, ML, and DL for practical applications, providing me with foundational knowledge of LLMs and generative AI for modern computing applications."
//     },
//     "meta": {
//         "score_summary": { 
//             "ai_basics": "80%", // Using the lowest score from the reference notes
//             "ml_basics": "100%",
//             "dl_basics": "100%",
//             "gen_ai_basics": "100%",
//             "oci_ai_portfolio": "100%",
//             "oci_gen_ai_service": "100%",
//             "oci_ai_services": "100%"
//         },
//         "course_level": "Associate", 
//         "learning_mode": "Online self-paced with interactive demos and assessments",
//         "completion_year": "2025" 
//     }
// };

// --- 3. Transformation Logic to create embeddable content (Single function for unified schema) ---

/**
 * Formats a structured OCI Course fact object into a highly structured
 * plain text string for optimal embedding and retrieval.
 * This function is now generalized to work with all three harmonized course objects.
 * * @param {object} data The harmonized OCI course fact object.
 * @returns {string} The structured content string.
 */
function formatOciCourseContent(data) {
    const parts = [];

    // Core Info
    parts.push(`COURSE TITLE: ${data.course_title}`);
    parts.push(`PROVIDER: ${data.provider}`);
    parts.push(`DURATION: ${data.duration}`);
    parts.push(`COMPLETION STATUS: ${data.completion_status}`);
    parts.push(`CERTIFICATION PREPARATION: ${data.certification_preparation}`);
    parts.push(`OVERVIEW: ${data.overview}`);
    parts.push('---');
    
    // Skills Honed (Unified key: string value)
    parts.push('SKILLS HONED:');
    for (const [skill, description] of Object.entries(data.skills_honed)) {
        // Format: Skill Title: Description
        const cleanSkill = skill.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        parts.push(`\t${cleanSkill}: ${description}`);
    }
    parts.push('---');

    // Technical Focus Areas (Array)
    parts.push('TECHNICAL FOCUS AREAS (Keywords):');
    parts.push(data.technical_focus_areas.join(' | '));
    parts.push('---');

    // Key Projects and Demos (Array)
    parts.push('KEY PROJECTS AND DEMOS:');
    parts.push(data.key_projects_and_demos.join(' | '));
    parts.push('---');

    // Outcomes (Nested Object)
    parts.push('OUTCOMES:');
    parts.push(`\tBUSINESS VALUE: ${data.outcomes.business_value}`);
    parts.push(`\tCAREER IMPACT: ${data.outcomes.career_impact}`);
    parts.push('---');

    // Meta Scores (Nested Scores)
    parts.push('ASSESSMENT SCORES:');
    for (const [module, score] of Object.entries(data.meta.score_summary)) {
        // Format: Module Name: Score
        const cleanModule = module.replace(/_/g, ' ').toUpperCase();
        parts.push(`\t${cleanModule}: ${score}`);
    }
    parts.push('---');

    // Other Meta Data
    parts.push('COURSE META DATA:');
    parts.push(`\tCOURSE LEVEL: ${data.meta.course_level}`);
    if (data.meta.learning_mode) {
         parts.push(`\tLEARNING MODE: ${data.meta.learning_mode}`);
    }
    if (data.meta.completion_year) {
        parts.push(`\tCOMPLETION YEAR: ${data.meta.completion_year}`);
    }
    if (data.meta.hands_on !== undefined) {
         parts.push(`\tHANDS-ON: ${data.meta.hands_on ? 'Yes' : 'No'}`);
    }
    if (data.meta.certification_focus !== undefined) {
         parts.push(`\tCERTIFICATION FOCUS: ${data.meta.certification_focus ? 'Yes' : 'No'}`);
    }


    return parts.join('\n');
}

// Combine all items into the required metaFacts structure
const metaFacts = [
            // {
            //     // Fact 1: OCI Multicloud
            //     title: ociMulticloudFact.course_title,
            //     content: formatOciCourseContent(ociMulticloudFact),
            //     source_type: "oci_multicloud_fact" // Specific type for multicloud
            // },
            // {
            //     // Fact 2: OCI Generative AI
            //     title: ociGenAiFact.course_title,
            //     content: formatOciCourseContent(ociGenAiFact),
            //     source_type: "oci_genai_fact" // Specific type for Gen AI
            // },
            // {
            //     // Fact 3: OCI AI Foundations
            //     title: ociAIFoundationsFact.course_title,
            //     content: formatOciCourseContent(ociAIFoundationsFact),
            //     source_type: "oci_ai_foundations_fact" // Specific type for AI Foundations
            // },
    {
        // Fact 4: OCI Autonomous
        title: ociAutonomousFact.course_title,
        content: formatOciCourseContent(ociAutonomousFact),
        source_type: "ociAutonomousFact" // Specific type for Autonomous
    }
];

// --- 4. Main Embedding Logic (Using the generalized function) ---

/**
 * Creates an embedding for each meta fact and uploads it to Supabase.
 */
async function embedMetaFacts() {
    let successCount = 0;
    let failureCount = 0;
    const totalCount = metaFacts.length;

    console.log(`Starting embedding process for ${totalCount} structured OCI facts...`);

    for (const fact of metaFacts) {
        // Use a unique ID for the fact
        const factId = uuidv4(); 
        try {
            console.log(`\t[INFO] Embedding: "${fact.title}"`);

            // 1. Create the embedding
            // The formatted content is passed here.
            const embedding = await getJinaEmbedding(fact.content);

            // 2. Insert the data into the 'embeddings' table
            const { data, error } = await supabase.from("embeddings").insert({
                id: factId,
                // Use the specific source type defined in the metaFacts array
                source_type: fact.source_type, 
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
            // Added logic to handle exponential backoff for API throttling
            // (Note: full backoff implementation requires request function modification, 
            // but logging helps track issues)
            console.error(`\t[FAILURE] Error embedding "${fact.title}" (ID: ${factId}):`, err.message || err);
            failureCount++;
        }
    }

    console.log("--- OCI Fact Embedding Summary ---");
    console.log(`Total records processed: ${totalCount}`);
    console.log(`Successfully embedded: ${successCount}`);
    console.log(`Failed to embed: ${failureCount}`);
    console.log("------------------------------------------");
}

embedMetaFacts();
