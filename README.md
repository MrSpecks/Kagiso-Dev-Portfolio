# Kagiso-Dev-Portfolio ⚡

> **A production-ready RAG pipeline that fuses AI reasoning, vector search, and modern web engineering into one cohesive system.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Portfolio-blue?style=for-the-badge)](https://kagiso-dev-portfolio-z55k-git-main-mrspecks-projects.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%20%7C%20TypeScript%20%7C%20Supabase-green?style=for-the-badge)](https://github.com/MrSpecks/Kagiso-Dev-Portfolio)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-RAG%20Agent-purple?style=for-the-badge)](#ai--rag-system-highlights)

---

## 🚀 **Overview**

This isn't just another portfolio website—it's a **live demonstration of enterprise-grade AI engineering**. Built as both a professional showcase and technical proof-of-concept, this platform showcases mastery across the full modern development stack while delivering an interactive experience that recruiters, clients, and peers can engage with in real-time.

The portfolio features a sophisticated **Retrieval-Augmented Generation (RAG) agent** that intelligently answers questions about Kagiso's work, projects, and expertise—demonstrating not just what he's built, but how he thinks about complex AI systems.

---

## ⚡ **Key Features**

### 🤖 **AI-Powered Interactive Assistant**
- **Streaming RAG Pipeline**: Real-time responses grounded in portfolio data
- **Context-Aware Intelligence**: Answers based on actual projects and experience
- **Unknown Query Learning**: Captures unanswered questions for continuous improvement
- **Multi-Model LLM Routing**: OpenRouter integration with failover capabilities

### 🎨 **Modern Web Experience**
- **Responsive Design**: Mobile-first with dark/light mode support
- **Smooth Animations**: Framer Motion integration for polished interactions
- **Accessibility First**: WCAG 2.1 AA compliant with keyboard navigation
- **Performance Optimized**: Vite-powered builds with lazy loading

### 📊 **Dynamic Content Management**
- **Real-Time Data Sync**: Supabase integration for live content updates
- **Interactive Project Showcase**: Detailed case studies with technical deep-dives
- **Certification Tracking**: Professional credentials with verification links
- **Analytics Integration**: Visitor behavior tracking and engagement metrics

### 🔧 **Production-Ready Architecture**
- **Serverless Deployment**: Vercel edge functions with global CDN
- **Vector Database**: PostgreSQL + pgvector for semantic search
- **Type Safety**: Full TypeScript implementation with strict checking
- **CI/CD Pipeline**: Automated deployments with GitHub integration

---

## 🛠️ **Technical Stack**

### **Frontend**
- **React 18** with concurrent rendering
- **TypeScript** for type safety and developer experience
- **Vite** for lightning-fast builds and HMR
- **Tailwind CSS** with custom design system
- **shadcn/ui** components with Radix UI primitives
- **Framer Motion** for smooth animations
- **TanStack Query** for server state management

### **Backend & AI**
- **Vercel Serverless Functions** with edge runtime
- **Jina AI v3** for high-quality vector embeddings
- **OpenRouter API** for multi-provider LLM access
- **Supabase** with pgvector extension
- **Node.js** with async/await patterns

### **Database & Storage**
- **PostgreSQL** with real-time capabilities
- **pgvector** for vector similarity search
- **Row Level Security** for data protection
- **Real-time subscriptions** for live updates

### **Development & Deployment**
- **ESLint** with React-specific rules
- **PostCSS** with Tailwind integration
- **GitHub Actions** for CI/CD
- **Vercel Analytics** for performance monitoring

---

## 🏗️ **Architecture Overview**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (React/Vite)  │    │   (Vercel)      │    │   Services      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • React 18      │◄──►│ • API Routes    │◄──►│ • Jina AI       │
│ • TypeScript    │    │ • Serverless    │    │ • OpenRouter    │
│ • Tailwind CSS  │    │ • Edge Runtime  │    │ • Supabase      │
│ • React Query   │    │ • Streaming     │    │ • Formspree     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Database      │
                    │   (Supabase)    │
                    ├─────────────────┤
                    │ • PostgreSQL    │
                    │ • pgvector      │
                    │ • Real-time     │
                    │ • Auth          │
                    └─────────────────┘
```

---

## 🤖 **AI & RAG System Highlights**

### **Production-Grade RAG Pipeline**
This implementation demonstrates mastery across the complete AI engineering lifecycle:

1. **Content Vectorization**: Portfolio content chunked and embedded using Jina AI v3
2. **Vector Storage**: Efficient storage in Supabase with pgvector indexing
3. **Semantic Search**: Cosine similarity search with Top-K retrieval
4. **Context Assembly**: Intelligent context building with source attribution
5. **LLM Generation**: Grounded responses using OpenRouter with failover
6. **Streaming Delivery**: Real-time text streaming for natural conversation

### **Technical Capabilities Demonstrated**
- **Vector Embedding Mastery**: High-quality semantic vectors with proper task optimization
- **Database Engineering**: SQL-native vector operations with pgvector
- **API Orchestration**: Clean async patterns with comprehensive error handling
- **LLM Routing**: Multi-provider access with intelligent failover
- **Security**: Server-side key management and secure data access patterns

### **Real-World Applications**
- **Recruiter Testing**: Interactive AI that answers specific questions about experience
- **Client Engagement**: Demonstrates technical depth through intelligent conversation
- **Peer Collaboration**: Showcases AI engineering capabilities for technical discussions
- **Continuous Learning**: Unknown query logging for system improvement

---

## 🚀 **Live Demo & Screenshots**

### **Experience the AI Assistant**
Visit the live portfolio and interact with the AI chatbot to see the RAG system in action. Ask questions like:
- "What projects has Kagiso worked on?"
- "Tell me about his AI and machine learning experience"
- "What certifications does he have?"
- "How does the RAG system work?"

### **Key Sections**
- **🏠 Home**: Hero section with typewriter effect and project carousel
- **👨‍💻 About**: Interactive timeline with expandable experience details
- **🚀 Projects**: Technical capability showcase with live demos
- **🏆 Certifications**: Dynamic display with radar chart visualization
- **📞 Contact**: Integrated form with Formspree for lead capture

---

## ⚙️ **Setup & Installation**

### **Prerequisites**
- Node.js 18+ (LTS recommended)
- npm 9+ or yarn 1.22+
- Git 2.30+

### **Environment Variables**
Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Services
JINA_API_KEY=your_jina_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
HF_TOKEN=your_huggingface_token

# Form Integration
FORMSPREE_ENDPOINT=your_formspree_endpoint
```

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/MrSpecks/Kagiso-Dev-Portfolio.git
cd Kagiso-Dev-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Available Scripts**
- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

---

## 🗺️ **Roadmap & Future Enhancements**

### **Technical Improvements**
- **Performance Optimization**: Image optimization, code splitting, service workers
- **AI Enhancement**: Multi-language support, voice interaction, fine-tuned models
- **Advanced Analytics**: Detailed visitor insights and engagement tracking

### **Feature Additions**
- **Blog Integration**: Technical writing showcase with MDX support
- **Project Analytics**: Detailed metrics and impact tracking
- **Collaboration Tools**: Real-time collaboration features
- **Portfolio Templates**: Reusable templates for other developers

### **Content Expansion**
- **Video Content**: Project walkthroughs and technical explanations
- **Case Studies**: Detailed problem-solution narratives
- **Testimonials**: Client and collaborator feedback integration
- **Speaking Engagements**: Conference talks and workshop information

---

## 📄 **License & Attribution**

This project is part of Kagiso Mfusi's personal portfolio. Feel free to explore the codebase and learn from the implementation, but reproduction of the full system for commercial use requires permission.

### **Open Source Components**
- React, TypeScript, Vite, Tailwind CSS
- shadcn/ui components and Radix UI primitives
- Supabase and pgvector extensions
- Various open-source libraries and tools

---

## 👨‍💻 **About the Author**

**Kagiso Mfusi** — Full-Stack Cloud & AI Engineer

A Systems & AI Developer with 7+ years of experience specializing in LLM engineering, multi-cloud architecture, and modern web development. Kagiso thrives at the intersection of innovation and execution, building scalable solutions that deliver real-world impact.

**Connect:**
- 📧 Email: kagisomfusi@outlook.com
- 💼 LinkedIn: [Kagiso Mfusi](https://www.linkedin.com/in/kagiso-m-95b329224)
- 🐙 GitHub: [MrSpecks](https://github.com/MrSpecks)

---

*Crafted with precision and purpose by Kagiso Mfusi — Full-Stack Cloud & AI Engineer.*
