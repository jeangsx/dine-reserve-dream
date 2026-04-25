import { Button } from "@/components/ui/button";
import { useReservation } from "./reservation/ReservationContext";
import { MapPin, Clock, Phone } from "lucide-react";

export const Footer = () => {
  const { open } = useReservation();

  return (
    <footer className="bg-gradient-forest text-bone">
      {/* CTA Block */}
      <div className="container py-24 md:py-32 text-center border-b border-bone/10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-10 bg-gold" />
          <span className="tracking-wider-luxe text-[10px] uppercase text-gold">Reserva tu mesa</span>
          <span className="h-px w-10 bg-gold" />
        </div>
        <h2 className="font-display font-light text-5xl md:text-7xl leading-tight text-balance max-w-3xl mx-auto">
          Solo doce mesas.<br/>
          <em className="italic text-gold-soft">Una</em> debería ser tuya.
        </h2>
        <p className="mt-8 text-bone/70 max-w-lg mx-auto text-lg">
          Las reservas se abren con 60 días de antelación. Te recomendamos hacerla con tiempo.
        </p>
        <div className="mt-10">
          <Button variant="hero" size="xl" onClick={open}>Reservar ahora</Button>
        </div>
      </div>

      {/* Info grid */}
      <div className="container py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <p className="font-display text-3xl mb-2">SAIKŌ</p>
          <p className="text-[10px] tracking-wider-luxe uppercase text-gold mb-6">Omakase 西光</p>
          <p className="text-bone/60 text-sm leading-relaxed">
            Cocina japonesa contemporánea de inspiración botánica. Lima.
          </p>
        </div>

        <div>
          <h3 className="text-xs tracking-luxe uppercase text-gold mb-4">Visítanos</h3>
          <p className="flex items-start gap-2 text-bone/70 text-sm leading-relaxed">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold-soft" />
            <span>Av. La Floresta 245<br/>San Isidro, Lima</span>
          </p>
        </div>

        <div>
          <h3 className="text-xs tracking-luxe uppercase text-gold mb-4">Horario</h3>
          <div className="flex items-start gap-2 text-bone/70 text-sm leading-relaxed">
            <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold-soft" />
            <div>
              <p>Mar — Sáb</p>
              <p>19:00 — 23:30</p>
              <p className="mt-2 text-bone/40 text-xs">Cerrado dom y lun</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs tracking-luxe uppercase text-gold mb-4">Contacto</h3>
          <p className="flex items-start gap-2 text-bone/70 text-sm leading-relaxed">
            <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold-soft" />
            <span>+51 1 555 0000<br/>hola@saiko.pe</span>
          </p>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-bone/40">
          <p>© {new Date().getFullYear()} Saikō. Todos los derechos reservados.</p>
          <p className="tracking-luxe uppercase">Hecho con cuidado en Lima · 心</p>
        </div>
      </div>
    </footer>
  );
};
