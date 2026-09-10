import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Nav
    "nav.about": "Sobre",
    "nav.skills": "Habilidades",
    "nav.certificates": "Certificados",
    "nav.process": "Processo",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",

    // Hero
    "hero.cta_primary": "Ver projetos",
    "hero.cta_secondary": "Falar comigo",
    "hero.role": "UX/UI Designer & Design Engineer",
    "hero.subtitle": "Desenho e construo apps, sites e produtos digitais — do Figma ao código. Para times que contratam UX/UI e para negócios que precisam de um produto claro, bonito e pronto para crescer.",
    "hero.stat_projects": "Projetos entregues",
    "hero.stat_dedication": "Foco no resultado",
    "hero.service_ux_title": "UX/UI Design",
    "hero.service_ux": "Pesquisa, fluxos e interfaces fáceis de usar",
    "hero.service_brand_title": "Sites e landing pages",
    "hero.service_brand": "Páginas no ar, claras e feitas para converter",
    "hero.service_responsive_title": "Apps e SaaS",
    "hero.service_responsive": "Produtos digitais do conceito à publicação",
    "hero.service_prototyping_title": "Do Figma ao código",
    "hero.service_prototyping": "Design Engineer: prototipo e implemento em React",

    // About
    "about.bridge": "Primeiro, quem está por trás do design",
    "about.title_default": "Sobre\nmim",
    "about.text_1_default": "Sou Luiz Filipe, UX/UI Designer e Design Engineer. Não paro no protótipo: desenho a experiência e também publico o produto — sites, apps e SaaS com React, Tailwind e Supabase.",
    "about.text_2_default": "Tenho 28 anos e formação em Design Digital e User Experience pela Uniasselvi. Atuo com pesquisa, wireframes, prototipação, UI e implementação ponta a ponta.",
    "about.text_3_default": "Se você é recrutador: entrego design com método, documentação clara e capacidade de trabalhar próximo ao time de produto e desenvolvimento. Se você busca um serviço: crio e publico sites, apps, SaaS e redesigns com foco em usabilidade e conversão.",
    "about.text_4_default": "Neste portfólio estão cases reais — incluindo produtos que eu mesmo levei do Figma ao ar — o processo que sigo e o que posso entregar para o seu time ou negócio.",
    "about.highlight_years": "Anos",
    "about.highlight_specialty": "Especialidade",
    "about.spec_uxui_desc": "Pesquisa, wireframes, protótipos e interfaces modernas focadas no usuário.",
    "about.spec_de_desc": "Design Engineer: levo do Figma ao código e publico com React, Tailwind e Supabase.",
    "about.highlight_curiosity": "Curiosidade",
    "about.tools_title": "Ferramentas que uso",

    // Skills
    "skills.bridge": "Do perfil às competências",
    "skills.title": "Habilidades",
    "skills.subtitle": "O que aplico no dia a dia para entregar produtos digitais claros, usáveis e alinhados ao negócio.",
    "skills.ux_desc": "Experiências fáceis de usar, com foco em usabilidade e acessibilidade.",
    "skills.research_desc": "Entrevistas e análise de dados para entender o que o usuário realmente precisa.",
    "skills.wireframe_desc": "Estrutura de telas e fluxos antes de investir no visual final.",
    "skills.prototype_desc": "Protótipos clicáveis de alta fidelidade para testar e alinhar o time.",
    "skills.ui_desc": "Interfaces modernas, consistentes e alinhadas à identidade da marca.",
    "skills.design_system_desc": "Componentes reutilizáveis para manter consistência e acelerar o time.",
    "skills.interaction_desc": "Microinterações e animações que tornam o uso mais claro e agradável.",
    "skills.product_desc": "Decisões de design ligadas a objetivos de produto e negócio.",
    "skills.prototype_title": "Prototipação",

    // Certificates
    "certificates.bridge": "Depois dos cases, a formação contínua",
    "certificates.title": "Certificados",
    "certificates.subtitle": "Formações que reforçam minha prática em UX/UI e Design Engineering.",
    "certificates.view": "Ver certificado",
    "certificates.view_details": "Ver detalhes",
    "certificates.alt": "Certificado de",
    "certificates.topics": "O que aprendi",
    "certificates.meta.date": "Data",
    "certificates.meta.hours": "Carga horária",
    "certificates.meta.format": "Formato",
    "certificates.meta.instructor": "Facilitador",
    "certificates.figma_cursor.desc": "Workshop prático para criar sites e sistemas completos, do escopo de design ao deploy. Integração Figma MCP com Cursor AI, unindo UI, UX, Design Tokens, front-end e back-end em um fluxo moderno.",
    "certificates.figma_cursor.topics": "Integração entre Figma MCP e Cursor AI|Criação de Design Tokens estruturados|Desenvolvimento front-end com IA|Implementação back-end AI-first|Deploy de aplicações completas|Fluxo do escopo de design à produção",
    "certificates.ga.desc": "Workshop sobre Google Analytics aplicado a UX: configurar, ler dados e usar métricas reais de comportamento para decisões de design.",
    "certificates.ga.topics": "Configuração do Google Analytics|Métricas essenciais para UX|Interpretação de comportamento|Decisões baseadas em dados|Análise de jornada do usuário",

    // Process
    "process.bridge": "Das habilidades ao método",
    "process.title": "Processo de design",
    "process.subtitle": "Como trabalho, passo a passo, para entregar produtos digitais que resolvem problemas reais.",
    "process.discovery": "Descoberta",
    "process.discovery_desc": "Alinhar objetivos do negócio, público e restrições do projeto.",
    "process.research": "Pesquisa",
    "process.research_desc": "Ouvir usuários e analisar o contexto para validar hipóteses.",
    "process.ideation": "Ideação",
    "process.ideation_desc": "Gerar e priorizar soluções com o time e stakeholders.",
    "process.wireframing": "Wireframes",
    "process.wireframing_desc": "Definir estrutura, conteúdo e fluxo de navegação.",
    "process.prototyping": "Prototipação",
    "process.prototyping_desc": "Criar protótipos interativos para validar antes do desenvolvimento.",
    "process.testing": "Testes",
    "process.testing_desc": "Testar com usuários reais e ajustar com base no feedback.",
    "process.delivery": "Entrega",
    "process.delivery_desc": "Documentar e entregar assets prontos para o time de desenvolvimento — ou publicar o produto.",

    // Marquee
    "marquee.prototyping": "PROTOTIPAÇÃO",

    // Statement
    "statement.bridge": "A ideia que guia cada entrega",
    "statement.quote": "Design não é só aparência.",
    "statement.quote_highlight": "Design é como funciona.",

    // Projects
    "projects.bridge": "Do método aos resultados",
    "projects.title": "Projetos",
    "projects.subtitle": "Cases de UX/UI e Design Engineering — apps, sites, e-commerces e produtos digitais.",
    "projects.coming_soon": "Em breve",
    "projects.coming_soon_desc": "Estou preparando novos projetos para compartilhar. Volte em breve!",
    "projects.view_case": "Ver case completo",
    "projects.view_all": "Ver todos os projetos",

    // Projects page
    "projects_page.title_1": "Todos os ",
    "projects_page.title_2": "Projetos",
    "projects_page.subtitle": "Todos os cases de UX/UI Design e Design Engineering.",
    "projects_page.coming_soon": "Em breve",
    "projects_page.coming_soon_desc": "Estou preparando novos projetos para compartilhar. Fique de olho!",
    "projects_page.back": "Voltar",

    // Case Study
    "case.back": "Voltar aos projetos",
    "case.context": "Contexto do problema",
    "case.objective": "Objetivo do projeto",
    "case.process": "Processo de design",
    "case.tools": "Ferramentas usadas",
    "case.gallery": "Telas do projeto",
    "case.result": "Resultado",
    "case.not_found": "Projeto não encontrado",
    "case.view_all": "Ver todos os projetos",
    "case.view_live": "Ver site no ar",
    "case.lightbox_alt": "Visualização ampliada",
    "case.name_meaning": "Significado do nome",
    "case.created_by_me": "App criado por mim",
    "case.grade_highlight": "Nota máxima na faculdade",
    "case.grade_highlight_desc": "Este projeto recebeu nota 10 na apresentação acadêmica, pela qualidade do design e pela solução centrada no usuário.",
    "case.be_careful_intro": "Este app foi pensado para apoiar estudantes na fase mais intensa da vida acadêmica, com ferramentas práticas de autocuidado ao alcance de um toque.",
    "case.coming_soon_stores": "Em breve nas lojas",
    "case.coming_soon_stores_desc": "O MarmitaGest estará disponível em breve na App Store e na Google Play.",

    // Contact
    "contact.bridge": "Pronto para o próximo passo",
    "contact.title_default": "Vamos conversar\nsobre o próximo passo",
    "contact.subtitle_default": "Aberto a vagas de UX/UI e Design Engineering, e a projetos sob demanda: sites, apps, SaaS, landing pages e redesign. Me conte o que você precisa — vaga, briefing ou ideia.",
    "contact.cta": "Entrar em contato",

    // Footer
    "footer.tagline_default": "UX/UI Designer e Design Engineer — do conceito ao código, para times e para negócios.",
    "footer.navigation": "Navegação",
    "footer.connect": "Contato",
    "footer.rights": "© 2026 Luiz Filipe. Todos os direitos reservados.",
    "footer.made_with": "Feito com ♥ e muito café",

    // Design System
    "ds.title": "Design System",
    "ds.subtitle": "O sistema visual que mantém consistência e escala em todos os projetos.",
    "ds.colors": "Paleta de cores",
    "ds.typography": "Tipografia",
    "ds.titles": "Títulos",
    "ds.body": "Corpo",
    "ds.buttons": "Botões",
    "ds.primary": "Primário",
    "ds.outline": "Outline",
    "ds.secondary": "Secundário",
    "ds.ghost": "Ghost",
    "ds.components": "Componentes",
    "ds.component_desc": "Componente reutilizável do design system.",
    "ds.project_card": "Card de projeto",
    "ds.tag_badge": "Badge de tag",
    "ds.skill_icon": "Ícone de habilidade",

    // 404
    "notfound.title": "404",
    "notfound.message": "Página não encontrada",
    "notfound.back": "Voltar ao início",
  },
  en: {
    // Nav
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.certificates": "Certificates",
    "nav.process": "Process",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero
    "hero.cta_primary": "View projects",
    "hero.cta_secondary": "Get in touch",
    "hero.role": "UX/UI Designer & Design Engineer",
    "hero.subtitle": "I design and build apps, websites, and digital products — from Figma to code. For teams hiring UX/UI talent, and for businesses that need a clear, polished product ready to grow.",
    "hero.stat_projects": "Projects delivered",
    "hero.stat_dedication": "Focused on results",
    "hero.service_ux_title": "UX/UI Design",
    "hero.service_ux": "Research, flows, and interfaces that are easy to use",
    "hero.service_brand_title": "Websites & landing pages",
    "hero.service_brand": "Live pages built clear and ready to convert",
    "hero.service_responsive_title": "Apps & SaaS",
    "hero.service_responsive": "Digital products from concept to launch",
    "hero.service_prototyping_title": "From Figma to code",
    "hero.service_prototyping": "Design Engineer: I prototype and ship in React",

    // About
    "about.bridge": "First, who is behind the design",
    "about.title_default": "About\nme",
    "about.text_1_default": "I'm Luiz Filipe, a UX/UI Designer and Design Engineer. I don't stop at the prototype: I design the experience and also ship the product — websites, apps, and SaaS with React, Tailwind, and Supabase.",
    "about.text_2_default": "I'm 28 and hold a degree in Digital Design and User Experience from Uniasselvi. I work across research, wireframes, prototyping, UI, and end-to-end implementation.",
    "about.text_3_default": "If you're a recruiter: I bring structured design, clear documentation, and the ability to partner with product and engineering. If you're looking for a service: I design and ship websites, apps, SaaS products, and redesigns focused on usability and conversion.",
    "about.text_4_default": "In this portfolio you'll find real case studies — including products I took from Figma to live — the process I follow, and what I can deliver for your team or business.",
    "about.highlight_years": "Years",
    "about.highlight_specialty": "Specialty",
    "about.spec_uxui_desc": "Research, wireframes, prototypes, and modern user-focused interfaces.",
    "about.spec_de_desc": "Design Engineer: I go from Figma to code and ship with React, Tailwind, and Supabase.",
    "about.highlight_curiosity": "Curiosity",
    "about.tools_title": "Tools I use",

    // Skills
    "skills.bridge": "From profile to capabilities",
    "skills.title": "Skills",
    "skills.subtitle": "What I use day to day to deliver digital products that are clear, usable, and aligned with the business.",
    "skills.ux_desc": "Easy-to-use experiences focused on usability and accessibility.",
    "skills.research_desc": "Interviews and data analysis to understand what users really need.",
    "skills.wireframe_desc": "Screen structure and flows before investing in final visuals.",
    "skills.prototype_desc": "High-fidelity clickable prototypes to test and align the team.",
    "skills.ui_desc": "Modern, consistent interfaces aligned with the brand.",
    "skills.design_system_desc": "Reusable components to keep consistency and speed up the team.",
    "skills.interaction_desc": "Micro-interactions and animations that make usage clearer and more pleasant.",
    "skills.product_desc": "Design decisions tied to product and business goals.",
    "skills.prototype_title": "Prototyping",

    // Certificates
    "certificates.bridge": "After the cases, continuous learning",
    "certificates.title": "Certificates",
    "certificates.subtitle": "Training that strengthens my practice in UX/UI and Design Engineering.",
    "certificates.view": "View certificate",
    "certificates.view_details": "View details",
    "certificates.alt": "Certificate of",
    "certificates.topics": "What I learned",
    "certificates.meta.date": "Date",
    "certificates.meta.hours": "Duration",
    "certificates.meta.format": "Format",
    "certificates.meta.instructor": "Instructor",
    "certificates.figma_cursor.desc": "Hands-on workshop to build complete websites and systems, from design scope to deploy. Integrating Figma MCP with Cursor AI — combining UI, UX, Design Tokens, front-end, and back-end in a modern workflow.",
    "certificates.figma_cursor.topics": "Figma MCP and Cursor AI integration|Building structured Design Tokens|AI-powered front-end development|AI-first back-end implementation|Full application deployment|End-to-end design-to-production workflow",
    "certificates.ga.desc": "Workshop on Google Analytics for UX: set up, read data, and use real behavior metrics to guide design decisions.",
    "certificates.ga.topics": "Google Analytics setup|Essential UX metrics|Behavioral data interpretation|Data-driven decisions|User journey analysis",

    // Process
    "process.bridge": "From skills to method",
    "process.title": "Design process",
    "process.subtitle": "How I work, step by step, to deliver digital products that solve real problems.",
    "process.discovery": "Discovery",
    "process.discovery_desc": "Align business goals, audience, and project constraints.",
    "process.research": "Research",
    "process.research_desc": "Listen to users and analyze context to validate assumptions.",
    "process.ideation": "Ideation",
    "process.ideation_desc": "Generate and prioritize solutions with the team and stakeholders.",
    "process.wireframing": "Wireframes",
    "process.wireframing_desc": "Define structure, content, and navigation flow.",
    "process.prototyping": "Prototyping",
    "process.prototyping_desc": "Build interactive prototypes to validate before development.",
    "process.testing": "Testing",
    "process.testing_desc": "Test with real users and iterate based on feedback.",
    "process.delivery": "Delivery",
    "process.delivery_desc": "Document and hand off assets for engineering — or ship the product myself.",

    // Marquee
    "marquee.prototyping": "PROTOTYPING",

    // Statement
    "statement.bridge": "The idea behind every delivery",
    "statement.quote": "Design is not just how it looks.",
    "statement.quote_highlight": "Design is how it works.",

    // Projects
    "projects.bridge": "From method to results",
    "projects.title": "Projects",
    "projects.subtitle": "UX/UI and Design Engineering case studies — apps, websites, e-commerce, and digital products.",
    "projects.coming_soon": "Coming soon",
    "projects.coming_soon_desc": "I'm preparing new projects to share here. Check back soon!",
    "projects.view_case": "View full case",
    "projects.view_all": "View all projects",

    // Projects page
    "projects_page.title_1": "All ",
    "projects_page.title_2": "Projects",
    "projects_page.subtitle": "All UX/UI Design and Design Engineering case studies.",
    "projects_page.coming_soon": "Coming soon",
    "projects_page.coming_soon_desc": "I'm preparing new projects to share here. Stay tuned!",
    "projects_page.back": "Back",

    // Case Study
    "case.back": "Back to projects",
    "case.context": "Problem context",
    "case.objective": "Project goal",
    "case.process": "Design process",
    "case.tools": "Tools used",
    "case.gallery": "Project screens",
    "case.result": "Outcome",
    "case.not_found": "Project not found",
    "case.view_all": "View all projects",
    "case.view_live": "View live site",
    "case.lightbox_alt": "Enlarged view",
    "case.name_meaning": "Name meaning",
    "case.created_by_me": "App I built",
    "case.grade_highlight": "Top grade in college",
    "case.grade_highlight_desc": "This project received a perfect score of 10 in the academic presentation for design quality and its user-centered solution.",
    "case.be_careful_intro": "This app was designed to support students through the most intense phase of academic life, with practical self-care tools at their fingertips.",
    "case.coming_soon_stores": "Coming soon to the stores",
    "case.coming_soon_stores_desc": "MarmitaGest will soon be available on the App Store and Google Play.",

    // Contact
    "contact.bridge": "Ready for the next step",
    "contact.title_default": "Let's talk about\nthe next step",
    "contact.subtitle_default": "Open to UX/UI and Design Engineering roles, and to project-based work: websites, apps, SaaS, landing pages, and redesigns. Tell me what you need — a role, a brief, or an idea.",
    "contact.cta": "Get in touch",

    // Footer
    "footer.tagline_default": "UX/UI Designer and Design Engineer — from concept to code, for teams and for businesses.",
    "footer.navigation": "Navigation",
    "footer.connect": "Connect",
    "footer.rights": "© 2026 Luiz Filipe. All rights reserved.",
    "footer.made_with": "Made with ♥ and lots of coffee",

    // Design System
    "ds.title": "Design System",
    "ds.subtitle": "The visual system that keeps consistency and scale across every project.",
    "ds.colors": "Color palette",
    "ds.typography": "Typography",
    "ds.titles": "Headings",
    "ds.body": "Body",
    "ds.buttons": "Buttons",
    "ds.primary": "Primary",
    "ds.outline": "Outline",
    "ds.secondary": "Secondary",
    "ds.ghost": "Ghost",
    "ds.components": "Components",
    "ds.component_desc": "Reusable design system component.",
    "ds.project_card": "Project card",
    "ds.tag_badge": "Tag badge",
    "ds.skill_icon": "Skill icon",

    // 404
    "notfound.title": "404",
    "notfound.message": "Page not found",
    "notfound.back": "Back to home",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("site-language");
    return (saved === "en" ? "en" : "pt") as Language;
  });

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "pt" ? "en" : "pt";
      localStorage.setItem("site-language", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string) => translations[language][key] || key,
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
