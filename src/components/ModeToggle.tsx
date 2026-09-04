"use client";

import type { Mode } from "@/lib/types";

export function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div
      className="inline-flex rounded-xl border border-prompty-border bg-prompty-surface p-1"
      role="tablist"
      aria-label="Generation mode"
    >
      {(["image", "video"] as Mode[]).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(m)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
              active
                ? "bg-prompty-accent text-white shadow-glow-sm"
                : "text-prompty-muted hover:text-white"
            }`}
          >
            {m === "image" ? "🖼 Image" : "🎬 Video"}
          </button>
        );
      })}
    </div>
  );
}
