import React, { useState, useEffect } from "react";
import {
  getInternships,
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
import { Internship, Skill, UserProfile } from "@/lib/types";
import { toast } from "sonner";
import { useApi } from "@/contexts/ApiContext";

const Dashboard = () => {
  // Data state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [recommendedInternships, setRecommendedInternships] = useState<Internship[]>([]);
  const [skillGaps, setSkillGaps] = useState<{ skill: Skill; count: number; percentage: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [remoteFilter, setRemoteFilter] = useState<boolean | null>(null);
  const [skillFilter, setSkillFilter] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 5000]);

  const api = useApi();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Get user profile and internships
        const profile = await api.profile();
        const allInternships = getInternships();

        setUserProfile(profile);
        setInternships(allInternships);

        // Get recommended internships
        const recommendations = getRecommendedInternships(profile, allInternships);
        setRecommendedInternships(recommendations);

        // Get skill gap analysis
        const gaps = getSkillGapAnalysis(profile.skills, allInternships);
        setSkillGaps(gaps);

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Error loading data");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter internships based on criteria
  const filteredInternships = internships.filter((internship) => {
    // Search filter
    if (
      searchTerm &&
      !internship.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !internship.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Location filter
    if (
      locationFilter.length > 0 &&
      !locationFilter.includes(internship.company.location)
    ) {
      return false;
    }

    // Skills filter
    if (skillFilter.length > 0) {
      const internshipSkillIds = internship.skills.map((skill) => skill.id);
      if (!skillFilter.some((id) => internshipSkillIds.includes(id))) {
        return false;
      }
    }

    // Salary range filter
    if (
      internship.salary &&
      (internship.salary < salaryRange[0] || internship.salary > salaryRange[1])
    ) {
      return false;
    }

    return true;
  });

  // Filter recommendations based on same criteria
  const filteredRecommendations = recommendedInternships.filter((internship) => {
    // Search filter
    if (
      searchTerm &&
      !internship.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !internship.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Location filter
    if (
      locationFilter.length > 0 &&
      !locationFilter.includes(internship.company.location)
    ) {
      return false;
    }

    // Salary range filter
    if (
      internship.salary &&
      (internship.salary < salaryRange[0] || internship.salary > salaryRange[1])
    ) {
      return false;
    }

    return true;
  });

  const handleSkillFilterChange = (skills: number[]) => {
    setSkillFilter(skills);
  };

  const handleLocationFilterChange = (locations: string[]) => {
    setLocationFilter(locations);
  };

  const handleRemoteFilterChange = (remote: boolean | null) => {
    setRemoteFilter(remote);
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
          <p>Loading dashboard data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Internship Dashboard"
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 lg:col-span-2">
          <RecommendationSection
            recommendations={recommendedInternships.slice(0, 3)}
            title="Recommended for you"
            description="Based on your profile, these are the internships that best match your skills."
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
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                All Internships ({filteredInternships.length})
              </TabsTrigger>
              <TabsTrigger value="recommended">
                Recommended ({filteredRecommendations.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <InternshipList
                internships={filteredInternships}
                userSkills={userProfile.skills}
              />
            </TabsContent>

            <TabsContent value="recommended" className="mt-0">
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
