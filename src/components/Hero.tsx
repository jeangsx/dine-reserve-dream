import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useReservation } from "./reservation/ReservationContext";
import heroImage from "@/assets/hero.jpg";

export const Hero = () => {
  const { open } = useReservation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Saikō omakase counter" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      <div className="container relative z-10 pt-28 pb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8 reveal">
            <span className="h-px w-10 bg-gold" />
            <span className="tracking-wider-luxe text-[10px] uppercase text-gold">Tokio · Lima · Desde 2014</span>
          </div>

          <h1 className="font-display font-light text-bone text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-balance reveal reveal-delay-1">
            Donde la naturaleza<br/>
            <em className="italic text-gold-soft">conoce</em> el arte<br/>
            del sushi.
          </h1>

          <p className="mt-8 max-w-xl text-bone/80 text-lg font-light leading-relaxed reveal reveal-delay-2">
            Una omakase íntima de quince pases, guiada por el chef Hiroto Tanaka. 
            Pesca del día, vegetales de huerto y un jardín botánico que envuelve cada bocado.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 reveal reveal-delay-3">
            <Button variant="hero" size="xl" onClick={open}>Reservar experiencia</Button>
            <Button variant="outlineLuxe" size="xl" asChild>
              <Link to="/carta">Ver la carta</Link>
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg reveal reveal-delay-4">
            {[
              { k: "★ ★", v: "Michelin" },
              { k: "15", v: "Pases omakase" },
              { k: "10 yr", v: "Experiencia" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-2xl text-gold">{s.k}</p>
                <p className="text-[10px] tracking-luxe uppercase text-bone/60 mt-1">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bone/60 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <span className="text-[9px] tracking-wider-luxe uppercase">Desliza</span>
        <span className="h-12 w-px bg-bone/40" />
      </div>
    </section>
  );
};
