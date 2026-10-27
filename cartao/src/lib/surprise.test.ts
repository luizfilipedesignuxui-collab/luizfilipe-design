import { describe, expect, it } from "vitest";
import { businessCard } from "../config/business-card.ts";
import {
  buildSurpriseCopy,
  endOfLocalDayIso,
  eventLocalInputToUtc,
  overlayCard,
  publicPhotoSrc,
  resolveActiveContext,
  utcIsoToLocalInput,
} from "./surprise.ts";

describe("resolveActiveContext", () => {
  const now = new Date("2026-10-27T18:00:00.000Z");

  it("volta ao modo geral quando o instante de encerramento já passou", () => {
    expect(
      resolveActiveContext(
        {
          context: "rh",
          duration: "event",
          endsAt: "2026-10-27T17:00:00.000Z",
          role: "",
          linkedinUrl: "",
          phoneDisplay: "",
          photoRevision: null,
        },
        now,
      ),
    ).toBe("geral");
  });

  it("mantém o contexto enquanto o encerramento está no futuro", () => {
    expect(
      resolveActiveContext(
        {
          context: "networking",
          duration: "end-of-day",
          endsAt: "2026-10-28T02:59:00.000Z",
          role: "",
          linkedinUrl: "",
          phoneDisplay: "",
          photoRevision: null,
        },
        now,
      ),
    ).toBe("networking");
  });

  it("mantém o contexto até uma nova alteração", () => {
    expect(
      resolveActiveContext(
        {
          context: "negocios",
          duration: "until-change",
          endsAt: null,
          role: "",
          linkedinUrl: "",
          phoneDisplay: "",
          photoRevision: null,
        },
        now,
      ),
    ).toBe("negocios");
  });

  it("modo geral ignora um encerramento antigo", () => {
    expect(
      resolveActiveContext(
        {
          context: "geral",
          duration: "until-change",
          endsAt: "2020-01-01T00:00:00.000Z",
          role: "Cargo novo",
          linkedinUrl: "",
          phoneDisplay: "",
          photoRevision: null,
        },
        now,
      ),
    ).toBe("geral");
  });
});

describe("endOfLocalDayIso", () => {
  it("encerra à meia-noite de São Paulo, não no relógio do navegador", () => {
    expect(endOfLocalDayIso(new Date("2026-10-27T15:00:00.000Z"))).toBe("2026-10-28T03:00:00.000Z");
  });
});

describe("eventLocalInputToUtc", () => {
  it("interpreta o horário do evento em São Paulo", () => {
    expect(eventLocalInputToUtc("2026-10-27T18:00")).toBe("2026-10-27T21:00:00.000Z");
    expect(eventLocalInputToUtc("27/10/2026 18:00")).toBeNull();
    expect(utcIsoToLocalInput("2026-10-27T21:00:00.000Z")).toBe("2026-10-27T18:00");
  });
});

describe("overlayCard", () => {
  it("só troca o que o dono salvou", () => {
    const next = overlayCard(businessCard, {
      context: "geral",
      role: "Product Designer",
      linkedinUrl: "https://www.linkedin.com/in/luiz-filipe-cardoso",
      phoneDisplay: "+55 62 99999-0000",
      photoSrc: "/api/card-photo?v=2",
    });
    expect(next.role).toBe("Product Designer");
    expect(next.phoneDisplay).toBe("+55 62 99999-0000");
    expect(next.photoSrc).toBe("/api/card-photo?v=2");
    expect(next.fullName).toBe(businessCard.fullName);
    expect(publicPhotoSrc(null)).toBe("");
    expect(publicPhotoSrc(3)).toBe("/api/card-photo?v=3");
  });
});

describe("buildSurpriseCopy", () => {
  it("não inventa vaga, parceria fechada nem compatibilidade", () => {
    for (const context of ["geral", "networking", "rh", "negocios"] as const) {
      const copy = buildSurpriseCopy(businessCard, context);
      expect(copy.body).not.toMatch(/compatív|vaga aberta|parceria fechada|interesse mútuo/i);
      expect(copy.message.startsWith("Olá, Luiz!")).toBe(true);
    }
    expect(buildSurpriseCopy(businessCard, "rh").body).toContain("Não há uma vaga anunciada");
    expect(buildSurpriseCopy(businessCard, "negocios").body).toContain("não está combinada");
    expect(buildSurpriseCopy(businessCard, "networking").body).toContain(businessCard.practiceLine);
  });
});
