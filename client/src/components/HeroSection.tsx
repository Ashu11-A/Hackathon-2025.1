import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white pt-16"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text-blue">ConectaIDP:</span> A vaga
              certa para o seu perfil, com ajuda da IA.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Nosso sistema entende quem você é e conecta você às melhores
              oportunidades de estágio em tecnologia.
            </p>
            <Button
              onClick={() =>
                document
                  .getElementById("howworks")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              className="btn-primary group"
            >
              Descubra como funciona
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
              <div className="relative">
                <svg
                  className="w-full max-w-lg animate-float"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#1E40AF"
                    d="M45.7,-78.5C58.9,-69.2,69.3,-55.4,76.3,-40.7C83.3,-26.1,87,-10.5,85.8,4.7C84.5,19.8,78.3,34.6,69.2,47.5C60,60.4,48,71.6,34.2,77.8C20.3,84.1,4.6,85.5,-11.3,83.6C-27.2,81.7,-43.4,76.5,-55.9,66.7C-68.5,56.9,-77.4,42.4,-82.5,26.8C-87.5,11.2,-88.6,-5.6,-84.2,-20.9C-79.7,-36.2,-69.7,-49.9,-57,-62C-44.3,-74.1,-28.9,-84.6,-12.6,-86C3.6,-87.4,32.4,-87.8,45.7,-78.5Z"
                    transform="translate(100 100)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="mb-3">
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-blue-100 rounded w-56"></div>
                      <div className="h-3 bg-blue-100 rounded w-64"></div>
                      <div className="h-3 bg-blue-100 rounded w-52"></div>
                      <div className="h-3 bg-blue-100 rounded w-60"></div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <div className="h-8 w-20 bg-blue-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
