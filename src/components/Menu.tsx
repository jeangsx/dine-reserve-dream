import { useState } from "react";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";
import dish7 from "@/assets/dish-7.jpg";
import dish8 from "@/assets/dish-8.jpg";
import dish9 from "@/assets/dish-9.jpg";
import { Button } from "@/components/ui/button";

const courses = [
  {
    img: dish1,
    course: "I",
    category: "Sushi",
    title: "Nigiri Selection",
    desc: "Ocho cortes del día sobre arroz akitakomachi, brisa de wasabi fresco rallado al momento.",
    price: "320",
  },
  {
    img: dish2,
    course: "II",
    category: "Sashimi",
    title: "Toro Sashimi",
    desc: "Atún rojo del Pacífico, hoja de shiso del huerto, perlas de wasabi botánico.",
    price: "235",
  },
  {
    img: dish3,
    course: "III",
    category: "Postre",
    title: "Matcha · Kintsugi",
    desc: "Bizcocho de matcha ceremonial uji, ganache de yuzu, oro comestible 24 quilates.",
    price: "105",
  },
  {
    img: dish4,
    course: "IV",
    category: "Maki",
    title: "Dragon Roll",
    desc: "Maki de langostino tempura, aguacate del valle, tobiko cítrico y salsa anguila.",
    price: "180",
  },
  {
    img: dish5,
    course: "V",
    category: "Vapor",
    title: "Gyoza Botánica",
    desc: "Empanadillas al vapor de cerdo kurobuta, jengibre fresco y ajo negro fermentado.",
    price: "145",
  },
  {
    img: dish6,
    course: "VI",
    category: "Caldo",
    title: "Tonkotsu Ramen",
    desc: "Caldo de cerdo de 18 horas, fideos artesanales, chashu, huevo ajitsuke y menma.",
    price: "165",
  },
  {
    img: dish7,
    course: "VII",
    category: "Carne",
    title: "Wagyu Tataki A5",
    desc: "Lomo de wagyu sellado al carbón binchotan, ponzu de yuzu y micro hierbas.",
    price: "420",
  },
  {
    img: dish8,
    course: "VIII",
    category: "Tempura",
    title: "Tempura Trilogía",
    desc: "Langostino, calabaza kabocha y espárrago verde en masa ligera de soda fría.",
    price: "175",
  },
  {
    img: dish9,
    course: "IX",
    category: "Postre",
    title: "Sorbete de Yuzu",
    desc: "Sorbete cítrico de yuzu hokkaido, flores comestibles del jardín y oro 24 quilates.",
    price: "95",
  },
];

export const Menu = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? courses : courses.slice(0, 3);

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
            La carta cambia con la estación. Conoce la variedad de platos firmados por el chef.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {visible.map((c) => (
            <article key={c.title} className="group bg-bone shadow-soft hover:shadow-elegant transition-smooth animate-fade-in">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
              </div>
              <div className="p-8">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-display italic text-accent text-sm">Pase {c.course} · {c.category}</span>
                  <span className="font-display text-2xl text-primary">S/ {c.price}</span>
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
            <p className="font-display text-4xl text-primary mt-2">S/ 720 <span className="text-base text-muted-foreground italic">/ persona</span></p>
            <p className="text-sm text-muted-foreground mt-2">Maridaje de sake opcional · S/ 380</p>
          </div>
          <Button variant="forest" size="xl" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Ver menos platos" : "Ver más platos"}
          </Button>
        </div>
      </div>
    </section>
  );
};
