import { UserProfile, Internship, Skill } from "./types";
import {
  userProfile as defaultUserProfile,
  internships as defaultInternships,
} from "./data";

// Chaves para o localStorage
const KEYS = {
  USER_PROFILE: "conecta-vaga-user-profile",
  INTERNSHIPS: "conecta-vaga-internships",
  APPLICATIONS: "conecta-vaga-applications",
  AUTH: "conecta-vaga-auth-status",
};

// Tipo para aplicações do usuário
export type UserApplication = {
  id: string;
  internshipId: string;
  userId: string;
  status: "pending" | "interview" | "approved" | "rejected";
  appliedAt: Date;
  coverLetter?: string;
  progress: number;
  steps: {
    name: string;
    completed: boolean;
    current: boolean;
  }[];
};

// Inicializa o localStorage com dados default, se não existirem
export const initializeLocalStorage = () => {
  try {
    // Inicializar perfil de usuário
    if (!localStorage.getItem(KEYS.USER_PROFILE)) {
      localStorage.setItem(
        KEYS.USER_PROFILE,
        JSON.stringify(defaultUserProfile)
      );
    }

    // Inicializar vagas
    if (!localStorage.getItem(KEYS.INTERNSHIPS)) {
      localStorage.setItem(
        KEYS.INTERNSHIPS,
        JSON.stringify(defaultInternships)
      );
    }

    // Inicializar candidaturas
    if (!localStorage.getItem(KEYS.APPLICATIONS)) {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify([]));
    }

    // Inicializar status de autenticação
    if (!localStorage.getItem(KEYS.AUTH)) {
      localStorage.setItem(KEYS.AUTH, JSON.stringify({ isLoggedIn: false }));
    }
  } catch (error) {
    console.error("Erro ao inicializar localStorage:", error);
  }
};

// Verificar se o usuário está logado
export const isLoggedIn = (): boolean => {
  try {
    const authData = localStorage.getItem(KEYS.AUTH);
    if (authData) {
      const auth = JSON.parse(authData);
      return auth.isLoggedIn === true;
    }
    return false;
  } catch (error) {
    console.error("Erro ao verificar login:", error);
    return false;
  }
};

// Fazer login
export const login = (email: string, password: string): boolean => {
  try {
    // Em uma aplicação real, haveria validação das credenciais
    // Para esta demo, qualquer login é bem-sucedido
    localStorage.setItem(KEYS.AUTH, JSON.stringify({ isLoggedIn: true }));
    return true;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return false;
  }
};

// Fazer logout
export const logout = (): void => {
  try {
    localStorage.setItem(KEYS.AUTH, JSON.stringify({ isLoggedIn: false }));
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

// Obter perfil do usuário
export const getUserProfile = (): UserProfile => {
  try {
    const profileData = localStorage.getItem(KEYS.USER_PROFILE);
    if (profileData) {
      const profile = JSON.parse(profileData);

      // Converter strings de data para objetos Date
      return profile;
    }
    return defaultUserProfile;
  } catch (error) {
    console.error("Erro ao obter perfil do usuário:", error);
    return defaultUserProfile;
  }
};

// Atualizar perfil do usuário
export const updateUserProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error("Erro ao atualizar perfil do usuário:", error);
  }
};

// Obter todas as vagas
export const getInternships = (): Internship[] => {
  try {
    const internshipsData = localStorage.getItem(KEYS.INTERNSHIPS);
    if (internshipsData) {
      const parsedInternships = JSON.parse(internshipsData);

      // Converter strings de data para objetos Date
      return parsedInternships.map((internship: any) => ({
        ...internship,
        posted: new Date(internship.posted),
        deadline: internship.deadline
          ? new Date(internship.deadline)
          : undefined,
      }));
    }
    return defaultInternships;
  } catch (error) {
    console.error("Erro ao obter vagas:", error);
    return defaultInternships;
  }
};

// Obter detalhes de uma vaga específica
export const getInternshipById = (id: string): Internship | undefined => {
  try {
    const internships = getInternships();
    return internships.find((internship) => internship.id === id);
  } catch (error) {
    console.error("Erro ao obter vaga por ID:", error);
    return undefined;
  }
};

// Obter todas as candidaturas do usuário
export const getUserApplications = (): UserApplication[] => {
  try {
    const applicationsData = localStorage.getItem(KEYS.APPLICATIONS);
    if (applicationsData) {
      const parsedApplications = JSON.parse(applicationsData);

      // Converter strings de data para objetos Date
      return parsedApplications.map((app: any) => ({
        ...app,
        appliedAt: new Date(app.appliedAt),
      }));
    }
    return [];
  } catch (error) {
    console.error("Erro ao obter candidaturas do usuário:", error);
    return [];
  }
};

