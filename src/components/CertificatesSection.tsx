import { useEffect, useRef, useState } from "react";
import { Award, ExternalLink, ZoomIn } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import certVagaUX from "@/assets/certificates/cert-vagaux.jpg";
import certFigmaCursor from "@/assets/certificates/cert-figma-cursor.jpg";

interface Certificate {
  title: string;
  institution: string;
  year: string;
  hours?: string;
  image?: string;
  link?: string;
}

const CertificatesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [zoomed, setZoomed] = useState<Certificate | null>(null);
  const { t } = useLanguage();

  const certificates: Certificate[] = [
    {
      title: "Do Figma MCP ao Cursor AI",
      institution: "AI Creative Builders",
      year: "2026",
      hours: "16h",
      image: certFigmaCursor,
    },
    {
      title: "Workshop Google Analytics",
      institution: "VagaUX",
      year: "2026",
      hours: "1h30",
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
                      onClick={() => cert.image && setZoomed(cert)}
                      className="block w-full aspect-[4/3] bg-muted relative overflow-hidden cursor-zoom-in"
                      aria-label={`${t("certificates.view")} — ${cert.title}`}
                    >
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
                    </button>
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display text-base sm:text-lg font-semibold text-foreground leading-tight">
                          {cert.title}
                        </h3>
                        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap mt-1">
                          {cert.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cert.institution}
                        {cert.hours && <span className="text-muted-foreground/70"> · {cert.hours}</span>}
                      </p>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          {t("certificates.view")}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        </div>
      </div>

      <Dialog open={!!zoomed} onOpenChange={(open) => !open && setZoomed(null)}>
        <DialogContent className="max-w-5xl p-0 bg-background overflow-hidden">
          <DialogTitle className="sr-only">{zoomed?.title}</DialogTitle>
          {zoomed?.image && (
            <img
              src={zoomed.image}
              alt={`${t("certificates.alt")} ${zoomed.title}`}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CertificatesSection;
