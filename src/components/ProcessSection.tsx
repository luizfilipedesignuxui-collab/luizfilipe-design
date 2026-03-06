import { useEffect, useRef, useState } from "react";
import {
  Search,
  FileSearch,
  Lightbulb,
  PenTool,
  Layers,
  TestTube,
  Rocket,
} from "lucide-react";

const steps = [
  { icon: Search, title: "Descoberta", description: "Entender o contexto do negócio, objetivos e restrições do projeto." },
  { icon: FileSearch, title: "Pesquisa", description: "Investigar necessidades dos usuários através de entrevistas e análises." },
  { icon: Lightbulb, title: "Ideação", description: "Gerar soluções criativas através de brainstorming e workshops." },
  { icon: PenTool, title: "Wireframing", description: "Estruturar a arquitetura de informação e fluxos de navegação." },
  { icon: Layers, title: "Prototipação", description: "Criar protótipos interativos de alta fidelidade para validação." },
  { icon: TestTube, title: "Testes", description: "Validar soluções com usuários reais e iterar com base em feedbacks." },
  { icon: Rocket, title: "Entrega", description: "Documentar e entregar assets para implementação do time de desenvolvimento." },
];

const ProcessSection = () => {
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
    <section id="processo" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Processo de Design
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Minha abordagem estruturada para criar produtos digitais que resolvem problemas reais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative group text-center p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-xs font-display font-bold text-primary mb-3">
                0{index + 1}
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
