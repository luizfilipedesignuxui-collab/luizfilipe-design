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
    { label: t("nav.about"), href: "#sobre" },
    { label: t("nav.positioning"), href: "#posicionamento" },
    { label: t("nav.skills"), href: "#habilidades" },
    { label: t("nav.process"), href: "#processo" },
    { label: t("nav.projects"), href: "#projetos" },
    { label: t("nav.certificates"), href: "#certificados" },
    { label: t("nav.contact"), href: "#contato" },
  ];

  const linkClass =
    "text-sm font-extrabold text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  const connectLinks = [
    { label: "Email", href: `mailto:${email}` },
    { label: "LinkedIn", href: linkedin },
  ];

  const pillClass =
    "inline-flex items-center gap-1 rounded-full border-2 border-primary px-5 py-2 text-sm font-extrabold text-foreground no-underline hover:bg-primary hover:text-white transition-colors lg:rounded-sm lg:border-0 lg:px-0 lg:py-0 lg:text-foreground lg:underline lg:decoration-primary lg:decoration-2 lg:underline-offset-4 lg:hover:bg-transparent lg:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  return (
    <footer className="section-paper border-t-4 border-primary py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:text-left">
          <div className="max-w-xs space-y-2">
            <p className="font-display text-3xl text-primary">Luiz.Filipe</p>
            <p className="text-sm text-foreground leading-relaxed text-balance">{tagline}</p>
          </div>

          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-16">
            <nav aria-label={t("footer.navigation")} className="lg:space-y-3">
              <h2 className="sr-only lg:not-sr-only font-label text-foreground">{t("footer.navigation")}</h2>
              <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 list-none m-0 p-0 max-w-xs lg:max-w-md lg:justify-start lg:gap-x-5">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:space-y-3">
              <h2 className="sr-only lg:not-sr-only font-label text-foreground">{t("footer.connect")}</h2>
              <ul className="flex justify-center gap-3 list-none m-0 p-0 lg:justify-start lg:gap-x-5">
                {connectLinks.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className={pillClass}
                        aria-label={external ? `${link.label} (${t("a11y.opens_new_tab")})` : link.label}
                      >
                        {link.label}
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-primary/30 flex flex-col items-center gap-1 text-center lg:flex-row lg:justify-between lg:gap-2">
          <p className="text-xs text-foreground">{t("footer.rights")}</p>
          <p className="text-xs text-foreground">{t("footer.made_with")}</p>
        </div>
      </div>
    </footer>
  );
};export default Footer;
