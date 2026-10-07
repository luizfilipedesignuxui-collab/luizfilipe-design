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
    <section id="habilidades" className="scroll-mt-24 py-16 md:py-20">
      <div ref={ref} className="container mx-auto px-6">
        <div
          className={`mb-8 md:mb-10 max-w-2xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionBridge bridgeKey="skills.bridge" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-3">
            {t("skills.title")}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t("skills.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-8">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">
                {group.label}
              </h3>

              <ul className="grid sm:grid-cols-2 gap-x-6 list-none m-0 p-0">
                {group.skills.map((skill) => {
                  const index = skillIndex++;
                  return (
                    <li
                      key={skill.title}
                      className={`border-t border-border/70 py-3.5 transition-all duration-500 ${
                        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <h4 className="flex items-center gap-2 font-display font-semibold text-foreground text-sm">
                        <skill.icon className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden />
                        {skill.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{skill.description}</p>
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
