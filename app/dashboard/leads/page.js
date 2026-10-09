"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { api } from "@/lib/api";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [message, setMessage] = useState("");

  async function load() {
    setLeads(await api("/leads"));
  }

  useEffect(() => {
    load().catch(() => (window.location.href = "/demo-login"));
  }, []);

  async function update(id, status) {
    setMessage("");
    try {
      await api(`/leads/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      await load();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <DashboardShell>
      <p className="text-sm font-semibold uppercase tracking-widest text-clinic">Follow-up</p>
      <h1 className="mt-2 text-3xl font-bold">Leads and enquiries</h1>
      {message && <p className="mt-4 rounded bg-coral/10 px-3 py-2 text-sm">{message}</p>}
      <div className="mt-6 grid gap-4">
        {leads.map((lead) => (
          <article key={lead.id} className="rounded border border-ink/10 bg-white p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div>
                <h2 className="font-semibold">{lead.name || "Unknown patient"}</h2>
                <p className="mt-1 text-sm text-ink/60">{lead.phone || "No phone captured"} · {lead.service}</p>
                <p className="mt-3 text-sm leading-6 text-ink/70">{lead.notes || "No notes"}</p>
              </div>
              <div className="flex items-start gap-2">
                <select className="focus-ring rounded border border-ink/15 px-3 py-2 text-sm" value={lead.status} onChange={(e) => update(lead.id, e.target.value)}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </article>
        ))}
        {leads.length === 0 && <p className="rounded border border-ink/10 bg-white p-5 text-sm text-ink/60">No leads yet.</p>}
      </div>
    </DashboardShell>
  );
}
