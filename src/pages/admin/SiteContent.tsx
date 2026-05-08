import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { invalidateSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Eye, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentField {
  key: string;
  label: string;
  type: "text" | "textarea";
  category: string;
  hint?: string;
}

const fields: ContentField[] = [
  { key: "hero_title", label: "Título do Hero", type: "text", category: "Página Inicial", hint: "Seu nome ou título principal" },
  { key: "hero_subtitle", label: "Subtítulo do Hero", type: "textarea", category: "Página Inicial", hint: "Frase de apresentação" },
  { key: "hero_cta_primary", label: "Botão Principal", type: "text", category: "Página Inicial" },
  { key: "hero_cta_secondary", label: "Botão Secundário", type: "text", category: "Página Inicial" },
  { key: "about_title", label: "Título", type: "text", category: "Sobre Mim" },
  { key: "about_text_1", label: "Parágrafo 1", type: "textarea", category: "Sobre Mim" },
  { key: "about_text_2", label: "Parágrafo 2", type: "textarea", category: "Sobre Mim" },
  { key: "about_text_3", label: "Parágrafo 3", type: "textarea", category: "Sobre Mim" },
  { key: "about_text_4", label: "Parágrafo 4", type: "textarea", category: "Sobre Mim" },
  { key: "contact_title", label: "Título", type: "text", category: "Contato" },
  { key: "contact_subtitle", label: "Subtítulo", type: "textarea", category: "Contato" },
  { key: "contact_email", label: "Email", type: "text", category: "Contato", hint: "Seu email de contato profissional" },
  { key: "contact_linkedin", label: "URL do LinkedIn", type: "text", category: "Links Sociais", hint: "https://linkedin.com/in/..." },
  { key: "footer_tagline", label: "Tagline do Rodapé", type: "text", category: "Links Sociais" },
];

const SiteContent = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);
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
    // Expand all categories by default
    const cats = [...new Set(fields.map((f) => f.category))];
    const expanded: Record<string, boolean> = {};
    cats.forEach((c) => (expanded[c] = true));
    setExpandedCats(expanded);
  }, []);

  const toggleCat = (cat: string) => {
    setExpandedCats((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const field of fields) {
      const val = values[field.key] ?? "";
      // Only save draft, don't touch value or is_published
      await supabase
        .from("site_content")
        .upsert({ key: field.key, draft_value: val }, { onConflict: "key" });
    }
    setSavedSuccess(true);
    toast({ title: "✅ Rascunho salvo com sucesso!" });
    setSaving(false);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePublish = async () => {
    setPublishing(true);
    for (const field of fields) {
      const val = values[field.key] ?? "";
      await supabase
        .from("site_content")
        .upsert({ key: field.key, value: val, draft_value: val, is_published: true }, { onConflict: "key" });
    }
    toast({ title: "🚀 Conteúdo publicado no site!" });
    invalidateSiteContent();
    setPublishing(false);
  };

  const categories = [...new Set(fields.map((f) => f.category))];

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-foreground">Conteúdo do Site</h1>
          <p className="text-muted-foreground mt-1">Edite textos, títulos e links, tudo em um só lugar</p>
        </div>
        {savedSuccess && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            Salvo!
          </div>
        )}
      </div>

      {categories.map((cat) => (
        <div key={cat} className="rounded-2xl border border-border bg-card/20 overflow-hidden">
          <button
            onClick={() => toggleCat(cat)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
          >
            <h2 className="font-display text-lg font-bold text-foreground">{cat}</h2>
            {expandedCats[cat] ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {expandedCats[cat] && (
            <div className="px-4 pb-4 space-y-4">
              {fields.filter((f) => f.category === cat).map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <Label className="text-sm">{field.label}</Label>
                  {field.hint && <p className="text-[11px] text-muted-foreground">{field.hint}</p>}
                  {field.type === "textarea" ? (
                    <Textarea
                      value={values[field.key] ?? ""}
                      onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      rows={3}
                      className="text-sm"
                    />
                  ) : (
                    <Input
                      value={values[field.key] ?? ""}
                      onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-wrap gap-3 pt-4 border-t border-border sticky bottom-0 bg-background py-4">
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
