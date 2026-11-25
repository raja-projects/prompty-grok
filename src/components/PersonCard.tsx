"use client";

import {
  AGES,
  bodyTypesForAge,
  FASHION_VIBES,
  GENDERS,
  HAIR_BY_GENDER,
  hairColorsForRegions,
  skinTonesForRegions,
  dressesForAge,
  defaultDressId,
  type PersonFields,
  type Gender,
} from "@/lib/people";

import {
  applyKnownFaceLocks,
  defaultFaceCutId,
  faceCutsForAge,
  getKnownFaceLock,
  isKnownFaceId,
} from "@/lib/face-cuts";
import type { FavoritePerson } from "@/lib/types";

const MINOR_HAIR_BY_GENDER: Record<Gender, string[]> = {
  woman: ["Long straight", "Long wavy", "Simple long braid", "Double long braids", "Low ponytail long", "High ponytail long"],
  man: ["Short neat", "Side part", "Wavy medium", "Curly", "Buzz cut"],
  nonbinary: ["Short textured", "Medium wavy", "Long loose", "Curly volume", "Neat bob", "Tied back"],
};
const MINOR_FASHION_VIBES = ["Everyday casual", "Festive traditional", "Urban street", "Monsoon cozy"];

const WOMAN_HAIR = [
  "Medium straight",
  "Medium wavy",
  "Medium layered",
  "Thick medium waves",
  "Long straight",
  "Long wavy",
  "Long layered",
  "Long soft curls",
  "Thick long waves",
  "Extra long straight",
  "Extra long wavy",
  "Hip length straight",
  "Hip length waves",
  "Extreme length straight",
  "Extreme length waves",
];

const fieldClass =
  "w-full rounded-lg border border-prompty-line bg-white px-2 py-1.5 text-[12px] text-prompty-ink outline-none transition focus:border-prompty-accent focus:ring-2 focus:ring-prompty-accent/20";

