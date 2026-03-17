import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const colors = [
  { name: "Sand", hex: "#D6CFC6", variable: "--sand" },
  { name: "Sea", hex: "#63B7C6", variable: "--sea" },
  { name: "Tropical Teal", hex: "#2E7C83", variable: "--teal" },
  { name: "Sea Salt", hex: "#8FAFA4", variable: "--sea-salt" },
  { name: "Foreground", hex: "#1a2332", variable: "--foreground" },
];

const DesignSystemSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="design-system" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("ds.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("ds.subtitle")}
          </p>
        </div>

        <div className="grid gap-12">
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">{t("ds.colors")}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {colors.map((color) => (
                <div key={color.name} className="space-y-2">
                  <div className="w-full aspect-square rounded-2xl border border-border shadow-sm" style={{ backgroundColor: color.hex }} />
                  <p className="font-display font-semibold text-sm text-foreground">{color.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">{t("ds.typography")}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl border border-border bg-background">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{t("ds.titles")}</p>
                <p className="font-display text-3xl font-bold text-foreground">Space Grotesk</p>
                <p className="font-display text-lg text-muted-foreground mt-2">Aa Bb Cc Dd Ee Ff Gg</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-background">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{t("ds.body")}</p>
                <p className="text-3xl font-semibold text-foreground">Inter</p>
                <p className="text-lg text-muted-foreground mt-2">Aa Bb Cc Dd Ee Ff Gg</p>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">{t("ds.buttons")}</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button className="rounded-full">{t("ds.primary")}</Button>
              <Button variant="outline" className="rounded-full">{t("ds.outline")}</Button>
              <Button variant="secondary" className="rounded-full">{t("ds.secondary")}</Button>
              <Button variant="ghost" className="rounded-full">{t("ds.ghost")}</Button>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">{t("ds.components")}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[t("ds.project_card"), t("ds.tag_badge"), t("ds.skill_icon")].map((comp) => (
                <div key={comp} className="p-6 rounded-2xl border border-border bg-background hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 mb-3" />
                  <p className="font-display font-semibold text-foreground">{comp}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t("ds.component_desc")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignSystemSection;
