import { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Users, Clock, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const reservationSchema = z.object({
  name: z.string().trim().min(2, "Mínimo 2 caracteres").max(80, "Máximo 80 caracteres"),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: z.string().trim().min(6, "Teléfono inválido").max(25),
  date: z.date({ required_error: "Selecciona una fecha" }),
  time: z.string().min(1, "Selecciona una hora"),
  guests: z.string().min(1, "Selecciona los comensales"),
  occasion: z.string().max(60).optional(),
  notes: z.string().max(500, "Máximo 500 caracteres").optional(),
});

const TIMES = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
const GUESTS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const OCCASIONS = ["Cena casual", "Aniversario", "Cumpleaños", "Negocios", "Cita romántica", "Otro"];

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export const ReservationDialog = ({ open, onOpenChange }: Props) => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [occasion, setOccasion] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = () => {
    setStep("form");
    setDate(undefined);
    setTime("");
    setGuests("");
    setOccasion("");
    setErrors({});
  };

  const handleClose = (v: boolean) => {
    if (!v) setTimeout(reset, 300);
    onOpenChange(v);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      date,
      time,
      guests,
      occasion,
      notes: String(formData.get("notes") ?? ""),
    };
    const result = reservationSchema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      toast.error("Revisa los campos del formulario");
      return;
    }
    setErrors({});
    setStep("success");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-bone border-border/60 p-0 gap-0 overflow-hidden max-h-[92vh] overflow-y-auto">
        {step === "form" ? (
          <>
            <div className="bg-gradient-forest px-8 pt-10 pb-8 text-bone">
              <p className="tracking-wider-luxe text-[10px] uppercase text-gold mb-3">Reserva tu mesa</p>
              <DialogTitle className="font-display text-4xl font-light leading-tight">
                Una experiencia<br/>cuidadosamente preparada
              </DialogTitle>
              <DialogDescription className="text-bone/70 mt-3 font-body text-sm">
                Confirmaremos tu reserva por correo en menos de 2 horas.
              </DialogDescription>
            </div>

            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs tracking-luxe uppercase text-foreground/70">Nombre</Label>
                  <Input id="name" name="name" maxLength={80} placeholder="Tu nombre completo" className="bg-background/50 border-border/60 rounded-none h-11" />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs tracking-luxe uppercase text-foreground/70">Teléfono</Label>
                  <Input id="phone" name="phone" type="tel" maxLength={25} placeholder="+34 600 000 000" className="bg-background/50 border-border/60 rounded-none h-11" />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs tracking-luxe uppercase text-foreground/70">Correo</Label>
                <Input id="email" name="email" type="email" maxLength={255} placeholder="tu@correo.com" className="bg-background/50 border-border/60 rounded-none h-11" />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label className="text-xs tracking-luxe uppercase text-foreground/70">Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" className={cn(
                        "w-full justify-start text-left font-normal rounded-none h-11 bg-background/50 border-border/60",
                        !date && "text-muted-foreground"
                      )}>
                        <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                        {date ? format(date, "d MMM", { locale: es }) : "Elegir"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                        locale={es}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs tracking-luxe uppercase text-foreground/70">Hora</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="rounded-none h-11 bg-background/50 border-border/60">
                      <Clock className="h-4 w-4 text-accent mr-1" />
                      <SelectValue placeholder="Elegir" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {TIMES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.time && <p className="text-xs text-destructive">{errors.time}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs tracking-luxe uppercase text-foreground/70">Comensales</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger className="rounded-none h-11 bg-background/50 border-border/60">
                      <Users className="h-4 w-4 text-accent mr-1" />
                      <SelectValue placeholder="N°" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {GUESTS.map((g) => <SelectItem key={g} value={g}>{g} {g === "1" ? "persona" : "personas"}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.guests && <p className="text-xs text-destructive">{errors.guests}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs tracking-luxe uppercase text-foreground/70">Ocasión (opcional)</Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger className="rounded-none h-11 bg-background/50 border-border/60">
                    <SelectValue placeholder="Selecciona la ocasión" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {OCCASIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-xs tracking-luxe uppercase text-foreground/70">Notas (opcional)</Label>
                <Textarea id="notes" name="notes" maxLength={500} rows={3} placeholder="Alergias, preferencias, peticiones especiales…" className="bg-background/50 border-border/60 rounded-none resize-none" />
                {errors.notes && <p className="text-xs text-destructive">{errors.notes}</p>}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Button type="button" variant="ghostLuxe" size="xl" onClick={() => handleClose(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="forest" size="xl">
                  Confirmar reserva
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="bg-gradient-forest text-bone px-8 py-16 text-center animate-scale-in">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 mb-6">
              <CheckCircle2 className="h-8 w-8 text-gold" />
            </div>
            <p className="tracking-wider-luxe text-[10px] uppercase text-gold mb-3">Reserva enviada</p>
            <DialogTitle className="font-display text-4xl font-light mb-4">
              Arigatō gozaimasu
            </DialogTitle>
            <DialogDescription className="text-bone/70 max-w-md mx-auto mb-2">
              Hemos recibido tu solicitud{date && ` para el ${format(date, "EEEE d 'de' MMMM", { locale: es })} a las ${time}`}.
            </DialogDescription>
            <p className="text-bone/60 text-sm mb-8">Recibirás la confirmación en tu correo en menos de 2 horas.</p>
            <Button variant="hero" size="xl" onClick={() => handleClose(false)}>
              Volver al inicio
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
