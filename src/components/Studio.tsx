"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  assemblePrompt,
  type Assembled,
} from "@/lib/assemble";
import {
  CONTACT,
  CONTACT_TAGS,
  type ContactAction,
} from "@/lib/contacts";
import {
  POSE_CAMERA,
  CAMERA_ANGLES,
  FRAMINGS,
  type PoseTag,
} from "@/lib/camera";
import {
  TOUCH,
  type TouchKey,
} from "@/lib/touches";
import { femaleDresses } from "@/lib/wardrobe";
import {
  DEFAULTS,
  clampAge,
  clampMaleAge,
  loadSettings,
  saveSettings,
  MIX_LABEL,
  ETH_LABEL,
  COVER_LABEL,
  type Settings,
  type GenderMix,
  type Ethnicity,
  type Covering,
  type Room,
  type Ratio,
} from "@/lib/settings";

type ChipKey =
  | "cast"
  | "room"
  | "pose"
  | "contact"
  | "touch"
  | "wardrobe"
  | "camera";

const FREE: ChipKey[] = ["contact", "touch", "camera"];

const CHIP_LABEL: Record<ChipKey, string> = {
  cast: "Cast",
  room: "Room",
  pose: "Pose",
  contact: "Contact",
  touch: "Touch",
  wardrobe: "Wardrobe",
  camera: "Camera",
};

const ROOMS: Room[] = ["bedroom", "kitchen", "bathroom", "balcony"];
const RATIOS: Ratio[] = ["1:1", "4:5", "9:16"];
const MIXES = Object.keys(MIX_LABEL) as GenderMix[];
const COVERS = Object.keys(COVER_LABEL) as Covering[];

const human = (t: string) =>
  t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const POSES = (Object.keys(POSE_CAMERA) as PoseTag[]).filter(
  (p) => !CONTACT_TAGS.includes(p),
);

