import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FolderOpen, FileText, Image, Eye, Plus, Pencil, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, published: 0, content: 0, media: 0 });
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  useEffect(() => {
    const load = async () => {
      const [proj, pub, content, media, recent] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("site_content").select("id", { count: "exact", head: true }),
        supabase.storage.from("media").list(),
        supabase.from("projects").select("*").order("updated_at", { ascending: false }).limit(3),
      ]);
      setStats({
        projects: proj.count ?? 0,
        published: pub.count ?? 0,
        content: content.count ?? 0,
        media: media.data?.length ?? 0,
      });
      if (recent.data) setRecentProjects(recent.data);
    };
    load();
  }, []);

  const cards = [
    { label: "Total de Projetos", value: stats.projects, icon: FolderOpen, color: "text-primary", link: "/admin/projetos" },
    { label: "Publicados", value: stats.published, icon: Eye, color: "text-accent", link: "/admin/projetos" },
    { label: "Conteúdos", value: stats.content, icon: FileText, color: "text-secondary", link: "/admin/conteudo" },
    { label: "Arquivos", value: stats.media, icon: Image, color: "text-muted-foreground", link: "/admin/midia" },
  ];

  const quickActions = [
    { label: "Novo Projeto", icon: Plus, link: "/admin/projetos/novo", color: "bg-primary text-primary-foreground" },
    { label: "Editar Conteúdo", icon: Pencil, link: "/admin/conteudo", color: "bg-accent text-accent-foreground" },
    { label: "Upload de Mídia", icon: Image, link: "/admin/midia", color: "bg-secondary text-secondary-foreground" },
    { label: "Ver Site", icon: ExternalLink, link: "/", color: "bg-muted text-foreground", external: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral do seu portfólio</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="p-5 rounded-2xl border border-border bg-card/30 hover:shadow-md transition-all space-y-2"
          >
            <card.icon className={`w-5 h-5 ${card.color}`} />
            <div className="font-display text-3xl font-extrabold text-foreground">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-lg font-bold text-foreground mb-3">Ações Rápidas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              asChild
              variant="ghost"
              className={`h-auto flex-col gap-2 py-4 rounded-2xl border border-border ${action.color} hover:opacity-90`}
            >
              {action.external ? (
                <a href={action.link} target="_blank" rel="noopener noreferrer">
                  <action.icon className="w-5 h-5" />
                  <span className="text-xs font-semibold">{action.label}</span>
                </a>
              ) : (
                <Link to={action.link}>
                  <action.icon className="w-5 h-5" />
                  <span className="text-xs font-semibold">{action.label}</span>
                </Link>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      {recentProjects.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-bold text-foreground">Projetos Recentes</h2>
            <Button variant="ghost" size="sm" asChild className="text-xs">
              <Link to="/admin/projetos">
                Ver todos <ArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </Button>
          </div>
          <div className="space-y-2">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                to={`/admin/projetos/${project.id}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card/30 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/5 border border-border overflow-hidden flex-shrink-0">
                  {project.imagem_capa ? (
                    <img src={project.imagem_capa} alt={project.titulo} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display font-bold text-primary text-sm">{project.titulo.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-sm text-foreground truncate">{project.titulo}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/15 text-accent font-semibold">{project.categoria}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${project.is_published ? "bg-green-500/15 text-green-600" : "bg-muted text-muted-foreground"}`}>
                      {project.is_published ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                </div>
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
