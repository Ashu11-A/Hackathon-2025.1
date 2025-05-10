import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/contexts/ApiContext';

const GithubLogin: React.FC = () => {
  const navigate = useNavigate();
  const api = useApi();

  const handleGithubLogin = async () => {
    try {
      const result = await api.loginGithub();
      if (result) {
        // Add a smooth transition effect
        const element = document.querySelector('.github-login-container');
        if (element) {
          element.classList.add('fade-out');
        }
        
        // Navigate to dashboard after successful login
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      }
    } catch (error) {
      console.error('Error during GitHub login:', error);
    }
  };

  return (
    <div className="github-login-container flex items-center justify-center min-h-screen bg-white transition-opacity duration-500">
      <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-2xl mx-4 transform transition-all duration-500 hover:scale-105 border border-gray-100">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          Conecte-se com GitHub
        </h1>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Faça login com sua conta do GitHub para acessar vagas personalizadas 
          baseadas no seu perfil e repositórios.
        </p>
        <button
          onClick={handleGithubLogin}
          className="bg-gray-800 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 mx-auto"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          Entrar com GitHub
        </button>
        <p className="mt-6 text-sm text-gray-500">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
        </p>
      </div>
    </div>
  );
};

export default GithubLogin; 