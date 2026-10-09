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
import { Reveal } from "@/components/motion/Reveal";
import { RevealTitle } from "@/components/motion/RevealTitle";
import CardRow from "@/components/CardRow";

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
    <section id="habilidades" className="section-paper scroll-mt-24 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <Reveal className="mb-8 md:mb-10 max-w-2xl">
          <SectionBridge bridgeKey="skills.bridge" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-3">
            <RevealTitle text={t("skills.title")} />
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t("skills.subtitle")}</p>
        </Reveal>

        <CardRow
          label={t("skills.title")}
          items={groups.flatMap((group) => group.skills.map((skill) => ({ ...skill, tag: group.label })))}
        />
      </div>
    </section>
  );
};

export default SkillsSection;
