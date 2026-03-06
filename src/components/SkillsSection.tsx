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

const skills = [
  { icon: Compass, title: "UX Design", description: "Experiências centradas no usuário com foco em usabilidade e acessibilidade." },
  { icon: Users, title: "User Research", description: "Pesquisas qualitativas e quantitativas para entender necessidades reais." },
  { icon: PenTool, title: "Wireframing", description: "Estruturação visual de fluxos e interfaces antes da prototipação." },
  { icon: Layers, title: "Prototipação", description: "Protótipos interativos de alta fidelidade para validação com usuários." },
  { icon: Palette, title: "UI Design", description: "Interfaces visuais modernas, consistentes e alinhadas à marca." },
  { icon: Component, title: "Design System", description: "Sistemas de design escaláveis com componentes reutilizáveis." },
  { icon: MousePointerClick, title: "Interaction Design", description: "Microinterações e animações que enriquecem a experiência." },
  { icon: Lightbulb, title: "Product Thinking", description: "Pensamento estratégico de produto aliado ao design." },
];

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
            Habilidades
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Competências que utilizo para transformar ideias em produtos digitais excepcionais.
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