export function Studio() {
  const [s, setS] = useState<Settings>(DEFAULTS);
  const [pose, setPose] = useState<PoseTag | null>("lying-back");
  const [contact, setContact] = useState<ContactAction | null>("buttock-press");
  const [open, setOpen] = useState<ChipKey | null>("contact");
  const [over, setOver] = useState<Partial<Record<ChipKey, string>>>({});
  const [editing, setEditing] = useState<ChipKey | null>(null);
  const [locked, setLocked] = useState<Record<ChipKey, boolean>>({
    cast: true,
    room: true,
    pose: true,
    contact: false,
    touch: false,
    wardrobe: true,
    camera: false,
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => setS(loadSettings()), []);
  useEffect(() => saveSettings(s), [s]);

  const patch = useCallback(
    (fn: (prev: Settings) => Settings) => setS((prev) => fn(prev)),
    [],
  );

  const assembled: Assembled = useMemo(
    () => assemblePrompt(s, pose ?? undefined, contact ?? undefined, []),
    [s, pose, contact],
  );

  const overrideLine = useMemo(() => {
    const parts = Object.entries(over)
      .filter(([, v]) => v.trim())
      .map(([k, v]) => `${CHIP_LABEL[k as ChipKey]}: ${v.trim()}`);
    return parts.length ? ` Fixed for this shot — ${parts.join("; ")}.` : "";
  }, [over]);

  const prompt = assembled.prompt + overrideLine;

  const value = (k: ChipKey): string => {
    if (over[k]?.trim()) return over[k]!.trim();
    switch (k) {
      case "cast":
        return `${MIX_LABEL[s.genderMix]}, ${s.femaleAge} and ${s.maleAge}, ${ETH_LABEL[s.ethnicity]}`;
      case "room":
        return human(s.room);
      case "pose":
        return pose ? human(pose) : "none";
      case "contact":
        return contact ? CONTACT[contact].label : "none";
      case "touch":
        return s.touch ? TOUCH[s.touch as TouchKey]?.label ?? s.touch : "none";
      case "wardrobe":
        return (
          femaleDresses(s.femaleAge).find((d) => d.id === s.femaleDress)?.label ??
          s.femaleDress
        );
      case "camera":
        return s.camera === "manual" ? s.cameraOverride || "manual" : "auto";
    }
  };

  const optionsFor = (k: ChipKey): { id: string; label: string }[] => {
    switch (k) {
      case "cast":
        return MIXES.map((m) => ({ id: m, label: MIX_LABEL[m] }));
      case "room":
        return ROOMS.map((r) => ({ id: r, label: human(r) }));
      case "pose":
        return POSES.map((p) => ({ id: p, label: human(p) }));
      case "contact":
        return (Object.keys(CONTACT) as ContactAction[]).map((c) => ({
          id: c,
          label: CONTACT[c].label,
        }));
      case "touch":
        return (Object.keys(TOUCH) as TouchKey[]).map((t) => ({
          id: t,
          label: TOUCH[t].label,
        }));
      case "wardrobe":
        return femaleDresses(s.femaleAge).map((d) => ({
          id: d.id,
          label: d.label,
        }));
      case "camera":
        return [
          { id: "auto", label: "Auto (from pose)" },
          ...CAMERA_ANGLES.map((a) => ({ id: `a:${a.id}`, label: a.label })),
        ];
    }
  };

  const choose = (k: ChipKey, id: string) => {
    setOver((o) => ({ ...o, [k]: undefined }));
    if (k === "cast") patch((p) => ({ ...p, genderMix: id as GenderMix }));
    else if (k === "room") patch((p) => ({ ...p, room: id as Room }));
    else if (k === "pose") setPose(id as PoseTag);
    else if (k === "contact") setContact(id as ContactAction);
    else if (k === "touch") patch((p) => ({ ...p, touch: id }));
    else if (k === "wardrobe") patch((p) => ({ ...p, femaleDress: id }));
    else if (k === "camera") {
      if (id === "auto") patch((p) => ({ ...p, camera: "auto", cameraOverride: "" }));
      else {
        const angle = id.slice(2);
        const f = FRAMINGS.find((x) => x.id === "half-body")!;
        patch((p) => ({
          ...p,
          camera: "manual",
          cameraOverride: `${CAMERA_ANGLES.find((a) => a.id === angle)?.prompt ?? ""}, ${f.prompt}`,
        }));
      }
    }
    setOpen(null);
  };

  const shuffle = () => {
    const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)]!;
    (Object.keys(CHIP_LABEL) as ChipKey[]).forEach((k) => {
      if (locked[k] || over[k]?.trim()) return;
      const opts = optionsFor(k);
      if (opts.length) choose(k, pick(opts).id);
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-3 px-4 py-6 text-prompty-ink">
      <header className="flex items-baseline justify-between">
        <h1 className="text-[15px] font-semibold">Shot</h1>
        <div className="flex gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => setSettingsOpen((v) => !v)}
            className="rounded-full border border-prompty-line px-2.5 py-1 text-prompty-muted"
          >
            settings
          </button>
          <button
            type="button"
            onClick={shuffle}
            className="rounded-full border border-prompty-line px-2.5 py-1 text-prompty-muted"
          >
            shuffle free
          </button>
        </div>
      </header>

      {settingsOpen ? (
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-prompty-line bg-white p-3 text-[11px]">
          <label className="flex flex-col gap-1">
            Her age
            <input
              type="number"
              value={s.femaleAge}
              onChange={(e) =>
                patch((p) => ({ ...p, femaleAge: clampAge(+e.target.value) }))
              }
              className="rounded border border-prompty-line px-2 py-1"
            />
          </label>
          <label className="flex flex-col gap-1">
            His age
            <input
              type="number"
              value={s.maleAge}
              onChange={(e) =>
                patch((p) => ({ ...p, maleAge: clampMaleAge(+e.target.value) }))
              }
              className="rounded border border-prompty-line px-2 py-1"
            />
          </label>
          <label className="flex flex-col gap-1">
            Ethnicity
            <select
              value={s.ethnicity}
              onChange={(e) =>
                patch((p) => ({ ...p, ethnicity: e.target.value as Ethnicity }))
              }
              className="rounded border border-prompty-line px-2 py-1"
            >
              {(Object.keys(ETH_LABEL) as Ethnicity[]).map((e) => (
                <option key={e} value={e}>
                  {ETH_LABEL[e]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            Ratio
            <select
              value={s.ratio}
              onChange={(e) =>
                patch((p) => ({ ...p, ratio: e.target.value as Ratio }))
              }
              className="rounded border border-prompty-line px-2 py-1"
            >
              {RATIOS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            Cover
            <select
              value={s.covering}
              onChange={(e) =>
                patch((p) => ({ ...p, covering: e.target.value as Covering }))
              }
              className="rounded border border-prompty-line px-2 py-1"
            >
              {COVERS.map((c) => (
                <option key={c} value={c}>
                  {COVER_LABEL[c]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 pt-4">
            <input
              type="checkbox"
              checked={s.expressions}
              onChange={(e) =>
                patch((p) => ({ ...p, expressions: e.target.checked }))
              }
            />
            face reactions
          </label>
        </div>
      ) : null}

      <div className="divide-y divide-prompty-line rounded-xl border border-prompty-line bg-white">
        {(Object.keys(CHIP_LABEL) as ChipKey[]).map((k) => {
          const isOpen = open === k;
          const edited = !!over[k]?.trim();
          return (
            <div key={k}>
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="w-[68px] shrink-0 text-[11px] text-prompty-muted">
                  {CHIP_LABEL[k]}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : k)}
                  className={`min-w-0 flex-1 truncate rounded-md border px-2 py-1 text-left text-[12px] ${
                    edited
                      ? "border-prompty-ink border-dashed"
                      : isOpen
                        ? "border-prompty-ink"
                        : "border-prompty-line"
                  }`}
                >
                  {value(k)}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditing(editing === k ? null : k)
                  }
                  className="w-5 text-center text-[11px] text-prompty-muted"
                  title="override"
                >
                  {edited ? "↺" : "✎"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLocked((l) => ({ ...l, [k]: !l[k] }))
                  }
                  className={`w-10 text-right text-[10px] ${
                    locked[k] ? "text-prompty-ink" : "text-prompty-muted"
                  }`}
                >
                  {locked[k] ? "locked" : "free"}
                </button>
              </div>

              {editing === k ? (
                <div className="px-3 pb-2">
                  <input
                    autoFocus
                    defaultValue={over[k] ?? ""}
                    placeholder={value(k)}
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      setOver((o) => ({ ...o, [k]: v || undefined }));
                      if (v) setLocked((l) => ({ ...l, [k]: true }));
                      setEditing(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                    }}
                    className="w-full rounded border border-prompty-ink px-2 py-1 text-[12px]"
                  />
                </div>
              ) : null}

              {isOpen ? (
                <div className="max-h-[190px] overflow-y-auto border-t border-prompty-line px-3 py-2">
                  <div className="flex flex-wrap gap-1.5">
                    {optionsFor(k).map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => choose(k, o.id)}
                        className="rounded-full border border-prompty-line px-2 py-1 text-[11px] hover:border-prompty-ink"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-prompty-line bg-white p-3">
        <div className="mb-1 flex items-center justify-between text-[10px] text-prompty-muted">
          <span>prompt</span>
          <button type="button" onClick={copy} className="text-prompty-ink">
            copy
          </button>
        </div>
        <p className="text-[11px] leading-relaxed">{prompt}</p>
        <details className="mt-2">
          <summary className="cursor-pointer text-[10px] text-prompty-muted">
            negative
          </summary>
          <p className="mt-1 text-[11px] text-prompty-muted">
            {assembled.negative}
          </p>
        </details>
      </div>
    </div>
  );
}