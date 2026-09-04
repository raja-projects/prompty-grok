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
  defaultMmmfPeople,
  defaultFiveCouplesPeople,
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
  updateFavoritePerson,
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
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [editingFavoriteIds, setEditingFavoriteIds] = useState<Record<number, string>>({});

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

      // Minor ages are available only in the three safe, non-romantic categories.
      if (partial.actionCategory && categoryRequiresAdult21(partial.actionCategory)) {
        next.people = next.people.map((person) =>
          Number(person.age) < 19 ? { ...person, age: "19" } : person
        );
        next.groupPeople = (next.groupPeople ?? []).map((person) =>
          Number(person.age) < 19 ? { ...person, age: "19" } : person
        );
      }

      if (partial.peopleCount && partial.peopleCount !== prev.peopleCount) {
        next.people = adjustPeopleCount(prev.people, partial.peopleCount);
        // Do not force relationship change.
      }

      // Own pairs / Own+neighbor press: force 4 people = YA couple + mid-age couple
      if (
        partial.actionCategory === "swap-own-grk" ||
        partial.actionCategory === "swap-cross-grk" ||
        partial.actionCategory === "gf-exchange-grk"
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

      // Three men + her: force 4 people = 1 woman + 3 men
      if (partial.actionCategory === "mmmf-grk") {
        next.peopleCount = "4";
        next.people = defaultMmmfPeople();
        next.relationship = "friends";
        const first =
          ACTIONS.find((a) => a.category === "mmmf-grk") ??
          getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== "mmmf-grk") {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      if (partial.actionCategory === "five-couples-games") {
        next.peopleCount = "group";
        next.relationship = "friends";
        next.crowdDescriptors = "exactly five established adult couples, ten consenting adults age 19+, dressed for a stylish private couples party, every face distinct and visible";
        next.groupPeople = defaultFiveCouplesPeople();
        const first = ACTIONS.find((a) => a.category === "five-couples-games");
        if (first) {
          next.actionId = first.id;
          next.actionCategory = first.category;
          if (first.placeHints?.length) next.placeId = first.placeHints[0]!;
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
        next.useCustomActionPrompt = false;
        next.customActionPrompt = "";
        if (next.relationship === "couple" || next.relationship === "married") next.relationship = "friends";
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
    const editingId = editingFavoriteIds[index];
    const current = favoritePeople.find((favorite) => favorite.id === editingId);
    const name = window.prompt(
      editingId ? "Update this favorite person's name" : "Name this favorite person",
      current?.name ?? `Person ${index + 1}`
    );
    if (name === null) return;
    if (editingId) {
      setFavoritePeople(updateFavoritePerson(editingId, name, person));
      setEditingFavoriteIds((ids) => {
        const next = { ...ids };
        delete next[index];
        return next;
      });
    } else {
      setFavoritePeople(saveFavoritePerson(name, person));
    }
  }

  function saveGroupPersonAsFavorite(person: SceneFormState["people"][number], index: number) {
    const editingId = editingFavoriteIds[index];
    const current = favoritePeople.find((favorite) => favorite.id === editingId);
    const name = window.prompt(editingId ? "Update this favorite person's name" : "Name this favorite person", current?.name ?? `Couple member ${index + 1}`);
    if (name === null) return;
    setFavoritePeople(editingId ? updateFavoritePerson(editingId, name, person) : saveFavoritePerson(name, person));
    if (editingId) setEditingFavoriteIds((ids) => Object.fromEntries(Object.entries(ids).filter(([slot]) => Number(slot) !== index)));
  }

  const visibleCategories = ACTION_CATEGORIES.filter((c) => {
    if ((c.id === "intimate" || c.id === "hardcore" || c.id === "hardcore-grk" || c.id === "swap-own-grk" || c.id === "swap-cross-grk" || c.id === "gf-exchange-grk" || c.id === "five-couples-games" || c.id === "mmf-grk" || c.id === "mmmf-grk" || c.id === "ffm-grk" || c.id === "crowd-press-grk" || c.id === "wlw-grk") && intimateBlocked) return false;
    if (under21 && categoryRequiresAdult21(c.id)) return false;
    return true;
  });

  const filteredActions = ACTIONS.filter((a) => {
    if (a.category !== form.actionCategory) return false;
    if (
      (a.category === "intimate" || a.category === "hardcore" || a.category === "hardcore-grk" || a.category === "swap-own-grk" || a.category === "swap-cross-grk" || a.category === "gf-exchange-grk" || a.category === "five-couples-games" || a.category === "mmf-grk" || a.category === "mmmf-grk" || a.category === "ffm-grk" || a.category === "crowd-press-grk" || a.category === "wlw-grk") &&
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
    <div className="min-h-screen lg:grid lg:grid-cols-[210px_minmax(0,1fr)]">
      <aside className="hidden border-r border-prompty-border bg-prompty-surface/80 p-3 lg:flex lg:flex-col">
        <div className="flex items-center gap-3 px-2 py-4 font-display text-lg font-bold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#ff8a70] via-prompty-accent to-prompty-accent2 shadow-glow-sm">✦</span>
          Prompty
        </div>
        <nav className="mt-3 space-y-1 text-sm">
          <a href="#create" className="flex items-center gap-3 rounded-xl bg-prompty-elevated px-3 py-3 font-medium text-white"><span className="text-prompty-accent2">✦</span>Create</a>
          <a href="#people" className="flex items-center gap-3 rounded-xl px-3 py-3 text-prompty-muted transition hover:bg-prompty-elevated hover:text-white"><span>♙</span>Favorite people</a>
          <a href="#recent" className="flex items-center gap-3 rounded-xl px-3 py-3 text-prompty-muted transition hover:bg-prompty-elevated hover:text-white"><span>◷</span>Recent prompts</a>
        </nav>
        <p className="mt-auto border-t border-prompty-border px-2 pt-4 text-[10px] leading-relaxed text-prompty-muted">Private prompt studio<br />Image and video scenes</p>
      </aside>
      <div className="space-y-6 px-4 py-5 sm:px-6 lg:px-7">
      <header id="create" className="flex flex-col gap-4 py-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-prompty-accent2">
            Command studio
          </p>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            What do you want to create?
          </h1>
          <p className="mt-1 text-xs text-prompty-muted">
            Start with the essentials. Open details only when you need them.
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

      <label className="block rounded-2xl border border-prompty-border bg-prompty-surface p-4 shadow-glow-sm">
        <FieldLabel>Describe the action in your own words</FieldLabel>
        <div className="flex items-center gap-3">
          <span className="text-prompty-accent2">✦</span>
          {under21 ? (
            <span className="text-sm text-prompty-muted">Minor-safe mode is active. Choose a reviewed action below.</span>
          ) : (
            <input
              value={form.customActionPrompt}
              onChange={(e) => patch({ customActionPrompt: e.target.value, useCustomActionPrompt: Boolean(e.target.value.trim()) })}
              placeholder="e.g. A couple embracing in a quiet bedroom"
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-prompty-muted/50"
            />
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-lg border border-prompty-accent2/30 bg-prompty-accent2/10 px-2.5 py-1 text-[10px] font-medium capitalize text-prompty-accent2">{form.mode}</span>
          <span className="rounded-lg border border-prompty-border bg-prompty-elevated px-2.5 py-1 text-[10px] text-prompty-muted">{form.peopleCount === "group" ? "Group" : `${form.peopleCount} people`}</span>
          <span className="rounded-lg border border-prompty-border bg-prompty-elevated px-2.5 py-1 text-[10px] text-prompty-muted">{PLACES.find((p) => p.id === form.placeId)?.label}</span>
          <span className="rounded-lg border border-prompty-border bg-prompty-elevated px-2.5 py-1 text-[10px] text-prompty-muted">{form.aspectRatio}</span>
        </div>
      </label>

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          {under21 ? (
            <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
              Minor-safe mode: ages 10–18 use reviewed Everyday, Social, and Physical/Play actions with age-appropriate styling only.
            </p>
          ) : null}

          <Section
            step={1}
            title="Action"
            hint="Choose a preset, or type directly in the command box above"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <SoftSelect
                label="Category"
                options={visibleCategories.map((c) => ({ id: c.id, label: c.label }))}
                value={form.actionCategory}
                onChange={(id) => {
                  const first = ACTIONS.find((action) => action.category === id);
                  patch({ actionCategory: id as ActionCategoryId, ...(first ? { actionId: first.id } : {}) });
                }}
              />
              <SoftSelect
                label="Place"
                value={form.placeId}
                options={PLACES.map((place) => ({ id: place.id, label: place.label }))}
                onChange={(id) => patch({ placeId: id })}
              />
              <SoftSelect
                label="Lighting"
                value={form.timeOfDay}
                options={TIMES_OF_DAY.map((time) => ({ id: time.id, label: time.label }))}
                onChange={(id) => patch({ timeOfDay: id as SceneFormState["timeOfDay"] })}
              />
            </div>
            <div>
              <div className="mb-2 flex items-end justify-between gap-3">
                <label className="block flex-1">
                  <FieldLabel>Find an action preset</FieldLabel>
                  <input
                    type="search"
                    value={actionQuery}
                    onChange={(e) => setActionQuery(e.target.value)}
                    placeholder="Search this category…"
                    className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent placeholder:text-prompty-muted/50 focus:ring-2"
                  />
                </label>
                <span className="pb-2 text-[10px] text-prompty-muted">{filteredActions.length} options</span>
              </div>
              <div className="max-h-60 space-y-1 overflow-y-auto rounded-xl border border-prompty-border bg-prompty-bg/50 p-2">
                {filteredActions.length ? filteredActions.map((action) => {
                  const active = form.actionId === action.id && !form.useCustomActionPrompt;
                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => patch({ actionId: action.id, useCustomActionPrompt: false })}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${active ? "bg-prompty-accent/25 text-white" : "text-prompty-muted hover:bg-prompty-elevated hover:text-white"}`}
                    >
                      <span className={`h-2 w-2 shrink-0 rounded-full ${active ? "bg-prompty-accent2 shadow-[0_0_10px_rgba(100,207,197,.7)]" : "bg-prompty-border"}`} />
                      <span className="flex-1">{action.label}</span>
                      {active ? <span className="text-[10px] font-semibold uppercase tracking-wider text-prompty-accent2">Current</span> : null}
                    </button>
                  );
                }) : <p className="p-3 text-xs text-prompty-muted">No matching actions.</p>}
              </div>
            </div>
            {!under21 ? <div>
              <button
                type="button"
                aria-pressed={form.useCustomActionPrompt}
                onClick={() => patch({ useCustomActionPrompt: !form.useCustomActionPrompt })}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${form.useCustomActionPrompt ? "border-prompty-accent2/50 bg-prompty-accent2/15 text-white" : "border-prompty-border bg-prompty-bg text-prompty-muted hover:text-white"}`}
              >
                + Custom action
              </button>
              {form.useCustomActionPrompt ? (
                <label className="mt-3 block">
                  <FieldLabel>Custom action prompt</FieldLabel>
                  <textarea
                    value={form.customActionPrompt}
                    onChange={(e) => patch({ customActionPrompt: e.target.value })}
                    rows={3}
                    autoFocus
                    placeholder="Describe exactly what should happen instead of using the selected preset…"
                    className="w-full rounded-xl border border-prompty-accent2/35 bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent2 placeholder:text-prompty-muted/50 focus:ring-2"
                  />
                </label>
              ) : null}
            </div> : null}
            {form.useCustomActionPrompt && form.customActionPrompt.trim() ? (
              <div className="flex items-center justify-between rounded-xl border border-prompty-accent2/25 bg-prompty-accent2/10 px-3 py-2 text-xs text-prompty-accent2">
                <span>Custom action is overriding the preset</span>
                <button type="button" onClick={() => patch({ useCustomActionPrompt: false, customActionPrompt: "" })} className="font-semibold hover:text-white">Use preset</button>
              </div>
            ) : null}
          </Section>

          <div id="people">
          <Section
            step={2}
            title="Favorite cast"
            hint="Pick saved people from each dropdown; edit details only when needed"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {form.actionCategory === "five-couples-games" ? (
                <label className="block">
                  <FieldLabel>People count</FieldLabel>
                  <div className="rounded-xl border border-prompty-accent2/30 bg-prompty-accent2/10 px-3 py-2.5 text-sm text-white">10 people · 5 couples</div>
                </label>
              ) : (
                <SoftSelect
                  label="People count"
                  value={form.peopleCount}
                  options={PEOPLE_COUNTS.map((p) => ({ id: p.id, label: p.label }))}
                  onChange={(id) => patch({ peopleCount: id as PeopleCount })}
                />
              )}
              {form.peopleCount !== "1" ? (
                <SoftSelect
                  label="Relationship"
                  value={form.relationship}
                  options={RELATIONSHIPS.filter((r) => !under21 || ["friends", "siblings", "colleagues", "parent-child"].includes(r.id)).map((r) => ({
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
                {form.actionCategory === "five-couples-games" ? (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-prompty-accent2/25 bg-prompty-accent2/10 px-3 py-2 text-xs text-prompty-accent2">
                      Enter all five couples separately. Each person can also be loaded from or saved to favorites.
                    </div>
                    {Array.from({ length: 5 }, (_, coupleIndex) => (
                      <section key={coupleIndex} className="rounded-2xl border border-prompty-border bg-prompty-bg/35 p-3">
                        <h4 className="mb-3 text-sm font-semibold text-white">Couple {coupleIndex + 1}</h4>
                        <div className="grid gap-3 xl:grid-cols-2">
                          {[coupleIndex * 2, coupleIndex * 2 + 1].map((personIndex) => {
                            const person = (form.groupPeople ?? [])[personIndex];
                            if (!person) return null;
                            return (
                              <PersonCard
                                key={personIndex}
                                index={personIndex}
                                person={person}
                                regionIds={form.regionIds}
                                favoritePeople={favoritePeople}
                                onSelectFavorite={(favorite) => {
                                  const groupPeople = [...(form.groupPeople ?? [])];
                                  groupPeople[personIndex] = { ...favorite.person };
                                  patch({ groupPeople });
                                  setEditingFavoriteIds((ids) => ({ ...ids, [personIndex]: favorite.id }));
                                }}
                                onSaveFavorite={() => saveGroupPersonAsFavorite(person, personIndex)}
                                saveLabel={editingFavoriteIds[personIndex] ? "Update favorite" : "Save favorite"}
                                allowUnder19={false}
                                onChange={(updated) => {
                                  const groupPeople = [...(form.groupPeople ?? [])];
                                  groupPeople[personIndex] = updated;
                                  patch({ groupPeople });
                                }}
                              />
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : <>
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
                </>}
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
                        people[i] = { ...favorite.person };
                        setEditingFavoriteIds((ids) => ({ ...ids, [i]: favorite.id }));
                        patch({ people });
                      }}
                      onSaveFavorite={() => savePersonAsFavorite(person, i)}
                      saveLabel={editingFavoriteIds[i] ? "Update favorite" : "Save favorite"}
                      allowUnder19={["everyday", "social", "physical"].includes(form.actionCategory)}
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
                        <div key={favorite.id} className="flex items-center gap-1 rounded-lg border border-prompty-border bg-prompty-bg p-1 pl-2.5 text-xs">
                          <span className="mr-1 text-white">{favorite.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const people = [...form.people];
                              people[0] = { ...favorite.person };
                              patch({ peopleCount: form.peopleCount === "group" ? "1" : form.peopleCount, people });
                              setEditingFavoriteIds((ids) => ({ ...ids, 0: favorite.id }));
                            }}
                            className="rounded-md px-2 py-1 text-prompty-accent2 hover:bg-prompty-elevated hover:text-white"
                          >Edit</button>
                          <button
                            type="button"
                            onClick={() => {
                              setFavoritePeople(deleteFavoritePerson(favorite.id));
                              setEditingFavoriteIds((ids) => Object.fromEntries(Object.entries(ids).filter(([, id]) => id !== favorite.id)));
                            }}
                            className="rounded-md px-2 py-1 text-prompty-muted hover:bg-red-500/10 hover:text-red-200"
                          >Delete</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </Section>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced((value) => !value)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-prompty-border bg-prompty-surface/40 px-4 py-3 text-xs font-medium text-prompty-muted transition hover:border-prompty-accent2/40 hover:text-white"
          >
            <span>⚙</span>{showAdvanced ? "Hide advanced controls" : "Advanced controls · place, camera, framing & notes"}
          </button>

          {showAdvanced ? <>
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
          </Section>
          </> : null}
        </div>

        <aside className="space-y-4 lg:col-span-5 lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-2xl border border-prompty-border bg-prompty-surface/80 p-4 shadow-glow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-white">Live prompts</h3>
              <button type="button" onClick={changeFacesOnly} className="rounded-lg border border-prompty-border px-2.5 py-1.5 text-xs text-prompty-muted transition hover:border-prompty-accent2/40 hover:text-white">Change faces</button>
            </div>
            <div className="space-y-3">
              <OutputCard title="Short" text={prompts.short} />
              <OutputCard title="Detailed" text={prompts.detailed} />
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
                onClick={randomizeAll}
                className="rounded-xl border border-prompty-border px-4 py-2.5 text-sm text-prompty-muted hover:text-white"
              >
                Randomize
              </button>
            </div>
          </div>
        </aside>
      </div>

      <div id="recent">
        <RecentList
          items={recent}
          onClear={() => {
            clearRecent();
            setRecent([]);
          }}
          onReuse={(item) => patch({ mode: item.mode })}
        />
      </div>
      </div>
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
