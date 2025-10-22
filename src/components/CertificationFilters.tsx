import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Calendar, Building2, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tables } from "@/integrations/supabase/types";

// Type definitions for certification data
type Certification = Tables<"certifications">;

// Filter state interface
interface FilterState {
  searchQuery: string;
  provider: string;
  field: string;
  sortBy: "newest" | "oldest";
}

// Provider options based on common certification providers
const PROVIDER_OPTIONS = [
  "All Providers",
  "Oracle",
  "Microsoft",
  "IBM",
  "LinkedIn Learning",
  "LinkedIn Learning Community",
  "Coursera",
  "Huawei",
  "FreeCodeCamp",
  "Fin1K"
];

// Field/Category options based on common tech fields
const FIELD_OPTIONS = [
  "All Fields",
  "AI & Machine Learning",
  "Cloud Computing",
  "Full-Stack Development",
  "Cybersecurity",
  "Project Management",
  "UX/UI Design",
  "Data Science",
  "DevOps",
  "Database Management",
  "Software Engineering",
  "Web Development",
  "Mobile Development",
  "Networking",
  "System Administration"
];

// Props interface
interface CertificationFiltersProps {
  certifications: Certification[];
  onFilteredCertifications: (filtered: Certification[]) => void;
}

const CertificationFilters: React.FC<CertificationFiltersProps> = ({
  certifications,
  onFilteredCertifications,
}) => {
  // Filter state management
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    provider: "All Providers",
    field: "All Fields",
    sortBy: "newest",
  });

  // Active filters count for badge display
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.provider !== "All Providers") count++;
    if (filters.field !== "All Fields") count++;
    return count;
  }, [filters]);

  // Filter and sort certifications based on current filter state
  const filteredCertifications = useMemo(() => {
    let filtered = [...certifications];

    // Search filter - matches title, description, or provider
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (cert) =>
          cert.title.toLowerCase().includes(query) ||
          (cert.description && cert.description.toLowerCase().includes(query)) ||
          cert.provider.toLowerCase().includes(query)
      );
    }

    // Provider filter
    if (filters.provider !== "All Providers") {
      filtered = filtered.filter((cert) => cert.provider === filters.provider);
    }

    // Field/Category filter - basic keyword matching for now
    if (filters.field !== "All Fields") {
      filtered = filtered.filter((cert) => {
        const title = cert.title.toLowerCase();
        const description = cert.description?.toLowerCase() || "";
        const combinedText = `${title} ${description}`;

        // Field-specific keyword matching
        const fieldKeywords: Record<string, string[]> = {
          "AI & Machine Learning": ["ai", "machine learning", "ml", "artificial intelligence", "neural", "deep learning", "llm", "generative ai"],
          "Cloud Computing": ["cloud", "aws", "azure", "gcp", "oci", "oracle cloud", "infrastructure", "devops"],
          "Full-Stack Development": ["full-stack", "frontend", "backend", "web development", "react", "node", "javascript", "typescript"],
          "Cybersecurity": ["security", "cybersecurity", "penetration", "ethical hacking", "comptia", "cissp"],
          "Project Management": ["project management", "pmp", "agile", "scrum", "pmi"],
          "UX/UI Design": ["ux", "ui", "design", "user experience", "user interface", "figma"],
          "Data Science": ["data science", "data analysis", "statistics", "python", "r", "sql"],
          "DevOps": ["devops", "ci/cd", "docker", "kubernetes", "jenkins", "terraform"],
          "Database Management": ["database", "sql", "mysql", "postgresql", "mongodb", "oracle database"],
          "Software Engineering": ["software engineering", "programming", "algorithms", "data structures"],
          "Web Development": ["web development", "html", "css", "javascript", "react", "angular", "vue"],
          "Mobile Development": ["mobile", "ios", "android", "react native", "flutter"],
          "Networking": ["networking", "ccna", "ccnp", "cisco", "network"],
          "System Administration": ["system admin", "linux", "windows server", "administration"],
        };

        const keywords = fieldKeywords[filters.field] || [];
        return keywords.some(keyword => combinedText.includes(keyword));
      });
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.date_earned);
      const dateB = new Date(b.date_earned);
      return filters.sortBy === "newest" 
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    return filtered;
  }, [certifications, filters]);

  // Update parent component when filtered results change
  React.useEffect(() => {
    onFilteredCertifications(filteredCertifications);
  }, [filteredCertifications, onFilteredCertifications]);

  // Handle filter changes
  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      searchQuery: "",
      provider: "All Providers",
      field: "All Fields",
      sortBy: "newest",
    });
  };

  // Clear specific filter
  const clearFilter = (key: keyof FilterState) => {
    const defaultValues: FilterState = {
      searchQuery: "",
      provider: "All Providers",
      field: "All Fields",
      sortBy: "newest",
    };
    setFilters(prev => ({ ...prev, [key]: defaultValues[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border rounded-lg p-6 mb-8 shadow-sm"
    >
      {/* Header with active filters count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Filter & Search Certifications</h2>
          {activeFiltersCount > 0 && (
            <div className="inline-flex items-center rounded-full border border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold ml-2">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
            </div>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Clear all active filters"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Search and Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search certifications..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter("searchQuery", e.target.value)}
            className="pl-10"
            aria-label="Search certifications by title, description, or provider"
          />
          {filters.searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => clearFilter("searchQuery")}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              aria-label="Clear search query"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Provider Filter */}
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Select
            value={filters.provider}
            onValueChange={(value) => updateFilter("provider", value)}
          >
            <SelectTrigger className="pl-10" aria-label="Filter by certification provider">
              <SelectValue placeholder="Select Provider" />
            </SelectTrigger>
            <SelectContent>
              {PROVIDER_OPTIONS.map((provider) => (
                <SelectItem key={provider} value={provider}>
                  {provider}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Field/Category Filter */}
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Select
            value={filters.field}
            onValueChange={(value) => updateFilter("field", value)}
          >
            <SelectTrigger className="pl-10" aria-label="Filter by certification field or category">
              <SelectValue placeholder="Select Field" />
            </SelectTrigger>
            <SelectContent>
              {FIELD_OPTIONS.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Select
            value={filters.sortBy}
            onValueChange={(value) => updateFilter("sortBy", value as "newest" | "oldest")}
          >
            <SelectTrigger className="pl-10" aria-label="Sort certifications by date">
              <SelectValue placeholder="Sort by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-2 pt-4 border-t"
          >
            {filters.searchQuery && (
              <div className="inline-flex items-center gap-1 rounded-full border border-input bg-background px-2.5 py-0.5 text-xs font-semibold">
                Search: "{filters.searchQuery}"
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter("searchQuery")}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  aria-label="Remove search filter"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {filters.provider !== "All Providers" && (
              <div className="inline-flex items-center gap-1 rounded-full border border-input bg-background px-2.5 py-0.5 text-xs font-semibold">
                Provider: {filters.provider}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter("provider")}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  aria-label="Remove provider filter"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {filters.field !== "All Fields" && (
              <div className="inline-flex items-center gap-1 rounded-full border border-input bg-background px-2.5 py-0.5 text-xs font-semibold">
                Field: {filters.field}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter("field")}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  aria-label="Remove field filter"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-muted-foreground mt-4"
      >
        Showing {filteredCertifications.length} of {certifications.length} certifications
      </motion.div>
    </motion.div>
  );
};

export default CertificationFilters;
