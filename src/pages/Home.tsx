import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Code, User, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              An AI & Systems Developer crafting exceptional digital experiences
            </p>
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
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">8+</h3>
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
      
      {/* About Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            My journey into tech hasn't been a straight line. I didn't take the traditional route. Instead, I carved
            my own path by building, failing, and building again. Over the last 7 years, that persistence has shaped me
            into a Systems & AI Developer who thrives at the intersection of cloud, AI, and automation.
          </p>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            I specialize in LLM engineering and multi-cloud architecture, turning complex ideas into solutions that actually
            scale and deliver measurable value. But for me, it's not just about the code or the architecture - it's about the
            impact. I believe technology should make businesses smarter, people's lives easier, and the future more accessible.
          </p>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            While you're here, I hope you enjoy exploring this portfolio as much as I enjoyed creating it.
          </p>
          <Link to="/about">
            <Button size="lg" className="group">
              Read More
            </Button>
          </Link>
        </div>
      </section>
      
      {/* === NEW: Featured Projects Section === */}
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
      {/* === END: Featured Projects Section === */}

      {/* Skills Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Tech Stack</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            A comprehensive and versatile toolset for building modern web applications and agentic solutions
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  );
};

export default Home;