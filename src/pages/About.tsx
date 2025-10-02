import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Briefcase, ChevronRight } from "lucide-react";
import ExperienceDetailModal from "@/components/ExperienceDetailModal"; // Import the new component

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


const About = () => {
  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<DetailData | null>(null);

  // Function to open the modal
  const openModal = (data: DetailData) => {
    // Transform data to a consistent shape expected by the modal, adding 'duration' if missing
    const detailData = {
        ...data,
        subtitle: data.type === 'experience' ? data.company : data.institution,
    };
    setSelectedDetail(detailData as any);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetail(null);
  };
  
  // --- UPDATED DATA WITH DETAILED SECTIONS ---
  
  const experience: ExperienceItem[] = [
    {
      id: "exp-sps",
      type: 'experience',
      title: "UI/UX Designer & Systems Developer",
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

	        {/* Personal Story */}
        <div className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">My Journey</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I discovered my passion for technology in high school, which led me to pursue a career in IT and software development. 
                Over the years, I've built expertise across cloud computing, AI, cybersecurity, and full-stack development, 
                always with a focus on creating solutions that drive real impact.
              </p>
              <p>
                Throughout my career, I've had the opportunity to work with diverse teams and technologies, from startups 
                to established companies. Each experience has shaped my approach to development, emphasizing clean code, 
                user-centric design, and continuous learning.
              </p>
              <p>
                I thrive at the intersection of innovation and execution, blending technical skill with user-centric design 
                and strategic problem-solving. 
                Today, I build scalable, future-ready systems and am constantly exploring emerging technologies to shape 
                the next wave of digital solutions.
              </p>
            </div>
          </Card>
        </div>

          {/* Professional Experience */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
                <Briefcase className="h-7 w-7 mr-3 text-primary" />
                Professional Experience
            </h2>
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

          {/* Education */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
                <GraduationCap className="h-7 w-7 mr-3 text-primary" />
                Education & Qualifications
            </h2>
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

          {/* Interests */}
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
    </>
  );
};

export default About;
