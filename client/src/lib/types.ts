export type Skill = {
  id: number;
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "soft" | "other";
};

export type UserProfile = {
  id: number;
  uuid: string;
  name: string;
  username: string;
  email: string;
  language: string;
  role: "student" | "company" | "admin";
  idGithub?: number;
  skills: Skill[];
};

export type Company = {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  location: string;
  industry: string;
  website?: string;
};

export type Internship = {
  id: number;
  name: string;
  description: string;
  salary?: number;
  link: string;
  company: Company;
  skills: Skill[];
  status: "open" | "closed" | "draft";
  createdAt: Date;
  updatedAt: Date;
};

export type Repo = {
  id: number;
  name: string;
  description: string;
  link: string;
  skills: Skill[];
  user: UserProfile;
  createdAt: Date;
  updatedAt: Date;
};

export type SkillGap = {
  skill: Skill;
  count: number;
  percentage: number;
};
