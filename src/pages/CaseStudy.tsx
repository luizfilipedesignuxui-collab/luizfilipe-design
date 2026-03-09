import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { projects as staticProjects } from "@/data/projects";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CaseStudy = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-3xl font-bold text-foreground">Projeto não encontrado</h1>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/projetos"><ArrowLeft className="mr-2 w-4 h-4" /> Ver todos os projetos</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="container mx-auto px-6 py-12">
          <Button asChild variant="ghost" className="rounded-full mb-8">
            <Link to="/projetos"><ArrowLeft className="mr-2 w-4 h-4" /> Voltar aos projetos</Link>
          </Button>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-accent/15 text-accent font-semibold uppercase tracking-wider">
                {project.categoria}
              </span>
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mb-4">
              {project.titulo}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {project.descricao}
            </p>
          </div>
        </section>

        {/* Cover */}
        <section className="container mx-auto px-6 mb-16">
          <div className="w-full rounded-3xl bg-primary/5 border border-border overflow-hidden flex items-center justify-center">
            {project.imagem_capa ? (
              <img src={project.imagem_capa} alt={project.titulo} className="w-full h-auto object-contain" />
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
                <span className="font-display font-bold text-primary text-3xl">
                  {project.titulo.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-6 max-w-4xl space-y-16 pb-24">
          {/* Contexto */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Contexto do Problema</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.contexto}</p>
          </section>

          {/* Objetivo */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Objetivo do Projeto</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.objetivo}</p>
          </section>

          {/* Processo */}
          <section className="space-y-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Processo de Design</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "UX Research", content: project.processo.research },
                { label: "Wireframe", content: project.processo.wireframe },
                { label: "UI Design", content: project.processo.ui_design },
              ].map((step) => (
                <div key={step.label} className="p-6 rounded-2xl border border-border bg-card/30 space-y-3">
                  <h3 className="font-display font-bold text-foreground text-lg">{step.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ferramentas */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Ferramentas Utilizadas</h2>
            <div className="flex flex-wrap gap-3">
              {project.ferramentas.map((tool) => (
                <span key={tool} className="px-4 py-2 rounded-xl border border-border bg-card/40 font-display font-semibold text-sm text-foreground">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          {/* Galeria */}
          {project.galeria_de_imagens.length > 0 && (
            <section className="space-y-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Telas do Projeto</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.galeria_de_imagens.map((img, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-border bg-primary/5 p-4 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img src={img} alt={`${project.titulo} - Tela ${i + 1}`} className="w-full h-auto object-contain" />
                  </div>
                ))}
              </div>
            </section>
          )}

          <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 bg-background/95 backdrop-blur-sm border-border">
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              {lightboxIndex !== null && (
                <>
                  {lightboxIndex > 0 && (
                    <button
                      onClick={() => setLightboxIndex(lightboxIndex - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-foreground" />
                    </button>
                  )}
                  <img src={project.galeria_de_imagens[lightboxIndex]} alt="Visualização ampliada" className="w-full h-auto max-h-[85vh] object-contain rounded-xl" />
                  {lightboxIndex < project.galeria_de_imagens.length - 1 && (
                    <button
                      onClick={() => setLightboxIndex(lightboxIndex + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-foreground" />
                    </button>
                  )}
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Resultado */}
          <section className="space-y-4 p-8 rounded-3xl border border-accent/30 bg-accent/5">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Resultado Final</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.resultado}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
