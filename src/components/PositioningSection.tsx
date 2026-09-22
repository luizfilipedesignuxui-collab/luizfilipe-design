import { useEffect, useRef, useState } from "react";
import { UserRound, Target, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionBridge from "@/components/SectionBridge";

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

  const parts = [
    {
      icon: UserRound,
      label: t("positioning.client_label"),
      value: t("positioning.client"),
    },
    {
      icon: Target,
      label: t("positioning.result_label"),
      value: t("positioning.result"),
    },
    {
      icon: Sparkles,
      label: t("positioning.specialty_label"),
      value: t("positioning.specialty"),
    },
  ];

  return (
    <section
      id="posicionamento"
      className="scroll-mt-24 py-20 md:py-28 relative overflow-hidden"
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
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <SectionBridge bridgeKey="positioning.bridge" className="justify-center text-center" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            {t("positioning.title")}
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("positioning.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-[1.75rem] border-2 border-primary/25 bg-card/80 backdrop-blur-sm shadow-[0_20px_60px_-24px_rgba(15,42,74,0.35)] p-6 sm:p-10 md:p-12">
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-snug text-center">
            {t("positioning.formula_prefix")}{" "}
            <span className="text-primary underline decoration-accent decoration-4 underline-offset-4">
              [{t("positioning.client_short")}]
            </span>{" "}
            {t("positioning.formula_mid")}{" "}
            <span className="text-primary underline decoration-accent decoration-4 underline-offset-4">
              [{t("positioning.result_short")}]
            </span>{" "}
            {t("positioning.formula_through")}{" "}
            <span className="text-primary underline decoration-accent decoration-4 underline-offset-4">
              [{t("positioning.specialty_short")}]
            </span>
            .
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {parts.map((part) => (
              <div
                key={part.label}
                className="rounded-2xl border border-border bg-background/80 p-5 text-left hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <part.icon className="w-5 h-5 text-primary" aria-hidden />
                </div>
                <p className="font-display text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  {part.label}
                </p>
                <p className="text-sm text-foreground leading-relaxed font-medium">{part.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-accent/20 blur-2xl" aria-hidden />
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
              {t("positioning.filled_label")}
            </p>
            <p className="font-display text-lg sm:text-xl md:text-2xl font-bold leading-snug relative z-10">
              {t("positioning.filled")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PositioningSection;
