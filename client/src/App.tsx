import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ApiProvider } from "@/contexts/ApiContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import ChatBot from "./components/ChatBot";
import LetsGetStarted from './components/LetsGetStarted';
import Dashboard from "./pages/dashboard";
import GithubLogin from "./components/GithubLogin";

// Create the client as a constant outside the component
const queryClient = new QueryClient();

// Define App as a proper function component
const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<ChatBot />} />
                <Route path="/lets-get-started" element={<LetsGetStarted />} />
                <Route path="/github" element={<GithubLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Rotas protegidas (requerem autenticação) 
                <Route path="/applications" element={<Applications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/jobs/:id" element={<InternshipDetail />} />
                */}

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ApiProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
