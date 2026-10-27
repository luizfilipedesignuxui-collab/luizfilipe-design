import type { BusinessCardConfig } from "../config/business-card.ts";

/** Fuso do cartão. O fim do dia é calculado neste fuso, no servidor. */
export const CARD_TIME_ZONE = "America/Sao_Paulo";

export const SURPRISE_CONTEXTS = ["geral", "networking", "rh", "negocios"] as const;

export type SurpriseContextId = (typeof SURPRISE_CONTEXTS)[number];

export const SURPRISE_DURATIONS = ["event", "end-of-day", "until-change"] as const;

export type SurpriseDurationId = (typeof SURPRISE_DURATIONS)[number];

export type EventSettings = {
  context: SurpriseContextId;
  duration: SurpriseDurationId;
  /** Instante UTC em que o contexto expira. Nulo quando a duração é até nova alteração. */
  endsAt: string | null;
  role: string;
  linkedinUrl: string;
  phoneDisplay: string;
  photoRevision: number | null;
};

export type PublicCardOverlay = {
  context: SurpriseContextId;
  role: string;
  linkedinUrl: string;
  phoneDisplay: string;
  photoSrc: string;
};

export type SurpriseCopy = {
  kicker: string;
  title: string;
  body: string;
  message: string;
  cta: string;
};

const CONTEXT_LABEL: Record<SurpriseContextId, string> = {
  geral: "Modo geral",
  networking: "Networking profissional",
  rh: "Eventos de RH e carreira",
  negocios: "Negócios e parcerias",
};

export function surpriseContextLabel(id: SurpriseContextId): string {
  return CONTEXT_LABEL[id];
}

export function isSurpriseContextId(value: unknown): value is SurpriseContextId {
  return typeof value === "string" && (SURPRISE_CONTEXTS as readonly string[]).includes(value);
}

export function isSurpriseDurationId(value: unknown): value is SurpriseDurationId {
  return typeof value === "string" && (SURPRISE_DURATIONS as readonly string[]).includes(value);
}

const EMPTY_PROFILE = {
  role: "",
  linkedinUrl: "",
  phoneDisplay: "",
  photoRevision: null,
} as const;

export const GENERAL_SETTINGS: EventSettings = {
  context: "geral",
  duration: "until-change",
  endsAt: null,
  ...EMPTY_PROFILE,
};

function readProfile(record: Partial<EventSettings>): Pick<EventSettings, "role" | "linkedinUrl" | "phoneDisplay" | "photoRevision"> {
  const role = typeof record.role === "string" ? record.role.trim().slice(0, 160) : "";
  const linkedinUrl = typeof record.linkedinUrl === "string" ? record.linkedinUrl.trim().slice(0, 200) : "";
  const phoneDisplay = typeof record.phoneDisplay === "string" ? record.phoneDisplay.trim().slice(0, 40) : "";
  const photoRevision =
    typeof record.photoRevision === "number" && Number.isInteger(record.photoRevision) && record.photoRevision > 0
      ? record.photoRevision
      : null;
  return { role, linkedinUrl, phoneDisplay, photoRevision };
}

export function publicPhotoSrc(revision: number | null): string {
  return revision ? `/api/card-photo?v=${revision}` : "";
}

export function overlayCard(card: BusinessCardConfig, overlay: PublicCardOverlay): BusinessCardConfig {
  return {
    ...card,
    role: overlay.role.trim() || card.role,
    linkedinUrl: overlay.linkedinUrl.trim() || card.linkedinUrl,
    phoneDisplay: overlay.phoneDisplay.trim() || card.phoneDisplay,
    photoSrc: overlay.photoSrc.trim() || card.photoSrc,
  };
}

type CardFacts = Pick<
  BusinessCardConfig,
  "firstName" | "role" | "summary" | "practiceLine" | "specialty" | "competencies"
>;

function facts(card: CardFacts): string {
  return [card.specialty, card.practiceLine, card.summary, ...card.competencies]
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ");
}

