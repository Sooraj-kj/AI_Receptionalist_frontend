"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { api } from "@/lib/api";

export function AppointmentDetailClient({ id }) {
  const [appointment, setAppointment] = useState(null);
  const [message, setMessage] = useState("");

  async function load() {
    setAppointment(await api(`/appointments/${id}`));
  }

  useEffect(() => {
    load().catch(() => (window.location.href = "/demo-login"));
  }, []);

  async function update(status) {
    setMessage("");
    try {
      await api(`/appointments/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setMessage(`Appointment marked ${status}.`);
      await load();
    } catch (error) {
      setMessage(error.message);
    }
  }

  if (!appointment) {
    return <DashboardShell><p>Loading...</p></DashboardShell>;
  }

  return (
    <DashboardShell>
      <p className="text-sm font-semibold uppercase tracking-widest text-clinic">Appointment details</p>
      <h1 className="mt-2 text-3xl font-bold">{appointment.reference}</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <section className="rounded border border-ink/10 bg-white p-6">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div><dt className="text-sm text-ink/60">Patient</dt><dd className="font-semibold">{appointment.patient_name}</dd></div>
            <div><dt className="text-sm text-ink/60">Phone</dt><dd className="font-semibold">{appointment.patient_phone}</dd></div>
            <div><dt className="text-sm text-ink/60">Doctor</dt><dd className="font-semibold">{appointment.doctor.name}</dd></div>
            <div><dt className="text-sm text-ink/60">Service</dt><dd className="font-semibold">{appointment.service}</dd></div>
            <div><dt className="text-sm text-ink/60">Date</dt><dd className="font-semibold">{appointment.appointment_date}</dd></div>
            <div><dt className="text-sm text-ink/60">Time</dt><dd className="font-semibold">{appointment.appointment_time}</dd></div>
            <div><dt className="text-sm text-ink/60">Source</dt><dd className="font-semibold">{appointment.source}</dd></div>
            <div><dt className="text-sm text-ink/60">Status</dt><dd className="font-semibold">{appointment.status}</dd></div>
          </dl>
        </section>
        <aside className="rounded border border-ink/10 bg-white p-6">
          <h2 className="font-semibold">Actions</h2>
          <div className="mt-4 grid gap-2">
            <button onClick={() => update("confirmed")} className="rounded border border-ink/15 px-4 py-2 font-semibold">Mark confirmed</button>
            <button onClick={() => update("completed")} className="rounded border border-ink/15 px-4 py-2 font-semibold">Mark completed</button>
            <button onClick={() => update("cancelled")} className="rounded bg-coral px-4 py-2 font-semibold text-white">Cancel appointment</button>
          </div>
          {message && <p className="mt-4 rounded bg-paper px-3 py-2 text-sm">{message}</p>}
        </aside>
      </div>
    </DashboardShell>
  );
}
