/**
 * Architecture Principles & Systems Thinking Page
 *
 * PURPOSE:
 * This page serves as a public declaration of architectural philosophy and systems thinking approach.
 * It positions the portfolio owner as a senior AI Systems Architect with enterprise-level maturity,
 * demonstrating pattern recognition, structured thinking, and leadership capabilities.
 *
 * IDENTITY STRENGTHENING:
 * - Elevates positioning from builder to architect/thought leader
 * - Signals maturity in AI, cloud, and automation integration
 * - Demonstrates business-aligned, scalable architectural thinking
 * - Appeals to executive-level hiring teams looking for strategic architects
 *
 * ARCHITECTURE APPLIED TO THIS PAGE:
 * - Follows established component patterns (FadeContent for scroll animations)
 * - Uses design system consistently (Tailwind + shadcn/ui)
 * - Maintains semantic HTML structure for accessibility
 * - Implements progressive disclosure with clear visual hierarchy
 * - Mobile-first responsive design
 *
 * SCALABILITY:
 * - Easy to add new principles via principlesData array
 * - Modular structure allows for future interactive elements
 * - Content can be moved to CMS or database with minimal refactoring
 * - Component structure supports A/B testing and analytics integration
 */

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FadeContent from "@/components/FadeContent";
import {
  Brain,
  Network,
  Target,
  Layers,
  Workflow,
  Lightbulb,
  Shield,
  BarChart3,
  Blocks,
  GitBranch,
  Zap,
  Users,
  TrendingUp,
  Eye,
  BoxSelect,
  RefreshCcw
} from "lucide-react";

/**
 * Interface for principle data structure
 * Ensures type safety and consistent rendering
 */
interface Principle {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
}

interface Pattern {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
}

