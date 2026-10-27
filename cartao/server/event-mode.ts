import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import type { IncomingMessage } from "node:http";
import path from "node:path";
import {
  endOfLocalDayIso,
  eventLocalInputToUtc,
  GENERAL_SETTINGS,
  isSurpriseContextId,
  isSurpriseDurationId,
  normalizeSettings,
  publicPhotoSrc,
  resolveActiveContext,
  type EventSettings,
  type SurpriseContextId,
  type SurpriseDurationId,
} from "../src/lib/surprise.ts";

const SESSION_MS = 12 * 60 * 60 * 1000;
const LOGIN_LIMIT = 8;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export type EventStore = {
  read: () => Promise<EventSettings>;
  write: (settings: EventSettings) => Promise<void>;
  readPhoto: () => Promise<{ bytes: Buffer; type: string } | null>;
  writePhoto: (bytes: Buffer, type: string) => Promise<void>;
};

export type EventInput = {
  method: string;
  authorization: string;
  body: unknown;
  now?: Date;
};

export type EventResult = {
  status: number;
  body: Record<string, unknown>;
};

type LoginBucket = { failures: number; resetAt: number };

const loginBuckets = new Map<string, LoginBucket>();

export function resetLoginLimiter(): void {
  loginBuckets.clear();
}

export function createFileStore(filePath: string): EventStore {
  let queue: Promise<void> = Promise.resolve();
  const photoPath = path.join(path.dirname(filePath), "card-photo.bin");
  const photoTypePath = path.join(path.dirname(filePath), "card-photo.type");

  function enqueue<T>(job: () => Promise<T>): Promise<T> {
    const run = queue.then(job, job);
    queue = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  return {
    read: () =>
      enqueue(async () => {
        try {
          return normalizeSettings(JSON.parse(await readFile(filePath, "utf8")) as unknown);
        } catch {
          return GENERAL_SETTINGS;
        }
      }),
    write: (settings) =>
      enqueue(async () => {
        await mkdir(path.dirname(filePath), { recursive: true });
        const next = path.join(path.dirname(filePath), `.${path.basename(filePath)}.tmp`);
        await writeFile(next, `${JSON.stringify(normalizeSettings(settings))}\n`, "utf8");
        await rename(next, filePath);
      }),
    readPhoto: () =>
      enqueue(async () => {
        try {
          const [bytes, type] = await Promise.all([readFile(photoPath), readFile(photoTypePath, "utf8")]);
          const mime = type.trim();
          if (!mime.startsWith("image/")) return null;
          return { bytes, type: mime };
        } catch {
          return null;
        }
      }),
    writePhoto: (bytes, type) =>
      enqueue(async () => {
        await mkdir(path.dirname(filePath), { recursive: true });
        await writeFile(photoPath, bytes);
        await writeFile(photoTypePath, `${type}\n`, "utf8");
      }),
  };
}

export function defaultStorePath(): string {
  return path.join(process.cwd(), ".data", "event-mode.json");
}

export async function readOwnerSecret(): Promise<string> {
  const fromEnv = process.env.EVENT_OWNER_SECRET?.trim() ?? "";
  if (fromEnv) return fromEnv;
  try {
    return (await readFile(path.join(process.cwd(), ".event-owner.local"), "utf8")).trim();
  } catch {
    return "";
  }
}

function sameSecret(input: string, secret: string): boolean {
  const left = createHash("sha256").update(input).digest();
  const right = createHash("sha256").update(secret).digest();
  return timingSafeEqual(left, right);
}

function sessionKey(secret: string): string {
  return createHash("sha256").update(`cartao-evento:${secret}`).digest("base64url");
}

export function issueSession(secret: string, now: number): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: now + SESSION_MS, nonce: randomBytes(8).toString("base64url") }),
  ).toString("base64url");
  const signature = createHmac("sha256", sessionKey(secret)).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifySession(token: string, secret: string, now: number): boolean {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = createHmac("sha256", sessionKey(secret)).update(payload).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: unknown };
    return typeof data.exp === "number" && data.exp > now;
  } catch {
    return false;
  }
}

