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
    { label: t("nav.skills"), href: "#habilidades" },
    { label: t("nav.process"), href: "#processo" },
    { label: t("nav.projects"), href: "#projetos" },
    { label: t("nav.certificates"), href: "#certificados" },
    { label: t("nav.contact"), href: "#contato" },
  ];

  return (
    <footer className="py-16 md:py-24 border-t border-border" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="font-display text-4xl md:text-5xl font-black text-foreground">
              Luiz<span className="text-accent">.</span>Filipe
            </h3>
            <p className="text-muted-foreground leading-relaxed">{tagline}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-foreground uppercase text-sm tracking-widest">{t("footer.navigation")}</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors w-fit">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-foreground uppercase text-sm tracking-widest">{t("footer.connect")}</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Email", href: `mailto:${email}` },
                { label: "LinkedIn", href: linkedin },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 w-fit group"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-border mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t("footer.rights")}</p>
          <p className="text-sm text-muted-foreground">{t("footer.made_with")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
