import { useEffect, useRef, useState } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

const highlights = [
  { number: "28", label: "Anos" },
  { number: "UX/UI", label: "Especialidade" },
  { number: "∞", label: "Curiosidade" },
];

const tools = [
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Figma Make", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Miro", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/miro.svg" },
  { name: "Trello", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg" },
  { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" },
  { name: "Lovable", logo: "https://lovable.dev/favicon.ico" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { content } = useSiteContent();

  const title = content.about_title || "Sobre\nmim";
  const paragraphs = [
    content.about_text_1 || 'Meu nome é Luiz Filipe. Sou UX/UI Designer apaixonado por criar experiências digitais que conectam pessoas e tecnologia.',
    content.about_text_2 || 'Tenho 28 anos e sou formado em Design Digital e User Experience pela Universidade Uniasselvi.',
    content.about_text_3 || 'Meu trabalho envolve pesquisa de usuários, criação de wireframes, prototipação e desenvolvimento de interfaces modernas que resolvem problemas reais.',
    content.about_text_4 || 'Neste portfólio você encontrará meus projetos, meu processo de design e minha abordagem para criar experiências digitais relevantes.',
  ].filter(Boolean);

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
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-display text-5xl md:text-6xl font-extrabold text-foreground leading-tight whitespace-pre-line">
              {title}
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="text-center p-3 sm:p-4 rounded-2xl border border-border bg-card/30">
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent">{h.number}</div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider">{h.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6 pt-2">
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>') }} />
              ))}
            </div>

            <div className="pt-4">
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-widest mb-4">
                Ferramentas que utilizo
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <img src={tool.logo} alt={tool.name} className="w-6 h-6 sm:w-7 sm:h-7" />
                    <span className="font-display font-semibold text-sm text-foreground">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
