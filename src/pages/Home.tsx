import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Code, User, ExternalLink, Github, Download } from "lucide-react";
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
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import your projects data
import { projects as featuredProjects } from "@/data/projects";
import FadeContent from "@/components/FadeContent";

// Import the TypewriterEffectSmooth component
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
const Home = () => {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const [isHoveringProjectsCarousel, setIsHoveringProjectsCarousel] = useState(false);
  const [linkedinApi, setLinkedinApi] = useState<CarouselApi>();
  const [projectsApi, setProjectsApi] = useState<CarouselApi>();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const computeIsDark = () => {
      setIsDarkMode(theme === "dark" || (theme === "system" && mediaQuery.matches));
    };
    computeIsDark();
    mediaQuery.addEventListener("change", computeIsDark);
    return () => mediaQuery.removeEventListener("change", computeIsDark);
  }, [theme]);

  // Load LinkedIn embed script (guard against duplicate injection on re-renders)
  useEffect(() => {
    if (document.getElementById('linkedin-embed-script')) return;
    const script = document.createElement("script");
    script.id = 'linkedin-embed-script';
    script.src = "https://platform.linkedin.com/in.js";
    script.async = true;
    script.innerHTML = "{ lang: 'en_US' }";
    document.body.appendChild(script);
    return () => {
      const existing = document.getElementById('linkedin-embed-script');
      if (existing?.parentNode) {
        existing.parentNode.removeChild(existing);
      }
    };
  }, []);

  // Auto-scroll Socials carousel every 10 seconds, pause on hover
  useEffect(() => {
    if (isHoveringCarousel || !linkedinApi) return;
    const interval = setInterval(() => linkedinApi.scrollNext(), 10000);
    return () => clearInterval(interval);
  }, [isHoveringCarousel, linkedinApi]);

  // Auto-scroll Featured Projects carousel every 10 seconds, pause on hover
  useEffect(() => {
    if (isHoveringProjectsCarousel || !projectsApi) return;
    const interval = setInterval(() => projectsApi.scrollNext(), 10000);
    return () => clearInterval(interval);
  }, [isHoveringProjectsCarousel, projectsApi]);

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

  const linkedInPosts = [
    {
      id: 1,
      src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7381804824079699968?collapsed=1",
      height: "589",
      width: "504",
    },
    {
      id: 2,
      src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7385976303293739008?collapsed=1",
      height: "669",
      width: "504",
    },
    {
      id: 3,
      src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7389603001931378688?collapsed=1",
      height: "590",
      width: "504",
    },
    {
      id: 4,
      src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7391108637479305218?collapsed=1",
      height: "669",
      width: "504",
    },
    {
      id: 5,
      src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7393550317369503744?collapsed=1",
      height: "669",
      width: "504",
    },
    {
      id: 6,
      src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7401662260366241792?collapsed=1",
      height: "669",
      width: "504",
    },
    {
      id: 7,
      src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7407334745031794689?collapsed=1",
      height: "669",
      width: "504",
    },
    {
      id: 8,
      src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7407348416730632192?collapsed=1",
      height: "565",
      width: "504",
    },
  ];

  const skills = [
    "React", "TypeScript", "Node.js", "Python", "Supabase",
    "Tailwind CSS", "PostgreSQL", "Gen AI", "Docker", "Azure", "Git",
    "Javascript", "Next.js", "Express", "Agentic AI", "Java", "Vercel",
    "HTML", "CSS", "REST APIs", "N8N", "CI/CD", "RAG", "Figma",
  ];
  const words = [
    {
      text: "AI",
      className: "text-primary dark:text-primary font-bold",
    },
    {
      text: "Automation",
      className: "text-primary dark:text-primary font-bold",
    },
    {
      text: "Architect",
      className: "text-primary dark:text-primary font-bold",
    },
    {
      text: "designing",
    },
    {
      text: "systems",
    },
    {
      text: "that",
    },
    {
      text: "eliminate",
    },
    {
      text: "manual",
    },
    {
      text: "work",
    },
    {
      text: "and",
    },
    {
      text: "scale",
    },
    {
      text: "at",
    },
    {
      text: "enterprise",
    },
    {
      text: "level.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center text-white relative overflow-hidden">
        <Particles
          className="absolute inset-0 z-0"
          quantity={200}
          ease={80}
          staticity={50}
          color={isDarkMode ? "#ffffff" : "#0d9488"}
          size={0.8}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          <div className="hero-text">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 leading-tight text-3d">
              Hello, I'm <span className="text-primary-glow">Kagiso</span>
            </h1>
          </div>
          <div className="hero-text">
            <TypewriterEffectSmooth words={words} className="justify-center items-center" />
          </div>
          <div className="hero-text flex flex-wrap gap-3 justify-center">
            <Link to="/projects">
              <Button size="lg" variant="secondary" className="group">
                View My Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="/Kagiso-Mfusi-CV.pdf" download="Kagiso-Mfusi-CV.pdf">
              <Button size="lg" variant="outline" className="group glass-hero border-white/30 text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </a>
          </div>
        </div>
        
        {/* Floating Skills Cloud — hidden on mobile to prevent overlap */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
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
            <Card className="glass-card p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{featuredProjects.length}</h3>
              <p className="text-muted-foreground">Projects Completed</p>
            </Card>

            <Card className="glass-card p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{certifications?.length || 0}</h3>
              <p className="text-muted-foreground">Certifications Earned</p>
            </Card>

            <Card className="glass-card p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{new Date().getFullYear() - 2018}+</h3>
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
          I build and ship <span className="font-semibold text-foreground">AI-powered systems for real clients</span> — agentic workflows, production APIs, containerised infrastructure, and headless platforms. Everything I deliver runs in live environments under my full ownership.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Most engineers use AI to write faster code. I use AI to engineer production systems — with structured agent orchestration, session-persistent memory, and verification gates. <span className="font-semibold text-foreground">The difference is the depth of the toolchain, not the speed of the output.</span>
        </p>
      </div>
    </div>

    {/* Three-Column Capability Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Card 1: AI Engineering */}
      <Card className="glass-card p-6 border-l-2 border-l-primary/40 hover:border-l-primary hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <Code className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-3">AI Engineering</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Agentic AI workflows, RAG pipelines, and LLM integrations engineered for production — not proof-of-concept
            </p>
          </div>
        </div>
      </Card>

      {/* Card 2: Cloud Architecture */}
      <Card className="glass-card p-6 border-l-2 border-l-primary/40 hover:border-l-primary hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-3">Cloud Architecture</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Containerised multicloud systems — Docker, Traefik, VPS infrastructure — built and maintained for live client workloads
            </p>
          </div>
        </div>
      </Card>

      {/* Card 3: End-to-End Delivery */}
      <Card className="glass-card p-6 border-l-2 border-l-primary/40 hover:border-l-primary hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-3">End-to-End Delivery</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Consulting-grade delivery: from architecture decision to production deployment, 5+ clients, one underlying template
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
      
      {/* === Featured Build: Misaveni Pharmacy (Live) === */}
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <h2 className="text-3xl md:text-4xl font-bold">Featured Build</h2>
              <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 animate-pulse">Live</Badge>
            </div>
            <p className="text-xl text-muted-foreground mt-3 max-w-3xl mx-auto">
              Misaveni Pharmacy — a real local business, live on the web for the first time, built end-to-end from brand to deploy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Card className="glass-card overflow-hidden rounded-xl">
              <img
                src="/Misaveni-Pharmacy.png"
                alt="Misaveni Pharmacy website homepage"
                className="w-full h-72 md:h-full object-cover"
                loading="lazy"
              />
            </Card>
            <Card className="glass-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default">
              <h3 className="text-2xl font-semibold mb-3">Misaveni Pharmacy is now LIVE!</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A neighbourhood pharmacy's first website — real brand tokens, a governed build process, and zero data collection by design. Built end-to-end, from client logo to production.
              </p>
              <a href="https://misaveni-pharmacy.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Visit Site</Button>
              </a>
            </Card>
          </div>
        </div>
      </section>
      </FadeContent>
      {/* === END Coming Soon === */}

      {/* === Socials Section === */}
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect on Social Media</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my latest posts, insights, and updates. Follow along to see what I'm building and thinking about.
            </p>
          </div>

          <div
            onMouseEnter={() => setIsHoveringCarousel(true)}
            onMouseLeave={() => setIsHoveringCarousel(false)}
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setLinkedinApi}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                {linkedInPosts.map((post) => (
                  <CarouselItem key={post.id} className="basis-full md:basis-1/2">
                    <div className="flex justify-center p-1">
                      <div className="flex justify-center overflow-hidden rounded-xl glass-card">
                        <iframe
                          src={post.src}
                          height={post.height}
                          width={post.width}
                          frameBorder="0"
                          allowFullScreen
                          title={`LinkedIn post ${post.id}`}
                          className="linkedin-embed"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </section>
      </FadeContent>
      {/* === END Socials Section === */}

      {/* === NEW: Featured Projects Section === */}
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Projects</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Here's a glimpse of what I've been working on.
          </p>

          <div
            onMouseEnter={() => setIsHoveringProjectsCarousel(true)}
            onMouseLeave={() => setIsHoveringProjectsCarousel(false)}
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setProjectsApi}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {featuredProjects.map((project) => (
                  <CarouselItem key={project.id}>
                    <div className="p-1">
                      <Card className="glass-card flex flex-col h-full overflow-hidden text-left">
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
        </div>
      </section>
      </FadeContent>
      {/* === END: Featured Projects Section === */}

      {/* Skills Section */}
      
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Tech Stack</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            The tools I reach for when building production systems and agentic workflows
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <RotatingTechCloud />
          </div>
        </div>
        </section>
      

      {/* CTA Section */}
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-2xl p-12">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Let's build something</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Got a system that needs to be smarter?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether it's eliminating manual workflows, wiring AI into your infrastructure, or architecting from scratch — let's talk about what's possible.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="group">
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline">
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </FadeContent>
    </div>
  );
};

export default Home;