const Principles = () => {
  /**
   * Core Architectural Principles
   *
   * These principles reflect a journey from enterprise operations through
   * systems engineering to AI architecture, emphasizing:
   * - Business alignment over technical complexity
   * - Integration thinking over isolated solutions
   * - Long-term scalability over quick wins
   */
  const principlesData: Principle[] = [
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Business-First Design",
      description: "Every architectural decision must trace back to a business outcome. Technology serves business goals, not the other way around. Systems succeed when they solve real problems and deliver measurable value.",
      category: "Foundation"
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Clarity Over Complexity",
      description: "Simple, well-documented systems outlive clever ones. Complexity is a liability. The best architecture is the one that can be understood, maintained, and evolved by diverse teams over time.",
      category: "Foundation"
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "AI as Integrated Intelligence",
      description: "AI is not a feature to bolt on. It's an integrated intelligence layer that enhances decision-making, automates workflows, and creates feedback loops that make systems sharper over time.",
      category: "AI & Automation"
    },
    {
      icon: <Workflow className="h-6 w-6 text-primary" />,
      title: "Automation-First Workflow Thinking",
      description: "Manual processes are technical debt. Design systems where automation is the default, not an afterthought. Human intervention should be strategic, not operational.",
      category: "AI & Automation"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Seamless Human-Machine Collaboration",
      description: "The future isn't human OR machine—it's human AND machine working in harmony. Design interfaces and workflows that amplify human expertise with computational precision.",
      category: "AI & Automation"
    },
    {
      icon: <Layers className="h-6 w-6 text-primary" />,
      title: "Cloud as the Skeleton, AI as the Nervous System",
      description: "Cloud infrastructure provides structure and scale. AI provides intelligence and adaptability. Together, they form durable, adaptive systems that respond to change.",
      category: "Systems Integration"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Data Integrity as Foundation",
      description: "Intelligent systems are only as good as their data. Data quality, governance, and lineage are non-negotiable. Bad data creates bad decisions at scale.",
      category: "Systems Integration"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Scalable-by-Default Patterns",
      description: "Design for scale from day one. Systems should handle 10x growth without architectural rewrites. Horizontal scaling, stateless services, and distributed thinking are standard, not premium.",
      category: "Scalability"
    },
    {
      icon: <Eye className="h-6 w-6 text-primary" />,
      title: "Observability as a Feature",
      description: "You can't improve what you can't measure. Observability isn't monitoring—it's understanding system behavior in production. Telemetry, logging, and tracing are first-class features.",
      category: "Operations"
    },
    {
      icon: <RefreshCcw className="h-6 w-6 text-primary" />,
      title: "Adaptability Over Rigidity",
      description: "Requirements change. Markets shift. Systems must evolve without breaking. Design for change: modular architecture, clear interfaces, and tolerance for uncertainty.",
      category: "Foundation"
    }
  ];

  /**
   * Application Examples
   *
   * High-level descriptions demonstrating how principles manifest in real systems
   * (no confidential details, conceptual patterns only)
   */
  const applicationExamples = [
    {
      title: "Multi-Cloud AI Integration",
      description: "Designing systems that treat cloud providers as interchangeable infrastructure layers while maintaining AI model portability and data sovereignty.",
      principles: ["Cloud as the Skeleton", "Scalable-by-Default", "Data Integrity"]
    },
    {
      title: "Enterprise Automation Orchestration",
      description: "Building workflow engines that automate cross-functional business processes while maintaining human oversight at decision points.",
      principles: ["Automation-First Thinking", "Human-Machine Collaboration", "Business-First Design"]
    },
    {
      title: "Intelligent Monitoring Systems",
      description: "Creating observability platforms that don't just collect metrics—they detect anomalies, predict failures, and recommend corrective actions autonomously.",
      principles: ["Observability as Feature", "AI as Integrated Intelligence", "Clarity Over Complexity"]
    }
  ];

  /**
   * Architectural Patterns
   *
   * Preferred patterns that guide implementation decisions
   * Demonstrates senior-level pattern recognition and architectural vocabulary
   */
  const patternsData: Pattern[] = [
    {
      icon: <Network className="h-6 w-6 text-primary" />,
      title: "Event-Driven Architecture",
      description: "Loosely coupled systems that communicate through events. Enables async processing, scalability, and resilience.",
      examples: ["Message queues (SQS, Kafka)", "Event sourcing", "CQRS patterns"]
    },
    {
      icon: <Blocks className="h-6 w-6 text-primary" />,
      title: "Microservices with Clear Boundaries",
      description: "Services organized around business capabilities, not technical layers. Each service owns its data and domain logic.",
      examples: ["Domain-driven design", "API-first development", "Service mesh architectures"]
    },
    {
      icon: <GitBranch className="h-6 w-6 text-primary" />,
      title: "Infrastructure as Code",
      description: "All infrastructure defined in version-controlled code. Reproducible, testable, and auditable deployments.",
      examples: ["Terraform/OpenTofu", "CloudFormation", "GitOps workflows"]
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Serverless-First for Elasticity",
      description: "Default to serverless for variable workloads. Pay for what you use, scale automatically, eliminate server management.",
      examples: ["Lambda/Cloud Functions", "Step Functions", "Serverless containers"]
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Data Pipelines as First-Class Systems",
      description: "Treat data infrastructure with the same rigor as application code. Versioned schemas, data quality checks, lineage tracking.",
      examples: ["ETL/ELT patterns", "Data mesh principles", "Streaming architectures"]
    },
    {
      icon: <BoxSelect className="h-6 w-6 text-primary" />,
      title: "API Gateway as Central Nervous System",
      description: "Centralized API management for authentication, rate limiting, routing, and observability. Single point of control.",
      examples: ["API Gateway patterns", "GraphQL federation", "Backend-for-Frontend"]
    }
  ];

  /**
   * Group principles by category for organized display
   */
  const categories = Array.from(new Set(principlesData.map(p => p.category)));

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Architecture Principles & Systems Thinking
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              How I approach designing AI-powered, cloud-native systems that scale, adapt, and deliver business value
            </p>
          </div>
        </FadeContent>

        {/* My Architecture Philosophy Section */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Architecture Philosophy</h2>
            <Card className="p-8 border-l-4 border-l-primary/60 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  My architectural approach is shaped by a journey from <strong className="text-foreground">enterprise operations</strong> through
                  <strong className="text-foreground"> systems engineering</strong> into <strong className="text-foreground">AI architecture</strong>.
                  I've seen technology succeed and fail. Rarely because of technical sophistication. Almost always because of clarity of purpose.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I believe in <strong className="text-foreground">systems that think</strong>. Not systems that require constant manual intervention,
                  but systems that observe, learn, and adapt. Cloud infrastructure provides the skeleton: scalable, resilient, distributed.
                  AI provides the nervous system—intelligent, responsive, continuously improving.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My role as an architect is to design the space where <strong className="text-foreground">business strategy meets technical execution</strong>.
                  To create systems that are simple enough to understand, robust enough to trust, and flexible enough to evolve.
                  To build for longevity, not just delivery dates.
                </p>
              </CardContent>
            </Card>
          </section>
        </FadeContent>

        {/* Core Principles Section - Grouped by Category */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Principles I Follow</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These aren't generic best practices. They're principles earned from building systems that run in production.
              </p>
            </div>

            {categories.map((category, catIndex) => (
              <div key={category} className="mb-12">
                <div className="flex items-center mb-6">
                  <Badge className="text-sm px-4 py-1">{category}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {principlesData
                    .filter(p => p.category === category)
                    .map((principle, index) => (
                      <Card
                        key={index}
                        className="group p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 cursor-default"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            {principle.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                              {principle.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {principle.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </section>
        </FadeContent>

        {/* How I Apply These Principles Section */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How I Apply These Principles</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conceptual examples of how principles shape architectural decisions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {applicationExamples.map((example, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl mb-2">{example.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {example.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-wrap gap-2">
                      {example.principles.map((principle, pIndex) => (
                        <Badge key={pIndex} variant="outline" className="text-xs">
                          {principle}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </FadeContent>

        {/* Architecture Patterns Section */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Architecture Patterns That Guide My Work</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Proven patterns for cloud, AI integration, automation, and data flow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {patternsData.map((pattern, index) => (
                <Card
                  key={index}
                  className="p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-l-primary/20 hover:border-l-primary/60"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {pattern.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{pattern.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {pattern.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Examples:</p>
                    <ul className="space-y-1">
                      {pattern.examples.map((example, eIndex) => (
                        <li key={eIndex} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </FadeContent>

        {/* My Evolving Architectural Lens Section */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Evolving Architectural Lens</h2>
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Architecture is not a destination. It's a discipline of continuous learning. Every system I design teaches me something new.
                  Every failure reveals a blind spot. Every success validates a hypothesis.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I'm constantly evolving my understanding of how AI systems should integrate with business processes,
                  how to balance innovation with stability, and how to design for unknowns.
                  The best architects aren't those who have all the answers. They're the ones who ask better questions.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As AI capabilities expand, as cloud platforms mature, and as automation becomes table stakes,
                  my lens sharpens. I'm not building for today's requirements. I'm building systems that can adapt to tomorrow's unknowns.
                </p>
                <div className="mt-8 pt-6 border-t border-primary/20">
                  <p className="text-base text-muted-foreground italic">
                    "The measure of architectural maturity is not the complexity you can create,
                    but the simplicity you can preserve while solving complex problems."
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </FadeContent>

        {/* CTA Section */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <section className="text-center py-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Interested in discussing architecture philosophy?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              If you think about systems the same way, let's talk — architecture, AI integration, or where the two meet.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </section>
        </FadeContent>

      </div>
    </div>
  );
};

export default Principles;
