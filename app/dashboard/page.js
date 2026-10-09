"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock3, UserRoundCheck, Users } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api("/dashboard/summary").then(setSummary).catch(() => (window.location.href = "/demo-login"));
    api("/appointments").then((data) => setAppointments(data.slice(0, 6))).catch(() => {});
  }, []);

  const cards = [
    ["Today", summary?.today_appointments ?? "-", CalendarDays],
    ["Pending", summary?.pending_appointments ?? "-", Clock3],
    ["Open leads", summary?.open_leads ?? "-", Users],
    ["Confirmed", summary?.total_confirmed ?? "-", UserRoundCheck],
  ];

  return (
    <DashboardShell>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-clinic">Receptionist dashboard</p>
          <h1 className="mt-2 text-3xl font-bold">Today at SmileCare</h1>
        </div>
        <Link href="/book" className="rounded bg-clinic px-4 py-2 font-semibold text-white">Manual booking</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value, Icon]) => (
          <div key={label} className="rounded border border-ink/10 bg-white p-5">
            <Icon className="text-clinic" size={22} />
            <p className="mt-4 text-3xl font-bold">{value}</p>
            <p className="text-sm text-ink/60">{label}</p>
          </div>
        ))}
      </div>
      <section className="mt-8 rounded border border-ink/10 bg-white">
        <div className="flex items-center justify-between border-b border-ink/10 p-5">
          <h2 className="font-semibold">Recent appointments</h2>
          <Link href="/dashboard/appointments" className="text-sm font-semibold text-clinic">View all</Link>
        </div>
        <div className="divide-y divide-ink/10">
          {appointments.map((appointment) => (
            <Link key={appointment.id} href={`/dashboard/appointments/${appointment.id}`} className="grid gap-2 p-5 hover:bg-paper sm:grid-cols-5">
              <span className="font-semibold">{appointment.reference}</span>
              <span className="sm:col-span-2">{appointment.patient_name}</span>
              <span>{appointment.appointment_date}</span>
              <span className="text-sm text-ink/60">{appointment.status}</span>
            </Link>
          ))}
          {appointments.length === 0 && <p className="p-5 text-sm text-ink/60">No appointments yet.</p>}
        </div>
      </section>
    </DashboardShell>
  );
}
