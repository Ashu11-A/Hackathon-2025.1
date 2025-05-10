import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  MapPin,
  Briefcase,
  Database,
  Code,
  Building,
  X,
  RefreshCw,
} from "lucide-react";
import { skills } from "@/lib/data";

// Extrair localizações únicas dos dados
const locations = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Brasília, DF",
  "Curitiba, PR",
];

interface InternshipFiltersProps {
  onSkillFilterChange: (skills: string[]) => void;
  onLocationFilterChange: (locations: string[]) => void;
  onRemoteFilterChange: (remote: boolean | null) => void;
  onSalaryRangeChange: (range: [number, number]) => void;
  selectedSkills: string[];
  selectedLocations: string[];
  remoteFilter: boolean | null;
  salaryRange: [number, number];
  onClearFilters: () => void;
}

const InternshipFilters = ({
  onSkillFilterChange,
  onLocationFilterChange,
  onRemoteFilterChange,
  onSalaryRangeChange,
  selectedSkills,
  selectedLocations,
  remoteFilter,
  salaryRange,
  onClearFilters,
}: InternshipFiltersProps) => {
  const handleSkillChange = (skillId: string) => {
    const newSelection = selectedSkills.includes(skillId)
      ? selectedSkills.filter((id) => id !== skillId)
      : [...selectedSkills, skillId];

    onSkillFilterChange(newSelection);
  };

  const handleLocationChange = (location: string) => {
    const newSelection = selectedLocations.includes(location)
      ? selectedLocations.filter((loc) => loc !== location)
      : [...selectedLocations, location];

    onLocationFilterChange(newSelection);
  };

  const handleRemoteChange = (value: boolean) => {
    onRemoteFilterChange(remoteFilter === value ? null : value);
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Card className="border-conecta-blue/10">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-conecta-blue">
            Filtros
          </CardTitle>

          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-black/60 hover:text-conecta-blue"
            onClick={onClearFilters}
          >
            <RefreshCw size={14} className="mr-1" />
            Limpar
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Modalidade */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center">
            <Briefcase size={16} className="mr-2" /> Modalidade
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remote"
                checked={remoteFilter === true}
                onCheckedChange={() => handleRemoteChange(true)}
              />
              <Label htmlFor="remote" className="text-sm font-normal">
                Remoto
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="presential"
                checked={remoteFilter === false}
                onCheckedChange={() => handleRemoteChange(false)}
              />
              <Label htmlFor="presential" className="text-sm font-normal">
                Presencial
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Localização */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center">
            <MapPin size={16} className="mr-2" /> Localização
          </h3>
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={selectedLocations.includes(location)}
                  onCheckedChange={() => handleLocationChange(location)}
                />
                <Label
                  htmlFor={`location-${location}`}
                  className="text-sm font-normal"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Faixa Salarial */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center">
            <Building size={16} className="mr-2" /> Faixa Salarial
          </h3>
          <div className="space-y-6">
            <Slider
              defaultValue={salaryRange}
              min={0}
              max={5000}
              step={100}
              onValueChange={(value) =>
                onSalaryRangeChange(value as [number, number])
              }
              className="my-6"
            />
            <div className="flex justify-between items-center text-sm">
              <span>{formatCurrency(salaryRange[0])}</span>
              <span>{formatCurrency(salaryRange[1])}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Skills */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center">
            <Code size={16} className="mr-2" /> Skills
          </h3>
          <div className="space-y-1">
            <h4 className="text-xs font-medium mb-2 text-black/60">Frontend</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills
                .filter((skill) => skill.category === "frontend")
                .map((skill) => (
                  <Badge
                    key={skill.id}
                    variant={
                      selectedSkills.includes(skill.id) ? "default" : "outline"
                    }
                    className={`cursor-pointer ${
                      selectedSkills.includes(skill.id)
                        ? "bg-conecta-blue text-white"
                        : "hover:bg-conecta-blue/10 border-conecta-blue/20"
                    }`}
                    onClick={() => handleSkillChange(skill.id)}
                  >
                    {skill.name}
                  </Badge>
                ))}
            </div>

            <h4 className="text-xs font-medium mb-2 text-black/60">Backend</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills
                .filter((skill) => skill.category === "backend")
                .map((skill) => (
                  <Badge
                    key={skill.id}
                    variant={
                      selectedSkills.includes(skill.id) ? "default" : "outline"
                    }
                    className={`cursor-pointer ${
                      selectedSkills.includes(skill.id)
                        ? "bg-conecta-blue text-white"
                        : "hover:bg-conecta-blue/10 border-conecta-blue/20"
                    }`}
                    onClick={() => handleSkillChange(skill.id)}
                  >
                    {skill.name}
                  </Badge>
                ))}
            </div>

            <h4 className="text-xs font-medium mb-2 text-black/60">
              Banco de Dados
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills
                .filter((skill) => skill.category === "database")
                .map((skill) => (
                  <Badge
                    key={skill.id}
                    variant={
                      selectedSkills.includes(skill.id) ? "default" : "outline"
                    }
                    className={`cursor-pointer ${
                      selectedSkills.includes(skill.id)
                        ? "bg-conecta-blue text-white"
                        : "hover:bg-conecta-blue/10 border-conecta-blue/20"
                    }`}
                    onClick={() => handleSkillChange(skill.id)}
                  >
                    {skill.name}
                  </Badge>
                ))}
            </div>

            <h4 className="text-xs font-medium mb-2 text-black/60">DevOps</h4>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((skill) => skill.category === "devops")
                .map((skill) => (
                  <Badge
                    key={skill.id}
                    variant={
                      selectedSkills.includes(skill.id) ? "default" : "outline"
                    }
                    className={`cursor-pointer ${
                      selectedSkills.includes(skill.id)
                        ? "bg-conecta-blue text-white"
                        : "hover:bg-conecta-blue/10 border-conecta-blue/20"
                    }`}
                    onClick={() => handleSkillChange(skill.id)}
                  >
                    {skill.name}
                  </Badge>
                ))}
            </div>
          </div>
        </div>

        {(selectedSkills.length > 0 ||
          selectedLocations.length > 0 ||
          remoteFilter !== null) && (
          <>
            <Separator />

            <div>
              <h3 className="text-sm font-semibold mb-3">Filtros Ativos</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skillId) => {
                  const skill = skills.find((s) => s.id === skillId);
                  return (
                    <Badge
                      key={skillId}
                      variant="default"
                      className="bg-conecta-blue text-white pr-1"
                    >
                      {skill?.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1 text-white hover:text-white hover:bg-conecta-darkblue rounded-full"
                        onClick={() => handleSkillChange(skillId)}
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  );
                })}

                {selectedLocations.map((location) => (
                  <Badge
                    key={location}
                    variant="default"
                    className="bg-conecta-blue text-white pr-1"
                  >
                    {location}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 text-white hover:text-white hover:bg-conecta-darkblue rounded-full"
                      onClick={() => handleLocationChange(location)}
                    >
                      <X size={10} />
                    </Button>
                  </Badge>
                ))}

                {remoteFilter !== null && (
                  <Badge
                    variant="default"
                    className="bg-conecta-blue text-white pr-1"
                  >
                    {remoteFilter ? "Remoto" : "Presencial"}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 text-white hover:text-white hover:bg-conecta-darkblue rounded-full"
                      onClick={() => onRemoteFilterChange(null)}
                    >
                      <X size={10} />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InternshipFilters;
