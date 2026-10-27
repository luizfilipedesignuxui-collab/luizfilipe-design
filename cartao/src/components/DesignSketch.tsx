/** Traços finos de ferramentas de design, atrás do conteúdo. */
export function DesignSketch() {
  return (
    <div className="design-sketch" aria-hidden="true">
      <svg className="design-sketch-figma" viewBox="0 0 38 57">
        <rect x="0.6" y="0.6" width="36.8" height="55.8" rx="9.5" />
        <path d="M19 0.6v37.4M0.6 19h36.8M0.6 38h18.4" />
        <circle cx="28.5" cy="28.5" r="9" />
      </svg>
      <svg className="design-sketch-pen" viewBox="0 0 168 40">
        <path d="M46 12h92a8 8 0 0 1 0 16H46" />
        <path d="M46 12 18 18.5 6 20l12 1.5L46 28" />
        <path d="M18 18.5v3" />
        <path d="M62 12v16M74 12v16" />
        <path d="M118 8.5h16a3 3 0 0 1 3 3V12" />
        <path d="M6 20C18 18 28 28 40 26" />
      </svg>
    </div>
  );
}
