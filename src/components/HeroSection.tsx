import {
  Code2,
  Layout,
  Smartphone,
  Compass,
  PenTool,
  Sparkles,
  Rocket,
  Layers,
  MapPin,
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
  layer: string;
};

const orbitExcludedSlugs = ["app-mobilidade-pontuo"];

const orbitSlots: OrbitSlot[] = [
  {
    position: "left-[2%] top-[18%] w-40 md:left-[10%] md:top-[16%] md:w-52",
    tilt: "rotateY(-18deg) rotate(-7deg)",
    variant: "chip",
    icon: PenTool,
    tone: "bg-secondary/15 text-secondary",
    delay: "0.8s",
    layer: "z-20",
  },
  {
    position: "left-[2%] top-[44%] w-40 md:left-[7%] md:top-[56%] md:w-52",
    tilt: "rotateY(-12deg) rotate(-4deg)",
    variant: "chip",
    icon: Sparkles,
    tone: "bg-primary/10 text-primary",
    delay: "1.6s",
    layer: "z-30",
  },
  {
    position: "right-[2%] top-[58%] w-40 md:right-[2%] md:top-[40%] md:w-52",
    tilt: "rotateY(22deg) rotate(9deg)",
    variant: "chip",
    icon: Rocket,
    tone: "bg-accent/20 text-accent",
    delay: "0.4s",
    layer: "z-30",
  },
  {
    position: "left-[3%] top-[72%] w-40 md:left-auto md:right-[6%] md:top-[63%] md:w-52",
    tilt: "rotateY(20deg) rotate(4deg)",
    variant: "chip",
    icon: MapPin,
    tone: "bg-primary/10 text-primary",
    delay: "1.2s",
    layer: "z-20",
  },
  {
    position: "right-[2%] top-[4%] w-40 md:right-[7%] md:top-[17%] md:w-52",
    tilt: "rotateY(18deg) rotate(5deg)",
    variant: "chip",
    icon: Layers,
    tone: "bg-secondary/15 text-secondary",
    delay: "2s",
    layer: "z-20",
  },
];

const ringPath =
  "M20 20 C 42 9, 68 10, 83 21 C 89 27, 90 36, 88 44 C 86 52, 88 60, 84 67 C 68 82, 34 78, 18 60 C 10 51, 10 31, 20 20 Z";

const ringDots = [
  [20, 20],
  [83, 21],
  [88, 44],
  [84, 67],
  [18, 60],
];

