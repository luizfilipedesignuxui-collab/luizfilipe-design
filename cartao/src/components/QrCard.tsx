import { motion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { easeOut, qrFloat, usePrefersReducedMotion } from "../lib/motion.ts";
import { QR_CANVAS_ID } from "../lib/page.ts";
import { qrColors } from "../lib/qrColors.ts";

type QrCardProps = {
  value: string;
  name: string;
  size?: number;
  canvasId?: string;
  compact?: boolean;
  animated?: boolean;
  embedded?: boolean;
  caption?: string;
  onOpen?: () => void;
};

export function QrCard({
  value,
  name,
  size,
  canvasId = QR_CANVAS_ID,
  compact = false,
  animated = false,
  embedded = false,
  caption = "Toque ou escaneie para abrir o convite do LinkedIn.",
  onOpen,
}: QrCardProps) {
  const qrSize = size ?? (compact ? 132 : 176);
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const live = animated && !reduced && !paused;
  const href = value || "/?acessos=1";
  const label = `Abrir a conexão de ${name}`;

  function openInvite(event: MouseEvent<HTMLAnchorElement>) {
    if (!onOpen) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onOpen();
  }

  if (embedded) {
    return (
      <motion.a
        href={href}
        onClick={openInvite}
        className="focus-ring block w-fit rounded-[22px] bg-white p-1.5 ring-1 ring-line"
        aria-label={label}
        {...(animated ? qrFloat(reduced) : {})}
      >
        <QRCodeCanvas
          id={canvasId}
          value={value}
          size={qrSize}
          level="H"
          marginSize={1}
          bgColor={qrColors.paper}
          fgColor={qrColors.ink}
        />
      </motion.a>
    );
  }

  return (
    <figure
      className="w-full"
      data-qr-value={value}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <a
        href={href}
        onClick={openInvite}
        className="focus-ring block rounded-lg"
        aria-label={label}
      >
        <motion.div
          className={
            compact
              ? "flex w-full flex-col items-center rounded-lg bg-qr-paper px-4 py-4"
              : "flex w-full flex-col items-center rounded-lg bg-media px-5 py-6"
          }
          initial={animated && !reduced ? { opacity: 0, scale: 0.88, y: 18 } : false}
          animate={live ? { opacity: 1, scale: 1, y: [0, -8, 0] } : { opacity: 1, scale: 1, y: 0 }}
          transition={
            live
              ? {
                  opacity: { duration: 0.55, ease: easeOut },
                  scale: { duration: 0.55, ease: easeOut },
                  y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.55 },
                }
              : { duration: 0.35, ease: easeOut }
          }
        >
          <motion.div
            aria-hidden="true"
            className="rounded-[20px] bg-qr-paper p-2"
            animate={live ? { rotate: [0, 1.4, -1.4, 0] } : { rotate: 0 }}
            transition={live ? { duration: 6.4, repeat: Infinity, ease: "easeInOut" } : undefined}
          >
            <QRCodeCanvas
              id={canvasId}
              value={value}
              size={qrSize}
              level="H"
              marginSize={2}
              bgColor={qrColors.paper}
              fgColor={qrColors.ink}
            />
          </motion.div>
          <figcaption
            className={`mt-3 max-w-full text-center text-sm ${compact ? "text-ink" : "text-cream"}`}
          >
            {caption}
            <span className="sr-only">. QR Code do convite do LinkedIn de {name}.</span>
          </figcaption>
        </motion.div>
      </a>
    </figure>
  );
}
