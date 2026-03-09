import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  name: string;
  url: string;
  created_at: string;
}

const MediaManager = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadFiles = async () => {
    const folders = ["covers", "gallery", "site"];
    const allFiles: MediaFile[] = [];

    for (const folder of folders) {
      const { data } = await supabase.storage.from("media").list(folder);
      if (data) {
        data.forEach((file) => {
          const { data: urlData } = supabase.storage.from("media").getPublicUrl(`${folder}/${file.name}`);
          allFiles.push({
            name: `${folder}/${file.name}`,
            url: urlData.publicUrl,
            created_at: file.created_at ?? "",
          });
        });
      }
    }
    setFiles(allFiles);
    setLoading(false);
  };

  useEffect(() => { loadFiles(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setUploading(true);

    for (const file of Array.from(fileList)) {
      const ext = file.name.split(".").pop();
      const path = `site/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) {
        toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
      }
    }

    toast({ title: "Upload concluído!" });
    await loadFiles();
    setUploading(false);
  };

  const deleteFile = async (name: string) => {
    if (!confirm("Excluir este arquivo?")) return;
    const { error } = await supabase.storage.from("media").remove([name]);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Arquivo excluído" });
      loadFiles();
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "URL copiada!" });
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-foreground">Mídia</h1>
          <p className="text-muted-foreground mt-1">Gerencie imagens e arquivos</p>
        </div>
        <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors text-sm font-medium">
          <Upload className="w-4 h-4" />
          {uploading ? "Enviando..." : "Upload"}
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground">Nenhum arquivo. Faça upload para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.name} className="rounded-xl border border-border overflow-hidden bg-card/30 group">
              <div className="aspect-square bg-primary/5 flex items-center justify-center overflow-hidden">
                <img src={file.url} alt={file.name} className="w-full h-full object-contain p-2" />
              </div>
              <div className="p-3 space-y-2">
                <p className="text-xs text-muted-foreground truncate">{file.name}</p>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => copyUrl(file.url)}>
                    <Copy className="w-3 h-3 mr-1" /> URL
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive" onClick={() => deleteFile(file.name)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaManager;
