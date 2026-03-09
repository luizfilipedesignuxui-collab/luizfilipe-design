import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => { loadProjects(); }, []);

  const togglePublish = async (project: Project) => {
    const { error } = await supabase
      .from("projects")
      .update({ is_published: !project.is_published })
      .eq("id", project.id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: project.is_published ? "Projeto despublicado" : "Projeto publicado!" });
      loadProjects();
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Projeto excluído" });
      loadProjects();
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-foreground">Projetos</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus projetos do portfólio</p>
        </div>
        <Button asChild className="rounded-full">
          <Link to="/admin/projetos/novo">
            <Plus className="mr-2 w-4 h-4" /> Adicionar Projeto
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground">Nenhum projeto ainda. Clique em "Adicionar Projeto" para começar.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/30 hover:shadow-sm transition-all"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/5 border border-border overflow-hidden flex-shrink-0">
                {project.imagem_capa ? (
                  <img src={project.imagem_capa} alt={project.titulo} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display font-bold text-primary text-lg">{project.titulo.charAt(0)}</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-foreground truncate">{project.titulo}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent font-semibold">{project.categoria}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${project.is_published ? "bg-green-500/15 text-green-600" : "bg-muted text-muted-foreground"}`}>
                    {project.is_published ? "Publicado" : "Rascunho"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => togglePublish(project)} title={project.is_published ? "Despublicar" : "Publicar"}>
                  {project.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/admin/projetos/${project.id}`}>
                    <Pencil className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => deleteProject(project.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
