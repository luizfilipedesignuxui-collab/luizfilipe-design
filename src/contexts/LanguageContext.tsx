import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

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
 "nav.positioning": "Posicionamento",
 "nav.about": "Sobre",
 "nav.skills": "Habilidades",
 "nav.certificates": "Certificados",
 "nav.process": "Processo",
 "nav.projects": "Projetos",
  "nav.contact": "Contato",
  "nav.group_about": "Sobre",
  "nav.group_work": "Trabalho",
  "nav.about_me": "Sobre mim",
  "nav.language": "Idioma",
 // Hero
 "hero.cta_primary": "Ver cases",
 "hero.cta_secondary": "Falar comigo",
 "hero.role": "UX/UI Designer, Product Designer e Design Engineer",
 "hero.subtitle": "Product Designer e Design Engineer: UX/UI, Figma, React e produto no ar.",
 "hero.stat_projects": "Projetos entregues",
 "hero.stat_dedication": "Foco no resultado",
 "hero.service_ux_title": "UX/UI Design",
 "hero.service_ux": "UX/UI com pesquisa e fluxos, prontos para virar Design Engineering",
 "hero.service_brand_title": "Landing pages e sites",
 "hero.service_brand": "Páginas no ar, claras, rápidas e focadas em conversão",
 "hero.service_responsive_title": "Product Design",
 "hero.service_responsive": "Apps, SaaS e produtos digitais em UX/UI e Design Engineering, do conceito à publicação",
 "hero.service_prototyping_title": "Design Engineering",
 "hero.service_prototyping": "Design Engineering: do UX/UI no Figma ao React publicado",
 "hero.stats_label": "Números do portfólio",
 "hero.services_label": "O que eu entrego",
 "hero.eyebrow": "Aberto a vagas · UX/UI · Product Design · Design Engineering",
 "hero.phrase": "O Figma é só o começo.",
 "hero.whatsapp": "Falar no WhatsApp",
 "hero.lead": "Luiz Filipe, UX/UI Designer e Design Engineer. Pesquisa, interface no Figma e front-end em React no mesmo fluxo. Recrutadores: estou aberto a vagas de Product Design, UX/UI e Design Engineering.",
 "hero.panel_label": "Para times de produto",
 "hero.panel_title": "UX/UI e Design Engineering no mesmo fluxo.",
 "hero.panel_note": "Figma, React, TypeScript, Tailwind e Supabase. Do briefing ao deploy.",
 "hero.card_left_title": "Handoff que vira código.",
 "hero.card_left_desc": "UX/UI e Design Engineering em um só fluxo, sem telefone sem fio.",
 "hero.card_right_title": "Cases reais, do briefing ao ar.",
 "hero.card_right_desc": "Apps, SaaS, e-commerces e landing pages.",
 "hero.note_right_1": "Menos ruído.",
 "hero.note_right_2": "Mais conversão.",
 "hero.orbit_label": "Projetos em destaque",
 "hero.photo_alt": "Luiz Filipe, UX/UI Designer, Product Designer e Design Engineer",

 // Positioning
 "positioning.filled_label": "Posicionamento",
 "positioning.headline": "Onde UX/UI e\nDesign Engineering se encontram.",
 "positioning.pillars": "Product Design|UX/UI Design|Design Engineering|Figma + React",
 "positioning.filled": "Trabalho UX/UI e Design Engineering juntos, para o usuário não se perder entre o Figma e o código. Interface clara, React pronto para produção, produto no ar.",

 // About
 "about.bridge": "O que um recrutador precisa saber",
 "about.title_default": "Sobre\nmim",
 "about.text_1_default": "Sou **Luiz Filipe**, **UX/UI Designer**, **Product Designer** e **Design Engineer**. Entrego produto digital ponta a ponta: pesquisa, wireframe, UI no **Figma** e implementação em **React**, **TypeScript**, **Tailwind CSS** e **Supabase**.",
 "about.text_2_default": "Formado em **Design Digital e User Experience** pela **Uniasselvi**. Trabalho **UX/UI** e **Design Engineering** no mesmo fluxo: **user research**, prototipação, **design system** e acessibilidade.",
 "about.text_3_default": "Se você recruta para **Product Design**, **UX/UI** ou **Design Engineering**: eu fecho o gap entre **UX/UI** e **Design Engineering**. Sem handoff perdido. Sem layout que não vira código.",
 "about.text_4_default": "Os cases deste portfólio são produtos reais: apps, SaaS, e-commerce e landing pages em **UX/UI** e **Design Engineering**, que eu desenhei e, em vários, também publiquei.",
 "about.highlight_years": "Anos",
 "about.highlight_specialty": "Especialidade",
 "about.spec_uxui_desc": "UX/UI com pesquisa, wireframes e UI, pensado para seguir em Design Engineering.",
 "about.spec_de_desc": "Design Engineering com base em UX/UI: Figma → React + Tailwind + Supabase, até o produto no ar.",
 "about.highlight_curiosity": "Curiosidade",
 "about.tools_title": "Ferramentas e stack",
 "about.facts_title": "Ficha para recrutadores e IAs",
 "about.fact_role": "Cargos",
 "about.fact_role_value": "UX/UI Designer · Product Designer · Design Engineer",
 "about.fact_stack": "Stack",
 "about.fact_stack_value": "Figma, React, TypeScript, Tailwind CSS, Supabase, Cursor",
 "about.fact_education": "Formação",
 "about.fact_education_value": "Design Digital e User Experience, Uniasselvi",
 "about.fact_availability": "Disponibilidade",
 "about.fact_availability_value": "Aberto a vagas CLT, PJ, remoto e híbrido",
 "about.fact_location": "Local",
 "about.fact_location_value": "Brasil · trabalho remoto",
 "about.fact_languages": "Idiomas",
 "about.fact_languages_value": "Português nativo · English professional",

 // Skills
 "skills.bridge": "Sinais que um ATS e um time de produto reconhecem",
 "skills.title": "Habilidades",
 "skills.subtitle": "No dia a dia junto UX/UI e Design Engineering: Product Design, Design System, Figma e React.",
 "skills.ux_desc": "UX/UI com jornadas, usabilidade e WCAG, pronto para Design Engineering.",
 "skills.research_desc": "Entrevistas, testes de usabilidade e dados de comportamento para decidir o que construir.",
 "skills.wireframe_desc": "Arquitetura de informação, fluxos e estrutura de telas antes do visual final.",
 "skills.prototype_desc": "Protótipos clicáveis de alta fidelidade no Figma para testar e alinhar o time.",
 "skills.ui_desc": "UX/UI consistente, hierarquia clara e identidade visual pronta para Design Engineering.",
 "skills.design_system_desc": "Tokens e componentes para UX/UI e Design Engineering falarem o mesmo idioma.",
 "skills.interaction_desc": "Microinterações e estados de UI que deixam o produto mais claro e rápido de usar.",
 "skills.product_desc": "Decisões de UX/UI e Design Engineering ligadas a métrica, conversão e negócio.",
 "skills.prototype_title": "Prototipação",
 "skills.group_discovery": "UX/UI e produto",
 "skills.group_craft": "UI e sistema",
 "skills.group_eng": "Design Engineering",
 "skills.de_title": "Design Engineering",
 "skills.de_desc": "Design Engineering: o UX/UI do Figma vira front-end em produção.",
 "skills.react_title": "React + TypeScript",
 "skills.react_desc": "React e TypeScript alinhados ao UX/UI e ao Design Engineering.",
 "skills.tailwind_title": "Tailwind CSS",
 "skills.tailwind_desc": "UX/UI implementada com tokens, consistência e velocidade de Design Engineering.",
 "skills.figma_title": "Figma to production",
 "skills.figma_desc": "Figma como fonte da verdade entre UX/UI e Design Engineering, do handoff ao código.",

 // Certificates
 "certificates.bridge": "Sinal de aprendizado contínuo",
 "certificates.title": "Certificados",
 "certificates.subtitle": "Figma, Cursor AI, Design Tokens e Google Analytics: o que um time de UX/UI e Design Engineering usa no dia a dia.",
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
 "process.bridge": "Como UX/UI e Design Engineering trabalham juntos",
 "process.title": "Processo de UX/UI\ne Design Engineering",
 "process.subtitle": "Discovery, UX/UI e Design Engineering. O mesmo método que um time de produto espera ver num case.",
 "process.discovery": "Discovery",
 "process.discovery_desc": "Alinhar objetivo de negócio, público, restrições e critério de sucesso.",
 "process.research": "User research",
 "process.research_desc": "Entrevistas, dados e contexto para validar hipótese antes de desenhar.",
 "process.ideation": "Product thinking",
 "process.ideation_desc": "Priorizar o que move métrica, com o time e stakeholders.",
 "process.wireframing": "Wireframes",
 "process.wireframing_desc": "Arquitetura de informação, conteúdo e fluxo de navegação.",
 "process.prototyping": "Prototipação",
 "process.prototyping_desc": "Protótipo de UX/UI no Figma para testar usabilidade antes do Design Engineering.",
 "process.testing": "Usability testing",
 "process.testing_desc": "Testar com usuários reais e iterar com evidência, não achismo.",
 "process.delivery": "Ship",
 "process.delivery_desc": "Handoff de UX/UI ou Design Engineering até o ar: React, Tailwind, deploy.",

 // Marquee
 "marquee.prototyping": "PROTOTIPAÇÃO",

 // Statement
 "statement.bridge": "O filtro de um bom hire",
 "statement.quote": "Design não é só aparência.",
 "statement.quote_highlight": "Design é como funciona.",

 // Projects
 "projects.bridge": "Prova de trabalho, não só discurso",
 "projects.title": "Projetos",
 "projects.subtitle": "Cases de Product Design, UX/UI e Design Engineering: SaaS, apps, e-commerce e landing pages do Figma ao ar.",
 "projects.coming_soon": "Em breve",
 "projects.coming_soon_desc": "Estou preparando novos projetos para compartilhar. Volte em breve!",
 "projects.view_case": "Ver case completo",
 "projects.view_all": "Ver todos os projetos",

 // Projects page
 "projects_page.title_1": "Todos os ",
 "projects_page.title_2": "Projetos",
 "projects_page.subtitle": "Todos os cases: Product Design, UX/UI e Design Engineering, do Figma ao produto no ar.",
 "projects_page.coming_soon": "Em breve",
 "projects_page.coming_soon_desc": "Estou preparando novos projetos para compartilhar. Fique de olho!",
 "projects_page.back": "Voltar",

 // Case Study
 "case.back": "Voltar aos projetos",
 "case.problem": "O problema",
 "case.context": "Contexto do problema",
 "case.objective": "Objetivo do projeto",
 "case.process": "O processo",
 "case.step_research": "Pesquisa",
 "case.step_wireframe": "Wireframes",
 "case.step_ui": "Interface",
 "case.tools": "Ferramentas usadas",
 "case.gallery": "Telas do projeto",
 "case.visual": "O visual",
 "case.result": "O resultado",
 "case.metrics_title": "Matador",
 "case.not_found": "Projeto não encontrado",
 "case.view_all": "Ver todos os projetos",
 "case.view_live": "Ver site no ar",
 "case.view_prototype": "Ver protótipo no Figma",
 "case.view_pdf": "Ver brandbook completo (PDF)",
 "case.lightbox_alt": "Visualização ampliada",
 "case.name_meaning": "Significado do nome",
 "case.created_by_me": "App criado por mim",
 "case.grade_highlight": "Nota máxima na faculdade",
 "case.grade_highlight_desc": "Este projeto recebeu nota 10 na apresentação acadêmica, pela qualidade de UX/UI e Design Engineering e pela solução centrada no usuário.",
 "case.be_careful_intro": "Este app foi pensado para apoiar estudantes na fase mais intensa da vida acadêmica, com ferramentas práticas de autocuidado ao alcance de um toque.",
 "case.coming_soon_stores": "Em breve nas lojas",
 "case.coming_soon_stores_desc": "O MarmitaGest estará disponível em breve na App Store e na Google Play.",

 // Contact
 "contact.bridge": "Aberto a vagas e projetos",
 "contact.title_default": "Vamos falar\nda próxima vaga",
 "contact.subtitle_default": "Aberto a posições de UX/UI Designer, Product Designer e Design Engineer (remoto, híbrido ou presencial). Também fecho projetos pontuais. Envie a vaga, o job description ou o briefing.",
 "contact.cta": "Chamar para entrevista",

 // Footer
 "footer.tagline_default": "UX/UI Designer, Product Designer e Design Engineer. Figma, React e produto no ar.",
 "footer.navigation": "Navegação",
 "footer.connect": "Contato",
 "footer.rights": "© 2026 Luiz Filipe. Todos os direitos reservados.",
 "footer.made_with": "Feito com ♥ e muito café",

 // Accessibility
 "a11y.skip_to_content": "Pular para o conteúdo",
 "a11y.main_nav": "Navegação principal",
 "a11y.mobile_nav": "Menu móvel",
 "a11y.open_menu": "Abrir menu",
 "a11y.close_menu": "Fechar menu",
 "a11y.switch_to_en": "Mudar idioma para inglês",
 "a11y.switch_to_pt": "Mudar idioma para português",
 "a11y.opens_new_tab": "abre em nova aba",
 "a11y.close": "Fechar",
 "case.prev": "Imagem anterior",
 "case.next": "Próxima imagem",

 // Design System
 "ds.title": "Design System",
 "ds.subtitle": "O sistema visual que alinha UX/UI e Design Engineering em todos os projetos.",
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
 "nav.positioning": "Positioning",
 "nav.about": "About",
 "nav.skills": "Skills",
 "nav.certificates": "Certificates",
 "nav.process": "Process",
 "nav.projects": "Projects",
  "nav.contact": "Contact",
  "nav.group_about": "About",
  "nav.group_work": "Work",
  "nav.about_me": "About me",
  "nav.language": "Language",
 // Hero
 "hero.cta_primary": "View case studies",
 "hero.cta_secondary": "Get in touch",
 "hero.role": "UX/UI Designer, Product Designer, and Design Engineer",
 "hero.subtitle": "Product Designer and Design Engineer: UX/UI, Figma, React, and products that ship.",
 "hero.stat_projects": "Projects delivered",
 "hero.stat_dedication": "Focused on results",
 "hero.service_ux_title": "UX/UI Design",
 "hero.service_ux": "UX/UI with research and flows, ready to become Design Engineering",
 "hero.service_brand_title": "Landing pages & sites",
 "hero.service_brand": "Live pages that are clear, fast, and conversion-focused",
 "hero.service_responsive_title": "Product Design",
 "hero.service_responsive": "Apps, SaaS, and digital products in UX/UI and Design Engineering, from concept to launch",
 "hero.service_prototyping_title": "Design Engineering",
 "hero.service_prototyping": "Design Engineering: from UX/UI in Figma to React that ships",
 "hero.stats_label": "Portfolio stats",
 "hero.services_label": "What I ship",
 "hero.eyebrow": "Open to roles · UX/UI · Product Design · Design Engineering",
 "hero.phrase": "Figma is only the beginning.",
 "hero.whatsapp": "Chat on WhatsApp",
 "hero.lead": "Luiz Filipe, UX/UI Designer and Design Engineer. Research, Figma UI, and React front-end in one flow. Recruiters: I'm open to Product Design, UX/UI, and Design Engineering roles.",
 "hero.panel_label": "For product teams",
 "hero.panel_title": "UX/UI and Design Engineering in the same flow.",
 "hero.panel_note": "Figma, React, TypeScript, Tailwind, and Supabase. Brief to deploy.",
 "hero.card_left_title": "Handoff that becomes code.",
 "hero.card_left_desc": "UX/UI and Design Engineering in one flow. No broken telephone.",
 "hero.card_right_title": "Real cases, from brief to launch.",
 "hero.card_right_desc": "Apps, SaaS, e-commerce, and landing pages.",
 "hero.note_right_1": "Less noise.",
 "hero.note_right_2": "More conversion.",
 "hero.orbit_label": "Featured projects",
 "hero.photo_alt": "Luiz Filipe, UX/UI Designer, Product Designer, and Design Engineer",

 // Positioning
 "positioning.filled_label": "Positioning",
 "positioning.headline": "Where UX/UI and\nDesign Engineering meet.",
 "positioning.pillars": "Product Design|UX/UI Design|Design Engineering|Figma + React",
 "positioning.filled": "I work UX/UI and Design Engineering together so the user doesn't get lost between Figma and code. Clear interface, production-ready React, a product that actually ships.",

 // About
 "about.bridge": "What a recruiter needs to know",
 "about.title_default": "About\nme",
 "about.text_1_default": "I'm **Luiz Filipe**, a **UX/UI Designer**, **Product Designer**, and **Design Engineer**. I ship digital products end to end: research, wireframes, UI in **Figma**, and implementation in **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**.",
 "about.text_2_default": "Degree in **Digital Design and User Experience** from **Uniasselvi**. I work **UX/UI** and **Design Engineering** in the same flow: **user research**, prototyping, **design systems**, and accessibility.",
 "about.text_3_default": "If you're hiring for **Product Design**, **UX/UI**, or **Design Engineering**: I close the gap between **UX/UI** and **Design Engineering**. No lost handoff. No mockup that never becomes code.",
 "about.text_4_default": "The cases here are real products: apps, SaaS, e-commerce, and landing pages in **UX/UI** and **Design Engineering**, which I designed and, in several, also shipped live.",
 "about.highlight_years": "Years",
 "about.highlight_specialty": "Specialty",
 "about.spec_uxui_desc": "UX/UI with research, wireframes, and UI, built to continue into Design Engineering.",
 "about.spec_de_desc": "Design Engineering grounded in UX/UI: Figma → React + Tailwind + Supabase, through to a live product.",
 "about.highlight_curiosity": "Curiosity",
 "about.tools_title": "Tools and stack",
 "about.facts_title": "Recruiter and AI fact sheet",
 "about.fact_role": "Roles",
 "about.fact_role_value": "UX/UI Designer · Product Designer · Design Engineer",
 "about.fact_stack": "Stack",
 "about.fact_stack_value": "Figma, React, TypeScript, Tailwind CSS, Supabase, Cursor",
 "about.fact_education": "Education",
 "about.fact_education_value": "Digital Design and User Experience, Uniasselvi",
 "about.fact_availability": "Availability",
 "about.fact_availability_value": "Open to full-time, contractor, remote, and hybrid roles",
 "about.fact_location": "Location",
 "about.fact_location_value": "Brazil · remote-friendly",
 "about.fact_languages": "Languages",
 "about.fact_languages_value": "Portuguese native · English professional",

 // Skills
 "skills.bridge": "Signals ATS tools and product teams recognize",
 "skills.title": "Skills",
 "skills.subtitle": "Every day I pair UX/UI and Design Engineering: Product Design, Design Systems, Figma, and React.",
 "skills.ux_desc": "UX/UI with journeys, usability, and WCAG, ready for Design Engineering.",
 "skills.research_desc": "Interviews, usability tests, and behavior data to decide what to build.",
 "skills.wireframe_desc": "Information architecture, flows, and screen structure before final visuals.",
 "skills.prototype_desc": "High-fidelity clickable Figma prototypes to test and align the team.",
 "skills.ui_desc": "Consistent UX/UI, clear hierarchy, and visual identity ready for Design Engineering.",
 "skills.design_system_desc": "Tokens and components so UX/UI and Design Engineering speak the same language.",
 "skills.interaction_desc": "Micro-interactions and UI states that make the product clearer and faster to use.",
 "skills.product_desc": "UX/UI and Design Engineering decisions tied to metrics, conversion, and business goals.",
 "skills.prototype_title": "Prototyping",
 "skills.group_discovery": "UX/UI and product",
 "skills.group_craft": "UI and systems",
 "skills.group_eng": "Design Engineering",
 "skills.de_title": "Design Engineering",
 "skills.de_desc": "Design Engineering: UX/UI from Figma becomes production front-end.",
 "skills.react_title": "React + TypeScript",
 "skills.react_desc": "React and TypeScript aligned with UX/UI and Design Engineering.",
 "skills.tailwind_title": "Tailwind CSS",
 "skills.tailwind_desc": "UX/UI implemented with tokens, consistency, and Design Engineering speed.",
 "skills.figma_title": "Figma to production",
 "skills.figma_desc": "Figma as the source of truth between UX/UI and Design Engineering, from handoff to code.",

 // Certificates
 "certificates.bridge": "Signal of continuous learning",
 "certificates.title": "Certificates",
 "certificates.subtitle": "Figma, Cursor AI, Design Tokens, and Google Analytics: what a UX/UI and Design Engineering team uses day to day.",
 "certificates.view": "View certificate",
 "certificates.view_details": "View details",
 "certificates.alt": "Certificate of",
 "certificates.topics": "What I learned",
 "certificates.meta.date": "Date",
 "certificates.meta.hours": "Duration",
 "certificates.meta.format": "Format",
 "certificates.meta.instructor": "Instructor",
 "certificates.figma_cursor.desc": "Hands-on workshop to build complete websites and systems, from design scope to deploy. Integrating Figma MCP with Cursor AI: combining UI, UX, Design Tokens, front-end, and back-end in a modern workflow.",
 "certificates.figma_cursor.topics": "Figma MCP and Cursor AI integration|Building structured Design Tokens|AI-powered front-end development|AI-first back-end implementation|Full application deployment|End-to-end design-to-production workflow",
 "certificates.ga.desc": "Workshop on Google Analytics for UX: set up, read data, and use real behavior metrics to guide design decisions.",
 "certificates.ga.topics": "Google Analytics setup|Essential UX metrics|Behavioral data interpretation|Data-driven decisions|User journey analysis",

 // Process
 "process.bridge": "How UX/UI and Design Engineering work together",
 "process.title": "UX/UI and\nDesign Engineering process",
 "process.subtitle": "Discovery, UX/UI, and Design Engineering. The method a product team expects to see in a case study.",
 "process.discovery": "Discovery",
 "process.discovery_desc": "Align business goal, audience, constraints, and success criteria.",
 "process.research": "User research",
 "process.research_desc": "Interviews, data, and context to validate the hypothesis before designing.",
 "process.ideation": "Product thinking",
 "process.ideation_desc": "Prioritize what moves the metric, with the team and stakeholders.",
 "process.wireframing": "Wireframes",
 "process.wireframing_desc": "Information architecture, content, and navigation flow.",
 "process.prototyping": "Prototyping",
 "process.prototyping_desc": "UX/UI prototype in Figma to test usability before Design Engineering.",
 "process.testing": "Usability testing",
 "process.testing_desc": "Test with real users and iterate on evidence, not opinion.",
 "process.delivery": "Ship",
 "process.delivery_desc": "UX/UI handoff or Design Engineering all the way to live: React, Tailwind, deploy.",

 // Marquee
 "marquee.prototyping": "PROTOTYPING",

 // Statement
 "statement.bridge": "The filter for a strong hire",
 "statement.quote": "Design is not just how it looks.",
 "statement.quote_highlight": "Design is how it works.",

 // Projects
 "projects.bridge": "Work samples, not just claims",
 "projects.title": "Projects",
 "projects.subtitle": "Product Design, UX/UI, and Design Engineering cases: SaaS, apps, e-commerce, and landing pages from Figma to live.",
 "projects.coming_soon": "Coming soon",
 "projects.coming_soon_desc": "I'm preparing new projects to share here. Check back soon!",
 "projects.view_case": "View full case",
 "projects.view_all": "View all projects",

 // Projects page
 "projects_page.title_1": "All ",
 "projects_page.title_2": "Projects",
 "projects_page.subtitle": "All case studies: Product Design, UX/UI, and Design Engineering, from Figma to a live product.",
 "projects_page.coming_soon": "Coming soon",
 "projects_page.coming_soon_desc": "I'm preparing new projects to share here. Stay tuned!",
 "projects_page.back": "Back",

 // Case Study
 "case.back": "Back to projects",
 "case.problem": "The problem",
 "case.context": "Problem context",
 "case.objective": "Project goal",
 "case.process": "The process",
 "case.step_research": "Research",
 "case.step_wireframe": "Wireframes",
 "case.step_ui": "Interface",
 "case.tools": "Tools used",
 "case.gallery": "Project screens",
 "case.visual": "The visual",
 "case.result": "The result",
 "case.metrics_title": "Killer case",
 "case.not_found": "Project not found",
 "case.view_all": "View all projects",
 "case.view_live": "View live site",
 "case.view_prototype": "View Figma prototype",
 "case.view_pdf": "View full brandbook (PDF)",
 "case.lightbox_alt": "Enlarged view",
 "case.name_meaning": "Name meaning",
 "case.created_by_me": "App I built",
 "case.grade_highlight": "Top grade in college",
 "case.grade_highlight_desc": "This project received a perfect score of 10 in the academic presentation for UX/UI and Design Engineering quality and its user-centered solution.",
 "case.be_careful_intro": "This app was designed to support students through the most intense phase of academic life, with practical self-care tools at their fingertips.",
 "case.coming_soon_stores": "Coming soon to the stores",
 "case.coming_soon_stores_desc": "MarmitaGest will soon be available on the App Store and Google Play.",

 // Contact
 "contact.bridge": "Open to roles and projects",
 "contact.title_default": "Let's talk about\nthe next role",
 "contact.subtitle_default": "Open to UX/UI Designer, Product Designer, and Design Engineer roles (remote, hybrid, or on-site). I also take scoped projects. Send the role, job description, or brief.",
 "contact.cta": "Book a screening call",

 // Footer
 "footer.tagline_default": "UX/UI Designer, Product Designer, and Design Engineer. Figma, React, and products that ship.",
 "footer.navigation": "Navigation",
 "footer.connect": "Connect",
 "footer.rights": "© 2026 Luiz Filipe. All rights reserved.",
 "footer.made_with": "Made with ♥ and lots of coffee",

 // Accessibility
 "a11y.skip_to_content": "Skip to content",
 "a11y.main_nav": "Main navigation",
 "a11y.mobile_nav": "Mobile menu",
 "a11y.open_menu": "Open menu",
 "a11y.close_menu": "Close menu",
 "a11y.switch_to_en": "Switch language to English",
 "a11y.switch_to_pt": "Switch language to Portuguese",
 "a11y.opens_new_tab": "opens in a new tab",
 "a11y.close": "Close",
 "case.prev": "Previous image",
 "case.next": "Next image",

 // Design System
 "ds.title": "Design System",
 "ds.subtitle": "The visual system that keeps UX/UI and Design Engineering aligned across every project.",
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

 useEffect(() => {
 document.documentElement.lang = language === "en" ? "en" : "pt-BR";
 }, [language]);

 const t = useCallback(
 (key: string) => {
 const value = translations[language][key] || key;
 return value.replace(/\u2014/g, ":").replace(/\u2013/g, "-").replace(/\u2212/g, "-");
 },
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