// Criar uma nova candidatura
export const createApplication = (
  internshipId: string,
  coverLetter?: string
): UserApplication | null => {
  try {
    const userApplications = getUserApplications();
    const profile = getUserProfile();

    // Verificar se o usuário já se candidatou a esta vaga
    const existingApplication = userApplications.find(
      (app) => app.internshipId === internshipId && app.userId === profile.id
    );

    if (existingApplication) {
      console.warn("Usuário já se candidatou a esta vaga");
      return null;
    }

    // Criar nova candidatura
    const newApplication: UserApplication = {
      id: `app-${Date.now()}`,
      internshipId,
      userId: profile.id,
      status: "pending",
      appliedAt: new Date(),
      coverLetter,
      progress: 20, // Inicia com 20% (inscrição concluída)
      steps: [
        { name: "Inscrição", completed: true, current: false },
        { name: "Análise Curricular", completed: false, current: true },
        { name: "Teste Técnico", completed: false, current: false },
        { name: "Entrevista RH", completed: false, current: false },
        { name: "Entrevista Técnica", completed: false, current: false },
      ],
    };

    // Atualizar a lista de candidaturas
    const updatedApplications = [...userApplications, newApplication];
    localStorage.setItem(
      KEYS.APPLICATIONS,
      JSON.stringify(updatedApplications)
    );

    // Atualizar contador de candidaturas da vaga
    const internships = getInternships();
    const internshipIndex = internships.findIndex((i) => i.id === internshipId);

    if (internshipIndex !== -1) {
      const updatedInternships = [...internships];
      const currentApplications =
        updatedInternships[internshipIndex].applications || 0;
      updatedInternships[internshipIndex].applications =
        currentApplications + 1;

      localStorage.setItem(
        KEYS.INTERNSHIPS,
        JSON.stringify(updatedInternships)
      );
    }

    return newApplication;
  } catch (error) {
    console.error("Erro ao criar candidatura:", error);
    return null;
  }
};

// Verificar se o usuário já se candidatou a uma vaga
export const hasApplied = (internshipId: string): boolean => {
  try {
    const userApplications = getUserApplications();
    const profile = getUserProfile();

    return userApplications.some(
      (app) => app.internshipId === internshipId && app.userId === profile.id
    );
  } catch (error) {
    console.error("Erro ao verificar candidatura:", error);
    return false;
  }
};

// Obter uma candidatura específica
export const getApplicationById = (id: string): UserApplication | undefined => {
  try {
    const applications = getUserApplications();
    return applications.find((app) => app.id === id);
  } catch (error) {
    console.error("Erro ao obter candidatura por ID:", error);
    return undefined;
  }
};

// Obter estágios recomendados com base no perfil do usuário
export const getRecommendedInternships = (
  userProfile: UserProfile,
  internships: Internship[]
): Internship[] => {
  try {
    const userSkillIds = userProfile.skills.map((skill) => skill.id);

    // Pontuação para cada estágio com base em habilidades do usuário
    const scoredInternships = internships.map((internship) => {
      let score = 0;

      // Maior pontuação para habilidades obrigatórias que o usuário possui
      internship.requiredSkills.forEach((skill) => {
        if (userSkillIds.includes(skill.id)) {
          score += 3;
        }
      });

      // Pontuação menor para habilidades recomendadas que o usuário possui
      internship.recommendedSkills.forEach((skill) => {
        if (userSkillIds.includes(skill.id)) {
          score += 1;
        }
      });

      // Bonus para vagas remotas (se usuário tiver preferência por remoto)
      if (internship.remote && userProfile.preferences?.remote) {
        score += 1;
      }

      return { internship, score };
    });

    // Ordenar por pontuação e retornar apenas os estágios
    return scoredInternships
      .sort((a, b) => b.score - a.score)
      .map((item) => item.internship);
  } catch (error) {
    console.error("Erro ao obter estágios recomendados:", error);
    return [];
  }
};

// Analisar lacunas de habilidades (skill gaps) do usuário
export const getSkillGapAnalysis = (
  userSkills: Skill[],
  internships: Internship[]
): { skill: Skill; count: number; percentage: number }[] => {
  try {
    const userSkillIds = userSkills.map((skill) => skill.id);
    const skillGapMap = new Map<string, { skill: Skill; count: number }>();
    let totalVacancies = internships.length;

    // Contar ocorrências de cada habilidade em vagas que o usuário não possui
    internships.forEach((internship) => {
      // Verificar habilidades obrigatórias
      internship.requiredSkills.forEach((skill) => {
        if (!userSkillIds.includes(skill.id)) {
          if (skillGapMap.has(skill.id)) {
            const current = skillGapMap.get(skill.id)!;
            current.count += 1;
            skillGapMap.set(skill.id, current);
          } else {
            skillGapMap.set(skill.id, { skill, count: 1 });
          }
        }
      });

      // Verificar habilidades recomendadas (com peso menor)
      internship.recommendedSkills.forEach((skill) => {
        if (!userSkillIds.includes(skill.id)) {
          if (skillGapMap.has(skill.id)) {
            const current = skillGapMap.get(skill.id)!;
            current.count += 0.5; // Peso menor para habilidades recomendadas
            skillGapMap.set(skill.id, current);
          } else {
            skillGapMap.set(skill.id, { skill, count: 0.5 });
          }
        }
      });
    });

    // Converter o mapa para array e calcular percentuais
    const skillGaps = Array.from(skillGapMap.values())
      .map((item) => ({
        skill: item.skill,
        count: Math.round(item.count),
        percentage: Math.round((item.count / totalVacancies) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return skillGaps.slice(0, 5); // Retornar as 5 principais lacunas
  } catch (error) {
    console.error("Erro ao analisar lacunas de habilidades:", error);
    return [];
  }
};

// Inicializar o localStorage quando o módulo for importado
initializeLocalStorage();
