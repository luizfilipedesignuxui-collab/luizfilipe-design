import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const MOBILE_QUERY = "(max-width: 767px)";
/** Sections that run content (or edge-to-edge carousels) under the name. */
const HIDE_OVER = {
  mobile: ["habilidades", "processo"],
  desktop: ["posicionamento", "habilidades", "processo"],
};

/** Giant vertical name pinned to the right edge for the whole page. */
const SideName = () => {
  const { t } = useLanguage();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    let frame = 0;

    // Mobile: the name only covers the bottom half, so any overlap there counts.
    // Desktop: the name spans the full height, so the section crossing the screen's middle decides.
    const check = () => {
      frame = 0;
      const h = window.innerHeight;
      const ids = mql.matches ? HIDE_OVER.mobile : HIDE_OVER.desktop;
      const over = ids.some((id) => {
        const r = document.getElementById(id)?.getBoundingClientRect();
        if (!r) return false;
        return mql.matches ? r.bottom > h / 2 && r.top < h : r.top < h / 2 && r.bottom > h / 2;
      });
      setHidden(over);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mql.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mql.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <h1 className="side-name font-display" data-hidden={hidden}>
      Luiz Filipe
      <span className="sr-only"> · {t("hero.role")}</span>
    </h1>
  );
};

export default SideName;
