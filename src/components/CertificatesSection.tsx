import { useEffect, useRef, useState } from "react";
import { Award, ExternalLink, ZoomIn, Calendar, Clock, Building2, CheckCircle2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import certVagaUX from "@/assets/certificates/cert-vagaux.jpg";
import certFigmaCursor from "@/assets/certificates/cert-figma-cursor.jpg";

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
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Certificate | null>(null);
  const { t, language } = useLanguage();

  const certificates: Certificate[] = [
    {
      title: "Do Figma MCP ao Cursor AI",
      institution: "AI Creative Builders",
      year: "2026",
      date: language === "pt" ? "11–12 de Abril de 2026" : "April 11–12, 2026",
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const topics = selected ? t(selected.topicsKey).split("|") : [];

  return (
    <section id="certificados" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={`max-w-2xl mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("certificates.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("certificates.subtitle")}
          </p>
        </div>

        <div
          className={`transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {certificates.map((cert, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 sm:basis-1/2 lg:basis-1/2"
                >
                  <Card className="h-full overflow-hidden border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg group">
                    <button
                      type="button"
                      onClick={() => setSelected(cert)}
                      className="block w-full text-left cursor-pointer"
                      aria-label={`${t("certificates.view_details")} — ${cert.title}`}
                    >
                      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                        {cert.image ? (
                          <>
                            <img
                              src={cert.image}
                              alt={`${t("certificates.alt")} ${cert.title}`}
                              className="w-full h-full object-contain p-3 group-hover:scale-[1.02] transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ZoomIn className="w-4 h-4 text-foreground" />
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
                            <Award className="w-16 h-16 text-primary/40" strokeWidth={1.5} />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-display text-base sm:text-lg font-semibold text-foreground leading-tight">
                            {cert.title}
                          </h3>
                          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap mt-1">
                            {cert.year}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {cert.institution}
                          {cert.hours && <span className="text-muted-foreground/70"> · {cert.hours}</span>}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                          {t("certificates.view_details")}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </CardContent>
                    </button>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
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
                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground/70 font-medium">
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
                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground/70 font-medium">
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
                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground/70 font-medium">
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
                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground/70 font-medium">
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
