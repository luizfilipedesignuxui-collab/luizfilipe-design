import { useEffect, useRef, useState } from "react";
import { Search, FileSearch, Lightbulb, PenTool, Layers, TestTube, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionBridge from "@/components/SectionBridge";

const ProcessSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  const steps = [
    { icon: Search, title: t("process.discovery"), description: t("process.discovery_desc") },
    { icon: FileSearch, title: t("process.research"), description: t("process.research_desc") },
    { icon: Lightbulb, title: t("process.ideation"), description: t("process.ideation_desc") },
    { icon: PenTool, title: t("process.wireframing"), description: t("process.wireframing_desc") },
    { icon: Layers, title: t("process.prototyping"), description: t("process.prototyping_desc") },
    { icon: TestTube, title: t("process.testing"), description: t("process.testing_desc") },
    { icon: Rocket, title: t("process.delivery"), description: t("process.delivery_desc") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="processo" className="scroll-mt-24 py-16 md:py-20" aria-labelledby="process-heading">
      <div ref={ref} className="container mx-auto px-6">
        <header
          className={`mb-8 md:mb-10 max-w-2xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionBridge bridgeKey="process.bridge" />
          <h2 id="process-heading" className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-3">
            {t("process.title")}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t("process.subtitle")}</p>
        </header>

        <ol className="relative grid sm:grid-cols-2 lg:grid-cols-7 sm:gap-x-8 sm:gap-y-7 lg:gap-x-5 list-none p-0 m-0">
          <div className="sm:hidden absolute left-4 top-4 bottom-4 w-px bg-border" aria-hidden="true" />
          <div className="hidden lg:block absolute left-4 right-4 top-4 h-px bg-border" aria-hidden="true" />

          {steps.map((step, index) => (
            <li
              key={step.title}
              className={`relative flex gap-4 pb-5 last:pb-0 sm:block sm:pb-0 transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div
                className="relative z-10 w-8 h-8 shrink-0 rounded-full bg-background ring-1 ring-border flex items-center justify-center sm:mb-3"
                aria-hidden="true"
              >
                <step.icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="min-w-0 pt-1 sm:pt-0">
                <h3 className="font-display font-semibold text-foreground text-sm leading-tight">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
