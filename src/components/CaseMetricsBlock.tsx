import { Users, Check } from "lucide-react";

export interface CaseMetricas {
  /** Narrative: problem → action → result (matador pattern) */
  narrativa: string;
  narrativa_en?: string;
  /** Flow steps before → after */
  fluxo_antes: number;
  fluxo_depois: number;
  /** Metric values shown in the before/after charts */
  valor_antes: string;
  valor_depois: string;
  label: string;
  label_en?: string;
  /** User validation line, e.g. "Testado com 20 usuários" */
  validacao: string;
  validacao_en?: string;
}

type Props = {
  metricas: CaseMetricas;
  isEn: boolean;
  title: string;
};

function FlowSteps({ count, dashed }: { count: number; dashed?: boolean }) {
  const steps = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div
      className={`inline-flex flex-wrap gap-1.5 p-2.5 rounded-xl border-2 ${
        dashed ? "border-dashed border-muted-foreground/40 bg-muted/30" : "border-primary/40 bg-primary/5"
      }`}
    >
      {steps.map((n) => (
        <span
          key={n}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold ${
            dashed ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
          }`}
        >
          {n}
        </span>
      ))}
    </div>
  );
}

function MetricCard({ value, label, muted }: { value: string; label: string; muted?: boolean }) {
  return (
    <div
      className={`min-w-[7.5rem] p-3 rounded-xl border text-center ${
        muted ? "border-dashed border-muted-foreground/40 bg-muted/20" : "border-primary/30 bg-primary/5"
      }`}
    >
      <svg viewBox="0 0 64 28" className="w-full h-7 mb-1.5 text-primary/70" aria-hidden>
        {muted ? (
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            points="2,6 14,10 26,8 38,16 50,14 62,22"
          />
        ) : (
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            points="2,22 14,18 26,20 38,10 50,8 62,4"
          />
        )}
      </svg>
      <p className="font-display text-lg font-extrabold text-foreground leading-none">{value}</p>
      <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide">{label}</p>
    </div>
  );
}

const CaseMetricsBlock = ({ metricas, isEn, title }: Props) => {
  const narrativa = (isEn && metricas.narrativa_en) || metricas.narrativa;
  const label = (isEn && metricas.label_en) || metricas.label;
  const validacao = (isEn && metricas.validacao_en) || metricas.validacao;

  return (
    <section
      className="rounded-3xl border border-border bg-card/40 p-6 md:p-8 space-y-6"
      aria-label={title}
    >
      <div>
        <p className="font-display text-sm font-bold text-accent uppercase tracking-widest mb-2">{title}</p>
        <p className="text-foreground leading-relaxed text-base md:text-lg">{narrativa}</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
        <div className="flex flex-wrap items-center gap-3">
          <FlowSteps count={metricas.fluxo_antes} dashed />
          <span className="text-muted-foreground font-display font-bold" aria-hidden>
            →
          </span>
          <FlowSteps count={metricas.fluxo_depois} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <MetricCard value={metricas.valor_antes} label={label} muted />
          <span className="text-muted-foreground font-display font-bold" aria-hidden>
            →
          </span>
          <MetricCard value={metricas.valor_depois} label={label} />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground lg:ml-auto">
          <div className="relative flex -space-x-1.5" aria-hidden>
            <span className="w-7 h-7 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-primary" />
            </span>
            <span className="w-7 h-7 rounded-full bg-primary/30 border-2 border-background flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-primary" />
            </span>
            <span className="w-7 h-7 rounded-full bg-primary border-2 border-background flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-primary-foreground" />
            </span>
          </div>
          <span>{validacao}</span>
        </div>
      </div>
    </section>
  );
};

export default CaseMetricsBlock;
