import { useLanguage } from "@/contexts/LanguageContext";
import { PublishedProject } from "@/hooks/usePublishedProjects";
import { Project } from "@/data/projects";

type AnyProject = PublishedProject | Project;

export function useProjectLocale() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const loc = (project: AnyProject) => ({
    titulo: (isEn && project.titulo_en) || project.titulo,
    descricao: (isEn && project.descricao_en) || project.descricao,
    categoria: (isEn && project.categoria_en) || project.categoria,
    contexto: (isEn && project.contexto_en) || project.contexto,
    objetivo: (isEn && project.objetivo_en) || project.objetivo,
    resultado: (isEn && project.resultado_en) || project.resultado,
    processo: {
      research: (isEn && project.processo_en?.research) || project.processo.research,
      wireframe: (isEn && project.processo_en?.wireframe) || project.processo.wireframe,
      ui_design: (isEn && project.processo_en?.ui_design) || project.processo.ui_design,
    },
  });

  return { loc };
}
