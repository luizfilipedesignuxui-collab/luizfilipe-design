import { useId, useRef, useState } from "react";
import {
  ChevronDown,
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
import { motion } from "motion/react";
import { EASE_OUT, REVEAL_DISTANCE, STAGGER, revealItem } from "@/components/motion/tokens";
import HeroParticles from "@/components/hero/HeroParticles";
import profilePhoto from "@/assets/profile-hero-pose.png";

type OrbitSlot = {
  position: string;
  /** Angle (deg) of the card centre on the cylinder wrapped around the head; negative = left side. */
  arc: number;
  roll: number;
  icon: LucideIcon;
  tone: string;
  delay: string;
  layer: string;
};

/** Bottom fade of the hero photo, shared by the <img> mask and the particle sampler. */
const PHOTO_MASK = { solid: 0.58, clear: 0.76 };
const photoMaskCss = `linear-gradient(to bottom, black ${PHOTO_MASK.solid * 100}%, transparent ${PHOTO_MASK.clear * 100}%)`;

const orbitExcludedSlugs = ["app-mobilidade-pontuo"];

const orbitSlots: OrbitSlot[] = [
  {
    position: "left-[1%] top-[12%] md:left-[10%] md:top-[16%]",
    arc: -20,
    roll: -6,
    icon: PenTool,
    tone: "bg-secondary/20 text-secondary",
    delay: "0.8s",
    layer: "z-20",
  },
  {
    position: "left-[1%] top-[54%] md:left-[7%] md:top-[56%]",
    arc: -18,
    roll: -3,
    icon: Sparkles,
    tone: "bg-primary/10 text-primary",
    delay: "1.6s",
    layer: "z-30",
  },
  {
    position: "right-[1%] top-[36%] md:right-[2%] md:top-[40%]",
    arc: 32,
    roll: 7,
    icon: Rocket,
    tone: "bg-accent/25 text-accent-ink",
    delay: "0.4s",
    layer: "z-30",
  },
  {
    position: "right-[1%] top-[72%] md:right-[6%] md:top-[63%]",
    arc: 28,
    roll: 3,
    icon: MapPin,
    tone: "bg-primary/10 text-primary",
    delay: "1.2s",
    layer: "z-20",
  },
  {
    position: "right-[1%] top-[3%] md:right-[7%] md:top-[17%]",
    arc: 30,
    roll: 4,
    icon: Layers,
    tone: "bg-secondary/20 text-secondary",
    delay: "2s",
    layer: "z-20",
  },
];

const CURVE_SLICES = 10;
const CURVE_RADIUS = 0.9;

const curveSlices = (arcDeg: number) => {
  const phi0 = (arcDeg * Math.PI) / 180;
  return Array.from({ length: CURVE_SLICES }, (_, i) => {
    const u = (i + 0.5) / CURVE_SLICES - 0.5;
    const theta = phi0 + u / CURVE_RADIUS;
    const dx = CURVE_RADIUS * (Math.sin(theta) - Math.sin(phi0)) - u;
    const dz = CURVE_RADIUS * (Math.cos(theta) - Math.cos(phi0));
    const left = (i / CURVE_SLICES) * 100;
    const right = 100 - ((i + 1) / CURVE_SLICES) * 100;
    return {
      clipPath: `inset(0 calc(${right}% - 0.75px) 0 calc(${left}% - 0.75px))`,
      transformOrigin: `${((i + 0.5) / CURVE_SLICES) * 100}% 50%`,
      transform: `translate3d(calc(var(--card-w) * ${dx.toFixed(4)}), 0, calc(var(--card-w) * ${dz.toFixed(4)})) rotateY(${(
        (theta * 180) /
        Math.PI
      ).toFixed(2)}deg)`,
    };
  });
};

const curveShading = (arcDeg: number) => {
  const phi0 = (arcDeg * Math.PI) / 180;
  const stops = Array.from({ length: 11 }, (_, i) => {
    const u = i / 10 - 0.5;
    const theta = phi0 + u / CURVE_RADIUS;
    const shade = Math.min(0.3, (1 - Math.cos(theta)) * 0.85);
    return `hsl(var(--foreground) / ${shade.toFixed(3)}) ${i * 10}%`;
  });
  return `linear-gradient(to right, ${stops.join(", ")})`;
};

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

type RevealCardProps = { icon: LucideIcon; title: string; desc: string; className?: string };

const RevealCard = ({ icon: Icon, title, desc, className = "" }: RevealCardProps) => {
  const [open, setOpen] = useState(false);
  const hoveredByMouse = useRef(false);
  const panelId = useId();

  return (
    <motion.li
      variants={revealItem}
      className={`rounded-2xl glass-card transition-[background-color,box-shadow] duration-300 ${
        open ? "bg-white/80 shadow-lg" : ""
      } ${className}`}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        hoveredByMouse.current = true;
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        hoveredByMouse.current = false;
        setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (hoveredByMouse.current) return;
          setOpen((value) => !value);
        }}
        className={`w-full flex items-center gap-3 rounded-2xl p-3.5 text-left ${focusRing}`}
      >
        <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm" aria-hidden="true">
          <Icon className="w-4 h-4 text-foreground" />
        </span>
        <span className="flex-1 font-display text-sm font-semibold text-foreground">{title}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pl-[3.75rem] pr-4 pb-4 text-xs text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.li>
  );
};

