import React, { ReactNode, useState, useEffect } from "react";
import { userProfile } from "@/lib/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  Briefcase,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { isLoggedIn, logout } from "@/lib/localStorage";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Verificar se o usuário está logado
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <header className="bg-conecta-blue text-white py-3 px-4 flex justify-between items-center shadow-md z-30 relative">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="p-0 mr-4 text-white hover:bg-conecta-darkblue lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <Link to="/" className="flex items-center">
            <span className="bg-white text-conecta-blue px-2 py-1 rounded mr-1 font-bold">
              C
            </span>
            <span className="text-xl font-semibold">onectaIDP</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="p-1.5 text-white hover:bg-conecta-darkblue relative"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="bg-conecta-blue/20 text-conecta-blue">
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{userProfile.name}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 w-64 bg-white border-r shadow-sm transform transition-transform z-20 pt-16",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="px-4 mb-6 mt-4">
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={userProfile.avatar}
                    alt={userProfile.name}
                  />
                  <AvatarFallback className="bg-conecta-blue/20 text-conecta-blue">
                    {userProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-black">{userProfile.name}</p>
                  <p className="text-sm text-black/60">Estudante</p>
                </div>
              </div>

              <p className="text-sm text-black/80">{userProfile.bio}</p>
            </div>

            <nav className="space-y-1 px-2 flex-1">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start py-2",
                  currentPath === "/dashboard"
                    ? "bg-conecta-blue/10 text-conecta-blue"
                    : "text-black hover:text-conecta-blue hover:bg-conecta-blue/5"
                )}
                asChild
              >
                <Link to="/dashboard">
                  <LayoutGrid className="mr-2 h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start py-2",
                  currentPath === "/jobs"
                    ? "bg-conecta-blue/10 text-conecta-blue"
                    : "text-black hover:text-conecta-blue hover:bg-conecta-blue/5"
                )}
                asChild
              >
                <Link to="/jobs">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Vagas
                </Link>
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start py-2",
                  currentPath === "/applications"
                    ? "bg-conecta-blue/10 text-conecta-blue"
                    : "text-black hover:text-conecta-blue hover:bg-conecta-blue/5"
                )}
                asChild
              >
                <Link to="/applications">
                  <FileText className="mr-2 h-5 w-5" />
                  Minhas Candidaturas
                </Link>
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start py-2",
                  currentPath === "/profile"
                    ? "bg-conecta-blue/10 text-conecta-blue"
                    : "text-black hover:text-conecta-blue hover:bg-conecta-blue/5"
                )}
                asChild
              >
                <Link to="/profile">
                  <User className="mr-2 h-5 w-5" />
                  Meu Perfil
                </Link>
              </Button>
            </nav>

            <div className="p-4 mt-auto">
              <Separator className="my-4" />
              <Button
                variant="ghost"
                className="w-full justify-start text-black hover:text-conecta-blue hover:bg-conecta-blue/5"
              >
                <Settings className="mr-2 h-5 w-5" />
                Configurações
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-black hover:text-conecta-blue hover:bg-conecta-blue/5"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sair
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay when sidebar is open on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:pl-72">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
