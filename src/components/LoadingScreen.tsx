import React, { useEffect, useState } from "react";
import {
  SiReact,
  SiVercel,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiVite,
} from "react-icons/si";

const techIcons = [
  SiReact,
  SiVercel,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiVite,
];

interface LoadingScreenProps {
  progress?: number; // Progress percentage (0 to 100)
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress = 0 }) => {
  const [time, setTime] = useState(0);

  // Animate floating icons with sine wave
  useEffect(() => {
    const floatInterval = setInterval(() => {
      setTime((t) => t + 0.05); // small increment for smooth motion
    }, 16); // ~60fps
    return () => clearInterval(floatInterval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-2xl font-semibold mb-6">Loading...</h1>

      {/* Progress Bar */}
      <div className="w-3/4 max-w-md h-4 bg-gray-400 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-[#646cffaa] transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Icons */}
      <div className="flex space-x-6 justify-center flex-wrap">
        {techIcons.map((Icon, idx) => {
          const yOffset = Math.sin(time + idx) * 10; // 10px up/down
          return (
            <Icon
              key={idx}
              className="text-4xl"
              style={{
                transform: `translateY(${yOffset}px)`,
                transition: "transform 0.1s linear",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LoadingScreen;