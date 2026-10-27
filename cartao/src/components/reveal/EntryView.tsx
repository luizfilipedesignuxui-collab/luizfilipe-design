import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { BusinessCardConfig } from "../../config/business-card.ts";
import { newWindowLabel } from "../../lib/a11y.ts";
import { linkedinProfileUrl } from "../../lib/contact.ts";
import { easeOut, usePrefersReducedMotion } from "../../lib/motion.ts";
import { BrandLogo } from "../BrandLogo.tsx";
import { PhotoSlot } from "../PhotoSlot.tsx";
import { QrCard } from "../QrCard.tsx";

type EntryViewProps = {
  card: BusinessCardConfig;
  qrValue: string;
  onSurprise: () => void;
  onAccess: () => void;
  onSaveCard: () => void;
  onContact: () => void;
  onOwner: () => void;
};

export function EntryView({ card, qrValue, onSurprise, onAccess, onSaveCard, onContact, onOwner }: EntryViewProps) {
  const reduced = usePrefersReducedMotion();
  const linkedin = card.options.linkedin ? linkedinProfileUrl(card.linkedinUrl) : "";
  const canSave = card.options.downloadQr;
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay, ease: easeOut },
        };

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 lg:py-10">
        <article className="card rounded-[32px] px-5 py-6 sm:px-7 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:px-8 lg:py-8">
          <motion.div {...rise(0)} className="flex justify-center lg:justify-start">
            <div className="rounded-full bg-cream p-1 shadow-[0_12px_28px_rgb(38_33_30/16%)]">
              <PhotoSlot src={card.photoSrc} name={card.fullName} size="xl" />
            </div>
          </motion.div>

          <motion.div {...rise(0.08)} className="mt-4 text-center lg:mt-0 lg:text-left">
            <h1 id="titulo-pagina" tabIndex={-1} className="outline-none">
              {card.logoSrc ? (
                <BrandLogo src={card.logoSrc} size="hero" />
              ) : (
                <span className="block text-[clamp(2rem,7vw,2.75rem)] leading-none font-semibold tracking-[-0.03em] text-balance text-ink">
                  {card.fullName}
                </span>
              )}
              {card.logoSrc ? <span className="sr-only">{card.fullName}</span> : null}
            </h1>
            <p className="mt-3 text-[1.1875rem] leading-snug font-medium text-ink">{card.role}</p>
            {card.summary ? (
              <p className="mt-2 text-[1.1875rem] leading-snug font-medium text-pretty text-ink">{card.summary}</p>
            ) : null}

            <div className="mt-5 flex flex-col gap-3">
              <button
                id="descobrir-conexao"
                type="button"
                className="cta-on-cream focus-ring-cream flex min-h-[52px] w-full items-center justify-center rounded-full px-5 text-[1.1875rem] font-semibold"
                onClick={onSurprise}
              >
                Descubra nossa conexão
              </button>
              {linkedin || canSave ? (
                <div className="flex gap-3">
                  {linkedin ? (
                    <a
                      className="focus-ring flex min-h-[52px] flex-1 items-center justify-center rounded-full border-2 border-ink px-3 text-center text-[1.0625rem] font-semibold text-ink"
                      href={linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={newWindowLabel("LinkedIn", true)}
                    >
                      LinkedIn
                    </a>
                  ) : null}
                  {canSave ? (
                    <button
                      type="button"
                      className="focus-ring flex min-h-[52px] flex-1 items-center justify-center rounded-full border-2 border-ink px-3 text-[1.0625rem] font-semibold text-ink"
                      onClick={onSaveCard}
                    >
                      Salvar cartão
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </motion.div>

          <motion.div {...rise(0.16)} className="mt-5 flex items-center gap-4 border-t border-line pt-5 text-left lg:mt-0 lg:flex-col lg:justify-center lg:self-stretch lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <QrCard
              value={qrValue}
              name={card.fullName}
              embedded
              size={112}
              canvasId="qr-entry"
              onOpen={onAccess}
            />
            <div className="min-w-0 lg:text-center">
              <button
                type="button"
                className="focus-ring block min-h-11 rounded-md text-left lg:w-full lg:text-center"
                onClick={onAccess}
              >
                <span className="block text-[1.1875rem] leading-snug font-semibold text-ink">Acessos</span>
                <span className="mt-1 block text-base leading-snug font-medium text-muted">Toque para abrir.</span>
              </button>
              <button
                id="ir-para-contato"
                type="button"
                className="focus-ring mt-2 min-h-11 text-left text-[1.1875rem] font-semibold text-ink underline decoration-line underline-offset-4 lg:text-center"
                onClick={onContact}
              >
                Ver contato e portfólio
              </button>
            </div>
          </motion.div>
        </article>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="focus-ring-cream grid size-12 place-items-center rounded-full bg-white/18 text-cream"
            aria-label="Área do proprietário"
            onClick={onOwner}
          >
            <Lock className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
