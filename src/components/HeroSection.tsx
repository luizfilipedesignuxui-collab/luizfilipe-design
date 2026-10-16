import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE_OUT, STAGGER, revealItem } from "@/components/motion/tokens";


const SIDE_DURATION = { paper: 3500, brand: 4500 } as const;
const MOBILE_QUERY = "(max-width: 767px)";

/** Read synchronously so the first paint on mobile already starts on the white side. */
const useIsMobileNow = () => {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
};

export type HeroContent = {
  ariaLabel: string;
  phrase: string;
  lead: string;
  primary: { label: string; href: string; ariaLabel: string; onClick?: () => void };
  secondary: { label: string; href: string };
  panelLabel: string;
  panelTitle: string;
  panelNote: string;
};

type HeroSectionProps = {
  id?: string;
  className?: string;
  /** Other pages reuse the banner with their own copy; defaults to the portfolio copy. */
  content?: HeroContent;
};

const HeroSection = ({ id, className = "", content }: HeroSectionProps) => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const anchor = (hash: string) => (pathname === "/" ? hash : `/${hash}`);
  const isMobile = useIsMobileNow();
  const c: HeroContent = content ?? {
    ariaLabel: t("hero.role"),
    phrase: t("hero.phrase"),
    lead: t("hero.lead"),
    primary: {
      label: t("hero.whatsapp"),
      href: "https://wa.me/5562992776534",
      ariaLabel: `${t("hero.whatsapp")} (${t("a11y.opens_new_tab")})`,
    },
    secondary: { label: t("hero.cta_primary"), href: anchor("#projetos") },
    panelLabel: t("hero.panel_label"),
    panelTitle: t("hero.panel_title"),
    panelNote: t("hero.panel_note"),
  };
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { amount: 0.3 });
  const [side, setSide] = useState<"paper" | "brand">("paper");
  const [touching, setTouching] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const cycle = isMobile && !reduceMotion;

  useEffect(() => {
    if (!cycle || !heroInView) {
      setSide("paper");
      return;
    }
    if (touching || focusInside) return;
    const id = window.setTimeout(() => setSide((s) => (s === "paper" ? "brand" : "paper")), SIDE_DURATION[side]);
    return () => window.clearTimeout(id);
  }, [cycle, heroInView, touching, focusInside, side]);

  useEffect(() => {
    if (mainRef.current) mainRef.current.inert = cycle && side === "brand";
    if (panelRef.current) panelRef.current.inert = cycle && side === "paper";
  }, [cycle, side]);

  const sideState = (target: "paper" | "brand") =>
    cycle ? (heroInView && side === target ? "visible" : "hidden") : undefined;

  return (
    <>
      <motion.section
        ref={heroRef}
        id={id}
        className={`hero-split relative ${cycle ? "hero-split--cycle" : ""} ${className}`}
        onFocus={() => setFocusInside(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocusInside(false)}
        onPointerDown={() => setTouching(true)}
        onPointerUp={() => setTouching(false)}
        onPointerCancel={() => setTouching(false)}
        onPointerLeave={() => setTouching(false)}
        aria-label={c.ariaLabel}
        initial="hidden"
        whileInView={cycle ? undefined : "visible"}
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div
          ref={mainRef}
          className="hero-main"
          animate={sideState("paper")}
          variants={{ visible: { transition: { staggerChildren: STAGGER * 2, delayChildren: 0.15 } } }}
        >
          <motion.p variants={revealItem} className="hero-phrase font-serif-display">
            {c.phrase}
          </motion.p>
          <motion.p variants={revealItem} className="max-w-xl text-base sm:text-lg text-foreground leading-relaxed">
            {c.lead}
          </motion.p>
          <motion.div variants={revealItem} className="mx-auto flex w-full max-w-sm flex-col gap-3 sm:mx-0 sm:max-w-none sm:flex-row sm:flex-wrap">
            <a
              href={c.primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-on-paper w-full justify-center sm:w-auto"
              aria-label={c.primary.ariaLabel}
              onClick={c.primary.onClick}
            >
              {c.primary.label}
            </a>
            <a href={c.secondary.href} className="btn-on-paper-outline w-full justify-center sm:w-auto">
              {c.secondary.label}
              <ArrowRight className="btn-arrow w-5 h-5" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          ref={panelRef}
          className="hero-panel"
          initial={cycle ? "hidden" : undefined}
          animate={sideState("brand")}
          variants={{
            hidden: { clipPath: reduceMotion ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)" },
            visible: {
              clipPath: "inset(0 0 0 0%)",
              transition: { duration: 1, ease: EASE_OUT, delay: 0.1 },
            },
          }}
        >
          <motion.div
            className="flex flex-col gap-4"
            variants={{ visible: { transition: { staggerChildren: STAGGER * 2, delayChildren: 0.7 } } }}
          >
            <motion.p variants={revealItem} className="font-label text-foreground">
              {c.panelLabel}
            </motion.p>
            <motion.p variants={revealItem} className="font-display text-white text-[clamp(2.75rem,12vw,3.5rem)] md:text-[clamp(2.25rem,4vw,4rem)]">
              {c.panelTitle}
            </motion.p>
            <motion.p variants={revealItem} className="text-base text-foreground font-medium">
              {c.panelNote}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

    </>
  );
};

export default HeroSection;
