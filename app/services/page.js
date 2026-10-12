import Link from "next/link";
import { ArrowRight, Baby, Braces, Sparkle, Stethoscope, Syringe } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import { Header } from "@/components/Header";

const services = [
  ["General consultation", "Routine dental checkups and treatment planning.", Stethoscope],
  ["Cleaning", "Preventive scaling and polishing visits.", Sparkle],
  ["Filling", "Assessment and care for cavities using demo-safe booking flows.", Syringe],
  ["Orthodontic consultation", "Braces and aligner consultation appointments.", Braces],
  ["Pediatric consultation", "Child-friendly dental visits with a pediatric dentist.", Baby],
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <section className="border-b border-ink/10 bg-mint/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-clinic">SmileCare services</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold">Choose the care type before booking.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-ink/70">
            Each service connects to the same live availability flow, so patients can move from question to appointment without a handoff.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([title, text, Icon]) => (
            <article key={title} className="group rounded-xl border border-ink/10 bg-white p-5 transition hover:-translate-y-0.5 hover:border-clinic/25 hover:shadow-soft">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-mint text-clinic transition group-hover:bg-clinic group-hover:text-white">
                <Icon size={22} />
              </div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-ink/65">{text}</p>
              <Link href="/book" className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-paper px-3 py-2 text-sm font-semibold text-clinic transition hover:bg-mint">
                Book this service
                <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <ChatWidget />
    </main>
  );
}
