import { useEffect } from "react";
import { ReservationProvider } from "@/components/reservation/ReservationContext";
import { Navbar } from "@/components/Navbar";
import { Press } from "@/components/Press";
import { Footer } from "@/components/Footer";

const Prensa = () => {
  useEffect(() => {
    document.title = "Prensa · Saikō";
  }, []);
  return (
    <ReservationProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <Press />
        </main>
        <Footer />
      </div>
    </ReservationProvider>
  );
};

export default Prensa;
