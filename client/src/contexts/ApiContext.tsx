import React, { createContext, useContext } from 'react';
import { API } from '@/lib/api';

// Criar uma única instância da API
const apiInstance = new API();

// Criar o contexto
const ApiContext = createContext<API | null>(null);

// Provider component
export function ApiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApiContext.Provider value={apiInstance}>
      {children}
    </ApiContext.Provider>
  );
}

// Hook personalizado para usar a API
export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
} 