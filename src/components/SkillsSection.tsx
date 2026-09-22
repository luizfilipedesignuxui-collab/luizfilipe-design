import { useEffect, useRef, useState } from "react";
import {
  Compass,
  Users,
  PenTool,
  Layers,
  Palette,
  Component,
  MousePointerClick,
  Lightbulb,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionBridge from "@/components/SectionBridge";

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  const groups = [
    {
      label: t("skills.group_discovery"),
      skills: [
        { icon: Compass, title: "UX Design", description: t("skills.ux_desc") },
        { icon: Users, title: "User Research", description: t("skills.research_desc") },
        { icon: PenTool, title: "Wireframing", description: t("skills.wireframe_desc") },
        { icon: Lightbulb, title: "Product Thinking", description: t("skills.product_desc") },
      ],
    },
    {
      label: t("skills.group_craft"),
      skills: [
        { icon: Layers, title: t("skills.prototype_title"), description: t("skills.prototype_desc") },
        { icon: Palette, title: "UI Design", description: t("skills.ui_desc") },
        { icon: Component, title: "Design System", description: t("skills.design_system_desc") },
        { icon: MousePointerClick, title: "Interaction Design", description: t("skills.interaction_desc") },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let skillIndex = 0;

  return (
    <section id="habilidades" className="scroll-mt-24 py-24 md:py-32 bg-card/40">
      <div ref={ref} className="container mx-auto px-6">
        <div
          className={`mb-12 md:mb-16 max-w-2xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionBridge bridgeKey="skills.bridge" />
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-4">
            {t("skills.title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-primary whitespace-nowrap">
                  {group.label}
                </h3>
                <div className="h-px flex-1 bg-border" aria-hidden />
              </div>

              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-0">
                {group.skills.map((skill) => {
                  const index = skillIndex++;
                  return (
                    <li
                      key={skill.title}
                      className={`flex gap-4 py-5 border-b border-border/70 transition-all duration-500 ${
                        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                      style={{ transitionDelay: `${index * 60}ms` }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <skill.icon className="w-5 h-5 text-primary" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display font-bold text-foreground text-base mb-1">
                          {skill.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {skill.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
