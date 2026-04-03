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
  link_projeto?: string;
  // English fields
  titulo_en?: string;
  descricao_en?: string;
  categoria_en?: string;
  contexto_en?: string;
  objetivo_en?: string;
  resultado_en?: string;
  processo_en?: {
    research: string;
    wireframe: string;
    ui_design: string;
  };
}

import pontuoMockup from "@/assets/pontuo-mockup.png";
import pontuoMockup2 from "@/assets/pontuo-mockup-2.png";
import pontuoMockup3 from "@/assets/pontuo-mockup-3.png";
import pontuoMockup4 from "@/assets/pontuo-mockup-4.png";
import pontuoRewardsScreen from "@/assets/pontuo-rewards-screen.png";
import becarefulCover from "@/assets/becareful-cover.png";
import becarefulMockup1 from "@/assets/becareful-mockup-1.png";
import becarefulMockup2 from "@/assets/becareful-mockup-2.png";
import becarefulMockup3 from "@/assets/becareful-mockup-3.png";
import guiaAcessivelCover from "@/assets/guia-acessivel-cover.png";
import guiaAcessivelMockup1 from "@/assets/guia-acessivel-mockup-1.png";
import guiaAcessivelMockup2 from "@/assets/guia-acessivel-mockup-2.png";
import guiaAcessivelMockup3 from "@/assets/guia-acessivel-mockup-3.png";

