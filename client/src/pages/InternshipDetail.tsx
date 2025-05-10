import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Calendar,
  MapPin,
  Globe,
  Clock,
  ChevronLeft,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Info,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  getInternshipById,
  hasApplied,
  createApplication,
  getUserProfile,
} from "@/lib/localStorage";
import { Skill } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const InternshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [userSkillIds, setUserSkillIds] = useState<string[]>([]);

  useEffect(() => {
    const loadInternship = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!id) {
          setError("ID da vaga não fornecido");
          return;
        }

        // Simulando um atraso de carregamento para demonstrar o estado de loading
        setTimeout(() => {
          const internshipData = getInternshipById(id);

          if (!internshipData) {
            setError("Vaga não encontrada");
            return;
          }

          setInternship(internshipData);
          setAlreadyApplied(hasApplied(id));

          // Obter as skills do usuário
          const profile = getUserProfile();
          setUserSkillIds(profile.skills.map((skill) => skill.id));

          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Erro ao carregar detalhes da vaga");
        setIsLoading(false);
      }
    };

    loadInternship();
  }, [id]);

  const handleApply = async () => {
    try {
      setIsApplying(true);

      // Simulando um atraso para demonstrar o processamento
      setTimeout(() => {
        if (!id) {
          toast.error("ID da vaga não fornecido");
          setIsApplying(false);
          return;
        }

        const application = createApplication(id, coverLetter);

        if (application) {
          toast.success("Candidatura enviada com sucesso!");
          setAlreadyApplied(true);
        } else {
          toast.error("Não foi possível completar sua candidatura");
        }

        setIsApplying(false);
      }, 1000);
    } catch (err) {
      toast.error("Erro ao processar candidatura");
      setIsApplying(false);
    }
  };

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

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-2" onClick={() => navigate(-1)}>
            <ChevronLeft size={16} className="mr-1" /> Voltar
          </Button>
          <Skeleton className="h-8 w-1/3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <Skeleton className="h-16 w-16 rounded mr-4" />
                  <div className="flex-1">
                    <Skeleton className="h-7 w-2/3 mb-2" />
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                </div>

                <Separator className="my-4" />

                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-10 w-full mb-3" />
                <Skeleton className="h-10 w-full mb-3" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !internship) {
    return (
      <DashboardLayout>
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-2" onClick={() => navigate(-1)}>
            <ChevronLeft size={16} className="mr-1" /> Voltar
          </Button>
          <h1 className="text-2xl font-bold">Detalhes da Vaga</h1>
        </div>

        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            {error || "Não foi possível carregar os detalhes da vaga"}
          </AlertDescription>
        </Alert>

        <Button onClick={() => navigate("/jobs")}>Ver outras vagas</Button>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-2" onClick={() => navigate(-1)}>
          <ChevronLeft size={16} className="mr-1" /> Voltar
        </Button>
        <h1 className="text-2xl font-bold text-conecta-blue">
          {internship.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-conecta-blue/10 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="h-16 w-16 rounded bg-white p-2 shadow flex items-center justify-center border mr-4">
                  {internship.company.logo ? (
                    <img
                      src={internship.company.logo}
                      alt={internship.company.name}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    <Building className="h-8 w-8 text-conecta-blue" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {internship.company.name}
                  </h2>
                  <p className="text-black/60">{internship.company.industry}</p>
                  <div className="flex space-x-4 mt-2">
                    {internship.company.website && (
                      <a
                        href={internship.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-conecta-blue hover:underline text-sm flex items-center"
                      >
                        <Globe size={14} className="mr-1" /> Website
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 my-4">
                <div className="flex items-center text-sm text-black/70">
                  <MapPin size={14} className="mr-1" />
                  {internship.location}
                </div>

                <div className="flex items-center text-sm text-black/70">
                  <Briefcase size={14} className="mr-1" />
                  {internship.duration}
                </div>

                <div className="flex items-center text-sm text-black/70">
                  <Calendar size={14} className="mr-1" />
                  Publicado em {internship.posted.toLocaleDateString("pt-BR")}
                </div>

                {internship.deadline && (
                  <div className="flex items-center text-sm text-black/70">
                    <Clock size={14} className="mr-1" />
                    Prazo até {internship.deadline.toLocaleDateString("pt-BR")}
                  </div>
                )}

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
              </div>

              <Separator className="my-4" />

              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Descrição</TabsTrigger>
                  <TabsTrigger value="requirements">Requisitos</TabsTrigger>
                  <TabsTrigger value="company">Sobre a Empresa</TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                  <div className="prose prose-blue max-w-none">
                    <p className="text-black/80 whitespace-pre-line">
                      {internship.description}
                    </p>

                    {internship.salary && (
                      <div className="mt-4">
                        <h3 className="text-lg font-medium mb-1">
                          Remuneração
                        </h3>
                        <p className="font-medium text-conecta-blue">
                          {formatCurrency(internship.salary)}/mês
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="requirements">
                  <div>
                    {internship.requiredSkills.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">
                          Requisitos Obrigatórios
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {internship.requiredSkills.map((skill: Skill) => (
                            <Badge
                              key={skill.id}
                              variant={
                                isSkillMatch(skill) ? "default" : "outline"
                              }
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
                        {internship.requiredSkills.some(
                          (skill: Skill) => !isSkillMatch(skill)
                        ) && (
                          <Alert className="mt-3 bg-amber-50 border-amber-200">
                            <Info className="h-4 w-4 text-amber-600" />
                            <AlertTitle className="text-amber-800">
                              Habilidades faltantes
                            </AlertTitle>
                            <AlertDescription className="text-amber-700">
                              Você não possui todas as habilidades obrigatórias
                              para esta vaga. Considere desenvolvê-las para
                              aumentar suas chances.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    )}

                    {internship.recommendedSkills.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Requisitos Desejáveis
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {internship.recommendedSkills.map((skill: Skill) => (
                            <Badge
                              key={skill.id}
                              variant={
                                isSkillMatch(skill) ? "default" : "outline"
                              }
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
                </TabsContent>

                <TabsContent value="company">
                  <div className="prose prose-blue max-w-none">
                    <p className="text-black/80 whitespace-pre-line">
                      {internship.company.description ||
                        "Não há informações detalhadas sobre esta empresa."}
                    </p>

                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-1">Localização</h3>
                      <p className="text-black/80">
                        {internship.company.location}
                      </p>
                    </div>

                    {internship.company.website && (
                      <div className="mt-4">
                        <h3 className="text-lg font-medium mb-1">Website</h3>
                        <a
                          href={internship.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-conecta-blue hover:underline"
                        >
                          {internship.company.website}
                        </a>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="border-conecta-blue/10 sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Candidate-se agora</h2>

              {alreadyApplied ? (
                <Alert className="bg-green-50 border-green-200 mb-4">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">
                    Candidatura enviada
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Você já se candidatou a esta vaga. Acompanhe o status na
                    seção de candidaturas.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-black/80 mb-2">
                      Escreva uma mensagem de apresentação (opcional):
                    </p>
                    <Textarea
                      placeholder="Conte por que você é um bom candidato para esta vaga..."
                      className="w-full"
                      rows={6}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full bg-conecta-blue hover:bg-conecta-darkblue"
                    disabled={isApplying}
                    onClick={handleApply}
                  >
                    {isApplying ? (
                      <>Processando...</>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" /> Enviar Candidatura
                      </>
                    )}
                  </Button>
                </>
              )}

              <div className="mt-4 text-sm text-black/60">
                <p className="flex items-start">
                  <Info size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                  Candidatos inscritos: {internship.applications || 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InternshipDetail;
