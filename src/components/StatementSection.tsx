import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";

const StatementSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 md:py-40 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-10">
          <p className="font-display text-sm font-semibold text-accent uppercase tracking-widest">
            {t("statement.bridge")}
          </p>
        </Reveal>
        <Reveal as="blockquote" className="max-w-4xl mx-auto text-center" delay={0.1}>
          <p className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
            "{t("statement.quote")}{" "}
            <span className="text-accent">{t("statement.quote_highlight")}</span>"
          </p>
          <cite className="block mt-8 text-lg text-background/90 not-italic font-display">
            Steve Jobs
          </cite>
        </Reveal>
      </div>
    </section>
  );
};

export default StatementSection;
