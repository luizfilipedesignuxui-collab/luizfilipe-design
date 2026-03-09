import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { content } = useSiteContent();

  const title = content.contact_title || "Vamos criar algo\nincrível juntos";
  const subtitle = content.contact_subtitle || "Estou sempre aberto a novas oportunidades e projetos interessantes. Vamos conversar sobre como posso ajudar a criar a melhor experiência para seus usuários.";
  const email = content.contact_email || "luizfilipe.designuxui@gmail.com";
  const linkedin = content.contact_linkedin || "https://www.linkedin.com/in/luiz-filipe-cardoso";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contato" className="py-24 md:py-32 bg-sand-light/50">
      <div ref={ref} className="container mx-auto px-6">
        <div className={`max-w-2xl mx-auto text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 whitespace-pre-line">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            {subtitle}
          </p>

          <Button size="lg" className="rounded-full px-10 mb-10" asChild>
            <a href={`mailto:${email}`}>
              Entrar em contato
            </a>
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">{email}</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <Linkedin className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
