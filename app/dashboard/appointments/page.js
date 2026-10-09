"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { api } from "@/lib/api";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  async function load() {
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (status) params.set("status", status);
    const query = params.toString() ? `?${params.toString()}` : "";
    setAppointments(await api(`/appointments${query}`));
  }

  useEffect(() => {
    load().catch(() => (window.location.href = "/demo-login"));
  }, []);

  return (
    <DashboardShell>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-clinic">Bookings</p>
          <h1 className="mt-2 text-3xl font-bold">Appointments</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <input className="focus-ring rounded border border-ink/15 px-3 py-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <select className="focus-ring rounded border border-ink/15 px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button onClick={load} className="rounded bg-clinic px-4 py-2 font-semibold text-white">Filter</button>
        </div>
      </div>
      <div className="overflow-hidden rounded border border-ink/10 bg-white">
        <div className="hidden grid-cols-6 gap-4 border-b border-ink/10 bg-paper p-4 text-sm font-semibold text-ink/60 md:grid">
          <span>Reference</span><span>Patient</span><span>Doctor</span><span>Date</span><span>Time</span><span>Status</span>
        </div>
        {appointments.map((appointment) => (
          <Link key={appointment.id} href={`/dashboard/appointments/${appointment.id}`} className="grid gap-2 border-b border-ink/10 p-4 text-sm hover:bg-paper md:grid-cols-6">
            <span className="font-semibold">{appointment.reference}</span>
            <span>{appointment.patient_name}</span>
            <span>{appointment.doctor.name}</span>
            <span>{appointment.appointment_date}</span>
            <span>{appointment.appointment_time}</span>
            <span>{appointment.status}</span>
          </Link>
        ))}
        {appointments.length === 0 && <p className="p-5 text-sm text-ink/60">No appointments found.</p>}
      </div>
    </DashboardShell>
  );
}
