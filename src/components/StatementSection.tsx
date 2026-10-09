import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";
import { RevealTitle } from "@/components/motion/RevealTitle";

const StatementSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-brand py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 items-center">
          <Reveal>
            <p className="font-label text-foreground mb-2">{t("statement.bridge")}</p>
            <span
              className="block font-serif-display text-[5rem] md:text-[11rem] leading-[0.8] text-white h-[2.5rem] md:h-[7rem] mt-4 md:mt-0"
              aria-hidden="true"
            >
              “
            </span>
          </Reveal>

          <Reveal as="blockquote" delay={0.1} className="border-l-2 border-white pl-5 lg:pl-12">
            <p className="font-serif-display text-[2rem] md:text-5xl lg:text-6xl leading-tight text-white">
              <RevealTitle text={`${t("statement.quote")} ${t("statement.quote_highlight")}`} />
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <span className="h-0.5 w-10 bg-white" aria-hidden="true" />
              <cite className="font-label text-foreground not-italic">Steve Jobs</cite>
            </footer>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default StatementSection;
