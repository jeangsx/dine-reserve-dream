import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import { Button } from "@/components/ui/button";
import { useReservation } from "./reservation/ReservationContext";

const courses = [
  {
    img: dish1,
    course: "I",
    title: "Nigiri Selection",
    desc: "Ocho cortes del día sobre arroz akitakomachi, brisa de wasabi fresco rallado al momento.",
    price: "85",
  },
  {
    img: dish2,
    course: "II",
    title: "Toro Sashimi",
    desc: "Atún rojo del Mediterráneo, hoja de shiso del huerto, perlas de wasabi botánico.",
    price: "62",
  },
  {
    img: dish3,
    course: "III",
    title: "Matcha · Kintsugi",
    desc: "Bizcocho de matcha ceremonial uji, ganache de yuzu, oro comestible 24 quilates.",
    price: "28",
  },
];

export const Menu = () => {
  const { open } = useReservation();

  return (
    <section id="menu" className="py-24 md:py-36 bg-secondary/40 relative">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="tracking-wider-luxe text-[10px] uppercase text-accent">Pases destacados</span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-display font-light text-5xl md:text-6xl leading-tight text-balance">
            Una <em className="italic text-moss">omakase</em> de<br/>quince momentos
          </h2>
          <p className="mt-6 text-foreground/70 text-lg">
            La carta cambia con la estación. Estos son tres pases firmados por el chef.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((c, i) => (
            <article key={c.title} className="group bg-bone shadow-soft hover:shadow-elegant transition-smooth">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
              </div>
              <div className="p-8">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-display italic text-accent text-sm">Pase {c.course}</span>
                  <span className="font-display text-2xl text-primary">{c.price}€</span>
                </div>
                <h3 className="font-display text-2xl text-primary mb-3">{c.title}</h3>
                <p className="text-foreground/65 text-sm leading-relaxed">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="tracking-luxe uppercase text-xs text-muted-foreground">Menú degustación completo</p>
            <p className="font-display text-4xl text-primary mt-2">185€ <span className="text-base text-muted-foreground italic">/ persona</span></p>
            <p className="text-sm text-muted-foreground mt-2">Maridaje de sake opcional · 95€</p>
          </div>
          <Button variant="forest" size="xl" onClick={open}>Reservar omakase</Button>
        </div>
      </div>
    </section>
  );
};
