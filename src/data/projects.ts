export const projects = [
    {
        id: 1,
        title: "Misaveni Pharmacy — Local Business Website",
        description: "A production-ready brochure website built end-to-end for a real neighbourhood pharmacy in Etwatwa, Benoni, South Africa — brand tokens derived by pixel-sampling the client's own logo, a governed SDLC (ADRs, an alert register, an automated quality-gate runner wired into CI), and a live, accessible, mobile-first site with zero data collection by design. Real photography and WhatsApp-first contact replace forms and backend entirely.",
        tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Vercel"],
        demo_url: "https://misaveni-pharmacy.vercel.app/",
        screenshot_url: "/Misaveni-Pharmacy.png",
        category: "Web App"
    },
    {
        id: 2,
        title: "Personal Portfolio RAG Agent",
        description: "A Retrieval-Augmented Generation agent embedded into my portfolio that demonstrates the complete AI application loop: chunking and embedding site content, similarity search over Supabase pgvector, and tightly-scoped prompting for verifiable answers. Deployed as a serverless function with guardrails and analytics, it logs unfamiliar questions to Supabase to create a continuous learning feedback loop and drive targeted content updates. The result is a responsive, grounded assistant that improves over time while preserving performance and cost efficiency.",
        tech_stack: ["React", "Supabase", "TailwindCSS", "OpenRouter", "RAG Pipeline"],
        demo_url: "https://kagiso-dev-portfolio-z55k-fa6c2gtm8-mrspecks-projects.vercel.app",
        repo_url: "https://github.com/MrSpecks/Kagiso-Dev-Portfolio",
        screenshot_url: "/Portfolio-RAG-Agent.png",
        category: "Web App"
    },
    {
        id: 3,
        title: "FastAPI Issue Tracker",
        description: "A lightweight issue tracker built with FastAPI and vanilla JavaScript. It features real-time search, priority levels, status tracking, and responsive design on desktop, tablet, and mobile. Power users enjoy keyboard shortcuts while live statistics track your backlog. The app uses Pydantic for validation, Jinja2 for templating, and JSON file storage without database complexity. The REST API provides complete CRUD operations for issue management. Perfect for small teams and developers who prioritize simplicity, clean code.",
        tech_stack: ["FastAPI", "Python", "HTML", "Pydantic", "Jinja2", "SQLite", "Render"],
        demo_url: "https://we-got-issues.onrender.com/",
        repo_url: "https://github.com/MrSpecks/we-got-issues",
        screenshot_url: "/We-Got-Issues.png",
        category: "Web App"
    },
    {
        id: 4,
        title: "Interactive Ames Housing Market Dashboard",
        description: "A production-ready data application that transforms a comprehensive Jupyter Notebook EDA and advanced feature engineering process (50+ custom features) into a dynamic Streamlit dashboard. The core achievement was refactoring all logic into modular Python packages to ensure clean, maintainable code. The dashboard provides real estate professionals with interactive filters (Neighborhood, Quality, Price Range) to visualize key property metrics, price distributions, and dynamic feature correlations in real-time.",
        tech_stack: [
            "Python",
            "Streamlit",
            "Pandas",
            "Plotly",
            "Data Refactoring",
            "Feature Engineering",
            "Modular Design"
        ],
        demo_url: "https://housing-prices-dashboard.streamlit.app/",
        repo_url: "https://github.com/MrSpecks/Machine-Learning-Project",
        screenshot_url: "/Ames-EDA-dash.png",
        category: "Data App & Visualization"
    },
    {
        id: 5,
        title: "AI Brochure Maker",
        description: "The AI Brochure Maker is a Jupyter Notebook project that automates the creation of professional company brochures. It scrapes and analyzes website content, identifies the most relevant information (e.g., About, Company, Careers pages), and generates a polished brochure draft using a Large Language Model.",
        tech_stack: ["Python", "BeautifulSoup", "Streamlit", "OpenAI API", "OpenRouter"],
        demo_url: "https://brochure-maker.streamlit.app/",
        repo_url: "https://github.com/MrSpecks/Brochure-Maker",
        screenshot_url: "/Brochure-Maker.png",
        category: "AI Tool"
    },
    {
        id: 6,
        title: "AI Q&A Code Assistant",
        description: "The AI Q&A Bot is a Jupyter Notebook project that allows you to interactively ask technical or general questions and receive AI-generated answers in real-time. It leverages a Large Language Model to provide accurate and context-aware responses, making it a valuable tool for developers and learners.",
        tech_stack: ["Python", "OpenAI API", "Streamlit", "OpenRouter"],
        demo_url: "https://qna-code-assistant.streamlit.app/",
        repo_url: "https://github.com/MrSpecks/QnA-code-assistant",
        screenshot_url: "/Q&A-Bot.png",
        category: "AI Tool"
    },
    {
        id: 7,
        title: "Website Scraper & Summarizer",
        description: "This project is a Jupyter Notebook application that allows you to scrape the contents of a website and automatically generate a concise summary using a Large Language Model (LLM). It combines web scraping techniques with natural language processing to produce easy-to-read summaries of online content.",
        tech_stack: ["Python", "BeautifulSoup", "OpenRouter", "OpenAI API", "Streamlit"],
        demo_url: "https://website-summaryzer.streamlit.app/",
        repo_url: "https://github.com/MrSpecks/Website-Summarizer",
        screenshot_url: "/Website-scraper-summarizer.png",
        category: "AI Tool"
    },
    {
        id: 8,
        title: "Property Reviews Dashboard",
        description: "A modern reviews management dashboard built to help property managers track and improve guest experience. The app integrates with a reviews API, normalizes data across multiple channels, and provides an interface to filter, approve, and publish guest feedback. Only manager-approved reviews appear on the public property page, ensuring trust and consistency.",
        tech_stack: ["React", "Typescript", "TailwindCSS", "API Integration", "Data Normalization", "Dashboard UI"],
        demo_url: "https://flexliving-reviews-hub.vercel.app/",
        repo_url: "https://github.com/MrSpecks/property-reviews-hub",
        screenshot_url: "/Property-Reviews-Dashboard.png",
        category: "Web App"
    },
    {
        id: 9,
        title: "Personal Portfolio Website",
        description: "A bespoke portfolio engineered to communicate depth while remaining fast, accessible, and production‑ready. Built with Next.js, TypeScript, and Tailwind CSS on a clean, scalable architecture, it renders JSON‑driven content, features responsive layouts and tasteful motion, and supports dark/light theming with a polished UI system. Deployed on Vercel and tuned for Lighthouse performance, it showcases projects, articles, and case studies with clarity and reliability.",
        tech_stack: ["React", "Tailwind CSS", "Lucide", "TypeScript", "Vercel"],
        demo_url: "https://personal-portfolio-git-main-mrspecks-projects.vercel.app",
        repo_url: "https://github.com/MrSpecks/MrSpecks-/tree/main/portfolio",
        screenshot_url: "/website-preview.jpg",
        category: "Website"
    },
];
