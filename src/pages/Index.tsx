import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProcessSection from "@/components/ProcessSection";
import StatementSection from "@/components/StatementSection";
import ProjectsSection from "@/components/ProjectsSection";
import DesignSystemSection from "@/components/DesignSystemSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ProcessSection />
        <StatementSection />
        <ProjectsSection />
        <DesignSystemSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
