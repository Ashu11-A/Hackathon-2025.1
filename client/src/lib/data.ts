import { Skill, Company, Internship, UserProfile } from "./types";

// Skills
export const skills: Skill[] = [
  { id: "1", name: "JavaScript", category: "frontend" },
  { id: "2", name: "TypeScript", category: "frontend" },
  { id: "3", name: "React", category: "frontend" },
  { id: "4", name: "Angular", category: "frontend" },
  { id: "5", name: "Vue.js", category: "frontend" },
  { id: "6", name: "Node.js", category: "backend" },
  { id: "7", name: "Express", category: "backend" },
  { id: "8", name: "NestJS", category: "backend" },
  { id: "9", name: "Python", category: "backend" },
  { id: "10", name: "Django", category: "backend" },
  { id: "11", name: "Flask", category: "backend" },
  { id: "12", name: "Java", category: "backend" },
  { id: "13", name: "Spring Boot", category: "backend" },
  { id: "14", name: "MySQL", category: "database" },
  { id: "15", name: "PostgreSQL", category: "database" },
  { id: "16", name: "MongoDB", category: "database" },
  { id: "17", name: "Redis", category: "database" },
  { id: "18", name: "Docker", category: "devops" },
  { id: "19", name: "Kubernetes", category: "devops" },
  { id: "20", name: "AWS", category: "devops" },
  { id: "21", name: "CI/CD", category: "devops" },
  { id: "22", name: "Git", category: "devops" },
  { id: "23", name: "Comunicação", category: "soft" },
  { id: "24", name: "Trabalho em equipe", category: "soft" },
  { id: "25", name: "Resolução de problemas", category: "soft" },
  { id: "26", name: "Gestão de tempo", category: "soft" },
];

// Companies
export const companies: Company[] = [
  {
    id: "1",
    name: "TechSolutions",
    logo: "/companies/techsolutions.png",
    description: "Empresa de soluções tecnológicas inovadoras.",
    location: "São Paulo, SP",
    industry: "Tecnologia",
    website: "https://techsolutions.com.br",
  },
  {
    id: "2",
    name: "DataInova",
    logo: "/companies/datainova.png",
    description: "Especialistas em análise de dados e inteligência artificial.",
    location: "Rio de Janeiro, RJ",
    industry: "Análise de Dados",
    website: "https://datainova.com.br",
  },
  {
    id: "3",
    name: "WebDev Brasil",
    logo: "/companies/webdev.png",
    description: "Desenvolvimento de aplicações web de alta performance.",
    location: "Belo Horizonte, MG",
    industry: "Desenvolvimento Web",
    website: "https://webdevbrasil.com",
  },
  {
    id: "4",
    name: "CloudMasters",
    logo: "/companies/cloudmasters.png",
    description: "Soluções em nuvem para empresas de todos os portes.",
    location: "Brasília, DF",
    industry: "Cloud Computing",
    website: "https://cloudmasters.tech",
  },
  {
    id: "5",
    name: "MobileApps",
    logo: "/companies/mobileapps.png",
    description: "Desenvolvimento de aplicativos móveis nativos e híbridos.",
    location: "Curitiba, PR",
    industry: "Desenvolvimento Mobile",
    website: "https://mobileapps.dev",
  },
];

