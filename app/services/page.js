import { ChatWidget } from "@/components/ChatWidget";
import { Header } from "@/components/Header";

const services = [
  ["General consultation", "Routine dental checkups and treatment planning."],
  ["Cleaning", "Preventive scaling and polishing visits."],
  ["Filling", "Assessment and care for cavities using demo-safe booking flows."],
  ["Orthodontic consultation", "Braces and aligner consultation appointments."],
  ["Pediatric consultation", "Child-friendly dental visits with a pediatric dentist."],
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Services</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([title, text]) => (
            <article key={title} className="rounded border border-ink/10 bg-white p-5">
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <ChatWidget />
    </main>
  );
}