function bearer(authorization: string): string {
  const match = /^Bearer\s+(\S+)$/i.exec(authorization.trim());
  return match?.[1] ?? "";
}

function loginBlocked(key: string, now: number): boolean {
  const bucket = loginBuckets.get(key);
  if (!bucket) return false;
  if (bucket.resetAt <= now) {
    loginBuckets.delete(key);
    return false;
  }
  return bucket.failures >= LOGIN_LIMIT;
}

function recordLoginFailure(key: string, now: number): void {
  const bucket = loginBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    loginBuckets.set(key, { failures: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }
  bucket.failures += 1;
}

function clearLoginFailures(key: string): void {
  loginBuckets.delete(key);
}

function publicBody(settings: EventSettings, now: Date): EventResult {
  return {
    status: 200,
    body: {
      context: resolveActiveContext(settings, now) satisfies SurpriseContextId,
      role: settings.role,
      linkedinUrl: settings.linkedinUrl,
      phoneDisplay: settings.phoneDisplay,
      photoSrc: publicPhotoSrc(settings.photoRevision),
    },
  };
}

type SaveBody = {
  action?: unknown;
  password?: unknown;
  context?: unknown;
  duration?: unknown;
  endsAtLocal?: unknown;
  role?: unknown;
  linkedinUrl?: unknown;
  phoneDisplay?: unknown;
  photoData?: unknown;
};

const PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const PHOTO_MAX = 400_000;

function parsePhotoData(value: unknown): { bytes: Buffer; type: string } | { error: string } | null {
  if (value == null || value === "") return null;
  if (typeof value !== "string") return { error: "A foto enviada é inválida." };
  const match = /^data:(image\/jpeg|image\/png|image\/webp);base64,([A-Za-z0-9+/=\s]+)$/.exec(value.trim());
  if (!match) return { error: "Envie uma foto em JPEG, PNG ou WebP." };
  const type = match[1];
  const bytes = Buffer.from(match[2], "base64");
  if (!PHOTO_TYPES.has(type) || bytes.length < 32) return { error: "A foto enviada é inválida." };
  if (bytes.length > PHOTO_MAX) return { error: "A foto precisa ter menos de 400 KB." };
  return { bytes, type };
}

function ownerLinkedinUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const inIndex = parts.findIndex((part) => part.toLowerCase() === "in");
    const handle = inIndex >= 0 ? parts[inIndex + 1] : parts.at(-1);
    return handle ? `https://www.linkedin.com/in/${handle}` : "";
  } catch {
    return "";
  }
}

function ownerWhatsAppValid(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  if (!digits) return false;
  const normalized =
    !digits.startsWith("55") && (digits.length === 10 || digits.length === 11) ? `55${digits}` : digits;
  if (normalized.length < 12 || normalized.length > 15) return false;
  if (normalized.startsWith("55") && normalized.length !== 12 && normalized.length !== 13) return false;
  return true;
}

function parseProfile(body: SaveBody):
  | { role: string; linkedinUrl: string; phoneDisplay: string }
  | { error: string } {
  const role = typeof body.role === "string" ? body.role.trim().slice(0, 160) : "";
  const linkedinRaw = typeof body.linkedinUrl === "string" ? body.linkedinUrl.trim() : "";
  const phoneRaw = typeof body.phoneDisplay === "string" ? body.phoneDisplay.trim() : "";
  const linkedinUrl = linkedinRaw ? ownerLinkedinUrl(linkedinRaw) : "";
  if (linkedinRaw && !linkedinUrl) return { error: "Informe um endereço válido do LinkedIn." };
  if (phoneRaw && !ownerWhatsAppValid(phoneRaw)) return { error: "Informe um WhatsApp válido, com DDD." };
  return { role, linkedinUrl, phoneDisplay: phoneRaw };
}

