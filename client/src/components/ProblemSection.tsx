
import React from 'react';

const ProblemSection = () => {
  return (
    <section id="problem" className="bg-conecta-green/5 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title text-conecta-green">Está difícil encontrar a vaga certa?</h2>
          <p className="text-xl text-gray-600 mb-12">
            Muitos estudantes têm dificuldades para encontrar vagas que combinam com suas habilidades e objetivos. 
            Vagas genéricas, currículos mal aproveitados e falta de direcionamento são desafios comuns.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 bg-conecta-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-conecta-green" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Vagas Genéricas</h3>
              <p className="text-gray-600">Anúncios vagos que não mostram claramente os requisitos ou o perfil esperado.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 bg-conecta-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-conecta-green" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Currículos Mal Aproveitados</h3>
              <p className="text-gray-600">Dificuldade em demonstrar habilidades e experiências de forma relevante.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-14 w-14 bg-conecta-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-conecta-green" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Falta de Direcionamento</h3>
              <p className="text-gray-600">Dispersão de esforços em processos seletivos inadequados ao perfil.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
