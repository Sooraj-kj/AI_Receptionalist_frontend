"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarPlus } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import { Header } from "@/components/Header";
import { api } from "@/lib/api";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api("/doctors", { auth: false }).then(setDoctors);
  }, []);

  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <section className="border-b border-ink/10 bg-mint/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-clinic">Clinical team</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold">Find the right SmileCare doctor.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-ink/70">
            Pick a clinician, check real demo availability and continue directly into appointment booking.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {doctors.map((doctor) => (
            <article key={doctor.id} className="group flex flex-col rounded-xl border border-ink/10 bg-white p-5 transition hover:-translate-y-0.5 hover:border-clinic/25 hover:shadow-soft">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-mint text-xl font-bold text-clinic transition group-hover:bg-clinic group-hover:text-white">
                {doctor.name.split(" ").slice(-1)[0][0]}
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-clinic">
                  <BadgeCheck size={13} />
                  Available
                </span>
              </div>
              <h2 className="text-lg font-semibold">{doctor.name}</h2>
              <p className="mt-1 text-sm font-medium text-clinic">{doctor.specialty}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink/65">{doctor.bio}</p>
              <Link href="/book" className="focus-ring mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-clinic px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d665f]">
                <CalendarPlus size={16} />
                Book with doctor
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
