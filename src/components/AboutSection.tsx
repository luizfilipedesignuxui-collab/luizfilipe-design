import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { useLanguage } from "@/contexts/LanguageContext";
import clickupLogo from "@/assets/clickup-logo.svg";

const tools = [
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Figma Make", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Cursor", logo: "https://www.cursor.com/favicon.ico" },
  { name: "Miro", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/miro.svg" },
  { name: "Trello", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg" },
  { name: "ClickUp", logo: clickupLogo },
  { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" },
  { name: "Lovable", logo: "https://lovable.dev/favicon.ico" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  const specialties = [
    { title: "UX/UI Design", desc: t("about.spec_uxui_desc") },
    { title: "Design Engineer", desc: t("about.spec_de_desc") },
  ];

  // Translations are the source of truth for PT and EN (clear for recruiters + clients)
  const title = t("about.title_default");
  const paragraphs = [
    t("about.text_1_default"),
    t("about.text_2_default"),
    t("about.text_3_default"),
    t("about.text_4_default"),
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre" className="py-24 md:py-32">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-display text-5xl md:text-6xl font-extrabold text-foreground leading-tight whitespace-pre-line">
              {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {specialties.map((s) => (
                <div key={s.title} className="p-5 rounded-2xl border border-border bg-card/30 hover:border-primary/40 transition-colors">
                  <div className="font-display text-lg sm:text-xl font-extrabold text-primary leading-tight">{s.title}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6 pt-2">
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>'), { ALLOWED_TAGS: ['strong'], ALLOWED_ATTR: ['class'] }) }} />
              ))}
            </div>

            <div className="pt-4">
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-widest mb-4">
                {t("about.tools_title")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <img src={tool.logo} alt={`${tool.name}, ferramenta de design`} loading="lazy" decoding="async" className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
                    <span className="font-display font-semibold text-sm text-foreground truncate">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
