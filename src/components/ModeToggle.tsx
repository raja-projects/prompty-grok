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
      className="inline-flex rounded-lg border border-prompty-line bg-prompty-page p-0.5"
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
            className={`rounded-[6px] px-3 py-1 text-[11.5px] font-semibold capitalize transition ${
              active ? "bg-prompty-ink text-white" : "text-prompty-muted hover:text-prompty-ink"
            }`}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}