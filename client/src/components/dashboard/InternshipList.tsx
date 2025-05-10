import React from "react";
import { Link } from "react-router-dom";
import { Internship, Skill } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Calendar,
  MapPin,
  Building,
  ChevronRight,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface InternshipListProps {
  internships: Internship[];
  userSkills: Skill[];
}

const InternshipList = ({ internships, userSkills }: InternshipListProps) => {
  const userSkillIds = userSkills.map((skill) => skill.id);

  const isSkillMatch = (skill: Skill): boolean => {
    return userSkillIds.includes(skill.id);
  };

  const formatCurrency = (value?: number): string => {
    if (!value) return "Não informado";
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (internships.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-black/60 text-lg">
          Nenhuma vaga encontrada com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {internships.map((internship) => (
        <Card
          key={internship.id}
          className="overflow-hidden hover:shadow-md transition-shadow border-conecta-blue/10"
        >
          <CardContent className="p-0">
            <div className="p-5">
              <div className="flex flex-col md:flex-row md:items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded bg-white p-1 shadow flex items-center justify-center border">
                    {internship.company.logo ? (
                      <img
                        src={internship.company.logo}
                        alt={internship.company.name}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <Building className="h-6 w-6 text-conecta-blue" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {internship.title}
                    </h3>
                    <p className="text-black/60 text-sm">
                      {internship.company.name}
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                  <Badge
                    variant={internship.remote ? "default" : "outline"}
                    className={
                      internship.remote
                        ? "bg-conecta-blue text-white"
                        : "text-black border-black/20"
                    }
                  >
                    {internship.remote ? "Remoto" : "Presencial"}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="text-black border-black/20"
                  >
                    {internship.duration}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center text-sm text-black/60">
                  <MapPin size={14} className="mr-1" />
                  {internship.location}
                </div>

                <div className="flex items-center text-sm text-black/60">
                  <Briefcase size={14} className="mr-1" />
                  {internship.company.industry}
                </div>

                <div className="flex items-center text-sm text-black/60">
                  <Calendar size={14} className="mr-1" />
                  Publicado{" "}
                  {formatDistanceToNow(new Date(internship.posted), {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </div>

                {internship.deadline && (
                  <div className="flex items-center text-sm text-black/60">
                    <Clock size={14} className="mr-1" />
                    Prazo até {internship.deadline.toLocaleDateString("pt-BR")}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <p className="text-sm text-black/80 line-clamp-2">
                  {internship.description}
                </p>
              </div>

              {internship.salary && (
                <div className="mt-3">
                  <span className="font-medium text-conecta-blue">
                    {formatCurrency(internship.salary)}/mês
                  </span>
                </div>
              )}

              <div className="mt-4">
                {internship.requiredSkills.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm font-medium mb-1">
                      Skills necessárias:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {internship.requiredSkills.map((skill) => (
                        <Badge
                          key={skill.id}
                          variant={isSkillMatch(skill) ? "default" : "outline"}
                          className={
                            isSkillMatch(skill)
                              ? "bg-conecta-blue text-white"
                              : "border-red-300 text-red-500"
                          }
                        >
                          {skill.name}
                          {!isSkillMatch(skill) && " ❗"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {internship.recommendedSkills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">
                      Skills recomendadas:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {internship.recommendedSkills.map((skill) => (
                        <Badge
                          key={skill.id}
                          variant={isSkillMatch(skill) ? "default" : "outline"}
                          className={
                            isSkillMatch(skill)
                              ? "bg-green-600 text-white"
                              : "border-yellow-300 text-yellow-700"
                          }
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-conecta-blue/10 px-5 py-3 bg-conecta-blue/5 flex justify-between items-center">
              <div className="text-sm">
                <span className="text-black/60">
                  {internship.applications} candidatos
                </span>
              </div>

              <Button
                className="bg-conecta-blue hover:bg-conecta-darkblue"
                asChild
              >
                <Link to={`/jobs/${internship.id}`}>
                  Ver Detalhes <ChevronRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InternshipList;
