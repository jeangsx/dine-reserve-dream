import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Press } from "@/components/Press";
import { Footer } from "@/components/Footer";

const Prensa = () => {
  useEffect(() => {
    document.title = "Prensa · Saikō";
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Press />
      </main>
      <Footer />
    </div>
  );
};

export default Prensa;
