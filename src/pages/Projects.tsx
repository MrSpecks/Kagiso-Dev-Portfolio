import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code, Smartphone, Globe } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.",
      tech_stack: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      demo_url: "https://demo-ecommerce.example.com",
      repo_url: "https://github.com/username/ecommerce-platform",
      screenshot_url: "/api/placeholder/600/400",
      category: "Web App"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative project management tool built with React and Supabase. Real-time updates, team collaboration, file sharing, and progress tracking.",
      tech_stack: ["React", "Supabase", "TypeScript", "Tailwind CSS"],
      demo_url: "https://taskmanager.example.com",
      repo_url: "https://github.com/username/task-manager",
      screenshot_url: "/api/placeholder/600/400",
      category: "Web App"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather application with location-based forecasts, interactive maps, and detailed weather metrics. Built with modern JavaScript frameworks.",
      tech_stack: ["React", "OpenWeather API", "Chart.js", "CSS Modules"],
      demo_url: "https://weather-dash.example.com",
      repo_url: "https://github.com/username/weather-dashboard",
      screenshot_url: "/api/placeholder/600/400",
      category: "Web App"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing projects and skills. Built with React, featuring smooth animations and dark mode support.",
      tech_stack: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
      demo_url: "https://portfolio.example.com",
      repo_url: "https://github.com/username/portfolio",
      screenshot_url: "/api/placeholder/600/400",
      category: "Website"
    },
    {
      id: 5,
      title: "Chat Application",
      description: "Real-time messaging application with WebSocket integration. Features include group chats, file sharing, emoji reactions, and message encryption.",
      tech_stack: ["React", "Socket.io", "Node.js", "MongoDB"],
      demo_url: "https://chat-app.example.com",
      repo_url: "https://github.com/username/chat-app",
      screenshot_url: "/api/placeholder/600/400",
      category: "Web App"
    },
    {
      id: 6,
      title: "API Documentation Tool",
      description: "An interactive API documentation generator that automatically creates beautiful docs from OpenAPI specifications with testing capabilities.",
      tech_stack: ["React", "Node.js", "Swagger", "Docker"],
      demo_url: "https://api-docs.example.com",
      repo_url: "https://github.com/username/api-docs",
      screenshot_url: "/api/placeholder/600/400",
      category: "Tool"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web App":
        return <Globe className="h-4 w-4" />;
      case "Mobile":
        return <Smartphone className="h-4 w-4" />;
      case "Tool":
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