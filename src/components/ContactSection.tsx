import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.794 1.23 1.82 2.78 3.41 4.6 4.64.516.358 2.55 1.557 3.108 1.557.99 0 2.293-.687 2.594-1.626a2.46 2.46 0 0 0 .157-.788c0-.358-.013-.41-.157-.467-.153-.058-2.79-1.348-2.94-1.348zm-2.964 8.21A9.295 9.295 0 0 1 6.85 16.13c0-5.137 4.187-9.323 9.323-9.323a9.296 9.296 0 0 1 9.293 9.323 9.295 9.295 0 0 1-9.323 9.295zm0-20.466c-6.157 0-11.17 5.013-11.17 11.17 0 1.963.516 3.898 1.49 5.59L4.715 27.4l3.812-1.218a11.117 11.117 0 0 0 5.36 1.376h.014c6.157 0 11.17-5.014 11.17-11.17 0-2.98-1.16-5.787-3.27-7.898a11.07 11.07 0 0 0-7.87-3.27z"/>
  </svg>
);


const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { content } = useSiteContent();
  const { language, t } = useLanguage();

  const title = language === "pt" ? (content.contact_title || t("contact.title_default")) : t("contact.title_default");
  const subtitle = language === "pt" ? (content.contact_subtitle || t("contact.subtitle_default")) : t("contact.subtitle_default");
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button size="lg" className="rounded-full px-10" asChild>
              <a href={`mailto:${email}`}>
                {t("contact.cta")}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-10 bg-[#25D366] hover:bg-[#25D366]/90 text-white border-[#25D366] hover:text-white"
              asChild
            >
              <a
                href="https://wa.me/5562992776534"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
            <a
              href="https://wa.me/5562992776534"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span className="text-foreground font-medium">(62) 99277-6534</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
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
