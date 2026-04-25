import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Story } from "@/components/Story";
import { Footer } from "@/components/Footer";

const Historia = () => {
  useEffect(() => {
    document.title = "Nuestra historia · Saikō";
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Story />
      </main>
      <Footer />
    </div>
  );
};

export default Historia;
