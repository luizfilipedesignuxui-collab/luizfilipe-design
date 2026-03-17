import { useEffect, useRef, useState } from "react";
import {
  Compass, Users, PenTool, Layers, Palette, Component, MousePointerClick, Lightbulb,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  const skills = [
    { icon: Compass, title: "UX Design", description: t("skills.ux_desc") },
    { icon: Users, title: "User Research", description: t("skills.research_desc") },
    { icon: PenTool, title: "Wireframing", description: t("skills.wireframe_desc") },
    { icon: Layers, title: t("skills.prototype_title"), description: t("skills.prototype_desc") },
    { icon: Palette, title: "UI Design", description: t("skills.ui_desc") },
    { icon: Component, title: "Design System", description: t("skills.design_system_desc") },
    { icon: MousePointerClick, title: "Interaction Design", description: t("skills.interaction_desc") },
    { icon: Lightbulb, title: "Product Thinking", description: t("skills.product_desc") },
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
    <section id="habilidades" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold text-foreground mb-4">
            {t("skills.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className={`group flex gap-6 p-6 rounded-2xl bg-card/30 border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex-shrink-0">
                <span className="font-display text-4xl font-extrabold text-accent/30 group-hover:text-accent/60 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg">{skill.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
