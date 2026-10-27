import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { BusinessCardConfig } from "../config/business-card.ts";
import { newWindowLabel } from "../lib/a11y.ts";
import { copyText, linkedinProfileUrl } from "../lib/contact.ts";
import { cardLand, hoverLift, photoPop, press, rise, usePrefersReducedMotion } from "../lib/motion.ts";
import { buildSurpriseCopy, type SurpriseContextId } from "../lib/surprise.ts";
import { PhotoSlot } from "./PhotoSlot.tsx";

type SurpriseViewProps = {
  card: BusinessCardConfig;
  context: SurpriseContextId;
  onBack: () => void;
};

function copyWithSelection(value: string): boolean {
  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.append(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    return copied;
  } catch {
    return false;
  }
}

export function SurpriseView({ card, context, onBack }: SurpriseViewProps) {
  const reduced = usePrefersReducedMotion();
  const copy = buildSurpriseCopy(card, context);
  const linkedin = linkedinProfileUrl(card.linkedinUrl);
  const [note, setNote] = useState("");

  useEffect(() => {
    document.getElementById("titulo-conexao")?.focus({ preventScroll: true });
  }, []);

  async function prepareMessage() {
    const copied = (await copyText(copy.message)) || copyWithSelection(copy.message);
    setNote(
      copied
        ? "Mensagem copiada. Cole no LinkedIn e envie. Ela ainda não foi enviada."
        : "Não foi possível copiar a mensagem. Abra o LinkedIn e escreva o convite.",
    );
  }

  return (
    <section className="h-full min-h-0 overflow-y-auto" aria-labelledby="titulo-conexao">
      <div className="shell mx-auto w-full max-w-md px-4 pt-16 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <motion.article
          className="card relative rounded-[32px] px-5 pt-16 pb-6 text-ink"
          {...cardLand(reduced)}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            {...photoPop(reduced, 0.08)}
          >
            <div className="rounded-full bg-cream p-1 shadow-[0_12px_28px_rgb(38_33_30/16%)]">
              <PhotoSlot src={card.photoSrc} name={card.fullName} size="lg" />
            </div>
          </motion.div>

          <motion.p {...rise(reduced, 0.12)} className="text-center text-[1.1875rem] font-semibold">
            {copy.kicker}
          </motion.p>
          <motion.h1
            id="titulo-conexao"
            tabIndex={-1}
            className="mt-2 text-center text-[clamp(1.7rem,6vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-balance outline-none"
            {...rise(reduced, 0.16)}
          >
            {copy.title}
          </motion.h1>
          <motion.p
            {...rise(reduced, 0.2)}
            className="mt-3 text-center text-[1.1875rem] leading-snug font-medium text-pretty"
          >
            {copy.body}
          </motion.p>

          <motion.div
            {...rise(reduced, 0.26)}
            className="mt-5 rounded-[22px] border border-line px-4 py-4"
          >
            <p className="text-base font-semibold text-muted">Mensagem para o LinkedIn</p>
            <p className="mt-2 text-[1.1875rem] leading-snug font-medium">{copy.message}</p>
          </motion.div>

          {linkedin ? (
            <motion.a
              id="vamos-conversar"
              className="cta-on-cream focus-ring-cream mt-5 flex min-h-[52px] items-center justify-center rounded-full px-5 text-center text-[1.1875rem] font-semibold"
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={newWindowLabel("Vamos conversar?", true)}
              onClick={() => {
                void prepareMessage();
              }}
              whileHover={reduced ? undefined : hoverLift}
              whileTap={reduced ? undefined : press}
            >
              Vamos conversar?
            </motion.a>
          ) : null}
          {note ? (
            <p className="mt-3 text-center text-[1.1875rem] leading-snug font-medium" role="status">
              {note}
            </p>
          ) : null}
          <button
            type="button"
            className="focus-ring mt-3 min-h-11 w-full text-[1.1875rem] font-semibold text-ink underline decoration-line underline-offset-4"
            onClick={onBack}
          >
            Voltar ao cartão
          </button>
        </motion.article>
      </div>
    </section>
  );
}