const HeroSection = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const { projects } = usePublishedProjects();
  const { loc } = useProjectLocale();
  const stageRef = useRef<HTMLDivElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const [particlesActive, setParticlesActive] = useState(false);

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
          <motion.h1
            initial={{ opacity: 0, y: REVEAL_DISTANCE }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="font-display font-bold text-foreground leading-[0.9] tracking-[-0.04em] whitespace-nowrap text-[clamp(2.75rem,11vw,8.5rem)]"
          >
            <span className="text-accent-display">Luiz Filipe.</span>
            <span className="sr-only"> · {t("hero.role")}</span>
          </motion.h1>
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
          ref={stageRef}
          className="relative mx-auto mt-2 w-full max-w-5xl"
          style={{ height: "clamp(440px, 60vw, 680px)" }}
        >
          <div ref={photoFrameRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <img
              ref={photoRef}
              src={profilePhoto}
              alt=""
              fetchPriority="high"
              decoding="async"
              className={`absolute left-1/2 -translate-x-1/2 w-auto max-w-none select-none pointer-events-none ${
                particlesActive ? "invisible" : ""
              }`}
              style={{ height: "150%", top: "-14%", maskImage: photoMaskCss, WebkitMaskImage: photoMaskCss }}
            />
            <HeroParticles
              imageRef={photoRef}
              containerRef={photoFrameRef}
              interactionRef={stageRef}
              mask={PHOTO_MASK}
              onActiveChange={setParticlesActive}
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

          <div className="absolute inset-0 z-[5] pointer-events-none" aria-hidden="true">
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
                const { arc } = slot;
                const shading = curveShading(arc);
                const face = (
                  <span className="flex items-center gap-2 px-2.5 py-2 md:gap-3 md:px-4 md:py-3.5 text-left">
                    <span
                      className={`w-7 h-7 md:w-10 md:h-10 shrink-0 rounded-lg md:rounded-xl flex items-center justify-center ${slot.tone}`}
                    >
                      <slot.icon className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-xs leading-tight md:text-base md:leading-normal font-semibold text-foreground line-clamp-2">
                        {shortTitle}
                      </span>
                      <span className="hidden md:block text-xs text-muted-foreground line-clamp-1">
                        {l.categoria}
                      </span>
                    </span>
                  </span>
                );
                return (
                  <li
                    key={project.id}
                    className={`absolute ${slot.layer} ${slot.position} w-[var(--card-w)] [--card-w:8rem] md:[--card-w:14rem] animate-hero-float`}
                    style={{
                      animationDelay: slot.delay,
                      perspective: "640px",
                      perspectiveOrigin: arc < 0 ? "120% 50%" : "-30% 50%",
                    }}
                  >
                    <motion.span
                      className="block [transform-style:preserve-3d]"
                      initial={{ opacity: 0, y: REVEAL_DISTANCE, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.45 + index * STAGGER }}
                    >
                    <Link
                      to={`/projetos/${project.slug}`}
                      aria-label={`${t("projects.view_case")}: ${l.titulo}`}
                      className={`group block rounded-2xl [transform-style:preserve-3d] ${focusRing}`}
                      style={{ transform: `rotate(${slot.roll}deg)` }}
                    >
                      <span className="relative block [transform-style:preserve-3d] transition-transform duration-300 group-hover:scale-[1.06]">
                        <span className="invisible block" aria-hidden="true">
                          {face}
                        </span>
                        {curveSlices(arc).map((slice, i) => (
                          <span
                            key={i}
                            className="absolute inset-0 rounded-2xl border border-white bg-gradient-to-br from-white via-[hsl(var(--background))] to-[hsl(var(--sky-mid))] [backface-visibility:hidden]"
                            style={{
                              clipPath: slice.clipPath,
                              transformOrigin: slice.transformOrigin,
                              transform: slice.transform,
                            }}
                            aria-hidden="true"
                          >
                            {face}
                            <span
                              className="absolute inset-0 rounded-2xl pointer-events-none"
                              style={{ backgroundImage: shading }}
                            />
                          </span>
                        ))}
                      </span>
                    </Link>
                    </motion.span>
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
          <motion.ul
            className="grid sm:grid-cols-2 lg:grid-cols-4 items-start gap-3 list-none m-0 p-0"
            aria-label={t("hero.services_label")}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: STAGGER, delayChildren: 0.7 } } }}
          >
            <RevealCard
              icon={Code2}
              title={t("hero.card_left_title")}
              desc={t("hero.card_left_desc")}
              className="sm:col-span-2 lg:col-span-4 min-[1400px]:hidden"
            />
            {services.map((service) => (
              <RevealCard key={service.title} icon={service.icon} title={service.title} desc={service.desc} />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
