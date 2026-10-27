import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { BusinessCardConfig } from "../../config/business-card.ts";
import { newWindowLabel } from "../../lib/a11y.ts";
import { linkedinProfileUrl } from "../../lib/contact.ts";
import {
  cardLand,
  hoverLift,
  photoFloat,
  photoPop,
  press,
  rise,
  usePrefersReducedMotion,
} from "../../lib/motion.ts";
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

  function qr(canvasId: string) {
    return (
      <QrCard
        value={qrValue}
        name={card.fullName}
        embedded
        animated
        size={112}
        canvasId={canvasId}
        onOpen={onAccess}
      />
    );
  }

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="shell mx-auto flex min-h-full w-full max-w-[440px] flex-col px-4 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 lg:max-w-5xl lg:justify-center lg:px-10 lg:py-14">
        <motion.article
          className="card rounded-[32px] px-5 py-7 sm:px-8 sm:py-8 lg:px-12 lg:py-10"
          style={{ transformOrigin: "50% 80%" }}
          {...cardLand(reduced)}
        >
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-12">
            <motion.div {...photoPop(reduced)} className="shrink-0">
              <motion.div {...photoFloat(reduced)} className="rounded-full bg-cream p-1 shadow-[0_12px_28px_rgb(38_33_30/16%)]">
                <PhotoSlot src={card.photoSrc} name={card.fullName} size="xl" />
              </motion.div>
            </motion.div>

            <motion.div {...rise(reduced, 0.08)} className="min-w-0 flex-1 text-center lg:text-left">
              <h1 id="titulo-pagina" tabIndex={-1} className="outline-none">
                {card.logoSrc ? (
                  <BrandLogo src={card.logoSrc} size="hero" />
                ) : (
                  <span className="block text-[clamp(2.15rem,5vw,3.15rem)] leading-[1.02] font-light tracking-[-0.04em] text-balance text-ink">
                    {card.fullName}
                  </span>
                )}
                {card.logoSrc ? <span className="sr-only">{card.fullName}</span> : null}
              </h1>
              <p className="mt-3 text-[1.1875rem] leading-snug font-normal text-ink">{card.role}</p>
              {card.summary ? (
                <p className="mt-2 text-[1.1875rem] leading-snug font-normal text-pretty text-muted">{card.summary}</p>
              ) : null}
            </motion.div>

            <motion.div {...rise(reduced, 0.14)} className="hidden shrink-0 lg:block">
              {qr("qr-entry-desktop")}
            </motion.div>
          </div>

          <motion.div
            {...rise(reduced, 0.18)}
            className="mt-7 grid gap-3 sm:grid-cols-3"
          >
            <motion.button
              id="descobrir-conexao"
              type="button"
              className="btn btn-accent focus-ring-cream"
              onClick={onSurprise}
              whileHover={reduced ? undefined : hoverLift}
              whileTap={reduced ? undefined : press}
            >
              Temos algo em comum
            </motion.button>
            {linkedin ? (
              <motion.a
                className="btn btn-linkedin focus-ring-cream"
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={newWindowLabel("LinkedIn", true)}
                whileHover={reduced ? undefined : hoverLift}
                whileTap={reduced ? undefined : press}
              >
                LinkedIn
              </motion.a>
            ) : null}
            {canSave ? (
              <motion.button
                type="button"
                className="btn btn-save focus-ring-cream"
                onClick={onSaveCard}
                whileHover={reduced ? undefined : hoverLift}
                whileTap={reduced ? undefined : press}
              >
                Salvar cartão
              </motion.button>
            ) : null}
          </motion.div>

          <motion.div
            {...rise(reduced, 0.24)}
            className="mt-6 flex items-center justify-center gap-4 lg:hidden"
          >
            {qr("qr-entry-mobile")}
            <div className="min-w-0 text-left">
              <button type="button" className="focus-ring block min-h-11 rounded-md text-left" onClick={onAccess}>
                <span className="block text-[1.1875rem] leading-snug font-medium text-ink">Acessos</span>
                <span className="mt-1 block text-base leading-snug font-normal text-muted">WhatsApp, LinkedIn e o resto.</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            {...rise(reduced, 0.28)}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start"
          >
            <button
              type="button"
              className="focus-ring hidden min-h-11 text-[1.1875rem] font-medium text-ink underline decoration-line underline-offset-4 lg:inline"
              onClick={onAccess}
            >
              Acessos
            </button>
            <button
              id="ir-para-contato"
              type="button"
              className="focus-ring min-h-11 text-[1.1875rem] font-medium text-accent underline decoration-line underline-offset-4"
              onClick={onContact}
            >
              Onde a conversa continua
            </button>
          </motion.div>
        </motion.article>
        <motion.div {...rise(reduced, 0.36)} className="mt-5 flex justify-center">
          <motion.button
            type="button"
            className="focus-ring-cream grid size-12 place-items-center rounded-full bg-ink/25 text-cream"
            aria-label="Área do proprietário"
            onClick={onOwner}
            whileHover={reduced ? undefined : { scale: 1.1, rotate: -8 }}
            whileTap={reduced ? undefined : press}
          >
            <Lock className="size-5" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
