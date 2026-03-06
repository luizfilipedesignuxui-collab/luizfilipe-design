import { useEffect, useRef, useState } from "react";

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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual element */}
          <div className="relative">
            <div className="w-full aspect-square max-w-md mx-auto rounded-3xl bg-accent/20 border border-border p-8 flex items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="text-6xl font-display font-bold text-primary">28</div>
                <p className="text-muted-foreground">anos criando<br />experiências digitais</p>
                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Sobre mim
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Meu nome é <strong className="text-foreground">Luiz Filipe</strong>.
                Sou UX/UI Designer apaixonado por criar experiências digitais que conectam pessoas e tecnologia.
              </p>
              <p>
                Tenho 28 anos e sou formado em <strong className="text-foreground">Design Digital e User Experience</strong> pela Universidade Uniasselvi.
              </p>
              <p>
                Meu trabalho envolve pesquisa de usuários, criação de wireframes, prototipação e desenvolvimento de interfaces modernas que resolvem problemas reais.
              </p>
              <p>
                Neste portfólio você encontrará meus projetos, meu processo de design e minha abordagem para criar experiências digitais relevantes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
