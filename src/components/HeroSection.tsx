import { ArrowDown, Mail, Sparkles, Smartphone, Monitor, Figma } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.png";

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
        {/* Mobile layout */}
        <div className="lg:hidden mb-8">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-primary/10 overflow-hidden border border-border/50 shadow-lg flex-shrink-0">
              <img src={profilePhoto} alt="Luiz Filipe" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground leading-[0.95] tracking-tight">
                Luiz <span className="text-primary">Filipe</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                Criando experiências digitais intuitivas e centradas no usuário.
              </p>
            </div>
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

          {/* Stats mobile */}
          <div className="flex gap-8 sm:gap-10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-accent">{stat.number}</div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Text left */}
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
            <div className="flex gap-8 sm:gap-10 pt-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-accent">{stat.number}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo right — larger */}
          <div className="flex justify-end" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="w-[420px] h-[520px] rounded-3xl bg-primary/10 overflow-hidden border border-border/50 shadow-2xl">
                <img src={profilePhoto} alt="Luiz Filipe" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-accent/30 blur-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-primary/10 blur-lg" />
            </div>
          </div>
        </div>

        {/* Mini services row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-border/50">
          {services.map((service) => (
            <div key={service.title} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl hover:bg-primary/5 transition-colors group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors">
                <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xs sm:text-sm text-foreground">{service.title}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
