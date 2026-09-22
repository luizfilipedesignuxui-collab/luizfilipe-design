/** Remove em/en dashes (travessões) from user-facing copy. */
export function stripTravessao(text: string): string {
  if (!text) return text;
  return text
    .replace(/\u2014/g, ":") // —
    .replace(/\u2013/g, "-") // –
    .replace(/\u2212/g, "-") // −
    .replace(/ : /g, ": ")
    .replace(/ {2,}/g, " ")
    .trim();
}

export function stripTravessaoDeep<T>(value: T): T {
  if (typeof value === "string") return stripTravessao(value) as T;
  if (Array.isArray(value)) return value.map((v) => stripTravessaoDeep(v)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = stripTravessaoDeep(v);
    }
    return out as T;
  }
  return value;
}
