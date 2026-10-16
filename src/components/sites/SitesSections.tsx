import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Clock,
  Code2,
  LayoutTemplate,
  PenTool,
  Plus,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { RevealTitle } from "@/components/motion/RevealTitle";
import { EASE_OUT } from "@/components/motion/tokens";
import aboutPhoto from "@/assets/profile-hero-pose.png";
import HeroParticles from "@/components/hero/HeroParticles";
import {
  CATEGORIAS,
  CONTATO,
  DEPOIMENTOS,
  ESPECIALIDADES,
  FAQ,
  FATOS,
  SOBRE_TEXTOS,
  MESSAGES,
  NICHOS,
  PASSOS,
  PORTFOLIO_URL,
  PRAZO_INICIO,
  PRAZOS_TOTAIS,
  PROJETOS,
  SERVICOS,
  type Categoria,
  type ServicoId,
} from "./content";
import { WhatsAppIcon, WhatsAppLink } from "./WhatsApp";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

type SectionTitleProps = { eyebrow?: string; text: string; id?: string; className?: string };

export const SectionTitle = ({ eyebrow, text, id, className = "" }: SectionTitleProps) => (
  <>
    {eyebrow && <p className="font-label text-foreground mb-3 text-center md:text-left">{eyebrow}</p>}
    <h2
      id={id}
      className={`font-display text-[2.75rem] leading-[0.9] md:text-6xl text-brand text-center md:text-left ${className}`}
    >
      <RevealTitle text={text} />
    </h2>
  </>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
  <span
    className="w-11 h-11 shrink-0 rounded-[8px] bg-brand flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
    aria-hidden="true"
  >
    <Icon className="w-5 h-5 text-white" />
  </span>
);

