import { useEffect, useRef, useState } from "react";
import { Award, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface Certificate {
  title: string;
  institution: string;
  year: string;
  image?: string;
  link?: string;
}

const CertificatesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  // Placeholders — substitua pelos seus certificados reais
  const certificates: Certificate[] = [
    { title: "UX/UI Design", institution: "Instituição", year: "2024" },
    { title: "Design System", institution: "Instituição", year: "2024" },
    { title: "User Research", institution: "Instituição", year: "2023" },
    { title: "Figma Avançado", institution: "Instituição", year: "2023" },
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
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full overflow-hidden border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg group">
                    <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={`${t("certificates.alt")} ${cert.title}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
                          <Award className="w-16 h-16 text-primary/40" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
                          {cert.title}
                        </h3>
                        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap mt-1">
                          {cert.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {cert.institution}
                      </p>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
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
    </section>
  );
};

export default CertificatesSection;
