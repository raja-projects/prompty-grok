"use client";

import {
  AGES,
  BODY_TYPES,
  FASHION_VIBES,
  GENDERS,
  HAIR_BY_GENDER,
  HAIR_COLORS,
  SKIN_TONES,
  dressesFor,
  defaultDressId,
  type PersonFields,
  type Gender,
} from "@/lib/people";
import {
  defaultFaceCutId,
  faceCutsFor,
} from "@/lib/face-cuts";

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-prompty-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent focus:ring-2"
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
  onChange,
}: {
  index: number;
  person: PersonFields;
  onChange: (p: PersonFields) => void;
}) {
  function patch(partial: Partial<PersonFields>) {
    const next = { ...person, ...partial };
    if (partial.gender && partial.gender !== person.gender) {
      const g = partial.gender as Gender;
      const hairs = HAIR_BY_GENDER[g];
      next.dressId = defaultDressId(g);
      if (!hairs.includes(next.hairStyle)) next.hairStyle = hairs[0]!;
      const cuts = faceCutsFor(g);
      if (!cuts.some((c) => c.id === next.faceCutId)) {
        next.faceCutId = defaultFaceCutId(g);
      }
    }
    onChange(next);
  }

  return (
    <div className="rounded-2xl border border-prompty-border bg-prompty-bg/60 p-4">
      <h4 className="mb-3 text-sm font-semibold text-white">
        Person {index + 1}
      </h4>
      <div className="grid gap-3 sm:grid-cols-2">
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
        <label className="block space-y-1 sm:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-prompty-muted">
            Face cut
          </span>
          <select
            value={person.faceCutId}
            onChange={(e) => patch({ faceCutId: e.target.value })}
            className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent focus:ring-2"
          >
            {faceCutsFor(person.gender).map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
        <SelectField
          label="Age (exact year, 21+)"
          value={person.age}
          options={AGES}
          onChange={(v) => patch({ age: v })}
        />
        <label className="block space-y-1 sm:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-prompty-muted">
            Dress / attire
          </span>
          <select
            value={person.dressId}
            onChange={(e) => patch({ dressId: e.target.value })}
            className="w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent focus:ring-2"
          >
            {dressesFor(person.gender).map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <SelectField
          label="Hair style"
          value={person.hairStyle}
          options={HAIR_BY_GENDER[person.gender]}
          onChange={(v) => patch({ hairStyle: v })}
        />
        <SelectField
          label="Hair color"
          value={person.hairColor}
          options={HAIR_COLORS}
          onChange={(v) => patch({ hairColor: v })}
        />
        <SelectField
          label="Body type"
          value={person.bodyType}
          options={BODY_TYPES}
          onChange={(v) => patch({ bodyType: v })}
        />
        <SelectField
          label="Fashion vibe"
          value={person.fashionVibe}
          options={FASHION_VIBES}
          onChange={(v) => patch({ fashionVibe: v })}
        />
        <SelectField
          label="Skin tone"
          value={person.skinTone}
          options={SKIN_TONES}
          onChange={(v) => patch({ skinTone: v })}
        />
      </div>
    </div>
  );
}
