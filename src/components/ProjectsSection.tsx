import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
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
    <section id="projetos" className="py-24 md:py-32 bg-sand-light/50">
      <div ref={ref} className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Projetos Selecionados
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes em UX/UI Design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              to={`/projeto/${project.id}`}
              key={project.id}
              className={`group block rounded-2xl bg-background border border-border overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Cover */}
              <div className="aspect-video bg-accent/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="font-display font-bold text-primary text-xl">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Ver Projeto <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-full px-8">
            Ver todos os projetos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
