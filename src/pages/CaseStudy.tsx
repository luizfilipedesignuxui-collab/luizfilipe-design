import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const caseStudySections = [
  { key: "overview", label: "Visão Geral" },
  { key: "problem", label: "Problema" },
  { key: "research", label: "Pesquisa" },
  { key: "process", label: "Processo de Design" },
  { key: "wireframes", label: "Wireframes" },
  { key: "finalDesign", label: "Interface Final" },
  { key: "prototype", label: "Protótipo" },
  { key: "results", label: "Resultados" },
] as const;

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-3xl font-bold text-foreground">Projeto não encontrado</h1>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/"><ArrowLeft className="mr-2 w-4 h-4" /> Voltar ao portfólio</Link>
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
            <Link to="/#projetos"><ArrowLeft className="mr-2 w-4 h-4" /> Voltar</Link>
          </Button>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {project.description}
            </p>
          </div>
        </section>

        {/* Cover */}
        <section className="container mx-auto px-6 mb-16">
          <div className="w-full aspect-video rounded-3xl bg-accent/20 border border-border flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
              <span className="font-display font-bold text-primary text-3xl">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>
        </section>

        {/* Sections */}
        <div className="container mx-auto px-6 max-w-4xl space-y-16 pb-24">
          {caseStudySections.map(({ key, label }) => {
            const content = project[key];
            if (!content) return null;
            return (
              <section key={key} className="space-y-4">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {label}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {content}
                </p>
                {/* Placeholder for images */}
                <div className="w-full h-48 rounded-2xl bg-accent/10 border border-border mt-6" />
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
