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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const extraDishes = [
  {
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    course: "X",
    category: "Carne",
    title: "Wagyu Tataki A5",
    desc: "Lomo de wagyu sellado al carbón binchotan, ponzu de yuzu y micro hierbas.",
    price: "420",
  },
  {
    img: "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=800&q=80",
    course: "XI",
    category: "Tempura",
    title: "Tempura Trilogía",
    desc: "Langostino, calabaza kabocha y espárrago verde en masa ligera de soda fría.",
    price: "175",
  },
  {
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    course: "XII",
    category: "Postre",
    title: "Mochi de Sakura",
    desc: "Mochi artesanal relleno de anko de fresa, polvo de flor de cerezo y helado de vainilla bourbon.",
    price: "115",
  },
  {
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80",
    course: "XIII",
    category: "Sushi",
    title: "Uramaki Trufa",
    desc: "Rollo invertido de salmón ahumado, queso crema y láminas de trufa negra de temporada.",
    price: "210",
  },
  {
    img: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80",
    course: "XIV",
    category: "Sashimi",
    title: "Hamachi Jalapeño",
    desc: "Pez limón del Atlántico, leche de tigre de yuzu, jalapeño fresco y aceite de sésamo tostado.",
    price: "195",
  },
  {
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    course: "XV",
    category: "Caldo",
    title: "Miso Shiru Premium",
    desc: "Sopa de miso blanco shiro con tofu de seda, wakame del Pacífico y dashi de bonito ahumado.",
    price: "85",
  },
  {
    img: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=800&q=80",
    course: "XVI",
    category: "Maki",
    title: "Spider Roll",
    desc: "Cangrejo de caparazón blando frito, pepino, aguacate y mayonesa de sriracha casera.",
    price: "190",
  },
  {
    img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80",
    course: "XVII",
    category: "Vapor",
    title: "Shumai de Vieira",
    desc: "Dim sum de vieira hokkaido al vapor, aceite de trufa blanca y huevas de salmón salvaje.",
    price: "160",
  },
  {
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    course: "XVIII",
    category: "Postre",
    title: "Sorbete de Yuzu",
    desc: "Sorbete cítrico de yuzu hokkaido, flores comestibles del jardín y oro 24 quilates.",
    price: "95",
  },
];

const VISIBLE_COUNT = 6;

export const Menu = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const visible = courses.slice(0, VISIBLE_COUNT);
  const extra = extraDishes;

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

        {/* Dialog centrado con platos extra */}
        <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
          <DialogContent className="max-w-4xl w-full p-0">
            <DialogHeader className="px-8 pt-8 pb-4 border-b border-border">
              <DialogTitle className="font-display font-light text-3xl text-primary">Más platos</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="grid sm:grid-cols-2 gap-6 p-8">
                {extra.map((c) => (
                  <article key={c.title} className="group bg-bone shadow-soft hover:shadow-elegant transition-smooth">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={c.img} alt={c.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="font-display italic text-accent text-sm">Pase {c.course} · {c.category}</span>
                        <span className="font-display text-xl text-primary">S/ {c.price}</span>
                      </div>
                      <h3 className="font-display text-xl text-primary mb-2">{c.title}</h3>
                      <p className="text-foreground/65 text-sm leading-relaxed">{c.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="tracking-luxe uppercase text-xs text-muted-foreground">Menú degustación completo</p>
            <p className="font-display text-4xl text-primary mt-2">S/ 720 <span className="text-base text-muted-foreground italic">/ persona</span></p>
            <p className="text-sm text-muted-foreground mt-2">Maridaje de sake opcional · S/ 380</p>
          </div>
          {extra.length > 0 && (
            <Button variant="forest" size="xl" onClick={() => setSheetOpen(true)}>
              Ver más platos
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
