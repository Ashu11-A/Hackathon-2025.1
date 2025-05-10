import React from "react";
import { Internship, Skill } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, MapPin, Clock, Star } from "lucide-react";

interface RecommendationSectionProps {
  recommendations: Internship[];
  title: string;
  description: string;
}

const RecommendationSection = ({
  recommendations,
  title,
  description,
}: RecommendationSectionProps) => {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-conecta-blue">{title}</h2>
        <p className="text-black/60 text-sm">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((internship) => (
          <Card
            key={internship.id}
            className="hover:shadow-md transition-shadow border-conecta-blue/10"
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3 mb-3">
                <div className="h-10 w-10 rounded bg-white p-1 shadow flex items-center justify-center border">
                  {internship.company.logo ? (
                    <img
                      src={internship.company.logo}
                      alt={internship.company.name}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <Building className="h-5 w-5 text-conecta-blue" />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-black line-clamp-1">
                    {internship.title}
                  </h3>
                  <p className="text-black/60 text-sm line-clamp-1">
                    {internship.company.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-sm mb-3">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-black font-medium">Match perfeito</span>
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center text-xs text-black/70">
                  <MapPin size={12} className="mr-1 flex-shrink-0" />
                  <span className="truncate">
                    {internship.location}
                    {internship.remote ? " (Remoto)" : ""}
                  </span>
                </div>

                <div className="flex items-center text-xs text-black/70">
                  <Clock size={12} className="mr-1 flex-shrink-0" />
                  <span>{internship.duration}</span>
                </div>
              </div>

              <div className="line-clamp-2 text-xs text-black/80 mb-3">
                {internship.description}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {internship.requiredSkills.slice(0, 2).map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className="text-xs px-1.5 py-0.5 border-conecta-blue/30 text-conecta-blue"
                  >
                    {skill.name}
                  </Badge>
                ))}
                {internship.requiredSkills.length +
                  internship.recommendedSkills.length >
                  2 && (
                  <Badge
                    variant="outline"
                    className="text-xs px-1.5 py-0.5 border-black/20 text-black/60"
                  >
                    +
                    {internship.requiredSkills.length +
                      internship.recommendedSkills.length -
                      2}{" "}
                    mais
                  </Badge>
                )}
              </div>

              <Button
                variant="link"
                className="px-0 h-auto text-sm font-medium text-conecta-blue hover:text-conecta-darkblue"
              >
                Ver detalhes <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
