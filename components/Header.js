import Link from "next/link";
import { CalendarPlus, LayoutDashboard } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-clinic text-lg font-bold text-white">C</span>
          <span>
            <span className="block text-lg font-semibold leading-5">Clienxo</span>
            <span className="text-xs text-ink/60">AI Receptionist Demo</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 md:flex">
          <Link href="/services">Services</Link>
          <Link href="/doctors">Doctors</Link>
          <Link href="/book">Book</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/book" className="focus-ring inline-flex items-center gap-2 rounded bg-clinic px-4 py-2 text-sm font-semibold text-white">
            <CalendarPlus size={17} />
            Book
          </Link>
          <Link href="/demo-login" className="focus-ring hidden items-center gap-2 rounded border border-ink/15 px-4 py-2 text-sm font-semibold sm:inline-flex">
            <LayoutDashboard size={17} />
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
