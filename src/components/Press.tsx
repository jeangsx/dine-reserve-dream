const reviews = [
  {
    quote: "Saikō no es un restaurante: es un viaje sensorial. Tanaka borda cada nigiri con una precisión casi meditativa.",
    author: "Andrea Fontán",
    source: "El País Gastronomía",
  },
  {
    quote: "El mejor omakase fuera de Japón. La fusión con producto local raya lo poético.",
    author: "James Whitfield",
    source: "World's 50 Best",
  },
  {
    quote: "Una experiencia íntima y luminosa. Cada pase es una declaración de respeto al producto.",
    author: "Lucía Mendoza",
    source: "Vogue España",
  },
];

const press = ["MICHELIN", "REPSOL", "VOGUE", "EL PAÍS", "50 BEST", "CONDÉ NAST"];

export const Press = () => {
  return (
    <section id="press" className="py-24 md:py-36 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="tracking-wider-luxe text-[10px] uppercase text-accent">Lo que dicen</span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-display font-light text-5xl md:text-6xl leading-tight text-balance max-w-3xl mx-auto">
            Reconocido por la crítica,<br/>
            <em className="italic text-moss">amado</em> por nuestros invitados
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {reviews.map((r) => (
            <blockquote key={r.author} className="bg-secondary/50 p-8 md:p-10 border-l-2 border-accent transition-smooth hover:bg-secondary">
              <span className="font-display text-6xl text-accent leading-none">"</span>
              <p className="font-display italic text-xl text-primary leading-relaxed -mt-4">
                {r.quote}
              </p>
              <footer className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-medium text-primary">{r.author}</p>
                <p className="text-xs tracking-luxe uppercase text-muted-foreground mt-1">{r.source}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="border-y border-border py-10">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {press.map((p) => (
              <span key={p} className="font-display text-xl tracking-luxe text-muted-foreground/70 hover:text-primary transition-colors">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
