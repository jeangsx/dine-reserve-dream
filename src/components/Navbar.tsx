import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useReservation } from "./reservation/ReservationContext";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const { open } = useReservation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Carta", href: "#menu" },
    { label: "Historia", href: "#story" },
    { label: "Galería", href: "#gallery" },
    { label: "Prensa", href: "#press" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-smooth ${scrolled ? "bg-forest-deep/85 backdrop-blur-lg border-b border-bone/10" : "bg-transparent"}`}>
      <nav className="container flex items-center justify-between h-20">
        <a href="#" className="flex items-center gap-2 text-bone">
          <span className="font-display text-2xl tracking-wide">SAIKŌ</span>
          <span className="hidden sm:inline text-[10px] tracking-wider-luxe uppercase text-gold">Omakase · 西光</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-bone/80 hover:text-gold transition-colors text-xs tracking-luxe uppercase">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button variant="hero" size="default" onClick={open}>Reservar</Button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-bone p-2" aria-label="Menú">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-forest-deep/95 backdrop-blur-lg border-t border-bone/10 px-6 py-6 space-y-4 animate-fade-in">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-bone/80 hover:text-gold text-sm tracking-luxe uppercase">
              {l.label}
            </a>
          ))}
          <Button variant="hero" size="default" onClick={() => { open(); setMenuOpen(false); }} className="w-full mt-4">
            Reservar mesa
          </Button>
        </div>
      )}
    </header>
  );
};
