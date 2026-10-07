import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowUpLeft,
  ArrowUpRight,
  Target,
  UserRound,
  Layers,
  Workflow,
  FolderOpen,
  Award,
  Mail,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { pathname } = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const anchor = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  const navLinks = [
    { label: t("nav.positioning"), href: anchor("#posicionamento"), icon: Target },
    { label: t("nav.about"), href: anchor("#sobre"), icon: UserRound },
    { label: t("nav.skills"), href: anchor("#habilidades"), icon: Layers },
    { label: t("nav.process"), href: anchor("#processo"), icon: Workflow },
    { label: t("nav.projects"), href: anchor("#projetos"), icon: FolderOpen },
    { label: t("nav.certificates"), href: anchor("#certificados"), icon: Award },
    { label: t("nav.contact"), href: anchor("#contato"), icon: Mail },
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

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md font-medium"
      >
        {t("a11y.skip_to_content")}
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4">
        <div
          className={`mx-auto max-w-6xl flex items-center justify-between gap-3 rounded-[1.75rem] p-2 glass-card transition-shadow duration-300 ${
            scrolled ? "shadow-lg" : ""
          }`}
        >
          <Link
            to="/"
            className={`flex items-center gap-2.5 rounded-full bg-white px-4 sm:px-5 py-2.5 shadow-sm hover:shadow-md transition-shadow select-none ${focusRing}`}
          >
            <ArrowUpLeft className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <span className="font-display text-base font-semibold text-foreground">
              Luiz<span className="text-accent">.</span>Filipe
            </span>
            <ArrowUpRight className="w-4 h-4 text-accent" aria-hidden="true" />
          </Link>

          <nav className="hidden xl:block" aria-label={t("a11y.main_nav")}>
            <ul className="flex items-center gap-1 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium text-foreground/75 hover:text-foreground hover:bg-white/70 transition-colors ${focusRing}`}
                  >
                    <link.icon className="w-3.5 h-3.5" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className={`min-h-11 min-w-11 inline-flex items-center justify-center gap-1 rounded-full bg-white/70 px-3 text-xs font-semibold text-foreground/80 hover:bg-white transition-colors ${focusRing}`}
              aria-label={langLabel}
            >
              <span aria-hidden="true">{language === "pt" ? "🇧🇷" : "🇺🇸"}</span>
              <span className="hidden sm:inline">{language === "pt" ? "PT" : "EN"}</span>
            </button>

            <a
              href={anchor("#contato")}
              className={`hidden sm:inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:shadow-md transition-shadow ${focusRing}`}
            >
              {t("hero.cta_secondary")}
              <ArrowUpRight className="w-4 h-4 text-accent" aria-hidden="true" />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              className={`xl:hidden min-h-11 min-w-11 inline-flex items-center justify-center rounded-full bg-white text-foreground shadow-sm ${focusRing}`}
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? t("a11y.close_menu") : t("a11y.open_menu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-nav"
            className="xl:hidden mx-auto max-w-6xl mt-2 rounded-[1.5rem] glass-card p-3"
            aria-label={t("a11y.mobile_nav")}
          >
            <ul className="grid sm:grid-cols-2 gap-1 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-white/80 hover:text-foreground transition-colors ${focusRing}`}
                  >
                    <link.icon className="w-4 h-4 text-secondary" aria-hidden="true" />
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
