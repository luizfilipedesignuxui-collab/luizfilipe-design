import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";
import { RevealTitle } from "@/components/motion/RevealTitle";

const PositioningSection = () => {
  const { t } = useLanguage();
  const pillars = t("positioning.pillars").split("|");

  return (
    <section id="posicionamento" className="section-paper scroll-mt-24 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 items-center">
          <Reveal>
            <p className="font-label text-foreground mb-4">{t("positioning.filled_label")}</p>
            <h2 className="font-display text-[2.75rem] leading-[0.9] md:text-6xl text-primary whitespace-pre-line">
              <RevealTitle text={t("positioning.headline")} />
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="border-l-2 border-primary pl-5 lg:pl-12">
            <p className="text-lg md:text-2xl font-extrabold leading-snug text-foreground max-w-2xl">
              {t("positioning.filled")}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 list-none p-0">
              {pillars.map((pillar) => (
                <li
                  key={pillar}
                  className="rounded-full border border-primary bg-white px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm font-extrabold text-foreground"
                >
                  {pillar}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default PositioningSection;
