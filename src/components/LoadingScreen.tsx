import React, { useEffect, useState } from "react";
import {
  SiReact,
  SiVercel,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiVite,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const techIcons = [
  SiReact,
  SiVercel,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiVite,
];

// Motivational micro-copy messages
const microCopy = [
  "Optimizing vectorized awesomeness...",
  "Embedding RAG Agent... ",
  "Synthesizing model weights...",
  "Loading AI insights...",
  "Quantizing portfolio experience...",
];

interface LoadingScreenProps {
  progress?: number; // 0-100
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress = 0 }) => {
  const [time, setTime] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  // Animate floating icons
  useEffect(() => {
    const floatInterval = setInterval(() => setTime((t) => t + 0.06), 16);
    return () => clearInterval(floatInterval);
  }, []);

  // Cycle through micro-copy every 2 seconds
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((idx) => (idx + 1) % microCopy.length);
    }, 800);
    return () => clearInterval(msgInterval);
  }, []);

  // Non-linear easing for progress (ease-out cubic)
  const easedProgress = 100 * Math.pow(progress / 100, 0.8);

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col justify-center items-center h-screen w-screen"
      >
        {/* Dynamic gradient background based on theme */}
        <div
          className="absolute top-0 left-0 w-full h-full -z-10"
          style={{
            background: `linear-gradient(135deg, ${
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "#0f172a, #1e293b"
                : "#c7d2fe, #a5b4fc"
            })`,
          }}
        />

        {/* <h1 className="text-2xl font-semibold mb-4 text-center">
          Loading...
        </h1> */}

        {/* Motivational micro-copy */}
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 text-center text-sm text-gray-300 dark:text-gray-200 font-mono"
        >
          {microCopy[messageIndex]}
        </motion.p>

        {/* Weighted, non-linear progress bar */}
        <div className="w-3/4 max-w-md h-4 bg-gray-400 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-[#646cffaa]"
            style={{ width: `${easedProgress}%` }}
            transition={{ type: "tween", duration: 0.2 }}
          />
        </div>

        {/* Floating icons with opacity waves */}
        <div className="flex space-x-6 justify-center flex-wrap">
          {techIcons.map((Icon, idx) => {
            const yOffset = Math.sin(time + idx) * 12;
            const opacityWave = 0.7 + 0.3 * Math.sin(time * 2 + idx);
            return (
              <motion.div
                key={idx}
                className="text-4xl"
                style={{
                  transform: `translateY(${yOffset}px)`,
                  opacity: opacityWave,
                }}
              >
                <Icon />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;