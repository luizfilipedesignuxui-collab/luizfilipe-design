import { useEffect, useRef, useState } from "react";
import { BookOpen, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Book {
  title: string;
  subtitle?: string;
  description: string;
  cover?: string;
  status?: string; // e.g. "Em breve" / "Disponível"
  storeUrl?: string;
}

const BooksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();

  // TODO: substituir pelos livros reais
  const books: Book[] = [
    {
      title: language === "pt" ? "Título do Livro 1" : "Book Title 1",
      subtitle: language === "pt" ? "Subtítulo opcional" : "Optional subtitle",
      description:
        language === "pt"
          ? "Breve descrição do livro. Conte sobre o tema, para quem é e o que o leitor vai aprender."
          : "Short description of the book. Tell about the topic, the audience, and what readers will learn.",
      status: language === "pt" ? "Em breve" : "Coming soon",
    },
    {
      title: language === "pt" ? "Título do Livro 2" : "Book Title 2",
      subtitle: language === "pt" ? "Subtítulo opcional" : "Optional subtitle",
      description:
        language === "pt"
          ? "Breve descrição do livro. Conte sobre o tema, para quem é e o que o leitor vai aprender."
          : "Short description of the book. Tell about the topic, the audience, and what readers will learn.",
      status: language === "pt" ? "Em breve" : "Coming soon",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="livros" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={`max-w-2xl mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-4">
            <BookOpen className="w-4 h-4" />
            {language === "pt" ? "Publicações" : "Publications"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === "pt" ? "Meus Livros" : "My Books"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === "pt"
              ? "Conteúdos que escrevi para compartilhar conhecimento sobre design, criatividade e processo."
              : "Content I wrote to share knowledge about design, creativity, and process."}
          </p>
        </div>

        <div
          className={`grid gap-8 md:grid-cols-2 transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {books.map((book, i) => (
            <Card
              key={i}
              className="overflow-hidden border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr]">
                <div className="aspect-[2/3] bg-muted relative overflow-hidden">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
                      <BookOpen className="w-12 h-12 text-primary/40" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <CardContent className="p-5 sm:p-6 flex flex-col">
                  {book.status && (
                    <span className="self-start inline-flex items-center text-[11px] font-medium uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded mb-3">
                      {book.status}
                    </span>
                  )}
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-tight mb-1">
                    {book.title}
                  </h3>
                  {book.subtitle && (
                    <p className="text-sm text-muted-foreground mb-3">{book.subtitle}</p>
                  )}
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4 flex-1">
                    {book.description}
                  </p>
                  {book.storeUrl ? (
                    <Button asChild size="sm" className="self-start">
                      <a href={book.storeUrl} target="_blank" rel="noopener noreferrer">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {language === "pt" ? "Comprar" : "Buy"}
                      </a>
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      {language === "pt" ? "Link em breve" : "Link coming soon"}
                    </span>
                  )}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
