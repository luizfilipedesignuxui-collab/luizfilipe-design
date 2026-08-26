import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjectLocale } from "@/hooks/useProjectLocale";
import SectionBridge from "@/components/SectionBridge";

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { projects } = usePublishedProjects();
  const { t } = useLanguage();
  const { loc } = useProjectLocale();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projetos" className="scroll-mt-24 py-24 md:py-32 bg-card/40">
      <div ref={ref} className="container mx-auto px-6">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionBridge bridgeKey="projects.bridge" />
          <h2 className="font-display text-5xl md:text-6xl font-extrabold text-foreground mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t("projects.subtitle")}
          </p>
        </div>

        {projects.length === 0 ? (
          <div className={`text-center py-20 rounded-3xl border border-dashed border-border transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-16 h-16 rounded-2xl bg-primary/15 mx-auto flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">{t("projects.coming_soon")}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t("projects.coming_soon_desc")}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {projects.slice(0, 2).map((project, index) => {
              const isEven = index % 2 === 0;
              const l = loc(project);
              return (
                <Link
                  to={`/projetos/${project.slug}`}
                  key={project.id}
                  className={`group block rounded-3xl overflow-hidden border border-border bg-card/30 hover:shadow-2xl transition-all duration-500 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="grid md:grid-cols-2">
                    <div className={`aspect-[4/3] bg-primary/5 relative overflow-hidden ${!isEven ? "md:order-2" : ""}`}>
                      {project.imagem_capa ? (
                        <img src={project.imagem_capa} alt={`Case study de ${l.categoria}: ${l.titulo}`} loading="lazy" decoding="async" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <span className="font-display font-extrabold text-primary text-3xl">
                              {l.titulo.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500 flex items-center justify-center">
                        <span className="text-background font-display font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                          {t("projects.view_case")} <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>

                    <div className={`p-8 md:p-12 flex flex-col justify-center space-y-4 ${!isEven ? "md:order-1" : ""}`}>
                      <span className="font-display text-sm text-primary font-semibold uppercase tracking-widest">
                        {l.categoria}
                      </span>
                      <h3 className="font-display font-extrabold text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                        {l.titulo}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {l.descricao}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
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
        )}

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary/30 hover:bg-primary/5">
            <Link to="/projetos">
              {t("projects.view_all")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
