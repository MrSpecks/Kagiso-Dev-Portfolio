import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Download, Award } from "lucide-react";
import { format } from "date-fns";
import { Tables } from "@/integrations/supabase/types";

type Certification = Tables<"certifications">;

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certifications: Certification[];
  provider: string;
}

const CertificationModal = ({
  isOpen,
  onClose,
  certifications,
  provider,
}: CertificationModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <CardHeader>
            <CardTitle className="pr-8">{provider}</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {certifications.length} {certifications.length === 1 ? "certification" : "certifications"} completed
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Earned {format(new Date(cert.date_earned), "MMMM yyyy")}
                    </p>
                  </div>
                  <Award className="h-5 w-5 text-primary shrink-0 ml-2" />
                </div>

                {cert.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {cert.description}
                  </p>
                )}

                {cert.file_url && (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a
                          href={cert.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a
                          href={cert.file_url}
                          download
                          className="flex items-center justify-center"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </div>

                    {cert.VerifyUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full"
                      >
                        <a
                          href={cert.VerifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <Award className="mr-2 h-4 w-4" />
                          View Badge
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CertificationModal;
