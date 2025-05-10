import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Skill } from "@/lib/types";

interface InternshipFiltersProps {
  onSkillFilterChange: (skills: number[]) => void;
  onLocationFilterChange: (locations: string[]) => void;
  onRemoteFilterChange: (remote: boolean | null) => void;
  onSalaryRangeChange: (range: [number, number]) => void;
  selectedSkills: number[];
  selectedLocations: string[];
  remoteFilter: boolean | null;
  salaryRange: [number, number];
  onClearFilters: () => void;
}

const InternshipFilters: React.FC<InternshipFiltersProps> = ({
  onSkillFilterChange,
  onLocationFilterChange,
  onRemoteFilterChange,
  onSalaryRangeChange,
  selectedSkills,
  selectedLocations,
  remoteFilter,
  salaryRange,
  onClearFilters,
}) => {
  // Mock data - replace with actual data from API
  const skills: Skill[] = [
    { id: 1, name: "React", category: "frontend" },
    { id: 2, name: "Node.js", category: "backend" },
    { id: 3, name: "TypeScript", category: "frontend" },
    { id: 4, name: "Python", category: "backend" },
    { id: 5, name: "SQL", category: "database" },
  ];

  const locations = ["New York", "San Francisco", "London", "Berlin", "Tokyo"];

  const handleSkillChange = (skillId: number) => {
    const newSelectedSkills = selectedSkills.includes(skillId)
      ? selectedSkills.filter((id) => id !== skillId)
      : [...selectedSkills, skillId];
    onSkillFilterChange(newSelectedSkills);
  };

  const handleLocationChange = (location: string) => {
    const newSelectedLocations = selectedLocations.includes(location)
      ? selectedLocations.filter((loc) => loc !== location)
      : [...selectedLocations, location];
    onLocationFilterChange(newSelectedLocations);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skills Filter */}
        <div className="space-y-4">
          <Label>Skills</Label>
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${skill.id}`}
                  checked={selectedSkills.includes(skill.id)}
                  onCheckedChange={() => handleSkillChange(skill.id)}
                />
                <Label htmlFor={`skill-${skill.id}`}>{skill.name}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-4">
          <Label>Location</Label>
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={selectedLocations.includes(location)}
                  onCheckedChange={() => handleLocationChange(location)}
                />
                <Label htmlFor={`location-${location}`}>{location}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Remote Work Filter */}
        <div className="space-y-4">
          <Label>Work Type</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remote"
                checked={remoteFilter === true}
                onCheckedChange={(checked) => onRemoteFilterChange(checked ? true : null)}
              />
              <Label htmlFor="remote">Remote</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-person"
                checked={remoteFilter === false}
                onCheckedChange={(checked) => onRemoteFilterChange(checked ? false : null)}
              />
              <Label htmlFor="in-person">In-person</Label>
            </div>
          </div>
        </div>

        {/* Salary Range Filter */}
        <div className="space-y-4">
          <Label>Salary Range</Label>
          <div className="space-y-4">
            <Slider
              min={0}
              max={5000}
              step={100}
              value={salaryRange}
              onValueChange={onSalaryRangeChange}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${salaryRange[0]}</span>
              <span>${salaryRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default InternshipFilters;
