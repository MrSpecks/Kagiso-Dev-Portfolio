import { useEffect, useRef, useState } from "react";
import StackIcon from "tech-stack-icons";
import "./RotatingStackCloud.css";

const ICON_NAMES = [
    "gradio",  "huggingface", "java", "jira", "js", "json", "langchain",
   "atlassian", "anthropic", "aws", "azureai", "bash", "bitbucket",  
    "oracle", "postgresql", "vscode", "pytorch", "react", "vercel", "typescript",
  "eslint", "figma", "framer", "gcloud", "gemini", "git", "github", "gitlab",
  "copilotgithub", "css3", "deepseek", "docker", "expressjs", "supabase",
  "langgraph", "llamaindex", "markdown",  "meta", "nextjs2", "claude",
  "microsoft", "mistral", "mongodb", "n8n", "net", "nextjs",  "nodejs", "npm",
  "npm2",  "postman", "powershell", "prettier", "html5", "colab", "openai",
  "python",  "reactrouter", "materialui", "shadcnui",  "azure", "vite", 
  "streamlit",  "tailwindcss",  "ubuntu", "bolt", "spring",
  
];

interface IconOrbit {
  name: string;
  lon: number;
  lat: number;
}

const CLOUD_RADIUS = 170;
const ORBIT_SPEED = 0.008;

const RotatingTechCloud: React.FC = () => {
  const [angles, setAngles] = useState<IconOrbit[]>([]);
  const requestRef = useRef<number | null>(null);

  // Initialize evenly distributed orbit angles using Fibonacci sphere
  useEffect(() => {
    const n = ICON_NAMES.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    const initialAngles: IconOrbit[] = ICON_NAMES.map((name, i) => {
      const y = 1 - (i / (n - 1)) * 2; // from 1 to -1
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      return {
        name,
        lon: theta,
        lat: Math.asin(y) // arcsin(y) gives latitude
      };
    });

    setAngles(initialAngles);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setAngles((prev) =>
        prev.map((icon) => ({
          ...icon,
          lon: icon.lon + ORBIT_SPEED
        }))
      );
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <section className="tech-cloud-wrapper">
      <div className="tech-cloud-perspective">
        <div className="tech-cloud">
          {angles.map(({ name, lon, lat }, i) => {
            const x = CLOUD_RADIUS * Math.cos(lat) * Math.sin(lon);
            const y = CLOUD_RADIUS * Math.sin(lat);
            const z = CLOUD_RADIUS * Math.cos(lat) * Math.cos(lon);

            const depth = (z + CLOUD_RADIUS) / (CLOUD_RADIUS * 2);
            const scale = 0.35 + depth * 0.65;

            return (
              <div
                key={i}
                className="tech-icon"
                style={{
                  transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(0deg) rotateX(0deg)`,
                  opacity: 0.5 + 0.5 * depth,
                  scale
                }}
              >
                <StackIcon name={name} />
              </div>
            );
          })}
        </div>
      </div>
      </section>
  );
};

export default RotatingTechCloud;