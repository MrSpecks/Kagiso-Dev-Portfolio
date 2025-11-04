import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BRAND_CONFIG } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Mail, Linkedin, Sparkles } from "lucide-react";

interface AboutModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AboutModal({ open: externalOpen, onOpenChange }: AboutModalProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  // Keyboard shortcut: Cmd/Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setOpen]);

  // Only render button if not controlled by parent (i.e., when used standalone in AboutModal.tsx)
  const isStandalone = externalOpen === undefined;

  return (
    <>
      {isStandalone && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          className="text-muted-foreground hover:text-primary transition-colors"
          title="About This App (Ctrl+Shift+A)"
        >
          About The App
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] p-0 flex flex-col">
          <ScrollArea className="h-full w-full">
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {BRAND_CONFIG.project.name}
                </DialogTitle>
                <DialogDescription>{BRAND_CONFIG.project.tagline}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
            {/* Project Overview */}
            <section>
              <h3 className="font-semibold text-lg mb-3">Project Overview</h3>
              <p className="text-sm text-muted-foreground">
                {BRAND_CONFIG.project.description}
              </p>
            </section>

            {/* Portfolio Capabilities */}
            <section>
              <h3 className="font-semibold text-lg mb-3">Core Capabilities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {BRAND_CONFIG.capabilities.map((capability, index) => (
                  <li key={index}>• {capability}</li>
                ))}
              </ul>
            </section>

            {/* Author Information */}
            <section>
              <h3 className="font-semibold text-lg mb-3">Created & Engineered By</h3>
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-semibold">{BRAND_CONFIG.author.name}</span>
                <br />
                <span className="text-xs">{BRAND_CONFIG.author.title}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                This portfolio website is designed, built, and maintained by me as a personal project showcasing my professional work, technical skills, and career journey.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={BRAND_CONFIG.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </a>
                <a href={`mailto:${BRAND_CONFIG.author.email}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </a>
                <a
                  href={BRAND_CONFIG.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </a>
              </div>
            </section>

            {/* Technology Stack */}
            <section>
              <h3 className="font-semibold text-lg mb-3">Technology Stack</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-medium mb-1">Frontend</p>
                  <p className="text-muted-foreground">
                    {BRAND_CONFIG.techStack.frontend.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1">Backend & Data</p>
                  <p className="text-muted-foreground">
                    {BRAND_CONFIG.techStack.backend.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1">Deployment</p>
                  <p className="text-muted-foreground">
                    {BRAND_CONFIG.techStack.deployment.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1">Development Tools</p>
                  <p className="text-muted-foreground">
                    {BRAND_CONFIG.techStack.tools.join(", ")}
                  </p>
                </div>
              </div>
            </section>

            {/* Framework */}
            <section className="border-t pt-4">
              <p className="text-xs text-muted-foreground">
                Part of the {BRAND_CONFIG.framework.name} {BRAND_CONFIG.framework.version} —
                systematically encoding authorship and engineering provenance across all platform
                layers.
              </p>
            </section>
            </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AboutModal;
