import { useEffect, useRef, useState } from "react";

const highlights = [
  { number: "28", label: "Anos" },
  { number: "UX/UI", label: "Especialidade" },
  { number: "∞", label: "Curiosidade" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre" className="py-24 md:py-32">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Left — Numbers highlight */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-display text-5xl md:text-6xl font-extrabold text-foreground leading-tight">
              Sobre<br />mim
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="text-center p-4 rounded-2xl border border-border bg-card/30">
                  <div className="font-display text-3xl md:text-4xl font-extrabold text-accent">{h.number}</div>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{h.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Text */}
          <div className="lg:col-span-3 space-y-6 pt-2">
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Meu nome é <strong className="text-foreground font-semibold">Luiz Filipe</strong>.
                Sou UX/UI Designer apaixonado por criar experiências digitais que conectam pessoas e tecnologia.
              </p>
              <p>
                Tenho 28 anos e sou formado em <strong className="text-foreground font-semibold">Design Digital e User Experience</strong> pela Universidade Uniasselvi.
              </p>
              <p>
                Meu trabalho envolve pesquisa de usuários, criação de wireframes, prototipação e desenvolvimento de interfaces modernas que resolvem problemas reais.
              </p>
              <p>
                Neste portfólio você encontrará meus projetos, meu processo de design e minha abordagem para criar experiências digitais relevantes.
              </p>
            </div>
            <div className="h-px bg-border" />
            <div className="flex flex-wrap gap-3">
              {["Figma", "Sketch", "Adobe XD", "Framer", "Miro", "Notion"].map((tool) => (
                <span key={tool} className="text-xs px-4 py-2 rounded-full border border-border text-muted-foreground font-medium hover:border-accent/40 hover:text-accent transition-colors">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
