import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";

const Galeria = () => {
  useEffect(() => {
    document.title = "Galería · Saikō";
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default Galeria;
