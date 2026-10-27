import { motion } from "framer-motion";
import { useEffect } from "react";
import type { BusinessCardConfig } from "../config/business-card.ts";
import { newWindowLabel } from "../lib/a11y.ts";
import { buildEmailComposeUrl, buildWhatsAppUrl, linkedinProfileUrl } from "../lib/contact.ts";
import { hoverLift, photoFloat, photoPop, press, rise, usePrefersReducedMotion } from "../lib/motion.ts";
import { PhotoSlot } from "./PhotoSlot.tsx";

type AccessViewProps = {
  card: BusinessCardConfig;
  onBack: () => void;
  onSaveCard: () => void;
};

type AccessLink = {
  id: string;
  label: string;
  detail: string;
  href: string;
  tone: string;
  detailTone: string;
};

const tones: Record<string, Pick<AccessLink, "tone" | "detailTone">> = {
  whatsapp: { tone: "bg-brand-whatsapp text-ink", detailTone: "text-ink/70" },
  linkedin: { tone: "bg-brand-linkedin text-cream", detailTone: "text-cream/80" },
  email: { tone: "bg-ink text-cream", detailTone: "text-cream/75" },
  portfolio: { tone: "bg-accent text-cream", detailTone: "text-cream/80" },
  website: { tone: "bg-cream text-accent", detailTone: "text-muted" },
};

function linksFor(card: BusinessCardConfig): AccessLink[] {
  const items: AccessLink[] = [];
  const whatsapp = buildWhatsAppUrl(card.phoneDisplay, card.whatsappMessage);
  const linkedin = linkedinProfileUrl(card.linkedinUrl);
  const email = buildEmailComposeUrl(card.email, card.emailSubject);
  function push(id: string, label: string, detail: string, href: string) {
    const look = tones[id] ?? tones.email;
    items.push({ id, label, detail, href, ...look });
  }
  if (whatsapp) push("whatsapp", "WhatsApp", card.phoneDisplay, whatsapp);
  if (linkedin) push("linkedin", "LinkedIn", "Perfil profissional", linkedin);
  if (email) push("email", "E-mail", card.email, email);
  if (card.portfolioUrl.trim()) push("portfolio", "Portfólio", "Trabalhos e casos", card.portfolioUrl.trim());
  if (card.websiteUrl.trim() && card.websiteUrl.trim() !== card.portfolioUrl.trim()) {
    push("website", "Vendas", "Sites para pequenos negócios", card.websiteUrl.trim());
  }
  return items;
}

export function AccessView({ card, onBack, onSaveCard }: AccessViewProps) {
  const reduced = usePrefersReducedMotion();
  const links = linksFor(card);

  useEffect(() => {
    document.getElementById("titulo-acessos")?.focus({ preventScroll: true });
  }, []);

  return (
    <section className="h-full min-h-0 overflow-y-auto" aria-labelledby="titulo-acessos">
      <div className="mx-auto flex w-full max-w-md flex-col px-4 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:max-w-3xl lg:justify-center lg:py-12">
        <motion.div {...photoPop(reduced)} className="flex justify-center">
          <motion.div {...photoFloat(reduced)} className="rounded-full bg-cream p-1 shadow-[0_12px_28px_rgb(38_33_30/16%)]">
            <PhotoSlot src={card.photoSrc} name={card.fullName} size="lg" />
          </motion.div>
        </motion.div>
        <motion.h1
          {...rise(reduced, 0.08)}
          id="titulo-acessos"
          tabIndex={-1}
          className="mt-4 text-center text-[clamp(2rem,5vw,2.75rem)] leading-none font-light tracking-[-0.04em] text-cream outline-none"
        >
          {card.fullName}
        </motion.h1>
        <motion.p
          {...rise(reduced, 0.12)}
          className="mt-3 text-center text-[1.1875rem] leading-snug font-medium text-cream"
        >
          {card.role}
        </motion.p>

        <ul id="acessos" className="mt-6 grid gap-3 lg:grid-cols-2">
          {links.map((link, index) => (
            <motion.li key={link.id} {...rise(reduced, 0.14 + index * 0.06)}>
              <motion.a
                className={`focus-ring-cream flex min-h-[64px] items-center justify-between gap-3 rounded-[22px] px-4 py-3 ${link.tone}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={newWindowLabel(link.label, true)}
                whileHover={reduced ? undefined : hoverLift}
                whileTap={reduced ? undefined : press}
              >
                <span>
                  <span className="block text-[1.1875rem] font-medium">{link.label}</span>
                  <span className={`mt-0.5 block text-base leading-snug font-normal ${link.detailTone}`}>{link.detail}</span>
                </span>
                <span aria-hidden="true" className="text-xl font-medium">
                  →
                </span>
              </motion.a>
            </motion.li>
          ))}
          <motion.li {...rise(reduced, 0.14 + links.length * 0.06)} className="lg:col-span-2">
            <motion.button
              type="button"
              className="btn btn-cream focus-ring-cream"
              onClick={onSaveCard}
              whileHover={reduced ? undefined : hoverLift}
              whileTap={reduced ? undefined : press}
            >
              Salvar cartão
            </motion.button>
          </motion.li>
        </ul>

        <motion.button
          {...rise(reduced, 0.2 + links.length * 0.06)}
          type="button"
          className="focus-ring-cream mt-4 min-h-11 text-[1.1875rem] font-normal text-cream underline decoration-white/70 underline-offset-4"
          onClick={onBack}
        >
          Voltar ao cartão
        </motion.button>
      </div>
    </section>
  );
}
