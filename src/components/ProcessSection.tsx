import { Search, FileSearch, Lightbulb, PenTool, Layers, ClipboardCheck, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionBridge from "@/components/SectionBridge";
import { Reveal } from "@/components/motion/Reveal";
import { RevealTitle } from "@/components/motion/RevealTitle";
import CardRow from "@/components/CardRow";

const ProcessSection = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Search, title: t("process.discovery"), description: t("process.discovery_desc") },
    { icon: FileSearch, title: t("process.research"), description: t("process.research_desc") },
    { icon: Lightbulb, title: t("process.ideation"), description: t("process.ideation_desc") },
    { icon: PenTool, title: t("process.wireframing"), description: t("process.wireframing_desc") },
    { icon: Layers, title: t("process.prototyping"), description: t("process.prototyping_desc") },
    { icon: ClipboardCheck, title: t("process.testing"), description: t("process.testing_desc") },
    { icon: Rocket, title: t("process.delivery"), description: t("process.delivery_desc") },
  ];

  return (
    <section id="processo" className="section-brand scroll-mt-24 py-16 md:py-20" aria-labelledby="process-heading">
      <div className="container mx-auto px-6">
        <Reveal as="header" className="mb-8 md:mb-10 max-w-2xl">
          <SectionBridge bridgeKey="process.bridge" />
          <h2 id="process-heading" className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">
            <RevealTitle text={t("process.title")} />
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t("process.subtitle")}</p>
        </Reveal>

        <CardRow label={t("process.title")} items={steps} ordered />
      </div>
    </section>
  );
};

export default ProcessSection;
