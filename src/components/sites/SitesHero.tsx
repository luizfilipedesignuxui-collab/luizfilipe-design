import HeroSection, { type HeroContent } from "@/components/HeroSection";
import { MESSAGES, trackWhatsApp, waLink } from "./content";

const content: HeroContent = {
  ariaLabel: "Criação de sites para pequenos negócios",
  phrase: "Bora colocar sua ideia no ar?",
  lead: "Eu desenho a experiência, escrevo o código e entrego seu site rodando. Sem telefone sem fio entre designer e dev.",
  primary: {
    label: "Quero meu orçamento",
    href: waLink(MESSAGES.hero),
    ariaLabel: "Quero meu orçamento (abre o WhatsApp em nova aba)",
    onClick: () => trackWhatsApp("hero"),
  },
  secondary: { label: "Ver projetos", href: "#projetos" },
  panelLabel: "Do rabisco ao deploy",
  panelTitle: "Ideia boa não merece ficar na gaveta.",
  panelNote: "Pesquisa, interface e React no mesmo par de mãos.",
};

const SitesHero = () => <HeroSection id="hero" className="hero-split--half" content={content} />;

export default SitesHero;
