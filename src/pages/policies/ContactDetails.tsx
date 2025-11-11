import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Linkedin, Github, Globe, Award } from "lucide-react";

const ContactDetails = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Contact Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Contact Details</h1>
        </div>

        <p className="text-muted-foreground text-lg mb-8">
          Get in touch for professional services, project inquiries, or general questions about AI development,
          automation solutions, and technology consulting.
        </p>

        {/* Contact Content */}
        <div className="space-y-8">
          {/* Primary Contact Information */}
          <section className="bg-muted/30 p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-6">Primary Contact</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Email Address</h3>
                  <p className="text-muted-foreground mb-2">
                    Primary contact method for all inquiries:
                  </p>
                  <a
                    href="mailto:kagisomfusi@outlook.com"
                    className="text-primary hover:underline text-lg font-medium"
                  >
                    kagisomfusi@outlook.com
                  </a>
                  <p className="text-muted-foreground text-sm mt-2">
                    Response time: Typically within 24-48 hours during business days
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Phone Number</h3>
                  <p className="text-muted-foreground mb-2">
                    For urgent matters or scheduled consultations:
                  </p>
                  <a
                    href="tel:+27696287623"
                    className="text-primary hover:underline text-lg font-medium"
                  >
                    +27 69 628 7623
                  </a>
                  <p className="text-muted-foreground text-sm mt-2">
                    Please email first to schedule a call for best response times
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground mb-2">
                    Based in South Africa
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Services provided remotely to clients worldwide
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Business Hours */}
          <section className="bg-muted/30 p-8 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Business Hours</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-foreground mb-2">Standard Hours (SAST)</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday - Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">Response Expectations</p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Email inquiries: 24-48 hours</li>
                    <li>• Project updates: Within agreed timelines</li>
                    <li>• Emergency support: Per maintenance agreement</li>
                    <li>• Consultations: By scheduled appointment</li>
                  </ul>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> For urgent project-related matters, active clients
                  may receive expedited responses. Emergency support outside business hours is available for clients
                  with active maintenance contracts.
                </p>
              </div>
            </div>
          </section>

          {/* Professional Networks */}
          <section className="bg-muted/30 p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-6">Professional Networks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://www.linkedin.co/in/kagiso-m-95b329224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-border"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Linkedin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">LinkedIn</h3>
                  <p className="text-muted-foreground text-sm">
                    Professional profile and network
                  </p>
                </div>
              </a>

              <a
                href="https://github.com/MrSpecks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-border"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">GitHub</h3>
                  <p className="text-muted-foreground text-sm">
                    Code repositories and projects
                  </p>
                </div>
              </a>

              <a
                href="https://simplykae.link/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-border"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Personal Links</h3>
                  <p className="text-muted-foreground text-sm">
                    Additional professional profiles
                  </p>
                </div>
              </a>

              <a
                href="https://www.credly.com/users/kagiso-mfusi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-border"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Credly</h3>
                  <p className="text-muted-foreground text-sm">
                    Certifications and digital badges
                  </p>
                </div>
              </a>
            </div>
          </section>

          {/* Preferred Communication Methods */}
          <section className="bg-muted/30 p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-6">Preferred Communication Methods</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email (Primary)</h3>
                  <p className="text-muted-foreground text-sm">
                    Best for initial inquiries, detailed project discussions, document sharing, and formal communications.
                    Allows for thoughtful responses and keeps a written record.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Scheduled Phone/Video Calls</h3>
                  <p className="text-muted-foreground text-sm">
                    For in-depth consultations, project kickoffs, and complex technical discussions. Please schedule
                    via email for optimal preparation and time management.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Project Management Tools</h3>
                  <p className="text-muted-foreground text-sm">
                    For active projects, collaboration via agreed project management platforms (e.g., Trello, Asana,
                    GitHub) for task tracking and progress updates.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What to Include in Your Inquiry */}
          <section className="bg-muted/30 p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-6">What to Include in Your Inquiry</h2>
            <p className="text-muted-foreground mb-4">
              To help us provide the most accurate and helpful response, please include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Your name and company (if applicable)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Type of service needed</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Brief project description</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Desired timeline or urgency</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Budget range (if determined)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Specific technical requirements</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Any relevant background information</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Preferred contact method</p>
                </div>
              </div>
            </div>
          </section>

          {/* Services Overview */}
          <section className="bg-muted/30 p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-6">Services Available</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">Development</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Web Development</li>
                  <li>• AI Systems</li>
                  <li>• Automation</li>
                </ul>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">Consulting</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AI Strategy</li>
                  <li>• Tech Architecture</li>
                  <li>• Process Optimization</li>
                </ul>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">Design</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• UI/UX Design</li>
                  <li>• System Design</li>
                  <li>• Cloud Architecture</li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/projects"
                className="inline-flex items-center text-primary hover:underline text-sm"
              >
                View Portfolio & Case Studies →
              </Link>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="bg-primary/10 border border-primary/20 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Emergency Support</h2>
            <p className="text-muted-foreground mb-4">
              For clients with active maintenance or support agreements:
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Critical production issues may receive after-hours support</li>
              <li>• Emergency contact procedures outlined in your service agreement</li>
              <li>• Response time based on severity level (Critical, High, Medium, Low)</li>
              <li>• Emergency support availability depends on maintenance contract terms</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              <strong className="text-foreground">Note:</strong> Emergency support is not available for new inquiries
              or clients without active maintenance agreements. For urgent new projects, please email with "URGENT"
              in the subject line.
            </p>
          </section>

          {/* Privacy Notice */}
          <section className="bg-muted/30 p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-3">Privacy & Data Protection</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All communications and information shared will be handled in accordance with our{' '}
              <Link to="/policies/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{' '}
              and South Africa's Protection of Personal Information Act (POPIA). We respect your privacy and will
              never share your information with third parties without consent.
            </p>
          </section>

          {/* Quick Links */}
          <section className="bg-muted/30 p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Important Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                to="/policies/terms"
                className="text-sm text-primary hover:underline"
              >
                → Terms of Service
              </Link>
              <Link
                to="/policies/privacy"
                className="text-sm text-primary hover:underline"
              >
                → Privacy Policy
              </Link>
              <Link
                to="/policies/refund"
                className="text-sm text-primary hover:underline"
              >
                → Refund Policy
              </Link>
              <Link
                to="/policies/cancellation"
                className="text-sm text-primary hover:underline"
              >
                → Cancellation Policy
              </Link>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg border border-primary/20 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Whether you're looking to build an AI-powered application, automate business processes, or develop a
              custom web solution, let's discuss how we can help achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:kagisomfusi@outlook.com?subject=Project%20Inquiry"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Mail className="h-5 w-5 mr-2" />
                Send an Email
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
              >
                Contact Form
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
