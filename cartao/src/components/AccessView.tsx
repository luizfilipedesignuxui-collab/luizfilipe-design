import { motion } from "framer-motion";
import { useEffect } from "react";
import type { BusinessCardConfig } from "../config/business-card.ts";
import { newWindowLabel } from "../lib/a11y.ts";
import { buildEmailComposeUrl, buildWhatsAppUrl, linkedinProfileUrl } from "../lib/contact.ts";
import { photoPop, rise, usePrefersReducedMotion } from "../lib/motion.ts";
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
};

function linksFor(card: BusinessCardConfig): AccessLink[] {
  const items: AccessLink[] = [];
  const whatsapp = buildWhatsAppUrl(card.phoneDisplay, card.whatsappMessage);
  const linkedin = linkedinProfileUrl(card.linkedinUrl);
  const email = buildEmailComposeUrl(card.email, card.emailSubject);
  if (whatsapp) items.push({ id: "whatsapp", label: "WhatsApp", detail: card.phoneDisplay, href: whatsapp });
  if (linkedin) items.push({ id: "linkedin", label: "LinkedIn", detail: "Perfil profissional", href: linkedin });
  if (email) items.push({ id: "email", label: "E-mail", detail: card.email, href: email });
  if (card.portfolioUrl.trim()) items.push({ id: "portfolio", label: "Portfólio", detail: "Trabalhos e casos", href: card.portfolioUrl.trim() });
  if (card.websiteUrl.trim() && card.websiteUrl.trim() !== card.portfolioUrl.trim()) {
    items.push({ id: "website", label: "Vendas", detail: "Sites para pequenos negócios", href: card.websiteUrl.trim() });
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
      <div className="mx-auto flex w-full max-w-md flex-col px-4 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <motion.div {...photoPop(reduced)} className="flex justify-center">
          <div className="rounded-full bg-cream p-1 shadow-[0_12px_28px_rgb(38_33_30/16%)]">
            <PhotoSlot src={card.photoSrc} name={card.fullName} size="lg" />
          </div>
        </motion.div>
        <motion.h1
          {...rise(reduced, 0.08)}
          id="titulo-acessos"
          tabIndex={-1}
          className="mt-4 text-center text-[clamp(2rem,7vw,2.6rem)] leading-none font-semibold tracking-[-0.03em] text-cream outline-none"
        >
          {card.fullName}
        </motion.h1>
        <motion.p {...rise(reduced, 0.12)} className="mt-3 text-center text-[1.1875rem] leading-snug font-medium text-cream">
          {card.role}
        </motion.p>

        <ul id="acessos" className="mt-6 grid gap-3">
          {links.map((link, index) => (
            <motion.li key={link.id} {...rise(reduced, 0.16 + index * 0.06)}>
              <a
                className="card focus-ring flex min-h-[64px] items-center justify-between gap-3 rounded-[22px] px-4 py-3 text-ink"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={newWindowLabel(link.label, true)}
              >
                <span>
                  <span className="block text-[1.1875rem] font-semibold">{link.label}</span>
                  <span className="mt-0.5 block text-base leading-snug font-medium text-muted">{link.detail}</span>
                </span>
                <span aria-hidden="true" className="text-xl font-semibold text-accent">
                  →
                </span>
              </a>
            </motion.li>
          ))}
          <motion.li {...rise(reduced, 0.16 + links.length * 0.06)}>
            <button
              type="button"
              className="cta focus-ring-cream flex min-h-[64px] w-full items-center justify-center rounded-[22px] px-4 text-[1.1875rem] font-semibold"
              onClick={onSaveCard}
            >
              Salvar cartão
            </button>
          </motion.li>
        </ul>

        <motion.button
          {...rise(reduced, 0.22 + links.length * 0.06)}
          type="button"
          className="focus-ring-cream mt-4 min-h-11 text-[1.1875rem] font-medium text-cream underline decoration-white/70 underline-offset-4"
          onClick={onBack}
        >
          Voltar ao cartão
        </motion.button>
      </div>
    </section>
  );
}
