import React from 'react';
import { useNavigate } from 'react-router-dom';

const LetsGetStarted: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Add a smooth transition effect
    const element = document.querySelector('.lets-get-started-container');
    if (element) {
      element.classList.add('fade-out');
    }
    
    // Navigate to chat after a short delay for the animation
    setTimeout(() => {
      navigate('/chat');
    }, 500);
  };

  return (
    <div className="lets-get-started-container flex items-center justify-center min-h-screen bg-white transition-opacity duration-500">
      <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-2xl mx-4 transform transition-all duration-500 hover:scale-105 border border-gray-100">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          Bem-vindo ao AI Assistant
        </h1>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Seu companheiro inteligente para conversas significativas. 
          Vamos começar essa jornada juntos!
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 mx-auto"
        >
          Seguir em frente
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LetsGetStarted;
