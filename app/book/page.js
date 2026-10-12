import { BookingForm } from "@/components/BookingForm";
import { ChatWidget } from "@/components/ChatWidget";
import { Header } from "@/components/Header";
import { CalendarDays, CheckCircle2, ShieldCheck } from "lucide-react";

export default function BookPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-clinic">Appointment booking</p>
          <h1 className="mt-3 text-4xl font-bold">Choose a real available slot.</h1>
          <p className="mt-4 leading-7 text-ink/70">
            This booking form reads live slots from FastAPI. Duplicate active bookings are rejected by the backend.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              [CalendarDays, "Pick service, doctor and date"],
              [CheckCircle2, "Only open slots are shown"],
              [ShieldCheck, "Confirmation includes a real reference"],
            ].map(([Icon, text]) => (
              <div key={text} className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm font-medium text-ink/75">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-mint text-clinic">
                  <Icon size={18} />
                </span>
                {text}
              </div>
            ))}
          </div>
        </div>
        <BookingForm />
      </section>
      <ChatWidget />
    </main>
  );
}
