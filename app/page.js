import Link from "next/link";
import { ArrowRight, Baby, Clock, MapPin, ShieldCheck, Sparkles, Sparkle, Stethoscope, Syringe } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { ChatWidget } from "@/components/ChatWidget";
import { Header } from "@/components/Header";

const services = [
  ["General consultation", "Routine checks and treatment planning.", Stethoscope],
  ["Cleaning", "Scaling and polish visits.", Sparkle],
  ["Filling", "Cavity assessment and care.", Syringe],
  ["Orthodontic consultation", "Braces and aligner guidance.", Baby],
];
const doctors = [
  ["Dr. Asha Menon", "General dentistry", "A"],
  ["Dr. Rahul Nair", "Orthodontics", "R"],
  ["Dr. Meera Iyer", "Pediatric dentistry", "M"],
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
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-clinic">Care options</p>
              <h2 className="mt-2 text-3xl font-bold">Services</h2>
            </div>
            <Link href="/services" className="focus-ring hidden items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink/70 transition hover:border-clinic/30 hover:text-clinic sm:inline-flex">
              View all
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {services.map(([service, description, Icon]) => (
              <Link key={service} href="/book" className="focus-ring group rounded-xl border border-ink/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-clinic/25 hover:shadow-soft">
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-mint text-clinic transition group-hover:bg-clinic group-hover:text-white">
                  <Icon size={19} />
                </span>
                <span className="block font-semibold">{service}</span>
                <span className="mt-1 block text-sm leading-6 text-ink/60">{description}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-clinic">Clinical team</p>
              <h2 className="mt-2 text-3xl font-bold">Doctors</h2>
            </div>
            <Link href="/doctors" className="focus-ring hidden items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink/70 transition hover:border-clinic/30 hover:text-clinic sm:inline-flex">
              Meet team
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-4 grid gap-3">
            {doctors.map(([name, specialty, initial]) => (
              <Link key={name} href="/book" className="focus-ring group flex items-center justify-between gap-4 rounded-xl border border-ink/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-clinic/25 hover:shadow-soft">
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mint font-bold text-clinic transition group-hover:bg-clinic group-hover:text-white">{initial}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{name}</span>
                    <span className="block truncate text-sm text-ink/60">{specialty}</span>
                  </span>
                </span>
                <span className="hidden rounded-full bg-paper px-3 py-1 text-xs font-semibold text-clinic sm:inline-flex">Book</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ChatWidget />
    </main>
  );
}
