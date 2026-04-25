import { useEffect } from "react";
import { ReservationProvider } from "@/components/reservation/ReservationContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Press } from "@/components/Press";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Saikō · Omakase japonés botánico en Madrid";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Saikō, restaurante japonés de inspiración botánica en Madrid. Omakase de quince pases por el chef Hiroto Tanaka. Reserva tu mesa."
    );
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/");
  }, []);

  return (
    <ReservationProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Story />
          <Menu />
          <Gallery />
          <Press />
        </main>
        <Footer />
      </div>
    </ReservationProvider>
  );
};

export default Index;
