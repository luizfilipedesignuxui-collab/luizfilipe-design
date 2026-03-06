import { useEffect, useRef, useState } from "react";

const StatementSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 md:py-40 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>
      <div
        ref={ref}
        className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <blockquote className="max-w-4xl mx-auto text-center">
          <p className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
            "Design não é apenas como parece.{" "}
            <span className="text-primary">Design é como funciona.</span>"
          </p>
          <cite className="block mt-8 text-lg text-muted-foreground not-italic font-display">
            — Steve Jobs
          </cite>
        </blockquote>
      </div>
    </section>
  );
};

export default StatementSection;
