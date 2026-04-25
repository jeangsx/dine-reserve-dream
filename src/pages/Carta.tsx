import { useEffect } from "react";
import { ReservationProvider } from "@/components/reservation/ReservationContext";
import { Navbar } from "@/components/Navbar";
import { Menu } from "@/components/Menu";
import { Footer } from "@/components/Footer";

const Carta = () => {
  useEffect(() => {
    document.title = "Carta · Saikō Omakase";
  }, []);
  return (
    <ReservationProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <Menu />
        </main>
        <Footer />
      </div>
    </ReservationProvider>
  );
};

export default Carta;
