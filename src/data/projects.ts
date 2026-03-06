export interface ProjectSection {
  title: string;
  content: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  category: string;
  overview: string;
  problem: string;
  research: string;
  process: string;
  wireframes: string;
  finalDesign: string;
  prototype: string;
  results: string;
  sections?: ProjectSection[];
}

export const projects: Project[] = [
  {
    id: "app-financas",
    title: "App de Finanças Pessoais",
    description: "Aplicativo mobile para controle financeiro com foco em simplicidade e engajamento do usuário.",
    coverImage: "/placeholder.svg",
    tags: ["UX/UI", "Mobile App", "Case Study"],
    category: "Mobile App",
    overview: "Redesign completo de um aplicativo de finanças pessoais, focando em simplificar a experiência do usuário e aumentar o engajamento diário.",
    problem: "Os usuários abandonavam o app após a primeira semana por conta da complexidade na inserção de gastos e falta de feedback visual sobre seus hábitos financeiros.",
    research: "Realizamos entrevistas com 15 usuários, análise de concorrentes e testes de usabilidade com o produto existente. Identificamos 3 principais pontos de dor na jornada do usuário.",
    process: "Seguimos um processo de Double Diamond, passando por descoberta, definição, desenvolvimento e entrega. Cada etapa envolveu colaboração com stakeholders e validação com usuários.",
    wireframes: "Criamos wireframes de baixa e alta fidelidade no Figma, testando diferentes abordagens de navegação e hierarquia de informação.",
    finalDesign: "A interface final apresenta um design limpo com cards informativos, gráficos interativos e um fluxo simplificado de inserção de gastos em apenas 2 taps.",
    prototype: "Protótipo interativo criado no Figma com todas as interações e transições, testado com 8 usuários antes da implementação.",
    results: "Aumento de 45% na retenção semanal, redução de 60% no tempo de inserção de gastos e NPS de 72 após o redesign.",
  },
  {
    id: "plataforma-educacao",
    title: "Plataforma de Educação Online",
    description: "Design de uma plataforma web para cursos online com foco em acessibilidade e aprendizagem adaptativa.",
    coverImage: "/placeholder.svg",
    tags: ["UX/UI", "Web App", "Case Study"],
    category: "Web App",
    overview: "Criação de uma plataforma de educação online que se adapta ao ritmo de aprendizagem de cada aluno, promovendo inclusão e acessibilidade.",
    problem: "Plataformas existentes não consideravam diferentes perfis de aprendizagem e apresentavam barreiras de acessibilidade significativas.",
    research: "Pesquisa com 200 estudantes, análise heurística de 5 plataformas concorrentes e consultoria com especialistas em acessibilidade digital.",
    process: "Design Thinking aplicado em sprints de 2 semanas, com ciclos iterativos de prototipação e teste.",
    wireframes: "Wireframes focados em múltiplos layouts adaptáveis e componentes acessíveis, seguindo WCAG 2.1 AA.",
    finalDesign: "Interface com alto contraste, tipografia escalável, navegação por teclado e suporte a leitores de tela.",
    prototype: "Protótipo testado com usuários com deficiência visual e motora, gerando insights valiosos para refinamentos.",
    results: "Score de acessibilidade de 98/100, aumento de 35% na conclusão de cursos e feedback positivo de comunidades de inclusão digital.",
  },
  {
    id: "dashboard-saude",
    title: "Dashboard de Saúde",
    description: "Painel de controle para profissionais de saúde monitorarem pacientes em tempo real.",
    coverImage: "/placeholder.svg",
    tags: ["UX/UI", "Web App", "Dashboard"],
    category: "Web App",
    overview: "Dashboard para médicos e enfermeiros acompanharem sinais vitais e histórico de pacientes em ambiente hospitalar.",
    problem: "Profissionais perdiam tempo navegando entre múltiplos sistemas para acessar informações críticas dos pacientes.",
    research: "Shadowing com equipes médicas em 3 hospitais, entrevistas contextuais e análise de tarefas críticas.",
    process: "Co-design com profissionais de saúde, prototipação rápida e testes em ambiente real.",
    wireframes: "Wireframes priorizando informações críticas com hierarquia visual clara e alertas contextuais.",
    finalDesign: "Interface com modo escuro para plantões noturnos, visualização de dados em tempo real e sistema de alertas inteligente.",
    prototype: "Protótipo funcional testado durante 2 semanas em ambiente hospitalar controlado.",
    results: "Redução de 40% no tempo de acesso a informações críticas e 90% de satisfação entre os profissionais.",
  },
];
