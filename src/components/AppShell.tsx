"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const onLogin = pathname === "/login";

  return (
    <div className="min-h-screen bg-grid-fade bg-prompty-bg">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
      {!onLogin ? (
        <footer className="border-t border-prompty-border/60 py-8 text-center text-xs text-prompty-muted">
          Prompty · prompt assembly only · no image/video API calls
        </footer>
      ) : null}
    </div>
  );
}
