import { ArrowDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <p className="text-primary font-display font-semibold tracking-wide uppercase text-sm">
                UX/UI Designer
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight">
                Luiz<br />Filipe
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Criando experiências digitais intuitivas, estratégicas e centradas no usuário.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="#projetos">
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Ver Projetos
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <a href="#contato">
                  <Mail className="mr-2 h-4 w-4" />
                  Entrar em Contato
                </a>
              </Button>
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="flex justify-center lg:justify-end" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-accent/30 overflow-hidden border-2 border-border shadow-2xl">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center space-y-2">
                    <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
                      <span className="font-display text-2xl font-bold text-primary">LF</span>
                    </div>
                    <p className="text-sm">Sua foto aqui</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/20 blur-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-secondary/30 blur-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
