/**
 * Kagiso Dev Portfolio
 * Brand Configuration Module
 *
 * Engineered by Kagiso Mfusi — Full-Stack & AI Systems Engineer
 * Organization: Simply Kae Designs
 *
 * @author Kagiso Mfusi
 * @copyright © 2025 Kagiso Mfusi. All rights reserved.
 */

export const BRAND_CONFIG = {
  author: {
    name: "Kagiso Mfusi",
    title: "Full-Stack & AI Systems Engineer",
    website: "https://simplykaedesigns.com",
    github: "https://github.com/MrSpecks",
    email: "kagisomfusi@outlook.com",
    linkedin: "https://www.linkedin.com/in/kagiso-mfusi-95b329224",
    portfolio: "https://kagiso-dev-portfolio.vercel.app",
  },
  organization: {
    name: "Simply Kae Designs",
    website: "https://simplykaedesigns.com",
  },
  project: {
    name: "Kagiso Dev Portfolio",
    tagline: "Showcasing Full-Stack Development, Cloud Architecture, and AI Innovation",
    version: "2.0.0",
    originDate: "2024-10-15",
    description:
      "A comprehensive portfolio website demonstrating expertise in full-stack development, AI systems engineering, cloud architecture, and modern web technologies. Built as a production-grade SaaS platform with curated projects, certifications, and professional experience.",
  },
  framework: {
    name: "Founder Signature Framework",
    version: "v1.0",
    implementationWeek: 9,
  },
  capabilities: [
    "Full-Stack Web Development (React, TypeScript, Next.js, Node.js)",
    "Cloud Architecture & DevOps (Azure, GCP, AWS, Docker, Kubernetes)",
    "AI & Machine Learning Systems (LLM Engineering, RAG, Agentic AI)",
    "Database Design & Optimization (PostgreSQL, Supabase, Vector Databases)",
    "UI/UX Design & Implementation (Figma, Tailwind CSS, shadcn/ui)",
    "Real-Time Systems & Automation (N8N, Zapier, Custom Workflows)",
    "Open Source Contributions & Community Engagement",
  ],
  techStack: {
    frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    backend: ["Node.js", "Express", "Supabase", "PostgreSQL", "REST APIs"],
    cloud: ["Azure", "Vercel", "Docker", "CI/CD Pipelines"],
    ai: ["OpenRouter", "LLM Engineering", "RAG Architecture", "Vector Databases"],
    tools: ["Figma", "Git", "N8N", "Jira", "VS Code"],
  },
  legal: {
    copyright: `© ${new Date().getFullYear()} Kagiso Mfusi. All rights reserved.`,
  },
  ui: {
    footerCredit: "Engineered by Kagiso Mfusi",
    signatureColor: "#06b6d4",
  },
} as const;

// Export individual properties for convenience
export const AUTHOR_NAME = BRAND_CONFIG.author.name;
export const AUTHOR_TITLE = BRAND_CONFIG.author.title;
export const AUTHOR_WEBSITE = BRAND_CONFIG.author.website;
export const ORGANIZATION_NAME = BRAND_CONFIG.organization.name;
export const PROJECT_NAME = BRAND_CONFIG.project.name;
export const PROJECT_DESCRIPTION = BRAND_CONFIG.project.description;
export const COPYRIGHT = BRAND_CONFIG.legal.copyright;
export const FOOTER_CREDIT = BRAND_CONFIG.ui.footerCredit;
export const SIGNATURE_COLOR = BRAND_CONFIG.ui.signatureColor;
