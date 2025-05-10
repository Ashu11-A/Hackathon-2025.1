# Conecta - Plataforma de Match entre Candidatos e Empresas de Tecnologia

<div align="center">

![license-info](https://img.shields.io/github/license/Ashu11-A/base-fastify?style=for-the-badge&colorA=302D41&colorB=f9e2af&logoColor=f9e2af)
![stars-infoa](https://img.shields.io/github/stars/Ashu11-A/base-fastify?colorA=302D41&colorB=f9e2af&style=for-the-badge)

![Last-Comitt](https://img.shields.io/github/last-commit/Ashu11-A/base-fastify?style=for-the-badge&colorA=302D41&colorB=b4befe)
![Comitts Year](https://img.shields.io/github/commit-activity/y/Ashu11-A/base-fastify?style=for-the-badge&colorA=302D41&colorB=f9e2af&logoColor=f9e2af)
![reposize-info](https://img.shields.io/github/languages/code-size/Ashu11-A/base-fastify?style=for-the-badge&colorA=302D41&colorB=90dceb)

![SourceForge Languages](https://img.shields.io/github/languages/top/Ashu11-A/base-fastify?style=for-the-badge&colorA=302D41&colorB=90dceb)

</div>

## 📋 | Sobre o Projeto

O Conecta é uma plataforma inovadora desenvolvida durante o Hackathon 2025.1 do IDP, com o objetivo de facilitar o acesso a oportunidades reais para quem está começando na área de tecnologia. A plataforma utiliza inteligência artificial para fazer o match perfeito entre candidatos e empresas, beneficiando ambos os lados e contribuindo para o desenvolvimento do setor de tecnologia no Brasil.

### 🎯 | Nossa Missão

- Facilitar o acesso a oportunidades reais para iniciantes em tecnologia
- Criar matches precisos entre candidatos e empresas
- Contribuir para o desenvolvimento dos alunos universitários de technologia do IDP


## 🛠️ | Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Shadcn/ui (Componentes Radix UI)
- React Query
- React Router DOM
- Zustand (Gerenciamento de Estado)
- Zod (Validação)

### Backend
- Fastify
- TypeScript
- TypeORM
- MySQL
- SqlJS
- WebSocket
- JWT Authentication
- Google AI (GenAI)
- Bull (Queue Management)

## 🚀 | Como Executar o Projeto

### Pré-requisitos
- Node.js (versão LTS)
- Bun (Runtime JavaScript)
- MySQL

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/conecta.git
cd conecta
```

2. Instale as dependências:
```bash
bun install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Inicie o servidor de desenvolvimento:
```bash
bun run dev
```

5. Em outro terminal, inicie o cliente:
```bash
cd client
bun run dev
```

## 📁 | Estrutura do Projeto

```
conecta/
├── client/             # Frontend React
├── server/             # Backend Fastify
├── packages/           # Pacotes compartilhados
│   ├── rpc/           # Comunicação RPC
│   ├── env/           # Configurações de ambiente
│   └── storage/       # Gerenciamento de armazenamento
└── dataset/           # Dados para treinamento e análise
```

## 👥 | Equipe

- Guilherme Montalvão (Eng. Software)
- Arthur Silva (Cien. Computação)
- Igor Andrade (Cien. Computação)
- Matheus Biolowons (Eng. Software)

## 📝 | Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 | Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit de suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request