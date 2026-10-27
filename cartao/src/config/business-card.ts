/**
 * Dados do cartão de Luiz Filipe.
 * Origem: textos e contatos publicados no portfólio (luizfilipe-design).
 * Campo vazio some da tela. Não completar com dado que o site não publica.
 */
export type BusinessCardConfig = {
  fullName: string;
  firstName: string;
  lastName: string;
  role: string;
  credential: string;
  specialty: string;
  summary: string;
  practiceLine: string;
  location: string;
  /** URL pública final. Vazio = o QR usa o endereço em que a página está aberta. */
  publicUrl: string;
  /** Caminho opcional para um logotipo em `public/` ou URL https. Vazio = o nome em texto. */
  logoSrc: string;
  /** Foto do cartão. Coloque o arquivo em `public/`. Vazio = espaço reservado. */
  photoSrc: string;
  /** Capa. Vazio = a faixa de cor da marca, sem imagem. */
  coverSrc: string;
  monogram: string;
  email: string;
  emailSubject: string;
  /** Telefone como aparece no site. A normalização acontece na hora do link. */
  phoneDisplay: string;
  whatsappMessage: string;
  linkedinUrl: string;
  portfolioUrl: string;
  websiteUrl: string;
  resumeUrl: string;
  resumeFileName: string;
  schedulingUrl: string;
  opportunitySubject: string;
  opportunityBody: string;
  competencies: readonly string[];
  principles: readonly string[];
  experiences: readonly {
    role: string;
    organization: string;
    period: string;
    detail: string;
  }[];
  formation: readonly {
    title: string;
    place: string;
    period: string;
  }[];
  options: {
    linkedin: boolean;
    portfolio: boolean;
    website: boolean;
    saveContact: boolean;
    whatsapp: boolean;
    email: boolean;
    scheduling: boolean;
    resumeView: boolean;
    resumeDownload: boolean;
    experience: boolean;
    opportunities: boolean;
    share: boolean;
    downloadQr: boolean;
  };
};

export const businessCard = {
  fullName: "Luiz Filipe",
  firstName: "Luiz",
  lastName: "Filipe",
  role: "UX/UI Designer, Product Designer e Design Engineer",
  credential: "",
  specialty: "UX/UI, Product Design e Design Engineering",
  summary: "O Figma é só o começo.",
  practiceLine: "Pesquisa, interface no Figma e front-end em React no mesmo fluxo.",
  location: "",
  publicUrl: "",
  logoSrc: "",
  photoSrc: "/luiz-retrato.png",
  coverSrc: "",
  monogram: "LF",
  email: "luizfilipe.designuxui@gmail.com",
  emailSubject: "Contato pelo cartão digital",
  phoneDisplay: "+55 62 99447-4978",
  whatsappMessage: "Oi, Luiz. Seu cartão parou na minha tela. Quero continuar essa conversa.",
  linkedinUrl: "https://www.linkedin.com/in/luiz-filipe-cardoso",
  portfolioUrl: "https://luizfilipe-design.vercel.app",
  websiteUrl: "https://luizfilipe-design.vercel.app/sites",
  resumeUrl: "",
  resumeFileName: "",
  schedulingUrl: "",
  opportunitySubject: "Oportunidade profissional",
  opportunityBody: "Olá, Luiz. Entro em contato sobre uma oportunidade profissional.",
  competencies: ["UX/UI Design", "Product Design", "Design Engineering"],
  principles: ["Product Design", "UX/UI Design", "Design Engineering", "Figma + React"],
  experiences: [],
  formation: [
    {
      title: "Design Digital e User Experience",
      place: "Uniasselvi",
      period: "",
    },
  ],
  options: {
    linkedin: true,
    portfolio: true,
    website: true,
    saveContact: true,
    whatsapp: true,
    email: true,
    scheduling: true,
    resumeView: true,
    resumeDownload: true,
    experience: true,
    opportunities: true,
    share: true,
    downloadQr: true,
  },
} as const satisfies BusinessCardConfig;
