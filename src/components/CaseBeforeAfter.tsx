import { useState } from "react";
import { X, Check, Accessibility } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CaseTela {
  imagem: string;
  alt: string;
  alt_en?: string;
  pontos: string[];
  pontos_en?: string[];
}

export interface CaseAntesDepois {
  antes: CaseTela;
  depois: CaseTela;
  /** WCAG success criteria applied to the new screen */
  wcag?: {
    resumo: string;
    resumo_en?: string;
    criterios: { codigo: string; nome: string; nome_en?: string; descricao: string; descricao_en?: string }[];
  };
}

type Props = {
  data: CaseAntesDepois;
  isEn: boolean;
};

const CaseBeforeAfter = ({ data, isEn }: Props) => {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  const telas = [
    {
      key: "antes",
      tela: data.antes,
      titulo: isEn ? "Old screen" : "Tela antiga",
      badge: "bg-red-600/10 text-red-700",
      Icon: X,
      iconClass: "bg-red-600/10 text-red-700",
    },
    {
      key: "depois",
      tela: data.depois,
      titulo: isEn ? "New screen" : "Tela nova",
      badge: "bg-green-600/15 text-green-800",
      Icon: Check,
      iconClass: "bg-green-600/15 text-green-800",
    },
  ];

  return (
    <section className="space-y-8" aria-labelledby="antes-depois-titulo">
      <h2 id="antes-depois-titulo" className="font-display text-2xl md:text-3xl font-bold text-foreground">
        {isEn ? "Before and after" : "Antes e depois"}
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {telas.map(({ key, tela, titulo, badge, Icon, iconClass }) => {
          const alt = (isEn && tela.alt_en) || tela.alt;
          const pontos = (isEn && tela.pontos_en) || tela.pontos;
          return (
            <article key={key} className="rounded-3xl border border-border bg-card/40 overflow-hidden flex flex-col">
              <button
                type="button"
                onClick={() => setZoom({ src: tela.imagem, alt })}
                className="block bg-primary/5 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-label={isEn ? `Enlarge: ${alt}` : `Ampliar: ${alt}`}
              >
                <img src={tela.imagem} alt={alt} loading="lazy" decoding="async" className="w-full h-auto rounded-xl" />
              </button>
              <div className="p-5 md:p-6 space-y-4 flex-1">
                <span
                  className={`inline-block text-xs px-3 py-1 rounded-full font-display font-semibold uppercase tracking-wider ${badge}`}
                >
                  {titulo}
                </span>
                <ul className="space-y-3">
                  {pontos.map((ponto) => (
                    <li key={ponto} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span
                        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${iconClass}`}
                        aria-hidden
                      >
                        <Icon className="w-3 h-3" />
                      </span>
                      <span>{ponto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      {data.wcag && (
        <div className="rounded-3xl border-2 border-primary/20 bg-primary/5 p-6 md:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <Accessibility className="w-6 h-6" aria-hidden />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display font-bold text-foreground text-lg md:text-xl">
                {isEn ? "Designed with WCAG from start to finish" : "Desenhada com a WCAG do início ao fim"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {(isEn && data.wcag.resumo_en) || data.wcag.resumo}
              </p>
            </div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {data.wcag.criterios.map((c) => (
              <li key={c.codigo} className="p-4 rounded-2xl bg-background border border-border space-y-1">
                <p className="font-display font-bold text-sm text-foreground">
                  <span className="text-primary tabular-nums mr-1.5">{c.codigo}</span>
                  {(isEn && c.nome_en) || c.nome}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {(isEn && c.descricao_en) || c.descricao}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Dialog open={zoom !== null} onOpenChange={() => setZoom(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 bg-background/95 backdrop-blur-sm border-border overflow-auto">
          {zoom && <img src={zoom.src} alt={zoom.alt} className="w-full h-auto rounded-xl" />}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CaseBeforeAfter;
