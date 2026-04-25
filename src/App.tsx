import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReservationProvider } from "@/components/reservation/ReservationContext";
import Index from "./pages/Index.tsx";
import Carta from "./pages/Carta.tsx";
import Historia from "./pages/Historia.tsx";
import Galeria from "./pages/Galeria.tsx";
import Prensa from "./pages/Prensa.tsx";
import Eventos from "./pages/Eventos.tsx";
import Contacto from "./pages/Contacto.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ReservationProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/carta" element={<Carta />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/prensa" element={<Prensa />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ReservationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
