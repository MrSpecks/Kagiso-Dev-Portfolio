import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import * as React from "react";
import FadeContent from "@/components/FadeContent";
// Added Sparkles and Zap for the RAG Agent section styling, while keeping all original imports
import { 
    ArrowRight, ListChecks, Database, Workflow, Cloud, Search, Cpu, ExternalLink, 
    Github, Code, Smartphone, Globe, Sparkles, Zap 
} from "lucide-react";

export const projects = [
    {
        id: 1,
        title: "AI Brochure Maker",
        description: "The AI Brochure Maker is a Jupyter Notebook project that automates the creation of professional company brochures. It scrapes and analyzes website content, identifies the most relevant information (e.g., About, Company, Careers pages), and generates a polished brochure draft using a Large Language Model.",
        tech_stack: ["Python", "BeautifulSoup", "Streamlit", "OpenAI API", "OpenRouter"],
        demo_url: "https://brochure-maker.streamlit.app/",
        repo_url: "https://github.com/MrSpecks/Brochure-Maker",
        screenshot_url: "/Brochure-Maker.png",
        category: "AI Tool"
    },
    {
        id: 2,
        title: "AI Q&A Code Assistant",
        description: "The AI Q&A Bot is a Jupyter Notebook project that allows you to interactively ask technical or general questions and receive AI-generated answers in real-time. It leverages a Large Language Model to provide accurate and context-aware responses, making it a valuable tool for developers and learners.",
        tech_stack: ["Python", "OpenAI API", "Streamlit", "OpenRouter"],
        demo_url: "https://qna-code-assistant.streamlit.app/",
        repo_url: "https://github.com/MrSpecks/QnA-code-assistant",
        screenshot_url: "/Q&A-Bot.png",
        category: "AI Tool"
    },
    {
        id: 3,
        title: "Website Scraper & Summarizer",
        description: "This project is a Jupyter Notebook application that allows you to scrape the contents of a website and automatically generate a concise summary using a Large Language Model (LLM). It combines web scraping techniques with natural language processing to produce easy-to-read summaries of online content.",
        tech_stack: ["Python", "BeautifulSoup","OpenRouter", "OpenAI API", "Streamlit"],
        demo_url: "https://website-summaryzer.streamlit.app/",
        repo_url: "https://github.com/MrSpecks/Website-Summarizer",
        screenshot_url: "/Website-scraper-summarizer.png",
        category: "AI Tool"
    },
    {
        id: 4,
        "title": "Interactive Ames Housing Market Dashboard",
        "description": "A production-ready data application that transforms a comprehensive Jupyter Notebook EDA and advanced feature engineering process (50+ custom features) into a dynamic Streamlit dashboard. The core achievement was refactoring all logic into modular Python packages to ensure clean, maintainable code. The dashboard provides real estate professionals with interactive filters (Neighborhood, Quality, Price Range) to visualize key property metrics, price distributions, and dynamic feature correlations in real-time.",
        "tech_stack": [
            "Python",
            "Streamlit",
            "Pandas",
            "Plotly",
            "Data Refactoring",
            "Feature Engineering",
            "Modular Design"
        ],
        demo_url: "https://housing-prices-dashboard.streamlit.app/",
        repo_url: "https://github.com/MrSpecks/Machine-Learning-Project",
        screenshot_url: "/Exploratory-Data-Analysis-Dashboard.png",
        category: "Data App & Visualization"
    },
    {
        id: 5,
        title: "Personal Portfolio RAG Agent",
        description: "A Retrieval-Augmented Generation (RAG) agent integrated into my portfolio website. It's trained on my own site content and connected to Supabase for persistent learning. The agent not only answers visitor questions but also logs unknown queries to Supabase, creating a feedback loop that helps me continuously improve its knowledge base",
        tech_stack: ["React", "Supabase", "TailwindCSS", "OpenRouter", "RAG Pipeline"],
        demo_url: "https://kagiso-dev-portfolio-z55k-fa6c2gtm8-mrspecks-projects.vercel.app",
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
        title: "Personal Portfolio Website",
        description: "My bespoke personal portfolio, engineered for technical depth and future-ready craftsmanship. Built on Next.js, TypeScript, and Tailwind CSS with a clean, scalable architecture. Features smooth Framer Motion animations, JSON-driven content, full responsiveness, and an engaging dark mode toggle with an Easter Egg.",
        tech_stack: ["React", "Tailwind CSS", "Lucide", "TypeScript", "Vercel"],
        demo_url: "https://personal-portfolio-git-main-mrspecks-projects.vercel.app",
        repo_url: "https://github.com/MrSpecks/MrSpecks-/tree/main/portfolio",
        screenshot_url: "/website-preview.jpg",
        category: "Website"
    },
];
 
