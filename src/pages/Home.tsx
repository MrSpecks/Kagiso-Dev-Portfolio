import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Code, User, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RotatingTechCloud from "@/components/RotatingStackCloud";
import StarBorder from "@/components/StarBorder";
import { Particles } from "@/components/ui/shadcn-io/particles/Particles";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

// Import the carousel components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import your projects data
import { projects as featuredProjects } from "@/pages/Projects";
import FadeContent from "@/components/FadeContent";

// Import the TypewriterEffectSmooth component
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
const Home = () => {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const computeIsDark = () => {
      setIsDarkMode(theme === "dark" || (theme === "system" && mediaQuery.matches));
    };
    computeIsDark();
    mediaQuery.addEventListener("change", computeIsDark);
    return () => mediaQuery.removeEventListener("change", computeIsDark);
  }, [theme]);
  // Fetch certifications count
  const { data: certifications } = useQuery({
    queryKey: ["certifications-count"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certifications")
        .select("id", { count: "exact" });
      if (error) throw error;
      return data;
    },
  });

  const skills = [
    "React", "TypeScript", "Node.js", "Python", "Supabase",
    "Tailwind CSS", "PostgreSQL", "Gen AI", "Docker", "Azure", "Git",
    "Javascript", "Next.js", "Express", "Agentic AI", "Java", "Vercel",
    "HTML", "CSS", "REST APIs", "N8N", "CI/CD", "RAG", "Figma",
  ];
  const words = [
    {
      text: "Full-Stack",
      className: "text-primary-glow dark:text-primary-glow",
    },
    {
      text: "&",
      className: "text-primary-glow dark:text-primary-glow",
    },
    {
      text: "AI",
      className: "text-primary-glow dark:text-primary-glow",
    },
    {
      text: "Systems",
      className: "text-primary-glow dark:text-primary-glow",
    },
    {
      text: "Engineer",
      className: "text-primary-glow dark:text-primary-glow",
    },
    {
      text: "crafting",
    },
    {
      text: "exceptional",
    },
    {
      text: "digital",
    },
    {
      text: "experiences.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="hero-text">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 leading-tight text-3d">
              Hello, I'm <span className="text-primary-glow">Kagiso</span>
            </h1>
          </div>
          <div className="hero-text">
            <TypewriterEffectSmooth words={words} className="justify-center items-center" />
          </div>
          <div className="hero-text">
            <Link to="/projects">
              <Button size="lg" variant="secondary" className="group">
                View My Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Floating Skills Cloud */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] skill-tag">React</div>
          <div className="absolute top-[25%] right-[15%] skill-tag">TypeScript</div>
          <div className="absolute top-[40%] left-[5%] skill-tag">Node.js</div>
          <div className="absolute bottom-[20%] right-[10%] skill-tag">Python</div>
          <div className="absolute bottom-[10%] left-[20%] skill-tag">Supabase</div>
          <div className="absolute top-[5%] right-[25%] skill-tag">Tailwind</div>
          <div className="absolute top-[85%] right-[25%] skill-tag">Docker</div>
          <div className="absolute bottom-[30%] right-[20%] skill-tag">N8N</div>
          <div className="absolute top-[30%] right-[5%] skill-tag">RAG</div>
          <div className="absolute bottom-[5%] left-[40%] skill-tag">Git</div>
          <div className="absolute top-[60%] left-[15%] skill-tag">Next.js</div>
          <div className="absolute bottom-[40%] left-[5%] skill-tag">Gen AI</div>
          <div className="absolute top-[10%] left-[30%] skill-tag">Azure</div>
        </div>
      </section>

      {/* Stats Section */}
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">8</h3>
              <p className="text-muted-foreground">Projects Completed</p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{certifications?.length || 0}</h3>
              <p className="text-muted-foreground">Certifications Earned</p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">7+</h3>
              <p className="text-muted-foreground">Years Experience</p>
            </Card>
          </div>
        </div>
      </section>
      </FadeContent>
      
      {/* About Preview - REFACTORED */}
<FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
<section className="py-20 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header Section with Image + Intro */}
    <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
      {/* Circle Image - Left Side */}
      <div className="relative z-20 flex-shrink-0">
        <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden shadow-effect hover:shadow-lg transition-shadow duration-300">
          <img
            src="/Kagiso-Portrait.jpg"
            alt="Kagiso Mfusi"
            width="450"
            height="450"
            className="object-cover w-full h-full"
          /> 
        </div>
      </div>
      
      {/* Intro Text - Right Side */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          I design <span className="font-semibold text-foreground">AI automation systems</span> that eliminate manual work and scale operations across enterprise infrastructure.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Most companies treat AI and cloud as separate problems. They're not. When you architect them together—AI logic + multicloud infrastructure + intelligent workflows—you unlock something rare: <span className="font-semibold text-foreground">systems that get smarter as they scale.</span>
        </p>
      </div>
    </div>

    {/* Three-Column Capability Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Card 1: AI Engineering */}
      <Card className="p-6 border-l-2 border-l-primary/40 hover:border-l-primary hover:shadow-md transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <Code className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-3">AI Engineering</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              RAG pipelines, agentic AI workflows, and LLM integrations that make complex data actionable
            </p>
          </div>
        </div>
      </Card>

      {/* Card 2: Cloud Architecture */}
      <Card className="p-6 border-l-2 border-l-primary/40 hover:border-l-primary hover:shadow-md transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-3">Cloud Architecture</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Resilient multicloud systems built to adapt to real-world complexity
            </p>
          </div>
        </div>
      </Card>

      {/* Card 3: End-to-End Delivery */}
      <Card className="p-6 border-l-2 border-l-primary/40 hover:border-l-primary hover:shadow-md transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-3">End-to-End Delivery</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Complete solutions spanning backend infrastructure, UI, security, and deployment
            </p>
          </div>
        </div>
      </Card>
    </div>

    {/* Call to Action - Minimalist */}
    <div className="text-center border-t border-border/40 pt-12">
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Explore my work and see how I approach problems differently.
      </p>
      <Link to="/about">
        <Button size="lg" className="group">
          Read My Full Story
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  </div>
</section>
</FadeContent>
      
      {/* === Coming Soon: AI Document Intelligence Platform === */}
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Live!</h2>
            <p className="text-xl text-muted-foreground mt-3 max-w-3xl mx-auto">
              AI Document Intelligence Platform — documents in, intelligence out. Grounded RAG, vector search, and a workspace that feels quietly powerful.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Card className="overflow-hidden">
              <img
                src={isDarkMode ? "/Document-int.png" : "/Document-int2.png"}
                alt="AI Document Intelligence Platform"
                className="w-full h-72 md:h-full object-cover"
              />
            </Card>
            <Card className="p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 cursor-default">
              <h3 className="text-2xl font-semibold mb-3 transition-colors duration-300 group-hover:text-primary">AI Document Intelligence Platform is now LIVE!</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 transition-colors duration-300">
                Transform unstructured documents into actionable intelligence. Precision retrieval meets intuitive design.
              </p>
              <a href="https://ai-document-intelligence-platform.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Preview</Button>
              </a>
            </Card>
          </div>
        </div>
      </section>
      </FadeContent>
      {/* === END Coming Soon === */}

      {/* === NEW: Featured Projects Section === */}
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Projects</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Here's a glimpse of what I've been working on.
          </p>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {featuredProjects.map((project) => (
                <CarouselItem key={project.id}>
                  <div className="p-1">
                    <Card className="flex flex-col h-full overflow-hidden text-left">
                      <img
                        src={project.screenshot_url}
                        alt={project.title}
                        className="w-full h-60 object-cover"
                      />
                      <CardContent className="p-6 flex-grow">
                        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech_stack.map((tech) => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </CardContent>
                      <CardFooter className="p-6 bg-background/50 border-t">
                        <div className="flex justify-between w-full">
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="group">
                              Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </a>
                          <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="group">
                              <Github className="mr-2 h-4 w-4" /> View Code
                            </Button>
                          </a>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>
      </FadeContent>
      {/* === END: Featured Projects Section === */}

      {/* Skills Section */}
      
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Tech Stack</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            A comprehensive and versatile toolset for building modern web applications and agentic solutions
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <RotatingTechCloud />
          </div>
        </div>
        </section>
      

      {/* CTA Section */}
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Work Together?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your next project and bring your ideas to life
          </p>
          <Link to="/contact">
            <Button size="lg" className="group">
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
      </FadeContent>
      {/* Interactive particles */}
      <Particles
        className="absolute inset-0"
        quantity={200}
        ease={80}
        staticity={50}
        color="#ffffff"
        size={0.8}
      />
    </div>
  );
};

export default Home;
