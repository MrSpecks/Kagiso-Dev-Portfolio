import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Briefcase } from "lucide-react";

const About = () => {
  const experience = [
    {
      title: "Senior Full-Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2023 - Present",
      location: "Remote",
      description: "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
    },
    {
      title: "Full-Stack Developer",
      company: "Digital Solutions Co.",
      period: "2021 - 2023",
      location: "San Francisco, CA",
      description: "Developed and maintained multiple client projects using modern web technologies.",
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      period: "2020 - 2021",
      location: "Austin, TX",
      description: "Built responsive user interfaces and improved application performance.",
    },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      period: "2016 - 2020",
      description: "Focused on software engineering and web development",
    },
  ];

  const interests = [
    "Open Source Contributing",
    "Machine Learning",
    "Cloud Architecture",
    "Mobile Development",
    "DevOps & Automation",
    "Tech Blogging",
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate developer with a love for creating innovative solutions and pushing the boundaries of web technology.
          </p>
        </div>

        {/* Personal Story */}
        <div className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">My Journey</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I started my journey in software development during college, where I discovered my passion for creating 
                digital solutions that make a real impact. What began as curiosity about how websites work evolved into 
                a career dedicated to building exceptional user experiences.
              </p>
              <p>
                Throughout my career, I've had the opportunity to work with diverse teams and technologies, from startups 
                to established companies. Each experience has shaped my approach to development, emphasizing clean code, 
                user-centric design, and continuous learning.
              </p>
              <p>
                Today, I specialize in full-stack development with a focus on React, Node.js, and cloud technologies. 
                I believe in the power of technology to solve complex problems and am always excited to take on new challenges.
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
              When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
              or sharing knowledge through tech blogs and community meetups.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;