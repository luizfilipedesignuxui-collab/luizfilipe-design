import {
  isSurpriseContextId,
  isSurpriseDurationId,
  overlayCard,
  publicPhotoSrc,
  utcIsoToLocalInput,
  type PublicCardOverlay,
  type SurpriseContextId,
  type SurpriseDurationId,
} from "./surprise.ts";
import { businessCard, type BusinessCardConfig } from "../config/business-card.ts";

const TOKEN_KEY = "cartao:evento";

export type OwnerSettings = {
  context: SurpriseContextId;
  active: SurpriseContextId;
  duration: SurpriseDurationId;
  endsAtLocal: string;
  role: string;
  linkedinUrl: string;
  phoneDisplay: string;
  photoSrc: string;
};

export function readOwnerToken(): string {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

export function writeOwnerToken(token: string): void {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* armazenamento indisponível */
  }
}

function emptyOverlay(): PublicCardOverlay {
  return { context: "geral", role: "", linkedinUrl: "", phoneDisplay: "", photoSrc: "" };
}

export async function fetchPublicCard(): Promise<PublicCardOverlay> {
  try {
    const response = await fetch("/api/event-mode", { cache: "no-store" });
    if (!response.ok) return emptyOverlay();
    const data = (await response.json()) as Record<string, unknown>;
    if ("endsAt" in data || "duration" in data || "active" in data) return emptyOverlay();
    return {
      context: isSurpriseContextId(data.context) ? data.context : "geral",
      role: typeof data.role === "string" ? data.role : "",
      linkedinUrl: typeof data.linkedinUrl === "string" ? data.linkedinUrl : "",
      phoneDisplay: typeof data.phoneDisplay === "string" ? data.phoneDisplay : "",
      photoSrc: typeof data.photoSrc === "string" ? data.photoSrc : "",
    };
  } catch {
    return emptyOverlay();
  }
}

export async function loadLiveCard(): Promise<{ card: BusinessCardConfig; context: SurpriseContextId }> {
  const overlay = await fetchPublicCard();
  return { card: overlayCard(businessCard, overlay), context: overlay.context };
}

async function ownerPost(token: string, body: Record<string, unknown>): Promise<Response> {
  return fetch("/api/event-mode", {
    method: "POST",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
}

export async function loginOwner(code: string): Promise<{ ok: true; token: string } | { ok: false; message: string }> {
  try {
    const response = await ownerPost("", { action: "login", code });
    const data = (await response.json()) as { token?: unknown; error?: unknown };
    if (response.ok && typeof data.token === "string") return { ok: true, token: data.token };
    if (response.status === 503) {
      return { ok: false, message: "O código do proprietário ainda não foi configurado neste servidor." };
    }
    return { ok: false, message: "Código incorreto." };
  } catch {
    return { ok: false, message: "Não foi possível entrar. Tente de novo." };
  }
}

export async function readOwnerSettings(token: string): Promise<OwnerSettings | "denied" | "failed"> {
  try {
    const response = await ownerPost(token, { action: "read" });
    if (response.status === 401) return "denied";
    if (!response.ok) return "failed";
    const data = (await response.json()) as {
      context?: unknown;
      active?: unknown;
      duration?: unknown;
      endsAt?: unknown;
      role?: unknown;
      linkedinUrl?: unknown;
      phoneDisplay?: unknown;
      photoSrc?: unknown;
      photoRevision?: unknown;
    };
    if (!isSurpriseContextId(data.context) || !isSurpriseDurationId(data.duration)) return "failed";
    const revision = typeof data.photoRevision === "number" ? data.photoRevision : null;
    return {
      context: data.context,
      active: isSurpriseContextId(data.active) ? data.active : "geral",
      duration: data.duration,
      endsAtLocal: typeof data.endsAt === "string" ? utcIsoToLocalInput(data.endsAt) : "",
      role: typeof data.role === "string" ? data.role : "",
      linkedinUrl: typeof data.linkedinUrl === "string" ? data.linkedinUrl : "",
      phoneDisplay: typeof data.phoneDisplay === "string" ? data.phoneDisplay : "",
      photoSrc: typeof data.photoSrc === "string" && data.photoSrc ? data.photoSrc : publicPhotoSrc(revision),
    };
  } catch {
    return "failed";
  }
}

export async function saveOwnerSettings(
  token: string,
  input: {
    context: SurpriseContextId;
    duration: SurpriseDurationId;
    endsAtLocal: string;
    role: string;
    linkedinUrl: string;
    phoneDisplay: string;
    photoData?: string;
  },
): Promise<{ ok: true } | { ok: false; denied?: boolean; message: string }> {
  try {
    const response = await ownerPost(token, { action: "save", ...input });
    const data = (await response.json()) as { error?: unknown };
    if (response.status === 401) return { ok: false, denied: true, message: "Entre novamente." };
    if (!response.ok) {
      return {
        ok: false,
        message: typeof data.error === "string" ? data.error : "Não foi possível salvar.",
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "Não foi possível salvar. Tente de novo." };
  }
}

export function compressOwnerPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Envie uma imagem."));
      return;
    }
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      const size = 480;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Não foi possível preparar a foto."));
        return;
      }
      const scale = Math.max(size / image.width, size / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Não foi possível ler a foto."));
    };
    image.src = url;
  });
}
