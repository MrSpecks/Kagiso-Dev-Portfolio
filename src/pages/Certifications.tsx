import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, ExternalLink, Download } from "lucide-react";
import ChartRadarGridFill from "@/components/ChartRadarGridFill";
import { format } from "date-fns";


// const ChartRadarGridFill = () => (
//     <div className="flex justify-center items-center h-80 rounded-x p-6">
//         <p className="text-xl font-semibold text-primary/70">
//             [ChartRadarGridFill Placeholder]
//         </p>
//     </div>
// );
const Certifications = () => {
  const { data: certifications, isLoading, error } = useQuery({
    queryKey: ["certifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("date_earned", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Certifications</h1>
            <p className="text-xl text-muted-foreground">Loading certifications...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Certifications</h1>
            <p className="text-xl text-red-500">Error loading certifications</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Certifications</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional certifications and achievements that showcase my commitment to continuous learning and expertise.
          </p>
        </div>

        {/* START: Radar Chart Component Placement (New Section) */}
        <div className="mb-16">
            <ChartRadarGridFill chartConfig={{ score: { label: 'Expertise Score', color: 'hsl(var(--primary))', }, }} />
        </div>

        {/* Certifications Grid */}
        {certifications && certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <Card key={cert.id} className="cert-card group">
                {/* Badge */}
                <div className="cert-badge">
                  <Award className="h-8 w-8 text-primary" />
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  
                  <Badge variant="secondary" className="mb-3">
                    {cert.provider}
                  </Badge>
                  
                  <div className="flex items-center text-muted-foreground mb-4">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(new Date(cert.date_earned), "MMMM yyyy")}</span>
                  </div>
                  
                  {cert.description && (
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {cert.description}
                    </p>
                  )}
                  
                  {cert.file_url && (
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
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Certifications Yet</h3>
            <p className="text-muted-foreground">
              Certifications will be displayed here once they are added to the database.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Continuous Learning</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I believe in staying current with the latest technologies and best practices. 
              These certifications represent my commitment to professional growth and excellence.
            </p>
            <Button variant="outline">
              View All Achievements
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Certifications;