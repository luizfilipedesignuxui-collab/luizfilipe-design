import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { label: t("nav.positioning"), href: "#posicionamento" },
    { label: t("nav.about"), href: "#sobre" },
    { label: t("nav.skills"), href: "#habilidades" },
    { label: t("nav.process"), href: "#processo" },
    { label: t("nav.projects"), href: "#projetos" },
    { label: t("nav.certificates"), href: "#certificados" },
    { label: t("nav.contact"), href: "#contato" },
  ];

  const langLabel = language === "pt" ? t("a11y.switch_to_en") : t("a11y.switch_to_pt");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const linkClass =
    "text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md font-medium"
      >
        {t("a11y.skip_to_content")}
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-lg ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link
            to="/"
            className="font-display text-xl font-bold text-foreground hover:opacity-80 transition-opacity cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            Luiz<span className="text-accent">.</span>Filipe
          </Link>

          <nav className="hidden md:block" aria-label={t("a11y.main_nav")}>
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label={langLabel}
                >
                  {language === "pt" ? (
                    <>
                      <span className="text-base leading-none" aria-hidden="true">🇧🇷</span>
                      <span>PT</span>
                    </>
                  ) : (
                    <>
                      <span className="text-base leading-none" aria-hidden="true">🇺🇸</span>
                      <span>EN</span>
                    </>
                  )}
                </button>
              </li>
            </ul>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 min-h-11 min-w-11 justify-center rounded-full border border-border text-sm font-medium text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={langLabel}
            >
              <span aria-hidden="true">{language === "pt" ? "🇧🇷" : "🇺🇸"}</span>
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              className="text-foreground min-h-11 min-w-11 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? t("a11y.close_menu") : t("a11y.open_menu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav id="mobile-nav" className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border px-6 pb-6" aria-label={t("a11y.mobile_nav")}>
            <ul className="list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
