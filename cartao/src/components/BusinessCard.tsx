import { AnimatePresence, motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useMemo, useState } from "react";
import { businessCard, type BusinessCardConfig } from "../config/business-card.ts";
import { buildActionGroups, type ActionId } from "../lib/actions.ts";
import { saveEntryCardToGallery } from "../lib/card-image.ts";
import { cardPath, entryQrValue, resolvePublicCardUrl } from "../lib/app-location.ts";
import {
  buildShareMessage,
  buildVCard,
  fileSlug,
  isHttpUrl,
  saveVCardToDevice,
  shareOrCopyLink,
} from "../lib/contact.ts";
import { LAYER_ANNOUNCE, focusPageTitle } from "../lib/a11y.ts";
import { loadLiveCard } from "../lib/event-mode-client.ts";
import { type SurpriseContextId } from "../lib/surprise.ts";
import { paneMotion, usePrefersReducedMotion } from "../lib/motion.ts";
import { applyPublicUrl, QR_CANVAS_ID } from "../lib/page.ts";
import { qrColors } from "../lib/qrColors.ts";
import { type RevealLayer } from "../lib/reveal.ts";
import { ConnectionView } from "./reveal/ConnectionView.tsx";
import { AccessView } from "./AccessView.tsx";
import { SurpriseView } from "./SurpriseView.tsx";
import { EventModeView } from "./EventModeView.tsx";
import { EntryView } from "./reveal/EntryView.tsx";
import { IdentityView } from "./reveal/IdentityView.tsx";
import { LayerNav } from "./reveal/LayerNav.tsx";

const extraHidden = new Set<ActionId>([
  "whatsapp",
  "linkedin",
  "email",
  "portfolio",
  "website",
  "experience",
  "opportunities",
]);

function opensConnection(): boolean {
  return new URLSearchParams(window.location.search).get("conexao") === "1";
}

function opensAccess(): boolean {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/conectar") return true;
  return new URLSearchParams(window.location.search).get("acessos") === "1";
}

