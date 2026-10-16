import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { MESSAGES } from "./content";
import { WhatsAppIcon, WhatsAppLink } from "./WhatsApp";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const STRIP_HEIGHT = 40;

type SitesHeaderProps = {
  showStrip: boolean;
  onCloseStrip: () => void;
};

const SitesHeader = ({ showStrip, onCloseStrip }: SitesHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setHidden(window.scrollY > 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md font-medium"
      >
        Pular para o conteúdo
      </a>

      {showStrip && (
        <div
          className="absolute inset-x-0 top-0 z-[55] flex items-center justify-center gap-2 px-12 text-center text-sm font-medium text-white"
          style={{ background: "var(--color-brand-hover)", height: STRIP_HEIGHT }}
          role="region"
          aria-label="Bônus para quem veio pelo cartão"
        >
          <p className="m-0 leading-tight">
            <span className="hidden sm:inline">Veio pelo cartão? Te passo o valor do seu site no WhatsApp. </span>
            <span className="sm:hidden">Veio pelo cartão? </span>
            <WhatsAppLink
              mensagem={MESSAGES.cartao}
              origem="cartao"
              className="font-extrabold underline underline-offset-4 whitespace-nowrap"
            >
              Pedir meu orçamento →
            </WhatsAppLink>
          </p>
          <button
            type="button"
            onClick={onCloseStrip}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/15"
            aria-label="Fechar aviso do cartão"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 transition-[top,transform] duration-300 focus-within:translate-y-0 ${
          hidden ? "-translate-y-[130%]" : "translate-y-0"
        }`}
        style={{ top: showStrip && !scrolled ? STRIP_HEIGHT : 0 }}
      >
        <div className="relative mx-auto max-w-6xl h-[60px] sm:h-[68px]">
          <div
            className={`pointer-events-none absolute inset-0 rounded-full border border-border shadow-[0_10px_30px_-12px_rgba(38,33,30,0.12)] backdrop-blur-md transition-[background-color] duration-300 ${
              scrolled ? "bg-white/70" : "bg-white/40"
            }`}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full flex items-center justify-between gap-2 px-1.5 sm:px-2 min-w-0">
            <a
              href="#topo"
              className={`flex items-center shrink-0 rounded-full bg-white ring-1 ring-border px-3.5 sm:px-6 h-10 sm:h-12 shadow-sm select-none ${focusRing}`}
              aria-label="Luiz Filipe, voltar ao topo"
            >
              <span className="font-display text-sm sm:text-base font-extrabold text-foreground">
                Luiz<span style={{ color: "var(--color-brand)" }}>.</span>Filipe
              </span>
            </a>

            <WhatsAppLink
              mensagem={MESSAGES.geral}
              origem="header"
              ariaLabel="Pedir orçamento no WhatsApp"
              className={`inline-flex min-w-0 shrink items-center justify-center gap-1.5 sm:gap-3 rounded-full bg-brand px-3 sm:pl-6 sm:pr-5 h-10 sm:h-12 text-sm sm:text-[1.2rem] font-extrabold text-white shadow-sm hover:bg-brand-hover hover:text-white transition-colors ${focusRing}`}
            >
              <WhatsAppIcon className="w-5 h-5 sm:hidden" />
              <span className="sm:hidden">Orçamento</span>
              <span className="hidden sm:inline">Orçamento no WhatsApp</span>
              <ArrowUpRight className="hidden sm:block w-4 h-4" aria-hidden="true" />
            </WhatsAppLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default SitesHeader;