const glassSlivers = [
  "left-[30%] top-[30%] w-[2.5%] h-[22%] rotate-[-4deg]",
  "left-[6%] top-[32%] w-[3%] h-[20%] rotate-[3deg]",
  "right-[28%] top-[30%] w-[5%] h-[11%] rotate-[8deg]",
  "right-[1%] top-[56%] w-[3%] h-[24%] rotate-[6deg]",
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const HeroSection = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const { projects } = usePublishedProjects();
  const { loc } = useProjectLocale();

  const anchor = (hash: string) => (pathname === "/" ? hash : `/${hash}`);
  const featured = projects
    .filter((p) => p.imagem_capa && !orbitExcludedSlugs.includes(p.slug))
    .slice(0, orbitSlots.length);

  const services = [
    { icon: Compass, title: t("hero.service_ux_title"), desc: t("hero.service_ux") },
    { icon: Layout, title: t("hero.service_brand_title"), desc: t("hero.service_brand") },
    { icon: Smartphone, title: t("hero.service_responsive_title"), desc: t("hero.service_responsive") },
    { icon: Code2, title: t("hero.service_prototyping_title"), desc: t("hero.service_prototyping") },
  ];

  const leftCardBody = (
    <>
      <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm" aria-hidden="true">
        <Code2 className="w-4 h-4 text-foreground" />
      </span>
      <p className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">{t("hero.card_left_title")}</p>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{t("hero.card_left_desc")}</p>
    </>
  );

  const rightCardBody = (
    <>
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
      <p className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">{t("hero.card_right_title")}</p>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{t("hero.card_right_desc")}</p>
    </>
  );

  return (
    <section className="relative overflow-hidden bg-sky-hero">
      <div className="relative pt-28 sm:pt-32">
        <div className="container mx-auto px-6 relative z-40 text-center">
          <h1 className="font-display font-bold text-foreground leading-[0.9] tracking-[-0.04em] whitespace-nowrap text-[clamp(2.75rem,11vw,8.5rem)]">
            Luiz <span className="text-accent">Filipe.</span>
            <span className="sr-only"> · {t("hero.role")}</span>
          </h1>
        </div>

        {/* Side cards (wide screens) */}
        <div className="hidden min-[1400px]:block absolute left-[3%] top-[22%] z-40 w-56 -rotate-6 animate-hero-float">
          <div className="glass-card rounded-3xl p-5 text-left">{leftCardBody}</div>
          <svg
            className="absolute left-1/2 top-full w-[220px] h-[300px] text-foreground/25 rotate-6 origin-top-left"
            viewBox="0 0 220 300"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 0 C 2 170, 90 280, 216 294" stroke="currentColor" strokeWidth="1.25" />
            <circle cx="216" cy="294" r="3.5" fill="currentColor" />
          </svg>
        </div>

        <div
          className="hidden min-[1400px]:block absolute right-[3%] top-[24%] z-40 w-56 rotate-[5deg] animate-hero-float"
          style={{ animationDelay: "1s" }}
        >
          <div className="glass-card rounded-3xl p-5 text-left">{rightCardBody}</div>
          <svg
            className="absolute right-1/2 top-full w-[200px] h-[300px] text-foreground/25 -rotate-[5deg] origin-top-right"
            viewBox="0 0 200 300"
            fill="none"
            aria-hidden="true"
          >
            <path d="M198 0 C 198 170, 110 280, 4 294" stroke="currentColor" strokeWidth="1.25" />
            <circle cx="4" cy="294" r="3.5" fill="currentColor" />
          </svg>
        </div>

        {/* Photo + ring of clickable projects around the head */}
        <div
          className="relative mx-auto mt-2 w-full max-w-5xl"
          style={{ height: "clamp(440px, 60vw, 680px)" }}
        >
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <img
              src={profilePhoto}
              alt=""
              fetchPriority="high"
              decoding="async"
              className="absolute left-1/2 -translate-x-1/2 w-auto max-w-none select-none pointer-events-none"
              style={{
                height: "150%",
                top: "-14%",
                maskImage: "linear-gradient(to bottom, black 58%, transparent 76%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 58%, transparent 76%)",
              }}
            />
          </div>
          <span className="sr-only">{t("hero.photo_alt")}</span>

          {glassSlivers.map((pos) => (
            <span
              key={pos}
              className={`hidden md:block absolute ${pos} rounded-xl border border-white/70 bg-gradient-to-b from-white/50 to-white/10 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(18,29,48,0.25)]`}
              aria-hidden="true"
            />
          ))}

          <div className="hidden md:block absolute inset-0 z-[5] pointer-events-none" aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
              <path d={ringPath} stroke="white" strokeOpacity="0.55" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path
                d={ringPath}
                stroke="hsl(var(--foreground))"
                strokeOpacity="0.14"
                strokeWidth="1"
                strokeDasharray="3 5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {ringDots.map(([x, y]) => (
              <span
                key={`${x}-${y}`}
                className="absolute w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.35)]"
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            ))}
          </div>

          <nav aria-label={t("hero.orbit_label")}>
            <ul className="list-none m-0 p-0">
              {featured.map((project, index) => {
                const slot = orbitSlots[index];
                const l = loc(project);
                const shortTitle = l.titulo.split(":")[0];
                return (
                  <li
                    key={project.id}
                    className={`absolute ${slot.layer} ${slot.position} animate-hero-float`}
                    style={{ animationDelay: slot.delay }}
                  >
                    <Link
                      to={`/projetos/${project.slug}`}
                      aria-label={`${t("projects.view_case")}: ${l.titulo}`}
                      className={`group block transition-transform duration-300 hover:scale-[1.05] ${focusRing} ${
                        slot.variant === "image"
                          ? "rounded-2xl border border-white/80 bg-white/30 p-1.5 backdrop-blur-md shadow-[0_20px_40px_-16px_rgba(18,29,48,0.35)]"
                          : "rounded-2xl glass-card px-3 py-2.5 hover:bg-white/80"
                      }`}
                      style={{ transform: `perspective(900px) ${slot.tilt}` }}
                    >
                      {slot.variant === "image" ? (
                        <span className="relative block aspect-[3/5] overflow-hidden rounded-xl bg-white">
                          <img
                            src={project.imagem_capa}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                          />
                          <span className="absolute inset-x-1.5 bottom-1.5 rounded-lg bg-white/80 backdrop-blur px-2 py-1 text-left text-[10px] lg:text-[11px] font-semibold text-foreground line-clamp-1">
                            {shortTitle}
                          </span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2.5 text-left">
                          <span
                            className={`w-8 h-8 lg:w-9 lg:h-9 shrink-0 rounded-full flex items-center justify-center ${slot.tone}`}
                            aria-hidden="true"
                          >
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
        </div>

        <div className="hidden min-[1400px]:flex absolute right-[4%] bottom-[16%] z-40 items-center gap-4 text-left">
          <span className="block w-6 h-px bg-foreground/30" aria-hidden="true" />
          <div>
            <Sparkles className="w-4 h-4 text-foreground mb-2" aria-hidden="true" />
            <p className="text-sm text-foreground/80 leading-snug">
              {t("hero.note_right_1")}
              <br />
              {t("hero.note_right_2")}
            </p>
          </div>
        </div>

        <a
          href={anchor("#contato")}
          aria-label={t("hero.cta_secondary")}
          className={`hidden md:flex absolute right-[3%] bottom-[5%] z-40 w-16 h-16 rounded-full glass-card items-center justify-center hover:bg-white transition-colors ${focusRing}`}
        >
          <Sparkles className="w-6 h-6 text-foreground" aria-hidden="true" />
        </a>
      </div>

      <div className="relative z-40 pb-14 sm:pb-20">
        <div className="container mx-auto px-6">
          <div className="min-[1400px]:hidden grid sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="glass-card rounded-3xl p-5 text-left">{leftCardBody}</div>
            <div className="glass-card rounded-3xl p-5 text-left">{rightCardBody}</div>
          </div>
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
