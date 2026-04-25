import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import interiorImage from "@/assets/interior.jpg";

const items = [
  { img: g1, label: "Chirashi", caption: "El bol de la casa" },
  { img: g2, label: "Tsume", caption: "Glaseado de anguila" },
  { img: interiorImage, label: "Sala", caption: "Doce mesas, un jardín" },
  { img: g3, label: "Sake", caption: "Junmai Daiginjo" },
];

export const Gallery = () => {
  return (
    <section id="gallery" className="py-24 md:py-36 bg-forest-deep text-bone overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="tracking-wider-luxe text-[10px] uppercase text-gold">Atmósfera</span>
            </div>
            <h2 className="font-display font-light text-5xl md:text-6xl leading-tight text-balance max-w-xl">
              Un jardín secreto<br/>en el corazón <em className="italic text-gold-soft">del barrio</em>
            </h2>
          </div>
          <p className="max-w-md text-bone/70 leading-relaxed">
            Cada rincón es un pequeño teatro. Plantas vivas, piedra natural, 
            luz cálida que cae sobre la barra. Pasen, respiren.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((it, i) => (
            <figure key={it.label} className={`group relative overflow-hidden ${i === 0 || i === 3 ? "md:row-span-2 md:aspect-[3/4]" : "aspect-square"}`}>
              <img src={it.img} alt={it.label} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/0 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-smooth">
                <p className="font-display italic text-gold-soft text-sm">{it.label}</p>
                <p className="text-bone text-sm font-light">{it.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
