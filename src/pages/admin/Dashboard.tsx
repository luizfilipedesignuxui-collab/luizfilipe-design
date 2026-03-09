import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FolderOpen, FileText, Image, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, published: 0, content: 0, media: 0 });

  useEffect(() => {
    const load = async () => {
      const [proj, pub, content, media] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("site_content").select("id", { count: "exact", head: true }),
        supabase.storage.from("media").list(),
      ]);
      setStats({
        projects: proj.count ?? 0,
        published: pub.count ?? 0,
        content: content.count ?? 0,
        media: media.data?.length ?? 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Total de Projetos", value: stats.projects, icon: FolderOpen, color: "text-primary", link: "/admin/projetos" },
    { label: "Projetos Publicados", value: stats.published, icon: Eye, color: "text-accent", link: "/admin/projetos" },
    { label: "Conteúdos Editáveis", value: stats.content, icon: FileText, color: "text-secondary", link: "/admin/conteudo" },
    { label: "Arquivos de Mídia", value: stats.media, icon: Image, color: "text-muted-foreground", link: "/admin/midia" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral do seu portfólio</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="p-6 rounded-2xl border border-border bg-card/30 hover:shadow-md transition-all space-y-3"
          >
            <card.icon className={`w-6 h-6 ${card.color}`} />
            <div>
              <div className="font-display text-3xl font-extrabold text-foreground">{card.value}</div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
