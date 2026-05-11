import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useReservation } from "@/components/reservation/ReservationContext";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contacto = () => {
  const { open } = useReservation();
  useEffect(() => {
    document.title = "Contacto · Sabor Gourmet";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="container">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="tracking-wider-luxe text-[10px] uppercase text-accent">Hablemos</span>
            <h1 className="font-display font-light text-5xl md:text-6xl text-primary mt-4">
              Estamos para <em className="italic text-moss">atenderte</em>
            </h1>
            <p className="mt-6 text-foreground/70 text-lg">
              Contáctanos para reservas, eventos privados o cualquier consulta.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl text-primary mb-1">Dirección</h3>
                  <p className="text-foreground/70">Av. La Floresta 245<br/>San Isidro, Lima</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl text-primary mb-1">Teléfono</h3>
                  <p className="text-foreground/70">+51 1 555 0000<br/>+51 987 654 321</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl text-primary mb-1">Email</h3>
                  <p className="text-foreground/70">hola@saborgourmet.com<br/>eventos@saborgourmet.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl text-primary mb-1">Horario</h3>
                  <p className="text-foreground/70">Mar — Sáb · 19:00 — 23:30<br/>Cerrado dom y lun</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/40 p-10">
              <h2 className="font-display text-3xl text-primary mb-4">¿Listo para reservar?</h2>
              <p className="text-foreground/70 mb-8">
                Solo doce mesas por servicio. Te recomendamos reservar con antelación.
              </p>
              <Button variant="forest" size="xl" onClick={open} className="w-full">
                Reservar mesa
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contacto;
