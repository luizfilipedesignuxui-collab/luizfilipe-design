import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { handleCardPhoto, handleEventMode, jsonResult, readJsonBody } from "./event-mode.ts";

function header(req: IncomingMessage, name: string): string {
  const value = req.headers[name];
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

async function respond(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const result = await handleEventMode({
    method: req.method ?? "GET",
    authorization: header(req, "authorization"),
    body: req.method === "GET" ? null : await readJsonBody(req),
  });
  res.statusCode = result.status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(jsonResult(result));
}

async function respondPhoto(_req: IncomingMessage, res: ServerResponse): Promise<void> {
  const result = await handleCardPhoto();
  res.statusCode = result.status;
  res.setHeader("content-type", result.type);
  res.setHeader("cache-control", "no-store");
  res.end(result.body);
}

export function eventModeApi(): Plugin {
  return {
    name: "event-mode-api",
    configureServer(server) {
      server.middlewares.use("/api/event-mode", (req, res, next) => {
        void respond(req, res).catch(next);
      });
      server.middlewares.use("/api/card-photo", (req, res, next) => {
        void respondPhoto(req, res).catch(next);
      });
    },
  };
}
