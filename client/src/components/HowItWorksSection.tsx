import React from "react";

const HowItWorksSection = () => {
  return (
    <section id="howworks" className="bg-conecta-orange/5 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-conecta-orange">Como Funciona</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um processo simples e eficaz para encontrar as melhores
            oportunidades para o seu perfil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-conecta-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-conecta-orange text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              Converse com nossa IA
            </h3>
            <p className="text-gray-600 text-center">
              Conte sobre suas habilidades, interesses e objetivos de carreira.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-conecta-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-conecta-orange text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              Análise do seu perfil
            </h3>
            <p className="text-gray-600 text-center">
              O sistema analisa seu perfil técnico, inclusive seu GitHub.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-conecta-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-conecta-orange text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              Busca personalizada
            </h3>
            <p className="text-gray-600 text-center">
              Buscamos vagas em sites confiáveis que combinam com você.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-conecta-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-conecta-orange text-xl font-bold">4</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              Melhores oportunidades
            </h3>
            <p className="text-gray-600 text-center">
              Você recebe uma lista com as melhores oportunidades.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <div className="relative w-full h-64">
                <div className="absolute inset-0 bg-gradient-to-br from-conecta-orange/30 to-conecta-yellow/30 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">
                Veja o ConectaIDP em ação
              </h3>
              <p className="text-gray-600 mb-6">
                Nosso sistema de match inteligente utiliza IA para entender seu
                perfil e encontrar as melhores vagas para você. Confira neste
                vídeo como é simples e eficiente usar nossa plataforma.
              </p>

              <button className="px-6 py-3 bg-conecta-orange hover:bg-conecta-orange/90 text-white rounded-lg transition-colors flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Veja a demonstração
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
