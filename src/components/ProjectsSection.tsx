import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projetos" className="scroll-mt-24 py-24 md:py-32 bg-card/40">
      <div ref={ref} className="container mx-auto px-6">
        <div
          className={`mb-12 md:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionBridge bridgeKey="projects.bridge" />
          <h2 className="font-display text-5xl md:text-6xl font-extrabold text-foreground mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t("projects.subtitle")}
          </p>
        </div>

        {projects.length === 0 ? (
          <div
            className={`text-center py-20 rounded-3xl border border-dashed border-border transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/15 mx-auto flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("projects.coming_soon")}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t("projects.coming_soon_desc")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => {
              const l = loc(project);
              return (
                <Link
                  to={`/projetos/${project.slug}`}
                  key={project.id}
                  className={`group flex flex-col rounded-3xl overflow-hidden border border-border bg-background hover:border-primary/30 hover:shadow-xl transition-all duration-500 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${Math.min(index, 8) * 60}ms` }}
                >
                  <div className="aspect-[16/10] bg-primary/5 relative overflow-hidden">
                    {project.imagem_capa ? (
                      <img
                        src={project.imagem_capa}
                        alt={`Prévia do case: ${l.titulo}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display font-extrabold text-primary/40 text-4xl">
                          {l.titulo.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/55 transition-all duration-500 hidden sm:flex items-center justify-center">
                      <span className="text-background font-display font-bold text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                        {t("projects.view_case")} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6 space-y-3">
                    <span className="font-display text-xs text-primary font-semibold uppercase tracking-widest">
                      {l.categoria}
                    </span>
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                      {l.titulo}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {l.descricao}
                    </p>
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1.5 pt-2 text-sm font-display font-semibold text-primary sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      {t("projects.view_case")}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
