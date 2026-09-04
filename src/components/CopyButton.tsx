"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback
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

  return (
    <button
      type="button"
      onClick={onCopy}
      disabled={!text.trim()}
      className="inline-flex items-center gap-1.5 rounded-lg border border-prompty-border bg-prompty-elevated px-3 py-1.5 text-xs font-medium text-white transition hover:border-prompty-accent hover:bg-prompty-accent/20 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {copied ? (
        <>
          <span className="text-prompty-success">✓</span> Copied
        </>
      ) : (
        <>
          <span aria-hidden>⧉</span> {label}
        </>
      )}
    </button>
  );
}
