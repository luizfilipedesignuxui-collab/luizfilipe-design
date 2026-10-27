import { Layers, Store } from "lucide-react";
import { ActionIcon } from "./ActionIcon.tsx";

export type ChannelId = "whatsapp" | "linkedin" | "email" | "portfolio" | "website";

const markClass: Record<ChannelId, string> = {
  whatsapp: "bg-brand-whatsapp",
  linkedin: "bg-brand-linkedin",
  email: "bg-ink",
  portfolio: "bg-media",
  website: "bg-accent",
};

type ChannelMarkProps = {
  id: ChannelId;
  active?: boolean;
};

function MarkGlyph({ id }: { id: ChannelId }) {
  if (id === "portfolio") return <Layers className="size-6 text-cream" strokeWidth={2.25} aria-hidden="true" />;
  if (id === "website") return <Store className="size-6 text-cream" strokeWidth={2.25} aria-hidden="true" />;
  return <ActionIcon id={id} tone="onMedia" size="md" />;
}

export function ChannelMark({ id, active = false }: ChannelMarkProps) {
  return (
    <span
      className={`channel-dot grid size-12 place-items-center rounded-full ${markClass[id]} ${
        active ? "channel-dot-active" : ""
      }`}
      aria-hidden="true"
    >
      <MarkGlyph id={id} />
    </span>
  );
}
