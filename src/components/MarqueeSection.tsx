import { useLanguage } from "@/contexts/LanguageContext";

const MarqueeSection = () => {
  const { t } = useLanguage();

  const items = [
    "UX DESIGN",
    "UI DESIGN",
    "PRODUCT THINKING",
    "DESIGN SYSTEM",
    "USER RESEARCH",
    t("marquee.prototyping"),
    "WIREFRAMING",
    "INTERACTION DESIGN",
  ];

  const content = items.map((item) => `${item} •`).join("  ");

  return (
    <div className="section-brand py-5 overflow-hidden border-y border-white" aria-hidden="true">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="font-display text-white text-2xl md:text-3xl font-extrabold px-4">
          {content}&nbsp;&nbsp;{content}
        </span>
        <span className="font-display text-white text-2xl md:text-3xl font-extrabold px-4">
          {content}&nbsp;&nbsp;{content}
        </span>
      </div>
    </div>
  );
};

export default MarqueeSection;
