"use client";

import { TEMPLATES } from "@/lib/templates";
import type { Mode, SceneFormState } from "@/lib/types";

export function TemplateGallery({
  mode,
  onApply,
}: {
  mode: Mode;
  onApply: (partial: Partial<SceneFormState>) => void;
}) {
  const list = TEMPLATES.filter((t) => t.mode === mode);
  if (!list.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold text-white">Quick scene presets</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onApply(t.state)}
            className="rounded-2xl border border-prompty-border bg-prompty-surface/80 p-4 text-left transition hover:border-prompty-accent hover:shadow-glow-sm"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg">{t.icon}</span>
              <span className="text-sm font-semibold text-white">{t.name}</span>
            </div>
            <p className="text-xs leading-relaxed text-prompty-muted">
              {t.description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
