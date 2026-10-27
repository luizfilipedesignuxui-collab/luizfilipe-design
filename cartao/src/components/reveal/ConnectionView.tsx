import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { BusinessCardConfig } from "../../config/business-card.ts";
import { newWindowLabel } from "../../lib/a11y.ts";
import type { ActionId, CardAction } from "../../lib/actions.ts";
import { buildEmailComposeUrl, buildWhatsAppUrl, isHttpUrl, linkedinHandle, linkedinProfileUrl } from "../../lib/contact.ts";
import { hoverLift, press, rise, usePrefersReducedMotion } from "../../lib/motion.ts";
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

const actionClass: Record<ChannelId, string> = {
  whatsapp: "btn btn-whatsapp mt-4",
  linkedin: "btn btn-linkedin mt-4",
  email: "btn btn-ink mt-4",
  portfolio: "btn btn-accent mt-4",
  website: "btn btn-save mt-4",
};

const extraClass: Partial<Record<ActionId, string>> = {
  "save-contact": "btn btn-whatsapp",
  share: "btn btn-linkedin",
  "download-qr": "btn btn-save",
  schedule: "btn btn-accent",
  "resume-view": "btn btn-ink",
  "resume-download": "btn btn-cream",
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
  reduced,
}: {
  link: StageLink;
  active: boolean;
  onSelect: (id: ChannelId) => void;
  reduced: boolean;
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
      <motion.a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={newWindowLabel(link.label, true)}
        className={className}
        whileHover={reduced ? undefined : hoverLift}
        whileTap={reduced ? undefined : press}
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={link.label}
      aria-pressed={active}
      aria-controls="contato-detalhe"
      className={className}
      onClick={() => onSelect(link.id)}
      whileHover={reduced ? undefined : hoverLift}
      whileTap={reduced ? undefined : press}
    >
      {body}
    </motion.button>
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
  const talk = links.filter((link) => link.id === "whatsapp" || link.id === "linkedin" || link.id === "email");
  const work = links.filter((link) => link.id === "portfolio" || link.id === "website");

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-5 pt-5 pb-4 text-cream lg:max-w-3xl lg:px-10 lg:pt-8">
      <motion.p {...rise(reduced)} className="text-[1.1875rem] font-medium tracking-[0.12em] text-cream uppercase">
        Contato
      </motion.p>
      <motion.h1
        id="titulo-pagina"
        tabIndex={-1}
        className="mt-2 text-[clamp(1.85rem,4vw,2.5rem)] font-light tracking-[-0.04em] text-cream outline-none focus:outline-none focus-visible:outline-none"
        {...rise(reduced, 0.06)}
      >
        Fale com {card.firstName}
      </motion.h1>

      <motion.div id="contato-direto" className="mt-5" {...rise(reduced, 0.1)}>
        <p className="sr-only">Escolha um canal de contato</p>
        <div className="glass rounded-lg px-3 py-4">
          <p className="text-center text-xs font-medium tracking-[0.18em] text-muted uppercase">Falar</p>
          <ul className="mt-3 grid grid-cols-3 gap-2">
            {talk.map((link) => (
              <li key={link.id}>
                <ChannelButton link={link} active={activeId === link.id} onSelect={setActiveId} reduced={reduced} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-xs font-medium tracking-[0.18em] text-muted uppercase">Trabalho</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-2">
            {work.map((link) => (
              <li key={link.id}>
                <ChannelButton link={link} active={activeId === link.id} onSelect={setActiveId} reduced={reduced} />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div id="contato-detalhe" className="mt-4 min-h-12">
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.a
              key={active.id}
              href={active.href}
              className="glass focus-ring flex w-full flex-col overflow-hidden rounded-lg text-center"
              initial={reduced ? false : { opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
              aria-label={newWindowLabel(`${active.action}: ${active.label} ${active.detail}`, active.external)}
              {...(active.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className={`block h-1.5 ${barClass[active.id]}`} aria-hidden="true" />
              <span className="flex flex-col items-center px-5 py-4">
                <span className="text-sm font-medium text-ink">{active.label}</span>
                <span className="mt-2 text-base font-normal break-words text-ink">{active.detail}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted">{active.note}</span>
                <span className={actionClass[active.id]}>
                  {active.action}
                  {active.external ? <span className="sr-only">, abre em nova aba</span> : null}
                </span>
              </span>
            </motion.a>
          ) : (
            <p className="text-center text-[1.1875rem] leading-snug font-medium text-cream">Toque em um ícone para ver o contato.</p>
          )}
        </AnimatePresence>
      </div>

      {extras.length > 0 ? (
        <ul className="mt-5 grid gap-2 sm:grid-cols-3" aria-label="Ações do cartão">
          {extras.map((action) => (
            <li key={action.id}>
              {action.href ? (
                <motion.a
                  className={extraClass[action.id] ?? "btn btn-cream"}
                  href={action.href}
                  aria-label={newWindowLabel(`${action.label}. ${action.description}`, action.external)}
                  {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(action.download ? { download: action.download } : {})}
                  whileHover={reduced ? undefined : hoverLift}
                  whileTap={reduced ? undefined : press}
                >
                  {action.label}
                </motion.a>
              ) : (
                <motion.button
                  type="button"
                  className={extraClass[action.id] ?? "btn btn-cream"}
                  onClick={() => onAction(action.id)}
                  aria-label={`${action.label}. ${action.description}`}
                  whileHover={reduced ? undefined : hoverLift}
                  whileTap={reduced ? undefined : press}
                >
                  {action.label}
                </motion.button>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