/* 3. Faixa de nichos */
export const NichesMarquee = () => {
  const loop = [...NICHOS, ...NICHOS, ...NICHOS, ...NICHOS];
  return (
    <div className="py-5 overflow-hidden bg-brand" role="region" aria-label="Nichos atendidos">
      <ul className="sr-only">
        {NICHOS.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <ul
        className="niche-marquee-track flex w-max list-none m-0 p-0 font-display text-white text-lg sm:text-xl lg:text-2xl"
        aria-hidden="true"
      >
        {loop.map((n, i) => (
          <li key={`${n}-${i}`} className="flex items-center whitespace-nowrap">
            <span className="mx-3 sm:mx-4">•</span>
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* Serviços */
const SERVICE_ICONS: Record<ServicoId, LucideIcon> = {
  landing: LayoutTemplate,
  institucional: Building2,
  loja: ShoppingBag,
};

export const ServicesSection = () => (
  <section id="servicos" className="section-paper scroll-mt-24 py-16 md:py-24" aria-labelledby="servicos-title">
    <div className="container mx-auto px-6">
      <Reveal className="mb-8 md:mb-12 max-w-3xl mx-auto md:mx-0 text-center md:text-left">
        <SectionTitle id="servicos-title" eyebrow="Serviços" text={"O que eu faço\npelo seu negócio"} className="mb-4" />
        <p className="text-base md:text-lg text-foreground m-0">
          Três formatos, todos com design sob medida, versão celular e publicação inclusa. Os prazos contam a partir do
          pagamento do sinal.
        </p>
      </Reveal>
      <RevealGroup as="ul" className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 list-none m-0 p-0">
        {SERVICOS.map((s, i) => (
          <RevealItem
            key={s.id}
            className="lift-card group flex flex-col rounded-[8px] border border-border bg-white p-6 md:p-7"
          >
            <div className="flex items-center justify-between">
              <IconBox icon={SERVICE_ICONS[s.id]} />
              <span className="font-display text-2xl text-border" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="font-label text-foreground m-0 mt-6">{s.publico}</p>
            <h3 className="font-display text-2xl xl:text-[1.75rem] leading-tight text-brand m-0 mt-2">{s.nome}</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed m-0 mt-3">{s.resumo}</p>

            <p className="font-label text-foreground m-0 mt-6 mb-1">O que vem incluso</p>
            <ul className="flex flex-col list-none m-0 p-0 text-sm sm:text-base text-foreground">
              {s.inclui.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-border py-3">
                  <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-3 pt-5">
              <Clock className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="m-0 text-sm sm:text-base text-foreground">
                Pronto em <strong className="font-extrabold">{s.prazo}</strong>
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="mt-10 flex flex-col gap-6 rounded-[8px] border border-border bg-white p-6 text-center md:text-left md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex flex-col gap-2">
          <p className="font-label text-foreground m-0">Ainda em dúvida?</p>
          <p className="font-display text-2xl md:text-[1.75rem] leading-tight text-brand m-0">Não sabe qual é o seu?</p>
          <p className="text-sm sm:text-base text-muted-foreground m-0">
            Me conta o que você precisa e eu te indico o formato certo, com o valor.
          </p>
        </div>
        <WhatsAppLink
          mensagem={MESSAGES.geral}
          origem="servico"
          className="btn-on-paper gap-3 shrink-0 w-full md:w-auto"
        >
          <WhatsAppIcon />
          Quero saber o valor
        </WhatsAppLink>
      </Reveal>
    </div>
  </section>
);

/* 6. Projetos */
export const ProjectsShowcase = () => {
  const [filtro, setFiltro] = useState<Categoria>("Todos");
  const visiveis = filtro === "Todos" ? PROJETOS : PROJETOS.filter((p) => p.categoria === filtro);
  const contar = (c: Categoria) => (c === "Todos" ? PROJETOS.length : PROJETOS.filter((p) => p.categoria === c).length);

  return (
    <section id="projetos" className="section-brand scroll-mt-24 py-16 md:py-24" aria-labelledby="projetos-title">
      <div className="container mx-auto px-6">
        <Reveal className="mb-8 max-w-3xl mx-auto md:mx-0 text-center md:text-left">
          <SectionTitle id="projetos-title" eyebrow="Portfólio" text={"Negócios reais\nque já estão no ar"} className="mb-4" />
          <p className="text-base md:text-lg text-foreground m-0">
            Toque em um projeto para ver como ele ficou.
          </p>
        </Reveal>

        <Reveal className="-mx-6 mb-8 overflow-x-auto px-6 [scrollbar-width:none]">
          <div className="flex w-max gap-2" role="group" aria-label="Filtrar projetos">
            {CATEGORIAS.map((c) => {
              const ativo = c === filtro;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setFiltro(c)}
                  className={`min-h-11 whitespace-nowrap rounded-full border px-4 text-sm font-extrabold transition-colors ${focusRing} ${
                    ativo ? "border-accent bg-accent text-foreground" : "border-border bg-white text-foreground hover:border-brand"
                  }`}
                >
                  {c} <span className="font-medium opacity-70">({contar(c)})</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 list-none m-0 p-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {visiveis.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.nome}: ${p.site ? "ver site" : "ver case"} (abre em nova aba)`}
                  className={`lift-card group flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-white ${focusRing}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-sand">
                    <img
                      src={p.imagem}
                      alt=""
                      loading={i < 3 ? "eager" : "lazy"}
                      decoding="async"
                      className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105 ${
                        p.imagemVertical ? "object-contain" : "object-cover"
                      }`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="font-label text-foreground m-0">{p.nicho}</p>
                    <h3 className="font-display text-2xl text-brand m-0">{p.nome}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed m-0">{p.descricao}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-extrabold text-foreground">
                      {p.site ? "Ver site" : "Ver case"}
                      <ArrowUpRight
                        className="w-4 h-4 text-brand transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <Reveal className="mt-10 flex flex-col gap-6 rounded-[8px] border border-border bg-white p-6 text-center md:text-left md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex flex-col gap-2">
            <p className="font-label text-foreground m-0">Tem mais no portfólio</p>
            <p className="font-display text-2xl md:text-[1.75rem] text-brand m-0">Veja todos os projetos</p>
            <p className="text-sm sm:text-base text-muted-foreground m-0">
              Apps, sistemas, lojas e sites, com o processo completo de cada um.
            </p>
          </div>
          <a
            href={`${PORTFOLIO_URL}/#projetos`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir para os projetos do portfólio (abre em nova aba)"
            className="btn-on-paper-outline shrink-0 w-full md:w-auto"
          >
            Ir para o portfólio
            <ArrowRight className="btn-arrow w-5 h-5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

/* 8. Como funciona */
export const HowItWorksSection = () => (
  <section className="section-brand scroll-mt-24 py-16 md:py-24" aria-labelledby="como-title">
    <div className="container mx-auto px-6">
      <Reveal className="mb-10 md:mb-14">
        <SectionTitle id="como-title" eyebrow="Do primeiro oi ao site no ar" text={"Como\nfunciona"} />
      </Reveal>
      <RevealGroup as="ol" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 list-none m-0 p-0">
          {PASSOS.map((passo, i) => (
            <RevealItem
              key={passo.titulo}
              className="flex flex-col gap-2 rounded-[8px] border border-border bg-white p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-5xl leading-none text-brand" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-label text-foreground m-0 text-right">{passo.prazo}</p>
              </div>
              <h3 className="font-display text-xl xl:text-2xl leading-tight text-brand m-0 mt-4">{passo.titulo}</h3>
              <p className="text-base text-foreground leading-relaxed m-0">{passo.texto}</p>
            </RevealItem>
          ))}

        <RevealItem className="flex flex-col rounded-[8px] bg-brand p-6 text-white">
          <p className="font-label text-foreground m-0">Prazo total</p>
          <dl className="m-0 mt-4 flex flex-col">
            {PRAZOS_TOTAIS.map(([tipo, prazo]) => (
              <div
                key={tipo}
                className="flex items-baseline justify-between gap-4 border-b border-white/40 py-3 last:border-b-0"
              >
                <dt className="text-sm sm:text-base font-medium text-foreground">{tipo}</dt>
                <dd className="m-0 font-display text-xl leading-tight text-right">{prazo}</dd>
              </div>
            ))}
          </dl>
          <p className="m-0 mt-auto pt-4 text-sm font-medium text-foreground">{PRAZO_INICIO}</p>
        </RevealItem>
      </RevealGroup>
    </div>
  </section>
);

/* 9. Sobre */
const PHOTO_MASK = { solid: 0.99, clear: 1 };

export const AboutLuizSection = () => {
  const photoFrameRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const [playParticles, setPlayParticles] = useState(false);
  const [particlesActive, setParticlesActive] = useState(false);
  const [photoSharp, setPhotoSharp] = useState(false);

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

  return (
    <section id="sobre" className="section-brand scroll-mt-24 pt-12 pb-16 md:pt-16 md:pb-24" aria-labelledby="sobre-title">
      <div className="container mx-auto px-6">
        <Reveal className="mb-8 md:mb-12">
          <SectionTitle id="sobre-title" eyebrow="Sobre" text={"Quem desenha\né quem programa."} />
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-14 items-start">
          <Reveal className="lg:col-span-2 md:sticky md:top-28">
            <figure
              ref={photoFrameRef}
              className="relative isolate m-0 overflow-hidden rounded-[8px] bg-brand aspect-[4/5] w-full"
            >
              <img
                ref={photoRef}
                src={aboutPhoto}
                alt="Luiz Filipe, designer e desenvolvedor"
                decoding="async"
                className={`absolute left-1/2 top-0 z-10 h-full w-auto max-w-none -translate-x-1/2 select-none transition-opacity duration-700 ${
                  particlesActive && !photoSharp ? "opacity-0" : "opacity-100"
                }`}
                onTransitionEnd={() => photoSharp && setPlayParticles(false)}
              />
              {playParticles && (
                <div className="absolute inset-0">
                  <HeroParticles
                    imageRef={photoRef}
                    containerRef={photoFrameRef}
                    interactionRef={photoFrameRef}
                    mask={PHOTO_MASK}
                    onActiveChange={setParticlesActive}
                    onIntroEnd={() => setPhotoSharp(true)}
                  />
                </div>
              )}
            </figure>
          </Reveal>

          <Reveal className="lg:col-span-3 flex flex-col gap-8" delay={0.1}>
            <div className="flex flex-col gap-5 text-base sm:text-lg text-foreground leading-relaxed text-center md:text-left">
              {SOBRE_TEXTOS.map((t, i) => (
                <p key={i} className="m-0">
                  {t}
                </p>
              ))}
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3 list-none m-0 p-0">
              {ESPECIALIDADES.map((e) => (
                <li key={e.titulo} className="group flex gap-4 rounded-[8px] border border-border bg-white p-5">
                  <IconBox icon={e.titulo === "Design" ? PenTool : Code2} />
                  <div>
                    <h3 className="font-display text-xl leading-tight text-brand m-0">{e.titulo}</h3>
                    <p className="text-sm text-foreground leading-relaxed m-0 mt-1">{e.texto}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-[8px] border border-border bg-white px-5 py-2">
              <dl className="m-0">
                {FATOS.map(([rotulo, valor]) => (
                  <div
                    key={rotulo}
                    className="flex flex-col gap-1 border-b border-border py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 md:flex-col md:gap-1 lg:flex-row lg:gap-6"
                  >
                    <dt className="font-label text-foreground shrink-0">{rotulo}</dt>
                    <dd className="m-0 text-sm sm:text-base font-extrabold text-foreground sm:text-right md:text-left lg:text-right">
                      {valor}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex justify-center md:justify-start">
              <WhatsAppLink mensagem={MESSAGES.geral} origem="sobre" className="btn-on-paper gap-3 w-full sm:w-auto">
                <WhatsAppIcon />
                Conversar comigo
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* 10. Quanto custa? */
const SELOS = ["Sem compromisso", "Você fala direto comigo", "Pix, débito ou até 6x"];

export const PricingSection = () => (
  <section id="preco" className="section-paper scroll-mt-24 py-16 md:py-24" aria-labelledby="preco-title">
    <div className="container mx-auto px-6">
      <Reveal className="hero-panel rounded-[8px] !min-h-0 !justify-start gap-6 !p-8 md:!p-14 items-center text-center md:items-start md:text-left">
        <h2 id="preco-title" className="font-display text-white text-[2.75rem] leading-[0.9] md:text-6xl m-0">
          <RevealTitle text="Quanto custa?" />
        </h2>
        <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed m-0 max-w-3xl">
          Cada negócio precisa de uma coisa diferente, e eu não vou te cobrar por algo que você não precisa. Me conta o
          que você tem em mente e <strong className="font-extrabold">eu te passo o valor exato no WhatsApp.</strong>
        </p>
        <ul className="flex w-full flex-col items-stretch gap-2 list-none m-0 p-0 md:flex-row md:flex-wrap md:items-center md:justify-start">
          {SELOS.map((selo) => (
            <li
              key={selo}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-4 py-2 text-sm font-extrabold text-foreground md:w-auto"
            >
              <Check className="h-4 w-4 text-brand-hover" aria-hidden="true" />
              {selo}
            </li>
          ))}
        </ul>
        <p className="m-0 text-sm text-foreground font-medium">Seg a sex, 9h às 19h.</p>
        <div className="flex w-full justify-center md:justify-start">
          <WhatsAppLink mensagem={MESSAGES.geral} origem="preco" className="btn-on-brand gap-3 w-full sm:w-auto">
            <WhatsAppIcon />
            Pedir meu valor
          </WhatsAppLink>
        </div>
      </Reveal>
    </div>
  </section>
);

/* 11. Depoimentos */
export const TestimonialsSection = () => {
  if (DEPOIMENTOS.length < 2) return null;
  return (
    <section className="section-paper scroll-mt-24 py-16 md:py-24" aria-labelledby="depoimentos-title">
      <div className="container mx-auto px-6">
        <Reveal className="mb-8 md:mb-12">
          <SectionTitle id="depoimentos-title" eyebrow="Depoimentos" text={"Quem já\ncolocou no ar"} />
        </Reveal>
        <RevealGroup as="ul" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none m-0 p-0">
          {DEPOIMENTOS.map((d) => (
            <RevealItem key={d.nome} className="flex flex-col gap-4 rounded-[8px] border border-border bg-white p-6">
              <p className="m-0 text-base text-foreground">“{d.texto}”</p>
              <p className="m-0 mt-auto text-sm font-extrabold text-foreground">
                {d.nome} <span className="font-normal text-muted-foreground">· {d.negocio}</span>
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

/* 12. FAQ */
export const FaqSection = () => (
  <section id="faq" className="section-brand scroll-mt-24 py-16 md:py-24" aria-labelledby="faq-title">
    <div className="container mx-auto px-6 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
      <Reveal>
        <SectionTitle id="faq-title" eyebrow="Dúvidas" text={"Perguntas\nfrequentes"} />
      </Reveal>
      <Reveal delay={0.1}>
        <AccordionPrimitive.Root type="single" collapsible className="border-t border-border">
          {FAQ.map((item, i) => (
            <AccordionPrimitive.Item key={item.pergunta} value={`faq-${i}`} className="border-b border-border">
              <AccordionPrimitive.Header className="m-0">
                <AccordionPrimitive.Trigger
                  className={`group flex w-full min-h-14 items-center justify-between gap-4 py-4 text-left text-lg font-extrabold text-foreground hover:text-brand-hover ${focusRing}`}
                >
                  {item.pergunta}
                  <Plus
                    className="h-6 w-6 shrink-0 text-brand transition-transform duration-300 group-data-[state=open]:rotate-45"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="m-0 pb-5 text-base text-muted-foreground leading-relaxed">{item.resposta}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </Reveal>
    </div>
  </section>
);

/* 13. CTA final */
export const FinalCtaSection = () => (
  <section id="cta-final" className="scroll-mt-24 py-20 md:py-32 bg-brand" aria-labelledby="cta-final-title">
    <div className="container mx-auto px-6">
      <Reveal className="flex flex-col items-center md:items-start gap-8 text-center md:text-left">
        <p className="font-label text-foreground m-0">Orçamento no WhatsApp · Sem compromisso</p>
        <h2
          id="cta-final-title"
          className="font-serif-display text-white text-[clamp(2.75rem,7vw,5.5rem)] !leading-none m-0 max-w-4xl"
        >
          Vamos tirar seu site do papel?
        </h2>
        <WhatsAppLink mensagem={MESSAGES.geral} origem="final" className="btn-on-brand gap-3 w-full sm:w-auto">
          <WhatsAppIcon />
          Chamar no WhatsApp
        </WhatsAppLink>
      </Reveal>
    </div>
  </section>
);

/* Rodapé */
export const SitesFooter = () => {
  const links = [
    { label: "E-mail", href: `mailto:${CONTATO.email}` },
    { label: "LinkedIn", href: CONTATO.linkedin },
    { label: "Portfólio", href: PORTFOLIO_URL },
  ];
  return (
    <footer className="section-paper border-t-4 border-brand py-10">
      <div className="container mx-auto px-6 flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <div className="space-y-2">
          <p className="font-display text-3xl text-brand m-0">Luiz.Filipe</p>
          <p className="text-sm text-muted-foreground m-0">Luiz Filipe · UX/UI Designer &amp; Design Engineer</p>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 list-none m-0 p-0">
          {links.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={`inline-flex min-h-11 min-w-11 justify-center items-center gap-1 text-sm font-extrabold text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-brand-hover rounded-sm ${focusRing}`}
                >
                  {link.label}
                  {external && <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};
