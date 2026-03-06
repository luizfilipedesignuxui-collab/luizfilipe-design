export interface Project {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  imagem_capa: string;
  categoria: "UX Design" | "UI Design" | "Product Design";
  ferramentas: string[];
  galeria_de_imagens: string[];
  contexto: string;
  objetivo: string;
  processo: {
    research: string;
    wireframe: string;
    ui_design: string;
  };
  resultado: string;
  tags: string[];
}

// Para adicionar um novo projeto, basta adicionar um objeto ao array abaixo.
// Ele aparecerá automaticamente na página /projetos e na home.
import pontuoMockup from "@/assets/pontuo-mockup.png";
import pontuoMockup2 from "@/assets/pontuo-mockup-2.png";
import pontuoMockup3 from "@/assets/pontuo-mockup-3.png";

export const projects: Project[] = [
  {
    id: "1",
    slug: "app-mobilidade-pontuo",
    titulo: "Pontuô — App de Mobilidade Urbana",
    descricao: "Aplicativo de mobilidade urbana que conecta usuários a diferentes modais de transporte com uma experiência fluida, intuitiva e sustentável.",
    imagem_capa: pontuoMockup,
    categoria: "UX Design",
    ferramentas: ["Figma", "Figma Make", "Miro"],
    galeria_de_imagens: [pontuoMockup2],
    contexto: "Usuários urbanos enfrentam dificuldades ao combinar diferentes meios de transporte diariamente. A fragmentação entre apps torna o planejamento de rotas ineficiente e frustrante.",
    objetivo: "Criar um app de mobilidade que unifique a experiência de transporte urbano, sugerindo as melhores combinações de modais considerando tempo, custo e sustentabilidade.",
    processo: {
      research: "Realizei pesquisas com 15 usuários de transporte público e privado para mapear padrões de mobilidade e identificar as principais dores no planejamento de trajetos diários.",
      wireframe: "Criei wireframes de baixa fidelidade no Figma Make para validar o fluxo principal: busca de rota → comparação de modais → navegação. Iteramos 4 vezes com base em testes de usabilidade.",
      ui_design: "Desenvolvi a interface final no Figma com mapa interativo como elemento central, cards de rota com ícones dos modais e estimativas em tempo real.",
    },
    resultado: "Testes com 20 usuários mostraram que 90% preferiam a rota multimodal sugerida pelo app. O tempo médio de planejamento de trajeto caiu de 8 minutos para 25 segundos.",
    tags: ["Mobile", "Mobilidade", "UX Design"],
  },
  {
    id: "2",
    slug: "plataforma-educacional-learnhub",
    titulo: "LearnHub — Plataforma Educacional",
    descricao: "Redesign de uma plataforma de cursos online focada em melhorar a retenção de alunos e a experiência de aprendizado.",
    imagem_capa: "",
    categoria: "UI Design",
    ferramentas: ["Figma", "Trello", "Slack"],
    galeria_de_imagens: [],
    contexto: "A plataforma educacional existente tinha uma taxa de abandono de 60% nos cursos. A interface desatualizada e a navegação confusa eram as principais causas identificadas.",
    objetivo: "Redesenhar a experiência de aprendizado para aumentar a retenção dos alunos e tornar o progresso nos cursos mais envolvente e motivador.",
    processo: {
      research: "Analisei dados de uso da plataforma, realizei testes de usabilidade com 15 alunos e mapeei os pontos de abandono no funil de aprendizado usando heatmaps e gravações de sessão.",
      wireframe: "Prototipei um novo fluxo de navegação com gamificação sutil: barra de progresso, badges de conquista e checkpoints visuais entre módulos.",
      ui_design: "Criei um design system completo com componentes reutilizáveis, modo escuro e layout responsivo que prioriza o conteúdo do curso com distrações mínimas.",
    },
    resultado: "Após a implementação do redesign, a taxa de conclusão dos cursos subiu de 40% para 72% e o NPS da plataforma aumentou 35 pontos em 3 meses.",
    tags: ["Web", "EdTech", "Design System"],
  },
  {
    id: "3",
    slug: "dashboard-saude-vitalcare",
    titulo: "VitalCare — Dashboard de Saúde",
    descricao: "Dashboard para profissionais de saúde monitorarem pacientes remotamente com visualização de dados clara e acionável.",
    imagem_capa: "",
    categoria: "Product Design",
    ferramentas: ["Figma", "Figma Make", "Miro", "Lovable"],
    galeria_de_imagens: [],
    contexto: "Clínicas e consultórios precisavam de uma ferramenta para acompanhar pacientes crônicos remotamente, mas as soluções existentes eram complexas e exigiam treinamento extenso da equipe médica.",
    objetivo: "Desenvolver um dashboard intuitivo que apresente dados vitais dos pacientes de forma clara, com alertas inteligentes e ações rápidas para os profissionais de saúde.",
    processo: {
      research: "Shadowing com 5 profissionais de saúde durante 2 semanas para entender suas rotinas e necessidades. Criamos personas e jornadas detalhadas do usuário médico e do enfermeiro.",
      wireframe: "Iteramos sobre 4 versões do dashboard usando princípios de design de informação. Priorizamos a hierarquia visual: alertas críticos > dados em tempo real > histórico.",
      ui_design: "Interface limpa com sistema de cores semafórico para status dos pacientes. Cards expandíveis, gráficos interativos e atalhos contextuais para ações médicas frequentes.",
    },
    resultado: "O dashboard reduziu em 40% o tempo que médicos gastavam revisando dados de pacientes. A equipe de enfermagem reportou uma melhora significativa na identificação precoce de alertas críticos.",
    tags: ["Web", "HealthTech", "Data Viz"],
  },
  {
    id: "4",
    slug: "ecommerce-petshop-pawstore",
    titulo: "PawStore — E-commerce Pet Shop",
    descricao: "Loja virtual para pet shop com experiência de compra personalizada baseada no perfil do animal de estimação.",
    imagem_capa: "",
    categoria: "UI Design",
    ferramentas: ["Figma", "Trello"],
    galeria_de_imagens: [],
    contexto: "O pet shop físico queria expandir para o digital mas precisava de uma experiência que se diferenciasse dos grandes marketplaces, criando conexão emocional com os donos de pets.",
    objetivo: "Criar um e-commerce que personalize a experiência de compra baseado no perfil do pet cadastrado, facilitando a recompra e a descoberta de produtos relevantes.",
    processo: {
      research: "Pesquisa com 20 donos de pets para entender hábitos de compra online. Descobrimos que 78% compram os mesmos produtos mensalmente e gostariam de recomendações personalizadas.",
      wireframe: "Fluxo de onboarding com cadastro do pet (raça, idade, porte) que alimenta um algoritmo de recomendação. Wireframes focados em recompra rápida e descoberta de novidades.",
      ui_design: "Design vibrante e acolhedor com ilustrações customizadas de pets. Cards de produto com informações de compatibilidade com o pet cadastrado e botão de recompra em 1 clique.",
    },
    resultado: "O MVP do e-commerce gerou um aumento de 200% nas vendas online no primeiro mês. A taxa de recompra mensal atingiu 45%, superando a média do mercado pet online.",
    tags: ["E-commerce", "Mobile", "Personalização"],
  },
  {
    id: "5",
    slug: "app-mobilidade-goride",
    titulo: "GoRide — App de Mobilidade Urbana",
    descricao: "Aplicativo de mobilidade que integra diferentes modais de transporte em uma única experiência fluida e sustentável.",
    imagem_capa: "",
    categoria: "Product Design",
    ferramentas: ["Figma", "Figma Make", "Miro", "Slack"],
    galeria_de_imagens: [],
    contexto: "Usuários urbanos precisam combinar diferentes meios de transporte diariamente (ônibus, metrô, bike, patinete) mas cada um tem seu próprio app, tornando o planejamento de rotas fragmentado e ineficiente.",
    objetivo: "Unificar a experiência de mobilidade urbana em um único app que sugira a melhor combinação de modais considerando tempo, custo e impacto ambiental.",
    processo: {
      research: "Diário de uso com 10 participantes durante 1 semana para mapear padrões de mobilidade. Benchmark com apps de mobilidade de 5 cidades referência no mundo.",
      wireframe: "Protótipo de planejador de rota multimodal com comparação visual de opções (mais rápido, mais barato, mais verde). Testes A/B com 3 variações de interface.",
      ui_design: "Interface com mapa interativo como elemento central, cards de rota com ícones dos modais, estimativas em tempo real e gamificação de pegada de carbono economizada.",
    },
    resultado: "Testes com 25 usuários mostraram que 88% preferiam a rota multimodal sugerida pelo app. O tempo médio de planejamento de trajeto caiu de 8 minutos para 30 segundos.",
    tags: ["Mobile", "Mobilidade", "Sustentabilidade"],
  },
];
