import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const BLOCKERS = [
  "header a",
  "header button",
  "main p",
  "main li",
  "main img",
  "main h2",
  "main h3",
  "main a",
  "main button",
  ".btn-on-paper",
  ".btn-on-paper-outline",
  ".btn-on-brand",
  ".btn-whatsapp",
  ".hero-panel .font-display",
  ".hero-panel .font-label",
].join(",");

const overlaps = (a: DOMRect, b: DOMRect, pad = 6) =>
  !(b.right < a.left + pad || b.left > a.right - pad || b.bottom < a.top + pad || b.top > a.bottom - pad);

const textOverlapsName = (node: Element, name: DOMRect) => {
  const range = document.createRange();
  range.selectNodeContents(node);
  return [...range.getClientRects()].some((r) => r.width > 2 && r.height > 2 && overlaps(name, r));
};

/** Giant vertical name pinned to the right edge for the whole page. */
const SideName = ({ role }: { role?: string }) => {
  const { t } = useLanguage();
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const nameEl = nameRef.current;
    if (!nameEl) return;
    let frame = 0;

    const check = () => {
      frame = 0;
      const name = nameEl.getBoundingClientRect();
      if (name.width < 2 || name.height < 2) {
        setHidden(false);
        return;
      }
      const hit = [...document.querySelectorAll(BLOCKERS)].some((node) => {
        if (node === nameEl || nameEl.contains(node)) return false;
        const tag = node.tagName;
        if (tag === "IMG") return overlaps(name, node.getBoundingClientRect(), 2);
        if (
          tag === "H2" ||
          tag === "H3" ||
          tag === "P" ||
          tag === "A" ||
          tag === "BUTTON" ||
          tag === "LI" ||
          node.classList.contains("font-display") ||
          node.classList.contains("font-label")
        ) {
          return textOverlapsName(node, name);
        }
        return overlaps(name, node.getBoundingClientRect());
      });
      setHidden(hit);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    nameEl.addEventListener("animationend", schedule);
    document.fonts?.ready.then(schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    const afterType = window.setTimeout(schedule, 400);
    const afterHero = window.setTimeout(schedule, 1200);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      nameEl.removeEventListener("animationend", schedule);
      observer.disconnect();
      window.clearTimeout(afterType);
      window.clearTimeout(afterHero);
    };
  }, []);

  return (
    <h1 ref={nameRef} className="side-name font-display" data-hidden={hidden}>
      Luiz Filipe
      <span className="sr-only"> · {role ?? t("hero.role")}</span>
    </h1>
  );
};

export default SideName;
