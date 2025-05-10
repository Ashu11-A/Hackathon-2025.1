import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  title: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const DashboardHeader = ({
  title,
  searchTerm,
  onSearchChange,
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold text-conecta-blue">
          {title}
        </h1>
        <p className="text-black/60 mt-1">
          Encontre as melhores oportunidades de estágio compatíveis com seu
          perfil
        </p>
      </div>

      <div className="relative max-w-md w-full">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40"
          size={18}
        />
        <Input
          type="text"
          placeholder="Buscar vagas..."
          className="pl-10 pr-4 py-2 border-conecta-blue/20 focus:border-conecta-blue"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
