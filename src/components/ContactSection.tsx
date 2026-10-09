import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealTitle } from "@/components/motion/RevealTitle";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionBridge from "@/components/SectionBridge";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={className} aria-hidden="true">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);


const ContactSection = () => {
  const { content } = useSiteContent();
  const { t } = useLanguage();

  const title = t("contact.title_default");
  const subtitle = t("contact.subtitle_default");
  const email = content.contact_email || "luizfilipe.designuxui@gmail.com";
  const linkedin = content.contact_linkedin || "https://www.linkedin.com/in/luiz-filipe-cardoso";

  const rowClass =
    "group flex items-center justify-center sm:justify-start gap-2 sm:gap-3 rounded-full border border-primary/30 sm:border-transparent min-h-11 px-4 py-2 text-foreground hover:bg-primary hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  return (
    <section id="contato" className="section-brand scroll-mt-24 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <SectionBridge bridgeKey="contact.bridge" />
            <h2 className="font-display text-[2.25rem] leading-[0.95] md:text-5xl text-white mb-4 whitespace-pre-line"><RevealTitle text={title} /></h2>
            <p className="text-base md:text-lg text-foreground max-w-lg">{subtitle}</p>
          </Reveal>

          <Reveal delay={0.1} className="rounded-[8px] bg-white p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={`mailto:${email}`} className="btn-on-paper btn-compact w-full">
                {t("contact.cta")}
              </a>
              <a
                href="https://wa.me/5562992776534"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp (${t("a11y.opens_new_tab")})`}
                className="btn-whatsapp btn-compact w-full gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </a>
            </div>

            <ul className="mt-4 border-t border-primary/20 pt-3 list-none px-0 pb-0 grid grid-cols-1 gap-2 sm:gap-1">
              <li>
                <a href={`mailto:${email}`} className={rowClass} aria-label={`E-mail: ${email}`}>
                  <Mail className="w-5 h-5 text-primary group-hover:text-white shrink-0" aria-hidden="true" />
                  <span className="font-medium underline underline-offset-4 sm:hidden">E-mail</span>
                  <span className="hidden sm:inline font-medium underline underline-offset-4 break-all">{email}</span>
                  <ArrowUpRight className="hidden sm:block w-4 h-4 ml-auto shrink-0" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                  aria-label={`LinkedIn (${t("a11y.opens_new_tab")})`}
                >
                  <Linkedin className="w-5 h-5 text-primary group-hover:text-white shrink-0" aria-hidden="true" />
                  <span className="font-medium underline underline-offset-4">LinkedIn</span>
                  <ArrowUpRight className="hidden sm:block w-4 h-4 ml-auto shrink-0" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