/** Texto da revelação. Só usa o que está na ficha. */
export function buildSurpriseCopy(card: CardFacts, context: SurpriseContextId): SurpriseCopy {
  const name = card.firstName.trim() || "Luiz";
  const role = card.role.trim();
  const practice = card.practiceLine.trim();
  const summary = card.summary.trim();
  const areas = card.competencies.map((item) => item.trim()).filter(Boolean);
  const areaLine = areas.length > 0 ? areas.join(", ") : card.specialty.trim();

  if (context === "networking") {
    return {
      kicker: "Isso não é small talk",
      title: "O crachá acabou. A conversa não.",
      body: `${practice} ${name} trabalha com ${areaLine}. O networking só esquenta quando vira papo de verdade.`.trim(),
      message: role
        ? `Oi, ${name}. A gente se cruzou no networking. Seu cartão de ${role} não parece crachá, parece um convite. Quero trocar ideia sobre ${areaLine}, sem pitch e sem pressa.`
        : `Oi, ${name}. A gente se cruzou no networking. Seu cartão não parece crachá, parece um convite. Quero trocar ideia sobre ${areaLine}, sem pitch e sem pressa.`,
      cta: "Trocar ideia",
    };
  }

  if (context === "rh") {
    return {
      kicker: "Olha o percurso",
      title: "Aqui o currículo respira.",
      body: role
        ? `Não há uma vaga anunciada neste cartão. Há um percurso: ${name} atua como ${role}, com ${areaLine}.`
        : `Não há uma vaga anunciada neste cartão. Há um percurso em ${areaLine}.`,
      message: role
        ? `Oi, ${name}. Te encontrei num evento de RH e carreira. Não vim com vaga na manga. Vim porque seu percurso como ${role} em ${areaLine} pede uma conversa de verdade.`
        : `Oi, ${name}. Te encontrei num evento de RH e carreira. Não vim com vaga na manga. Vim porque seu percurso em ${areaLine} pede uma conversa de verdade.`,
      cta: "Falar do percurso",
    };
  }

  if (context === "negocios") {
    return {
      kicker: "Antes do contrato",
      title: "Primeiro a pergunta. Depois o negócio.",
      body: `${practice || summary || facts(card)} Uma parceria não está combinada neste cartão. Ela só existe se a conversa fizer sentido para os dois.`.trim(),
      message: `Oi, ${name}. Te encontrei num encontro de negócios. Vi ${areaLine} e fiquei com uma pergunta, não com uma proposta. Se fizer sentido para os dois, a gente continua.`,
      cta: "Fazer a pergunta",
    };
  }

  return {
    kicker: "Temos algo em comum",
    title: summary || "A conversa começa agora.",
    body: practice || facts(card),
    message: role
      ? `Oi, ${name}. Parei no seu cartão e não consegui seguir em frente. ${role}. Quero ver o que vem depois do Figma.`
      : `Oi, ${name}. Parei no seu cartão e não consegui seguir em frente. Quero ver o que vem depois do Figma.`,
    cta: "Continuar no LinkedIn",
  };
}

function localParts(now: Date, timeZone: string): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: read("year"), month: read("month"), day: read("day") };
}

function timeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  const asUtc = Date.UTC(read("year"), read("month") - 1, read("day"), read("hour"), read("minute"), read("second"));
  return asUtc - date.getTime();
}

/** Converte um horário civil do fuso do cartão para um instante UTC. */
export function zonedCivilToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone = CARD_TIME_ZONE,
): Date {
  const guess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const offset = timeZoneOffsetMs(guess, timeZone);
  const utc = new Date(guess.getTime() - offset);
  const correction = timeZoneOffsetMs(utc, timeZone) - offset;
  return correction === 0 ? utc : new Date(utc.getTime() - correction);
}

/** Primeiro instante do dia seguinte no fuso do cartão. */
export function endOfLocalDayIso(now: Date, timeZone = CARD_TIME_ZONE): string {
  const { year, month, day } = localParts(now, timeZone);
  const next = new Date(Date.UTC(year, month - 1, day));
  next.setUTCDate(next.getUTCDate() + 1);
  return zonedCivilToUtc(
    next.getUTCFullYear(),
    next.getUTCMonth() + 1,
    next.getUTCDate(),
    0,
    0,
    timeZone,
  ).toISOString();
}

/** Lê `YYYY-MM-DDTHH:mm` como horário do fuso do cartão. */
export function eventLocalInputToUtc(value: string, timeZone = CARD_TIME_ZONE): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const [, year, month, day, hour, minute] = match;
  const date = zonedCivilToUtc(Number(year), Number(month), Number(day), Number(hour), Number(minute), timeZone);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function resolveActiveContext(settings: EventSettings, now: Date): SurpriseContextId {
  if (settings.context === "geral") return "geral";
  if (settings.duration === "until-change") return settings.context;
  if (!settings.endsAt) return "geral";
  const ends = Date.parse(settings.endsAt);
  if (Number.isNaN(ends) || ends <= now.getTime()) return "geral";
  return settings.context;
}

export function normalizeSettings(value: unknown): EventSettings {
  if (!value || typeof value !== "object") return GENERAL_SETTINGS;
  const record = value as Partial<EventSettings>;
  const profile = readProfile(record);
  const context = isSurpriseContextId(record.context) ? record.context : "geral";
  if (context === "geral") return { ...GENERAL_SETTINGS, ...profile };
  const duration = isSurpriseDurationId(record.duration) ? record.duration : "until-change";
  if (duration === "until-change") return { context, duration, endsAt: null, ...profile };
  const endsAt =
    typeof record.endsAt === "string" && !Number.isNaN(Date.parse(record.endsAt))
      ? new Date(record.endsAt).toISOString()
      : null;
  if (!endsAt) return { ...GENERAL_SETTINGS, ...profile };
  return { context, duration, endsAt, ...profile };
}

/** Horário civil de Brasília, no formato do campo `datetime-local`. */
export function utcIsoToLocalInput(iso: string, timeZone = CARD_TIME_ZONE): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${read("year")}-${read("month")}-${read("day")}T${read("hour")}:${read("minute")}`;
}
