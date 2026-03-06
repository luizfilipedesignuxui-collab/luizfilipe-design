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
export const projects: Project[] = [
  // Exemplo de estrutura (descomente e preencha para adicionar):
  // {
  //   id: "1",
  //   slug: "nome-do-projeto",
  //   titulo: "Nome do Projeto",
  //   descricao: "Breve descrição do projeto.",
  //   imagem_capa: "/images/projeto-capa.jpg",
  //   categoria: "UX Design",
  //   ferramentas: ["Figma", "FigJam", "Miro"],
  //   galeria_de_imagens: ["/images/tela1.jpg", "/images/tela2.jpg"],
  //   contexto: "Contexto do problema que o projeto resolve.",
  //   objetivo: "Objetivo principal do projeto.",
  //   processo: {
  //     research: "Descrição da pesquisa UX realizada.",
  //     wireframe: "Descrição do processo de wireframing.",
  //     ui_design: "Descrição do design de interface final.",
  //   },
  //   resultado: "Resultado final e impacto do projeto.",
  //   tags: ["UX Design", "Mobile", "SaaS"],
  // },
];
