import curioLookHome from "@/assets/curio-look-home.jpg";
import auraCover from "@/assets/sites/aura-scent-cover.jpg";
import desafioCover from "@/assets/sites/desafio-saudavel-cover.jpg";
import forjadoCover from "@/assets/sites/forjado-cover.jpg";
import gabrielCover from "@/assets/sites/gabriel-augusto-cover.jpg";
import mesaCover from "@/assets/mesa/cover.png";
import multifitCover from "@/assets/sites/multifit-cover.jpg";

/** Edite tudo da LP /sites aqui. */

/** 62 99447-4978 com DDI 55, formato que o wa.me exige. */
export const WHATSAPP_NUMBER = "5562994474978";

export const PORTFOLIO_URL = "https://luizfilipe-design.vercel.app";

export type Origem =
  | "cartao"
  | "header"
  | "hero"
  | "servico"
  | "quiz"
  | "sobre"
  | "preco"
  | "final"
  | "flutuante";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const waLink = (mensagem: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

export const trackWhatsApp = (origem: Origem) => {
  window.gtag?.("event", "whatsapp_click", { origem });
};

export const MESSAGES = {
  hero: "Oi Luiz! Vi sua página e quero saber quanto fica um site para o meu negócio.",
  cartao: "Oi Luiz! Vim pelo seu cartão e quero um orçamento para o meu site.",
  geral: "Oi Luiz! Quero um orçamento para o meu site.",
  quiz: (nicho: string, necessidade: string, prazo: string) =>
    `Oi Luiz! Tenho um negócio de ${nicho}, preciso de ${necessidade} ${prazo}. Qual o valor?`,
};

/** Dias úteis. Total por tipo = proposta + desenvolvimento + publicação. */
export const PRAZOS = {
  landing: "8 a 12 dias úteis",
  institucional: "15 a 20 dias úteis",
  loja: "20 a 25 dias úteis",
  proposta: "2 a 5 dias úteis",
  desenvolvimento: "5 a 18 dias úteis",
  publicacao: "1 a 2 dias úteis",
};

export const MAX_PAGINAS_INSTITUCIONAL = "5";

export const NICHOS = [
  "Academias",
  "Psicólogos",
  "Moda fitness",
  "Restaurantes e marmitarias",
  "Perfumarias",
  "Projetos sociais",
];

export type ServicoId = "landing" | "institucional" | "loja";

export const SERVICOS: {
  id: ServicoId;
  nome: string;
  publico: string;
  resumo: string;
  prazo: string;
  inclui: string[];
}[] = [
  {
    id: "landing",
    nome: "Landing page",
    publico: "Para vender um serviço",
    resumo: "Uma página só, feita pra transformar visita em conversa no WhatsApp.",
    prazo: PRAZOS.landing,
    inclui: ["Página única focada em conversão", "Botão de WhatsApp", "Versão celular", "Publicação"],
  },
  {
    id: "institucional",
    nome: "Site institucional",
    publico: "Para apresentar o negócio",
    resumo: "Algumas páginas pra mostrar quem você é, o que faz e como te achar.",
    prazo: PRAZOS.institucional,
    inclui: [
      `Até ${MAX_PAGINAS_INSTITUCIONAL} páginas`,
      "Design sob medida",
      "SEO básico",
      "Você aprende a editar",
    ],
  },
  {
    id: "loja",
    nome: "Loja virtual",
    publico: "Para vender online",
    resumo: "Vitrine com carrinho e pagamento pra vender todo dia, até de madrugada.",
    prazo: PRAZOS.loja,
    inclui: ["Catálogo", "Carrinho", "Pagamento", "Integração com WhatsApp"],
  },
];

export const CATEGORIAS = ["Todos", "Sites e landing pages", "Lojas virtuais", "Sistemas e apps"] as const;
export type Categoria = (typeof CATEGORIAS)[number];

type Projeto = {
  slug: string;
  nome: string;
  nicho: string;
  categoria: Exclude<Categoria, "Todos">;
  descricao: string;
  imagem: string;
  /** Capa em pé (celular): aparece inteira em vez de cortada. */
  imagemVertical?: boolean;
  /** Projetos sem case no portfólio: link do site no ar. */
  site?: string;
};

export const PROJETOS: (Projeto & { link: string })[] = ([
  {
    slug: "forjado-fitness",
    nome: "Forjado",
    nicho: "Academia premium",
    categoria: "Sites e landing pages",
    descricao: "Landing page que leva o visitante direto para a matrícula no WhatsApp.",
    imagem: forjadoCover,
  },
  {
    slug: "gabriel-augusto-psicanalista",
    nome: "Gabriel Augusto",
    nicho: "Psicanalista",
    categoria: "Sites e landing pages",
    descricao: "Site sério e acolhedor que transforma visita em sessão agendada.",
    imagem: gabrielCover,
  },
  {
    slug: "curio-look",
    nome: "Curió Look",
    nicho: "Moda infantil",
    categoria: "Lojas virtuais",
    descricao: "Loja de roupa infantil sustentável, com vitrine para meninos, meninas e bebês.",
    imagem: curioLookHome,
    site: "https://www.curiolook.com.br/",
  },
  {
    slug: "multifit-store",
    nome: "Multifit Store",
    nicho: "Moda fitness feminina",
    categoria: "Lojas virtuais",
    descricao: "Loja de moda fitness com catálogo e compra simples pelo celular.",
    imagem: multifitCover,
  },
  {
    slug: "aura-scent-boutique",
    nome: "Aura Scent Boutique",
    nicho: "Perfumaria",
    categoria: "Lojas virtuais",
    descricao: "Loja de velas aromáticas com quiz que ajuda o cliente a escolher.",
    imagem: auraCover,
  },
  {
    slug: "mesa",
    nome: "Mesa",
    nicho: "Restaurantes",
    categoria: "Sistemas e apps",
    descricao: "Cardápio que o dono monta e manda no WhatsApp, com o pedido de volta na conversa.",
    imagem: mesaCover,
    imagemVertical: true,
  },
  {
    slug: "desafio-saudavel",
    nome: "Desafio Saudável",
    nicho: "Saúde e bem-estar",
    categoria: "Sistemas e apps",
    descricao: "App de desafios com check-in diário e ranking entre participantes.",
    imagem: desafioCover,
    imagemVertical: true,
  },
] satisfies Projeto[]).map((p: Projeto) => ({
  ...p,
  link: p.site ?? `${PORTFOLIO_URL}/projetos/${p.slug}`,
}));

export const QUIZ = [
  {
    pergunta: "Qual é o seu negócio?",
    opcoes: [
      { label: "Saúde", msg: "saúde" },
      { label: "Alimentação", msg: "alimentação" },
      { label: "Fitness", msg: "fitness" },
      { label: "Loja ou moda", msg: "loja ou moda" },
      { label: "Outro", msg: "outro segmento" },
    ],
  },
  {
    pergunta: "O que você precisa?",
    opcoes: [
      { label: "Site novo", msg: "um site novo" },
      { label: "Refazer meu site", msg: "refazer meu site" },
      { label: "Página para vender um serviço", msg: "uma página para vender um serviço" },
      { label: "Loja online", msg: "uma loja online" },
    ],
  },
  {
    pergunta: "Pra quando?",
    opcoes: [
      { label: "Urgente", msg: "com urgência" },
      { label: "Este mês", msg: "para este mês" },
      { label: "Sem pressa", msg: "sem pressa" },
    ],
  },
];

/** Resposta da pergunta 2 → serviço recomendado. */
export const recomendarServico = (necessidade: string): ServicoId => {
  if (necessidade === "Loja online") return "loja";
  if (necessidade === "Página para vender um serviço") return "landing";
  return "institucional";
};

export const PASSOS = [
  { titulo: "Conversa no WhatsApp", prazo: "No mesmo dia", texto: "Você me conta do negócio." },
  {
    titulo: "Formulário do projeto",
    prazo: "Após o sinal",
    texto: "Você recebe um formulário pra colocar tudo o que quer no site: textos, fotos, serviços e referências.",
  },
  { titulo: "Proposta e layout", prazo: PRAZOS.proposta, texto: "Você vê o site antes de ele existir." },
  { titulo: "Desenvolvimento", prazo: PRAZOS.desenvolvimento, texto: "Eu programo exatamente o que você aprovou." },
  { titulo: "Site no ar", prazo: PRAZOS.publicacao, texto: "Publico, conecto seu domínio e te ensino a editar." },
];

export const PRAZO_INICIO = "Os prazos começam a contar a partir do pagamento do sinal, que dá início ao projeto.";

export const PRAZOS_TOTAIS: [string, string][] = [
  ["Landing page", PRAZOS.landing],
  ["Site institucional", PRAZOS.institucional],
  ["Loja virtual", PRAZOS.loja],
];

export const SOBRE_TEXTOS = [
  "Sou Luiz Filipe, designer e desenvolvedor. O que você aprova no layout é exatamente o que vai pro ar, sem telefone sem fio entre designer e programador.",
  "Eu cuido do site inteiro: entendo o seu negócio, desenho as telas, programo e publico. Você fala com uma pessoa só, do primeiro oi até o site no ar.",
];

export const ESPECIALIDADES = [
  { titulo: "Design", texto: "Layout pensado pro seu cliente entender rápido e chamar você." },
  { titulo: "Código", texto: "Site rápido, feito primeiro pro celular e pronto pra aparecer no Google." },
];

export const FATOS: [string, string][] = [
  ["Quem atende", "Eu mesmo, direto no WhatsApp"],
  ["Resposta", "No WhatsApp, seg a sex, 9h às 19h"],
  ["Formação", "Design Digital e UX, Uniasselvi"],
  ["Atendimento", "100% online, todo o Brasil"],
];

/** A seção só aparece com pelo menos 2 depoimentos reais. */
export const DEPOIMENTOS: { nome: string; negocio: string; texto: string }[] = [];

export const FAQ = [
  {
    pergunta: "Quanto tempo leva?",
    resposta: `Depende do tipo de site. Uma landing page fica pronta em ${PRAZOS.landing}, um site institucional em ${PRAZOS.institucional} e uma loja virtual em ${PRAZOS.loja}. Esse prazo soma as etapas: proposta e layout (${PRAZOS.proposta}), desenvolvimento (${PRAZOS.desenvolvimento}) e publicação (${PRAZOS.publicacao}). O prazo começa a contar a partir do pagamento do sinal, que dá início ao projeto.`,
  },
  {
    pergunta: "Domínio e hospedagem estão inclusos?",
    resposta:
      "Tenho planos que já incluem domínio e hospedagem, pra você não se preocupar com nada. Se preferir, você contrata por conta própria e eu configuro tudo pra você.",
  },
  {
    pergunta: "Vou conseguir editar sozinho?",
    resposta:
      "Você escolhe: o site pode ter um painel de controle pra você mesmo editar textos e fotos, ou eu faço as alterações por R$ 100 sempre que você precisar.",
  },
  {
    pergunta: "Você faz manutenção?",
    resposta:
      "Sim. Você tem direito a uma manutenção por ano sem custo. Se precisar de mais, cada manutenção extra é cobrada à parte.",
  },
  {
    pergunta: "Como é o pagamento?",
    resposta:
      "Aceito Pix, cartão de débito e cartão de crédito, com parcelamento em até 6x. O projeto começa com o pagamento de um sinal, e é a partir dele que o prazo de entrega começa a contar.",
  },
];

export const CONTATO = {
  email: "luizfilipe.designuxui@gmail.com",
  linkedin: "https://www.linkedin.com/in/luiz-filipe-cardoso",
};
