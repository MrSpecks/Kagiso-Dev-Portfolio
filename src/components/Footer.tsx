import { Github, Linkedin, Mail, Zap, Award, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AboutModal } from "./AboutModal";

const Footer = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Kagiso M.</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              AI Automation Architect. I build production systems that eliminate manual work and scale with the business.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com/MrSpecks"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-2 rounded-full glass-card hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/kagiso-m-95b329224"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-2 rounded-full glass-card hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:kagisomfusi@outlook.com"
                title="Email"
                className="p-2 rounded-full glass-card hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://simplykae.link/"
                target="_blank"
                rel="noopener noreferrer"
                title="simplykae.link"
                className="p-2 rounded-full glass-card hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Zap className="h-4 w-4" />
              </a>
              <a
                href="https://www.credly.com/users/kagiso-mfusi"
                target="_blank"
                rel="noopener noreferrer"
                title="Credly — Certifications & Badges"
                className="p-2 rounded-full glass-card hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Award className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Certifications", href: "/certifications" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">More</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => setShowAboutModal(true)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  About The App
                </button>
              </li>
              <li>
                <Link
                  to="/not-found"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Lose Yourself
                </Link>
              </li>
              <li>
                <a
                  href="/Kagiso-Mfusi-CV.pdf"
                  download="Kagiso-Mfusi-CV.pdf"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Kagiso Mfusi. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-end">
            <Link to="/policies/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/policies/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/policies/refund" className="hover:text-primary transition-colors">Refund</Link>
            <Link to="/policies/cancellation" className="hover:text-primary transition-colors">Cancellation</Link>
            <Link to="/policies/contact-details" className="hover:text-primary transition-colors">Contact Details</Link>
          </div>
        </div>
      </div>

      <AboutModal open={showAboutModal} onOpenChange={setShowAboutModal} />
    </footer>
  );
};

export default Footer;
