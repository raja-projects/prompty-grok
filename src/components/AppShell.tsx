"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const onLogin = pathname === "/login";

  return (
    <div className="min-h-screen bg-grid-fade bg-prompty-bg">
      {onLogin ? <Header /> : null}
      <main className={onLogin ? "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10" : "min-h-screen"}>
        {children}
      </main>
    </div>
  );
}
