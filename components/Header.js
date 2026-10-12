"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarPlus, LayoutDashboard, Stethoscope, UserRound } from "lucide-react";

const navItems = [
  { href: "/services", label: "Services", icon: Stethoscope },
  { href: "/doctors", label: "Doctors", icon: UserRound },
  { href: "/book", label: "Book", icon: CalendarPlus },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-clinic text-lg font-bold text-white shadow-sm">C</span>
          <span>
            <span className="block text-lg font-semibold leading-5">Clienxo</span>
            <span className="text-xs text-ink/60">AI Receptionist Demo</span>
          </span>
        </Link>
        <nav className="hidden items-center rounded-full border border-ink/10 bg-paper p-1 text-sm font-semibold text-ink/70 md:flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 transition ${
                  active ? "bg-white text-clinic shadow-sm" : "hover:bg-white/70 hover:text-ink"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/book" className="focus-ring inline-flex items-center gap-2 rounded-xl bg-clinic px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d665f]">
            <CalendarPlus size={17} />
            Book
          </Link>
          <Link href="/demo-login" className="focus-ring hidden items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-clinic/30 hover:text-clinic sm:inline-flex">
            <LayoutDashboard size={17} />
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
