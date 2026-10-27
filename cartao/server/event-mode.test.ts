import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { GENERAL_SETTINGS } from "../src/lib/surprise.ts";
import {
  createFileStore,
  handleEventMode,
  issueSession,
  resetLoginLimiter,
  verifySession,
  type EventStore,
} from "./event-mode.ts";

const secret = "senha-de-teste";

function memoryStore(): EventStore & { current: () => Promise<unknown> } {
  let settings = GENERAL_SETTINGS;
  let photo: { bytes: Buffer; type: string } | null = null;
  return {
    read: async () => settings,
    write: async (next) => {
      settings = next;
    },
    readPhoto: async () => photo,
    writePhoto: async (bytes, type) => {
      photo = { bytes, type };
    },
    current: async () => settings,
  };
}

function post(
  body: Record<string, unknown>,
  store: EventStore,
  authorization = "",
  now = new Date("2026-10-27T15:00:00.000Z"),
) {
  return handleEventMode({ method: "POST", authorization, body, now }, { store, secret });
}

describe("sessão do proprietário", () => {
  it("aceita um token emitido e rejeita token alterado ou vencido", () => {
    const now = Date.parse("2026-10-27T15:00:00.000Z");
    const token = issueSession(secret, now);
    expect(verifySession(token, secret, now + 1000)).toBe(true);
    expect(verifySession(`${token}x`, secret, now + 1000)).toBe(false);
    expect(verifySession(token, "outra-senha", now + 1000)).toBe(false);
    expect(verifySession(token, secret, now + 13 * 60 * 60 * 1000)).toBe(false);
  });
});

describe("handleEventMode", () => {
  afterEach(() => {
    resetLoginLimiter();
  });

  it("entrega só o contexto ativo para quem visita", async () => {
    const store = memoryStore();
    await post(
      { action: "save", context: "networking", duration: "event", endsAtLocal: "2026-10-27T18:00" },
      store,
      `Bearer ${issueSession(secret, Date.parse("2026-10-27T15:00:00.000Z"))}`,
    );

    const visible = await handleEventMode(
      { method: "GET", authorization: "", body: null, now: new Date("2026-10-27T18:00:00.000Z") },
      { store, secret },
    );
    expect(visible.status).toBe(200);
    expect(visible.body.context).toBe("networking");
    expect(visible.body).not.toHaveProperty("duration");
    expect(visible.body).not.toHaveProperty("endsAt");

    const expired = await handleEventMode(
      { method: "GET", authorization: "", body: null, now: new Date("2026-10-27T21:00:00.000Z") },
      { store, secret },
    );
    expect(expired.body.context).toBe("geral");
  });

  it("nega leitura e gravação sem senha válida", async () => {
    const store = memoryStore();
    const denied = await post({ action: "login", password: "errada" }, store);
    expect(denied.status).toBe(401);
    expect(denied.body).not.toHaveProperty("token");

    const read = await post({ action: "read" }, store, "Bearer token-falso");
    expect(read.status).toBe(401);
    expect(read.body).not.toHaveProperty("context");

    const save = await post({ action: "save", context: "rh", duration: "until-change" }, store);
    expect(save.status).toBe(401);
    expect(await store.current()).toEqual(GENERAL_SETTINGS);
  });

  it("grava o contexto e o mantém até o proprietário mudar", async () => {
    const store = memoryStore();
    const login = await post({ action: "login", password: secret }, store);
    const token = String(login.body.token);
    const saved = await post(
      { action: "save", context: "negocios", duration: "until-change" },
      store,
      `Bearer ${token}`,
    );
    expect(saved.body.context).toBe("negocios");

    const later = await handleEventMode(
      { method: "GET", authorization: "", body: null, now: new Date("2027-01-01T00:00:00.000Z") },
      { store, secret },
    );
    expect(later.body.context).toBe("negocios");
  });

  it("calcula o fim do dia no servidor", async () => {
    const store = memoryStore();
    const token = issueSession(secret, Date.parse("2026-10-27T15:00:00.000Z"));
    await post({ action: "save", context: "rh", duration: "end-of-day" }, store, `Bearer ${token}`);
    expect(await store.current()).toMatchObject({
      context: "rh",
      duration: "end-of-day",
      endsAt: "2026-10-28T03:00:00.000Z",
    });
  });

  it("grava cargo, LinkedIn e WhatsApp e entrega isso aos visitantes", async () => {
    const store = memoryStore();
    const token = issueSession(secret, Date.parse("2026-10-27T15:00:00.000Z"));
    const saved = await post(
      {
        action: "save",
        context: "geral",
        duration: "until-change",
        role: "Product Designer",
        linkedinUrl: "https://www.linkedin.com/in/luiz-filipe-cardoso",
        phoneDisplay: "+55 62 99447-4978",
      },
      store,
      `Bearer ${token}`,
    );
    expect(saved.status).toBe(200);
    expect(saved.body.role).toBe("Product Designer");
    expect(saved.body.phoneDisplay).toBe("+55 62 99447-4978");

    const visible = await handleEventMode(
      { method: "GET", authorization: "", body: null, now: new Date("2026-10-27T18:00:00.000Z") },
      { store, secret },
    );
    expect(visible.body.role).toBe("Product Designer");
    expect(visible.body).not.toHaveProperty("endsAt");
  });

  it("recusa o acesso quando o servidor não tem senha", async () => {
    const result = await handleEventMode(
      { method: "POST", authorization: "", body: { action: "login", password: secret } },
      { store: memoryStore(), secret: "" },
    );
    expect(result.status).toBe(503);
  });
});

describe("createFileStore", () => {
  it("relê a configuração depois de gravar", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "cartao-evento-"));
    try {
      const store = createFileStore(path.join(dir, "event-mode.json"));
      await store.write({
        context: "rh",
        duration: "until-change",
        endsAt: null,
        role: "Product Designer",
        linkedinUrl: "https://www.linkedin.com/in/luiz-filipe-cardoso",
        phoneDisplay: "+55 62 99447-4978",
        photoRevision: null,
      });
      await expect(store.read()).resolves.toMatchObject({
        context: "rh",
        duration: "until-change",
        endsAt: null,
        role: "Product Designer",
      });
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
