import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useReservation } from "./reservation/ReservationContext";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const { open } = useReservation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Carta", to: "/carta" },
    { label: "Historia", to: "/historia" },
    { label: "Galería", to: "/galeria" },
    { label: "Prensa", to: "/prensa" },
  ];

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-smooth ${transparent ? "bg-transparent" : "bg-forest-deep/85 backdrop-blur-lg border-b border-bone/10"}`}>
      <nav className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 text-bone">
          <span className="font-display text-2xl tracking-wide">SAIKŌ</span>
          <span className="hidden sm:inline text-[10px] tracking-wider-luxe uppercase text-gold">Omakase · 西光</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xs tracking-luxe uppercase transition-colors ${active ? "text-gold" : "text-bone/80 hover:text-gold"}`}
              >
                {l.label}
              </Link>
            );
          })}
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
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="block text-bone/80 hover:text-gold text-sm tracking-luxe uppercase"
            >
              {l.label}
            </Link>
          ))}
          <Button variant="hero" size="default" onClick={() => { open(); setMenuOpen(false); }} className="w-full mt-4">
            Reservar mesa
          </Button>
        </div>
      )}
    </header>
  );
};
