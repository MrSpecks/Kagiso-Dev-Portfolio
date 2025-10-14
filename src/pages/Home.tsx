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
      text: "AI",
      className: "text-primary-glow dark:text-primary-glow",
    },
    {
      text: "&",
      className: "text-primary-glow dark:text-primary-glow",
    },
    {
      text: "Systems",
      className: "text-primary-glow dark:text-primary-glow",
    },
    {
      text: "Developer",
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hello, I'm <span className="text-primary-glow">Kagiso</span>
            </h1>
          </div>
          <div className="hero-text">
            <TypewriterEffectSmooth words={words} />
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
              <h3 className="text-3xl font-bold mb-2">6</h3>
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
      
      {/* About Preview */}
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <section className="py-20 bg-background">

      {/* Circle Image Cutout */}
      <div className="relative z-20 mb-12 mx-auto w-44 h-44 rounded-full overflow-hidden shadow-effect">
       <img
          src="/Kagiso-Portrait.jpg"
          alt="Kagiso Mfusi"
          width="450"
          height="450"
          className="object-cover"
        /> 
      </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            My journey into tech hasn't followed the traditional path. 
            I've carved my own by building, iterating, and evolving—learning from every success and failure along the way. 
            Over the past 7 years, that persistence has shaped me into a Systems & AI Developer thriving at the intersection of cloud, AI, and automation.
          </p>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            I specialize in LLM engineering and multi-cloud architecture, turning complex problems into scalable solutions that deliver real-world impact. 
            For me, it's not just about the code—it's about making businesses smarter, people's lives easier, and the future more accessible.
          </p>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Explore my work, and see how curiosity, creativity, and technology come together to create meaningful solutions.
          </p>
          <Link to="/about">
            <Button size="lg" className="group">
              Read More
            </Button>
          </Link>
        </div>
      </section>
      </FadeContent>
      
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