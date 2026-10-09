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

const HeroSection = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const anchor = (hash: string) => (pathname === "/" ? hash : `/${hash}`);
  const isMobile = useIsMobileNow();
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
        className={`hero-split relative ${cycle ? "hero-split--cycle" : ""}`}
        onFocus={() => setFocusInside(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocusInside(false)}
        onPointerDown={() => setTouching(true)}
        onPointerUp={() => setTouching(false)}
        onPointerCancel={() => setTouching(false)}
        onPointerLeave={() => setTouching(false)}
        aria-label={t("hero.role")}
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
            {t("hero.phrase")}
          </motion.p>
          <motion.p variants={revealItem} className="max-w-xl text-base sm:text-lg text-foreground leading-relaxed">
            {t("hero.lead")}
          </motion.p>
          <motion.div variants={revealItem} className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/5562992776534"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-on-paper"
              aria-label={`${t("hero.whatsapp")} (${t("a11y.opens_new_tab")})`}
            >
              {t("hero.whatsapp")}
            </a>
            <a href={anchor("#projetos")} className="btn-on-paper-outline">
              {t("hero.cta_primary")}
              <ArrowRight className="btn-arrow w-5 h-5" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          ref={panelRef}
          className="hero-panel section-brand"
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
              {t("hero.panel_label")}
            </motion.p>
            <motion.p variants={revealItem} className="font-display text-white text-[clamp(2.75rem,12vw,3.5rem)] md:text-[clamp(2.25rem,4vw,4rem)]">
              {t("hero.panel_title")}
            </motion.p>
            <motion.p variants={revealItem} className="text-base text-foreground font-medium">
              {t("hero.panel_note")}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

    </>
  );
};

export default HeroSection;