export const projects: Project[] = [
  {
    id: "1",
    slug: "app-mobilidade-pontuo",
    titulo: "Pontuô — App de Mobilidade Urbana",
    descricao: "Aplicativo de mobilidade urbana que conecta usuários a diferentes modais de transporte com uma experiência fluida, intuitiva e sustentável.",
    imagem_capa: pontuoMockup,
    categoria: "UX Design",
    ferramentas: ["Figma", "Figma Make", "Miro"],
    galeria_de_imagens: [pontuoMockup2, pontuoMockup3, pontuoMockup4, pontuoRewardsScreen],
    contexto: "Usuários urbanos enfrentam dificuldades ao combinar diferentes meios de transporte diariamente. A fragmentação entre apps torna o planejamento de rotas ineficiente e frustrante.",
    objetivo: "Criar um app de mobilidade que unifique a experiência de transporte urbano, sugerindo as melhores combinações de modais considerando tempo, custo e sustentabilidade.",
    processo: {
      research: "Realizei pesquisas com 15 usuários de transporte público e privado para mapear padrões de mobilidade e identificar as principais dores no planejamento de trajetos diários.",
      wireframe: "Criei wireframes de baixa fidelidade no Figma Make para validar o fluxo principal: busca de rota → comparação de modais → navegação. Iteramos 4 vezes com base em testes de usabilidade.",
      ui_design: "Desenvolvi a interface final no Figma com mapa interativo como elemento central, cards de rota com ícones dos modais e estimativas em tempo real.",
    },
    resultado: "Testes com 20 usuários mostraram que 90% preferiam a rota multimodal sugerida pelo app. O tempo médio de planejamento de trajeto caiu de 8 minutos para 25 segundos.",
    tags: ["Mobile", "Mobilidade", "UX Design"],
    titulo_en: "Pontuô — Urban Mobility App",
    descricao_en: "An urban mobility app that connects users to different transportation modes with a fluid, intuitive, and sustainable experience.",
    categoria_en: "UX Design",
    contexto_en: "Urban users face difficulties combining different means of transportation daily. The fragmentation between apps makes route planning inefficient and frustrating.",
    objetivo_en: "Create a mobility app that unifies the urban transportation experience, suggesting the best modal combinations considering time, cost, and sustainability.",
    resultado_en: "Tests with 20 users showed that 90% preferred the multimodal route suggested by the app. The average route planning time dropped from 8 minutes to 25 seconds.",
    processo_en: {
      research: "I conducted research with 15 public and private transport users to map mobility patterns and identify the main pain points in daily commute planning.",
      wireframe: "I created low-fidelity wireframes in Figma Make to validate the main flow: route search → modal comparison → navigation. We iterated 4 times based on usability tests.",
      ui_design: "I developed the final interface in Figma with an interactive map as the central element, route cards with modal icons, and real-time estimates.",
    },
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
    titulo_en: "LearnHub — Educational Platform",
    descricao_en: "Redesign of an online course platform focused on improving student retention and learning experience.",
    categoria_en: "UI Design",
    contexto_en: "The existing educational platform had a 60% course dropout rate. The outdated interface and confusing navigation were the main identified causes.",
    objetivo_en: "Redesign the learning experience to increase student retention and make course progress more engaging and motivating.",
    resultado_en: "After implementing the redesign, course completion rates rose from 40% to 72% and the platform's NPS increased by 35 points in 3 months.",
    processo_en: {
      research: "I analyzed platform usage data, conducted usability tests with 15 students, and mapped dropout points in the learning funnel using heatmaps and session recordings.",
      wireframe: "I prototyped a new navigation flow with subtle gamification: progress bar, achievement badges, and visual checkpoints between modules.",
      ui_design: "I created a complete design system with reusable components, dark mode, and responsive layout that prioritizes course content with minimal distractions.",
    },
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
    titulo_en: "VitalCare — Health Dashboard",
    descricao_en: "Dashboard for healthcare professionals to remotely monitor patients with clear and actionable data visualization.",
    categoria_en: "Product Design",
    contexto_en: "Clinics and offices needed a tool to remotely monitor chronic patients, but existing solutions were complex and required extensive training for the medical team.",
    objetivo_en: "Develop an intuitive dashboard that presents patient vital data clearly, with smart alerts and quick actions for healthcare professionals.",
    resultado_en: "The dashboard reduced by 40% the time doctors spent reviewing patient data. The nursing team reported a significant improvement in early identification of critical alerts.",
    processo_en: {
      research: "Shadowing with 5 healthcare professionals for 2 weeks to understand their routines and needs. We created detailed personas and journeys for the doctor and nurse users.",
      wireframe: "We iterated over 4 dashboard versions using information design principles. We prioritized visual hierarchy: critical alerts > real-time data > history.",
      ui_design: "Clean interface with traffic-light color system for patient status. Expandable cards, interactive charts, and contextual shortcuts for frequent medical actions.",
    },
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
    titulo_en: "PawStore — Pet Shop E-commerce",
    descricao_en: "Online pet shop with a personalized shopping experience based on the pet's profile.",
    categoria_en: "UI Design",
    contexto_en: "The physical pet shop wanted to expand digitally but needed an experience that stood out from large marketplaces, creating an emotional connection with pet owners.",
    objetivo_en: "Create an e-commerce that personalizes the shopping experience based on the registered pet's profile, facilitating repurchase and relevant product discovery.",
    resultado_en: "The e-commerce MVP generated a 200% increase in online sales in the first month. The monthly repurchase rate reached 45%, surpassing the online pet market average.",
    processo_en: {
      research: "Research with 20 pet owners to understand online shopping habits. We found that 78% buy the same products monthly and would like personalized recommendations.",
      wireframe: "Onboarding flow with pet registration (breed, age, size) feeding a recommendation algorithm. Wireframes focused on quick repurchase and new product discovery.",
      ui_design: "Vibrant and welcoming design with custom pet illustrations. Product cards with compatibility info for the registered pet and a 1-click repurchase button.",
    },
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
    titulo_en: "GoRide — Urban Mobility App",
    descricao_en: "A mobility app that integrates different transportation modes into a single fluid and sustainable experience.",
    categoria_en: "Product Design",
    contexto_en: "Urban users need to combine different means of transportation daily (bus, subway, bike, scooter) but each has its own app, making route planning fragmented and inefficient.",
    objetivo_en: "Unify the urban mobility experience in a single app that suggests the best modal combination considering time, cost, and environmental impact.",
    resultado_en: "Tests with 25 users showed that 88% preferred the multimodal route suggested by the app. The average route planning time dropped from 8 minutes to 30 seconds.",
    processo_en: {
      research: "Usage diary with 10 participants for 1 week to map mobility patterns. Benchmarking with mobility apps from 5 reference cities worldwide.",
      wireframe: "Multimodal route planner prototype with visual comparison of options (fastest, cheapest, greenest). A/B tests with 3 interface variations.",
      ui_design: "Interface with interactive map as the central element, route cards with modal icons, real-time estimates, and carbon footprint savings gamification.",
    },
  },
  {
    id: "6",
    slug: "be-careful-app",
    titulo: "Be Careful — App de Bem-Estar Estudantil",
    descricao: "Aplicativo pensado e desenhado para ajudar estudantes a lidar com o estresse da vida acadêmica, oferecendo meditação guiada, exercícios de relaxamento e rotinas de autocuidado.",
    imagem_capa: becarefulCover,
    categoria: "UX Design",
    ferramentas: ["Figma", "UX Research", "UI Design"],
    galeria_de_imagens: [becarefulMockup1, becarefulMockup2, becarefulMockup3],
    contexto: "A vida estudantil é marcada por prazos apertados, provas, pressão por desempenho e ansiedade constante. Muitos alunos não têm acesso a ferramentas práticas para gerenciar o estresse do dia a dia acadêmico, o que impacta diretamente sua saúde mental e rendimento.",
    objetivo: "Criar um aplicativo acessível e acolhedor que guie estudantes por práticas de autocuidado — como meditação, exercícios de respiração e relaxamento muscular — integrando essas rotinas de forma simples e natural ao cotidiano acadêmico.",
    processo: {
      research: "Realizei pesquisas qualitativas com 20 estudantes universitários para mapear os principais gatilhos de estresse acadêmico. Identifiquei que 85% relataram ansiedade em períodos de provas e que a maioria desconhecia técnicas de relaxamento.",
      wireframe: "Estruturei os fluxos principais — rotina diária, meditação e exercícios de relaxamento — priorizando uma navegação intuitiva e rápida. Cada funcionalidade foi projetada para ser usada em intervalos curtos entre aulas.",
      ui_design: "Desenvolvi uma interface com gradientes suaves em tons de roxo e azul, transmitindo calma e acolhimento. Cards de atividades com tempo estimado, progresso visual e dicas motivacionais reforçam o engajamento diário.",
    },
    resultado: "Testes de usabilidade com 15 estudantes mostraram que 92% consideraram o app fácil de usar e relataram uma redução perceptível no nível de estresse após uma semana de uso. O tempo médio de sessão foi de 8 minutos, indicando alto engajamento.",
    tags: ["Mobile", "Saúde Mental", "Estudantes"],
    link_projeto: "https://www.figma.com/proto/aRGGZkkFgK6ihylePoL2qe/Sa%C3%BAde-mental-fluxo-1?node-id=245-178&viewport=-58%2C157%2C0.25&t=t3DWo85LH5QiZmJq-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
    titulo_en: "Be Careful — Student Wellness App",
    descricao_en: "An app designed to help students cope with the stress of academic life, offering guided meditation, relaxation exercises, and self-care routines.",
    categoria_en: "UX Design",
    contexto_en: "Student life is marked by tight deadlines, exams, performance pressure, and constant anxiety. Many students lack access to practical tools to manage everyday academic stress, which directly impacts their mental health and performance.",
    objetivo_en: "Create an accessible and welcoming app that guides students through self-care practices — such as meditation, breathing exercises, and muscle relaxation — integrating these routines simply and naturally into their academic daily life.",
    resultado_en: "Usability tests with 15 students showed that 92% found the app easy to use and reported a noticeable reduction in stress levels after one week of use. The average session time was 8 minutes, indicating high engagement.",
    processo_en: {
      research: "I conducted qualitative research with 20 university students to map the main triggers of academic stress. I found that 85% reported anxiety during exam periods and most were unaware of relaxation techniques.",
      wireframe: "I structured the main flows — daily routine, meditation, and relaxation exercises — prioritizing intuitive and quick navigation. Each feature was designed to be used in short breaks between classes.",
      ui_design: "I developed an interface with soft gradients in purple and blue tones, conveying calm and warmth. Activity cards with estimated time, visual progress, and motivational tips reinforce daily engagement.",
    },
  },
  {
    id: "7",
    slug: "guia-acessivel-app",
    titulo: "Guia Acessível — App de Acessibilidade Urbana",
    descricao: "Aplicativo colaborativo que mapeia e avalia locais acessíveis nas cidades, com filtros de acessibilidade, comandos de voz, rotas adaptadas e sistema de avaliações para pessoas com deficiência.",
    imagem_capa: guiaAcessivelCover,
    categoria: "UX Design",
    ferramentas: ["Figma", "Lovable", "UX Research", "UI Design"],
    galeria_de_imagens: [guiaAcessivelMockup1, guiaAcessivelMockup2, guiaAcessivelMockup3],
    contexto: "Pessoas com deficiência enfrentam dificuldades diárias para encontrar locais acessíveis nas cidades. A falta de informações confiáveis sobre acessibilidade de estabelecimentos gera insegurança, exclusão social e limita a autonomia dessas pessoas no ambiente urbano.",
    objetivo: "Criar um aplicativo colaborativo e inclusivo que permita encontrar, avaliar e compartilhar informações sobre a acessibilidade de locais urbanos — com mapa interativo, filtros por tipo de recurso acessível, comandos de voz e navegação por rotas adaptadas.",
    processo: {
      research: "Realizei pesquisas com 25 pessoas com diferentes tipos de deficiência para mapear as principais barreiras de acessibilidade urbana. Identifiquei que 90% não confiavam nas informações de acessibilidade disponíveis online e desejavam um sistema colaborativo e verificado.",
      wireframe: "Estruturei os fluxos principais — mapa com filtros, detalhes do local com checklist de acessibilidade, sistema de avaliações e adição de novos locais. Priorizei navegação simplificada, compatibilidade com leitores de tela e comandos de voz.",
      ui_design: "Desenvolvi uma interface com alto contraste, paleta de azul marinho e teal transmitindo confiança e inclusão. Botões com tamanho mínimo de 48px, ícones descritivos e feedback por áudio garantem uma experiência verdadeiramente acessível.",
    },
    resultado: "O protótipo foi validado com 20 usuários com deficiência e obteve nota 9.2/10 em usabilidade. 95% dos participantes afirmaram que usariam o app no dia a dia. O sistema de checklist de acessibilidade foi destacado como o recurso mais valioso.",
    tags: ["Mobile", "Acessibilidade", "Mapa", "Inclusão"],
    link_projeto: "https://lovable.dev/projects/f428d7ad-7ac3-4baa-9d42-82594592de66",
    titulo_en: "Guia Acessível — Urban Accessibility App",
    descricao_en: "A collaborative app that maps and rates accessible locations in cities, featuring accessibility filters, voice commands, adapted routes, and a review system for people with disabilities.",
    categoria_en: "UX Design",
    contexto_en: "People with disabilities face daily challenges finding accessible locations in cities. The lack of reliable accessibility information about establishments creates insecurity, social exclusion, and limits their autonomy in urban environments.",
    objetivo_en: "Create a collaborative and inclusive app that allows users to find, rate, and share accessibility information about urban locations — with an interactive map, filters by accessibility feature, voice commands, and adapted route navigation.",
    resultado_en: "The prototype was validated with 20 users with disabilities and scored 9.2/10 in usability. 95% of participants said they would use the app daily. The accessibility checklist system was highlighted as the most valuable feature.",
    processo_en: {
      research: "I conducted research with 25 people with different types of disabilities to map the main barriers to urban accessibility. I found that 90% did not trust the accessibility information available online and wanted a collaborative, verified system.",
      wireframe: "I structured the main flows — map with filters, location details with accessibility checklist, review system, and new location submission. I prioritized simplified navigation, screen reader compatibility, and voice commands.",
      ui_design: "I developed an interface with high contrast, a navy blue and teal palette conveying trust and inclusion. Buttons with a minimum size of 48px, descriptive icons, and audio feedback ensure a truly accessible experience.",
    },
  },
];
