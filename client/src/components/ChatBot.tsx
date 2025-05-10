import React, { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { useApi } from '@/contexts/ApiContext';
import { useNavigate } from 'react-router-dom';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    setMessages([{
        text: 'Olá! Para te ajudar a encontrar a vaga perfeita, preciso entender suas habilidades. Que linguagens de programação você domina?',
        isUser: false
    }])
  }, [])

  const handleSendMessage = async () => {
    if (inputMessage.trim().length < 1) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await api.sendMessage(userMessage);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { text: 'Error sending message. Please try again.', isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = async () => {
    try {
      await api.sendMessage('SAIR');
      setMessages([]);
    } catch (error) {
      console.error('Error exiting chat:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col h-[80vh] w-[800px] border rounded-3xl shadow-xl bg-white">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-2xl p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="border-t p-6 bg-white rounded-b-3xl">
          <div className="flex items-center space-x-4 max-w-4xl mx-auto">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 border-2 rounded-full px-6 py-3 focus:outline-none focus:border-blue-500 text-gray-700"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || inputMessage.trim().length < 1}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Enviar
            </button>
            <button
              onClick={handleExit}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              Seguir em frente
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
