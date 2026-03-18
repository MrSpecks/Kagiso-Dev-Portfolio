import { useState, useEffect, SetStateAction, Component, ReactNode } from "react";
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
import Principles from "./pages/Principles";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import RefundPolicy from "./pages/policies/RefundPolicy";
import CancellationPolicy from "./pages/policies/CancellationPolicy";
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import TermsOfService from "./pages/policies/TermsOfService";
import ContactDetails from "./pages/policies/ContactDetails";

const queryClient = new QueryClient();

// Error boundary — prevents full-page blank on uncaught component errors
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground max-w-md">
            An unexpected error occurred. Please refresh the page or{" "}
            <a href="/contact" className="text-primary underline">get in touch</a> if the issue persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
        <Route path="/principles" element={<Principles />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies/refund" element={<RefundPolicy />} />
        <Route path="/policies/cancellation" element={<CancellationPolicy />} />
        <Route path="/policies/privacy" element={<PrivacyPolicy />} />
        <Route path="/policies/terms" element={<TermsOfService />} />
        <Route path="/policies/contact-details" element={<ContactDetails />} />
        <Route path="/not-found" element={<NotFound />} />
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
                <ErrorBoundary>
                  <AppContent />
                </ErrorBoundary>
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