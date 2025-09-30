import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import * as React from "react";
import { ArrowRight, ListChecks, Database, Workflow, Cloud, Search, Cpu, ExternalLink, Github, Code, Smartphone, Globe } from "lucide-react";

// Utility for concatenating class names (mimicking 'cn' typically found in lib/utils)
const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

// =================================================================
// --- Custom Table Components for RAG Section (Shadcn-like) ---
// Since these are not imported from "@/components/ui/table", they are defined here for the section.

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-xl border dark:border-gray-700 shadow-md">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b dark:[&_tr]:border-gray-700", className)} {...props} />,
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      // Note: Added dark mode classes for border and hover state
      className={cn("border-b transition-colors data-[state=selected]:bg-gray-100/50 dark:data-[state=selected]:bg-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 dark:border-gray-700", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      // Note: Added dark mode classes for background and text
      className={cn(
        "h-12 px-4 text-left align-middle font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900/50 [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    // Note: Added dark mode text color and aligned to top
    <td ref={ref} className={cn("p-4 align-top text-gray-800 dark:text-gray-300", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    // Note: Added dark mode text color
    <caption ref={ref} className={cn("mt-4 text-sm text-gray-500 dark:text-gray-400", className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";


// =================================================================
// --- RAG Agent Data & Components ---

// Mapping icons to capabilities
const CAPABILITY_ICONS: Record<string, React.ElementType> = {
    'RAG Pipeline Architecture': Workflow,
    'Vector Embedding (Jina-Embeddings-v3)': ListChecks,
    'Supabase/PostgreSQL Vector DB': Database,
    'Semantic Search (Cosine Similarity)': Search,
    'Vercel Serverless Deployment': Cloud,
    'LLM Strategy & Integration (OpenRouter)': Cpu,
    'Node.js/TypeScript API Orchestration': Code,
    'Data Structuring & Engineering': Database,
};

// Data for the RAG technical capabilities table
const RAG_TECHNICAL_DATA = [
    {
        capability: "RAG Pipeline Architecture",
        explanation: "Successful end-to-end implementation of the RAG model: Embedding → Storage Retrieval → Context Augmentation → LLM Generation. This is the core success of the project, proven by the agent's ability to answer complex, grounded queries.",
        rating: 9,
        icon: 'RAG Pipeline Architecture',
    },
    {
        capability: "Vector Embedding (Jina-Embeddings-v3)",
        explanation: "Direct, functional code implementation (`embed_meta_facts.js`) to call the Jina AI API, correctly using Bearer token authentication and specifying the `jina-embeddings-v3` model with the appropriate `retrieval.passage` task for high-accuracy semantic encoding.",
        rating: 9,
        icon: 'Vector Embedding (Jina-Embeddings-v3)',
    },
    {
        capability: "Supabase/PostgreSQL Vector DB",
        explanation: "Strategic choice and implementation of a scalable, production-grade vector database solution (PostgreSQL with the vector extension). This capability is central to storing high-dimensional vectors efficiently for rapid search operations.",
        rating: 9,
        icon: 'Supabase/PostgreSQL Vector DB',
    },
    {
        capability: "Semantic Search (Cosine Similarity)",
        explanation: "Deep architectural understanding and implementation of the core retrieval mechanism. The system effectively translates the user's natural language query into a vector and performs a Cosine Similarity calculation against the entire database to retrieve semantically relevant context chunks.",
        rating: 9,
        icon: 'Semantic Search (Cosine Similarity)',
    },
    {
        capability: "Vercel Serverless Deployment",
        explanation: "Successful orchestration of a complex, stateful pipeline (requiring API keys and external database connections) within Vercel's serverless environment. This proves expertise in deploying high-performance, scalable backend logic optimized for low latency.",
        rating: 9,
        icon: 'Vercel Serverless Deployment',
    },
    {
        capability: "LLM Strategy & Integration (OpenRouter)",
        explanation: "Strategic decision to use an LLM routing layer (OpenRouter) instead of a single API provider. This showcases advanced thinking regarding model resilience, cost optimization, and failover, ensuring the agent remains functional and economical under various loads.",
        rating: 8,
        icon: 'LLM Strategy & Integration (OpenRouter)',
    },
    {
        capability: "Node.js/TypeScript API Orchestration",
        explanation: "Writing clean, robust, and asynchronous JavaScript/Node.js code (`embed_meta_facts.js`) to manage secure https API calls, handle response parsing, and perform database transactions. This validates core proficiency in backend development for AI services.",
        rating: 8,
        icon: 'Node.js/TypeScript API Orchestration',
    },
    {
        capability: "Data Structuring & Engineering",
        explanation: "Intentional design of highly dense, multi-faceted data chunks (metaFacts) optimized specifically for high-precision vector retrieval. The data model uses unique IDs and a source_type (`meta_fact`) for reliable data governance and retrieval filtering.",
        rating: 8,
        icon: 'Data Structuring & Engineering',
    },
];

const CapabilityRow = ({ capability, explanation, rating, icon }: typeof RAG_TECHNICAL_DATA[0]) => {
    const IconComponent = CAPABILITY_ICONS[icon] || ListChecks;
    const ratingColor = rating >= 9 ? 'text-green-600 font-bold dark:text-green-400' : 'text-orange-500 font-semibold dark:text-orange-300';
    
    return (
        <TableRow>
            <TableCell className="font-medium text-lg text-indigo-700 dark:text-indigo-400 w-[20%]">
                <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                    <span>{capability}</span>
                </div>
            </TableCell>
            <TableCell className="w-[65%] text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {explanation}
            </TableCell>
            <TableCell className={`text-center w-[15%] ${ratingColor} text-2xl`}>
                {rating}/10
            </TableCell>
        </TableRow>
    );
};


// =================================================================
// --- Project Data ---

export const projects = [
    {
      id: 1,
      title: "AI Brochure Maker",
      description: "The AI Brochure Maker is a Jupyter Notebook project that automates the creation of professional company brochures. It scrapes and analyzes website content, identifies the most relevant information (e.g., About, Company, Careers pages), and generates a polished brochure draft using a Large Language Model.",
      tech_stack: ["Python", "Jupyter Notebook", "BeautifulSoup", "OpenAI API"],
      demo_url: "https://brochure-maker.streamlit.app/",
      repo_url: "https://github.com/MrSpecks/Brochure-Maker",
      screenshot_url: "/Brochure-Maker.png",
      category: "AI Tool"
    },
    {
      id: 2,
      title: "AI Q&A Code Assistant",
      description: "The AI Q&A Bot is a Jupyter Notebook project that allows you to interactively ask technical or general questions and receive AI-generated answers in real-time. It leverages a Large Language Model to provide accurate and context-aware responses, making it a valuable tool for developers and learners.",
      tech_stack: ["Python", "Jupyter Notebook", "OpenAI API", "Streamlit"],
      demo_url: "https://qna-code-assistant.streamlit.app/",
      repo_url: "https://github.com/MrSpecks/QnA-code-assistant",
      screenshot_url: "/Q&A-Bot.png",
      category: "AI Tool"
    },
    {
      id: 3,
      title: "Website Scraper & Summarizer",
      description: "This project is a Jupyter Notebook application that allows you to scrape the contents of a website and automatically generate a concise summary using a Large Language Model (LLM). It combines web scraping techniques with natural language processing to produce easy-to-read summaries of online content.",
      tech_stack: ["Python", "Jupyter Notebook", "BeautifulSoup", "OpenAI API"],
      demo_url: "https://website-summaryzer.streamlit.app/",
      repo_url: "https://github.com/MrSpecks/Website-Summarizer",
      screenshot_url: "/Website-scraper-summarizer.png",
      category: "AI Tool"
    },
    {
      id: 4,
      title: "Personal Portfolio Website",
      description: "A modern, responsive portfolio website showcasing projects and skills. Built with React, featuring smooth animations and dark mode support.",
      tech_stack: ["React", "Tailwind CSS", "Lucide", "TypeScript", "Vercel"],
      demo_url: "https://personal-portfolio-git-main-mrspecks-projects.vercel.app",
      repo_url: "https://github.com/MrSpecks/MrSpecks-/tree/main/portfolio",
      screenshot_url: "/website-preview.jpg",
      category: "Website"
    },
    {
      id: 5,
      title: "Personal Portfolio RAG Agent",
      description: "A Retrieval-Augmented Generation (RAG) agent integrated into my portfolio website. It's trained on my own site content and connected to Supabase for persistent learning. The agent not only answers visitor questions but also logs unknown queries to Supabase, creating a feedback loop that helps me continuously improve its knowledge base",
      tech_stack: ["React", "Supabase", "TailwindCSS", "OpenRouter", "RAG Pipeline"],
      demo_url: "https://kagiso-dev-portfolio-z55k-git-main-mrspecks-projects.vercel.app",
      repo_url: "https://github.com/MrSpecks/Kagiso-Dev-Portfolio",
      screenshot_url: "/Portfolio-RAG-Agent.png",
      category: "Web App"
    },
    {
      id: 6,
      title: "Property Reviews Dashboard",
      description: "A modern reviews management dashboard built to help property managers track and improve guest experience. The app integrates with a reviews API, normalizes data across multiple channels, and provides an interface to filter, approve, and publish guest feedback. Only manager-approved reviews appear on the public property page, ensuring trust and consistency.",
      tech_stack: ["React", "Typescript", "TailwindCSS", "API Integration", "Data Normalization", "Dashboard UI"],
      demo_url: "https://flexliving-reviews-hub.vercel.app/",
      repo_url: "https://github.com/MrSpecks/property-reviews-hub",
      screenshot_url: "/Property-Reviews-Dashboard.png",
      category: "Web App"
    },
    {
      id: 7,
      title: "CMS Reconnaisance Tool",
      description: "This tool is a high-performance, intelligent CMS Reconnaissance tool designed for authorized penetration testing engagements. It detects the backend technologies used by a wide range of websites (including PHP, JSP, Java EE, React, Vue, WordPress, and custom stacks)",
      tech_stack: ["Python", "Typescript", "Javascript", "CSS"],
      demo_url: "https://neo-shell-f0yv5z9in-mrspecks-projects.vercel.app/",
      repo_url: "https://github.com/MrSpecks/NeoShell",
      screenshot_url: "/python-tools.jpg",
      category: "Web Tool"
    },
    {
      id: 8,
      title: "OSINT Tool",
      description: "ReconX is an open-source, powerful reconnaissance and OSINT (Open-Source Intelligence) tool designed to streamline and automate the process of gathering critical information.",
      tech_stack: ["Python", "BeautifulSoup", "Javascript", "Domain API"],
      demo_url: "https://reconX-f0yv5z9in-mrspecks-projects.vercel.app/",
      repo_url: "https://github.com/MrSpecks/ReconX",
      screenshot_url: "/OSINT-Tool.jpg",
      category: "Web Tool"
    },
    {
      id: 9,
      title: "API Documentation Tool (In Development)",
      description: "An interactive API documentation generator that automatically creates beautiful docs from OpenAPI specifications with testing capabilities.",
      tech_stack: ["React", "Node.js", "Swagger", "Docker"],
      demo_url: "https://api-docs.example.com",
      repo_url: "https://github.com/MrSpecks/api-docs",
      screenshot_url: "/API-Documentation-Tool.jpg",
      category: "Tool"
    }
];

// =================================================================
// --- Main Projects Component ---

export const Projects = () => {

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web App":
      case "Web Tool":
      case "Website":
        return <Globe className="h-4 w-4" />;
      case "Mobile":
      case "Mobile App":
        return <Smartphone className="h-4 w-4" />;
      case "Tool":
      case "AI Tool":
        return <Code className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  // Helper to apply dark mode styling to Card content
  const CardContentStyles = "space-y-4 p-4 dark:bg-gray-800 rounded-b-xl";
  const CardTitleStyles = "text-xl font-semibold mb-2 group-hover:text-primary transition-colors dark:text-gray-100 dark:group-hover:text-indigo-400";
  const CardDescriptionStyles = "text-muted-foreground text-sm line-clamp-3 dark:text-gray-400";
  const ButtonOutlineStyles = "flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700";

  return (
    // Reverted main container style to the minimal original one
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto dark:text-gray-400">
            A showcase of my recent work and side projects. Each project represents different challenges 
            and technologies I've worked with.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="project-card group hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700">
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-t-xl mb-0 bg-muted dark:bg-gray-700">
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.screenshot_url})` }}
                >
                  {/* Category Badge overlay on image */}
                  <div className="absolute top-3 right-3">
                    <Badge 
                        variant="secondary" 
                        className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm text-gray-800 dark:bg-gray-900/80 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                    >
                        {getCategoryIcon(project.category)}
                        <span>{project.category}</span>
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className={CardContentStyles}>
                <div>
                  <h3 className={CardTitleStyles}>
                    {project.title}
                  </h3>
                  <p className={CardDescriptionStyles}>
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-800/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className={ButtonOutlineStyles}
                  >
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className={ButtonOutlineStyles}
                  >
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* --- RAG Agent Technical Capabilities Section --- */}
        <section id="rag-capabilities" className="max-w-7xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl mt-16 border border-gray-100 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center">
                <ListChecks className="w-7 h-7 mr-3" />
                Project Highlight: RAG Agent Technical Capabilities
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed border-l-4 border-indigo-200 dark:border-indigo-600 pl-4 bg-indigo-50/50 dark:bg-gray-800/50 p-4 rounded-lg">
                The Personal Portfolio **RAG Agent** is the ultimate demonstration of full-stack AI system development. It transcends a simple Q&A bot to function as a self-updating, knowledge-grounded expert on the professional profile. This project showcases mastery across the modern AI pipeline, from secure cloud architecture and robust vector database implementation to advanced LLM routing strategies.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                Proficiency Ratings Table
            </h3>

            <Table>
                <TableCaption>
                    Technical capabilities and architectural decisions implemented in the RAG Agent, rated on technical depth and functional execution.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[25%]">Capability</TableHead>
                        <TableHead className="w-[55%]">Explanation and Demonstration</TableHead>
                        <TableHead className="w-[20%] text-center">Rating (Out of 10)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {RAG_TECHNICAL_DATA.map((data, index) => (
                        <CapabilityRow key={index} {...data} />
                    ))}
                </TableBody>
            </Table>
        </section>


        {/* Call to Action */}
        <div className="text-center mt-16 mb-12">
          <Card className="p-8 bg-indigo-50 dark:bg-gray-800 border-indigo-200 dark:border-indigo-900 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Interested in Working Together?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto dark:text-gray-400">
              These projects represent just a sample of my work. I'm always excited to take on new challenges 
              and collaborate on innovative solutions.
            </p>
            <Link to="/contact">
              <Button size="lg" className="group bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Projects;
