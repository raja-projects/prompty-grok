"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ACTION_CATEGORIES,
  ACTIONS,
  getActionById,
  isIntimateAction,
  type ActionCategoryId,
} from "@/lib/actions";
import {
  ASPECT_RATIOS,
  CAMERA_ANGLES,
  FRAMINGS,
  TIMES_OF_DAY,
} from "@/lib/camera";
import {
  PEOPLE_COUNTS,
  REGIONS,
  RELATIONSHIPS,
  defaultPeopleForCount,
  relationshipBlocksIntimate,
  type PeopleCount,
  type Relationship,
} from "@/lib/people";
import { PLACES, getPlaceById, randomPlace } from "@/lib/places";
import {
  buildPrompts,
  createRandomizedDefaults,
  DEFAULT_FORM,
} from "@/lib/prompt-builder";
import { DEFAULT_NEGATIVE } from "@/lib/safety";
import { clearRecent, loadRecent, saveRecent } from "@/lib/storage";
import type { Mode, RecentPrompt, SceneFormState } from "@/lib/types";
import { ChipGroup } from "./ChipGroup";
import { CopyButton } from "./CopyButton";
import { ModeToggle } from "./ModeToggle";
import { PersonCard } from "./PersonCard";
import { RecentList } from "./RecentList";
import { TemplateGallery } from "./TemplateGallery";

