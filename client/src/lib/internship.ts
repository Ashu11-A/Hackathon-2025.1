// Habilidade associada a uma vaga
export interface Skill {
    id: number
    name: string
    value: string
    createdAt: string
    updatedAt: string
}

// Informações da empresa
export interface Company {
    id: number
    name: string
    link: string | null
    createdAt: string
    updatedAt: string
}

// Modelo de cada vaga
export interface Job {
    id: number
    name: string
    description: string
    salary: number | null
    link: string
    createdAt: string 
    updatedAt: string 
    skills: Skill[]
    company: Company
}