"use client";

import { useState } from "react";

import {
  AGES,
  bodyTypesForAge,
  FASHION_VIBES,
  GENDERS,
  HAIR_BY_GENDER,
  hairColorsForRegions,
  skinTonesForRegions,
  dressesFor,
  defaultDressId,
  type PersonFields,
  type Gender,
} from "@/lib/people";
import {
  applyKnownFaceLocks,
  defaultFaceCutId,
  faceCutsForAge,
  isKnownFaceId,
} from "@/lib/face-cuts";
import type { FavoritePerson } from "@/lib/types";

function SelectField({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-prompty-muted">
        {label}
        {disabled ? " (locked)" : ""}
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent focus:ring-2 ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function PersonCard({
  index,
  person,
  regionIds,
  onChange,
  favoritePeople,
  onSelectFavorite,
  onSaveFavorite,
}: {
  index: number;
  person: PersonFields;
  regionIds: string[];
  onChange: (p: PersonFields) => void;
  favoritePeople: FavoritePerson[];
  onSelectFavorite: (person: PersonFields) => void;
  onSaveFavorite: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isWoman = person.gender === "woman";
  const pool: "general" | "known" =
    isWoman && (person.faceCutPool === "known" || isKnownFaceId(person.faceCutId))
      ? "known"
      : "general";
  const knownLocked = isWoman && pool === "known";
  const display = knownLocked ? applyKnownFaceLocks(person) : person;

  const skinOpts = skinTonesForRegions(regionIds);
  const hairOpts = hairColorsForRegions(regionIds);
  const faceOpts = faceCutsForAge(display.gender, display.age, regionIds, pool);
  const hairStyles = HAIR_BY_GENDER[display.gender];
  const bodies = bodyTypesForAge(display.gender, display.age);

  function commit(next: PersonFields) {
    if (next.gender !== "woman") {
      onChange({ ...next, faceCutPool: "general" });
      return;
    }
    const p = next.faceCutPool === "known" ? applyKnownFaceLocks(next) : next;
    onChange(p);
  }

  function patch(partial: Partial<PersonFields>) {
    let next: PersonFields = { ...person, ...partial };

    if (partial.gender && partial.gender !== person.gender) {
      const g = partial.gender as Gender;
      const hairs = HAIR_BY_GENDER[g];
      next.dressId = defaultDressId(g);
      if (!hairs.includes(next.hairStyle)) next.hairStyle = hairs[0]!;
      next.faceCutPool = g === "woman" ? (next.faceCutPool ?? "general") : "general";
      const poolNext = g === "woman" ? (next.faceCutPool ?? "general") : "general";
      const bodiesNext = bodyTypesForAge(g, next.age);
      if (!bodiesNext.includes(next.bodyType)) next.bodyType = bodiesNext[0]!;
      const cuts = faceCutsForAge(g, next.age, regionIds, poolNext);
      if (!cuts.some((c) => c.id === next.faceCutId)) {
        next.faceCutId = defaultFaceCutId(g, next.age, regionIds, poolNext);
      }
    }

    if (partial.faceCutPool) {
      const poolNext = next.gender === "woman" ? partial.faceCutPool : "general";
      next.faceCutPool = poolNext;
      next.faceCutId = defaultFaceCutId(next.gender, next.age, regionIds, poolNext);
    }

    if (partial.faceCutId && next.faceCutPool === "known") {
      next = applyKnownFaceLocks({ ...next, faceCutId: partial.faceCutId });
    }

    if (partial.age && partial.age !== person.age && next.faceCutPool !== "known") {
      const bodiesNext = bodyTypesForAge(next.gender, next.age);
      if (!bodiesNext.includes(next.bodyType)) next.bodyType = bodiesNext[0]!;
      const cuts = faceCutsForAge(next.gender, next.age, regionIds, next.faceCutPool ?? "general");
      if (!cuts.some((c) => c.id === next.faceCutId)) {
        next.faceCutId = defaultFaceCutId(
          next.gender,
          next.age,
          regionIds,
          next.faceCutPool ?? "general",
        );
      }
    }

    // Known mode: ignore manual edits to locked fields
    if (next.gender === "woman" && next.faceCutPool === "known") {
      next = applyKnownFaceLocks(next);
    }

    commit(next);
  }

  return (
    <div className="rounded-2xl border border-prompty-border bg-prompty-bg/60 p-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <label className="min-w-48 flex-1">
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-prompty-muted">
            Person {index + 1} · choose favorite
          </span>
          <select
            value=""
            onChange={(e) => {
              const favorite = favoritePeople.find((item) => item.id === e.target.value);
              if (favorite) onSelectFavorite({ ...favorite.person });
            }}
            className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent focus:ring-2"
          >
            <option value="">Current person</option>
            {favoritePeople.map((favorite) => (
              <option key={favorite.id} value={favorite.id}>{favorite.name}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={onSaveFavorite}
          className="rounded-xl border border-prompty-border px-3 py-2 text-xs font-medium text-prompty-muted hover:text-white"
        >
          Save favorite
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-prompty-elevated/60 px-3 py-2 text-xs text-prompty-muted">
        <span>{display.gender} · {display.age} · {display.bodyType} · {display.hairStyle}</span>
        <button type="button" onClick={() => setExpanded((value) => !value)} className="font-medium text-prompty-accent2 hover:text-white">
          {expanded ? "Close details" : "Edit details"}
        </button>
      </div>
      {expanded ? <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1 sm:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-prompty-muted">
            Gender
          </span>
          <div className="flex flex-wrap gap-2">
            {GENDERS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => patch({ gender: g.id })}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  person.gender === g.id
                    ? "border-prompty-accent bg-prompty-accent/25 text-white"
                    : "border-prompty-border bg-prompty-elevated text-prompty-muted hover:text-white"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </label>

        {isWoman ? (
          <label className="block space-y-1 sm:col-span-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-prompty-muted">
              Face source
            </span>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "general" as const, label: "Random" },
                  { id: "known" as const, label: "Known" },
                ]
              ).map((opt) => {
                const active = pool === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => patch({ faceCutPool: opt.id })}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      active
                        ? "border-prompty-accent2 bg-prompty-accent2/25 text-white"
                        : "border-prompty-border bg-prompty-elevated text-prompty-muted hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-prompty-muted">
              Known locks face, age, hair, skin, and body to that look (name in UI only).
            </p>
          </label>
        ) : null}

        <label className="block space-y-1 sm:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-prompty-muted">
            Face cut {pool === "known" ? "(known looks)" : "(random library)"}
          </span>
          <select
            value={
              faceOpts.some((f) => f.id === display.faceCutId)
                ? display.faceCutId
                : (faceOpts[0]?.id ?? "")
            }
            onChange={(e) => patch({ faceCutId: e.target.value })}
            className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent focus:ring-2"
          >
            {faceOpts.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <SelectField
          label="Age (exact year)"
          value={display.age}
          options={AGES}
          disabled={knownLocked}
          onChange={(v) => patch({ age: v })}
        />
        <label className="block space-y-1 sm:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-prompty-muted">
            Dress / attire
          </span>
          <select
            value={display.dressId}
            onChange={(e) => patch({ dressId: e.target.value })}
            className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent focus:ring-2"
          >
            {dressesFor(display.gender).map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <SelectField
          label="Hair style"
          value={
            hairStyles.includes(display.hairStyle)
              ? display.hairStyle
              : hairStyles[0]!
          }
          options={hairStyles}
          disabled={knownLocked}
          onChange={(v) => patch({ hairStyle: v })}
        />
        <SelectField
          label="Hair color"
          value={
            hairOpts.includes(display.hairColor) ? display.hairColor : hairOpts[0]!
          }
          options={hairOpts}
          disabled={knownLocked}
          onChange={(v) => patch({ hairColor: v })}
        />
        <SelectField
          label="Body type"
          value={bodies.includes(display.bodyType) ? display.bodyType : bodies[0]!}
          options={bodies}
          disabled={knownLocked}
          onChange={(v) => patch({ bodyType: v })}
        />
        <SelectField
          label="Fashion vibe"
          value={display.fashionVibe}
          options={FASHION_VIBES}
          onChange={(v) => patch({ fashionVibe: v })}
        />
        <SelectField
          label="Skin tone"
          value={
            skinOpts.includes(display.skinTone) ? display.skinTone : skinOpts[0]!
          }
          options={skinOpts}
          disabled={knownLocked}
          onChange={(v) => patch({ skinTone: v })}
        />
      </div> : null}
    </div>
  );
}
