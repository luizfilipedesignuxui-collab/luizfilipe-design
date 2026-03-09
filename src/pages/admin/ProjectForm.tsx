import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Upload, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];

const categorias = ["UX Design", "UI Design", "Product Design"];

const ProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = id && id !== "novo";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<ProjectInsert>({
    titulo: "",
    slug: "",
    descricao: "",
    categoria: "UX Design",
    imagem_capa: "",
    contexto: "",
    objetivo: "",
    processo_research: "",
    processo_wireframe: "",
    processo_ui_design: "",
    resultado: "",
    ferramentas: [],
    tags: [],
    galeria_de_imagens: [],
    link_projeto: "",
    is_published: false,
  });

  const [ferramentasStr, setFerramentasStr] = useState("");
  const [tagsStr, setTagsStr] = useState("");

  useEffect(() => {
    if (isEditing) {
      supabase.from("projects").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setForm(data);
          setFerramentasStr((data.ferramentas ?? []).join(", "));
          setTagsStr((data.tags ?? []).join(", "));
        }
      });
    }
  }, [id, isEditing]);

  const generateSlug = (title: string) =>
    title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleChange = (field: keyof ProjectInsert, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "titulo" && !isEditing) {
      setForm((prev) => ({ ...prev, slug: generateSlug(value as string) }));
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
      return null;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadFile(file, "covers");
    if (url) handleChange("imagem_capa", url);
    setUploading(false);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, "gallery");
      if (url) urls.push(url);
    }
    setForm((prev) => ({ ...prev, galeria_de_imagens: [...(prev.galeria_de_imagens ?? []), ...urls] }));
    setUploading(false);
  };

  const removeGalleryImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      galeria_de_imagens: (prev.galeria_de_imagens ?? []).filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!form.titulo || !form.slug) {
      toast({ title: "Preencha título e slug", variant: "destructive" });
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      ferramentas: ferramentasStr.split(",").map((s) => s.trim()).filter(Boolean),
      tags: tagsStr.split(",").map((s) => s.trim()).filter(Boolean),
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from("projects").update(payload).eq("id", id));
    } else {
      ({ error } = await supabase.from("projects").insert(payload));
    }

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isEditing ? "Projeto atualizado!" : "Projeto criado!" });
      navigate("/admin/projetos");
    }
    setSaving(false);
  };

  const handlePublish = async () => {
    handleChange("is_published", true);
    setTimeout(handleSave, 100);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="rounded-full" onClick={() => navigate("/admin/projetos")}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
        </Button>
        <h1 className="font-display text-2xl font-extrabold text-foreground">
          {isEditing ? "Editar Projeto" : "Novo Projeto"}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Title & Slug */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={form.titulo} onChange={(e) => handleChange("titulo", e.target.value)} placeholder="Nome do projeto" />
          </div>
          <div className="space-y-2">
            <Label>Slug (URL)</Label>
            <Input value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} placeholder="nome-do-projeto" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Descrição</Label>
          <Textarea value={form.descricao ?? ""} onChange={(e) => handleChange("descricao", e.target.value)} placeholder="Breve descrição do projeto" rows={3} />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Categoria</Label>
          <select
            value={form.categoria ?? "UX Design"}
            onChange={(e) => handleChange("categoria", e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <Label>Imagem de Capa</Label>
          {form.imagem_capa && (
            <div className="w-full max-w-xs rounded-xl overflow-hidden border border-border mb-2">
              <img src={form.imagem_capa} alt="Capa" className="w-full h-auto object-contain" />
            </div>
          )}
          <div>
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/30 cursor-pointer hover:bg-muted/50 transition-colors text-sm">
              <Upload className="w-4 h-4" />
              {uploading ? "Enviando..." : "Upload de Capa"}
              <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Context & Objective */}
        <div className="space-y-2">
          <Label>Contexto do Problema</Label>
          <Textarea value={form.contexto ?? ""} onChange={(e) => handleChange("contexto", e.target.value)} rows={3} />
        </div>
        <div className="space-y-2">
          <Label>Objetivo do Projeto</Label>
          <Textarea value={form.objetivo ?? ""} onChange={(e) => handleChange("objetivo", e.target.value)} rows={3} />
        </div>

        {/* Process */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-foreground">Processo de Design</h3>
          <div className="space-y-2">
            <Label>UX Research</Label>
            <Textarea value={form.processo_research ?? ""} onChange={(e) => handleChange("processo_research", e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Wireframe</Label>
            <Textarea value={form.processo_wireframe ?? ""} onChange={(e) => handleChange("processo_wireframe", e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>UI Design</Label>
            <Textarea value={form.processo_ui_design ?? ""} onChange={(e) => handleChange("processo_ui_design", e.target.value)} rows={3} />
          </div>
        </div>

        {/* Result */}
        <div className="space-y-2">
          <Label>Resultado Final</Label>
          <Textarea value={form.resultado ?? ""} onChange={(e) => handleChange("resultado", e.target.value)} rows={3} />
        </div>

        {/* Tools & Tags */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ferramentas (separadas por vírgula)</Label>
            <Input value={ferramentasStr} onChange={(e) => setFerramentasStr(e.target.value)} placeholder="Figma, Miro, Trello" />
          </div>
          <div className="space-y-2">
            <Label>Tags (separadas por vírgula)</Label>
            <Input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="Mobile, UX, Web" />
          </div>
        </div>

        {/* Link */}
        <div className="space-y-2">
          <Label>Link do Projeto (opcional)</Label>
          <Input value={form.link_projeto ?? ""} onChange={(e) => handleChange("link_projeto", e.target.value)} placeholder="https://..." />
        </div>

        {/* Gallery */}
        <div className="space-y-2">
          <Label>Galeria de Imagens</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(form.galeria_de_imagens ?? []).map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden border border-border">
                <img src={img} alt={`Galeria ${i + 1}`} className="w-full h-32 object-contain bg-primary/5" />
                <button
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-destructive/90 text-destructive-foreground hover:bg-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/30 cursor-pointer hover:bg-muted/50 transition-colors text-sm">
            <Upload className="w-4 h-4" />
            {uploading ? "Enviando..." : "Adicionar Imagens"}
            <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <Button onClick={handleSave} disabled={saving} className="rounded-full">
            <Save className="mr-2 w-4 h-4" />
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
          <Button onClick={handlePublish} disabled={saving} variant="outline" className="rounded-full">
            <Eye className="mr-2 w-4 h-4" />
            Publicar Projeto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
