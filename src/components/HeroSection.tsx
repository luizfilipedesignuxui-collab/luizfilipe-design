import { ArrowDown, Mail, Sparkles, Smartphone, Monitor, Figma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/contexts/LanguageContext";
import profilePhoto from "@/assets/profile-photo.png";

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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-muted blur-3xl" />
        <div className="absolute bottom-32 left-16 w-80 h-80 rounded-full bg-muted blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* === EDITORIAL HERO BANNER === */}
        <div className="relative flex items-center justify-center mb-12 sm:mb-16">
          {/* Large name text behind photo */}
          <div className="relative w-full flex items-center justify-center min-h-[340px] sm:min-h-[420px] lg:min-h-[520px]">
            {/* Script text "Creative" / "UX/UI" */}
            <span
              className="absolute top-0 sm:top-2 lg:top-4 left-1/2 -translate-x-1/2 lg:left-[18%] lg:translate-x-0 z-20 text-foreground select-none pointer-events-none"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                fontWeight: 700,
              }}
            >
              UX/UI Designer
            </span>

            {/* Giant name text */}
            <h1
              className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-primary select-none pointer-events-none leading-none tracking-tighter text-center"
              style={{
                fontSize: "clamp(4rem, 14vw, 14rem)",
                letterSpacing: "-0.04em",
                zIndex: 10,
              }}
            >
              {firstName}
              <br className="hidden sm:block" />
              <span className="sm:hidden">&nbsp;</span>
              {lastName}
            </h1>

            {/* Asterisk decoration */}
            <span
              className="absolute top-2 right-4 sm:top-4 sm:right-[10%] lg:right-[18%] z-20 text-foreground select-none pointer-events-none"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 900 }}
            >
              ✳
            </span>

            {/* Profile photo overlapping the text */}
            <div className="relative z-[15] w-[200px] h-[280px] sm:w-[260px] sm:h-[360px] lg:w-[340px] lg:h-[460px] overflow-hidden rounded-b-[40%] flex-shrink-0">
              <img
                src={profilePhoto}
                alt={title}
                className="w-full h-full object-cover object-top grayscale"
              />
            </div>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-14 sm:mt-18 pt-8 sm:pt-10 border-t border-border/50">
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
