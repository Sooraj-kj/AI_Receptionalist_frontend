"use client";

import Link from "next/link";
import { CalendarDays, ClipboardList, Home, LogOut, Users } from "lucide-react";

export function DashboardShell({ children }) {
  function logout() {
    window.localStorage.removeItem("clienxo_token");
    window.location.href = "/demo-login";
  }

  const links = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/dashboard/leads", label: "Leads", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-ink/10 bg-white p-5 lg:block">
        <Link href="/" className="mb-8 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-clinic font-bold text-white">C</span>
          <span className="font-semibold">Clienxo Desk</span>
        </Link>
        <nav className="space-y-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded px-3 py-2 text-sm font-medium text-ink/75 hover:bg-mint hover:text-clinic">
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={logout} className="absolute bottom-5 left-5 flex items-center gap-3 rounded px-3 py-2 text-sm font-medium text-ink/70">
          <LogOut size={18} />
          Log out
        </button>
      </aside>
      <main className="lg:pl-64">
        <div className="border-b border-ink/10 bg-white px-4 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-semibold"><ClipboardList size={19} /> Clienxo Desk</span>
            <button onClick={logout} className="text-sm font-medium text-ink/60">Logout</button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="rounded border border-ink/10 px-3 py-2 text-sm">{item.label}</Link>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
