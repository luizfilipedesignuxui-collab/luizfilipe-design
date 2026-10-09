import { Code2, Compass, Layout, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { RevealTitle } from "@/components/motion/RevealTitle";

const AreasSection = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Compass, title: t("hero.service_ux_title"), desc: t("hero.service_ux") },
    { icon: Layout, title: t("hero.service_brand_title"), desc: t("hero.service_brand") },
    { icon: Smartphone, title: t("hero.service_responsive_title"), desc: t("hero.service_responsive") },
    { icon: Code2, title: t("hero.service_prototyping_title"), desc: t("hero.service_prototyping") },
  ];

  return (
    <section
      id="atuacao"
      className="section-brand scroll-mt-24 py-16 md:py-24"
      aria-labelledby="areas-heading"
    >
      <div className="container mx-auto px-6">
        <Reveal className="mb-10 max-w-2xl">
          <p className="font-label text-foreground mb-3">{t("hero.card_left_title")}</p>
          <h2 id="areas-heading" className="font-display text-4xl md:text-5xl text-white mb-4">
            <RevealTitle text={t("hero.services_label")} />
          </h2>
          <p className="text-base text-foreground">{t("hero.card_left_desc")}</p>
        </Reveal>

        <RevealGroup as="ul" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none m-0 p-0">
          {services.map((service) => (
            <RevealItem key={service.title} className="h-full">
              <div className="lift-card group flex h-full flex-col gap-4 rounded-[8px] bg-white p-6">
                <span
                  className="w-11 h-11 rounded-[8px] bg-primary flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  aria-hidden="true"
                >
                  <service.icon className="w-5 h-5 text-white" />
                </span>
                <h3 className="font-display text-2xl text-primary">{service.title}</h3>
                <p className="text-sm text-foreground leading-relaxed">{service.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default AreasSection;