export function BusinessCard() {
  const reduced = usePrefersReducedMotion();
  const [card, setCard] = useState<BusinessCardConfig>(businessCard);
  const extras = useMemo(
    () => buildActionGroups(card).flatMap((group) => group.actions).filter((action) => !extraHidden.has(action.id)),
    [card],
  );
  const slug = fileSlug(card.fullName) || "cartao";
  const publicCard = resolvePublicCardUrl({ publicUrl: card.publicUrl, slug });
  const qrValue = entryQrValue(publicCard);
  const [layer, setLayer] = useState<RevealLayer>(() => {
    const value = new URLSearchParams(window.location.search).get("layer");
    return value === "identity" || value === "connection" ? value : "entry";
  });
  const [access, setAccess] = useState(opensAccess);
  const [surprise, setSurprise] = useState(() => !opensAccess() && opensConnection());
  const [surpriseContext, setSurpriseContext] = useState<SurpriseContextId>("geral");
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isHttpUrl(publicCard.url) && !publicCard.isLocal) applyPublicUrl(publicCard.url);
  }, [publicCard.url, publicCard.isLocal]);

  useEffect(() => {
    document.documentElement.dataset.stage = "entry";
    return () => {
      delete document.documentElement.dataset.stage;
    };
  }, [layer]);

  useEffect(() => {
    if (!status) return;
    const timeout = window.setTimeout(() => setStatus(""), 4200);
    return () => window.clearTimeout(timeout);
  }, [status]);

  useEffect(() => {
    let cancel = false;
    void loadLiveCard().then((live) => {
      if (cancel) return;
      setCard(live.card);
      setSurpriseContext(live.context);
    });
    return () => {
      cancel = true;
    };
  }, [surprise, ownerOpen]);

  useEffect(() => {
    if (surprise) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById("titulo-conexao")?.focus({ preventScroll: true });
      });
      return () => window.cancelAnimationFrame(frame);
    }
    focusPageTitle();
    return undefined;
  }, [layer, surprise]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (ownerOpen) {
        setOwnerOpen(false);
        return;
      }
      if (access) {
        closeAccess();
        return;
      }
      if (surprise) {
        closeSurprise();
        return;
      }
      if (layer !== "entry") setLayer("entry");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [layer, surprise, access, ownerOpen]);

  function closeSurprise() {
    setSurprise(false);
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const params = new URLSearchParams(window.location.search);
    if (path !== "/conectar" && params.get("conexao") !== "1") return;
    params.delete("conexao");
    const search = params.toString();
    window.history.replaceState({}, "", `${cardPath(slug)}${search ? `?${search}` : ""}`);
  }

  function closeAccess() {
    setAccess(false);
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const params = new URLSearchParams(window.location.search);
    if (path !== "/conectar" && params.get("acessos") !== "1") return;
    params.delete("acessos");
    const search = params.toString();
    window.history.replaceState({}, "", `${cardPath(slug)}${search ? `?${search}` : ""}`);
  }

  function goBack() {
    setLayer("entry");
  }

  function goContact() {
    setLayer("connection");
  }

  async function shareCard() {
    const result = await shareOrCopyLink(buildShareMessage(card, publicCard.url));
    if (result === "shared") setStatus("O cartão foi enviado.");
    if (result === "copied") setStatus("Link do cartão copiado.");
    if (result === "failed") {
      setStatus("Não foi possível compartilhar nem copiar o link.");
    }
  }

  async function saveContact() {
    const vcard = buildVCard(card);
    if (!vcard) {
      setStatus("Não foi possível gerar o contato.");
      return;
    }
    const result = await saveVCardToDevice(`${slug}.vcf`, vcard);
    if (result === "shared") setStatus("Abra o arquivo para salvar o número na agenda.");
    if (result === "downloaded") setStatus("Contato baixado. Abra o arquivo para salvar na agenda.");
    if (result === "failed") setStatus("Não foi possível salvar o contato.");
  }

  async function saveGallery() {
    setStatus("Preparando a primeira tela...");
    const result = await saveEntryCardToGallery(
      {
        photoSrc: card.photoSrc,
        logoSrc: card.logoSrc,
        fullName: card.fullName,
        role: card.role,
        specialty: card.specialty,
      },
      `${slug}-cartao.png`,
    );
    if (result === "shared") setStatus("No celular, escolha Salvar imagem para guardar na galeria.");
    if (result === "downloaded") setStatus("Imagem baixada. Abra o arquivo e salve na galeria.");
    if (result === "failed") setStatus("Não foi possível salvar o cartão.");
  }

  function onAction(id: ActionId) {
    if (id === "save-contact") {
      void saveContact();
      return;
    }
    if (id === "download-qr") {
      void saveGallery();
      return;
    }
    if (id === "share") void shareCard();
  }

  const panes = paneMotion(reduced);

  return (
    <div className="relative h-full overflow-hidden">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <a className="skip-link" href={access ? "#acessos" : surprise ? "#vamos-conversar" : layer === "entry" ? "#ir-para-contato" : "#contato-direto"}>
        {access ? "Ir para os acessos" : surprise ? "Ir para a conversa" : "Ir para o contato"}
      </a>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {access ? "Acessos de Luiz." : surprise ? "Conexão a partir do que está publicado." : LAYER_ANNOUNCE[layer]}
        {status ? `. ${status}` : ""}
      </p>
      <div className="sr-only" aria-hidden="true">
        <QRCodeCanvas
          id={QR_CANVAS_ID}
          value={qrValue}
          size={176}
          level="H"
          marginSize={2}
          bgColor={qrColors.paper}
          fgColor={qrColors.ink}
        />
      </div>

      <main id="conteudo" tabIndex={-1} className="relative z-10 h-full outline-none" aria-label={`Cartão digital de ${card.fullName}`}>
        <AnimatePresence mode="wait" initial={false}>
          {ownerOpen ? (
            <motion.div key="owner" className="h-full" {...panes}>
              <EventModeView
                onClose={() => setOwnerOpen(false)}
                onSaved={() => {
                  void loadLiveCard().then((live) => {
                    setCard(live.card);
                    setSurpriseContext(live.context);
                  });
                }}
              />
            </motion.div>
          ) : access ? (
            <motion.div key="access" className="h-full" {...panes}>
              <AccessView card={card} onBack={closeAccess} onSaveCard={() => void saveGallery()} />
            </motion.div>
          ) : surprise ? (
            <motion.div key="surprise" className="h-full" {...panes}>
              <SurpriseView card={card} context={surpriseContext} onBack={closeSurprise} />
            </motion.div>
          ) : layer === "entry" ? (
            <motion.div key="entry" className="relative h-full" {...panes}>
              <EntryView
                card={card}
                qrValue={qrValue}
                onSurprise={() => setSurprise(true)}
                onAccess={() => setAccess(true)}
                onSaveCard={() => void saveGallery()}
                onContact={goContact}
                onOwner={() => setOwnerOpen(true)}
              />
              {status ? (
                <p className="pointer-events-none absolute inset-x-0 bottom-3 z-20 px-5 text-center text-[1.1875rem] font-medium text-cream" aria-hidden="true">
                  {status}
                </p>
              ) : null}
            </motion.div>
          ) : (
            <motion.div key={layer} {...panes} className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto]">
              <div className="min-h-0 overflow-y-auto overscroll-y-contain">
                {layer === "identity" ? <IdentityView card={card} /> : null}
                {layer === "connection" ? <ConnectionView card={card} extras={extras} onAction={onAction} /> : null}
              </div>

              <div className="border-t border-white/25 bg-bg px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                {status ? (
                  <p className="mx-auto mb-2 w-full max-w-md text-center text-[1.1875rem] font-medium text-cream" role="status">
                    {status}
                  </p>
                ) : null}
                <div className="mx-auto w-full max-w-md lg:max-w-xl">
                  <LayerNav onBack={goBack} onContact={goContact} current={layer} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
