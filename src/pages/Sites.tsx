import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SideName from "@/components/SideName";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SitesHeader from "@/components/sites/SitesHeader";
import SitesHero from "@/components/sites/SitesHero";
import SitesQuiz from "@/components/sites/SitesQuiz";
import FloatingWhatsApp from "@/components/sites/FloatingWhatsApp";
import {
  AboutLuizSection,
  FaqSection,
  FinalCtaSection,
  HowItWorksSection,
  NichesMarquee,
  PricingSection,
  ProjectsShowcase,
  ServicesSection,
  SitesFooter,
  TestimonialsSection,
} from "@/components/sites/SitesSections";

const TITLE = "Criação de sites para pequenos negócios | Luiz Filipe";
const DESCRIPTION =
  "Landing pages, sites institucionais e lojas virtuais para pequenos negócios. Quem desenha é quem programa. Orçamento pelo WhatsApp, sem compromisso.";

const useLandingMeta = () => {
  useEffect(() => {
    const prevTitle = document.title;
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevDesc = desc?.content;
    const prevCanonical = canonical?.href;

    document.title = TITLE;
    if (desc) desc.content = DESCRIPTION;
    if (canonical) canonical.href = "https://luizfilipe-design.vercel.app/sites";

    return () => {
      document.title = prevTitle;
      if (desc && prevDesc !== undefined) desc.content = prevDesc;
      if (canonical && prevCanonical) canonical.href = prevCanonical;
    };
  }, []);
};

/**
 * Landing page de serviços: um único objetivo, levar o visitante ao WhatsApp.
 * Hook → Sobre → Nichos → Serviços → Prova → Quiz → Método → Preço → FAQ → CTA
 */
const Sites = () => {
  useLandingMeta();
  const [params] = useSearchParams();
  const [showStrip, setShowStrip] = useState(params.get("utm_source") === "cartao");

  return (
    <div id="topo" className="site-with-name sites-lp min-h-screen bg-background">
      <ScrollProgress />
      <SitesHeader showStrip={showStrip} onCloseStrip={() => setShowStrip(false)} />
      <main id="main-content">
        <SideName role="Criação de sites para pequenos negócios" />
        <SitesHero />
        <AboutLuizSection />
        <NichesMarquee />
        <ServicesSection />
        <ProjectsShowcase />
        <SitesQuiz />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SitesFooter />
      <FloatingWhatsApp />
    </div>
  );
};

export default Sites;
