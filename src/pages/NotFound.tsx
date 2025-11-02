/* eslint-disable react/no-unescaped-entities */
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Lightbulb, Compass, Sparkles, Radar, Orbit, Satellite } from "lucide-react";
import { Link } from "react-router-dom";

const rotatingIcons = [Wand2, Lightbulb, Compass, Sparkles, Radar, Orbit, Satellite];
const rotatingQuotes = [
  "You either return a Jedi... or get lost in the dark side.",
  "Found, this page is not. Search again, you must.",
  "Hmmm... 404, this is. Lost, perhaps you are.",
  "This page? A black hole it is.",
  "The force is strong with this one... but not with this page.",
  "Arrived you have not. Seek elsewhere, you must.",
  "A presence I feel.. but this page, I do not.",
];

export default function NotFound() {
  const location = useLocation();
  const [iconIndex, setIconIndex] = useState(() =>
    Math.floor(Math.random() * rotatingIcons.length)
  );
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * rotatingQuotes.length)
  );

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % rotatingIcons.length);
      setQuoteIndex((prev) => (prev + 1) % rotatingQuotes.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = rotatingIcons[iconIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.main
        className="relative min-h-screen bg-background dark:bg-background flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Animated Icon Background */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center opacity-10 z-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <ActiveIcon className="w-[500px] h-[500px] text-primary/30 dark:text-primary/20" />
        </motion.div>

        {/* Foreground Content */}
        <div className="relative z-10">
          {/* Floating 404 */}
          <motion.h1
            className="text-7xl font-black text-primary drop-shadow-md"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            404
          </motion.h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            You've wandered off the grid. This page doesn't exist, or maybe it
            slipped into hyperspace. Either way, let's get you back where the
            signal is strong.
          </p>

          {/* Navigation Links */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-2 px-4 rounded shadow transition"
            >
              Return Home
            </Link>
            <Link
              to="/projects"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-2 px-4 rounded shadow transition"
            >
              Explore Projects
            </Link>
            <Link
              to="/about"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-2 px-4 rounded shadow transition"
            >
              Learn About Me
            </Link>
          </motion.div>
        </div>

        {/* Footer Element */}
        <motion.div
          className="mt-12 text-lg flex items-center justify-center text-primary gap-3"
          key={quoteIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <ActiveIcon className="w-5 h-5 animate-pulse" />
          <span className="italic">{rotatingQuotes[quoteIndex]}</span>
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
}
