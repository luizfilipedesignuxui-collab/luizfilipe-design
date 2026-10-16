import { useEffect, useRef, useState } from "react";
import { MESSAGES } from "./content";
import { WhatsAppIcon, WhatsAppLink } from "./WhatsApp";

/** Shows once the hero is gone, hides over the final CTA. */
const FloatingWhatsApp = () => {
  const [heroVisible, setHeroVisible] = useState(true);
  const [finalVisible, setFinalVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const final = document.getElementById("cta-final");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) setHeroVisible(entry.isIntersecting);
          if (entry.target === final) setFinalVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.05 },
    );
    if (hero) io.observe(hero);
    if (final) io.observe(final);
    return () => io.disconnect();
  }, []);

  const visible = !heroVisible && !finalVisible;

  useEffect(() => {
    if (wrapperRef.current) wrapperRef.current.inert = !visible;
  }, [visible]);

  return (
    <div ref={wrapperRef} className="floating-wa" data-visible={visible}>
      <WhatsAppLink
        mensagem={MESSAGES.geral}
        origem="flutuante"
        ariaLabel="Pedir orçamento no WhatsApp"
        className="floating-wa__btn"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </WhatsAppLink>
    </div>
  );
};

export default FloatingWhatsApp;
