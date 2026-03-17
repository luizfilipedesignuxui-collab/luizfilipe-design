import { ArrowDown, Mail, Sparkles, Smartphone, Monitor, Figma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/contexts/LanguageContext";
import profilePhoto from "@/assets/profile-hero-cutout.png";


const HeroSection = () => {
  const { content } = useSiteContent();
  const { language, t } = useLanguage();

  const title = content.hero_title || "Luiz Filipe";
  const subtitle = language === "pt"
    ? (content.hero_subtitle || "Criando experiências digitais intuitivas, estratégicas e centradas no usuário.")
    : "Creating intuitive, strategic, and user-centered digital experiences.";
  const ctaPrimary = t("hero.cta_primary");
  const ctaSecondary = t("hero.cta_secondary");

  const nameParts = title.split(" ");
  const firstName = nameParts[0] || "Luiz";
  const lastName = nameParts.slice(1).join(" ") || "Filipe";

  const stats = [
    { number: "5+", label: t("hero.stat_projects") },
    { number: "2", label: t("hero.stat_experience") },
    { number: "100%", label: t("hero.stat_dedication") },
  ];

  const services = [
    { icon: Sparkles, title: "User-Centered Design", desc: t("hero.service_ux") },
    { icon: Figma, title: "Brand Identity", desc: t("hero.service_brand") },
    { icon: Monitor, title: "Responsive UI", desc: t("hero.service_responsive") },
    { icon: Smartphone, title: "Seamless Prototyping", desc: t("hero.service_prototyping") },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20" style={{ backgroundColor: "hsl(220, 20%, 78%)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-muted blur-3xl" />
        <div className="absolute bottom-32 left-16 w-80 h-80 rounded-full bg-muted blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* === EDITORIAL HERO BANNER === */}
        <div className="relative flex flex-col items-center justify-center mb-8 sm:mb-12">

          {/* UX/UI Designer — same Sora font as name */}
          <span className="relative z-30 font-display font-bold text-foreground select-none tracking-wide uppercase mb-2"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.8rem)", letterSpacing: "0.15em" }}
          >
            UX/UI Designer
          </span>

          {/* Asterisk */}
          <span
            className="absolute top-0 right-4 sm:right-[5%] lg:right-[10%] z-30 text-foreground select-none"
            style={{ fontSize: "clamp(1.5rem, 3vw, 3.5rem)", fontWeight: 900 }}
          >
            ✳
          </span>

          {/* Name + Photo layered composition */}
          <div className="relative w-screen flex items-center justify-center"
            style={{ height: "clamp(200px, 30vw, 400px)" }}
          >
            {/* Profile photo on the left */}
            <img
              src={profilePhoto}
              alt={title}
              className="absolute h-[130%] object-contain object-bottom z-10"
              style={{
                left: "50%",
                transform: "translateX(-115%)",
                bottom: 0,
                mixBlendMode: "multiply",
              }}
            />
            <h1
              className="font-display font-extrabold select-none leading-none tracking-tighter whitespace-nowrap text-center"
              style={{
                fontSize: "clamp(5rem, 16vw, 18rem)",
                letterSpacing: "-0.03em",
                color: "hsl(45, 100%, 45%)",
              }}
            >
              {firstName} {lastName}
            </h1>
          </div>
        </div>

        {/* Subtitle and CTAs */}
        <div className="text-center space-y-6 max-w-xl mx-auto">
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
              <a href="#projetos">
                <ArrowDown className="mr-2 h-4 w-4" />
                {ctaPrimary}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary/30 hover:bg-primary/5">
              <a href="#contato">
                <Mail className="mr-2 h-4 w-4" />
                {ctaSecondary}
              </a>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 sm:gap-14 pt-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-accent">{stat.number}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-14 pt-8 sm:pt-10 border-t border-border/50">
          {services.map((service) => (
            <div key={service.title} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl hover:bg-primary/5 transition-colors group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors">
                <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xs sm:text-sm text-foreground">{service.title}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
