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
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const SkillsSection = () => {
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

  return (
    <section id="habilidades" className="scroll-mt-24 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <Reveal className="mb-8 md:mb-10 max-w-2xl">
          <SectionBridge bridgeKey="skills.bridge" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-3">
            {t("skills.title")}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t("skills.subtitle")}</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-8">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">
                {group.label}
              </h3>

              <RevealGroup as="ul" className="grid sm:grid-cols-2 gap-x-6 list-none m-0 p-0">
                {group.skills.map((skill) => (
                  <RevealItem key={skill.title} className="border-t border-border/70 py-3.5">
                      <h4 className="flex items-center gap-2 font-display font-semibold text-foreground text-sm">
                        <skill.icon className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden />
                        {skill.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{skill.description}</p>
                    </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