// Internships
export const internships: Internship[] = [
  {
    id: "1",
    title: "Estágio em Desenvolvimento Frontend",
    company: companies[0],
    description:
      "Oportunidade para desenvolver interfaces interativas usando React e TypeScript.",
    requiredSkills: [skills[0], skills[2]],
    recommendedSkills: [skills[1], skills[13]],
    location: "São Paulo, SP",
    remote: true,
    salary: 1800,
    posted: new Date("2023-11-01"),
    deadline: new Date("2023-12-15"),
    duration: "6 meses",
    status: "open",
    applications: 45,
  },
  {
    id: "2",
    title: "Estágio em Desenvolvimento Backend com Node.js",
    company: companies[1],
    description:
      "Desenvolver APIs e serviços usando Node.js, Express e bancos de dados SQL.",
    requiredSkills: [skills[5], skills[6]],
    recommendedSkills: [skills[13], skills[1]],
    location: "Rio de Janeiro, RJ",
    remote: true,
    salary: 2000,
    posted: new Date("2023-10-15"),
    deadline: new Date("2023-11-30"),
    duration: "12 meses",
    status: "open",
    applications: 32,
  },
  {
    id: "3",
    title: "Estágio em Desenvolvimento Fullstack",
    company: companies[2],
    description:
      "Trabalhar com React no frontend e Node.js no backend para aplicações web.",
    requiredSkills: [skills[2], skills[5]],
    recommendedSkills: [skills[1], skills[13], skills[15]],
    location: "Belo Horizonte, MG",
    remote: false,
    salary: 1900,
    posted: new Date("2023-10-20"),
    deadline: new Date("2023-12-20"),
    duration: "12 meses",
    status: "open",
    applications: 28,
  },
  {
    id: "4",
    title: "Estágio em DevOps",
    company: companies[3],
    description:
      "Configurar ambientes, CI/CD e trabalhar com contêineres e orquestração.",
    requiredSkills: [skills[17], skills[21]],
    recommendedSkills: [skills[18], skills[19], skills[5]],
    location: "Brasília, DF",
    remote: true,
    salary: 2200,
    posted: new Date("2023-11-05"),
    deadline: new Date("2023-12-10"),
    duration: "6 meses",
    status: "open",
    applications: 15,
  },
  {
    id: "5",
    title: "Estágio em Desenvolvimento Mobile",
    company: companies[4],
    description: "Desenvolvimento de aplicativos móveis usando React Native.",
    requiredSkills: [skills[0], skills[2]],
    recommendedSkills: [skills[1], skills[15]],
    location: "Curitiba, PR",
    remote: false,
    salary: 1700,
    posted: new Date("2023-11-10"),
    deadline: new Date("2023-12-25"),
    duration: "6 meses",
    status: "open",
    applications: 22,
  },
  {
    id: "6",
    title: "Estágio em Análise de Dados",
    company: companies[1],
    description:
      "Análise de grandes volumes de dados usando Python e ferramentas de visualização.",
    requiredSkills: [skills[8]],
    recommendedSkills: [skills[14], skills[15]],
    location: "Rio de Janeiro, RJ",
    remote: true,
    salary: 2100,
    posted: new Date("2023-11-03"),
    deadline: new Date("2023-12-05"),
    duration: "12 meses",
    status: "open",
    applications: 18,
  },
  {
    id: "7",
    title: "Estágio em QA e Testes",
    company: companies[0],
    description:
      "Testar aplicações web e móveis, automatizar testes e garantir qualidade.",
    requiredSkills: [skills[0], skills[24]],
    recommendedSkills: [skills[8], skills[21]],
    location: "São Paulo, SP",
    remote: false,
    salary: 1600,
    posted: new Date("2023-10-25"),
    deadline: new Date("2023-12-01"),
    duration: "6 meses",
    status: "open",
    applications: 25,
  },
  {
    id: "8",
    title: "Estágio em Administração de Banco de Dados",
    company: companies[3],
    description: "Administrar, otimizar e manter bancos de dados SQL e NoSQL.",
    requiredSkills: [skills[13], skills[14]],
    recommendedSkills: [skills[15], skills[16]],
    location: "Brasília, DF",
    remote: true,
    salary: 1900,
    posted: new Date("2023-11-08"),
    deadline: new Date("2023-12-15"),
    duration: "12 meses",
    status: "open",
    applications: 12,
  },
  {
    id: "9",
    title: "Estágio em Desenvolvimento Java",
    company: companies[2],
    description: "Desenvolver aplicações em Java com Spring Boot.",
    requiredSkills: [skills[11], skills[12]],
    recommendedSkills: [skills[14], skills[17]],
    location: "Belo Horizonte, MG",
    remote: false,
    salary: 2000,
    posted: new Date("2023-10-18"),
    deadline: new Date("2023-11-28"),
    duration: "12 meses",
    status: "open",
    applications: 30,
  },
  {
    id: "10",
    title: "Estágio em UX/UI Design",
    company: companies[4],
    description:
      "Projetar interfaces intuitivas e atraentes para aplicativos móveis e web.",
    requiredSkills: [],
    recommendedSkills: [skills[2], skills[24], skills[25]],
    location: "Curitiba, PR",
    remote: true,
    salary: 1800,
    posted: new Date("2023-11-12"),
    deadline: new Date("2023-12-20"),
    duration: "6 meses",
    status: "open",
    applications: 20,
  },
];

// Example user profile
export const userProfile: UserProfile = {
  id: "1",
  name: "João Silva",
  email: "joao.silva@example.com",
  avatar: "/avatars/joao.png",
  bio: "Estudante de Ciência da Computação buscando oportunidades para aplicar conhecimentos em desenvolvimento web.",
  skills: [skills[0], skills[1], skills[2], skills[5]],
  preferedLocation: ["São Paulo, SP", "Remoto"],
  experience: "beginner",
  availability: "part-time",
  interests: ["Desenvolvimento Web", "Mobile", "Inteligência Artificial"],
};

// Function to get skill gap analysis
export function getSkillGapAnalysis(
  userSkills: Skill[],
  allInternships: Internship[]
): SkillGap[] {
  const userSkillIds = userSkills.map((skill) => skill.id);
  const skillCounts: Record<string, number> = {};
  let totalInternships = allInternships.length;

  // Count how many internships require each skill
  allInternships.forEach((internship) => {
    const allSkills = [
      ...internship.requiredSkills,
      ...internship.recommendedSkills,
    ];
    allSkills.forEach((skill) => {
      if (!skillCounts[skill.id]) {
        skillCounts[skill.id] = 0;
      }
      skillCounts[skill.id]++;
    });
  });

  // Create skill gaps
  const skillGaps: SkillGap[] = [];

  Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by frequency
    .slice(0, 10) // Top 10 skills
    .forEach(([skillId, count]) => {
      const skill = skills.find((s) => s.id === skillId);
      if (skill) {
        skillGaps.push({
          skill,
          prevalence: Math.round((count / totalInternships) * 100),
          userHas: userSkillIds.includes(skillId),
        });
      }
    });

  return skillGaps;
}

// Function to recommend internships based on user skills
export function getRecommendedInternships(
  user: UserProfile,
  allInternships: Internship[]
): Internship[] {
  const userSkillIds = user.skills.map((skill) => skill.id);

  // Score each internship based on skill match
  const scoredInternships = allInternships.map((internship) => {
    const requiredSkillIds = internship.requiredSkills.map((skill) => skill.id);
    const recommendedSkillIds = internship.recommendedSkills.map(
      (skill) => skill.id
    );

    // Calculate match scores
    const requiredMatch =
      requiredSkillIds.filter((id) => userSkillIds.includes(id)).length /
      (requiredSkillIds.length || 1);

    const recommendedMatch =
      recommendedSkillIds.filter((id) => userSkillIds.includes(id)).length /
      (recommendedSkillIds.length || 1);

    // Combined score - required skills have higher weight
    const score = requiredMatch * 0.7 + recommendedMatch * 0.3;

    return {
      internship,
      score,
    };
  });

  // Sort by score and return just the internships
  return scoredInternships
    .sort((a, b) => b.score - a.score)
    .map((item) => item.internship);
}
