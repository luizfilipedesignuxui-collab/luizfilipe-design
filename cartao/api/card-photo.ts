import type { IncomingMessage, ServerResponse } from "node:http";
import { handleCardPhoto } from "../server/event-mode.ts";

export default async function handler(_req: IncomingMessage, res: ServerResponse): Promise<void> {
  const result = await handleCardPhoto();
  res.statusCode = result.status;
  res.setHeader("content-type", result.type);
  res.setHeader("cache-control", "no-store");
  res.end(result.body);
}
