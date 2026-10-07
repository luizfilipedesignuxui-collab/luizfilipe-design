import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";

const PositioningSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="posicionamento"
      className="scroll-mt-24 py-16 md:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.06] to-transparent" />
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/5 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Reveal className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 md:p-10 text-center relative overflow-hidden shadow-[0_20px_60px_-24px_rgba(15,42,74,0.45)]">
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-accent/20 blur-2xl" aria-hidden="true" />
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
            {t("positioning.filled_label")}
          </p>
          <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold leading-snug relative z-10">
            {t("positioning.filled")}
          </h2>
        </div>
      </Reveal>
    </section>
  );
};

export default PositioningSection;
