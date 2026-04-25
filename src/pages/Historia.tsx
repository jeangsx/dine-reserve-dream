import { useEffect } from "react";
import { ReservationProvider } from "@/components/reservation/ReservationContext";
import { Navbar } from "@/components/Navbar";
import { Story } from "@/components/Story";
import { Footer } from "@/components/Footer";

const Historia = () => {
  useEffect(() => {
    document.title = "Nuestra historia · Saikō";
  }, []);
  return (
    <ReservationProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <Story />
        </main>
        <Footer />
      </div>
    </ReservationProvider>
  );
};

export default Historia;
