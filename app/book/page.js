import { BookingForm } from "@/components/BookingForm";
import { ChatWidget } from "@/components/ChatWidget";
import { Header } from "@/components/Header";

export default function BookPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-clinic">Appointment booking</p>
          <h1 className="mt-3 text-3xl font-bold">Choose a real available slot.</h1>
          <p className="mt-4 leading-7 text-ink/70">
            This booking form reads live slots from FastAPI. Duplicate active bookings are rejected by the backend.
          </p>
        </div>
        <BookingForm />
      </section>
      <ChatWidget />
    </main>
  );
}
