import {
  ArrowRight,
  MessageCircle,
  Code2,
  Layout,
  Smartphone,
  Compass,
  PenTool,
  Sparkles,
  Rocket,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";
import { useProjectLocale } from "@/hooks/useProjectLocale";
import profilePhoto from "@/assets/profile-hero-pose.png";

type OrbitSlot = {
  position: string;
  tilt: string;
  variant: "image" | "chip";
  icon: LucideIcon;
  tone: string;
  delay: string;
};

const orbitSlots: OrbitSlot[] = [
  {
    position: "hidden md:block md:left-[6%] md:top-[36%] md:w-40 lg:w-48",
    tilt: "rotateY(34deg) rotate(-3deg)",
    variant: "image",
    icon: Layers,
    tone: "bg-secondary/15 text-secondary",
    delay: "0s",
  },
  {
    position: "left-[1%] top-[4%] w-36 md:left-[22%] md:top-[8%] md:w-48 lg:w-52",
    tilt: "rotateY(24deg) rotate(-6deg)",
    variant: "chip",
    icon: PenTool,
    tone: "bg-accent/20 text-accent",
    delay: "0.8s",
  },
  {
    position: "left-[3%] top-[52%] w-36 md:left-[29%] md:top-[50%] md:w-48 lg:w-52",
    tilt: "rotateY(14deg) rotate(-3deg)",
    variant: "chip",
    icon: Sparkles,
    tone: "bg-primary/10 text-primary",
    delay: "1.6s",
  },
  {
    position: "right-[1%] top-[14%] w-36 md:right-[21%] md:top-[12%] md:w-48 lg:w-52",
    tilt: "rotateY(-24deg) rotate(7deg)",
    variant: "chip",
    icon: Rocket,
    tone: "bg-accent/20 text-accent",
    delay: "0.4s",
  },
  {
    position: "hidden md:block md:right-[6%] md:top-[38%] md:w-40 lg:w-48",
    tilt: "rotateY(-34deg) rotate(4deg)",
    variant: "image",
    icon: Layers,
    tone: "bg-secondary/15 text-secondary",
    delay: "1.2s",
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const HeroSection = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const { projects } = usePublishedProjects();
  const { loc } = useProjectLocale();

  const anchor = (hash: string) => (pathname === "/" ? hash : `/${hash}`);
  const featured = projects.filter((p) => p.imagem_capa).slice(0, orbitSlots.length);

  const services = [
    { icon: Compass, title: t("hero.service_ux_title"), desc: t("hero.service_ux") },
    { icon: Layout, title: t("hero.service_brand_title"), desc: t("hero.service_brand") },
    { icon: Smartphone, title: t("hero.service_responsive_title"), desc: t("hero.service_responsive") },
    { icon: Code2, title: t("hero.service_prototyping_title"), desc: t("hero.service_prototyping") },
  ];

  return (
    <section className="relative overflow-hidden bg-sky-hero pt-28 sm:pt-36">
      <div className="container mx-auto px-6 relative z-20 text-center">
        <p className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs sm:text-sm font-medium text-foreground/80">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
          {t("hero.eyebrow")}
        </p>

        <h1 className="mt-5 text-foreground leading-[0.95]">
          <span className="block font-display font-semibold tracking-tight text-[clamp(2.4rem,6.2vw,5rem)]">
            {t("hero.title_1")}
          </span>
          <span className="block font-serif-display italic font-normal tracking-tight text-[clamp(2.6rem,6.8vw,5.6rem)]">
            {t("hero.title_2")}
          </span>
        </h1>

        <p className="mt-5 mx-auto max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          {t("hero.subtitle")}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/projetos"
            className={`inline-flex items-center gap-2 rounded-full bg-primary px-6 h-12 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors ${focusRing}`}
          >
            {t("hero.cta_primary")}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <a
            href={anchor("#contato")}
            className={`inline-flex items-center gap-2.5 rounded-full glass-card px-5 h-12 text-sm font-semibold text-foreground hover:bg-white transition-colors ${focusRing}`}
          >
            <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center" aria-hidden="true">
              <MessageCircle className="w-3.5 h-3.5 text-primary-foreground" />
            </span>
            {t("hero.cta_secondary")}
          </a>
        </div>
      </div>

      {/* Side cards (desktop) */}
      <div className="hidden lg:block absolute left-[4%] top-[38%] z-20 w-56 -rotate-6 animate-hero-float">
        <div className="glass-card rounded-3xl p-5 text-left">
          <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm" aria-hidden="true">
            <Code2 className="w-4 h-4 text-foreground" />
          </span>
          <p className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">
            {t("hero.card_left_title")}
          </p>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{t("hero.card_left_desc")}</p>
        </div>
        <svg className="absolute left-1/2 top-full w-40 h-36 text-foreground/25" viewBox="0 0 160 144" fill="none" aria-hidden="true">
          <path d="M4 0 C 4 70, 70 120, 152 136" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="152" cy="136" r="3.5" fill="currentColor" />
        </svg>
      </div>

      <div className="hidden lg:block absolute right-[4%] top-[42%] z-20 w-56 rotate-6 animate-hero-float" style={{ animationDelay: "1s" }}>
        <div className="glass-card rounded-3xl p-5 text-left">
          <div className="flex items-center" aria-hidden="true">
            {featured.slice(0, 3).map((p, i) => (
              <img
                key={p.id}
                src={p.imagem_capa}
                alt=""
                className="w-9 h-9 rounded-full object-cover border-2 border-white bg-white"
                style={{ marginLeft: i === 0 ? 0 : -10 }}
              />
            ))}
            <span className="w-9 h-9 -ml-2.5 rounded-full bg-white border-2 border-white flex items-center justify-center text-sm font-semibold text-foreground">
              +
            </span>
          </div>
          <p className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">
            {t("hero.card_right_title")}
          </p>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{t("hero.card_right_desc")}</p>
        </div>
        <svg className="absolute right-1/2 top-full w-40 h-36 text-foreground/25" viewBox="0 0 160 144" fill="none" aria-hidden="true">
          <path d="M156 0 C 156 70, 90 120, 8 136" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="136" r="3.5" fill="currentColor" />
        </svg>
      </div>

      {/* Photo + orbit of clickable projects */}
      <div
        className="relative mx-auto mt-8 w-full max-w-5xl"
        style={{ height: "clamp(380px, 52vw, 620px)" }}
      >
        <img
          src={profilePhoto}
          alt={t("hero.photo_alt")}
          fetchPriority="high"
          decoding="async"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none object-contain select-none pointer-events-none"
        />

        <nav aria-label={t("hero.orbit_label")}>
          <ul className="list-none m-0 p-0">
            {featured.map((project, index) => {
              const slot = orbitSlots[index];
              const l = loc(project);
              const shortTitle = l.titulo.split(":")[0];
              return (
                <li
                  key={project.id}
                  className={`absolute z-20 ${slot.position} animate-hero-float`}
                  style={{ animationDelay: slot.delay }}
                >
                  <Link
                    to={`/projetos/${project.slug}`}
                    aria-label={`${t("projects.view_case")}: ${l.titulo}`}
                    className={`group block rounded-2xl glass-card p-2.5 transition-transform duration-300 hover:scale-[1.06] hover:bg-white/80 ${focusRing}`}
                    style={{ transform: `perspective(900px) ${slot.tilt}` }}
                  >
                    {slot.variant === "image" ? (
                      <>
                        <span className="block aspect-[4/3] overflow-hidden rounded-xl bg-white">
                          <img
                            src={project.imagem_capa}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </span>
                        <span className="mt-2 px-1 text-left text-[11px] lg:text-xs font-semibold text-foreground line-clamp-1">
                          {shortTitle}
                        </span>
                      </>
                    ) : (
                      <span className="flex items-center gap-2.5 text-left">
                        <span className={`w-8 h-8 lg:w-9 lg:h-9 shrink-0 rounded-full flex items-center justify-center ${slot.tone}`} aria-hidden="true">
                          <slot.icon className="w-4 h-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="font-display text-xs lg:text-sm font-semibold text-foreground line-clamp-1">
                            {shortTitle}
                          </span>
                          <span className="text-[10px] lg:text-[11px] text-muted-foreground line-clamp-1">
                            {l.categoria}
                          </span>
                        </span>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block absolute left-[-4%] bottom-16 z-20 text-left">
          <span className="block w-8 h-px bg-foreground/30 mb-3" aria-hidden="true" />
          <p className="text-sm text-foreground/80 leading-snug">
            {t("hero.role")}
            <br />
            <span className="text-muted-foreground">8+ {t("hero.stat_projects").toLowerCase()}</span>
          </p>
        </div>

        <div className="hidden lg:flex absolute right-[-4%] bottom-20 z-20 items-start gap-3 text-left">
          <Sparkles className="w-4 h-4 text-foreground mt-0.5" aria-hidden="true" />
          <p className="text-sm text-foreground/80 leading-snug">
            {t("hero.note_right_1")}
            <br />
            {t("hero.note_right_2")}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" aria-hidden="true" />
      </div>

      <div className="relative z-20 bg-background pb-14 sm:pb-20">
        <div className="container mx-auto px-6">
          <ul
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 list-none m-0 p-0"
            aria-label={t("hero.services_label")}
          >
            {services.map((service) => (
              <li key={service.title} className="flex items-start gap-3 rounded-2xl glass-card p-4">
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm" aria-hidden="true">
                  <service.icon className="w-4 h-4 text-foreground" />
                </span>
                <span>
                  <span className="block font-display text-xs sm:text-sm font-semibold text-foreground">{service.title}</span>
                  <span className="block text-[11px] sm:text-xs text-muted-foreground mt-0.5">{service.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
