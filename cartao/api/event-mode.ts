import type { IncomingMessage, ServerResponse } from "node:http";
import { handleEventMode, jsonResult, readJsonBody } from "../server/event-mode.ts";

type RequestWithBody = IncomingMessage & { body?: unknown };

export default async function handler(req: RequestWithBody, res: ServerResponse): Promise<void> {
  let body: unknown = null;
  if (req.method !== "GET") {
    if (typeof req.body === "string") {
      try {
        body = JSON.parse(req.body) as unknown;
      } catch {
        body = null;
      }
    } else if (req.body && typeof req.body === "object") {
      body = req.body;
    } else {
      body = await readJsonBody(req);
    }
  }

  const authorization = req.headers.authorization;
  const result = await handleEventMode({
    method: req.method ?? "GET",
    authorization: Array.isArray(authorization) ? (authorization[0] ?? "") : (authorization ?? ""),
    body,
  });
  res.statusCode = result.status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(jsonResult(result));
}
