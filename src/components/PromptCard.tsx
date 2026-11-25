"use client";

import { useMemo, useState } from "react";
import { getActionById } from "@/lib/actions";
import { buildPrompts } from "@/lib/prompt-builder";
import { updateScene, useScene } from "@/lib/scene-store";
import { saveRecent } from "@/lib/storage";
import { CopyButton } from "./CopyButton";
import { ModeToggle } from "./ModeToggle";

export function PromptCard({ compact = false }: { compact?: boolean }) {
  const scene = useScene();
  const [saved, setSaved] = useState(false);
  const prompts = useMemo(() => buildPrompts(scene), [scene]);
  const action = getActionById(scene.actionId);

  function persist() {
    if (!prompts.short.trim()) return;
    saveRecent({
      mode: scene.mode,
      subject: action?.label ?? "Scene",
      short: prompts.short,
      detailed: prompts.detailed,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="flex min-h-0 flex-col gap-2 p-3">
      <div className="flex items-center gap-1.5">
        <p className="mr-auto text-[9.5px] font-semibold uppercase tracking-[0.12em] text-prompty-muted">
          Prompt
        </p>
        <ModeToggle mode={scene.mode} onChange={(mode) => updateScene((p) => ({ ...p, mode }))} />
        <CopyButton text={prompts.short} label="Copy" compact />
        <button
          type="button"
          onClick={persist}
          className="rounded-md bg-prompty-accent px-2 py-1 text-[10.5px] font-semibold text-white"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      <p
        className={`overflow-y-auto rounded-lg border border-prompty-line bg-white p-2.5 text-[11px] leading-relaxed ${
          compact ? "max-h-20" : "min-h-0 flex-1"
        }`}
      >
        {prompts.short || "…"}
      </p>

      {!compact ? (
        <>
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-prompty-muted">
            Detailed
          </p>
          <p className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-prompty-line bg-white p-2.5 text-[11px] leading-relaxed text-prompty-muted">
            {prompts.detailed || "…"}
          </p>
          <CopyButton text={prompts.detailed} label="Copy detailed" />
        </>
      ) : null}
    </div>
  );
}