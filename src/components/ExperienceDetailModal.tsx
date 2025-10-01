import React from 'react';
import { X, Briefcase, GraduationCap, Calendar, Zap, TrendingUp } from 'lucide-react';
import { Button } from "./ui/button"; // Reusing your Button component
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card"; // Reusing your Card components

// Define the shape of the data this modal accepts
interface DetailData {
  type: 'experience' | 'education';
  title: string;
  subtitle: string;
  period: string;
  logo: string; // Placeholder for a logo URL or icon representation
  responsibilities: string[];
  impact: string[];
  technicalSkills?: string[]; // Optional for Experience
  academicProgression?: string[]; // Optional for Education
}

interface ExperienceDetailModalProps {
  data: DetailData | null;
  isOpen: boolean;
  onClose: () => void;
}

// Function to replace placeholders (or fetch actual logo/avatar)
// For now, we will use Lucide icons based on the 'type'
const TypeIcon = ({ type }: { type: 'experience' | 'education' }) => {
    const IconComponent = type === 'experience' ? Briefcase : GraduationCap;
    return (
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center p-3 shrink-0 mr-4">
            <IconComponent className="h-8 w-8 text-primary" />
        </div>
    );
};

const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({ data, isOpen, onClose }) => {
  if (!isOpen || !data) return null;

  const Icon = data.type === 'experience' ? Briefcase : GraduationCap;
  const SubIcon = data.type === 'experience' ? Zap : TrendingUp;
  const mainLabel = data.type === 'experience' ? 'Company' : 'Institution';
  const responsibilityLabel = data.type === 'experience' ? 'Key Responsibilities' : 'Academic Focus';
  const impactLabel = data.type === 'experience' ? 'Career Impact & Development' : 'Technical Development & Impact';

  return (
    // Backdrop with Blur and Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 p-4 animate-in fade-in-0 duration-300" onClick={onClose}>
      
      {/* Modal Card */}
      <Card 
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100" 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
      >
        
        {/* Close Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="absolute top-3 right-3 rounded-full z-10 hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </Button>

        <CardHeader className="flex flex-row items-start space-y-0 pb-2">
            <TypeIcon type={data.type} />
            <div className='flex flex-col flex-grow'>
                <CardTitle className="text-3xl font-extrabold tracking-tight">{data.title}</CardTitle>
                <p className="text-xl text-primary font-medium mt-1">{data.subtitle} ({mainLabel})</p>
                <div className="flex items-center text-muted-foreground mt-2 text-sm">
                    <Calendar className="mr-2 h-4 w-4 shrink-0" />
                    <p className="font-semibold">{data.period}</p>
                </div>
            </div>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          
          {/* Detailed Responsibilities / Focus */}
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center text-foreground">
                <Icon className="h-5 w-5 mr-2 text-primary" />
                {responsibilityLabel}
            </h3>
            <ul className="space-y-3 pl-4 list-disc text-muted-foreground">
              {data.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Impact / Development */}
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center text-foreground">
                <SubIcon className="h-5 w-5 mr-2 text-primary" />
                {impactLabel}
            </h3>
            <ul className="space-y-3 pl-4 list-disc text-muted-foreground">
              {data.impact.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienceDetailModal;
