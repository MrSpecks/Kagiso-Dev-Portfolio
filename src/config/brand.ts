/**
 * Kagiso Dev Portfolio
 * Brand Configuration Module
 *
 * Engineered by Kagiso Mfusi — Full-Stack & AI Systems Engineer
 *
 * @author Kagiso Mfusi
 * @copyright © 2025 Kagiso Mfusi. All rights reserved.
 */

export const BRAND_CONFIG = {
  author: {
    name: "Kagiso Mfusi",
    title: "AI Systems & Automation Architect",
    website: "https://simplykaedesigns.com",
    github: "https://github.com/MrSpecks",
    email: "kagisomfusi@outlook.com",
    linkedin: "https://www.linkedin.com/in/kagiso-mfusi-95b329224",
    portfolio: "https://kagiso-dev-portfolio.vercel.app",
  },
  project: {
    name: "Kagiso Dev Portfolio",
    tagline: "A Modern Portfolio Showcasing Full-Stack Development & AI Systems Engineering",
    version: "2.0.0",
    originDate: "2024-10-15",
    description:
      "A modern personal portfolio website showcasing professional work, projects, and certifications. Built with React, TypeScript, Tailwind CSS, and modern UI components, featuring responsive design, smooth animations, and an engaging user experience. The site serves as a digital resume and comprehensive project showcase platform.",
  },
  framework: {
    name: "Founder Signature Framework",
    version: "v1.0",
    implementationWeek: 9,
  },
  capabilities: [
    "Modern Frontend Development (React, TypeScript, Responsive Design)",
    "Component-Based Architecture (shadcn/ui, Tailwind CSS, Figma Design)",
    "Interactive Animations & User Experience (Framer Motion, Smooth Transitions)",
    "Database Integration & Data Management (Supabase, PostgreSQL, React Query)",
    "Responsive & Theme-Aware Design (Light/Dark Mode, Mobile-First Approach)",
    "SEO Optimization & Web Performance (Vercel Deployment, Build Optimization)",
    "Professional Showcase (Projects, Certifications, Experience, Online Learning)",
  ],
  techStack: {
    frontend: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    backend: ["Supabase", "PostgreSQL", "React Query", "REST APIs"],
    deployment: ["Vercel", "Git", "Build Optimization"],
    tools: ["Figma", "VS Code", "TypeScript", "Vite"],
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
export const PROJECT_NAME = BRAND_CONFIG.project.name;
export const PROJECT_DESCRIPTION = BRAND_CONFIG.project.description;
export const COPYRIGHT = BRAND_CONFIG.legal.copyright;
export const FOOTER_CREDIT = BRAND_CONFIG.ui.footerCredit;
export const SIGNATURE_COLOR = BRAND_CONFIG.ui.signatureColor;
