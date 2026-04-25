import { useMemo, useState } from "react";
import { z } from "zod";
import { addDays, format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { Users, Clock, CheckCircle2, ChevronLeft, ChevronRight, CalendarDays, Armchair, Ticket } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

/* ---------- Datos del salón ---------- */
type Table = { id: string; seats: number; zone: "Barra" | "Salón" | "Jardín"; x: number; y: number };

const TABLES: Table[] = [
  // Barra omakase (8 asientos individuales)
  { id: "B1", seats: 1, zone: "Barra", x: 1, y: 1 },
  { id: "B2", seats: 1, zone: "Barra", x: 2, y: 1 },
  { id: "B3", seats: 1, zone: "Barra", x: 3, y: 1 },
  { id: "B4", seats: 1, zone: "Barra", x: 4, y: 1 },
  { id: "B5", seats: 1, zone: "Barra", x: 5, y: 1 },
  { id: "B6", seats: 1, zone: "Barra", x: 6, y: 1 },
  // Salón
  { id: "S1", seats: 2, zone: "Salón", x: 1, y: 3 },
  { id: "S2", seats: 2, zone: "Salón", x: 2, y: 3 },
  { id: "S3", seats: 4, zone: "Salón", x: 4, y: 3 },
  { id: "S4", seats: 4, zone: "Salón", x: 5, y: 3 },
  { id: "S5", seats: 6, zone: "Salón", x: 1, y: 4 },
  { id: "S6", seats: 2, zone: "Salón", x: 3, y: 4 },
  // Jardín
  { id: "J1", seats: 4, zone: "Jardín", x: 5, y: 4 },
  { id: "J2", seats: 8, zone: "Jardín", x: 2, y: 5 },
];

// Mesas ya reservadas por hora (mock)
const OCCUPIED: Record<string, string[]> = {
  "19:00": ["S1", "S5"],
  "19:30": ["B2", "S3"],
  "20:00": ["B1", "B3", "S2", "J2"],
  "20:30": ["S4", "B4"],
  "21:00": ["S6", "J1", "B5"],
  "21:30": ["S1", "S3"],
  "22:00": [],
};

const TIMES = Object.keys(OCCUPIED);
const GUESTS = [1, 2, 3, 4, 5, 6, 7, 8];

const schema = z.object({
  name: z.string().trim().min(2, "Mínimo 2 caracteres").max(80),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: z.string().trim().min(6, "Teléfono inválido").max(25),
  notes: z.string().max(500).optional(),
});

interface Props { open: boolean; onOpenChange: (v: boolean) => void; }

type Step = 0 | 1 | 2 | 3 | 4;

const STEP_LABELS = ["Día", "Personas", "Hora", "Mesa", "Datos"];

export const ReservationDialog = ({ open, onOpenChange }: Props) => {
  const [step, setStep] = useState<Step>(0);
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState<number | undefined>();
  const [time, setTime] = useState<string>("");
  const [tableId, setTableId] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Próximos 14 días para selector horizontal
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => addDays(new Date(), i)), []);

  const reset = () => {
    setStep(0); setSuccess(false); setDate(undefined); setGuests(undefined);
    setTime(""); setTableId(""); setErrors({});
  };

  const handleClose = (v: boolean) => {
    if (!v) setTimeout(reset, 300);
    onOpenChange(v);
  };

  const next = () => setStep((s) => Math.min(4, (s + 1) as Step));
  const back = () => setStep((s) => Math.max(0, (s - 1) as Step));

  const canNext = () => {
    if (step === 0) return !!date;
    if (step === 1) return !!guests;
    if (step === 2) return !!time;
    if (step === 3) return !!tableId;
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      notes: String(fd.get("notes") ?? ""),
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      toast.error("Revisa los campos del formulario");
      return;
    }
    setErrors({});
    setSuccess(true);
  };

  const occupied = OCCUPIED[time] ?? [];
  const selectedTable = TABLES.find((t) => t.id === tableId);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl bg-bone border-border/60 p-0 gap-0 overflow-hidden max-h-[94vh] overflow-y-auto">
        {success ? (
          <SuccessView date={date} time={time} guests={guests} table={selectedTable} onClose={() => handleClose(false)} />
        ) : (
          <>
            {/* Header tipo "ticket" */}
            <div className="bg-gradient-forest text-bone px-6 sm:px-8 pt-7 pb-6 relative">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-gold" />
                  <p className="tracking-wider-luxe text-[10px] uppercase text-gold">Tu reserva</p>
                </div>
                <p className="text-[10px] tracking-luxe uppercase text-bone/50">Paso {step + 1} de 5</p>
              </div>

              <DialogTitle className="font-display text-2xl sm:text-3xl font-light leading-tight">
                {STEP_LABELS[step]}
              </DialogTitle>
              <DialogDescription className="sr-only">Reserva tu mesa en Saikō paso a paso.</DialogDescription>

              {/* Stepper */}
              <div className="mt-5 grid grid-cols-5 gap-2">
                {STEP_LABELS.map((label, i) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <div className={cn(
                      "h-1 rounded-full transition-all",
                      i <= step ? "bg-gold" : "bg-bone/15"
                    )} />
                    <span className={cn(
                      "text-[9px] sm:text-[10px] tracking-luxe uppercase truncate",
                      i === step ? "text-gold" : i < step ? "text-bone/60" : "text-bone/30"
                    )}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Resumen rápido */}
              {(date || guests || time || tableId) && (
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 pt-4 border-t border-bone/10 text-[11px] tracking-luxe uppercase text-bone/70">
                  {date && <span className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3 text-gold" />{format(date, "d MMM", { locale: es })}</span>}
                  {guests && <span className="flex items-center gap-1.5"><Users className="h-3 w-3 text-gold" />{guests} {guests === 1 ? "persona" : "personas"}</span>}
                  {time && <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-gold" />{time}</span>}
                  {tableId && <span className="flex items-center gap-1.5"><Armchair className="h-3 w-3 text-gold" />Mesa {tableId}</span>}
                </div>
              )}

              {/* Notch decorativo (estilo ticket) */}
              <div className="absolute -bottom-3 left-0 right-0 h-6 flex justify-between px-2 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={i} className="h-6 w-6 rounded-full bg-bone" />
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-10 py-10 min-h-[360px]">
              {step === 0 && <DayStep days={days} value={date} onChange={(d) => { setDate(d); }} />}
              {step === 1 && <GuestsStep value={guests} onChange={setGuests} />}
              {step === 2 && <TimeStep value={time} onChange={(t) => { setTime(t); setTableId(""); }} />}
              {step === 3 && <TableStep guests={guests ?? 1} occupied={occupied} value={tableId} onChange={setTableId} />}
              {step === 4 && <DataStep onSubmit={handleSubmit} errors={errors} />}
            </div>

            {/* Footer nav */}
            {step !== 4 && (
              <div className="px-6 sm:px-10 pb-8 pt-2 flex items-center justify-between gap-3 border-t border-border/40">
                <Button type="button" variant="ghostLuxe" onClick={step === 0 ? () => handleClose(false) : back}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> {step === 0 ? "Cancelar" : "Atrás"}
                </Button>
                <Button type="button" variant="forest" size="lg" disabled={!canNext()} onClick={next}>
                  Continuar <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
            {step === 4 && (
              <div className="px-6 sm:px-10 pb-8 pt-2 flex items-center justify-between gap-3 border-t border-border/40">
                <Button type="button" variant="ghostLuxe" onClick={back}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Atrás
                </Button>
                <Button type="submit" form="reservation-data-form" variant="forest" size="lg">
                  Confirmar reserva
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* ---------------- STEPS ---------------- */

const DayStep = ({ days, value, onChange }: { days: Date[]; value?: Date; onChange: (d: Date) => void }) => (
  <div>
    <p className="text-sm text-foreground/60 mb-6">Selecciona una fecha (próximos 14 días).</p>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
      {days.map((d) => {
        const active = value && isSameDay(d, value);
        return (
          <button
            key={d.toISOString()}
            type="button"
            onClick={() => onChange(d)}
            className={cn(
              "p-4 border text-center transition-smooth rounded-sm",
              active
                ? "bg-primary text-primary-foreground border-primary shadow-elegant scale-[1.03]"
                : "bg-background border-border/60 hover:border-accent hover:text-accent"
            )}
          >
            <p className="text-[10px] tracking-luxe uppercase opacity-70">{format(d, "EEE", { locale: es })}</p>
            <p className="font-display text-3xl mt-1 leading-none">{format(d, "d")}</p>
            <p className="text-[10px] tracking-luxe uppercase mt-1 opacity-70">{format(d, "MMM", { locale: es })}</p>
          </button>
        );
      })}
    </div>
  </div>
);

const GuestsStep = ({ value, onChange }: { value?: number; onChange: (n: number) => void }) => (
  <div>
    <p className="text-sm text-foreground/60 mb-6">¿Cuántos comensales?</p>
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
      {GUESTS.map((g) => {
        const active = value === g;
        return (
          <button
            key={g}
            type="button"
            onClick={() => onChange(g)}
            className={cn(
              "aspect-square flex flex-col items-center justify-center border transition-smooth rounded-sm",
              active
                ? "bg-primary text-primary-foreground border-primary shadow-elegant scale-[1.05]"
                : "bg-background border-border/60 hover:border-accent hover:text-accent"
            )}
          >
            <Users className="h-4 w-4 opacity-70 mb-1" />
            <span className="font-display text-3xl leading-none">{g}</span>
          </button>
        );
      })}
    </div>
    <p className="mt-6 text-xs text-muted-foreground">Para grupos mayores de 8, contáctanos directamente.</p>
  </div>
);

const TimeStep = ({ value, onChange }: { value: string; onChange: (t: string) => void }) => (
  <div>
    <p className="text-sm text-foreground/60 mb-6">Elige tu hora preferida.</p>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
      {TIMES.map((t) => {
        const active = value === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={cn(
              "py-4 border transition-smooth rounded-sm font-display text-xl",
              active
                ? "bg-primary text-primary-foreground border-primary shadow-elegant scale-[1.03]"
                : "bg-background border-border/60 hover:border-accent hover:text-accent"
            )}
          >
            {t}
          </button>
        );
      })}
    </div>
  </div>
);

const TableStep = ({ guests, occupied, value, onChange }: {
  guests: number; occupied: string[]; value: string; onChange: (id: string) => void;
}) => {
  const zones: Array<Table["zone"]> = ["Barra", "Salón", "Jardín"];
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <p className="text-sm text-foreground/60">Selecciona una mesa disponible (capacidad ≥ {guests}).</p>
        <div className="flex items-center gap-4 text-[10px] tracking-luxe uppercase">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-background border border-border" /> Libre</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-primary" /> Tu mesa</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-muted opacity-50" /> Ocupada</span>
        </div>
      </div>

      {/* Plano del salón */}
      <div className="bg-secondary/40 border border-border/60 rounded-sm p-5 sm:p-8">
        {/* Pantalla / Barra de chef */}
        <div className="mx-auto max-w-md mb-2 text-center">
          <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
          <p className="text-[10px] tracking-wider-luxe uppercase text-accent mt-2">Barra del chef · Omakase</p>
        </div>

        {zones.map((zone) => {
          const zoneTables = TABLES.filter((t) => t.zone === zone);
          return (
            <div key={zone} className="mt-6">
              <p className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-3">{zone}</p>
              <div className="flex flex-wrap gap-3">
                {zoneTables.map((t) => {
                  const isOcc = occupied.includes(t.id);
                  const tooSmall = t.seats < guests;
                  const disabled = isOcc || tooSmall;
                  const active = value === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => onChange(t.id)}
                      title={disabled ? (isOcc ? "Ocupada" : `Capacidad ${t.seats}`) : `${t.seats} pax`}
                      className={cn(
                        "relative flex flex-col items-center justify-center border rounded-sm transition-smooth",
                        zone === "Barra" ? "h-14 w-14" : t.seats >= 6 ? "h-20 w-24" : t.seats >= 4 ? "h-18 w-20" : "h-16 w-16",
                        active && "bg-primary text-primary-foreground border-primary shadow-elegant scale-[1.05]",
                        !active && !disabled && "bg-background border-border/60 hover:border-accent hover:text-accent",
                        disabled && "bg-muted/60 border-muted text-muted-foreground/60 cursor-not-allowed line-through"
                      )}
                    >
                      <Armchair className="h-3.5 w-3.5 opacity-70" />
                      <span className="font-display text-base leading-none mt-0.5">{t.id}</span>
                      <span className="text-[9px] tracking-luxe uppercase mt-0.5 opacity-80">{t.seats}p</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Entrada */}
        <div className="mt-8 text-center">
          <div className="inline-block px-4 py-1 border border-dashed border-border text-[10px] tracking-wider-luxe uppercase text-muted-foreground rounded-sm">
            Entrada
          </div>
        </div>
      </div>
    </div>
  );
};

const DataStep = ({ onSubmit, errors }: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: Record<string, string>;
}) => (
  <form id="reservation-data-form" onSubmit={onSubmit} className="space-y-5">
    <p className="text-sm text-foreground/60">Casi listo. Déjanos tus datos para confirmar la reserva.</p>
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
    <div className="space-y-2">
      <Label htmlFor="notes" className="text-xs tracking-luxe uppercase text-foreground/70">Notas (opcional)</Label>
      <Textarea id="notes" name="notes" maxLength={500} rows={3} placeholder="Alergias, ocasión especial, peticiones…" className="bg-background/50 border-border/60 rounded-none resize-none" />
      {errors.notes && <p className="text-xs text-destructive">{errors.notes}</p>}
    </div>
  </form>
);

const SuccessView = ({ date, time, guests, table, onClose }: {
  date?: Date; time: string; guests?: number; table?: Table; onClose: () => void;
}) => (
  <div className="bg-gradient-forest text-bone px-8 py-16 text-center animate-scale-in">
    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 mb-6">
      <CheckCircle2 className="h-8 w-8 text-gold" />
    </div>
    <p className="tracking-wider-luxe text-[10px] uppercase text-gold mb-3">Reserva confirmada</p>
    <DialogTitle className="font-display text-4xl font-light mb-6">Arigatō gozaimasu</DialogTitle>

    {/* Ticket */}
    <div className="max-w-md mx-auto bg-bone/5 border border-bone/15 rounded-sm p-6 mb-8 text-left">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-[10px] tracking-luxe uppercase text-bone/50">Fecha</p>
          <p className="font-display text-xl text-bone mt-1">{date && format(date, "d MMM yyyy", { locale: es })}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-luxe uppercase text-bone/50">Hora</p>
          <p className="font-display text-xl text-bone mt-1">{time}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-luxe uppercase text-bone/50">Comensales</p>
          <p className="font-display text-xl text-bone mt-1">{guests}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-luxe uppercase text-bone/50">Mesa</p>
          <p className="font-display text-xl text-bone mt-1">{table?.id} · {table?.zone}</p>
        </div>
      </div>
    </div>

    <p className="text-bone/60 text-sm mb-8">Recibirás la confirmación en tu correo en menos de 2 horas.</p>
    <Button variant="hero" size="xl" onClick={onClose}>Volver al inicio</Button>
  </div>
);
