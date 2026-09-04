"use client";

import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const onLogin = pathname === "/login";

  async function signOut() {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="relative z-10 border-b border-prompty-border/80 bg-prompty-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-prompty-accent to-prompty-accent2 shadow-glow-sm">
            <span className="text-lg font-black text-white">P</span>
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
              Prompty
            </h1>
            {!onLogin ? (
              <p className="text-xs text-prompty-muted">
                Photoreal people scene prompts · 18+
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!onLogin ? (
            <>
              <p className="hidden text-right text-xs text-prompty-muted sm:block">
                Soft language · Kerala–Tamil defaults · One-click copy
              </p>
              <button
                type="button"
                onClick={signOut}
                className="rounded-lg border border-prompty-border px-2.5 py-1 text-xs text-prompty-muted transition hover:border-prompty-accent/50 hover:text-white"
              >
                Sign out
              </button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
