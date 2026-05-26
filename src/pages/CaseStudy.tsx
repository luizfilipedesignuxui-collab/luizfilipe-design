import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjectLocale } from "@/hooks/useProjectLocale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CaseStudy = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const { projects: allProjects } = usePublishedProjects();
  const project = allProjects.find((p) => p.slug === slug);
  const { t } = useLanguage();
  const { loc } = useProjectLocale();

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-3xl font-bold text-foreground">{t("case.not_found")}</h1>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/projetos"><ArrowLeft className="mr-2 w-4 h-4" /> {t("case.view_all")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const l = loc(project);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="container mx-auto px-6 py-12">
          <Button asChild variant="ghost" className="rounded-full mb-8">
            <Link to="/projetos"><ArrowLeft className="mr-2 w-4 h-4" /> {t("case.back")}</Link>
          </Button>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-accent/15 text-accent font-semibold uppercase tracking-wider">
                {l.categoria}
              </span>
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mb-4">
              {l.titulo}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {l.descricao}
            </p>
            {project.link_projeto && (
              <a
                href={project.link_projeto}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                {t("case.view_live")}
              </a>
            )}
          </div>
        </section>

        {project.slug === 'aura-scent-boutique' && (
          <section className="container mx-auto px-6 mb-12 max-w-4xl">
            <div className="p-6 rounded-2xl border border-border bg-gradient-to-r from-accent/5 to-primary/5">
              <h3 className="font-display font-bold text-foreground text-lg mb-2">{t("case.name_meaning")}</h3>
              <p className="text-muted-foreground">
                <strong>Aura</strong> refere-se à atmosfera e energia que um ambiente transmite, enquanto <strong>Scent</strong> significa fragrância em inglês. Juntas, as palavras representam a essência do projeto: criar uma aura única através de scents (fragrâncias) cuidadosamente selecionadas, transformando cada espaço em uma experiência sensorial memorável. A palavra <strong>Boutique</strong> reforça o caráter exclusivo e artesanal dos produtos, diferenciando-se de e-commerces convencionais.
              </p>
            </div>
          </section>
        )}

        {project.slug === 'desafio-saudavel' && (
          <section className="container mx-auto px-6 mb-12 max-w-4xl">
            <div className="p-6 rounded-2xl border border-border bg-gradient-to-r from-green-500/10 to-emerald-500/10">
              <p className="text-muted-foreground">
                <strong>{t("case.created_by_me")}</strong>, Este aplicativo foi desenvolvido como uma solução pessoal baseada em uma experiência real com amigos, transformando uma dinâmica informal de grupo em uma experiência digital completa.
              </p>
            </div>
          </section>
        )}

        {project.slug === 'be-careful-app' && (
          <section className="container mx-auto px-6 mb-12 max-w-4xl space-y-4">
            <div className="p-6 rounded-2xl border-2 border-yellow-400/40 bg-gradient-to-r from-yellow-400/10 via-amber-400/10 to-orange-400/10 flex items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-yellow-400/20 flex items-center justify-center">
                <span className="font-display font-extrabold text-yellow-500 text-2xl">10</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-lg">{t("case.grade_highlight")}</h3>
                <p className="text-muted-foreground text-sm">{t("case.grade_highlight_desc")}</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-gradient-to-r from-purple-500/10 to-blue-500/10">
              <p className="text-muted-foreground">
                <strong>{t("case.created_by_me")}</strong>, {t("case.be_careful_intro")}
              </p>
            </div>
          </section>
        )}

        {project.slug === 'marmitagest' && (
          <section className="container mx-auto px-6 mb-12 max-w-4xl">
            <div className="p-6 rounded-2xl border-2 border-orange-400/40 bg-gradient-to-r from-orange-400/10 via-amber-400/10 to-orange-500/10 flex items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <span className="text-2xl" aria-hidden>📱</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-lg">{t("case.coming_soon_stores")}</h3>
                <p className="text-muted-foreground text-sm">{t("case.coming_soon_stores_desc")}</p>
              </div>
            </div>
          </section>
        )}

        <section className="container mx-auto px-6 mb-16">

          <div className="w-full rounded-3xl bg-primary/5 border border-border overflow-hidden flex items-center justify-center">
            {project.imagem_capa ? (
              <img src={project.imagem_capa} alt={`Capa do case study ${l.titulo} — ${l.categoria}`} fetchPriority="high" decoding="async" className="w-full h-auto object-contain" />
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
                <span className="font-display font-bold text-primary text-3xl">
                  {l.titulo.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-4xl space-y-16 pb-24">
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("case.context")}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{l.contexto}</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("case.objective")}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{l.objetivo}</p>
          </section>

          <section className="space-y-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("case.process")}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "UX Research", content: l.processo.research },
                { label: "Wireframe", content: l.processo.wireframe },
                { label: "UI Design", content: l.processo.ui_design },
              ].map((step) => (
                <div key={step.label} className="p-6 rounded-2xl border border-border bg-card/30 space-y-3">
                  <h3 className="font-display font-bold text-foreground text-lg">{step.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.content}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("case.tools")}</h2>
            <div className="flex flex-wrap gap-3">
              {project.ferramentas.map((tool) => (
                <span key={tool} className="px-4 py-2 rounded-xl border border-border bg-card/40 font-display font-semibold text-sm text-foreground">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          {project.galeria_de_imagens.length > 0 && (
            <section className="space-y-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("case.gallery")}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.galeria_de_imagens.map((img, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-border bg-primary/5 p-4 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img src={img} alt={`${l.titulo} — tela ${i + 1} do projeto de UX/UI Design`} loading="lazy" decoding="async" className="w-full h-auto object-contain" />
                  </div>
                ))}
              </div>
            </section>
          )}

          <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 bg-background/95 backdrop-blur-sm border-border">
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              {lightboxIndex !== null && (
                <>
                  {lightboxIndex > 0 && (
                    <button
                      onClick={() => setLightboxIndex(lightboxIndex - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-foreground" />
                    </button>
                  )}
                  <img src={project.galeria_de_imagens[lightboxIndex]} alt={t("case.lightbox_alt")} className="w-full h-auto max-h-[85vh] object-contain rounded-xl" />
                  {lightboxIndex < project.galeria_de_imagens.length - 1 && (
                    <button
                      onClick={() => setLightboxIndex(lightboxIndex + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-foreground" />
                    </button>
                  )}
                </>
              )}
            </DialogContent>
          </Dialog>

          <section className="space-y-4 p-8 rounded-3xl border border-accent/30 bg-accent/5">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t("case.result")}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{l.resultado}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
