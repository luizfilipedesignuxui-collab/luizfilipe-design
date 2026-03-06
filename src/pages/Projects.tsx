import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <Button asChild variant="ghost" className="rounded-full mb-8">
            <Link to="/">
              <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
            </Link>
          </Button>

          <div className="mb-16">
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-foreground mb-4">
              Todos os <span className="text-primary">Projetos</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Explore todos os meus trabalhos em UX/UI Design.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-32 rounded-3xl border border-dashed border-border">
              <div className="w-20 h-20 rounded-2xl bg-accent/15 mx-auto flex items-center justify-center mb-6">
                <ArrowRight className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                Em breve
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto text-lg">
                Estou preparando meus projetos para compartilhar aqui. Fique atento!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Link
                  to={`/projetos/${project.slug}`}
                  key={project.id}
                  className="group block rounded-3xl overflow-hidden border border-border bg-card/30 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="aspect-[16/10] bg-primary/5 relative overflow-hidden">
                    {project.imagem_capa ? (
                      <img src={project.imagem_capa} alt={project.titulo} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <span className="font-display font-extrabold text-primary text-2xl">
                            {project.titulo.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500 flex items-center justify-center">
                      <span className="text-background font-display font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                        Ver Case Completo <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="font-display text-xs text-accent font-semibold uppercase tracking-widest">
                      {project.categoria}
                    </span>
                    <h3 className="font-display font-extrabold text-xl text-foreground group-hover:text-primary transition-colors">
                      {project.titulo}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.descricao}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.ferramentas.map((tool) => (
                        <span key={tool} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
