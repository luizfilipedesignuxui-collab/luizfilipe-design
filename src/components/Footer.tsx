import { ArrowUpRight } from "lucide-react";

const Footer = () => (
  <footer className="py-16 md:py-24 border-t border-border">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="font-display text-4xl md:text-5xl font-black text-foreground">
            Luiz<br />Filipe
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            UX/UI Designer criando experiências digitais intuitivas e centradas no usuário.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-foreground uppercase text-sm tracking-widest">Navegação</h4>
          <nav className="flex flex-col gap-3">
            {[
              { label: "Sobre", href: "#sobre" },
              { label: "Habilidades", href: "#habilidades" },
              { label: "Processo", href: "#processo" },
              { label: "Projetos", href: "#projetos" },
              { label: "Contato", href: "#contato" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-foreground uppercase text-sm tracking-widest">Conecte-se</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: "Email", href: "mailto:contato@luizfilipe.com" },
              { label: "LinkedIn", href: "https://linkedin.com/in/luizfilipe" },
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
        <p className="text-sm text-muted-foreground">
          © 2024 Luiz Filipe. Todos os direitos reservados.
        </p>
        <p className="text-sm text-muted-foreground">
          Feito com ♥ e muito café
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
