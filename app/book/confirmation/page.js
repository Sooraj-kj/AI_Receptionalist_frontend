import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";

export default async function Confirmation({ searchParams }) {
  const params = await searchParams;
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded border border-ink/10 bg-white p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto mb-5 text-clinic" size={48} />
          <p className="text-sm font-semibold uppercase tracking-widest text-clinic">Demo appointment confirmed</p>
          <h1 className="mt-3 text-3xl font-bold">{params.reference}</h1>
          <dl className="mt-6 grid gap-3 rounded bg-paper p-4 text-left text-sm">
            <div className="flex justify-between gap-4"><dt className="text-ink/60">Doctor</dt><dd className="font-medium">{params.doctor}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink/60">Service</dt><dd className="font-medium">{params.service}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink/60">Date</dt><dd className="font-medium">{params.date}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink/60">Time</dt><dd className="font-medium">{params.time}</dd></div>
          </dl>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/book" className="rounded border border-ink/15 px-4 py-2 font-semibold">Book another</Link>
            <Link href="/demo-login" className="rounded bg-clinic px-4 py-2 font-semibold text-white">Open dashboard</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
