"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { Header } from "@/components/Header";
import { api, setToken } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("reception@clienxo.demo");
  const [password, setPassword] = useState("demo12345");
  const [error, setError] = useState("");

  async function login(event) {
    event.preventDefault();
    setError("");
    try {
      const result = await api("/auth/login", {
        method: "POST",
        auth: false,
        body: JSON.stringify({ email, password }),
      });
      setToken(result.access_token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <section className="mx-auto max-w-md px-4 py-14 sm:px-6 lg:px-8">
        <form onSubmit={login} className="rounded border border-ink/10 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded bg-clinic text-white"><LogIn size={19} /></span>
            <div>
              <h1 className="text-xl font-semibold">Receptionist login</h1>
              <p className="text-sm text-ink/60">Demo credentials are prefilled.</p>
            </div>
          </div>
          <label className="block text-sm font-medium">
            Email
            <input className="focus-ring mt-1 w-full rounded border border-ink/15 px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Password
            <input className="focus-ring mt-1 w-full rounded border border-ink/15 px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p className="mt-4 rounded bg-coral/10 px-3 py-2 text-sm">{error}</p>}
          <button className="focus-ring mt-5 w-full rounded bg-clinic px-4 py-3 font-semibold text-white">Sign in</button>
        </form>
      </section>
    </main>
  );
}
