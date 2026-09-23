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
    <section id="processo" className="scroll-mt-24 py-24 md:py-32" aria-labelledby="process-heading">
      <div ref={ref} className="container mx-auto px-6">
        <header
          className={`mb-12 md:mb-16 max-w-2xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionBridge bridgeKey="process.bridge" />
          <h2 id="process-heading" className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-4">
            {t("process.title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {t("process.subtitle")}
          </p>
        </header>

        <ol className="relative max-w-3xl mx-auto list-none p-0 m-0">
          <div
            className="absolute left-5 top-3 bottom-3 w-px bg-border md:left-6"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <li
              key={step.title}
              className={`relative flex gap-5 md:gap-6 pb-10 last:pb-0 transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="relative z-10 flex-shrink-0">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary/25 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="flex-1 min-w-0 pt-1.5 md:pt-2.5">
                <h3 className="font-display font-bold text-foreground text-lg md:text-xl leading-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