const fieldLabel = "mb-1 block text-[9px] font-semibold uppercase tracking-[0.1em] text-prompty-muted";

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
    <label className="block min-w-0">
      <span className={fieldLabel}>
        {label}
        {disabled ? " · locked" : ""}
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass} ${disabled ? "cursor-not-allowed bg-prompty-page opacity-60" : ""}`}
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

function Segmented({
  label,
  options,
  active,
  onPick,
}: {
  label: string;
  options: { id: string; label: string }[];
  active: string;
  onPick: (id: string) => void;
}) {
  return (
    <label className="block">
      <span className={fieldLabel}>{label}</span>
      <div className="flex gap-1">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o.id)}
            className={`flex-1 rounded-lg border px-1.5 py-1.5 text-[11px] font-medium transition ${
              active === o.id
                ? "border-prompty-accent bg-prompty-accentSoft text-prompty-accent"
                : "border-prompty-line bg-white text-prompty-muted hover:text-prompty-ink"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
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
  saveLabel = "Save",
  allowUnder19 = false,
}: {
  index: number;
  person: PersonFields;
  regionIds: string[];
  onChange: (p: PersonFields) => void;
  favoritePeople: FavoritePerson[];
  onSelectFavorite: (favorite: FavoritePerson) => void;
  onSaveFavorite: () => void;
  saveLabel?: string;
  allowUnder19?: boolean;
}) {
  const isMinor = Number(person.age) < 19;
  const pool: "general" | "known" =
    !isMinor && (person.faceCutPool === "known" || isKnownFaceId(person.faceCutId))
      ? "known"
      : "general";
  const knownLocked = pool === "known" && !!getKnownFaceLock(person.faceCutId);
  const display = knownLocked ? applyKnownFaceLocks(person) : person;

  const skinOpts = skinTonesForRegions(regionIds);
  const hairOpts = hairColorsForRegions(regionIds);
  const faceOpts = faceCutsForAge(display.gender, display.age, regionIds, pool);
  const hairStyles = display.gender === "woman" ? WOMAN_HAIR : HAIR_BY_GENDER[display.gender];
  const bodies = bodyTypesForAge(display.gender, display.age);

  function commit(next: PersonFields) {
    const p = next.faceCutPool === "known" ? applyKnownFaceLocks(next) : next;
    onChange(p);
  }
  function patch(partial: Partial<PersonFields>) {
    let next: PersonFields = { ...person, ...partial };

    if (Number(next.age) < 19) {
      next.faceCutPool = "general";
      const safeDresses = dressesForAge(next.gender, next.age);
      if (!safeDresses.some((dress) => dress.id === next.dressId)) next.dressId = safeDresses[0]!.id;
      const safeHair = MINOR_HAIR_BY_GENDER[next.gender];
      if (!safeHair.includes(next.hairStyle)) next.hairStyle = safeHair[0]!;
      next.fashionVibe = "Everyday casual";
    }

    if (partial.gender && partial.gender !== person.gender) {
      const g = partial.gender as Gender;
      const hairs = g === "woman" ? WOMAN_HAIR : HAIR_BY_GENDER[g];
      next.dressId = defaultDressId(g);
      if (!hairs.includes(next.hairStyle)) next.hairStyle = hairs[0]!;
      next.faceCutPool = next.faceCutPool ?? "general";
      const poolNext = next.faceCutPool;
      const bodiesNext = bodyTypesForAge(g, next.age);
      if (!bodiesNext.includes(next.bodyType)) next.bodyType = bodiesNext[0]!;
      const cuts = faceCutsForAge(g, next.age, regionIds, poolNext);
      if (!cuts.some((c) => c.id === next.faceCutId)) {
        next.faceCutId = defaultFaceCutId(g, next.age, regionIds, poolNext);
      }
    }

    if (partial.faceCutPool) {
      const poolNext = partial.faceCutPool;
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

    if (next.faceCutPool === "known") {
      next = applyKnownFaceLocks(next);
    }

    commit(next);
  }

  return (
    <div className="rounded-xl border border-prompty-line bg-prompty-page/70 p-2.5">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-prompty-ink text-[10px] font-bold text-white">
          {index + 1}
        </span>
        <span className="mr-auto truncate text-[11.5px] font-medium text-prompty-ink">
          {display.gender} · {display.age} · {display.bodyType}
        </span>
        <select
          value=""
          onChange={(e) => {
            const favorite = favoritePeople.find((item) => item.id === e.target.value);
            if (favorite) onSelectFavorite(favorite);
          }}
          className="max-w-[110px] rounded-md border border-prompty-line bg-white px-1.5 py-1 text-[10.5px] text-prompty-muted outline-none"
        >
          <option value="">Favorites</option>
          {favoritePeople.map((favorite) => (
            <option key={favorite.id} value={favorite.id}>
              {favorite.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onSaveFavorite}
          className="rounded-md border border-prompty-line bg-white px-1.5 py-1 text-[10.5px] text-prompty-muted transition hover:border-prompty-accent hover:text-prompty-accent"
        >
          {saveLabel}
        </button>
      </div>

      <div className="grid gap-1.5 sm:grid-cols-4">
        <Segmented
          label="Gender"
          active={person.gender}
          options={GENDERS.map((g) => ({ id: g.id, label: g.label }))}
          onPick={(id) => patch({ gender: id as Gender })}
        />

        {!isMinor ? (
          <Segmented
            label="Face source"
            active={pool}
            options={[
              { id: "general", label: "Random" },
              { id: "known", label: "Known" },
            ]}
            onPick={(id) => patch({ faceCutPool: id as "general" | "known" })}
          />
        ) : null}

        <SelectField
          label="Age"
          value={display.age}
          options={allowUnder19 ? AGES : AGES.filter((age) => Number(age) >= 19)}
          disabled={knownLocked}
          onChange={(v) => patch({ age: v })}
        />

        <SelectField
          label="Body"
          value={bodies.includes(display.bodyType) ? display.bodyType : bodies[0]!}
          options={bodies}
          disabled={knownLocked}
          onChange={(v) => patch({ bodyType: v })}
        />

        <label className="block sm:col-span-2">
          <span className={fieldLabel}>
            Face {pool === "known" ? "· known" : "· random"}
          </span>
          <select
            value={
              faceOpts.some((f) => f.id === display.faceCutId)
                ? display.faceCutId
                : (faceOpts[0]?.id ?? "")
            }
            onChange={(e) => patch({ faceCutId: e.target.value })}
            className={fieldClass}
          >
            {faceOpts.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className={fieldLabel}>Dress</span>
          <select
            value={display.dressId}
            onChange={(e) => patch({ dressId: e.target.value })}
            className={fieldClass}
          >
            {dressesForAge(display.gender, display.age).map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        <SelectField
          label="Hair"
          value={
            (isMinor ? MINOR_HAIR_BY_GENDER[display.gender] : hairStyles).includes(display.hairStyle)
              ? display.hairStyle
              : (isMinor ? MINOR_HAIR_BY_GENDER[display.gender] : hairStyles)[0]!
          }
          options={isMinor ? MINOR_HAIR_BY_GENDER[display.gender] : hairStyles}
          disabled={knownLocked}
          onChange={(v) => patch({ hairStyle: v })}
        />
        <SelectField
          label="Hair colour"
          value={hairOpts.includes(display.hairColor) ? display.hairColor : hairOpts[0]!}
          options={hairOpts}
          disabled={knownLocked}
          onChange={(v) => patch({ hairColor: v })}
        />
        <SelectField
          label="Skin"
          value={skinOpts.includes(display.skinTone) ? display.skinTone : skinOpts[0]!}
          options={skinOpts}
          disabled={knownLocked}
          onChange={(v) => patch({ skinTone: v })}
        />
        <SelectField
          label="Vibe"
          value={display.fashionVibe}
          options={isMinor ? MINOR_FASHION_VIBES : FASHION_VIBES}
          onChange={(v) => patch({ fashionVibe: v })}
        />
      </div>
    </div>
  );
}