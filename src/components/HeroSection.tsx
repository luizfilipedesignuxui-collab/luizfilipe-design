import { ArrowDown, Mail, Sparkles, Smartphone, Monitor, Figma } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { number: "5+", label: "Projetos" },
  { number: "2", label: "Anos de experiência" },
  { number: "100%", label: "Dedicação" },
];

const services = [
  { icon: Sparkles, title: "User-Centered Design", desc: "Experiências focadas no usuário" },
  { icon: Figma, title: "Brand Identity", desc: "Identidade visual e de marca" },
  { icon: Monitor, title: "Responsive UI", desc: "Interfaces adaptáveis" },
  { icon: Smartphone, title: "Seamless Prototyping", desc: "Protótipos interativos" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-extrabold text-foreground leading-[0.95] tracking-tight">
                Luiz<br />
                <span className="text-primary">Filipe</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
                Criando experiências digitais intuitivas, estratégicas e centradas no usuário.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                <a href="#projetos">
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Ver Projetos
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary/30 hover:bg-primary/5">
                <a href="#contato">
                  <Mail className="mr-2 h-4 w-4" />
                  Contato
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-4xl md:text-5xl font-extrabold text-accent">{stat.number}</div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="flex justify-center lg:justify-end" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="w-72 h-72 md:w-[400px] md:h-[400px] rounded-3xl bg-primary/10 overflow-hidden border border-border/50 shadow-2xl">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center space-y-3">
                    <div className="w-28 h-28 rounded-full bg-primary/15 mx-auto flex items-center justify-center">
                      <span className="font-display text-4xl font-extrabold text-primary">LF</span>
                    </div>
                    <p className="text-sm text-muted-foreground/70">Sua foto aqui</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-accent/30 blur-xl" />
              <div className="absolute -top-3 -left-3 w-14 h-14 rounded-full bg-primary/10 blur-lg" />
            </div>
          </div>
        </div>

        {/* Mini services row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-border/50">
          {services.map((service) => (
            <div key={service.title} className="flex items-start gap-3 p-4 rounded-2xl hover:bg-primary/5 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors">
                <service.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground">{service.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
