import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PositioningSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="posicionamento"
      className="scroll-mt-24 py-16 md:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-accent/[0.08] to-transparent" />
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/5 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div
        ref={ref}
        className={`container mx-auto px-6 relative z-10 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-4xl mx-auto rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 md:p-10 text-center relative overflow-hidden shadow-[0_20px_60px_-24px_rgba(15,42,74,0.45)]">
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-accent/20 blur-2xl" aria-hidden="true" />
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
            {t("positioning.filled_label")}
          </p>
          <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold leading-snug relative z-10">
            {t("positioning.filled")}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default PositioningSection;
