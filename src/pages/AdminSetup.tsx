import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AdminSetup = () => {
  const [email, setEmail] = useState("luizfilipe.designuxui@gmail.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("");

    try {
      // Try to sign up first
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        // If user already exists, try to sign in
        if (signUpError.message.includes("already registered")) {
          setResult("Usuário já existe. Use 'Esqueci minha senha' na página de login para redefinir.");
        } else {
          setResult(`Erro no cadastro: ${signUpError.message}`);
        }
        setIsLoading(false);
        return;
      }

      if (signUpData.user) {
        // Insert admin role
        const { error: roleError } = await supabase
          .from("user_roles")
          .upsert({ user_id: signUpData.user.id, role: "admin" as const }, { onConflict: "user_id,role" });

        if (roleError) {
          setResult(`Usuário criado mas erro ao definir role: ${roleError.message}. O user_id é: ${signUpData.user.id}`);
        } else {
          setResult("✅ Conta admin criada com sucesso! Vá para /admin/login para entrar.");
          toast({ title: "Sucesso!", description: "Conta admin criada." });
        }
      }
    } catch (err: any) {
      setResult(`Erro: ${err.message}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-display text-2xl font-bold text-foreground">Setup Admin</h1>
          <p className="text-muted-foreground text-sm">Crie ou recrie sua conta admin</p>
        </div>

        <form onSubmit={handleSetup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Nova Senha</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required minLength={6} />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar Conta Admin"}
          </Button>
        </form>

        {result && (
          <div className="p-3 rounded-lg bg-muted text-sm text-foreground whitespace-pre-wrap">{result}</div>
        )}
      </div>
    </div>
  );
};

export default AdminSetup;
