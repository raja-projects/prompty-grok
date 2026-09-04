"use client";

import { TEMPLATES } from "@/lib/templates";
import type { Mode, PromptFormState } from "@/lib/types";

export function TemplateGallery({
  mode,
  onApply,
}: {
  mode: Mode;
  onApply: (partial: Partial<PromptFormState>) => void;
}) {
  const list = TEMPLATES.filter((t) => t.mode === mode);
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-2">
        <h2 className="text-sm font-semibold text-white">Starter templates</h2>
        <span className="text-xs text-prompty-muted">{list.length} for {mode}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onApply(t.state)}
            className="group rounded-2xl border border-prompty-border bg-prompty-surface p-4 text-left transition hover:border-prompty-accent hover:shadow-glow-sm"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-prompty-elevated text-sm group-hover:bg-prompty-accent/30">
                {t.icon}
              </span>
              <span className="font-semibold text-white">{t.name}</span>
            </div>
            <p className="text-xs leading-relaxed text-prompty-muted">{t.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
