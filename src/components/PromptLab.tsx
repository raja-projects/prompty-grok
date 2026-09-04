"use client";

import { useEffect, useMemo, useState } from "react";
import { buildPrompts, DEFAULT_FORM } from "@/lib/prompt-builder";
import { clearRecent, loadRecent, saveRecent } from "@/lib/storage";
import {
  ASPECT_RATIOS,
  CAMERA_MOVE_PRESETS,
  CAMERA_PRESETS,
  COMPOSITION_PRESETS,
  DURATION_PRESETS,
  IMAGE_TARGETS,
  LIGHTING_PRESETS,
  MOTION_PRESETS,
  QUALITY_TAGS,
  STYLE_PRESETS,
  VIDEO_TARGETS,
} from "@/lib/templates";
import type {
  AspectRatio,
  Mode,
  PromptFormState,
  QualityTag,
  RecentPrompt,
} from "@/lib/types";
import { ChipGroup, MultiChipGroup } from "./ChipGroup";
import { CopyButton } from "./CopyButton";
import { ModeToggle } from "./ModeToggle";
import { RecentList } from "./RecentList";
import { TemplateGallery } from "./TemplateGallery";

export function PromptLab() {
  const [form, setForm] = useState<PromptFormState>(DEFAULT_FORM);
  const [recent, setRecent] = useState<RecentPrompt[]>([]);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  const prompts = useMemo(() => buildPrompts(form), [form]);

  function patch(partial: Partial<PromptFormState>) {
    setForm((prev) => {
      const next = { ...prev, ...partial };
      if (partial.mode && partial.mode !== prev.mode && !partial.target) {
        next.target = partial.mode === "image" ? "Midjourney" : "Runway";
      }
      return next;
    });
  }

  function onModeChange(mode: Mode) {
    patch({
      mode,
      target: mode === "image" ? "Midjourney" : "Runway",
      aspectRatio: mode === "image" ? form.aspectRatio : form.aspectRatio,
    });
  }

  function persist() {
    if (!prompts.short.trim()) return;
    const list = saveRecent({
      mode: form.mode,
      subject: form.subject,
      short: prompts.short,
      detailed: prompts.detailed,
    });
    setRecent(list);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1400);
  }

  const targets = form.mode === "image" ? IMAGE_TARGETS : VIDEO_TARGETS;

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-prompty-border bg-prompty-surface/60 p-6 shadow-glow sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-prompty-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-prompty-accent2/10 blur-3xl" />
        <div className="relative space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prompty-accent2">
            Creative prompt lab
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Turn a rough idea into{" "}
            <span className="bg-gradient-to-r from-prompty-accent to-prompty-accent2 bg-clip-text text-transparent">
              copy-ready prompts
            </span>
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-prompty-muted sm:text-base">
            Describe your scene, dial in style and camera language, then grab short and detailed
            variants for Midjourney, Flux, DALL·E, Stable Diffusion, Runway, Kling, Luma, and
            Sora-style tools — assembled entirely in your browser.
          </p>
          <ModeToggle mode={form.mode} onChange={onModeChange} />
        </div>
      </section>

      <TemplateGallery mode={form.mode} onApply={patch} />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-5 rounded-3xl border border-prompty-border bg-prompty-surface/80 p-5 sm:p-6 lg:col-span-3">
          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-xs font-semibold uppercase tracking-wider text-prompty-muted"
            >
              Subject / scene
            </label>
            <textarea
              id="subject"
              rows={4}
              value={form.subject}
              onChange={(e) => patch({ subject: e.target.value })}
              placeholder={
                form.mode === "image"
                  ? "A red bicycle leaning against a sunlit brick wall…"
                  : "A paper boat drifting through glowing bioluminescent water…"
              }
              className="w-full resize-y rounded-2xl border border-prompty-border bg-prompty-bg px-4 py-3 text-sm text-white outline-none ring-prompty-accent placeholder:text-prompty-muted/50 focus:ring-2"
            />
          </div>

          <ChipGroup
            label="Style / aesthetic"
            options={STYLE_PRESETS}
            value={
              STYLE_PRESETS.includes(form.style as (typeof STYLE_PRESETS)[number])
                ? form.style
                : form.style
                  ? "Custom"
                  : "Cinematic"
            }
            onChange={(v) => {
              if (v === "Custom") patch({ style: "Custom" });
              else patch({ style: v, customStyle: "" });
            }}
            allowCustom
            customValue={form.customStyle}
            onCustomChange={(v) => patch({ customStyle: v })}
          />

          {form.mode === "image" ? (
            <>
              <ChipGroup
                label="Camera"
                options={CAMERA_PRESETS}
                value={form.camera}
                onChange={(v) => patch({ camera: v })}
              />
              <ChipGroup
                label="Lighting"
                options={LIGHTING_PRESETS}
                value={form.lighting}
                onChange={(v) => patch({ lighting: v })}
              />
              <ChipGroup
                label="Composition"
                options={COMPOSITION_PRESETS}
                value={form.composition}
                onChange={(v) => patch({ composition: v })}
              />
            </>
          ) : (
            <>
              <ChipGroup
                label="Motion"
                options={MOTION_PRESETS}
                value={form.motion}
                onChange={(v) => patch({ motion: v })}
              />
              <ChipGroup
                label="Camera move"
                options={CAMERA_MOVE_PRESETS}
                value={form.cameraMove}
                onChange={(v) => patch({ cameraMove: v })}
              />
              <ChipGroup
                label="Duration cue"
                options={DURATION_PRESETS}
                value={form.duration}
                onChange={(v) => patch({ duration: v })}
              />
            </>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <ChipGroup
              label="Aspect ratio"
              options={ASPECT_RATIOS}
              value={form.aspectRatio}
              onChange={(v) => patch({ aspectRatio: v as AspectRatio })}
            />
            <ChipGroup
              label={form.mode === "image" ? "Target model" : "Target video tool"}
              options={targets}
              value={form.target}
              onChange={(v) => patch({ target: v })}
            />
          </div>

          <MultiChipGroup
            label="Quality tags"
            options={QUALITY_TAGS}
            values={form.qualityTags}
            onChange={(v) => patch({ qualityTags: v as QualityTag[] })}
          />

          <div className="space-y-2">
            <label
              htmlFor="negative"
              className="text-xs font-semibold uppercase tracking-wider text-prompty-muted"
            >
              Negative prompt (optional)
            </label>
            <textarea
              id="negative"
              rows={2}
              value={form.negativePrompt}
              onChange={(e) => patch({ negativePrompt: e.target.value })}
              placeholder="blurry, watermark, extra fingers, low quality…"
              className="w-full resize-y rounded-2xl border border-prompty-border bg-prompty-bg px-4 py-3 text-sm text-white outline-none ring-prompty-accent placeholder:text-prompty-muted/50 focus:ring-2"
            />
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <OutputCard
            title="Short prompt"
            subtitle="Compact · paste-friendly"
            text={prompts.short}
          />
          <OutputCard
            title="Detailed prompt"
            subtitle="Structured · richer control"
            text={prompts.detailed}
          />
          {prompts.negative ? (
            <OutputCard
              title="Negative prompt"
              subtitle="Optional exclusions"
              text={prompts.negative}
            />
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={persist}
              disabled={!prompts.short.trim()}
              className="rounded-xl bg-gradient-to-r from-prompty-accent to-prompty-glow px-4 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {savedFlash ? "Saved to recent ✓" : "Save to recent"}
            </button>
            <button
              type="button"
              onClick={() => setForm(DEFAULT_FORM)}
              className="rounded-xl border border-prompty-border px-4 py-2.5 text-sm text-prompty-muted hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <RecentList
        items={recent}
        onClear={() => {
          clearRecent();
          setRecent([]);
        }}
        onReuse={(item) => patch({ mode: item.mode, subject: item.subject })}
      />
    </div>
  );
}

function OutputCard({
  title,
  subtitle,
  text,
}: {
  title: string;
  subtitle: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-prompty-border bg-prompty-bg/80 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-[11px] text-prompty-muted">{subtitle}</p>
        </div>
        <CopyButton text={text} />
      </div>
      <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-prompty-elevated/60 p-3 font-mono text-xs leading-relaxed text-white/90">
        {text.trim() || "Your assembled prompt will appear here…"}
      </pre>
    </div>
  );
}
