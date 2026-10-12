"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

const today = new Date().toISOString().slice(0, 10);

export function BookingForm({ compact = false }) {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState(today);
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("General consultation");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedDoctor = useMemo(() => doctors.find((doctor) => doctor.id === doctorId), [doctors, doctorId]);

  useEffect(() => {
    api("/doctors", { auth: false }).then((data) => {
      setDoctors(data);
      setDoctorId(data[0]?.id || "");
    });
  }, []);

  useEffect(() => {
    if (!doctorId || !date) return;
    api(`/slots?doctor_id=${doctorId}&date=${date}`, { auth: false })
      .then((data) => {
        setSlots(data.slots || []);
        setSelectedTime("");
      })
      .catch((error) => setStatus(error.message));
  }, [doctorId, date]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const result = await api("/appointments", {
        method: "POST",
        auth: false,
        body: JSON.stringify({
          doctor_id: doctorId,
          patient_name: patientName,
          phone,
          service,
          date,
          time: selectedTime,
          source: "website",
        }),
      });
      window.location.href = `/book/confirmation?reference=${result.reference}&doctor=${encodeURIComponent(selectedDoctor?.name || "")}&date=${date}&time=${selectedTime}&service=${encodeURIComponent(service)}`;
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "focus-ring mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-3 text-sm text-ink shadow-sm";

  return (
    <form onSubmit={submit} className={`rounded-2xl border border-ink/10 bg-white p-5 shadow-soft ${compact ? "" : "lg:p-7"}`}>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-clinic">
          <CalendarCheck size={20} />
        </span>
        <div>
          <h2 className="text-xl font-semibold">Book an appointment</h2>
          <p className="text-sm text-ink/60">Demo bookings use fictional patient data only.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Service
          <select className={inputClass} value={service} onChange={(e) => setService(e.target.value)}>
            <option>General consultation</option>
            <option>Cleaning</option>
            <option>Filling</option>
            <option>Orthodontic consultation</option>
            <option>Pediatric consultation</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Doctor
          <select className={inputClass} value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Date
          <input className={inputClass} type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="text-sm font-medium">
          Phone
          <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9800000000" required />
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          Patient name
          <input className={inputClass} value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Rahul Kumar" required />
        </label>
      </div>
      <div className="mt-5">
        <p className="mb-2 text-sm font-medium">Available slots</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {slots.map((slot) => (
            <button
              type="button"
              key={slot.time}
              className={`focus-ring rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                selectedTime === slot.time ? "border-clinic bg-clinic text-white shadow-sm" : "border-ink/15 bg-paper text-ink hover:border-clinic/30 hover:bg-mint/50"
              }`}
              onClick={() => setSelectedTime(slot.time)}
            >
              {slot.label}
            </button>
          ))}
        </div>
        {slots.length === 0 && <p className="rounded bg-mint px-3 py-2 text-sm text-clinic">No slots are available for this date.</p>}
      </div>
      {status && <p className="mt-4 rounded border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-ink">{status}</p>}
      <button
        className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-clinic px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#0d665f] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!selectedTime || loading}
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        Confirm appointment
      </button>
    </form>
  );
}
