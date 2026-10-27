import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { BusinessCardConfig } from "../../config/business-card.ts";
import { newWindowLabel } from "../../lib/a11y.ts";
import type { ActionId, CardAction } from "../../lib/actions.ts";
import { buildEmailComposeUrl, buildWhatsAppUrl, isHttpUrl, linkedinHandle, linkedinProfileUrl } from "../../lib/contact.ts";
import { easeOut, usePrefersReducedMotion } from "../../lib/motion.ts";
import { ActionButton } from "../ActionButton.tsx";
import { ChannelMark, type ChannelId } from "../ChannelMark.tsx";

type ConnectionViewProps = {
  card: BusinessCardConfig;
  extras: readonly CardAction[];
  onAction: (id: ActionId) => void;
};

type StageLink = {
  id: ChannelId;
  href: string;
  label: string;
  short: string;
  detail: string;
  note: string;
  action: string;
  external?: boolean;
};

const barClass: Record<ChannelId, string> = {
  whatsapp: "bg-brand-whatsapp",
  linkedin: "bg-brand-linkedin",
  email: "bg-ink",
  portfolio: "bg-media",
  website: "bg-accent",
};

function siteLabel(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/$/, "");
    return `${parsed.host.replace(/^www\./, "")}${path}`;
  } catch {
    return url;
  }
}

function ChannelButton({
  link,
  active,
  onSelect,
}: {
  link: StageLink;
  active: boolean;
  onSelect: (id: ChannelId) => void;
}) {
  const className = "focus-ring flex w-full flex-col items-center gap-2 rounded-md px-1 py-2";
  const body = (
    <>
      <ChannelMark id={link.id} active={active} />
      <span className={`text-xs leading-tight font-medium ${active ? "text-ink" : "text-muted"}`}>{link.short}</span>
    </>
  );

  if (link.id === "linkedin") {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={newWindowLabel(link.label, true)} className={className}>
        {body}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={link.label}
      aria-pressed={active}
      aria-controls="contato-detalhe"
      className={className}
      onClick={() => onSelect(link.id)}
    >
      {body}
    </button>
  );
}

export function ConnectionView({ card, extras, onAction }: ConnectionViewProps) {
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<ChannelId | null>(null);
  const whatsapp = buildWhatsAppUrl(card.phoneDisplay, card.whatsappMessage);
  const email = buildEmailComposeUrl(card.email, card.emailSubject);

  const links: StageLink[] = [];
  if (whatsapp) {
    links.push({
      id: "whatsapp",
      href: whatsapp,
      label: "WhatsApp",
      short: "WhatsApp",
      detail: card.phoneDisplay,
      note: card.whatsappMessage,
      action: "Abrir conversa",
      external: true,
    });
  }
  const linkedin = linkedinProfileUrl(card.linkedinUrl);
  if (linkedin) {
    links.push({
      id: "linkedin",
      href: linkedin,
      label: "LinkedIn",
      short: "LinkedIn",
      detail: linkedinHandle(card.linkedinUrl)
        ? `linkedin.com/${linkedinHandle(card.linkedinUrl)}`
        : "LinkedIn",
      note: `${card.role}. ${card.specialty}.`,
      action: "Abrir perfil",
      external: true,
    });
  }
  if (email) {
    links.push({
      id: "email",
      href: email,
      label: "E-mail",
      short: "E-mail",
      detail: card.email,
      note: card.emailSubject,
      action: "Escrever e-mail",
      external: true,
    });
  }

  if (isHttpUrl(card.portfolioUrl)) {
    links.push({
      id: "portfolio",
      href: card.portfolioUrl.trim(),
      label: "Portfólio",
      short: "Portfólio",
      detail: siteLabel(card.portfolioUrl),
      note: "Cases de UX/UI e Design Engineering.",
      action: "Abrir portfólio",
      external: true,
    });
  }
  if (isHttpUrl(card.websiteUrl)) {
    links.push({
      id: "website",
      href: card.websiteUrl.trim(),
      label: "Site de vendas",
      short: "Vendas",
      detail: siteLabel(card.websiteUrl),
      note: "Criação de sites para pequenos negócios.",
      action: "Abrir site de vendas",
      external: true,
    });
  }

  const active = links.find((link) => link.id === activeId) ?? null;

  return (
    <motion.div
      className="mx-auto flex w-full max-w-md flex-col px-5 pt-5 pb-4 text-cream"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.42, ease: easeOut }}
    >
      <p className="text-[1.1875rem] font-medium tracking-[0.12em] text-cream uppercase">Contato</p>
      <h1
        id="titulo-pagina"
        tabIndex={-1}
        className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-cream outline-none focus:outline-none focus-visible:outline-none"
      >
        Fale com {card.firstName}
      </h1>

      <div id="contato-direto" className="mt-5">
        <p className="sr-only">Escolha um canal de contato</p>
        <div className="glass rounded-lg px-3 py-4">
          <p className="text-center text-xs font-medium tracking-[0.18em] text-muted uppercase">Falar</p>
          <ul className="mt-3 grid grid-cols-3 gap-2">
            {links
              .filter((link) => link.id === "whatsapp" || link.id === "linkedin" || link.id === "email")
              .map((link) => (
                <li key={link.id}>
                  <ChannelButton link={link} active={activeId === link.id} onSelect={setActiveId} />
                </li>
              ))}
          </ul>
          <p className="mt-4 text-center text-xs font-medium tracking-[0.18em] text-muted uppercase">Trabalho</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {links
              .filter((link) => link.id === "portfolio" || link.id === "website")
              .map((link) => (
                <li key={link.id}>
                  <ChannelButton link={link} active={activeId === link.id} onSelect={setActiveId} />
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div id="contato-detalhe" className="mt-4 min-h-12">
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.a
              key={active.id}
              href={active.href}
              className="glass focus-ring flex w-full flex-col overflow-hidden rounded-lg text-center"
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.36, ease: easeOut }}
              aria-label={newWindowLabel(`${active.action}: ${active.label} ${active.detail}`, active.external)}
              {...(active.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className={`block h-1.5 ${barClass[active.id]}`} aria-hidden="true" />
              <span className="flex flex-col items-center px-5 py-4">
                <span className="text-sm font-semibold text-ink">{active.label}</span>
                <span className="mt-2 text-base font-semibold break-words text-ink">{active.detail}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted">{active.note}</span>
                <span className="cta-on-cream mt-4 inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold">
                  {active.action}
                  {active.external ? <span className="sr-only">, abre em nova aba</span> : null}
                </span>
              </span>
            </motion.a>
          ) : (
            <p className="text-center text-[1.1875rem] font-medium leading-snug text-cream">Toque em um ícone para ver o contato.</p>
          )}
        </AnimatePresence>
      </div>

      {extras.length > 0 ? (
        <ul className="mt-5 space-y-2.5" aria-label="Ações do cartão">
          {extras.map((action) => (
            <li key={action.id}>
              <ActionButton action={action} tone="dark" onActivate={() => onAction(action.id)} />
            </li>
          ))}
        </ul>
      ) : null}
    </motion.div>
  );
}
