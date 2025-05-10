import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-conecta-brown/5 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-conecta-brown text-center">
            Sobre o Projeto
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl text-gray-600 text-center mb-12">
              Criado por alunos do IDP durante o Hackathon 2025.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4">Nossa Missão</h3>
                <p className="text-gray-600 mb-6">
                  Nosso objetivo é facilitar o acesso a oportunidades reais para
                  quem está começando na área de tecnologia.
                </p>
                <p className="text-gray-600">
                  Acreditamos que o match perfeito entre candidato e empresa não
                  só beneficia ambos os lados, mas também contribui para o
                  desenvolvimento do setor de tecnologia no Brasil.
                </p>
              </div>

              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-4xl font-bold text-conecta-brown mb-2">
                      150+
                    </div>
                    <div className="text-gray-600">Vagas analisadas</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-4xl font-bold text-conecta-brown mb-2">
                      96%
                    </div>
                    <div className="text-gray-600">Taxa de precisão</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-4xl font-bold text-conecta-brown mb-2">
                      78%
                    </div>
                    <div className="text-gray-600">Aumento de matches</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-4xl font-bold text-conecta-brown mb-2">
                      25+
                    </div>
                    <div className="text-gray-600">Empresas parceiras</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t pt-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Nossa Equipe
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="font-semibold">Ana Silva</div>
                  <div className="text-sm text-gray-500">Desenvolvedora</div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="font-semibold">João Santos</div>
                  <div className="text-sm text-gray-500">Design UX</div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="font-semibold">Pedro Costa</div>
                  <div className="text-sm text-gray-500">Machine Learning</div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="font-semibold">Carla Mendes</div>
                  <div className="text-sm text-gray-500">Gestão do Projeto</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
