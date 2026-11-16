import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Search,
  Workflow,
  TrendingUp,
  ImageIcon,
  Presentation,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjectLocale } from "@/hooks/useProjectLocale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseMetricsBlock from "@/components/CaseMetricsBlock";
import CaseBeforeAfter from "@/components/CaseBeforeAfter";
import { projectThemes } from "@/data/projects";
import StarSenseIntro from "@/components/StarSenseIntro";
import BronzeMedal from "@/components/BronzeMedal";

// Prototype (presentation mode): opens straight into the presentation, no login needed.
const STARSENSE_FIGMA_URL =
  "https://www.figma.com/proto/7Pfv362uuKw7kn4atilVFh/StarSense-%E2%80%93-Telas-do-projeto?node-id=6-26&starting-point-node-id=6-26&scaling=scale-down&content-scaling=fixed&hide-ui=1";
const STARSENSE_LANDING_URL = "https://starsense.techarea.com.br";

/** Keep problem to one or two sentences (case matador). */
function toProblem(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  const sentences = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) ?? [cleaned];
  return sentences.slice(0, 2).join(" ");
}

const MAX_VISUALS = 4;

const CaseStudy = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // The award medal waits for the StarSense opening to finish before it drops in.
  const [introDone, setIntroDone] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { projects: allProjects } = usePublishedProjects();
  const project = allProjects.find((p) => p.slug === slug);
  const { t, language } = useLanguage();
  const { loc } = useProjectLocale();
  const themeClass = slug ? projectThemes[slug] : undefined;

  // Some cases get their own color theme on the whole screen (header, footer, dialogs included).
  useEffect(() => {
    if (!themeClass) return;
    const root = document.documentElement;
    root.classList.add(themeClass);
    return () => root.classList.remove(themeClass);
  }, [themeClass]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-3xl font-bold text-foreground">{t("case.not_found")}</h1>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/projetos">
              <ArrowLeft className="mr-2 w-4 h-4" /> {t("case.view_all")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const l = loc(project);
  const problema = toProblem(l.contexto);
  const processSteps = [
    { label: t("case.step_research"), content: l.processo.research },
    { label: t("case.step_wireframe"), content: l.processo.wireframe },
    { label: t("case.step_ui"), content: l.processo.ui_design },
  ].filter((step) => step.content.trim().length > 0);
  const visuals = project.galeria_de_imagens.slice(0, MAX_VISUALS);

  return (
    <div className="min-h-screen bg-background">
      {project.slug === "starsense" && <StarSenseIntro key={project.slug} onDone={() => setIntroDone(true)} />}
      <Header />
      <main className="pt-24">
        <section className="container mx-auto px-6 py-12">
          <Button asChild variant="ghost" className="rounded-full mb-8">
            <Link to="/projetos">
              <ArrowLeft className="mr-2 w-4 h-4" /> {t("case.back")}
            </Link>
          </Button>

        {project.slug === "starsense" && (
          <div className="max-w-4xl mb-10">
            {/* Award highlight: bronze medal, gradient hairline border, StarSense starfield */}
            <div className="relative rounded-[28px] p-px bg-gradient-to-br from-[#FDBA74]/80 via-[#1E2C56] to-[#5CC8FF]/70 shadow-[0_30px_80px_-40px_rgba(251,146,60,0.7)]">
              <div className="award-card relative overflow-hidden rounded-[27px] px-6 py-8 sm:px-10 sm:py-9">
                <span
                  className="pointer-events-none select-none absolute -right-4 -bottom-10 font-display text-[10rem] sm:text-[13rem] font-extrabold leading-none text-white/[0.04]"
                  aria-hidden
                >
                  03
                </span>

                <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                  <BronzeMedal play={introDone} className="w-36 sm:w-44 shrink-0 mx-auto sm:mx-0 -mt-4 sm:-mt-6 drop-shadow-[0_18px_30px_rgba(251,146,60,0.3)]" />

                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <h3 className="font-display text-5xl sm:text-6xl font-extrabold leading-[0.9] bg-gradient-to-r from-[#FFE7C7] via-[#FDBA74] to-[#FB923C] bg-clip-text text-transparent">
                      {language === "en" ? "3rd place" : "3º lugar"}
                    </h3>
                    <p className="mt-3 font-display text-lg font-bold text-foreground">
                      NASA Space Apps Challenge <span className="text-[#5CC8FF]">· Goiânia</span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto sm:mx-0">
                      {language === "en"
                        ? "Challenge 05: health monitoring software for astronauts on space missions."
                        : "Desafio 05: software de monitoramento de saúde para astronautas em missões espaciais."}
                    </p>
                  </div>
                </div>

                <dl className="relative mt-8 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                  {(language === "en"
                    ? [["48h", "hackathon"], ["6", "people on the team"], ["1", "MVP delivered"]]
                    : [["48h", "de hackathon"], ["6", "pessoas no time"], ["1", "MVP entregue"]]
                  ).map(([value, label]) => (
                    <div key={label} className="px-3 py-4 text-center">
                      <dt className="sr-only">{label}</dt>
                      <dd className="font-display text-2xl sm:text-3xl font-extrabold text-[#5CC8FF] leading-none">{value}</dd>
                      <dd className="mt-1.5 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        )}

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-sand text-primary-hover font-semibold uppercase tracking-wider">
                {l.categoria}
              </span>
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-sand text-primary-hover font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mb-4">{l.titulo}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">{l.descricao}</p>
            {project.slug === "starsense" ? (
              <div className="flex flex-wrap gap-3 mt-5">
                <a
                  href={STARSENSE_FIGMA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover hover:text-white transition-colors"
                >
                  <Presentation className="w-4 h-4" aria-hidden />
                  {language === "en" ? "View Figma presentation" : "Ver apresentação no Figma"}
                  <ArrowUpRight className="w-4 h-4" aria-hidden />
                </a>
                <a
                  href={STARSENSE_LANDING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/60 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Globe className="w-4 h-4" aria-hidden />
                  {language === "en" ? "View landing page" : "Ver landing page"}
                  <ArrowUpRight className="w-4 h-4" aria-hidden />
                </a>
              </div>
            ) : project.link_projeto && (
              <a
                href={project.link_projeto}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover hover:text-white transition-colors"
              >
                {project.link_projeto.endsWith(".pdf")
                  ? t("case.view_pdf")
                  : project.link_projeto.includes("figma.com")
                    ? t("case.view_prototype")
                    : t("case.view_live")}
              </a>
            )}
          </div>
        </section>

        {project.slug === "aura-scent-boutique" && (
          <section className="container mx-auto px-6 mb-12 max-w-4xl">
            <div className="p-6 rounded-2xl border border-border bg-gradient-to-r from-accent/5 to-primary/5">
              <h3 className="font-display font-bold text-foreground text-lg mb-2">{t("case.name_meaning")}</h3>
              <p className="text-muted-foreground">
                <strong>Aura</strong> refere-se à atmosfera e energia que um ambiente transmite, enquanto{" "}
                <strong>Scent</strong> significa fragrância em inglês. Juntas, as palavras representam a essência do
                projeto: criar uma aura única através de scents (fragrâncias) cuidadosamente selecionadas,
                transformando cada espaço em uma experiência sensorial memorável. A palavra{" "}
                <strong>Boutique</strong> reforça o caráter exclusivo e artesanal dos produtos, diferenciando-se de
                e-commerces convencionais.
              </p>
            </div>
          </section>
        )}

        {project.slug === "desafio-saudavel" && (
          <section className="container mx-auto px-6 mb-12 max-w-4xl">
            <div className="p-6 rounded-[8px] border border-border bg-sand">
              <p className="text-foreground">
                <strong>{t("case.created_by_me")}</strong>, Este aplicativo foi desenvolvido como uma solução pessoal
                baseada em uma experiência real com amigos, transformando uma dinâmica informal de grupo em uma
                experiência digital completa.
              </p>
            </div>
          </section>
        )}

        {project.slug === "be-careful-app" && (
          <section className="container mx-auto px-6 mb-12 max-w-4xl space-y-4">
            <div className="p-6 rounded-[8px] border border-border bg-sand flex items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-[8px] bg-primary flex items-center justify-center">
                <span className="font-display font-extrabold text-white text-2xl">10</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-lg">{t("case.grade_highlight")}</h3>
                <p className="text-muted-foreground text-sm">{t("case.grade_highlight_desc")}</p>
              </div>
            </div>
            <div className="p-6 rounded-[8px] border border-border bg-white">
              <p className="text-muted-foreground">
                <strong>{t("case.created_by_me")}</strong>, {t("case.be_careful_intro")}
              </p>
            </div>
          </section>
        )}

        <section className="container mx-auto px-6 mb-16">
          <div className="w-full rounded-3xl bg-primary/5 border border-border overflow-hidden flex items-center justify-center">
            {project.imagem_capa ? (
              <img
                src={project.imagem_capa}
                alt={`Capa do case study ${l.titulo}: ${l.categoria}`}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
                <span className="font-display font-bold text-primary text-3xl">{l.titulo.charAt(0)}</span>
              </div>
            )}
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-4xl space-y-16 pb-24">
          {/* 1. O problema */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5 text-primary" aria-hidden />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("case.problem")}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg pl-0 sm:pl-14">{problema}</p>
          </section>

          {project.antes_depois && <CaseBeforeAfter data={project.antes_depois} isEn={language === "en"} />}

          {/* 2. O processo */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Workflow className="w-5 h-5 text-primary" aria-hidden />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("case.process")}</h2>
            </div>
            <ol className="space-y-4 sm:pl-14">
              {processSteps.map((step, index) => (
                <li
                  key={step.label}
                  className="flex gap-4 p-5 rounded-2xl border border-border bg-card/30"
                >
                  <span className="font-display font-extrabold text-primary text-xl tabular-nums shrink-0 w-8">
                    {index + 1}.
                  </span>
                  <div className="space-y-1.5 min-w-0">
                    <h3 className="font-display font-bold text-foreground text-lg">{step.label}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.content}</p>
                  </div>
                </li>
              ))}
            </ol>
            {project.ferramentas.length > 0 && (
              <div className="sm:pl-14 flex flex-wrap gap-2 pt-2">
                {project.ferramentas.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg border border-border bg-card/40 font-display font-semibold text-xs text-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* 3. O resultado + métricas matador */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-accent-ink" aria-hidden />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("case.result")}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg sm:pl-14">{l.resultado}</p>
            {project.metricas && (
              <div className="sm:pl-0 pt-2">
                <CaseMetricsBlock
                  metricas={project.metricas}
                  isEn={language === "en"}
                  title={t("case.metrics_title")}
                />
              </div>
            )}
          </section>

          {/* 4. O visual: 2 a 4 imagens */}
          {visuals.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5 text-primary" aria-hidden />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("case.visual")}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 sm:pl-0">
                {visuals.map((img, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-border bg-primary/5 p-4 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                    onClick={() => setLightboxIndex(i)}
                    onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={img}
                      alt={`${l.titulo}: tela ${i + 1} do projeto de UX/UI e Design Engineering`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 bg-background/95 backdrop-blur-sm border-border">
              {lightboxIndex !== null && (
                <>
                  {lightboxIndex > 0 && (
                    <button
                      onClick={() => setLightboxIndex(lightboxIndex - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label={t("case.prev")}
                    >
                      <ChevronLeft className="w-6 h-6 text-foreground" />
                    </button>
                  )}
                  <img
                    src={visuals[lightboxIndex]}
                    alt={t("case.lightbox_alt")}
                    className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
                  />
                  {lightboxIndex < visuals.length - 1 && (
                    <button
                      onClick={() => setLightboxIndex(lightboxIndex + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label={t("case.next")}
                    >
                      <ChevronRight className="w-6 h-6 text-foreground" />
                    </button>
                  )}
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
