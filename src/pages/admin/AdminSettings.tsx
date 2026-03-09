import { useAuth } from "@/contexts/AuthContext";
import { Shield, User, Mail, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdminSettings = () => {
  const { user } = useAuth();

  const links = [
    { label: "Ver Site Publicado", href: "/", icon: Globe, description: "Abrir o site como visitante" },
    { label: "Gerenciar Projetos", to: "/admin/projetos", icon: Shield, description: "Adicionar, editar ou remover projetos" },
    { label: "Editar Conteúdo", to: "/admin/conteudo", icon: Mail, description: "Alterar textos e informações do site" },
  ];

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">Informações da conta e atalhos</p>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card/30 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground">Administrador</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-3 h-3" />
              {user?.email}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 text-accent text-sm">
          <Shield className="w-4 h-4" />
          <span className="font-medium">Permissão: Admin</span>
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-foreground mb-3">Atalhos</h2>
        <div className="space-y-2">
          {links.map((link) => (
            <div key={link.label}>
              {link.href ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/30 hover:shadow-sm transition-all"
                >
                  <link.icon className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-sm text-foreground">{link.label}</h3>
                    <p className="text-xs text-muted-foreground">{link.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
              ) : (
                <Link
                  to={link.to!}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/30 hover:shadow-sm transition-all"
                >
                  <link.icon className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-sm text-foreground">{link.label}</h3>
                    <p className="text-xs text-muted-foreground">{link.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
