import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Code, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
              AI & Systems Developer crafting exceptional digital experiences
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
          <div className="absolute top-[50%] left-[25%] skill-tag">Docker</div>
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

      {/* Skills Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Technical Skills</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            A comprehensive and versatile skillset for building modern web applications and agentic solutions
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