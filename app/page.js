import Link from "next/link";
import { ArrowRight, Clock, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { ChatWidget } from "@/components/ChatWidget";
import { Header } from "@/components/Header";

const services = ["General consultation", "Cleaning", "Filling", "Orthodontic consultation"];
const doctors = [
  ["Dr. Asha Menon", "General dentistry"],
  ["Dr. Rahul Nair", "Orthodontics"],
  ["Dr. Meera Iyer", "Pediatric dentistry"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <section className="border-b border-ink/10 bg-mint">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded bg-white px-3 py-1 text-sm font-semibold text-clinic">
              <Sparkles size={16} />
              AI receptionist demo for clinics
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-ink sm:text-5xl">
              SmileCare Dental Clinic bookings that stay grounded in real availability.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
              Patients can ask questions, find doctors and book fictional demo appointments. Receptionists see the same bookings instantly in the dashboard.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-clinic px-5 py-3 font-semibold text-white">
                Book appointment
                <ArrowRight size={18} />
              </Link>
              <Link href="/demo-login" className="focus-ring inline-flex items-center justify-center rounded border border-ink/15 bg-white px-5 py-3 font-semibold text-ink">
                Receptionist dashboard
              </Link>
            </div>
          </div>
          <BookingForm compact />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded border border-ink/10 bg-white p-5">
          <Clock className="mb-4 text-clinic" />
          <h2 className="font-semibold">Opening hours</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">Monday to Saturday, 9:00 AM to 6:00 PM. Closed on Sundays.</p>
        </div>
        <div className="rounded border border-ink/10 bg-white p-5">
          <MapPin className="mb-4 text-clinic" />
          <h2 className="font-semibold">Clinic location</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">2nd Floor, Clienxo Plaza, MG Road, Kochi, Kerala.</p>
        </div>
        <div className="rounded border border-ink/10 bg-white p-5">
          <ShieldCheck className="mb-4 text-clinic" />
          <h2 className="font-semibold">Demo-safe workflow</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">The AI confirms appointments only after the FastAPI booking engine returns a real reference.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold">Services</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service} className="rounded border border-ink/10 bg-white p-4 font-medium">{service}</div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Doctors</h2>
          <div className="mt-4 grid gap-3">
            {doctors.map(([name, specialty]) => (
              <div key={name} className="flex items-center justify-between rounded border border-ink/10 bg-white p-4">
                <span className="font-medium">{name}</span>
                <span className="text-sm text-ink/60">{specialty}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ChatWidget />
    </main>
  );
}
