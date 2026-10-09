import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PositioningSection from "@/components/PositioningSection";
import AboutSection from "@/components/AboutSection";
import AreasSection from "@/components/AreasSection";
import MarqueeSection from "@/components/MarqueeSection";
import SkillsSection from "@/components/SkillsSection";
import ProcessSection from "@/components/ProcessSection";
import StatementSection from "@/components/StatementSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SideName from "@/components/SideName";
import ScrollProgress from "@/components/motion/ScrollProgress";

/**
 * Narrative flow:
 * Hook → Who I am → Areas → Positioning → Capabilities → Method → Proof → Quote → Credentials → CTA
 */
const Index = () => {
  return (
    <div className="site-with-name min-h-screen bg-background">
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <SideName />
        <HeroSection />
        <AboutSection />
        <AreasSection />
        <PositioningSection />
        <MarqueeSection />
        <SkillsSection />
        <ProcessSection />
        <ProjectsSection />
        <StatementSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
