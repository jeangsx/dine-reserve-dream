import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useReservation } from "@/components/reservation/ReservationContext";
import interior from "@/assets/interior.jpg";
import gallery1 from "@/assets/gallery-1.jpg";

const events = [
  {
    title: "Cena Privada Kaiseki",
    capacity: "8 — 14 personas",
    desc: "Salón privado con vistas al jardín interior. Menú kaiseki diseñado a medida con el chef.",
    price: "Desde S/ 850 / persona",
  },
  {
    title: "Eventos Corporativos",
    capacity: "20 — 40 personas",
    desc: "Reserva exclusiva del salón principal. Maridaje de sake premium y servicio personalizado.",
    price: "Consulta a medida",
  },
  {
    title: "Bodas íntimas",
    capacity: "Hasta 60 personas",
    desc: "Privatización completa del restaurante y el jardín botánico para tu día especial.",
    price: "Consulta a medida",
  },
];

const Eventos = () => {
  const { open } = useReservation();
  useEffect(() => {
    document.title = "Eventos · Saikō Omakase";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative h-[60vh] overflow-hidden">
          <img src={interior} alt="Saikō salón privado" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-overlay" />
          <div className="container relative z-10 h-full flex items-end pb-16">
            <div className="max-w-2xl">
              <span className="tracking-wider-luxe text-[10px] uppercase text-gold">Celebraciones únicas</span>
              <h1 className="font-display font-light text-bone text-5xl md:text-7xl leading-tight mt-4">
                Eventos <em className="italic text-gold-soft">privados</em>
              </h1>
            </div>
          </div>
        </section>

        <section className="py-24 container">
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((e) => (
              <article key={e.title} className="bg-bone p-10 shadow-soft hover:shadow-elegant transition-smooth">
                <p className="text-[10px] tracking-wider-luxe uppercase text-accent">{e.capacity}</p>
                <h3 className="font-display text-3xl text-primary mt-4 mb-4">{e.title}</h3>
                <p className="text-foreground/65 text-sm leading-relaxed mb-6">{e.desc}</p>
                <p className="font-display text-xl text-moss">{e.price}</p>
              </article>
            ))}
          </div>

          <div className="mt-20 grid md:grid-cols-2 gap-12 items-center bg-secondary/40 p-12">
            <img src={gallery1} alt="Salón privado" className="w-full h-[400px] object-cover" />
            <div>
              <h2 className="font-display text-4xl text-primary mb-6">Diseña tu experiencia</h2>
              <p className="text-foreground/70 mb-8">
                Nuestro equipo te acompañará en cada detalle: menú, maridaje, ambientación floral
                y servicio. Cada celebración es única.
              </p>
              <Button variant="forest" size="xl" onClick={open}>Reservar consulta</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Eventos;
