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
    <div className="bg-primary py-4 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="font-display text-primary-foreground text-lg md:text-xl font-bold tracking-widest px-4">
          {content}&nbsp;&nbsp;{content}
        </span>
        <span className="font-display text-primary-foreground text-lg md:text-xl font-bold tracking-widest px-4">
          {content}&nbsp;&nbsp;{content}
        </span>
      </div>
    </div>
  );
};

export default MarqueeSection;
