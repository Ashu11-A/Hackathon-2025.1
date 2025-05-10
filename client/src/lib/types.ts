export type Skill = {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "soft" | "other";
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills: Skill[];
  preferedLocation?: string[];
  experience?: "beginner" | "intermediate" | "advanced";
  availability?: "full-time" | "part-time" | "flexible";
  interests?: string[];
};

export type Company = {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  location: string;
  industry: string;
  website?: string;
};

export type Internship = {
  id: string;
  title: string;
  company: Company;
  description: string;
  requiredSkills: Skill[];
  recommendedSkills: Skill[];
  location: string;
  remote: boolean;
  salary?: number;
  posted: Date;
  deadline?: Date;
  duration: string;
  status: "open" | "closed" | "draft";
  applications?: number;
};

export type SkillGap = {
  skill: Skill;
  prevalence: number; // Percentagem de vagas que pedem essa skill
  userHas: boolean;
};
