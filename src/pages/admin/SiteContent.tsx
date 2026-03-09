import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentField {
  key: string;
  label: string;
  type: "text" | "textarea";
  category: string;
}

const fields: ContentField[] = [
  { key: "hero_title", label: "Título do Hero", type: "text", category: "Página Inicial" },
  { key: "hero_subtitle", label: "Subtítulo do Hero", type: "textarea", category: "Página Inicial" },
  { key: "hero_cta_primary", label: "Texto do Botão Principal", type: "text", category: "Página Inicial" },
  { key: "hero_cta_secondary", label: "Texto do Botão Secundário", type: "text", category: "Página Inicial" },
  { key: "about_title", label: "Título Sobre Mim", type: "text", category: "Sobre Mim" },
  { key: "about_text_1", label: "Parágrafo 1", type: "textarea", category: "Sobre Mim" },
  { key: "about_text_2", label: "Parágrafo 2", type: "textarea", category: "Sobre Mim" },
  { key: "about_text_3", label: "Parágrafo 3", type: "textarea", category: "Sobre Mim" },
  { key: "about_text_4", label: "Parágrafo 4", type: "textarea", category: "Sobre Mim" },
  { key: "contact_title", label: "Título da Seção de Contato", type: "text", category: "Contato" },
  { key: "contact_subtitle", label: "Subtítulo do Contato", type: "textarea", category: "Contato" },
  { key: "contact_email", label: "Email de Contato", type: "text", category: "Contato" },
  { key: "contact_linkedin", label: "URL do LinkedIn", type: "text", category: "Links" },
  { key: "footer_tagline", label: "Tagline do Footer", type: "text", category: "Links" },
];

const SiteContent = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("site_content").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((item) => {
          map[item.key] = item.draft_value ?? item.value;
        });
        setValues(map);
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    for (const field of fields) {
      const val = values[field.key] ?? "";
      await supabase
        .from("site_content")
        .upsert({ key: field.key, draft_value: val, value: val, is_published: false }, { onConflict: "key" });
    }
    toast({ title: "Rascunho salvo!" });
    setSaving(false);
  };

  const handlePublish = async () => {
    setPublishing(true);
    for (const field of fields) {
      const val = values[field.key] ?? "";
      await supabase
        .from("site_content")
        .upsert({ key: field.key, value: val, draft_value: val, is_published: true }, { onConflict: "key" });
    }
    toast({ title: "Conteúdo publicado no site!" });
    setPublishing(false);
  };

  const categories = [...new Set(fields.map((f) => f.category))];

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-foreground">Conteúdo do Site</h1>
        <p className="text-muted-foreground mt-1">Edite textos, títulos e links do site</p>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground border-b border-border pb-2">{cat}</h2>
          {fields.filter((f) => f.category === cat).map((field) => (
            <div key={field.key} className="space-y-2">
              <Label>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  rows={3}
                />
              ) : (
                <Input
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
        <Button onClick={handleSave} disabled={saving} className="rounded-full">
          <Save className="mr-2 w-4 h-4" />
          {saving ? "Salvando..." : "Salvar Rascunho"}
        </Button>
        <Button onClick={handlePublish} disabled={publishing} variant="outline" className="rounded-full">
          <Eye className="mr-2 w-4 h-4" />
          {publishing ? "Publicando..." : "Publicar Atualizações"}
        </Button>
      </div>
    </div>
  );
};

export default SiteContent;