export async function handleEventMode(
  input: EventInput,
  deps?: { store?: EventStore; secret?: string },
): Promise<EventResult> {
  const now = input.now ?? new Date();
  const store = deps?.store ?? createFileStore(defaultStorePath());
  const secret = deps?.secret ?? (await readOwnerSecret());
  const method = input.method.toUpperCase();
  const body = (input.body ?? {}) as SaveBody;

  if (method === "GET") {
    return publicBody(await store.read(), now);
  }

  if (method !== "POST") {
    return { status: 405, body: { error: "Método não aceito." } };
  }

  if (!secret) {
    return {
      status: 503,
      body: { error: "O acesso do proprietário ainda não foi configurado neste servidor." },
    };
  }

  if (body.action === "login") {
    const password = typeof body.password === "string" ? body.password : "";
    if (!password || password.length > 200 || loginBlocked("owner", now.getTime())) {
      return { status: 401, body: { error: "Acesso negado." } };
    }
    if (!sameSecret(password, secret)) {
      recordLoginFailure("owner", now.getTime());
      return { status: 401, body: { error: "Acesso negado." } };
    }
    clearLoginFailures("owner");
    return { status: 200, body: { token: issueSession(secret, now.getTime()) } };
  }

  if (!verifySession(bearer(input.authorization), secret, now.getTime())) {
    return { status: 401, body: { error: "Acesso negado." } };
  }

  if (body.action === "read") {
    const settings = await store.read();
    return {
      status: 200,
      body: {
        context: settings.context,
        active: resolveActiveContext(settings, now),
        duration: settings.duration,
        endsAt: settings.endsAt,
        role: settings.role,
        linkedinUrl: settings.linkedinUrl,
        phoneDisplay: settings.phoneDisplay,
        photoSrc: publicPhotoSrc(settings.photoRevision),
      },
    };
  }

  if (body.action !== "save") {
    return { status: 400, body: { error: "Ação desconhecida." } };
  }

  if (!isSurpriseContextId(body.context) || !isSurpriseDurationId(body.duration)) {
    return { status: 400, body: { error: "Contexto ou duração inválidos." } };
  }

  const profile = parseProfile(body);
  if ("error" in profile) return { status: 400, body: { error: profile.error } };
  const current = await store.read();
  const photo = parsePhotoData(body.photoData);
  if (photo && "error" in photo) return { status: 400, body: { error: photo.error } };
  const photoRevision = photo ? (current.photoRevision ?? 0) + 1 : current.photoRevision;
  const saved = settingsFromRequest(body.context, body.duration, body.endsAtLocal, now, {
    ...profile,
    photoRevision,
  });
  if ("error" in saved) return { status: 400, body: { error: saved.error } };
  if (photo) await store.writePhoto(photo.bytes, photo.type);
  await store.write(saved);
  return publicBody(saved, now);
}

function settingsFromRequest(
  context: SurpriseContextId,
  duration: SurpriseDurationId,
  endsAtLocal: unknown,
  now: Date,
  profile: Pick<EventSettings, "role" | "linkedinUrl" | "phoneDisplay" | "photoRevision">,
): EventSettings | { error: string } {
  if (context === "geral") return { ...GENERAL_SETTINGS, ...profile };
  if (duration === "until-change") return { context, duration, endsAt: null, ...profile };
  if (duration === "end-of-day") return { context, duration, endsAt: endOfLocalDayIso(now), ...profile };
  const local = typeof endsAtLocal === "string" ? endsAtLocal : "";
  const endsAt = eventLocalInputToUtc(local);
  if (!endsAt) return { error: "Informe a data e a hora de encerramento." };
  if (Date.parse(endsAt) <= now.getTime()) return { error: "O encerramento precisa ser depois de agora." };
  return { context, duration: "event", endsAt, ...profile };
}

export async function handleCardPhoto(
  store?: EventStore,
): Promise<{ status: number; type: string; body: Buffer | string }> {
  const photo = await (store ?? createFileStore(defaultStorePath())).readPhoto();
  if (!photo) return { status: 404, type: "application/json; charset=utf-8", body: JSON.stringify({ error: "Foto não encontrada." }) };
  return { status: 200, type: photo.type, body: photo.bytes };
}

export async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function jsonResult(result: EventResult): string {
  return JSON.stringify(result.body);
}
