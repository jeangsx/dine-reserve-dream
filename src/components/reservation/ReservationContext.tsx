import { createContext, useContext, useState, ReactNode } from "react";
import { ReservationDialog } from "./ReservationDialog";

type Ctx = { open: () => void; close: () => void };
const ReservationContext = createContext<Ctx | null>(null);

export const useReservation = () => {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservation must be used inside ReservationProvider");
  return ctx;
};

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ReservationContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      <ReservationDialog open={isOpen} onOpenChange={setIsOpen} />
    </ReservationContext.Provider>
  );
};