export function PromptLab() {
  const [form, setForm] = useState<SceneFormState>(DEFAULT_FORM);
  const [hydrated, setHydrated] = useState(false);
  const [recent, setRecent] = useState<RecentPrompt[]>([]);
  const [savedFlash, setSavedFlash] = useState(false);
  const [actionQuery, setActionQuery] = useState("");

  useEffect(() => {
    setRecent(loadRecent());
    setForm(createRandomizedDefaults());
    setHydrated(true);
  }, []);

  const intimateBlocked = relationshipBlocksIntimate(form.relationship);

  const prompts = useMemo(() => buildPrompts(form), [form]);

  function patch(partial: Partial<SceneFormState>) {
    setForm((prev) => {
      const next: SceneFormState = { ...prev, ...partial };

      if (partial.peopleCount && partial.peopleCount !== prev.peopleCount) {
        if (partial.peopleCount !== "group") {
          next.people = defaultPeopleForCount(partial.peopleCount);
        }
        if (partial.peopleCount === "1") {
          next.relationship = "friends";
        }
      }

      if (partial.relationship) {
        const blocked = relationshipBlocksIntimate(partial.relationship);
        if (blocked && isIntimateAction(next.actionId)) {
          const fallback = ACTIONS.find((a) => a.category === "everyday")!;
          next.actionCategory = fallback.category;
          next.actionId = fallback.id;
        }
      }

      if (partial.actionId) {
        const action = getActionById(partial.actionId);
        if (action) {
          next.actionCategory = action.category;
          if (
            action.placeHints?.length &&
            (!partial.placeId || partial.placeId === prev.placeId)
          ) {
            const suggested = randomPlace(action.placeHints);
            next.placeId = suggested.id;
          }
        }
      }

      if (partial.mode && partial.mode !== prev.mode && !partial.aspectRatio) {
        // keep aspect
      }

      return next;
    });
  }

  function onModeChange(mode: Mode) {
    patch({ mode });
  }

  function persist() {
    if (!prompts.short.trim()) return;
    const action = getActionById(form.actionId);
    const list = saveRecent({
      mode: form.mode,
      subject: action?.label ?? "Scene",
      short: prompts.short,
      detailed: prompts.detailed,
    });
    setRecent(list);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1400);
  }

  function resetRandom() {
    setForm(createRandomizedDefaults());
    setActionQuery("");
  }

  const visibleCategories = ACTION_CATEGORIES.filter(
    (c) => !(c.id === "intimate" && intimateBlocked)
  );

  const filteredActions = ACTIONS.filter((a) => {
    if (a.category !== form.actionCategory) return false;
    if (a.category === "intimate" && intimateBlocked) return false;
    if (actionQuery.trim()) {
      const q = actionQuery.toLowerCase();
      return (
        a.label.toLowerCase().includes(q) ||
        a.prompt.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const personSlots =
    form.peopleCount === "group" ? 0 : Number(form.peopleCount);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-prompty-border bg-prompty-surface/60 p-6 shadow-glow sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-prompty-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-prompty-accent2/10 blur-3xl" />
        <div className="relative space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prompty-accent2">
            People scene prompt lab
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Build{" "}
            <span className="bg-gradient-to-r from-prompty-accent to-prompty-accent2 bg-clip-text text-transparent">
              photorealistic
            </span>{" "}
            people prompts
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-prompty-muted sm:text-base">
            Adults 18+ only. Soft romance language. Kerala + Tamil defaults with
            rich action, attire, camera, and lighting controls — assembled in
            your browser.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ModeToggle mode={form.mode} onChange={onModeChange} />
            {!hydrated ? (
              <span className="text-xs text-prompty-muted">Loading defaults…</span>
            ) : null}
          </div>
        </div>
      </section>

      <TemplateGallery
        mode={form.mode}
        onApply={(partial) => {
          setForm((prev) => {
            const merged = { ...prev, ...partial };
            if (partial.peopleCount) {
              merged.people = defaultPeopleForCount(partial.peopleCount);
            } else if (!merged.people.length) {
              merged.people = defaultPeopleForCount(merged.peopleCount);
            }
            if (!merged.negativePrompt) {
              merged.negativePrompt = DEFAULT_NEGATIVE;
            }
            if (
              relationshipBlocksIntimate(merged.relationship) &&
              isIntimateAction(merged.actionId)
            ) {
              const fb = ACTIONS.find((a) => a.category === "everyday")!;
              merged.actionCategory = fb.category;
              merged.actionId = fb.id;
            }
            return merged;
          });
        }}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 rounded-3xl border border-prompty-border bg-prompty-surface/80 p-5 sm:p-6 lg:col-span-3">
          {/* A. Actions */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Action</h3>
            <div className="flex flex-wrap gap-2">
              {visibleCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    const first = ACTIONS.find(
                      (a) =>
                        a.category === c.id &&
                        !(c.id === "intimate" && intimateBlocked)
                    );
                    patch({
                      actionCategory: c.id as ActionCategoryId,
                      ...(first ? { actionId: first.id } : {}),
                    });
                    setActionQuery("");
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    form.actionCategory === c.id
                      ? "border-prompty-accent bg-prompty-accent/25 text-white"
                      : "border-prompty-border bg-prompty-elevated text-prompty-muted hover:text-white"
                  }`}
                  title={c.description}
                >
                  {c.label}
                </button>
              ))}
            </div>
            {intimateBlocked ? (
              <p className="text-[11px] text-prompty-warn">
                Intimate category hidden for siblings / parent–child
                relationships.
              </p>
            ) : null}
            <input
              type="search"
              value={actionQuery}
              onChange={(e) => setActionQuery(e.target.value)}
              placeholder="Search actions…"
              className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent placeholder:text-prompty-muted/50 focus:ring-2"
            />
            <div className="max-h-44 overflow-y-auto rounded-2xl border border-prompty-border bg-prompty-bg/50 p-2">
              <div className="flex flex-wrap gap-2">
                {filteredActions.map((a) => {
                  const active = form.actionId === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => patch({ actionId: a.id })}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                        active
                          ? "border-prompty-accent2 bg-prompty-accent2/20 text-white"
                          : "border-prompty-border bg-prompty-elevated text-prompty-muted hover:text-white"
                      }`}
                    >
                      {a.label}
                    </button>
                  );
                })}
                {!filteredActions.length ? (
                  <p className="px-2 py-1 text-xs text-prompty-muted">
                    No actions match.
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          {/* B. Regions */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-white">
              People region{" "}
              <span className="font-normal text-prompty-muted">
                (multi-select)
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => {
                const active = form.regionIds.includes(r.id);
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      const ids = active
                        ? form.regionIds.filter((id) => id !== r.id)
                        : [...form.regionIds, r.id];
                      patch({
                        regionIds: ids.length ? ids : ["kerala"],
                      });
                    }}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      active
                        ? "border-prompty-accent bg-prompty-accent/25 text-white"
                        : "border-prompty-border bg-prompty-elevated text-prompty-muted hover:text-white"
                    }`}
                    title={r.cues}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* C. Count + relationship + people */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-white">People</h3>
            <ChipGroup
              label="How many"
              options={PEOPLE_COUNTS.map((p) => p.label)}
              value={
                PEOPLE_COUNTS.find((p) => p.id === form.peopleCount)?.label ??
                "2 people"
              }
              onChange={(label) => {
                const found = PEOPLE_COUNTS.find((p) => p.label === label);
                if (found) patch({ peopleCount: found.id as PeopleCount });
              }}
            />
            {form.peopleCount !== "1" ? (
              <ChipGroup
                label="Relationship"
                options={RELATIONSHIPS.map((r) => r.label)}
                value={
                  RELATIONSHIPS.find((r) => r.id === form.relationship)
                    ?.label ?? "Couple"
                }
                onChange={(label) => {
                  const found = RELATIONSHIPS.find((r) => r.label === label);
                  if (found) patch({ relationship: found.id as Relationship });
                }}
              />
            ) : null}

            {form.peopleCount === "group" ? (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-prompty-muted">
                  Crowd descriptors
                </label>
                <textarea
                  rows={3}
                  value={form.crowdDescriptors}
                  onChange={(e) =>
                    patch({ crowdDescriptors: e.target.value })
                  }
                  placeholder="e.g. mixed adults 18+, festive attire, candid smiles…"
                  className="w-full resize-y rounded-2xl border border-prompty-border bg-prompty-bg px-4 py-3 text-sm text-white outline-none ring-prompty-accent placeholder:text-prompty-muted/50 focus:ring-2"
                />
              </div>
            ) : (
              <div className="space-y-3">
                {form.people.slice(0, personSlots).map((person, i) => (
                  <PersonCard
                    key={i}
                    index={i}
                    person={person}
                    onChange={(p) => {
                      const people = [...form.people];
                      people[i] = p;
                      patch({ people });
                    }}
                  />
                ))}
              </div>
            )}
          </section>

          {/* D. Setting */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-white">Setting / where</h3>
            <p className="text-[11px] text-prompty-muted">
              Current: {getPlaceById(form.placeId)?.label ?? form.placeId}
            </p>
            <div className="flex max-h-36 flex-wrap gap-2 overflow-y-auto rounded-2xl border border-prompty-border bg-prompty-bg/50 p-2">
              {PLACES.map((p) => {
                const active = form.placeId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => patch({ placeId: p.id })}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      active
                        ? "border-prompty-accent bg-prompty-accent/25 text-white"
                        : "border-prompty-border bg-prompty-elevated text-prompty-muted hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* E. Camera */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Camera</h3>
            <ChipGroup
              label="Angle"
              options={CAMERA_ANGLES.map((a) => a.label)}
              value={
                CAMERA_ANGLES.find((a) => a.id === form.cameraAngle)?.label ??
                "3/4"
              }
              onChange={(label) => {
                const found = CAMERA_ANGLES.find((a) => a.label === label);
                if (found) patch({ cameraAngle: found.id });
              }}
            />
            <ChipGroup
              label="Framing"
              options={FRAMINGS.map((f) => f.label)}
              value={
                FRAMINGS.find((f) => f.id === form.framing)?.label ??
                "Full body"
              }
              onChange={(label) => {
                const found = FRAMINGS.find((f) => f.label === label);
                if (found) patch({ framing: found.id });
              }}
            />
            <ChipGroup
              label="Aspect ratio"
              options={ASPECT_RATIOS}
              value={form.aspectRatio}
              onChange={(v) =>
                patch({
                  aspectRatio: v as SceneFormState["aspectRatio"],
                })
              }
            />
          </section>

          {/* F. Time */}
          <section className="space-y-2">
            <ChipGroup
              label="Time of day"
              options={TIMES_OF_DAY.map((t) => t.label)}
              value={
                TIMES_OF_DAY.find((t) => t.id === form.timeOfDay)?.label ??
                "Evening"
              }
              onChange={(label) => {
                const found = TIMES_OF_DAY.find((t) => t.label === label);
                if (found) patch({ timeOfDay: found.id });
              }}
            />
            <p className="text-[11px] text-prompty-muted">
              Lighting:{" "}
              {TIMES_OF_DAY.find((t) => t.id === form.timeOfDay)?.lighting}
            </p>
          </section>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-prompty-muted">
              Extra notes (optional)
            </label>
            <textarea
              rows={2}
              value={form.extraNotes}
              onChange={(e) => patch({ extraNotes: e.target.value })}
              placeholder="Mood, props, weather…"
              className="w-full resize-y rounded-2xl border border-prompty-border bg-prompty-bg px-4 py-3 text-sm text-white outline-none ring-prompty-accent placeholder:text-prompty-muted/50 focus:ring-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-prompty-muted">
              Negative prompt
            </label>
            <textarea
              rows={3}
              value={form.negativePrompt}
              onChange={(e) => patch({ negativePrompt: e.target.value })}
              className="w-full resize-y rounded-2xl border border-prompty-border bg-prompty-bg px-4 py-3 text-sm text-white outline-none ring-prompty-accent focus:ring-2"
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
          <OutputCard
            title="Negative prompt"
            subtitle="Default exclusions applied"
            text={prompts.negative}
          />

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
              onClick={resetRandom}
              className="rounded-xl border border-prompty-border px-4 py-2.5 text-sm text-prompty-muted hover:text-white"
            >
              Randomize
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
        onReuse={(item) => patch({ mode: item.mode })}
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
      <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-prompty-elevated/60 p-3 font-mono text-xs leading-relaxed text-white/90">
        {text.trim() || "Your assembled prompt will appear here…"}
      </pre>
    </div>
  );
}
