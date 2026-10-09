import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjectLocale } from "@/hooks/useProjectLocale";
import SectionBridge from "@/components/SectionBridge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { RevealTitle } from "@/components/motion/RevealTitle";

const ProjectsSection = () => {
  const { projects } = usePublishedProjects();
  const { t } = useLanguage();
  const { loc } = useProjectLocale();

  return (
    <section id="projetos" className="section-paper scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <Reveal className="mb-8 md:mb-12">
          <SectionBridge bridgeKey="projects.bridge" />
          <h2 className="font-display text-[2.75rem] leading-[0.9] md:text-6xl font-extrabold text-primary mb-4">
            <RevealTitle text={t("projects.title")} />
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            {t("projects.subtitle")}
          </p>
        </Reveal>

        {projects.length === 0 ? (
          <Reveal className="text-center py-20 rounded-3xl border border-dashed border-border">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 mx-auto flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("projects.coming_soon")}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t("projects.coming_soon_desc")}
            </p>
          </Reveal>
        ) : (
          <RevealGroup as="ul" className="flex flex-wrap justify-center gap-4 md:gap-6 list-none m-0 p-0">
            {projects.map((project) => {
              const l = loc(project);
              return (
                <RevealItem
                  key={project.id}
                  className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                >
                  <Link
                    to={`/projetos/${project.slug}`}
                    className="lift-card group relative block aspect-[16/11] overflow-hidden rounded-[8px] border border-primary bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {project.imagem_capa ? (
                      <>
                        <img
                          src={project.imagem_capa}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-xl"
                        />
                        <img
                          src={project.imagem_capa}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-x-0 top-0 bottom-[2.125rem] h-[calc(100%-2.125rem)] w-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </>
                    ) : (
                      <span
                        className="absolute inset-0 flex items-center justify-center font-display text-6xl text-primary/40"
                        aria-hidden="true"
                      >
                        {l.titulo.charAt(0)}
                      </span>
                    )}

                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-foreground shadow-sm">
                      {l.categoria}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-primary px-4 py-2">
                      <h3 className="min-w-0 truncate font-display text-[1.2rem] text-white leading-tight pt-0.5">
                        {l.titulo}
                      </h3>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
