import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Briefcase } from "lucide-react";

const About = () => {
  const experience = [
    {
      title: "UI/UX Designer & Systems Developer",
      company: "SPS Software",
      period: "2025 - Present",
      location: "GP, Remote",
      description: "I engineered intelligent AI workflows and streamlined the development of scalable web applications using React, Node.js, and cloud technologies, delivering business value through system automations.",
    },
    {
      title: "Systems Administrator Skills Program",
      company: "Afrikka Tikkun Services",
      period: "2024",
      location: "Randburg, GP",
      description: "I developed and built cruicial proficiency in cloud, project management and systems administration, strengthening my capability to contribute to scalable enterprise-grade cloud projects.",
    },
    {
      title: "Client Services Representative",
      company: "First National Bank",
      period: "2019 - 2023",
      location: "Johannesburg, GP",
      description: "I leveraged ~9700 hours of direct client support to build deep operational expertise in banking workflows, which led to the proactive identification of recurring customer pain points suitable for AI-driven automation.",
    },
    {
      title: "Junior JAVA Developer Intern",
      company: "First National Bank",
      period: "2018 - 2019",
      location: "Randburg, GP",
      description: "I contributed production-ready code in an agile DevOps environment, gaining hands-on exposure to full-stack development principles and enhancing my proficiency in Java, Git and Atlassian toolsets.",
    },
  ];

  const education = [
    {
      degree: "Systems Admin Skills Training",
      institution: "Digital Youth ICT Academy",
      period: "2024",
      description: "This program provided a strong foundation in systems administration, which directly contributed to securing my Microsoft Azure Fundamentals and IBM Project Management Foundations certifications among others, and building crucial cloud and system deployment skills",
    },
    {
      degree: "Higher Certificate, Information Technology: Systems Development",
      institution: "CTU Training Solutions",
      period: "2018 - 2019",
      description: "I earned my Higher Certificate in Information Technology specializing in Systems Development with distinctions, solidifying my foundational development skills through an intensive JAVA Programming Bootcamp",
    },
    {
      degree: "Bachelor of Science (BSc), Information Technology",
      institution: "Richfield Graduate Institute of Technology",
      period: "2017",
      description: "I successfully completed the first year of my Bachelor of Science in Information Technology with distinctions, confirming a strong academic aptitude for complex IT concepts and foundational systems knowledge.",
    },
    {
      degree: "National Senior Certificate (Matric)",
      institution: "Florida Park High School",
      period: "2016",
      description: "I achieved the National Senior Certificate with a Bachelors pass and two distinctions, successfully launching my academic career with a strong performance and proving capacity for high academic achievement.",
    },
  ];

  const interests = [
    "Open Source Contributing",
    "Machine Learning",
    "Cloud Architecture",
    "Tech Research",
    "DevOps & Automation",
    "Exercise & Fitness",
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate systems developer with a love for creating scalable, innovative solutions and leveraging AI to push the boundaries of resilient, cloud-native architecture.
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

        {/* Experience */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Briefcase className="mr-3 h-8 w-8 text-primary" />
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-primary font-medium">{job.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {job.period}
                    </div>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin className="mr-2 h-4 w-4" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{job.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <GraduationCap className="mr-3 h-8 w-8 text-primary" />
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-primary font-medium">{edu.institution}</p>
                  </div>
                  <div className="flex items-center text-muted-foreground mt-2 md:mt-0">
                    <Calendar className="mr-2 h-4 w-4" />
                    {edu.period}
                  </div>
                </div>
                <p className="text-muted-foreground">{edu.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Interests & Hobbies</h2>
          <Card className="p-8">
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => (
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
              When I'm not coding, you can find me researching and exploring new technologies, contributing to open source projects,
              or simply working out and keeping fit, optimizing my biological operating system for peak performance.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;