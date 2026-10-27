import { motion } from "framer-motion";
import type { RevealLayer } from "../../lib/reveal.ts";
import { hoverLift, press, usePrefersReducedMotion } from "../../lib/motion.ts";

type LayerNavProps = {
  onBack: () => void;
  onContact: () => void;
  current: RevealLayer;
};

export function LayerNav({ onBack, onContact, current }: LayerNavProps) {
  const reduced = usePrefersReducedMotion();
  const showBack = current === "connection";

  return (
    <nav
      className={`mx-auto grid w-full max-w-md gap-2 lg:max-w-xl ${showBack ? "grid-cols-2" : "grid-cols-1"}`}
      aria-label="Navegação do cartão"
    >
      {showBack ? (
        <motion.button
          type="button"
          className="btn btn-ink focus-ring-cream"
          onClick={onBack}
          whileHover={reduced ? undefined : hoverLift}
          whileTap={reduced ? undefined : press}
        >
          Voltar
        </motion.button>
      ) : null}
      <motion.button
        type="button"
        className="btn btn-accent focus-ring-cream"
        onClick={onContact}
        aria-current={current === "connection" ? "page" : undefined}
        whileHover={reduced ? undefined : hoverLift}
        whileTap={reduced ? undefined : press}
      >
        Contato
      </motion.button>
    </nav>
  );
}
