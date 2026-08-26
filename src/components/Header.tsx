import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { label: t("nav.about"), href: "#sobre" },
    { label: t("nav.skills"), href: "#habilidades" },
    { label: t("nav.process"), href: "#processo" },
    { label: t("nav.projects"), href: "#projetos" },
    { label: t("nav.certificates"), href: "#certificados" },
    { label: t("nav.contact"), href: "#contato" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md font-medium">
      Pular para o conteúdo
    </a>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="font-display text-xl font-bold text-foreground hover:opacity-80 transition-opacity cursor-pointer select-none">
          Luiz<span className="text-accent">.</span>Filipe
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium text-muted-foreground hover:text-primary"
            title={language === "pt" ? "Switch to English" : "Mudar para Português"}
          >
            {language === "pt" ? (
              <>
                <span className="text-base leading-none">🇧🇷</span>
                <span>PT</span>
              </>
            ) : (
              <>
                <span className="text-base leading-none">🇺🇸</span>
                <span>EN</span>
              </>
            )}
          </button>
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-border text-sm font-medium text-muted-foreground"
            title={language === "pt" ? "Switch to English" : "Mudar para Português"}
          >
            {language === "pt" ? "🇧🇷" : "🇺🇸"}
          </button>
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border px-6 pb-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
    </>
  );
};

export default Header;