export const Projects = () => {
      // Mock data based on the Executive Summary in the original project files
  const executiveSummary = [
    { title: "Strongest Predictor", value: "Quality (r=0.79)", color: "text-blue-600" },
    { title: "Price Variation", value: "3x across neighborhoods", color: "text-green-600" },
    { title: "Size Correlation", value: "Secondary to Quality (r=0.71)", color: "text-yellow-600" },
    { title: "Data Readiness", value: "Excellent, Modeling-Ready", color: "text-purple-600" },
  ];
 
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Web App":
            case "Web Tool":
            case "Website":
            case "Data App & Visualization":
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
 
    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Projects</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        A showcase of my recent work and side projects. Each project represents different challenges 
                        and technologies I've worked with. Including my work in Data Science, ML Engineering, and AI application development.
                    </p>
                </div>

                {/* --- RAG Agent Technical Capabilities Section --- */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <div id="rag-agent-capabilities" className="project-card mb-16 mx-auto max-w-4xl">
                    <div className="flex items-center space-x-3 mb-4">
                        <Zap className="w-8 h-8 text-primary" />
                        <h3 className="text-2xl font-bold text-primary">
                            Featured Case Study: Personal Portfolio RAG Agent
                        </h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                        The RAG Agent is the ultimate demonstration of full-stack AI system development, proving mastery across the modern AI pipeline, from secure cloud architecture to vector database management.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <caption className="sr-only">RAG Agent Technical Capabilities and Proficiency Ratings</caption>
                            <thead className="text-xs uppercase bg-primary/10 text-primary border-b border-primary/20">
                                <tr>
                                    <th scope="col" className="px-4 py-3 min-w-[150px] md:min-w-[200px]">Capability</th>
                                    <th scope="col" className="px-4 py-3 min-w-[300px]">Explanation and Demonstration</th>
                                    <th scope="col" className="px-4 py-3 text-center min-w-[100px]">Rating <br />(1-10)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* RAG Pipeline Architecture */}
                                <tr className="bg-card border-b border-border hover:bg-secondary/30 transition-colors">
                                    <th scope="row" className="px-4 py-4 font-medium text-foreground whitespace-nowrap flex items-center">
                                        <Cpu className="w-4 h-4 mr-2 text-muted-foreground" /> RAG Pipeline Architecture
                                    </th>
                                    <td className="px-4 py-4 text-muted-foreground">
                                        Successful end-to-end implementation: Embedding &rarr; Storage Retrieval &rarr; Context Augmentation &rarr; LLM Generation. Core success proven by the agent's ability to answer complex, grounded queries.
                                    </td>
                                    <td className="px-4 py-4 text-center text-lg font-semibold text-primary">
                                        9/10
                                    </td>
                                </tr>
                                {/* Vector Embedding */}
                                <tr className="bg-card border-b border-border hover:bg-secondary/30 transition-colors">
                                    <th scope="row" className="px-4 py-4 font-medium text-foreground whitespace-nowrap flex items-center">
                                        <Sparkles className="w-4 h-4 mr-2 text-muted-foreground" /> Vector Embedding (Jina-v3)
                                    </th>
                                    <td className="px-4 py-4 text-muted-foreground">
                                        Direct, functional code implementation to call the Jina AI API, consistently converting source text into high-quality vector representations.
                                    </td>
                                    <td className="px-4 py-4 text-center text-lg font-semibold text-primary">
                                        8/10
                                    </td>
                                </tr>
                                {/* Serverless Deployment */}
                                <tr className="bg-card border-b border-border hover:bg-secondary/30 transition-colors">
                                    <th scope="row" className="px-4 py-4 font-medium text-foreground whitespace-nowrap flex items-center">
                                        <Globe className="w-4 h-4 mr-2 text-muted-foreground" /> Serverless Deployment (Vercel)
                                    </th>
                                    <td className="px-4 py-4 text-muted-foreground">
                                        The entire RAG architecture (vectorization, database interaction, LLM call) is hosted within a resilient, production-ready Vercel Serverless Function.
                                    </td>
                                    <td className="px-4 py-4 text-center text-lg font-semibold text-primary">
                                        9/10
                                    </td>
                                </tr>
                                {/* Vector Database Management */}
                                <tr className="bg-card border-b border-border hover:bg-secondary/30 transition-colors">
                                    <th scope="row" className="px-4 py-4 font-medium text-foreground whitespace-nowrap flex items-center">
                                        <Database className="w-4 h-4 mr-2 text-muted-foreground" /> Vector DB Management (Supabase/pgvector)
                                    </th>
                                    <td className="px-4 py-4 text-muted-foreground">
                                        Utilized Supabase with the pgvector extension to efficiently store and perform high-speed Cosine Similarity searches for the retrieval mechanism.
                                    </td>
                                    <td className="px-4 py-4 text-center text-lg font-semibold text-primary">
                                        8/10
                                    </td>
                                </tr>
                                {/* Context-Grounded Generation */}
                                <tr className="bg-card hover:bg-secondary/30 transition-colors">
                                    <th scope="row" className="px-4 py-4 font-medium text-foreground whitespace-nowrap flex items-center">
                                        <Cpu className="w-4 h-4 mr-2 text-muted-foreground" /> Context-Grounded Generation
                                    </th>
                                    <td className="px-4 py-4 text-muted-foreground">
                                        Implemented a strict System Instruction for the LLM, forcing the synthesis of answers only from the retrieved facts. This eliminates speculation and guarantees verifiable responses.
                                    </td>
                                    <td className="px-4 py-4 text-center text-lg font-semibold text-primary">
                                        9/10
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </FadeContent>

                {/* Projects Grid (Original Content) */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Card key={project.id} className="project-card group">
                        {/* Icon and Category based on project ID for polish */}
                        <div className="flex items-center justify-between mb-4">
                                {project.id === 2 ? (
                                    <Zap className="h-8 w-8 text-primary" />
                                ) : project.id === 3 ? (
                                    <Database className="h-8 w-8 text-blue-500" />
                                ) : (
                                    <Sparkles className="h-8 w-8 text-yellow-500" />
                                )}
                                <Badge variant="secondary" className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                    {project.category}
                                </Badge>
                            </div>
 
                            {/* Project Content */}
                            <div className="space-y-4 p-4">
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-6 text-sm">
                                        {project.description}
                                    </p>
                                </div>
                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stack.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                                {/* Project Image */}
                            <div className="relative overflow-hidden rounded-lg mb-4 bg-muted">
                                <div
                                    className="w-full h-48 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${project.screenshot_url})` }}
                                >
                                    {/* Removed category icon and text to make space for the image */}
                                </div>
                            </div>
                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-2">
                                <Button asChild variant="outline" size="sm" className="w-1/2">
                                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live Demo
                                    </a>
                                </Button>
                                <Button asChild size="sm" className="w-1/2">
                                    <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex items-center group">
                                        <Github className="mr-2 h-4 w-4" />
                                        Source Code
                                    </a>
                                </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                </FadeContent>
 
                {/* Call to Action */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <div className="text-center mt-16">
                    <Card className="p-8 bg-primary/5 border-primary/20">
                        <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            These projects represent just a sample of my work. I'm always excited to take on new challenges 
                            and collaborate on innovative solutions.
                        </p>
                        <Link to="/contact">
                            <Button size="lg" className="group">
                                Lets discuss you next project
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </Card>
                </div>
                </FadeContent>
            </div>
        </div>
    );
};
 
export default Projects;
