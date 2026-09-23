import { ArrowRight, Mail, Code2, Layout, Smartphone, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/contexts/LanguageContext";
import profilePhoto from "@/assets/profile-hero-cutout.png";

const HeroSection = () => {
  const { content } = useSiteContent();
  const { t } = useLanguage();

  const title = content.hero_title || "Luiz Filipe";
  const subtitle = t("hero.subtitle");
  const ctaPrimary = t("hero.cta_primary");
  const ctaSecondary = t("hero.cta_secondary");
  const role = t("hero.role");
  const photoAlt = `${title}, ${role}`;

  const nameParts = title.split(" ");
  const firstName = nameParts[0] || "Luiz";
  const lastName = nameParts.slice(1).join(" ") || "Filipe";

  const stats = [
    { number: "8+", label: t("hero.stat_projects") },
    { number: "100%", label: t("hero.stat_dedication") },
  ];

  const services = [
    { icon: Compass, title: t("hero.service_ux_title"), desc: t("hero.service_ux") },
    { icon: Layout, title: t("hero.service_brand_title"), desc: t("hero.service_brand") },
    { icon: Smartphone, title: t("hero.service_responsive_title"), desc: t("hero.service_responsive") },
    { icon: Code2, title: t("hero.service_prototyping_title"), desc: t("hero.service_prototyping") },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 bg-white">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-muted blur-3xl" />
        <div className="absolute bottom-32 left-16 w-80 h-80 rounded-full bg-muted blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="relative flex flex-col items-center justify-center mb-8 sm:mb-12">
          <span
            className="relative z-30 font-display font-bold text-foreground select-none tracking-wide uppercase mb-3 sm:mb-4 text-center px-4"
            style={{ fontSize: "clamp(0.85rem, 2vw, 1.35rem)", letterSpacing: "0.12em" }}
          >
            {role}
          </span>

          <div
            className="relative w-full max-w-[100vw] flex flex-col sm:flex-row items-end sm:items-center justify-center overflow-hidden"
            style={{ height: "clamp(260px, 38vw, 420px)" }}
          >
            <img
              src={profilePhoto}
              alt={photoAlt}
              fetchPriority="high"
              decoding="async"
              className="hidden sm:block absolute z-10 object-contain object-bottom pointer-events-none select-none"
              style={{
                height: "100%",
                maxHeight: "100%",
                width: "auto",
                right: "max(2%, calc(50% - 38vw))",
                bottom: 0,
                top: "auto",
                maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
              }}
            />
            <h1
              className="relative z-20 font-display font-extrabold select-none leading-none tracking-tighter whitespace-nowrap w-full text-center sm:text-left sm:w-auto"
              style={{
                fontSize: "clamp(3.5rem, 16vw, 18rem)",
                letterSpacing: "-0.03em",
                color: "hsl(48, 100%, 50%)",
              }}
            >
              {firstName} {lastName}
            </h1>
            <img
              src={profilePhoto}
              alt={photoAlt}
              fetchPriority="high"
              decoding="async"
              className="block sm:hidden w-[72%] max-w-[280px] object-contain object-bottom mt-2"
              style={{
                maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
              }}
            />
          </div>

          <div className="relative z-40 mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25"
            >
              <Link to="/projetos">
                {ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 border-primary/30 hover:bg-primary/5 bg-white"
            >
              <a href="#contato">
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                {ctaSecondary}
              </a>
            </Button>
          </div>
        </div>

        <div className="text-center max-w-xl mx-auto">
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex justify-center gap-10 sm:gap-14 pt-10" role="group" aria-label={t("hero.stats_label")}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">{stat.number}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-14 pt-8 sm:pt-10 border-t border-border/50 list-none m-0 p-0" aria-label={t("hero.services_label")}>
          {services.map((service) => (
            <li key={service.title} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl hover:bg-primary/5 transition-colors group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors" aria-hidden="true">
                <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold text-xs sm:text-sm text-foreground">{service.title}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{service.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HeroSection;
