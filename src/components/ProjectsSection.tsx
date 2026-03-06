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
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4">
            Projetos Selecionados
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Uma seleção dos meus trabalhos mais recentes em UX/UI Design.
          </p>
        </div>

        {/* Alternating grid: first row 1 large + 1 small, second row reversed */}
        <div className="space-y-8">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <Link
                to={`/projeto/${project.id}`}
                key={project.id}
                className={`group block rounded-3xl overflow-hidden border border-border bg-background hover:shadow-2xl transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`grid md:grid-cols-2 ${!isEven ? "md:direction-rtl" : ""}`}>
                  {/* Image */}
                  <div className={`aspect-[4/3] bg-accent/20 relative overflow-hidden ${!isEven ? "md:order-2" : ""}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <span className="font-display font-black text-primary text-3xl">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500 flex items-center justify-center">
                      <span className="text-background font-display font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                        Ver Projeto <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-8 md:p-12 flex flex-col justify-center space-y-4 ${!isEven ? "md:order-1" : ""}`}>
                    <span className="font-display text-sm text-primary font-semibold uppercase tracking-widest">
                      {project.tags[0]}
                    </span>
                    <h3 className="font-display font-black text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.slice(1).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
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
