import React, { useState, useEffect } from "react";
import {
  getInternships,
  getUserProfile,
  getRecommendedInternships,
  getSkillGapAnalysis,
} from "@/lib/localStorage";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InternshipList from "@/components/dashboard/InternshipList";
import InternshipFilters from "@/components/dashboard/InternshipFilters";
import SkillGapCard from "@/components/dashboard/SkillGapCard";
import RecommendationSection from "@/components/dashboard/RecommendationSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Internship, Skill } from "@/lib/types";
import { toast } from "sonner";

const Dashboard = () => {
  // Estado para dados
  const [userProfile, setUserProfile] = useState<any>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [recommendedInternships, setRecommendedInternships] = useState<
    Internship[]
  >([]);
  const [skillGaps, setSkillGaps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estado para filtros
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [remoteFilter, setRemoteFilter] = useState<string | null>(null);
  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 5000]);

  useEffect(() => {
    const loadData = () => {
      try {
        setIsLoading(true);

        // Obter perfil do usuário e vagas
        const profile = getUserProfile();
        const allInternships = getInternships();

        setUserProfile(profile);
        setInternships(allInternships);

        // Obter estágios recomendados
        const recommendations = getRecommendedInternships(
          profile,
          allInternships
        );
        setRecommendedInternships(recommendations);

        // Obter análise de gap de habilidades
        const gaps = getSkillGapAnalysis(profile.skills, allInternships);
        setSkillGaps(gaps);

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar dados");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtragem de estágios baseada nos critérios
  const filteredInternships = internships.filter((internship) => {
    // Filtro de busca
    if (
      searchTerm &&
      !internship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !internship.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filtro de localidade
    if (
      locationFilter.length > 0 &&
      !locationFilter.includes(internship.location)
    ) {
      return false;
    }

    // Filtro de trabalho remoto
    if (remoteFilter === "remote" && !internship.remote) {
      return false;
    } else if (remoteFilter === "in-person" && internship.remote) {
      return false;
    }

    // Filtro de habilidades
    if (skillFilter.length > 0) {
      const internshipSkillIds = internship.requiredSkills.map(
        (skill) => skill.id
      );
      if (!skillFilter.some((id) => internshipSkillIds.includes(id))) {
        return false;
      }
    }

    // Filtro de faixa salarial
    if (
      internship.salary &&
      (internship.salary < salaryRange[0] || internship.salary > salaryRange[1])
    ) {
      return false;
    }

    return true;
  });

  // Filtragem de recomendações baseada nos mesmos critérios
  const filteredRecommendations = recommendedInternships.filter(
    (internship) => {
      // Filtro de busca
      if (
        searchTerm &&
        !internship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !internship.company.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filtro de localidade
      if (
        locationFilter.length > 0 &&
        !locationFilter.includes(internship.location)
      ) {
        return false;
      }

      // Filtro de trabalho remoto
      if (remoteFilter === "remote" && !internship.remote) {
        return false;
      } else if (remoteFilter === "in-person" && internship.remote) {
        return false;
      }

      // Filtro de faixa salarial
      if (
        internship.salary &&
        (internship.salary < salaryRange[0] ||
          internship.salary > salaryRange[1])
      ) {
        return false;
      }

      return true;
    }
  );

  const handleSkillFilterChange = (skills: string[]) => {
    setSkillFilter(skills);
  };

  const handleLocationFilterChange = (locations: string[]) => {
    setLocationFilter(locations);
  };

  const handleRemoteFilterChange = (option: string | null) => {
    setRemoteFilter(option);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSalaryRangeChange = (range: [number, number]) => {
    setSalaryRange(range);
  };

  const clearFilters = () => {
    setLocationFilter([]);
    setRemoteFilter(null);
    setSkillFilter([]);
    setSearchTerm("");
    setSalaryRange([0, 5000]);
  };

  if (isLoading || !userProfile) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p>Carregando dados do dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Painel de Vagas"
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 lg:col-span-2">
          <RecommendationSection
            recommendations={recommendedInternships.slice(0, 3)}
            title="Recomendado para você"
            description="Com base no seu perfil, estas são as vagas que mais combinam com você."
          />
        </div>
        <div className="col-span-1">
          <SkillGapCard skillGaps={skillGaps} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1">
          <InternshipFilters
            onSkillFilterChange={handleSkillFilterChange}
            onLocationFilterChange={handleLocationFilterChange}
            onRemoteFilterChange={handleRemoteFilterChange}
            onSalaryRangeChange={handleSalaryRangeChange}
            selectedSkills={skillFilter}
            selectedLocations={locationFilter}
            remoteFilter={remoteFilter}
            salaryRange={salaryRange}
            onClearFilters={clearFilters}
          />
        </div>

        <div className="col-span-1 lg:col-span-3">
          <Tabs defaultValue="todas" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="todas">
                Todas as Vagas ({filteredInternships.length})
              </TabsTrigger>
              <TabsTrigger value="recomendadas">
                Recomendadas ({filteredRecommendations.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="todas" className="mt-0">
              <InternshipList
                internships={filteredInternships}
                userSkills={userProfile.skills}
              />
            </TabsContent>

            <TabsContent value="recomendadas" className="mt-0">
              <InternshipList
                internships={filteredRecommendations}
                userSkills={userProfile.skills}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
