"use client";

import { useEffect, useState } from "react";
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
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Doctors</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {doctors.map((doctor) => (
            <article key={doctor.id} className="rounded border border-ink/10 bg-white p-5">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded bg-mint text-xl font-bold text-clinic">
                {doctor.name.split(" ").slice(-1)[0][0]}
              </div>
              <h2 className="font-semibold">{doctor.name}</h2>
              <p className="mt-1 text-sm text-clinic">{doctor.specialty}</p>
              <p className="mt-3 text-sm leading-6 text-ink/65">{doctor.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <ChatWidget />
    </main>
  );
}
