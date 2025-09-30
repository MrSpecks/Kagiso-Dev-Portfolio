# Personal Portfolio RAG Agent
## Author: Kagiso Mfusi — Full-stack Cloud & AI Engineer


---

## 📌 Introduction

The Personal Portfolio RAG Agent is a live, production-ready demonstration of end-to-end AI system engineering. More than a Q&A bot, it acts as a knowledge-grounded expert on my professional profile — ingesting portfolio content, converting it to vector embeddings, retrieving relevant context, and generating grounded responses via an LLM routing layer.

Deployed on Vercel Serverless Functions and integrated with Supabase (Postgres + pgvector), this project demonstrates a full pipeline from design to resilient execution.


---

##  ⚡ Capabilities & Proficiency

### Capability	Evidence & Implementation	Rating 

 - **RAG pipeline architecture	End-to-end pipeline:** embedding → storage → retrieval → context augmentation → LLM generation. Agent answers grounded queries reliably.	

 - **Vector embedding (Jina/HuggingFace):**	Embedding scripts produce high-quality semantic vectors (embed_meta_facts.js). Secure Bearer authentication, correct model/task usage.	

 - **Supabase / PostgreSQL vector DB	Production choice:** Postgres + pgvector extension for scalable, SQL-native retrieval.	

 - **Semantic search (cosine similarity):**	Query vectorization + cosine similarity ranking (Top-K). Fast, accurate server-side retrieval.	

 - **Serverless deployment (Vercel):** Entire RAG pipeline hosted in serverless functions; secure key handling and low latency.	

 - **LLM routing (OpenRouter):	** Model routing + failover across providers. Improves resilience and cost efficiency.	
 
 - **API orchestration (Node.js / TypeScript):**	Clean async code for embeddings, DB IO, and LLM calls. Strong error handling and retries.	

 - **Data engineering:**	Dense, structured metaFacts optimized for precision. Includes unique IDs and source_type for governance.	



---

## 🛠️ Architecture & Execution Summary

**1. Embedding**
Portfolio data (About, CV, projects, certifications) is chunked and converted into dense vectors via Jina/HuggingFace embeddings. Unique IDs ensure traceability.


**2. Storage & Retrieval**
Embeddings stored in Supabase/Postgres with pgvector. Queries run Top-K cosine similarity searches to find relevant context.


**3. Context Augmentation**
Retrieved chunks are assembled into a context payload. Source tags are appended for traceability.


**4. LLM Generation**
Context + user query are passed to an LLM via OpenRouter, with strict system instructions enforcing grounded answers only from retrieved data.


**5. Deployment & Ops**
Hosted on Vercel serverless functions with GitHub CI/CD for automated builds and embeddings refresh workflows.




---

## ✅ Production Considerations

 - **Accuracy & Grounding** → strict prompts + retrieval eliminate hallucinations.

 - **Scalability** → serverless endpoints + Supabase scale seamlessly.

 - **Security** → API keys and Supabase role keys are server-side only.

 - **Extensibility** → easily ingest GitHub repos, blogs, or docs into the same pipeline.



---

## 🚀 Outcomes

Demonstrated mastery of modern RAG pipelines, serverless deployment, and AI orchestration.

Functional portfolio feature that recruiters and peers can interact with in real-time.

Reusable blueprint for production-ready RAG systems in business contexts.



---

## 🔗 Live Demo

👉 [Visit Portfolio](https://kagiso-dev-portfolio-z55k-git-main-mrspecks-projects.vercel.app?_vercel_share=maG2HsmnEJCAwxgekgTfbyGLJGkS84A4) 


---

## 📄 License

This project is part of my personal portfolio. Feel free to explore, but reproduction of the full system for commercial use is not permitted without permission.

