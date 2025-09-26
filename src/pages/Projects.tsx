import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code, Smartphone, Globe } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "AI Brochure Maker",
      description: "The AI Brochure Maker is a Jupyter Notebook project that automates the creation of professional company brochures. It scrapes and analyzes website content, identifies the most relevant information (e.g., About, Company, Careers pages), and generates a polished brochure draft using a Large Language Model.",
      tech_stack: ["Python", "Jupyter Notebook", "BeautifulSoup", "OpenAI API"],
      demo_url: "https://demo-aibrochure.example.com",
      repo_url: "https://github.com/MrSpecks/LLM-Engineering-Projects/tree/main/AI-Brochure-Maker",
      screenshot_url: "/api/placeholder/600/400",
      category: "AI Tool"
    },
    {
      id: 2,
      title: "AI Q&A Code Assistant",
      description: "The AI Q&A Bot is a Jupyter Notebook project that allows you to interactively ask technical or general questions and receive AI-generated answers in real-time. It leverages a Large Language Model to provide accurate and context-aware responses, making it a valuable tool for developers and learners.",
      tech_stack: ["Python", "Jupyter Notebook", "OpenAI API", "Streamlit"],
      demo_url: "https://Question%26Answer.example.com",
      repo_url: "https://github.com/MrSpecks/LLM-Engineering-Projects/tree/main/Question%26Answer-bot",
      screenshot_url: "/api/placeholder/600/400",
      category: "AI Tool"
    },
    {
      id: 3,
      title: "Website Scraper & Summarizer",
      description: "This project is a Jupyter Notebook application that allows you to scrape the contents of a website and automatically generate a concise summary using a Large Language Model (LLM). It combines web scraping techniques with natural language processing to produce easy-to-read summaries of online content.",
      tech_stack: ["Python", "Jupyter Notebook", "BeautifulSoup", "OpenAI API"],
      demo_url: "https://websitescraper%26summarizer.example.com",
      repo_url: "https://github.com/MrSpecks/LLM-Engineering-Projects/tree/main/Webscrapper-summarizer",
      screenshot_url: "/api/placeholder/600/400",
      category: "AI Tool"
    },
    {
      id: 4,
      title: "Personal Portfolio Website",
      description: "A modern, responsive portfolio website showcasing projects and skills. Built with React, featuring smooth animations and dark mode support.",
      tech_stack: ["React", "Tailwind CSS", "Lucide", "TypeScript", "Vercel"],
      demo_url: "https://portfolio.example.com",
      repo_url: "https://github.com/MrSpecks/MrSpecks-/tree/main/portfolio",
      screenshot_url: "/api/placeholder/600/400",
      category: "Website"
    },
    {
      id: 5,
      title: "Personal Portfolio RAG Agent",
      description: "A Retrieval-Augmented Generation (RAG) agent integrated into my portfolio website. \
      It's trained on my own site content and connected to Supabase for persistent learning. \
      The agent not only answers visitor questions but also logs unknown queries to Supabase, \
      creating a feedback loop that helps me continuously improve its knowledge base",
      tech_stack: ["React", "Supabase", "TailwindCSS", "OpenRouter", "RAG Pipeline"],
      demo_url: "https://chat-app.example.com",
      repo_url: "https://github.com/username/chat-app",
      screenshot_url: "/api/placeholder/600/400",
      category: "Web App"
    },
    {
      id: 6,
      title: "Property Reviews Dashboard",
      description: "A modern reviews management dashboard built to help property managers track and improve \
      guest experience. The app integrates with a reviews API, normalizes data across multiple channels, \
      and provides an interface to filter, approve, and publish guest feedback. Only manager-approved \
      reviews appear on the public property page, ensuring trust and consistency.",
      tech_stack: ["React", "Typescript", "TailwindCSS", "API Integration", "Data Normalization", "Dashboard UI"],
      demo_url: "https://flexliving-reviews-dashboard-n1rnorflb-mrspecks-projects.vercel.app/",
      repo_url: "https://github.com/MrSpecks/flexliving-reviews-dashboard",
      screenshot_url: "/api/placeholder/600/400",
      category: "Web App"
    },
    {
      id: 7,
      title: "CMS Reconnaisance Tool",
      description: "This tool is a high-performance, intelligent CMS Reconnaissance tool \
      designed for authorized penetration testing engagements. It detects the backend technologies \
      used by a wide range of websites (including PHP, JSP, Java EE, React, Vue, WordPress, and custom stacks)",
      tech_stack: ["Python", "Typescript", "Javascript", "CSS"],
      demo_url: "https://neo-shell-f0yv5z9in-mrspecks-projects.vercel.app/",
      repo_url: "https://github.com/MrSpecks/NeoShell",
      screenshot_url: "/api/placeholder/600/400",
      category: "Web Tool"
    },
    {
      id: 8,
      title: "OSINT Tool",
      description: "ReconX is an open-source, powerful reconnaissance and OSINT (Open-Source Intelligence)\
      tool designed to streamline and automate the process of gathering critical information.",
      tech_stack: ["Python", "BeautifulSoup", "Javascript", "Domain API"],
      demo_url: "https://reconX-f0yv5z9in-mrspecks-projects.vercel.app/",
      repo_url: "https://github.com/MrSpecks/ReconX",
      screenshot_url: "/api/placeholder/600/400",
      category: "Web Tool"
    },
    {
      id: 9,
      title: "API Documentation Tool (In Development)",
      description: "An interactive API documentation generator that automatically creates beautiful docs from OpenAPI specifications with testing capabilities.",
      tech_stack: ["React", "Node.js", "Swagger", "Docker"],
      demo_url: "https://api-docs.example.com",
      repo_url: "https://github.com/MrSpecks/api-docs",
      screenshot_url: "/api/placeholder/600/400",
      category: "Tool"
    }
  ];

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

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work and side projects. Each project represents different challenges 
            and technologies I've worked with.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="project-card group">
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-4 bg-muted">
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  {getCategoryIcon(project.category)}
                  <span className="ml-2 text-sm text-muted-foreground">{project.category}</span>
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
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

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
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
                  <Button variant="outline" size="sm" asChild className="flex-1">
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These projects represent just a sample of my work. I'm always excited to take on new challenges 
              and collaborate on innovative solutions.
            </p>
            <Button>
              Let's Discuss Your Project
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Projects;