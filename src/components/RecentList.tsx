"use client";

import type { RecentPrompt } from "@/lib/types";
import { CopyButton } from "./CopyButton";

export function RecentList({
  items,
  onClear,
  onReuse,
}: {
  items: RecentPrompt[];
  onClear: () => void;
  onReuse: (item: RecentPrompt) => void;
}) {
  if (!items.length) return null;
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Recent prompts</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-prompty-muted underline-offset-2 hover:text-white hover:underline"
        >
          Clear
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-prompty-border bg-prompty-surface/80 p-3"
          >
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-prompty-elevated px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-prompty-accent2">
                {item.mode}
              </span>
              <span className="truncate text-xs text-prompty-muted">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="mb-2 line-clamp-2 text-sm text-white/90">{item.short}</p>
            <div className="flex flex-wrap gap-2">
              <CopyButton text={item.short} label="Copy short" />
              <CopyButton text={item.detailed} label="Copy detailed" />
              <button
                type="button"
                onClick={() => onReuse(item)}
                className="rounded-lg border border-prompty-border px-3 py-1.5 text-xs text-prompty-muted hover:text-white"
              >
                Reuse subject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
