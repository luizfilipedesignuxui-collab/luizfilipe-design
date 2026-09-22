import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PositioningSection from "@/components/PositioningSection";
import AboutSection from "@/components/AboutSection";
import MarqueeSection from "@/components/MarqueeSection";
import SkillsSection from "@/components/SkillsSection";
import ProcessSection from "@/components/ProcessSection";
import StatementSection from "@/components/StatementSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * Narrative flow:
 * Hook → Positioning niche → Who I am → Capabilities → Method → Proof → Credentials → CTA
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        <HeroSection />
        <PositioningSection />
        <AboutSection />
        <MarqueeSection />
        <SkillsSection />
        <ProcessSection />
        <StatementSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
