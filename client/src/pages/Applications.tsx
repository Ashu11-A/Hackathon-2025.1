import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock3,
  XCircle,
  Search,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getUserApplications, getInternshipById } from "@/lib/localStorage";
import { UserApplication } from "@/lib/localStorage";
import { Internship } from "@/lib/types";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState<
    (UserApplication & { internship?: Internship })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApplications = () => {
      try {
        setIsLoading(true);

        // Obter candidaturas do usuário
        const userApplications = getUserApplications();

        // Para cada candidatura, obter os detalhes da vaga
        const applicationsWithInternship = userApplications.map((app) => {
          const internship = getInternshipById(app.internshipId);
          return {
            ...app,
            internship,
          };
        });

        setApplications(applicationsWithInternship);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar candidaturas:", error);
        setIsLoading(false);
      }
    };

    loadApplications();
  }, []);

  const filteredApplications = applications.filter(
    (app) =>
      app.internship?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.internship?.company.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            <Clock3 className="w-3 h-3 mr-1" /> Em Análise
          </Badge>
        );
      case "interview":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            <AlertCircle className="w-3 h-3 mr-1" /> Entrevista Agendada
          </Badge>
        );
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" /> Aprovado
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <XCircle className="w-3 h-3 mr-1" /> Não Selecionado
          </Badge>
        );
      default:
        return null;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "interview":
        return "bg-blue-500";
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardHeader
          title="Minhas Candidaturas"
          searchTerm=""
          onSearchChange={() => {}}
        />
        <div className="text-center py-8">
          <p>Carregando suas candidaturas...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Minhas Candidaturas"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {applications.length === 0 ? (
        <Card className="border-conecta-blue/10">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-conecta-blue/50 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Nenhuma candidatura encontrada
            </h2>
            <p className="text-black/60 mb-6">
              Você ainda não se candidatou a nenhuma vaga. Explore as vagas
              disponíveis e encontre a oportunidade perfeita para você!
            </p>
            <Button asChild>
              <Link to="/jobs">
                <Search className="mr-2 h-4 w-4" /> Explorar Vagas
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white border-conecta-blue/10">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-3xl font-bold text-conecta-blue mb-2">
                    {applications.length}
                  </div>
                  <p className="text-black/60 text-sm">Total de Candidaturas</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-conecta-blue/10">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    {applications.filter((a) => a.status === "pending").length}
                  </div>
                  <p className="text-black/60 text-sm">Em Análise</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-conecta-blue/10">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-3xl font-bold text-blue-500 mb-2">
                    {
                      applications.filter((a) => a.status === "interview")
                        .length
                    }
                  </div>
                  <p className="text-black/60 text-sm">Em Entrevista</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-conecta-blue/10">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    {applications.filter((a) => a.status === "approved").length}
                  </div>
                  <p className="text-black/60 text-sm">Aprovadas</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                Todas ({applications.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Em Análise (
                {applications.filter((a) => a.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="interview">
                Entrevista (
                {applications.filter((a) => a.status === "interview").length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Aprovadas (
                {applications.filter((a) => a.status === "approved").length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Não Selecionadas (
                {applications.filter((a) => a.status === "rejected").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    getStatusBadge={getStatusBadge}
                    getProgressColor={getProgressColor}
                  />
                ))}

                {filteredApplications.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-black/60 text-lg">
                      Nenhuma candidatura encontrada com os termos de busca.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="space-y-4">
                {filteredApplications
                  .filter((app) => app.status === "pending")
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      getStatusBadge={getStatusBadge}
                      getProgressColor={getProgressColor}
                    />
                  ))}

                {filteredApplications.filter((app) => app.status === "pending")
                  .length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-black/60 text-lg">
                      Nenhuma candidatura em análise.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="interview">
              <div className="space-y-4">
                {filteredApplications
                  .filter((app) => app.status === "interview")
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      getStatusBadge={getStatusBadge}
                      getProgressColor={getProgressColor}
                    />
                  ))}

                {filteredApplications.filter(
                  (app) => app.status === "interview"
                ).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-black/60 text-lg">
                      Nenhuma candidatura em fase de entrevista.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="approved">
              <div className="space-y-4">
                {filteredApplications
                  .filter((app) => app.status === "approved")
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      getStatusBadge={getStatusBadge}
                      getProgressColor={getProgressColor}
                    />
                  ))}

                {filteredApplications.filter((app) => app.status === "approved")
                  .length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-black/60 text-lg">
                      Nenhuma candidatura aprovada.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="rejected">
              <div className="space-y-4">
                {filteredApplications
                  .filter((app) => app.status === "rejected")
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      getStatusBadge={getStatusBadge}
                      getProgressColor={getProgressColor}
                    />
                  ))}

                {filteredApplications.filter((app) => app.status === "rejected")
                  .length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-black/60 text-lg">
                      Nenhuma candidatura não selecionada.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </DashboardLayout>
  );
};

interface ApplicationCardProps {
  application: UserApplication & { internship?: Internship };
  getStatusBadge: (status: string) => React.ReactNode;
  getProgressColor: (status: string) => string;
}

const ApplicationCard = ({
  application,
  getStatusBadge,
  getProgressColor,
}: ApplicationCardProps) => {
  if (!application.internship) {
    return (
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Vaga não encontrada</AlertTitle>
        <AlertDescription>
          Não foi possível carregar os detalhes da vaga (ID:{" "}
          {application.internshipId}).
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card
      key={application.id}
      className="overflow-hidden border-conecta-blue/10"
    >
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 bg-conecta-blue/10 rounded-md flex items-center justify-center overflow-hidden">
                {application.internship.company.logo ? (
                  <img
                    src={application.internship.company.logo}
                    alt={application.internship.company.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building className="h-6 w-6 text-conecta-blue" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-black">
                    {application.internship.title}
                  </h3>
                  <div className="flex items-center text-black/60 text-sm mt-1">
                    <Building size={14} className="mr-1" />
                    {application.internship.company.name}
                    <span className="mx-2">•</span>
                    <MapPin size={14} className="mr-1" />
                    {application.internship.location}
                  </div>
                </div>
                <div>{getStatusBadge(application.status)}</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-black/60">Progresso da candidatura</span>
              <span className="font-medium">{application.progress}%</span>
            </div>
            <Progress
              value={application.progress}
              indicatorClassName={getProgressColor(application.status)}
              className="h-2 bg-gray-100"
            />
          </div>

          <div className="flex text-sm text-black/60">
            <Calendar size={14} className="mr-1" /> Aplicado em:{" "}
            {format(new Date(application.appliedAt), "dd/MM/yyyy")} ({" "}
            {formatDistance(new Date(application.appliedAt), new Date(), {
              addSuffix: true,
              locale: ptBR,
            })}
            )
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {application.steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col items-center",
                    (step.completed || step.current) && "text-conecta-blue",
                    !step.completed && !step.current && "text-black/40"
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full mb-1",
                      step.completed && "bg-conecta-blue",
                      step.current && "border-2 border-conecta-blue",
                      !step.completed && !step.current && "bg-gray-200"
                    )}
                  ></div>
                  <span className="text-xs hidden lg:inline">{step.name}</span>
                </div>
              ))}
            </div>

            <Button
              className="bg-conecta-blue hover:bg-conecta-darkblue"
              asChild
            >
              <Link to={`/jobs/${application.internshipId}`}>
                Ver Vaga <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Applications;
