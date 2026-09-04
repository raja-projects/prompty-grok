"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = search.get("next") || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error || "Login failed.");
        setBusy(false);
        return;
      }
      const target =
        nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
      router.replace(target);
      router.refresh();
    } catch {
      setError("Network error — try again.");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-1">
      <div className="rounded-2xl border border-prompty-border/80 bg-prompty-elevated/90 p-6 shadow-glow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-prompty-accent to-prompty-accent2 shadow-glow-sm">
            <span className="text-lg font-black text-white">P</span>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-white">
              Sign in
            </h2>
            <p className="text-xs text-prompty-muted">
              Private Prompty access
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-prompty-muted">
              Username
            </span>
            <input
              autoComplete="username"
              autoFocus
              className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2.5 text-sm text-white outline-none ring-prompty-accent/40 placeholder:text-prompty-muted/60 focus:ring-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-prompty-muted">
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2.5 text-sm text-white outline-none ring-prompty-accent/40 placeholder:text-prompty-muted/60 focus:ring-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-gradient-to-r from-prompty-accent to-prompty-accent2 px-4 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition enabled:hover:opacity-95 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sm text-prompty-muted">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
