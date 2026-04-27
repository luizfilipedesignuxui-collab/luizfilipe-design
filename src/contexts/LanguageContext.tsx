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
    "hero.cta_primary": "Ver Projetos",
    "hero.cta_secondary": "Contato",
    "hero.stat_projects": "Projetos",
    "hero.stat_experience": "Anos de experiência",
    "hero.stat_dedication": "Dedicação",
    "hero.service_ux": "Experiências focadas no usuário",
    "hero.service_brand": "Identidade visual e de marca",
    "hero.service_responsive": "Interfaces adaptáveis",
    "hero.service_prototyping": "Protótipos interativos",

    // About
    "about.title_default": "Sobre\nmim",
    "about.text_1_default": "Meu nome é Luiz Filipe. Sou UX/UI Designer apaixonado por criar experiências digitais que conectam pessoas e tecnologia.",
    "about.text_2_default": "Tenho 28 anos e sou formado em Design Digital e User Experience pela Universidade Uniasselvi.",
    "about.text_3_default": "Meu trabalho envolve pesquisa de usuários, criação de wireframes, prototipação e desenvolvimento de interfaces modernas que resolvem problemas reais.",
    "about.text_4_default": "Neste portfólio você encontrará meus projetos, meu processo de design e minha abordagem para criar experiências digitais relevantes.",
    "about.highlight_years": "Anos",
    "about.highlight_specialty": "Especialidade",
    "about.highlight_curiosity": "Curiosidade",
    "about.tools_title": "Ferramentas que utilizo",

    // Skills
    "skills.title": "Habilidades",
    "skills.subtitle": "Competências que utilizo para transformar ideias em produtos digitais excepcionais.",
    "skills.ux_desc": "Experiências centradas no usuário com foco em usabilidade e acessibilidade.",
    "skills.research_desc": "Pesquisas qualitativas e quantitativas para entender necessidades reais.",
    "skills.wireframe_desc": "Estruturação visual de fluxos e interfaces antes da prototipação.",
    "skills.prototype_desc": "Protótipos interativos de alta fidelidade para validação com usuários.",
    "skills.ui_desc": "Interfaces visuais modernas, consistentes e alinhadas à marca.",
    "skills.design_system_desc": "Sistemas de design escaláveis com componentes reutilizáveis.",
    "skills.interaction_desc": "Microinterações e animações que enriquecem a experiência.",
    "skills.product_desc": "Pensamento estratégico de produto aliado ao design.",
    "skills.prototype_title": "Prototipação",

    // Certificates
    "certificates.title": "Certificados",
    "certificates.subtitle": "Cursos e formações que reforçam minha trajetória em UX/UI Design.",
    "certificates.view": "Ver certificado",
    "certificates.alt": "Certificado de",


    // Process
    "process.title": "Processo de Design",
    "process.subtitle": "Minha abordagem estruturada para criar produtos digitais que resolvem problemas reais.",
    "process.discovery": "Descoberta",
    "process.discovery_desc": "Entender o contexto do negócio, objetivos e restrições do projeto.",
    "process.research": "Pesquisa",
    "process.research_desc": "Investigar necessidades dos usuários através de entrevistas e análises.",
    "process.ideation": "Ideação",
    "process.ideation_desc": "Gerar soluções criativas através de brainstorming e workshops.",
    "process.wireframing": "Wireframing",
    "process.wireframing_desc": "Estruturar a arquitetura de informação e fluxos de navegação.",
    "process.prototyping": "Prototipação",
    "process.prototyping_desc": "Criar protótipos interativos de alta fidelidade para validação.",
    "process.testing": "Testes",
    "process.testing_desc": "Validar soluções com usuários reais e iterar com base em feedbacks.",
    "process.delivery": "Entrega",
    "process.delivery_desc": "Documentar e entregar assets para implementação do time de desenvolvimento.",

    // Marquee
    "marquee.prototyping": "PROTOTIPAÇÃO",

    // Statement
    "statement.quote": "Design não é apenas como parece.",
    "statement.quote_highlight": "Design é como funciona.",

    // Projects
    "projects.title": "Projetos",
    "projects.subtitle": "Uma seleção dos meus trabalhos mais recentes em UX/UI Design.",
    "projects.coming_soon": "Em breve",
    "projects.coming_soon_desc": "Estou preparando meus projetos para compartilhar aqui. Volte em breve!",
    "projects.view_case": "Ver Case Completo",
    "projects.view_all": "Ver todos os projetos",

    // Projects page
    "projects_page.title_1": "Todos os ",
    "projects_page.title_2": "Projetos",
    "projects_page.subtitle": "Explore todos os meus trabalhos em UX/UI Design.",
    "projects_page.coming_soon": "Em breve",
    "projects_page.coming_soon_desc": "Estou preparando meus projetos para compartilhar aqui. Fique atento!",
    "projects_page.back": "Voltar",

    // Case Study
    "case.back": "Voltar aos projetos",
    "case.context": "Contexto do Problema",
    "case.objective": "Objetivo do Projeto",
    "case.process": "Processo de Design",
    "case.tools": "Ferramentas Utilizadas",
    "case.gallery": "Telas do Projeto",
    "case.result": "Resultado Final",
    "case.not_found": "Projeto não encontrado",
    "case.view_all": "Ver todos os projetos",
    "case.view_live": "🔗 Ver site no ar",
    "case.lightbox_alt": "Visualização ampliada",
    "case.name_meaning": "Significado do Nome",
    "case.created_by_me": "App criado por mim",
    "case.grade_highlight": "Nota máxima na faculdade!",
    "case.grade_highlight_desc": "Este projeto recebeu nota 10 na apresentação acadêmica, sendo reconhecido pela qualidade do design e pela solução centrada no usuário.",
    "case.be_careful_intro": "Este aplicativo foi pensado e desenhado para apoiar estudantes durante a fase mais estressante da vida acadêmica, oferecendo ferramentas práticas de autocuidado ao alcance de um toque.",

    // Contact
    "contact.title_default": "Vamos criar algo\nincrível juntos",
    "contact.subtitle_default": "Estou sempre aberto a novas oportunidades e projetos interessantes. Vamos conversar sobre como posso ajudar a criar a melhor experiência para seus usuários.",
    "contact.cta": "Entrar em contato",

    // Footer
    "footer.tagline_default": "UX/UI Designer criando experiências digitais intuitivas e centradas no usuário.",
    "footer.navigation": "Navegação",
    "footer.connect": "Conecte-se",
    "footer.rights": "© 2024 Luiz Filipe. Todos os direitos reservados.",
    "footer.made_with": "Feito com ♥ e muito café",

    // Design System
    "ds.title": "Design System",
    "ds.subtitle": "O sistema visual que garante consistência e escalabilidade em todos os projetos.",
    "ds.colors": "Paleta de Cores",
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
    "ds.project_card": "Card de Projeto",
    "ds.tag_badge": "Badge de Tag",
    "ds.skill_icon": "Ícone de Habilidade",

    // 404
    "notfound.title": "404",
    "notfound.message": "Ops! Página não encontrada",
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
    "hero.cta_primary": "View Projects",
    "hero.cta_secondary": "Contact",
    "hero.stat_projects": "Projects",
    "hero.stat_experience": "Years of experience",
    "hero.stat_dedication": "Dedication",
    "hero.service_ux": "User-focused experiences",
    "hero.service_brand": "Visual & brand identity",
    "hero.service_responsive": "Adaptive interfaces",
    "hero.service_prototyping": "Interactive prototypes",

    // About
    "about.title_default": "About\nme",
    "about.text_1_default": "My name is Luiz Filipe. I'm a UX/UI Designer passionate about creating digital experiences that connect people and technology.",
    "about.text_2_default": "I'm 28 years old and hold a degree in Digital Design and User Experience from Uniasselvi University.",
    "about.text_3_default": "My work involves user research, wireframing, prototyping, and developing modern interfaces that solve real problems.",
    "about.text_4_default": "In this portfolio you'll find my projects, my design process, and my approach to creating meaningful digital experiences.",
    "about.highlight_years": "Years",
    "about.highlight_specialty": "Specialty",
    "about.highlight_curiosity": "Curiosity",
    "about.tools_title": "Tools I use",

    // Skills
    "skills.title": "Skills",
    "skills.subtitle": "Competencies I use to transform ideas into exceptional digital products.",
    "skills.ux_desc": "User-centered experiences focused on usability and accessibility.",
    "skills.research_desc": "Qualitative and quantitative research to understand real needs.",
    "skills.wireframe_desc": "Visual structuring of flows and interfaces before prototyping.",
    "skills.prototype_desc": "High-fidelity interactive prototypes for user validation.",
    "skills.ui_desc": "Modern, consistent visual interfaces aligned with the brand.",
    "skills.design_system_desc": "Scalable design systems with reusable components.",
    "skills.interaction_desc": "Micro-interactions and animations that enrich the experience.",
    "skills.product_desc": "Strategic product thinking combined with design.",
    "skills.prototype_title": "Prototyping",

    // Certificates
    "certificates.title": "Certificates",
    "certificates.subtitle": "Courses and training that strengthen my journey in UX/UI Design.",
    "certificates.view": "View certificate",
    "certificates.alt": "Certificate of",


    // Process
    "process.title": "Design Process",
    "process.subtitle": "My structured approach to creating digital products that solve real problems.",
    "process.discovery": "Discovery",
    "process.discovery_desc": "Understand the business context, goals, and project constraints.",
    "process.research": "Research",
    "process.research_desc": "Investigate user needs through interviews and analysis.",
    "process.ideation": "Ideation",
    "process.ideation_desc": "Generate creative solutions through brainstorming and workshops.",
    "process.wireframing": "Wireframing",
    "process.wireframing_desc": "Structure information architecture and navigation flows.",
    "process.prototyping": "Prototyping",
    "process.prototyping_desc": "Create high-fidelity interactive prototypes for validation.",
    "process.testing": "Testing",
    "process.testing_desc": "Validate solutions with real users and iterate based on feedback.",
    "process.delivery": "Delivery",
    "process.delivery_desc": "Document and deliver assets for the development team's implementation.",

    // Marquee
    "marquee.prototyping": "PROTOTYPING",

    // Statement
    "statement.quote": "Design is not just what it looks like.",
    "statement.quote_highlight": "Design is how it works.",

    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "A selection of my most recent work in UX/UI Design.",
    "projects.coming_soon": "Coming soon",
    "projects.coming_soon_desc": "I'm preparing my projects to share here. Come back soon!",
    "projects.view_case": "View Full Case",
    "projects.view_all": "View all projects",

    // Projects page
    "projects_page.title_1": "All ",
    "projects_page.title_2": "Projects",
    "projects_page.subtitle": "Explore all my work in UX/UI Design.",
    "projects_page.coming_soon": "Coming soon",
    "projects_page.coming_soon_desc": "I'm preparing my projects to share here. Stay tuned!",
    "projects_page.back": "Back",

    // Case Study
    "case.back": "Back to projects",
    "case.context": "Problem Context",
    "case.objective": "Project Objective",
    "case.process": "Design Process",
    "case.tools": "Tools Used",
    "case.gallery": "Project Screens",
    "case.result": "Final Result",
    "case.not_found": "Project not found",
    "case.view_all": "View all projects",
    "case.view_live": "🔗 View live site",
    "case.lightbox_alt": "Enlarged view",
    "case.name_meaning": "Name Meaning",
    "case.created_by_me": "App created by me",
    "case.grade_highlight": "Top grade in college!",
    "case.grade_highlight_desc": "This project received a perfect score of 10 in the academic presentation, recognized for its design quality and user-centered solution.",
    "case.be_careful_intro": "This app was designed to support students during the most stressful phase of academic life, offering practical self-care tools at their fingertips.",

    // Contact
    "contact.title_default": "Let's create something\namazing together",
    "contact.subtitle_default": "I'm always open to new opportunities and interesting projects. Let's talk about how I can help create the best experience for your users.",
    "contact.cta": "Get in touch",

    // Footer
    "footer.tagline_default": "UX/UI Designer creating intuitive, user-centered digital experiences.",
    "footer.navigation": "Navigation",
    "footer.connect": "Connect",
    "footer.rights": "© 2024 Luiz Filipe. All rights reserved.",
    "footer.made_with": "Made with ♥ and lots of coffee",

    // Design System
    "ds.title": "Design System",
    "ds.subtitle": "The visual system that ensures consistency and scalability across all projects.",
    "ds.colors": "Color Palette",
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
    "ds.project_card": "Project Card",
    "ds.tag_badge": "Tag Badge",
    "ds.skill_icon": "Skill Icon",

    // 404
    "notfound.title": "404",
    "notfound.message": "Oops! Page not found",
    "notfound.back": "Return to Home",
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
