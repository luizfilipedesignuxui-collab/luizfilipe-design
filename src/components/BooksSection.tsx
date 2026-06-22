import { useEffect, useRef, useState } from "react";
import { BookOpen, ShoppingCart, Star, FileText, Languages, Calendar, Tag, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface BookStore {
  name: string;
  url: string;
}

interface BookReview {
  quote: string;
  author: string;
}

interface Book {
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  cover?: string;
  status?: string;
  badge?: string;
  genre?: string;
  pages?: number;
  language?: string;
  publishedAt?: string;
  rating?: number;
  topics?: string[];
  stores?: BookStore[];
  review?: BookReview;
  featured?: boolean;
}

const BooksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const isPT = language === "pt";

  // TODO: substituir pelos livros reais
  const books: Book[] = [
    {
      title: isPT ? "Título do Livro 1" : "Book Title 1",
      subtitle: isPT ? "Um subtítulo que resume a essência" : "A subtitle that captures the essence",
      description: isPT
        ? "Breve descrição do livro: tema central, para quem é e o que o leitor vai levar."
        : "Short description: main topic, audience, and what readers will take away.",
      longDescription: isPT
        ? "Aqui você pode escrever um parágrafo mais detalhado contando a inspiração por trás do livro, a abordagem usada e o que torna essa obra única. Use esse espaço para criar conexão com o leitor."
        : "Use this space for a longer paragraph telling the story behind the book, the approach used, and what makes this work unique. Connect with the reader here.",
      status: isPT ? "Em breve nas lojas" : "Coming soon",
      badge: isPT ? "Lançamento" : "New release",
      genre: isPT ? "Design / Criatividade" : "Design / Creativity",
      pages: 180,
      language: isPT ? "Português" : "Portuguese",
      publishedAt: "2026",
      rating: 5,
      topics: isPT
        ? ["Processo criativo", "Design centrado no usuário", "Estudos de caso reais", "Frameworks práticos"]
        : ["Creative process", "User-centered design", "Real case studies", "Practical frameworks"],
      stores: [
        { name: "Amazon", url: "#" },
        { name: "Kindle", url: "#" },
      ],
      review: {
        quote: isPT
          ? "Uma leitura essencial para quem quer pensar design com profundidade."
          : "An essential read for anyone who wants to think about design with depth.",
        author: isPT ? "Nome do Autor — Profissão" : "Author Name — Title",
      },
      featured: true,
    },
    {
      title: isPT ? "Título do Livro 2" : "Book Title 2",
      subtitle: isPT ? "Subtítulo opcional" : "Optional subtitle",
      description: isPT
        ? "Breve descrição do livro: tema central, para quem é e o que o leitor vai levar."
        : "Short description: main topic, audience, and what readers will take away.",
      status: isPT ? "Em breve" : "Coming soon",
      genre: isPT ? "Carreira / UX" : "Career / UX",
      pages: 140,
      language: isPT ? "Português" : "Portuguese",
      publishedAt: "2026",
      topics: isPT
        ? ["Carreira em UX", "Portfólio", "Entrevistas"]
        : ["UX career", "Portfolio", "Interviews"],
    },
    {
      title: isPT ? "Título do Livro 3" : "Book Title 3",
      subtitle: isPT ? "Subtítulo opcional" : "Optional subtitle",
      description: isPT
        ? "Breve descrição do livro: tema central, para quem é e o que o leitor vai levar."
        : "Short description: main topic, audience, and what readers will take away.",
      status: isPT ? "Em breve" : "Coming soon",
      genre: isPT ? "Produtividade" : "Productivity",
      pages: 120,
      language: isPT ? "Português" : "Portuguese",
      publishedAt: "2026",
      topics: isPT
        ? ["Foco", "Hábitos", "Ferramentas"]
        : ["Focus", "Habits", "Tools"],
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

  const featured = books.find((b) => b.featured);
  const others = books.filter((b) => !b.featured);

  return (
    <section id="livros" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={`max-w-2xl mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-4">
            <BookOpen className="w-4 h-4" />
            {isPT ? "Publicações" : "Publications"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {isPT ? "Meus Livros" : "My Books"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isPT
              ? "Conteúdos que escrevi para compartilhar conhecimento sobre design, criatividade e processo. Em breve disponíveis nas principais lojas virtuais."
              : "Content I wrote to share knowledge about design, creativity, and process. Coming soon to major online stores."}
          </p>
        </div>

        {/* Featured book */}
        {featured && (
          <div
            className={`mb-16 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="overflow-hidden border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
              <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr]">
                {/* Cover */}
                <div className="relative bg-muted p-8 md:p-10 flex items-center justify-center">
                  <div className="aspect-[2/3] w-full max-w-[260px] rounded-md shadow-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/20 relative">
                    {featured.cover ? (
                      <img
                        src={featured.cover}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-primary/40" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  {featured.badge && (
                    <span className="absolute top-6 left-6 inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-primary-foreground bg-primary px-2.5 py-1 rounded">
                      {featured.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-6 md:p-10 flex flex-col">
                  {featured.status && (
                    <span className="self-start inline-flex items-center text-[11px] font-medium uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded mb-4">
                      {featured.status}
                    </span>
                  )}
                  <h3 className="font-display text-2xl md:text-4xl font-bold text-foreground leading-tight mb-2">
                    {featured.title}
                  </h3>
                  {featured.subtitle && (
                    <p className="text-base md:text-lg text-muted-foreground mb-5">
                      {featured.subtitle}
                    </p>
                  )}

                  {/* Rating */}
                  {featured.rating && (
                    <div className="flex items-center gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < featured.rating!
                              ? "fill-primary text-primary"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-6">
                    {featured.longDescription || featured.description}
                  </p>

                  {/* Meta grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-border">
                    {featured.pages && (
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-muted-foreground/70 font-medium">
                            {isPT ? "Páginas" : "Pages"}
                          </p>
                          <p className="text-sm text-foreground">{featured.pages}</p>
                        </div>
                      </div>
                    )}
                    {featured.language && (
                      <div className="flex items-start gap-2">
                        <Languages className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-muted-foreground/70 font-medium">
                            {isPT ? "Idioma" : "Language"}
                          </p>
                          <p className="text-sm text-foreground">{featured.language}</p>
                        </div>
                      </div>
                    )}
                    {featured.publishedAt && (
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-muted-foreground/70 font-medium">
                            {isPT ? "Publicação" : "Published"}
                          </p>
                          <p className="text-sm text-foreground">{featured.publishedAt}</p>
                        </div>
                      </div>
                    )}
                    {featured.genre && (
                      <div className="flex items-start gap-2">
                        <Tag className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-muted-foreground/70 font-medium">
                            {isPT ? "Gênero" : "Genre"}
                          </p>
                          <p className="text-sm text-foreground">{featured.genre}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Topics */}
                  {featured.topics && featured.topics.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-display text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                        {isPT ? "Você vai aprender" : "You'll learn"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {featured.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-foreground/80 border border-border"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Review */}
                  {featured.review && (
                    <div className="mb-6 p-4 rounded-md bg-muted/50 border-l-2 border-primary">
                      <Quote className="w-4 h-4 text-primary mb-2" />
                      <p className="text-sm italic text-foreground/80 leading-relaxed mb-2">
                        "{featured.review.quote}"
                      </p>
                      <p className="text-xs text-muted-foreground">— {featured.review.author}</p>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {featured.stores && featured.stores.length > 0 ? (
                      featured.stores.map((store, i) => (
                        <Button
                          key={i}
                          asChild
                          size="sm"
                          variant={i === 0 ? "default" : "outline"}
                        >
                          <a href={store.url} target="_blank" rel="noopener noreferrer">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {isPT ? "Comprar na " : "Buy on "}
                            {store.name}
                          </a>
                        </Button>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground italic">
                        {isPT ? "Links em breve" : "Links coming soon"}
                      </span>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Other books grid */}
        {others.length > 0 && (
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              {isPT ? "Outros títulos" : "More titles"}
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {others.map((book, i) => (
                <Card
                  key={i}
                  className="overflow-hidden border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg group flex flex-col"
                >
                  <div className="aspect-[3/2] bg-muted relative overflow-hidden flex items-center justify-center">
                    {book.cover ? (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <BookOpen className="w-12 h-12 text-primary/40" strokeWidth={1.5} />
                    )}
                    {book.status && (
                      <span className="absolute top-3 left-3 inline-flex items-center text-[10px] font-medium uppercase tracking-wider text-primary bg-background/90 backdrop-blur px-2 py-1 rounded">
                        {book.status}
                      </span>
                    )}
                  </div>
                  <CardContent className="p-5 sm:p-6 flex flex-col flex-1">
                    {book.genre && (
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium mb-2">
                        {book.genre}
                      </p>
                    )}
                    <h3 className="font-display text-lg font-semibold text-foreground leading-tight mb-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-4 flex-1">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                      <span>
                        {book.pages && `${book.pages} ${isPT ? "páginas" : "pages"}`}
                      </span>
                      <span>{book.publishedAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BooksSection;
