import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Briefcase, ChevronRight, BookOpen } from "lucide-react";
import ExperienceDetailModal from "@/components/ExperienceDetailModal"; // Import the new component
import CertificationModal from "@/components/CertificationModal"; // Import the certification modal
import FadeContent from "@/components/FadeContent"; // Import the FadeContent component
import { Tables } from "@/integrations/supabase/types";

// Define data interfaces for type safety
interface ExperienceItem {
    id: string;
    type: 'experience';
    title: string;
    company: string;
    period: string;
    location: string;
    description: string; // Short description for the list view
    responsibilities: string[]; // Detailed list for the modal
    impact: string[]; // Detailed impact for the modal
    technicalSkills: string[];
}

interface EducationItem {
    id: string;
    type: 'education';
    title: string; // Qualification Title
    institution: string;
    period: string;
    location: string;
    description: string; // Short description for the list view
    responsibilities: string[]; // Detailed list of modules/activities
    impact: string[]; // Academic/personal impact for the modal
    academicProgression: string[];
}

type DetailData = ExperienceItem | EducationItem;
type Certification = Tables<"certifications">;

const About = () => {
  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<(DetailData & { subtitle: string; logo: string }) | null>(null);

  // State for certification modal
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Fetch certifications
  const { data: certifications = [] } = useQuery({
    queryKey: ["certifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("date_earned", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Function to open the modal
  const openModal = (data: DetailData) => {
    // Transform data to a consistent shape expected by the modal, adding 'duration' if missing
    const detailData = {
        ...data,
        subtitle: data.type === 'experience' ? (data as ExperienceItem).company : (data as EducationItem).institution,
        logo: '', // Placeholder for logo
    } as DetailData & { subtitle: string; logo: string };
    setSelectedDetail(detailData);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetail(null);
  };

  // Function to open certification modal
  const openCertModal = (provider: string) => {
    setSelectedProvider(provider);
    setIsCertModalOpen(true);
  };

  // Function to close certification modal
  const closeCertModal = () => {
    setIsCertModalOpen(false);
    setSelectedProvider(null);
  };

  // Get unique providers and their certification counts
  const providerData = certifications.reduce(
    (acc, cert) => {
      const provider = cert.provider;
      if (!acc[provider]) {
        acc[provider] = [];
      }
      acc[provider].push(cert);
      return acc;
    },
    {} as Record<string, Certification[]>
  );

  // Get unique provider names sorted by count
  const providers = Object.keys(providerData).sort(
    (a, b) => providerData[b].length - providerData[a].length
  );
  
  // --- UPDATED DATA WITH DETAILED SECTIONS ---
  
  const experience: ExperienceItem[] = [
    {
      id: "exp-sps",
      type: 'experience',
      title: "Full-Stack & AI Systems Engineer",
      company: "SPS Software",
      period: "2025 - Present",
      location: "GP, Remote",
      description: "I engineered intelligent AI workflows and streamlined the development of scalable web applications using React, Node.js, and cloud technologies, delivering business value through system automations.",
      responsibilities: [
        "Design and prototype user interfaces (UI) and user experiences (UX) for new features and products using Figma.",
        "Develop and deploy scalable full-stack web applications using React, Next.js, and Node.js.",
        "Integrate AI models and build automated workflows to streamline internal business processes.",
        "Collaborate with stakeholders to translate business requirements into technical solutions.",
      ],
      impact: [
        "Led the design of the main platform UI, resulting in a 25% increase in user engagement metrics.",
        "Implemented a serverless data processing pipeline that reduced manual reporting time by 40 hours per month.",
        "Gained advanced proficiency in cloud deployment, CI/CD practices, LLM engineering, and microservice architecture.",
      ],
      technicalSkills: ["React", "Next.js", "Node.js", "Figma", "Tailwind CSS", "Serverless Functions", "Cloud APIs"],
    },
    {
      id: "exp-ats",
      type: 'experience',
      title: "Systems Administrator Skills Program",
      company: "Afrika Tikkun Services",
      period: "2024",
      location: "Randburg, GP",
      description: "I developed and built crucial proficiency in cloud, project management and systems administration, which directly contributed to securing my Microsoft Azure Fundamentals and IBM Project Management Foundations certifications among others, strengthening my capability to contribute to scalable enterprise-grade cloud projects.",
      responsibilities: [
        "Completed intensive training focused on cloud migration, resource administration, identity and access management, governance and cost optimization.",
        "Participated in simulated enterprise projects, applying Agile methodologies to mock on-prem to cloud migration projects.",
        "Gained hands-on experience with virtualization technologies and cloud infrastructure and migration fundamentals.",
      ],
      impact: [
        "Established a strong foundational understanding of IT infrastructure, bridging the gap between development and operations (DevOps).",
        "Achieved certifications in fundamental systems administration concepts.",
        "Significantly enhanced troubleshooting and problem-solving skills in complex environments.",
      ],
      technicalSkills: ["Azure Fundamentals", "Cloud Migration", "Virtualization", "IAM", "Project Management"],
    },
    {
      id: "exp-fnbcsr",
      type: 'experience',
      title: "Client Services Representative",
      company: "First National Bank - FNB",
      period: "2019 - 2023",
      location: "Johannesburg, GP",
      description: "I leveraged ~9700 hours of direct client support to build deep operational expertise in banking workflows, which led to the proactive identification of recurring customer pain points suitable for AI-driven automation.",
      responsibilities: [
        "Provided frontline customer support, resolving complex banking queries and technical issues.",
        "Managed a high volume of daily interactions while maintaining a 95%+ customer satisfaction rating.",
        "Identified systemic issues in banking processes and documented recurring customer needs.",
      ],
      impact: [
        "Developed unparalleled empathy and understanding of end-user needs, now applied directly to UI/UX design and stakeholder engagement.",
        "Operational expertise provided context for future automation projects, highlighting key areas for cost and time savings.",
        "Improved communication and crisis management skills crucial for team leadership.",
      ],
      technicalSkills: ["CRM Software", "Banking Systems", "Operational Analysis", "Soft Skills"],
    },
    {
      id: "exp-fnbint",
      type: 'experience',
      title: "Junior JAVA Developer Intern",
      company: "First National Bank - FNB",
      period: "2018 - 2019",
      location: "Randburg, GP",
      description: "Gained foundational experience in enterprise software development, focusing on backend systems and secure coding practices within the financial technology sector.",
      responsibilities: [ // CORRECTED: Removed duplicate 'respons'
        "Assisted senior developers in maintaining and debugging legacy JAVA enterprise applications.",
        "Wrote unit tests and integration tests for new feature deployments.",
        "Participated in daily standups and adhered to Agile software development methodologies.",
      ],
      impact: [
        "Solidified core programming principles and object-oriented design concepts.",
        "Learned the importance of code quality, version control, and secure development practices in a regulated industry.",
        "Gained exposure to the full SDLC in a large corporate environment.",
      ],
      technicalSkills: ["JAVA", "Spring Framework", "SQL", "Git", "Jira", "Bitbucket"],
    },
  ];

  const education: EducationItem[] = [
    {
      id: "edu-dyict",
      type: 'education',
      title: "Systems Administration Skills Program",
      institution: "Digital Youth ICT Academy",
      period: "2024",
      location: "Johannesburg, GP",
      description: "I developed and built crucial proficiency in cloud, project management and systems administration, which directly contributed to securing my Microsoft Azure Fundamentals and IBM Project Management Foundations certifications among others, strengthening my capability to contribute to scalable enterprise-grade cloud projects.",
      responsibilities: [
        "Completed intensive training focused on cloud migration, resource administration, identity and access management, governance and cost optimization.",
        "Participated in simulated enterprise projects, applying Agile methodologies to mock on-prem to cloud migration projects.",
        "Gained hands-on experience with virtualization technologies and cloud infrastructure and migration fundamentals.",
      ],
      impact: [
        "Established a strong foundational understanding of IT infrastructure, bridging the gap between development and operations (DevOps).",
        "Achieved certifications in fundamental systems administration concepts.",
        "Significantly enhanced troubleshooting and problem-solving skills in complex environments.",
      ],
      academicProgression: ["Azure Fundamentals", "Cloud Migration", "Virtualization", "IAM", "Project Management"],
    },
    {
      id: "edu-ctu",
      type: 'education',
      title: "National Certificate: Information Technology: Systems Development",
      institution: "CTU Training Solutions",
      period: "2018 - 2019",
      location: "Johannesburg, GP",
      description: "I earned my Higher Certificate in Information Technology specializing in Systems Development with distinctions, solidifying my foundational development skills through an intensive work-integrated-learning JAVA Programming Bootcamp",
      responsibilities: [
        "Mastered fundamental programming concepts and logic with a focus on JAVA development.",
        "Gained hands-on proficiency in Internet Programming, focusing on web-based application development and related technologies.",
        "Developed essential professional and business skills through the Soft Skills module.",
        "Successfully applied knowledge across all core modules to achieve Competent status for the Systems Development qualification.",
      ],
      impact: [
        "Earned a MICT Seta accredited qualification.",
        "Solidified foundational programming skills with exceptional results in all core programming modules (89% in Programming, 93% in Internet Programming, and 86% in Internet Programming).",
        "Developed essential soft skills, achieving an 89% final mark in the Soft Skills module.",
      ],
      academicProgression: ["Programming", "Internet Programming", "Soft Skills", "Systems Development"],
    },
    {
      id: "edu-richfield",
      type: 'education',
      title: "Bachelor of Science in Information Technology (BSc)",
      institution: "Richfield Graduate Institute of Technology",
      period: "2017 - 2018",
      location: "Johannesburg, GP",
      description: "I successfully completed the first year of my Bachelor of Science in Information Technology with distinctions, confirming a strong academic aptitude for complex IT concepts and foundational systems knowledge.",
      responsibilities: [
        "Built a strong foundational IT knowledge base in Networking and Operating Systems.",
        "Focused on core development concepts, including VB.NET Programming and Object-Oriented Programming principles.",
        "Gained hands-on exposure to fundamental Database concepts, Cybersecurity, and ethical practices in IT.",
        "Developed essential professional skills in IT Project Management and sharpened problem-solving, analytical, and critical thinking skills.",
      ],
      impact: [
        "Established a robust academic foundation in core IT disciplines, passing all modules for the 2017 academic year.",
        "Demonstrated a strong aptitude for networking and web technologies by achieving a distinction in both modules.",
      ],
      academicProgression: ["Information Systems", "Mathematics", "Networks", "Programming", "Web Technology"],
    },
    {
      id: "edu-fphs",
      type: 'education',
      title: "National Senior Certificate - Matric",
      institution: "Florida Park High School",
      period: "2016",
      location: "Johannesburg, GP",
      description: "Achieved the required academic foundation for university entrance, focusing on Mathematics, Business Studies, and Computer Application Technology (CAT).",
      responsibilities: [
        "Achieved distinction in Business Studies and Life Orientation, and strong results in Accounting and Computer Application Technology.",
        "Participated in various extracurricular activities, building teamwork and leadership skills.",
      ],
      impact: [
        "Provided the necessary technical and mathematical literacy to pursue a career in technology.",
        "Built early interest in programming and logic through high school CAT courses.",
      ],
      academicProgression: ["Computer Application Technology", "Business Studies", "Mathematics", "Accounting", "Life Orientation"],
    },
  ];

  const interests = [
    "AI/Machine Learning",
    "Serverless Architecture",
    "Open Source Contributions",
    "Cloud Computing (Oracle/Azure/GCP)",
    "Fitness & Weightlifting",
    "UI/UX and Graphic Design Trends",
  ];

  return (
    <>
      <div className={`min-h-screen pt-20 pb-16 transition-filter duration-300 ${isModalOpen ? 'filter blur-sm' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold mb-4">About Me</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A brief overview of my professional journey, academic background, and technical passion.
            </p>
          </div>

	        {/* Personal Story - ENHANCED */}
<FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
<section className="mb-20">
  {/* Section Header */}
  <div className="mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey</h2>
    <p className="text-lg text-muted-foreground max-w-3xl">
      From customer-centric operations to architecting intelligent systems. How I learned to build technology that solves real business problems.
    </p>
  </div>

  {/* Timeline Container */}
  <div className="space-y-8">
    
    {/* Phase 1: The Foundation */}
    <Card className="p-8 border-l-4 border-l-primary/60 hover:shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Timeline Badge */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-primary mb-2">2019 — 2023</span>
          <span className="text-xs text-muted-foreground">4 Years, 9,700+ Hours</span>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <h3 className="text-xl font-bold mb-3">The Foundation: Enterprise Operations</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            At FNB, I spent nearly a decade's worth of hours (9,700+ to be precise) in frontline customer service—resolving complex banking queries in high-pressure environments, maintaining 95%+ satisfaction ratings, and identifying systemic inefficiencies across operations.
          </p>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            This wasn't just customer service. It was a deep immersion into how enterprises actually work: the workflows, pain points, bottlenecks, and unspoken needs that drive real business problems. I learned to see technology through the eyes of the people who use it.
          </p>
          
          {/* Key Insights as Badges/Highlights */}
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">→</span>
              <span className="text-xs text-muted-foreground">Empathy for end-user needs</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">→</span>
              <span className="text-xs text-muted-foreground">Systems thinking at scale</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">→</span>
              <span className="text-xs text-muted-foreground">Identifying automation opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </Card>

    {/* Phase 2: The Pivot */}
    <Card className="p-8 border-l-4 border-l-primary/60 hover:shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Timeline Badge */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-primary mb-2">2023 — 2024</span>
          <span className="text-xs text-muted-foreground">Technical Transition</span>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <h3 className="text-xl font-bold mb-3">The Pivot: From Operations to Architecture</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            When I moved into full-stack development and cloud engineering, I made a deliberate choice: <span className="font-semibold text-foreground">I wouldn't just learn technology, I'd apply it to solve real problems.</span>
          </p>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            I realized most engineers approach cloud and AI as separate disciplines. I saw them differently: as interconnected pieces of a larger architecture. What if I could design systems where cloud infrastructure + AI logic + intelligent automation worked together to eliminate the manual bottlenecks I'd spent years watching?
          </p>
          
          {/* Key Insights */}
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">→</span>
              <span className="text-xs text-muted-foreground">Multicloud architecture design</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">→</span>
              <span className="text-xs text-muted-foreground">LLM integration & automation</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">→</span>
              <span className="text-xs text-muted-foreground">End-to-end systems thinking</span>
            </div>
          </div>
        </div>
      </div>
    </Card>

    {/* Phase 3: The Execution */}
    <Card className="p-8 border-l-4 border-l-primary/60 hover:shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Timeline Badge */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-primary mb-2">2024 — Today</span>
          <span className="text-xs text-muted-foreground">Proven Impact</span>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <h3 className="text-xl font-bold mb-3">The Execution: Building Systems That Scale</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Today, I architect AI automation systems that eliminate the manual work I'd witnessed drain resources. Every project is grounded in that operational context: What problem are we solving? What's the business impact? How do we make this maintainable at scale?
          </p>
          
          {/* Impact Examples */}
          <div className="bg-muted/40 rounded-lg p-6 mb-4 border border-border/40">
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Real-World Impact</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">85%</span>
                <p className="text-sm text-muted-foreground">Reduced document analysis time—turning 2-hour manual reviews into 7-minute automated workflows</p>
              </div>
		    <div className="flex items-start gap-3">
		      <span className="text-primary font-bold text-lg">Production-Grade</span>
		      <p className="text-sm text-muted-foreground">Enterprise security, multi-tenancy, audit logging, payment integration with immediate monetization capability</p>
		    </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">95%+</span>
                <p className="text-sm text-muted-foreground">Entity extraction accuracy and risk analysis across invoices, contracts, CVs, and company profiles</p>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">→</span>
              <span className="text-xs text-muted-foreground">Business-first architecture</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">→</span>
              <span className="text-xs text-muted-foreground">Measurable ROI per project</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">→</span>
              <span className="text-xs text-muted-foreground">Production-ready systems</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>

  {/* Closing Statement */}
  <div className="mt-12 pt-8 border-t border-border/40">
    <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
      <span className="font-semibold text-foreground">I don't architect systems in isolation. Every decision from data pipelines, cloud strategy to user experience is informed by real operational context. I've spent enough time in the trenches to know what actually works. That's where I build from.</span> 
    </p>
  </div>
</section>
</FadeContent>

          {/* Professional Experience */}
          <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
                <Briefcase className="h-7 w-7 mr-3 text-primary" />
                Professional Experience
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
             From hands-on experience across full-stack development, cloud architecture, and AI systems engineering to in-depth client service excellence. Click on any position to explore responsibilities, impact, and technical growth achieved in each role.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experience.map((exp) => (
                <Card 
                  key={exp.id} 
                  className="p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:border-primary/50 cursor-pointer group"
                  onClick={() => openModal(exp)} // CLICK HANDLER ADDED HERE
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="flex items-center text-muted-foreground text-sm mb-3">
                    <Calendar className="mr-2 h-4 w-4 shrink-0" />
                    {exp.period}
                    <span className="mx-2">•</span>
                    <MapPin className="mr-2 h-4 w-4 shrink-0" />
                    {exp.location}
                  </div>
                  <p className="text-muted-foreground line-clamp-2">{exp.description}</p>
                  <p className="text-sm text-primary/70 mt-3 font-medium">Click for details</p>
                </Card>
              ))}
            </div>
          </div>
          </FadeContent>

          {/* Education */}
          <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
                <GraduationCap className="h-7 w-7 mr-3 text-primary" />
                Education & Qualifications
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              From foundational IT training to advanced systems development certifications. A commitment to structured learning that has built the technical foundation for my career. Click on any qualification to explore the modules, achievements, and academic progression.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {education.map((edu) => (
                <Card 
                  key={edu.id} 
                  className="p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:border-primary/50 cursor-pointer group"
                  onClick={() => openModal(edu)} // CLICK HANDLER ADDED HERE
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{edu.title}</h3>
                      <p className="text-primary font-medium">{edu.institution}</p>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm mb-3">
                    <Calendar className="mr-2 h-4 w-4 shrink-0" />
                    {edu.period}
                    <span className="mx-2">•</span>
                    <MapPin className="mr-2 h-4 w-4 shrink-0" />
                    {edu.location}
                  </div>
                  <p className="text-muted-foreground line-clamp-2">{edu.description}</p>
                  <p className="text-sm text-primary/70 mt-3 font-medium">Click for details</p>
                </Card>
              ))}
            </div>
          </div>
          </FadeContent>

          {/* Online Learning */}
          {providers.length > 0 && (
            <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <BookOpen className="h-7 w-7 mr-3 text-primary" />
                  Online Learning
              </h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                Continuous learning through industry-leading platforms and providers. Click on any provider to explore the certifications and courses completed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                  <Card
                    key={provider}
                    className="p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 cursor-pointer group"
                    onClick={() => openCertModal(provider)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{provider}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {providerData[provider].length} {providerData[provider].length === 1 ? "certification" : "certifications"}
                        </p>
                      </div>
                      <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {providerData[provider].slice(0, 3).map((cert) => (
                          <Badge key={cert.id} variant="secondary" className="text-xs">
                            {cert.title}
                          </Badge>
                        ))}
                        {providerData[provider].length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                            +{providerData[provider].length - 3} more
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-primary/70 font-medium">Click to view all</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            </FadeContent>
          )}

          {/* Interests */}
          <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <div>
            <h2 className="text-3xl font-bold mb-8">Interests & Hobbies</h2>
            <Card className="p-8">
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground mt-6">
                When I'm not coding or finding bugs, you can find me researching and exploring new technologies, contributing to open source projects,
                or simply working out and keeping fit, optimizing my biological operating system for peak performance.
              </p>
            </Card>
          </div>
          </FadeContent>
        </div>
      </div>
      
      
      {/* Detail Modal Component */}
      {isModalOpen && selectedDetail && (
        <ExperienceDetailModal
          data={selectedDetail}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

      {/* Certification Modal Component */}
      {selectedProvider && (
        <CertificationModal
          isOpen={isCertModalOpen}
          onClose={closeCertModal}
          certifications={providerData[selectedProvider] || []}
          provider={selectedProvider}
        />
      )}
    </>
  );
};

export default About;
