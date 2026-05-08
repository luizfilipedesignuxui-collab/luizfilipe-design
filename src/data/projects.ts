export interface Project {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  imagem_capa: string;
  categoria: "UX Design" | "UI Design" | "Product Design" | "UX/UI Design";
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
import guiaAcessivelCover from "@/assets/guia-acessivel-capa.jpg";
import guiaAcessivelMockup1 from "@/assets/guia-acessivel-mockup-1.png";
import guiaAcessivelMockup2 from "@/assets/guia-acessivel-mockup-2.png";
import guiaAcessivelMockup3 from "@/assets/guia-acessivel-mockup-3.png";
import gabrielCover from "@/assets/gabriel-augusto/cover.png";
import gabrielMockup1 from "@/assets/gabriel-augusto/mockup-1.png";
import gabrielMockup2 from "@/assets/gabriel-augusto/mockup-2.png";
import gabrielMockup3 from "@/assets/gabriel-augusto/mockup-3.png";
import gabrielMockup4 from "@/assets/gabriel-augusto/mockup-4.png";

export const projects: Project[] = [
  {
    id: "1",
    slug: "app-mobilidade-pontuo",
    titulo: "Pontuô — App de Mobilidade Urbana",
    descricao: "Aplicativo de mobilidade urbana que conecta usuários a diferentes modais de transporte com uma experiência fluida, intuitiva e sustentável.",
    imagem_capa: pontuoMockup,
    categoria: "UX/UI Design",
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
    link_projeto: "https://www.figma.com/proto/JIvWeZiVjJgLMRkw3DbqWX/APP-Pontou?node-id=2355-3675&page-id=0%3A1&t=9dn76dAWHuNb788Y-1",
    titulo_en: "Pontuô — Urban Mobility App",
    descricao_en: "An urban mobility app that connects users to different transportation modes with a fluid, intuitive, and sustainable experience.",
    categoria_en: "UX/UI Design",
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
    slug: "aura-scent-boutique",
    titulo: "Aura Scent Boutique",
    descricao: "E-commerce de velas artesanais com experiência imersiva, quiz personalizado, chatbot inteligente e design minimalista sofisticado.",
    imagem_capa: "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects/aura-scent-cover.png",
    categoria: "UX/UI Design",
    ferramentas: ["Figma", "Lovable", "Miro"],
    galeria_de_imagens: [
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects/aura-scent-mockup-1.png",
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects/aura-scent-mockup-2.png",
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects/aura-scent-macbook-1.png",
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects/aura-scent-macbook-2.png",
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects/aura-scent-macbook-3.png",
    ],
    contexto: "Usuários que buscam produtos voltados para bem-estar e aromaterapia muitas vezes encontram dificuldade em escolher a vela ideal para cada momento. Em muitos e-commerces, os produtos são apresentados apenas como itens decorativos, sem considerar o contexto emocional ou a experiência sensorial que o usuário procura.\n\nA Aura Scent surge para resolver esse desafio ao oferecer uma experiência de compra mais guiada e intuitiva, ajudando os usuários a descobrir velas aromáticas ideais para diferentes momentos do dia, como relaxamento, foco ou ocasiões especiais.",
    objetivo: "Criar um e-commerce de velas aromáticas que ofereça uma experiência de navegação simples, elegante e sensorial. O projeto busca facilitar a descoberta de produtos através de uma interface intuitiva, recomendações personalizadas e uma jornada de compra fluida.\n\nAlém disso, a proposta é transformar o processo de escolha da vela em uma experiência mais envolvente, conectando o usuário com emoções, ambientes e momentos do cotidiano.",
    processo: {
      research: "Analisei experiências de e-commerces de produtos sensoriais e identifiquei padrões de navegação utilizados na descoberta de produtos. A partir disso, foram definidos os principais fluxos do usuário, incluindo exploração da coleção, descoberta guiada de produtos e processo de compra.",
      wireframe: "Estruturei wireframes para organizar a hierarquia das informações e o fluxo principal do usuário: navegação pela coleção → visualização de produtos → adição ao carrinho → finalização da compra. Também foi planejada a experiência de recomendação através da funcionalidade \"Encontre sua vela\".",
      ui_design: "Desenvolvi a interface visual com foco em transmitir sensações de calma, aconchego e sofisticação. Utilizei cores suaves, tipografia elegante e imagens minimalistas para criar uma experiência sensorial alinhada com a proposta da marca.",
    },
    resultado: "Uma plataforma e-commerce completa com experiência personalizada que aumenta o engajamento do cliente e facilita a descoberta de novos aromas.",
    tags: ["E-commerce", "UX Design", "UI Design", "Branding"],
    link_projeto: "https://soulful-scents.lovable.app",
    titulo_en: "Aura Scent Boutique",
    descricao_en: "Handcrafted candle e-commerce with an immersive experience, personalized quiz, smart chatbot, and sophisticated minimalist design.",
    categoria_en: "UX/UI Design",
    contexto_en: "Users looking for products related to well-being and aromatherapy often struggle to choose the ideal candle for each moment. In many e-commerces, products are presented only as decorative items, without considering the emotional context or sensory experience the user is looking for.\n\nAura Scent was created to solve this challenge by offering a more guided and intuitive shopping experience, helping users discover aromatic candles for different moments of the day, such as relaxation, focus, or special occasions.",
    objetivo_en: "Create an aromatic candle e-commerce that offers a simple, elegant, and sensory browsing experience. The project aims to make product discovery easier through an intuitive interface, personalized recommendations, and a smooth shopping journey.\n\nIn addition, the proposal is to transform the candle selection process into a more engaging experience, connecting the user with emotions, spaces, and everyday moments.",
    resultado_en: "A complete e-commerce platform with a personalized experience that increases customer engagement and makes discovering new aromas easier.",
    processo_en: {
      research: "I analyzed sensory-product e-commerce experiences and identified navigation patterns used in product discovery. From this, the main user flows were defined, including collection exploration, guided discovery, and the purchase journey.",
      wireframe: "I structured wireframes to organize the information hierarchy and the main user flow: browse collection → view products → add to cart → complete purchase. I also planned the recommendation experience through the \"Find your candle\" feature.",
      ui_design: "I developed the visual interface focused on conveying calm, coziness, and sophistication. I used soft colors, elegant typography, and minimalist imagery to create a sensory experience aligned with the brand proposition.",
    },
  },
  {
    id: "3",
    slug: "desafio-saudavel",
    titulo: "Desafio Saudável",
    descricao: "Aplicativo que ajuda grupos de amigos a organizarem desafios fitness coletivos com check-ins diários, ranking, gamificação e cofrinho de penalidades.",
    imagem_capa: "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects%2Fdesafio-saudavel-cover.png",
    categoria: "UX/UI Design",
    ferramentas: ["Figma", "UX Research", "UI Design"],
    galeria_de_imagens: [
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/desafio-saudavel-mockup-1.png",
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/desafio-saudavel-mockup-2.png",
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/desafio-saudavel-mockup-3.png",
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/desafio-saudavel-mockup-4.png",
    ],
    contexto: "A ideia deste projeto surgiu a partir de uma experiência pessoal. Eu e meus amigos participamos de um desafio fitness organizado em um grupo de WhatsApp, onde todos se comprometem a treinar e seguir uma dieta durante um período determinado. Sempre que alguém descumpre alguma dessas regras, precisa depositar um valor simbólico em um cofrinho coletivo. Ao final do desafio, o dinheiro acumulado é usado para realizar alguma atividade em grupo.\n\nApesar de ser uma dinâmica motivadora, percebemos que o controle das regras, check-ins diários e acompanhamento do progresso aconteciam de forma desorganizada dentro do chat. Isso tornava difícil acompanhar quem estava cumprindo o desafio, registrar os resultados e visualizar a evolução do grupo.\n\nA partir dessa experiência surgiu a ideia de criar um aplicativo que centralizasse essas informações e tornasse o desafio mais organizado, visual e motivador para todos os participantes.",
    objetivo: "Criar um aplicativo que ajude grupos de amigos a organizarem desafios fitness coletivos de forma simples e motivadora. A proposta é permitir que os participantes registrem suas atividades diárias, acompanhem seu progresso e visualizem o desempenho do grupo.\n\nO aplicativo também incorpora elementos de gamificação, como ranking, contagem de streaks e acompanhamento de check-ins, além de um sistema simbólico de penalidade financeira (cofrinho coletivo) para incentivar a disciplina e o compromisso com o desafio.\n\nO objetivo é transformar uma dinâmica informal que acontece em grupos de mensagens em uma experiência digital mais organizada, motivadora e divertida.",
    processo: {
      research: "A pesquisa foi baseada na observação da dinâmica real do desafio realizado entre amigos. Analisei como o grupo organizava os treinos, registrava resultados e lidava com as penalidades dentro do WhatsApp, identificando dificuldades no acompanhamento do progresso e na visualização das informações.",
      wireframe: "A estrutura do aplicativo foi organizada para atender os principais fluxos do usuário: criação de grupos, registro diário de atividades (check-in), acompanhamento do ranking e visualização do progresso individual. Os wireframes ajudaram a definir a hierarquia das informações e simplificar as interações principais.",
      ui_design: "O design da interface foi desenvolvido com foco em motivação e clareza visual. Utilizei uma paleta de cores em tons de verde para transmitir saúde, progresso e bem-estar. Componentes como cards, indicadores de progresso, ranking e botões de ação centralizados foram usados para tornar a experiência mais intuitiva e incentivar o uso diário do aplicativo.",
    },
    resultado: "O resultado é um aplicativo mobile com interface limpa e motivadora que centraliza toda a dinâmica do desafio fitness. Com funcionalidades de check-in diário, ranking entre participantes, sistema de streaks e cofrinho coletivo, o app transforma uma experiência informal de WhatsApp em uma plataforma digital organizada e gamificada.",
    link_projeto: "https://diet-buddy-challenge.lovable.app",
    tags: ["Mobile App", "UX Design", "UI Design", "Gamificação", "Saúde & Fitness"],
    titulo_en: "Healthy Challenge",
    descricao_en: "An app that helps groups of friends organize collective fitness challenges with daily check-ins, rankings, gamification, and a shared penalty pot.",
    categoria_en: "UX/UI Design",
    contexto_en: "This project idea came from a personal experience. My friends and I took part in a fitness challenge organized in a WhatsApp group, where everyone committed to training and following a diet for a set period. Whenever someone failed to follow the rules, they had to contribute a symbolic amount to a shared pot. At the end of the challenge, the accumulated money was used for a group activity.\n\nAlthough the dynamic was motivating, we realized that tracking the rules, daily check-ins, and progress happened in a disorganized way inside the chat. This made it difficult to see who was keeping up with the challenge, record results, and visualize the group’s evolution.\n\nFrom this experience came the idea of creating an app that centralizes this information and makes the challenge more organized, visual, and motivating for everyone involved.",
    objetivo_en: "Create an app that helps groups of friends organize collective fitness challenges in a simple and motivating way. The idea is to let participants register their daily activities, track their progress, and visualize the group’s performance.\n\nThe app also includes gamification elements such as rankings, streak counting, and check-in tracking, along with a symbolic financial penalty system (shared pot) to encourage discipline and commitment.\n\nThe goal is to transform an informal challenge that usually happens in message groups into a more organized, motivating, and fun digital experience.",
    resultado_en: "The result is a mobile app with a clean and motivating interface that centralizes the entire fitness challenge dynamic. With daily check-ins, participant rankings, streaks, and a shared pot, the app turns an informal WhatsApp experience into an organized and gamified digital platform.",
    processo_en: {
      research: "The research was based on observing the real dynamics of the challenge carried out among friends. I analyzed how the group organized workouts, recorded results, and handled penalties inside WhatsApp, identifying difficulties in tracking progress and visualizing information.",
      wireframe: "The app structure was organized to support the main user flows: group creation, daily activity registration (check-in), ranking follow-up, and individual progress visualization. The wireframes helped define the information hierarchy and simplify the main interactions.",
      ui_design: "The interface design was developed with a focus on motivation and visual clarity. I used a green color palette to communicate health, progress, and well-being. Components such as cards, progress indicators, rankings, and centralized action buttons made the experience more intuitive and encouraged daily use.",
    },
  },
  {
    id: "6",
    slug: "be-careful-app",
    titulo: "Be Careful — App de Bem-Estar Estudantil",
    descricao: "Aplicativo pensado e desenhado para ajudar estudantes a lidar com o estresse da vida acadêmica, oferecendo meditação guiada, exercícios de relaxamento e rotinas de autocuidado.",
    imagem_capa: becarefulCover,
    categoria: "UX/UI Design",
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
    categoria_en: "UX/UI Design",
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
    categoria: "UX/UI Design",
    ferramentas: ["Figma", "Lovable", "UX Research", "UI Design"],
    galeria_de_imagens: [guiaAcessivelMockup1, guiaAcessivelMockup2, guiaAcessivelMockup3],
    contexto: "Pessoas com deficiência enfrentam dificuldades diárias para encontrar locais acessíveis nas cidades. A falta de informações confiáveis sobre acessibilidade de estabelecimentos gera insegurança, exclusão social e limita a autonomia dessas pessoas no ambiente urbano.",
    objetivo: "Criar um aplicativo colaborativo e inclusivo que permita encontrar, avaliar e compartilhar informações sobre a acessibilidade de locais urbanos — com mapa interativo, filtros por tipo de recurso acessível, comandos de voz e navegação por rotas adaptadas.",
    processo: {
      research: "Realizei pesquisas com 25 pessoas com diferentes tipos de deficiência para mapear as principais barreiras de acessibilidade urbana. Identifiquei que 90% não confiavam nas informações de acessibilidade disponíveis online e desejavam um sistema colaborativo e verificado.",
      wireframe: "Estruturei os fluxos principais — mapa com filtros, detalhes do local com checklist de acessibilidade, sistema de avaliações e adição de novos locais. Priorizei navegação simplificada, compatibilidade com leitores de tela e comandos de voz.",
      ui_design: "Desenvolvi uma interface com alto contraste, paleta de azul marinho e teal transmitindo confiança e inclusão. Botões com tamanho mínimo de 48px, ícones descritivos e feedback por áudio garantem uma experiência verdadeiramente acessível.",
    },
    resultado: "O aplicativo foi desenvolvido com foco total em acessibilidade e inclusão. O sistema de checklist permite que usuários identifiquem rapidamente os recursos disponíveis em cada local. A integração com comandos de voz e leitores de tela garante que o app seja utilizável por pessoas com diferentes tipos de deficiência.",
    tags: ["Mobile", "Acessibilidade", "Mapa", "Inclusão"],
    link_projeto: "https://accessible-paths-guide.lovable.app/",
    titulo_en: "Guia Acessível — Urban Accessibility App",
    descricao_en: "A collaborative app that maps and rates accessible locations in cities, featuring accessibility filters, voice commands, adapted routes, and a review system for people with disabilities.",
    categoria_en: "UX/UI Design",
    contexto_en: "People with disabilities face daily challenges finding accessible locations in cities. The lack of reliable accessibility information about establishments creates insecurity, social exclusion, and limits their autonomy in urban environments.",
    objetivo_en: "Create a collaborative and inclusive app that allows users to find, rate, and share accessibility information about urban locations — with an interactive map, filters by accessibility feature, voice commands, and adapted route navigation.",
    resultado_en: "The app was developed with a total focus on accessibility and inclusion. The checklist system allows users to quickly identify available resources at each location. Integration with voice commands and screen readers ensures the app is usable by people with different types of disabilities.",
    processo_en: {
      research: "I conducted research with 25 people with different types of disabilities to map the main barriers to urban accessibility. I found that 90% did not trust the accessibility information available online and wanted a collaborative, verified system.",
      wireframe: "I structured the main flows — map with filters, location details with accessibility checklist, review system, and new location submission. I prioritized simplified navigation, screen reader compatibility, and voice commands.",
      ui_design: "I developed an interface with high contrast, a navy blue and teal palette conveying trust and inclusion. Buttons with a minimum size of 48px, descriptive icons, and audio feedback ensure a truly accessible experience.",
    },
  },
  {
    id: "8",
    slug: "forjado-fitness",
    titulo: "Forjado — Landing Page para Academia Premium",
    descricao: "Landing page para academia premium com integração ao Supabase, já configurada para receber dados de clientes. Projeto desenvolvido com visão de Design Engineer, unindo design de alta fidelidade e implementação funcional com React, Tailwind CSS e Cursor AI.",
    imagem_capa: "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects%2Fforjado-macbook-cover.png",
    categoria: "UX/UI Design",
    ferramentas: ["Figma", "Cursor AI", "React", "Tailwind CSS", "Supabase"],
    galeria_de_imagens: [
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects%2Fforjado-mockup-1.png",
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects%2Fforjado-mockup-2.png",
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects%2Fforjado-mockup-3.png",
      "https://cyyrgcdtbbugvfljjouo.supabase.co/storage/v1/object/public/media/projects%2Fforjado-mockup-4.png",
    ],
    contexto: "Este projeto foi desenvolvido durante o Workshop \"Do Figma ao Cursor AI\", onde o desafio era criar uma landing page completa para uma academia premium. A proposta era aplicar o fluxo completo de design — do conceito visual no Figma até a implementação funcional com inteligência artificial — resultando em uma página moderna, responsiva e visualmente impactante.",
    objetivo: "Criar uma landing page de alta conversão para a Forjado, uma academia premium focada em performance e resultados. O objetivo era transmitir exclusividade, tecnologia de ponta e um ambiente de treino de elite, guiando o visitante a agendar uma visita ou entrar em contato com um especialista.",
    processo: {
      research: "Analisei referências visuais de academias premium e marcas de lifestyle fitness internacionais. Identifiquei padrões visuais como temas escuros, tipografia bold, gradientes em azul e ciano, e fotografia de alta qualidade como elementos-chave para transmitir exclusividade e alta performance.",
      wireframe: "Estruturei a landing page em seções estratégicas: hero com CTA principal, carrossel de modalidades, estatísticas de impacto, seção sobre o conceito da marca, infraestrutura premium com cards de equipamentos, planos de assinatura e localização.",
      ui_design: "Desenvolvi a interface com tema dark premium, utilizando gradientes de azul ciano e magenta para criar contraste e energia. A tipografia bold e extra-bold reforça a identidade de força da marca. Cards com bordas sutis, ícones customizados e animações de hover completam a experiência visual sofisticada.",
    },
    resultado: "O resultado é uma landing page funcional e publicada, com design dark premium que transmite exclusividade e alta performance. A página conta com hero impactante, seções de infraestrutura, planos, coaches e formulário de contato — tudo responsivo e otimizado para conversão.",
    tags: ["Landing Page", "UI Design", "Web Design", "Fitness", "Workshop"],
    link_projeto: "https://forjado-fitness.vercel.app/",
    titulo_en: "Forjado — Premium Gym Landing Page",
    descricao_en: "Premium gym landing page with Supabase integration, already configured to receive client data. Built with a Design Engineer mindset, combining high-fidelity design and functional implementation with React, Tailwind CSS, and Cursor AI.",
    categoria_en: "UX/UI Design",
    contexto_en: "This project was developed during the \"From Figma to Cursor AI\" Workshop, where the challenge was to create a complete landing page for a premium gym. The goal was to apply the full design flow — from visual concept in Figma to functional implementation with artificial intelligence — resulting in a modern, responsive, and visually impactful page.",
    objetivo_en: "Create a high-conversion landing page for Forjado, a premium gym focused on performance and results. The goal was to convey exclusivity, cutting-edge technology, and an elite training environment, guiding visitors to schedule a visit or contact a specialist.",
    resultado_en: "The result is a functional and published landing page with premium dark design that conveys exclusivity and high performance. The page features an impactful hero, infrastructure sections, plans, coaches, and a contact form — all responsive and optimized for conversion.",
    processo_en: {
      research: "I analyzed visual references from premium gyms and international fitness lifestyle brands. I identified visual patterns such as dark themes, bold typography, blue and cyan gradients, and high-quality photography as key elements to convey exclusivity and high performance.",
      wireframe: "I structured the landing page into strategic sections: hero with main CTA, modality carousel, impact statistics, brand concept section, premium infrastructure with equipment cards, subscription plans, and location.",
      ui_design: "I developed the interface with a premium dark theme, using cyan blue and magenta gradients to create contrast and energy. Bold and extra-bold typography reinforces the brand's strength identity. Cards with subtle borders, custom icons, and hover animations complete the sophisticated visual experience.",
    },
  },
  {
    id: "9",
    slug: "gabriel-augusto-psicanalista",
    titulo: "Gabriel Augusto: Site para Psicanalista",
    descricao: "Projeto Design Engineer feito por mim do início ao fim, desde o descobrimento e pesquisa até o design, desenvolvimento e deploy. Site institucional acolhedor para um psicanalista clínico que atende online em todo o Brasil.",
    imagem_capa: gabrielCover,
    categoria: "UX/UI Design",
    ferramentas: ["Figma", "Lovable", "React", "Tailwind CSS", "Supabase"],
    galeria_de_imagens: [gabrielMockup1, gabrielMockup2, gabrielMockup3, gabrielMockup4],
    contexto: "Projeto Design Engineer conduzido por mim do início ao fim, descobrimento, pesquisa, arquitetura de informação, UI design, desenvolvimento e deploy do site no ar.\n\nGabriel Augusto é psicanalista clínico e atende crianças, jovens e adultos 100% online em todo o Brasil. Ele precisava de uma presença digital séria, acolhedora e profissional, capaz de transmitir confiança logo nos primeiros segundos e converter visitantes em sessões agendadas via WhatsApp.",
    objetivo: "Construir um site institucional que comunicasse autoridade clínica e, ao mesmo tempo, acolhimento humano. O site precisava facilitar o agendamento da primeira sessão, explicar como funciona a psicanálise online e responder às principais dúvidas de quem nunca fez terapia antes.",
    processo: {
      research: "Conduzi entrevistas e análise de referências de outros psicanalistas e psicólogos para entender o que gera confiança em um público que muitas vezes está fragilizado emocionalmente. Mapeei objeções comuns (preço, sigilo, formato online) e estruturei a jornada para responder cada uma delas no momento certo da rolagem.",
      wireframe: "Desenhei wireframes priorizando uma hierarquia editorial clara: hero emocional com CTA direto para o WhatsApp, faixa de credenciais, sobre, como funcionam as sessões, depoimentos de pacientes, FAQ e CTA final. O fluxo foi pensado para reduzir atrito e levar o visitante naturalmente até o agendamento.",
      ui_design: "Desenvolvi a identidade visual com paleta em azul-marinho profundo, bege quente e amarelo manuscrito como acento emocional. Tipografia bold em caixa alta para os títulos e fonte cursiva para o detalhe humano. Implementei tudo em React + Tailwind no Lovable, com responsividade total e botão flutuante de WhatsApp.",
    },
    resultado: "Site no ar, totalmente responsivo, com integração direta ao WhatsApp do psicanalista, blog para conteúdo de autoridade e estrutura preparada para SEO local. Entreguei o projeto completo, do descobrimento ao deploy, atuando como Design Engineer.",
    tags: ["Design Engineer", "Landing Page", "UI Design", "Web Design", "Saúde Mental"],
    link_projeto: "https://gabriel-augusto-design.lovable.app/",
    titulo_en: "Gabriel Augusto: Psychoanalyst Website",
    descricao_en: "Design Engineer project I led end-to-end, from discovery and research to design, development and deploy. A warm institutional website for a clinical psychoanalyst offering online sessions across Brazil.",
    categoria_en: "UX/UI Design",
    contexto_en: "Design Engineer project I led end-to-end, discovery, research, information architecture, UI design, development and deploy of the live website.\n\nGabriel Augusto is a clinical psychoanalyst working 100% online with children, young people and adults across Brazil. He needed a serious, warm and professional digital presence, one that builds trust in the first seconds and converts visitors into scheduled sessions via WhatsApp.",
    objetivo_en: "Build an institutional website that communicates clinical authority and, at the same time, human warmth. The site needed to make booking the first session easy, explain how online psychoanalysis works and answer the main doubts of people who have never been to therapy before.",
    resultado_en: "Live, fully responsive website with direct WhatsApp integration, a blog for authority content and a structure ready for local SEO. I delivered the full project, from discovery to deploy, acting as a Design Engineer.",
    processo_en: {
      research: "I ran interviews and reference analysis of other psychoanalysts and psychologists to understand what builds trust with an audience that is often emotionally vulnerable. I mapped common objections (price, confidentiality, online format) and structured the journey to address each one at the right moment of the scroll.",
      wireframe: "I designed wireframes with a clear editorial hierarchy: emotional hero with a direct WhatsApp CTA, credential bar, about, how sessions work, patient testimonials, FAQ and a final CTA. The flow was crafted to reduce friction and naturally guide the visitor to booking.",
      ui_design: "I developed the visual identity with a deep navy, warm beige and handwritten yellow accent palette. Bold uppercase typography for headlines and a cursive font for the human detail. I shipped everything in React + Tailwind on Lovable, fully responsive and with a floating WhatsApp button.",
    },
  },
];