"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
  variant = "light",
  compact = false,
}: {
  text: string;
  label?: string;
  variant?: "light" | "dark";
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  }

  const base = compact
    ? "inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition disabled:opacity-40"
    : "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold transition disabled:opacity-40";

  const skin =
    variant === "dark"
      ? "border border-prompty-inkLine bg-prompty-inkCard text-prompty-inkText hover:border-prompty-accent hover:text-white"
      : "border border-prompty-line bg-white text-prompty-ink hover:border-prompty-accent hover:text-prompty-accent";

  return (
    <button type="button" onClick={onCopy} disabled={!text.trim()} className={`${base} ${skin}`}>
      {copied ? (
        <>
          <span className="text-prompty-accent">✓</span> Copied
        </>
      ) : (
        <>
          <span aria-hidden>⧉</span> {label}
        </>
      )}
    </button>
  );
}