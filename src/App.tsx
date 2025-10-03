import { useState, useEffect, SetStateAction } from "react";
import { QueryClient, QueryClientProvider, useIsFetching } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotButton from "@/components/ChatbotButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

// AppContent contains your main app layout
const AppContent = () => (
  <div className="transition-opacity duration-500 opacity-100 flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <ChatbotButton />
  </div>
);

// Loader component handles React Query fetch progress
interface ReactQueryLoaderProps {
  loadingProgress: number;
  setLoadingProgress: (value: SetStateAction<number>) => void;
  setIsLoaded: (loaded: boolean) => void;
  children: React.ReactNode;
}

const ReactQueryLoader: React.FC<ReactQueryLoaderProps> = ({
  loadingProgress,
  setLoadingProgress,
  setIsLoaded,
  children,
}) => {
  const isFetching = useIsFetching();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isFetching > 0) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + 1, 95));
      }, 50);
    } else if (loadingProgress < 100) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval!);
            setIsLoaded(true);
            return 100;
          }
          return prev + 1;
        });
      }, 20);
    } else {
      setIsLoaded(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFetching, loadingProgress, setLoadingProgress, setIsLoaded]);

  return <>{children}</>;
};

// Main App
const App = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ReactQueryLoader
              loadingProgress={loadingProgress}
              setLoadingProgress={setLoadingProgress}
              setIsLoaded={setIsLoaded}
            >
              {isLoaded ? (
                <AppContent />
              ) : (
                <LoadingScreen progress={loadingProgress} />
              )}
            </ReactQueryLoader>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;