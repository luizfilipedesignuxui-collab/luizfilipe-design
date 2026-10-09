import { useState } from "react";
import { Award, ArrowUpRight, ZoomIn, Calendar, Clock, Building2, CheckCircle2 } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { RevealTitle } from "@/components/motion/RevealTitle";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import certVagaUX from "@/assets/certificates/cert-vagaux.jpg";
import certFigmaCursor from "@/assets/certificates/cert-figma-cursor.jpg";
import SectionBridge from "@/components/SectionBridge";

interface Certificate {
 title: string;
 institution: string;
 year: string;
 date?: string;
 hours?: string;
 format?: string;
 instructor?: string;
 descriptionKey: string;
 topicsKey: string;
 image?: string;
 link?: string;
}

const CertificatesSection = () => {
 const [selected, setSelected] = useState<Certificate | null>(null);
 const { t, language } = useLanguage();

 const certificates: Certificate[] = [
 {
 title: "Do Figma MCP ao Cursor AI",
 institution: "AI Creative Builders",
 year: "2026",
 date: language === "pt" ? "11-12 de Abril de 2026" : "April 11-12, 2026",
 hours: "16h",
 format: language === "pt" ? "Presencial" : "In-person",
 instructor: "Lucas Marte",
 descriptionKey: "certificates.figma_cursor.desc",
 topicsKey: "certificates.figma_cursor.topics",
 image: certFigmaCursor,
 },
 {
 title: "Workshop Google Analytics",
 institution: "VagaUX",
 year: "2026",
 date: language === "pt" ? "15 de Abril de 2026" : "April 15, 2026",
 hours: "1h30",
 format: "Online",
 instructor: "Adriana Tamie Akamine",
 descriptionKey: "certificates.ga.desc",
 topicsKey: "certificates.ga.topics",
 image: certVagaUX,
 },
 ];

 const topics = selected ? t(selected.topicsKey).split("|") : [];

 return (
 <section id="certificados" className="section-paper scroll-mt-24 py-16 md:py-20">
 <div className="container mx-auto px-6">
 <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 items-start">
 <Reveal>
 <SectionBridge bridgeKey="certificates.bridge" />
 <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">
 <RevealTitle text={t("certificates.title")} />
 </h2>
 <p className="text-base md:text-lg text-muted-foreground max-w-md">
 {t("certificates.subtitle")}
 </p>
 </Reveal>

 <RevealGroup as="ul" className="grid gap-4 list-none m-0 p-0">
 {certificates.map((cert) => (
 <RevealItem key={cert.title}>
 <button
 type="button"
 onClick={() => setSelected(cert)}
 className="lift-card group grid w-full grid-cols-1 sm:grid-cols-[11rem_1fr] items-center gap-4 sm:gap-5 rounded-[8px] border border-primary bg-white p-3 sm:p-4 text-left"
 aria-label={`${t("certificates.view_details")}: ${cert.title}`}
 >
 <div className="relative aspect-[16/9] sm:aspect-[4/3] overflow-hidden rounded-[8px] bg-muted">
 {cert.image ? (
 <>
 <img
 src={cert.image}
 alt={`${t("certificates.alt")} ${cert.title}`}
 className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
 loading="lazy"
 />
 <span className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 transition-opacity group-hover:opacity-100">
 <ZoomIn className="h-6 w-6 text-white" aria-hidden="true" />
 </span>
 </>
 ) : (
 <span className="flex h-full w-full items-center justify-center">
 <Award className="h-10 w-10 text-primary" strokeWidth={1.5} aria-hidden="true" />
 </span>
 )}
 </div>
 <div className="min-w-0 px-1 pb-1 sm:p-0">
 <p className="text-[0.65rem] font-medium uppercase tracking-[0.15em] sm:tracking-[0.4em] text-foreground mb-2">
 {cert.institution} · {cert.year}
 </p>
 <h3 className="font-display text-2xl text-primary leading-tight mb-2">
 {cert.title}
 </h3>
 <p className="text-sm text-foreground mb-2">
 {[cert.hours, cert.format].filter(Boolean).join(" · ")}
 </p>
 <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-foreground underline decoration-primary decoration-2 underline-offset-4">
 {t("certificates.view_details")}
 <ArrowUpRight className="btn-arrow h-4 w-4 text-primary" aria-hidden="true" />
 </span>
 </div>
 </button>
 </RevealItem>
 ))}
 </RevealGroup>
 </div>
 </div>
 <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
 <DialogContent className="max-w-4xl p-0 bg-background overflow-hidden max-h-[90vh] overflow-y-auto">
 {selected && (
 <div className="grid md:grid-cols-2 gap-0">
 {/* Image */}
 <div className="bg-muted flex items-center justify-center p-4 md:p-6 md:sticky md:top-0 md:self-start md:max-h-[90vh]">
 <img
 src={selected.image}
 alt={`${t("certificates.alt")} ${selected.title}`}
 className="w-full h-auto max-h-[40vh] md:max-h-[80vh] object-contain"
 />
 </div>

 {/* Details */}
 <div className="p-6 md:p-8">
 <DialogTitle className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2">
 {selected.title}
 </DialogTitle>
 <p className="text-base text-muted-foreground mb-6">
 {selected.institution}
 </p>

 <DialogDescription className="text-sm md:text-base text-foreground/80 leading-relaxed mb-6">
 {t(selected.descriptionKey)}
 </DialogDescription>

 {/* Meta grid */}
 <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-border">
 {selected.date && (
 <div className="flex items-start gap-2">
 <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
 <div>
 <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
 {t("certificates.meta.date")}
 </p>
 <p className="text-sm text-foreground">{selected.date}</p>
 </div>
 </div>
 )}
 {selected.hours && (
 <div className="flex items-start gap-2">
 <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
 <div>
 <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
 {t("certificates.meta.hours")}
 </p>
 <p className="text-sm text-foreground">{selected.hours}</p>
 </div>
 </div>
 )}
 {selected.format && (
 <div className="flex items-start gap-2">
 <Building2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
 <div>
 <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
 {t("certificates.meta.format")}
 </p>
 <p className="text-sm text-foreground">{selected.format}</p>
 </div>
 </div>
 )}
 {selected.instructor && (
 <div className="flex items-start gap-2">
 <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
 <div>
 <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
 {t("certificates.meta.instructor")}
 </p>
 <p className="text-sm text-foreground">{selected.instructor}</p>
 </div>
 </div>
 )}
 </div>

 {/* Topics */}
 {topics.length > 0 && (
 <div>
 <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
 {t("certificates.topics")}
 </h4>
 <ul className="space-y-2">
 {topics.map((topic, i) => (
 <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
 <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
 <span>{topic.trim()}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 </div>
 )}
 </DialogContent>
 </Dialog>
 </section>
 );
};

export default CertificatesSection;
