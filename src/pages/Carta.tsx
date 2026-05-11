import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Menu } from "@/components/Menu";
import { Footer } from "@/components/Footer";

const Carta = () => {
  useEffect(() => {
    document.title = "Carta · Sabor Gourmet";
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Menu />
      </main>
      <Footer />
    </div>
  );
};

export default Carta;
