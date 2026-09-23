import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { content } = useSiteContent();
  const { t } = useLanguage();

  const tagline = t("footer.tagline_default");
  const email = content.contact_email || "luizfilipe.designuxui@gmail.com";
  const linkedin = content.contact_linkedin || "https://www.linkedin.com/in/luiz-filipe-cardoso";

  const navLinks = [
    { label: t("nav.positioning"), href: "#posicionamento" },
    { label: t("nav.about"), href: "#sobre" },
    { label: t("nav.skills"), href: "#habilidades" },
    { label: t("nav.process"), href: "#processo" },
    { label: t("nav.projects"), href: "#projetos" },
    { label: t("nav.certificates"), href: "#certificados" },
    { label: t("nav.contact"), href: "#contato" },
  ];

  const linkClass =
    "text-muted-foreground hover:text-primary transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm";

  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-4">
            <p className="font-display text-4xl md:text-5xl font-black text-foreground">
              Luiz<span className="text-accent">.</span>Filipe
            </p>
            <p className="text-muted-foreground leading-relaxed">{tagline}</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-foreground uppercase text-sm tracking-widest">
              {t("footer.navigation")}
            </h2>
            <nav aria-label={t("footer.navigation")}>
              <ul className="flex flex-col gap-3 list-none m-0 p-0">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-foreground uppercase text-sm tracking-widest">
              {t("footer.connect")}
            </h2>
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              {[
                { label: "Email", href: `mailto:${email}` },
                { label: "LinkedIn", href: linkedin },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`${linkClass} flex items-center gap-1 group`}
                    aria-label={
                      link.href.startsWith("http")
                        ? `${link.label} (${t("a11y.opens_new_tab")})`
                        : link.label
                    }
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-border mb-8" aria-hidden="true" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t("footer.rights")}</p>
          <p className="text-sm text-muted-foreground">{t("footer.made_with")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
