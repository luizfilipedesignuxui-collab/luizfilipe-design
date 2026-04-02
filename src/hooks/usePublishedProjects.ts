import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { projects as staticProjects } from "@/data/projects";

export interface PublishedProject {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  imagem_capa: string;
  categoria: string;
  ferramentas: string[];
  galeria_de_imagens: string[];
  contexto: string;
  objetivo: string;
  processo: {
    research: string;
    wireframe: string;
    ui_design: string;
  };
  resultado: string;
  tags: string[];
  link_projeto: string;
  // English fields
  titulo_en?: string;
  descricao_en?: string;
  categoria_en?: string;
  contexto_en?: string;
  objetivo_en?: string;
  resultado_en?: string;
  processo_en?: {
    research: string;
    wireframe: string;
    ui_design: string;
  };
}

export function usePublishedProjects() {
  const [projects, setProjects] = useState<PublishedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setProjects(
            data.map((p: any) => ({
              id: p.id,
              slug: p.slug,
              titulo: p.titulo,
              descricao: p.descricao,
              imagem_capa: p.imagem_capa ?? "",
              categoria: p.categoria,
              ferramentas: p.ferramentas ?? [],
              galeria_de_imagens: p.galeria_de_imagens ?? [],
              contexto: p.contexto ?? "",
              objetivo: p.objetivo ?? "",
              processo: {
                research: p.processo_research ?? "",
                wireframe: p.processo_wireframe ?? "",
                ui_design: p.processo_ui_design ?? "",
              },
              resultado: p.resultado ?? "",
              tags: p.tags ?? [],
              link_projeto: p.link_projeto ?? "",
              titulo_en: p.titulo_en ?? "",
              descricao_en: p.descricao_en ?? "",
              categoria_en: p.categoria_en ?? "",
              contexto_en: p.contexto_en ?? "",
              objetivo_en: p.objetivo_en ?? "",
              resultado_en: p.resultado_en ?? "",
              processo_en: {
                research: p.processo_research_en ?? "",
                wireframe: p.processo_wireframe_en ?? "",
                ui_design: p.processo_ui_design_en ?? "",
              },
            }))
          );
        }
        setLoading(false);
      });
  }, []);

  return { projects, loading };
}
