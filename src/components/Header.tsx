import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Target,
  UserRound,
  Layers,
  Workflow,
  FolderOpen,
  Award,
  Mail,
  Globe,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

type NavItem = { label: string; href: string; icon: LucideIcon };
type NavGroup = { id: string; label: string; icon: LucideIcon; items: NavItem[] };

const TAB_FILL = "rgba(255,255,255,0.72)";

const TabCurve = ({ side }: { side: "left" | "right" }) => (
  <svg
    className="h-full w-11 shrink-0"
    viewBox="0 0 44 56"
    preserveAspectRatio="none"
    aria-hidden="true"
    style={side === "right" ? { transform: "scaleX(-1)" } : undefined}
  >
    <path d="M0 0 C 22 0, 18 56, 44 56 L 44 0 Z" fill={TAB_FILL} />
  </svg>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { language, toggleLanguage, t } = useLanguage();
  const { pathname } = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const anchor = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  const groups: NavGroup[] = [
    {
      id: "about",
      label: t("nav.group_about"),
      icon: UserRound,
      items: [
        { label: t("nav.about_me"), href: anchor("#sobre"), icon: UserRound },
        { label: t("nav.positioning"), href: anchor("#posicionamento"), icon: Target },
        { label: t("nav.skills"), href: anchor("#habilidades"), icon: Layers },
      ],
    },
    {
      id: "work",
      label: t("nav.group_work"),
      icon: Briefcase,
      items: [
        { label: t("nav.process"), href: anchor("#processo"), icon: Workflow },
        { label: t("nav.projects"), href: anchor("#projetos"), icon: FolderOpen },
        { label: t("nav.certificates"), href: anchor("#certificados"), icon: Award },
      ],
    },
  ];

  const mobileLinks: NavItem[] = [
    ...groups.flatMap((g) => g.items),
    { label: t("nav.contact"), href: anchor("#contato"), icon: Mail },
  ];

  const langLabel = language === "pt" ? t("a11y.switch_to_en") : t("a11y.switch_to_pt");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !openGroup) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openGroup) {
        const trigger = document.getElementById(`nav-trigger-${openGroup}`);
        setOpenGroup(null);
        trigger?.focus();
      } else {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (openGroup && navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen, openGroup]);

  const tabItemClass = `flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium text-foreground/75 hover:text-foreground transition-colors ${focusRing}`;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md font-medium"
      >
        {t("a11y.skip_to_content")}
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4">
        <div className="relative mx-auto max-w-6xl h-[60px] sm:h-[68px]">
          <div
            className={`pointer-events-none absolute inset-0 rounded-full border border-white/80 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
              scrolled ? "bg-white/45 shadow-lg shadow-primary/5" : "bg-white/20"
            }`}
            aria-hidden="true"
          />

          <nav
            ref={navRef}
            className="hidden lg:flex absolute top-0 left-1/2 z-20 -translate-x-1/2 h-[56px]"
            aria-label={t("a11y.main_nav")}
          >
            <TabCurve side="left" />
            <ul className="flex items-center gap-0.5 list-none m-0 px-1 backdrop-blur-md" style={{ background: TAB_FILL }}>
              {groups.map((group) => {
                const open = openGroup === group.id;
                return (
                  <li key={group.id} className="relative">
                    <button
                      id={`nav-trigger-${group.id}`}
                      type="button"
                      className={tabItemClass}
                      aria-expanded={open}
                      aria-controls={`nav-menu-${group.id}`}
                      onClick={() => setOpenGroup(open ? null : group.id)}
                    >
                      <group.icon className="w-3.5 h-3.5" aria-hidden="true" />
                      {group.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {open && (
                      <ul
                        id={`nav-menu-${group.id}`}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-56 rounded-2xl glass-card bg-white/85 p-1.5 list-none m-0"
                      >
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              onClick={() => setOpenGroup(null)}
                              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-white hover:text-foreground transition-colors ${focusRing}`}
                            >
                              <item.icon className="w-4 h-4 text-secondary" aria-hidden="true" />
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
              <li>
                <Link to="/projetos" className={tabItemClass}>
                  <FolderOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <button type="button" onClick={toggleLanguage} className={tabItemClass} aria-label={langLabel}>
                  <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                  {language === "pt" ? "PT" : "EN"}
                </button>
              </li>
            </ul>
            <TabCurve side="right" />
          </nav>

          <div className="pointer-events-none relative z-10 h-full flex items-center justify-between gap-3 px-1.5 sm:px-2">
            <Link
              to="/"
              className={`pointer-events-auto flex items-center rounded-full bg-white/90 px-5 sm:px-6 h-11 sm:h-12 shadow-sm hover:bg-white transition-colors select-none ${focusRing}`}
            >
              <span className="font-display text-sm sm:text-base font-semibold text-foreground">
                Luiz<span className="text-accent-ink">.</span>Filipe
              </span>
            </Link>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className={`lg:hidden min-h-11 min-w-11 inline-flex items-center justify-center gap-1 rounded-full bg-white/80 px-3 text-xs font-semibold text-foreground/80 hover:bg-white transition-colors ${focusRing}`}
                aria-label={langLabel}
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                {language === "pt" ? "PT" : "EN"}
              </button>

              <a
                href={anchor("#contato")}
                className={`hidden sm:inline-flex shrink-0 whitespace-nowrap items-center gap-6 rounded-full bg-white/90 pl-6 pr-5 h-12 text-sm font-semibold text-foreground shadow-sm hover:bg-white transition-colors ${focusRing}`}
              >
                {t("hero.cta_secondary")}
                <ArrowUpRight className="w-4 h-4 text-accent-ink" aria-hidden="true" />
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                className={`lg:hidden min-h-11 min-w-11 inline-flex items-center justify-center rounded-full bg-white text-foreground shadow-sm ${focusRing}`}
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? t("a11y.close_menu") : t("a11y.open_menu")}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-nav"
            className="lg:hidden mx-auto max-w-6xl mt-2 rounded-[1.5rem] glass-card bg-white/80 p-3"
            aria-label={t("a11y.mobile_nav")}
          >
            <ul className="grid sm:grid-cols-2 gap-1 list-none m-0 p-0">
              {mobileLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-white hover:text-foreground transition-colors ${focusRing}`}
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
