import { useState } from "react";
// Removed useEffect, useForm, and ValidationError imports
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; 
import FadeContent from "@/components/FadeContent";

const Contact = () => {
  // Define the Formspree endpoint URL directly
  const FORM_ENDPOINT = "https://formspree.io/f/xldpnryl"; 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // Local state is used again to manage the submission status
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send the data to the Formspree endpoint using the standard Fetch API
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        // 2. Success feedback and form reset
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // 3. Handle errors reported by Formspree (e.g., rate limit, required field)
        const data = await response.json();
        const errorMessage = data.error || "An unknown error occurred on submission.";
        toast({
          title: "Submission failed",
          description: `Error: ${errorMessage}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      // 4. Handle network/connection errors
      console.error("Submission Error:", error);
      toast({
        title: "Submission failed",
        description: "Could not connect to the server. Please check your network.",
        variant: "destructive",
      });
    } finally {
      // 5. Always stop loading state
      setIsSubmitting(false);
    }
  };
  
  // --- Contact Info and Social Links remain unchanged ---

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "kagisomfusi@outlook.com",
      href: "mailto:kagisomfusi@outlook.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+27 (075) 130-4807",
      href: "tel:+270751304807",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Johannesburg, GP",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/MrSpecks",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.co/in/kagiso-m-95b329224",
    },
  ];
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's discuss how we can work together.
          </p>
        </div>

        {/* Contact Form and Contact Info */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            {/* The form uses the custom handleSubmit with fetch logic */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                  {/* Removed Formspree ValidationError component */}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                  {/* Removed Formspree ValidationError component */}
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="mt-2"
                />
                {/* Removed Formspree ValidationError component */}
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting} // Use local state
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      {item.href !== "#" ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Follow Me</h2>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-colors"
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-primary/5 border-primary/20">
              <h2 className="text-xl font-bold mb-4">Quick Response</h2>
              <p className="text-muted-foreground">
                I typically respond to messages within 24 hours. For urgent matters, 
                feel free to reach out via phone or LinkedIn.
              </p>
            </Card>
          </div>
        </div>
        </FadeContent>
      </div>
    </div>
  );
};

export default Contact;
