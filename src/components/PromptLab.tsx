"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ACTION_CATEGORIES,
  ACTIONS,
  getActionById,
  isIntimateAction,
  categoryRequiresAdult21,
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
  defaultPerson,
  defaultFoursomeSwapPeople,
  defaultMmfPeople,
  defaultFfmPeople,
  defaultCrowdPressPeople,
  defaultWlwPeople,
  relationshipBlocksIntimate,
  reshuffleFaceCuts,
  applyRegionLook,
  sceneHasUnder21,
  type PeopleCount,
  type Relationship,
} from "@/lib/people";
import { PLACES } from "@/lib/places";
import {
  buildPrompts,
  createRandomizedDefaults,
  createStudioDefaults,
  DEFAULT_FORM,
} from "@/lib/prompt-builder";
import {
  clearRecent,
  deleteFavoritePerson,
  loadFavoritePeople,
  loadRecent,
  saveFavoritePerson,
  saveRecent,
} from "@/lib/storage";
import type { FavoritePerson, Mode, RecentPrompt, SceneFormState } from "@/lib/types";
import { CopyButton } from "./CopyButton";
import { ModeToggle } from "./ModeToggle";
import { PersonCard } from "./PersonCard";
import { RecentList } from "./RecentList";

function Section({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-prompty-border bg-prompty-surface/70 p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-prompty-accent/25 text-xs font-bold text-white">
          {step}
        </span>
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {hint ? (
            <p className="mt-0.5 text-[11px] text-prompty-muted">{hint}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-prompty-muted">
      {children}
    </span>
  );
}

function SoftSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (id: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2.5 text-sm text-white outline-none ring-prompty-accent focus:ring-2"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ChipRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                active
                  ? "border-prompty-accent bg-prompty-accent/30 text-white"
                  : "border-prompty-border bg-prompty-bg text-prompty-muted hover:text-white"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Grow/shrink people list without wiping existing person cards. */
function adjustPeopleCount(
  people: SceneFormState["people"],
  count: PeopleCount
): SceneFormState["people"] {
  if (count === "group") return people;
  const n = Number(count);
  if (people.length === n) return people;
  if (people.length > n) return people.slice(0, n);
  const next = [...people];
  while (next.length < n) {
    const i = next.length;
    next.push(
      defaultPerson({
        gender: i % 2 === 0 ? "woman" : "man",
        age: i % 2 === 0 ? "21" : "34",
      })
    );
  }
  return next;
}

export function PromptLab() {
  const [form, setForm] = useState<SceneFormState>(DEFAULT_FORM);
  const [hydrated, setHydrated] = useState(false);
  const [recent, setRecent] = useState<RecentPrompt[]>([]);
  const [savedFlash, setSavedFlash] = useState(false);
  const [actionQuery, setActionQuery] = useState("");
  const [favoritePeople, setFavoritePeople] = useState<FavoritePerson[]>([]);

  useEffect(() => {
    setRecent(loadRecent());
    setFavoritePeople(loadFavoritePeople());
    setForm(createStudioDefaults());
    setHydrated(true);
  }, []);

  const intimateBlocked = relationshipBlocksIntimate(form.relationship);
  const under21 = sceneHasUnder21(form.people, form.peopleCount);
  const prompts = useMemo(() => buildPrompts(form), [form]);

  /** Patch one field at a time — never cascade-reset unrelated selections. */
  function patch(partial: Partial<SceneFormState>) {
    setForm((prev) => {
      const next: SceneFormState = { ...prev, ...partial };

      if (partial.peopleCount && partial.peopleCount !== prev.peopleCount) {
        next.people = adjustPeopleCount(prev.people, partial.peopleCount);
        // Do not force relationship change.
      }

      // Own pairs / Own+neighbor press: force 4 people = YA couple + mid-age couple
      if (
        partial.actionCategory === "swap-own-grk" ||
        partial.actionCategory === "swap-cross-grk"
      ) {
        next.peopleCount = "4";
        next.people = defaultFoursomeSwapPeople();
        if (!relationshipBlocksIntimate("friends")) {
          next.relationship = "friends";
        }
        const cat = partial.actionCategory;
        const first =
          ACTIONS.find((a) => a.category === cat) ??
          getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== cat) {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      // Two men + her: force 3 people = 1 woman + 2 men
      if (partial.actionCategory === "mmf-grk") {
        next.peopleCount = "3";
        next.people = defaultMmfPeople();
        if (!relationshipBlocksIntimate("friends")) {
          next.relationship = "friends";
        }
        const first =
          ACTIONS.find((a) => a.category === "mmf-grk") ??
          getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== "mmf-grk") {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      // Two women + him: force 3 people = 2 women + 1 man
      if (partial.actionCategory === "ffm-grk") {
        next.peopleCount = "3";
        next.people = defaultFfmPeople();
        if (!relationshipBlocksIntimate("friends")) {
          next.relationship = "friends";
        }
        const first =
          ACTIONS.find((a) => a.category === "ffm-grk") ??
          getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== "ffm-grk") {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      // Crowd press: YA woman + mid-age man, strangers, crowded vibe
      if (partial.actionCategory === "crowd-press-grk") {
        next.peopleCount = "2";
        next.people = defaultCrowdPressPeople();
        next.relationship = "strangers";
        const first =
          ACTIONS.find((a) => a.category === "crowd-press-grk") ??
          getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== "crowd-press-grk") {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      // Women together: force 2 women, couple
      if (partial.actionCategory === "wlw-grk") {
        next.peopleCount = "2";
        next.people = defaultWlwPeople();
        if (!relationshipBlocksIntimate("couple")) {
          next.relationship = "couple";
        }
        const first =
          ACTIONS.find((a) => a.category === "wlw-grk") ??
          getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== "wlw-grk") {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      // Safety only: sibling/parent cannot keep intimate/hardcore selected.
      if (partial.relationship) {
        const blocked = relationshipBlocksIntimate(partial.relationship);
        if (blocked && isIntimateAction(next.actionId)) {
          const fallback = ACTIONS.find((a) => a.category === "everyday");
          if (fallback) {
            next.actionCategory = fallback.category;
            next.actionId = fallback.id;
          }
        }
      }

      // actionId updates category; backside-press actions also auto-set camera/framing/place.
      if (partial.actionId) {
        const action = getActionById(partial.actionId);
        if (action) {
          next.actionCategory = action.category;
          if (action.autoCamera) next.cameraAngle = action.autoCamera;
          if (action.autoFraming) next.framing = action.autoFraming;
          if (action.placeHints?.length) next.placeId = action.placeHints[0]!;
        }
      }

      // Category chip alone does not overwrite actionId.

      // Under 19: only everyday / social / physical (play)
      if (sceneHasUnder21(next.people, next.peopleCount)) {
        if (categoryRequiresAdult21(next.actionCategory) || categoryRequiresAdult21(getActionById(next.actionId)?.category ?? "everyday")) {
          const fallback = ACTIONS.find((a) => a.category === "everyday");
          if (fallback) {
            next.actionCategory = fallback.category;
            next.actionId = fallback.id;
          }
        }
      }

      return next;
    });
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

  function resetDefaults() {
    setForm(createStudioDefaults());
    setActionQuery("");
  }

  function randomizeAll() {
    setForm(createRandomizedDefaults());
    setActionQuery("");
  }

  function changeFacesOnly() {
    setForm((prev) => {
      if (prev.peopleCount === "group") return prev;
      return { ...prev, people: reshuffleFaceCuts(prev.people, prev.regionIds) };
    });
  }

  function savePersonAsFavorite(person: SceneFormState["people"][number], index: number) {
    const name = window.prompt("Name this favorite person", `Person ${index + 1}`);
    if (name === null) return;
    setFavoritePeople(saveFavoritePerson(name, person));
  }

  const visibleCategories = ACTION_CATEGORIES.filter((c) => {
    if ((c.id === "intimate" || c.id === "hardcore" || c.id === "hardcore-grk" || c.id === "swap-own-grk" || c.id === "swap-cross-grk" || c.id === "mmf-grk" || c.id === "ffm-grk" || c.id === "crowd-press-grk" || c.id === "wlw-grk") && intimateBlocked) return false;
    if (under21 && categoryRequiresAdult21(c.id)) return false;
    return true;
  });

  const filteredActions = ACTIONS.filter((a) => {
    if (a.category !== form.actionCategory) return false;
    if (
      (a.category === "intimate" || a.category === "hardcore" || a.category === "hardcore-grk" || a.category === "swap-own-grk" || a.category === "swap-cross-grk" || a.category === "mmf-grk" || a.category === "ffm-grk" || a.category === "crowd-press-grk" || a.category === "wlw-grk") &&
      intimateBlocked
    )
      return false;
    if (actionQuery.trim()) {
      const q = actionQuery.toLowerCase();
      return (
        a.label.toLowerCase().includes(q) || a.prompt.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const personSlots =
    form.peopleCount === "group" ? 0 : Number(form.peopleCount);

  const regionOptions = REGIONS.map((r) => ({ id: r.id, label: r.label }));

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 rounded-2xl border border-prompty-border bg-prompty-surface/60 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-prompty-accent2">
            Prompty
          </p>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Scene builder
          </h1>
          <p className="mt-1 text-xs text-prompty-muted">
            Adults 19+ · pick each control independently · prompts ready for
            Gemini, ChatGPT & Grok
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ModeToggle
            mode={form.mode}
            onChange={(mode: Mode) => patch({ mode })}
          />
          {!hydrated ? (
            <span className="text-xs text-prompty-muted">Loading…</span>
          ) : null}
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          {under21 ? (
            <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
              Age 18: Everyday / Social / Physical (play) only. Romance, Intimate, and Hardcore need everyone 19+.
            </p>
          ) : null}

          <Section
            step={1}
            title="Action"
            hint="Auto people: Swap four=4; MMF/FFM=3; Crowd=2 strangers; Women together=2."
          >
            <ChipRow
              label="Category"
              options={visibleCategories.map((c) => ({
                id: c.id,
                label: c.label,
              }))}
              value={form.actionCategory}
              onChange={(id) =>
                patch({ actionCategory: id as ActionCategoryId })
              }
            />
            <input
              type="search"
              value={actionQuery}
              onChange={(e) => setActionQuery(e.target.value)}
              placeholder="Search actions…"
              className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent placeholder:text-prompty-muted/50 focus:ring-2"
            />
            <div className="max-h-56 space-y-1 overflow-y-auto rounded-xl border border-prompty-border bg-prompty-bg/50 p-2">
              {filteredActions.length === 0 ? (
                <p className="p-3 text-xs text-prompty-muted">No actions match.</p>
              ) : (
                filteredActions.map((a) => {
                  const active = form.actionId === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => patch({ actionId: a.id })}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                        active
                          ? "bg-prompty-accent/25 text-white"
                          : "text-prompty-muted hover:bg-prompty-elevated hover:text-white"
                      }`}
                    >
                      {a.label}
                    </button>
                  );
                })
              )}
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
              <input
                type="checkbox"
                checked={form.useCustomActionPrompt}
                onChange={(e) =>
                  patch({ useCustomActionPrompt: e.target.checked })
                }
                className="h-4 w-4 rounded border-prompty-border bg-prompty-bg accent-prompty-accent"
              />
              Use custom action prompt
            </label>
            {form.useCustomActionPrompt ? (
              <label className="block">
                <FieldLabel>Custom action prompt</FieldLabel>
                <textarea
                  value={form.customActionPrompt}
                  onChange={(e) =>
                    patch({ customActionPrompt: e.target.value })
                  }
                  rows={3}
                  placeholder="Describe the action to use instead of the selected preset…"
                  className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent placeholder:text-prompty-muted/50 focus:ring-2"
                />
                <span className="mt-1 block text-[11px] text-prompty-muted">
                  When enabled and filled, this replaces the selected action text in the generated prompts.
                </span>
              </label>
            ) : null}
          </Section>

          <Section
            step={2}
            title="People"
            hint="Count only adds/removes slots — existing faces & attire stay"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <SoftSelect
                label="People count"
                value={form.peopleCount}
                options={PEOPLE_COUNTS.map((p) => ({
                  id: p.id,
                  label: p.label,
                }))}
                onChange={(id) => patch({ peopleCount: id as PeopleCount })}
              />
              {form.peopleCount !== "1" ? (
                <SoftSelect
                  label="Relationship"
                  value={form.relationship}
                  options={RELATIONSHIPS.map((r) => ({
                    id: r.id,
                    label: r.label,
                  }))}
                  onChange={(id) =>
                    patch({ relationship: id as Relationship })
                  }
                />
              ) : null}
            </div>

            <div>
              <FieldLabel>Region look</FieldLabel>
              <div className="flex flex-wrap gap-1.5">
                {regionOptions.map((r) => {
                  const active = form.regionIds.includes(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        const has = form.regionIds.includes(r.id);
                        const regionIds = has
                          ? form.regionIds.filter((x) => x !== r.id)
                          : [...form.regionIds, r.id];
                        const nextIds = regionIds.length ? regionIds : ["kerala"];
                        setForm((prev) => ({
                          ...prev,
                          regionIds: nextIds,
                          people:
                            prev.peopleCount === "group"
                              ? prev.people
                              : applyRegionLook(prev.people, nextIds),
                        }));
                      }}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                        active
                          ? "border-prompty-accent2 bg-prompty-accent2/20 text-white"
                          : "border-prompty-border bg-prompty-bg text-prompty-muted hover:text-white"
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>


            {form.peopleCount === "group" ? (
              <div className="space-y-3">
                <div>
                  <FieldLabel>Favorite people in this group</FieldLabel>
                  {favoritePeople.length ? (
                    <div className="flex flex-wrap gap-2">
                      {favoritePeople.map((favorite) => {
                        const selected = (form.groupPeople ?? []).some(
                          (person) => JSON.stringify(person) === JSON.stringify(favorite.person)
                        );
                        return (
                          <button
                            key={favorite.id}
                            type="button"
                            onClick={() =>
                              patch({
                                groupPeople: selected
                                  ? (form.groupPeople ?? []).filter(
                                      (person) => JSON.stringify(person) !== JSON.stringify(favorite.person)
                                    )
                                  : [...(form.groupPeople ?? []), { ...favorite.person }],
                              })
                            }
                            className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                              selected
                                ? "border-prompty-accent bg-prompty-accent/30 text-white"
                                : "border-prompty-border bg-prompty-bg text-prompty-muted hover:text-white"
                            }`}
                          >
                            {selected ? "✓ " : "+ "}{favorite.name}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-prompty-muted">Save a person as a favorite first.</p>
                  )}
                </div>
                <label className="block">
                  <FieldLabel>Crowd notes</FieldLabel>
                  <textarea
                    value={form.crowdDescriptors}
                    onChange={(e) => patch({ crowdDescriptors: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent focus:ring-2"
                  />
                </label>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={changeFacesOnly}
                    className="rounded-xl border border-prompty-border px-3 py-2 text-xs font-medium text-prompty-muted hover:text-white"
                  >
                    Change faces only
                  </button>
                </div>
                <div className="space-y-3">
                  {form.people.slice(0, personSlots).map((person, i) => (
                    <PersonCard
                      key={i}
                      index={i}
                      person={person}
                      regionIds={form.regionIds}
                      favoritePeople={favoritePeople}
                      onSelectFavorite={(favorite) => {
                        const people = [...form.people];
                        people[i] = favorite;
                        patch({ people });
                      }}
                      onSaveFavorite={() => savePersonAsFavorite(person, i)}
                      onChange={(p) => {
                        const people = [...form.people];
                        people[i] = p;
                        patch({ people });
                      }}
                    />
                  ))}
                </div>
                {favoritePeople.length ? (
                  <div>
                    <FieldLabel>Manage favorite people</FieldLabel>
                    <div className="flex flex-wrap gap-2">
                      {favoritePeople.map((favorite) => (
                        <button
                          key={favorite.id}
                          type="button"
                          title={`Delete ${favorite.name}`}
                          onClick={() => setFavoritePeople(deleteFavoritePerson(favorite.id))}
                          className="rounded-lg border border-prompty-border px-2.5 py-1.5 text-xs text-prompty-muted hover:border-red-400/50 hover:text-red-200"
                        >
                          {favorite.name} ×
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </Section>

          <Section step={3} title="Place & camera">
            <div className="grid gap-3 sm:grid-cols-2">
              <SoftSelect
                label="Place"
                value={form.placeId}
                options={PLACES.map((p) => ({ id: p.id, label: p.label }))}
                onChange={(id) => patch({ placeId: id })}
              />
              <SoftSelect
                label="Time of day"
                value={form.timeOfDay}
                options={TIMES_OF_DAY.map((t) => ({
                  id: t.id,
                  label: t.label,
                }))}
                onChange={(id) =>
                  patch({
                    timeOfDay: id as SceneFormState["timeOfDay"],
                  })
                }
              />
              <SoftSelect
                label="Camera angle"
                value={form.cameraAngle}
                options={CAMERA_ANGLES.map((c) => ({
                  id: c.id,
                  label: c.label,
                }))}
                onChange={(id) =>
                  patch({
                    cameraAngle: id as SceneFormState["cameraAngle"],
                  })
                }
              />
              <SoftSelect
                label="Framing"
                value={form.framing}
                options={FRAMINGS.map((f) => ({ id: f.id, label: f.label }))}
                onChange={(id) =>
                  patch({ framing: id as SceneFormState["framing"] })
                }
              />
            </div>
            <ChipRow
              label="Aspect ratio"
              options={ASPECT_RATIOS.map((r) => ({ id: r, label: r }))}
              value={form.aspectRatio}
              onChange={(id) =>
                patch({ aspectRatio: id as SceneFormState["aspectRatio"] })
              }
            />
          </Section>

          <Section step={4} title="Notes">
            <label className="block">
              <FieldLabel>Extra notes</FieldLabel>
              <textarea
                value={form.extraNotes}
                onChange={(e) => patch({ extraNotes: e.target.value })}
                rows={2}
                placeholder="Optional extras…"
                className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent placeholder:text-prompty-muted/50 focus:ring-2"
              />
            </label>
            <label className="block">
              <FieldLabel>Negative prompt</FieldLabel>
              <textarea
                value={form.negativePrompt}
                onChange={(e) => patch({ negativePrompt: e.target.value })}
                rows={2}
                className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent focus:ring-2"
              />
            </label>
          </Section>
        </div>

        <aside className="space-y-4 lg:col-span-5 lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-2xl border border-prompty-border bg-prompty-surface/80 p-4 shadow-glow-sm">
            <h3 className="mb-3 text-sm font-semibold text-white">
              Live prompts
            </h3>
            <div className="space-y-3">
              <OutputCard title="Short" text={prompts.short} />
              <OutputCard title="Detailed" text={prompts.detailed} />
              <OutputCard title="Negative" text={prompts.negative} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={persist}
                disabled={!prompts.short.trim()}
                className="rounded-xl bg-gradient-to-r from-prompty-accent to-prompty-glow px-4 py-2.5 text-sm font-semibold text-white shadow-glow-sm disabled:opacity-40"
              >
                {savedFlash ? "Saved ✓" : "Save"}
              </button>
              <button
                type="button"
                onClick={resetDefaults}
                className="rounded-xl border border-prompty-border px-4 py-2.5 text-sm text-prompty-muted hover:text-white"
              >
                Reset defaults
              </button>
              <button
                type="button"
                onClick={changeFacesOnly}
                className="rounded-xl border border-prompty-border px-4 py-2.5 text-sm text-prompty-muted hover:text-white"
              >
                Change faces
              </button>
              <button
                type="button"
                onClick={randomizeAll}
                className="rounded-xl border border-prompty-border px-4 py-2.5 text-sm text-prompty-muted hover:text-white"
              >
                Randomize
              </button>
            </div>
          </div>
        </aside>
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

function OutputCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-prompty-border bg-prompty-bg/80 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="text-xs font-semibold text-white">{title}</h4>
        <CopyButton text={text} />
      </div>
      <pre className="max-h-36 overflow-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-white/85">
        {text.trim() || "…"}
      </pre>
    </div>
  );
}
