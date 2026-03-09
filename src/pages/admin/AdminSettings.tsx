import { useAuth } from "@/contexts/AuthContext";
import { Shield, User, Mail } from "lucide-react";

const AdminSettings = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">Informações da conta administrador</p>
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
    </div>
  );
};

export default AdminSettings;
