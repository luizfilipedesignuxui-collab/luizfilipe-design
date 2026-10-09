import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import HeroParticles from "@/components/hero/HeroParticles";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionBridge from "@/components/SectionBridge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { RevealTitle } from "@/components/motion/RevealTitle";
import clickupLogo from "@/assets/clickup-logo.svg";
import profilePhoto from "@/assets/profile-hero-pose.png";

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

const PHOTO_MASK = { solid: 0.99, clear: 1 };

const AboutSection = () => {
  const { t } = useLanguage();
  const photoFrameRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const [playParticles, setPlayParticles] = useState(false);
  const [particlesActive, setParticlesActive] = useState(false);

  useEffect(() => {
    const frame = photoFrameRef.current;
    if (!frame) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlayParticles(true);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(frame);
    return () => io.disconnect();
  }, []);

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

  return (
    <section id="sobre" className="section-paper scroll-mt-24 py-16 md:py-32">
      <div className="container mx-auto px-6">
        <Reveal className="mb-8 md:mb-12">
          <SectionBridge bridgeKey="about.bridge" />
          <h2 className="font-display text-[2.75rem] leading-[0.9] md:text-6xl font-extrabold text-primary whitespace-pre-line">
            <RevealTitle text={title} />
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-2 space-y-6">
            <figure
              ref={photoFrameRef}
              className="relative isolate m-0 overflow-hidden rounded-[8px] bg-primary aspect-square sm:aspect-[4/5] w-full max-w-md"
            >
              <img
                ref={photoRef}
                src={profilePhoto}
                alt={t("hero.photo_alt")}
                decoding="async"
                className={`absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 select-none mix-blend-multiply ${
                  particlesActive ? "invisible" : ""
                }`}
              />
              {playParticles && (
                <div className="absolute inset-0 mix-blend-multiply">
                  <HeroParticles
                    imageRef={photoRef}
                    containerRef={photoFrameRef}
                    interactionRef={photoFrameRef}
                    mask={PHOTO_MASK}
                    onActiveChange={setParticlesActive}
                  />
                </div>
              )}
            </figure>
            <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
              {specialties.map((s) => (
                <div key={s.title} className="p-4 sm:p-5 rounded-2xl border border-border bg-card/30 hover:border-primary/40 transition-colors">
                  <h3 className="font-display text-base sm:text-xl font-extrabold text-primary leading-tight">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3 space-y-6" delay={0.1}>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>'), { ALLOWED_TAGS: ['strong'], ALLOWED_ATTR: ['class'] }) }} />
              ))}
            </div>

            <div className="pt-4">
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-widest mb-4">
                {t("about.tools_title")}
              </h3>
              <RevealGroup as="ul" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 list-none m-0 p-0">
                {tools.map((tool) => (
                  <RevealItem
                    key={tool.name}
                    className="flex items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4 rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:shadow-md transition-[border-color,box-shadow]"
                  >
                    <img src={tool.logo} alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-5 h-5 sm:w-7 sm:h-7 flex-shrink-0" />
                    <span className="min-w-0 font-display font-semibold text-[0.8rem] leading-tight sm:text-sm text-foreground">{tool.name}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
