import React from "react";
import { SkillGap } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SkillGapCardProps {
  skillGaps: SkillGap[];
}

const SkillGapCard = ({ skillGaps }: SkillGapCardProps) => {
  // Filtrar as skills que o usuário não possui
  const missingSkills = skillGaps.filter((gap) => !gap.userHas);

  return (
    <Card className="border-conecta-blue/10 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-conecta-blue flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Desenvolva suas Skills
        </CardTitle>
        <p className="text-sm text-black/60 mt-1">
          Skills populares nas vagas que você poderia aprender
        </p>
      </CardHeader>

      <CardContent>
        {missingSkills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-conecta-blue/10 flex items-center justify-center mb-3">
              <BookOpen className="h-6 w-6 text-conecta-blue" />
            </div>
            <p className="text-black/70 mb-1">Parabéns!</p>
            <p className="text-sm text-black/60 max-w-xs">
              Você já domina as principais skills exigidas nas vagas que você
              está buscando.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {missingSkills.slice(0, 5).map((gap) => (
              <div key={gap.skill.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className="mr-2 border-red-300 text-red-500"
                    >
                      {gap.skill.name}
                    </Badge>
                    <span className="text-xs text-black/60">
                      {gap.prevalence}% das vagas
                    </span>
                  </div>
                  {gap.prevalence > 50 && (
                    <AlertCircle size={14} className="text-red-500" />
                  )}
                </div>

                <Progress
                  value={gap.prevalence}
                  className="h-2 bg-black/10"
                  indicatorClassName="bg-conecta-blue"
                />

                <div className="border-l-2 border-conecta-blue/20 pl-3 py-1">
                  <p className="text-xs text-black/70">
                    {gap.skill.category === "database" ? (
                      <>
                        As vagas que pedem <strong>{gap.skill.name}</strong>{" "}
                        geralmente também requerem conhecimentos em Node.js e
                        Express.
                      </>
                    ) : gap.skill.category === "backend" ? (
                      <>
                        Vagas de backend com <strong>{gap.skill.name}</strong>{" "}
                        geralmente também pedem conhecimento em bancos de dados
                        SQL.
                      </>
                    ) : gap.skill.category === "frontend" ? (
                      <>
                        Desenvolvedores que dominam{" "}
                        <strong>{gap.skill.name}</strong> têm 70% mais chances
                        de conseguir vagas de frontend.
                      </>
                    ) : (
                      <>
                        A skill <strong>{gap.skill.name}</strong> aparece
                        frequentemente em vagas para desenvolvedores fullstack.
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <a
                href="#"
                className="text-sm text-conecta-blue hover:underline flex items-center"
              >
                <BookOpen size={14} className="mr-1" />
                Ver cursos recomendados
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillGapCard;
