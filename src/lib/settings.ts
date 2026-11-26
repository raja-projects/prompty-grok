export type GenderMix = "solo-f" | "mf" | "ff" | "mmf" | "ffm" | "mmmf" | "crowd";
export type Ethnicity = "kerala" | "tamil";
export type Room = "bedroom" | "kitchen" | "bathroom" | "balcony";
export type Surface = "bed" | "counter" | "wall" | "floor";
export type Light = "window" | "softbox" | "overcast";
export type Covering = "pallu-hip" | "saree-waist" | "bedsheet" | "none";
export type Garment = "saree" | "half-saree" | "churidar" | "kurta-skirt";
export type Ratio = "1:1" | "4:5" | "9:16";
export type Mode = "A" | "B";

export interface Settings {
  genderMix: GenderMix;
  ethnicity: Ethnicity;
  femaleAge: number;
  maleAge: number;
  femaleHairLong: boolean;
  maleHairShort: boolean;
  bodyNote: string;
  room: Room;
  surface: Surface;
  light: Light;
  noDim: boolean;
  femaleGarment: Garment;
  maleGarment: Garment;
  covering: Covering;
  camera: "auto" | "manual";
  cameraOverride: string;
  ratio: Ratio;
  length: "short" | "normal";
  mode: Mode;
}

export type LockKey =
  | "femaleHairLong"
  | "maleHairShort"
  | "noDim"
  | "ethnicity"
  | "light";

export const DEFAULTS: Settings = {
  genderMix: "mf",
  ethnicity: "tamil",
  femaleAge: 19,
  maleAge: 25,
  femaleHairLong: true,
  maleHairShort: true,
  bodyNote: "",
  room: "bedroom",
  surface: "bed",
  light: "window",
  noDim: true,
  femaleGarment: "saree",
  maleGarment: "saree",
  covering: "pallu-hip",
  camera: "auto",
  cameraOverride: "",
  ratio: "1:1",
  length: "normal",
  mode: "A",
};

export const LOCKS: LockKey[] = ["femaleHairLong", "maleHairShort", "noDim"];

export const STORAGE_KEY = "pg_settings_v1";
export const PRESET_KEY = "pg_presets_v1";

export const FEMALE_AGE_MIN = 19;
export const FEMALE_AGE_MAX = 30;

export function clampAge(v: number): number {
  if (Number.isNaN(v)) return DEFAULTS.femaleAge;
  return Math.min(FEMALE_AGE_MAX, Math.max(FEMALE_AGE_MIN, Math.round(v)));
}

export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return { ...DEFAULTS, ...parsed, femaleAge: clampAge(parsed.femaleAge ?? DEFAULTS.femaleAge) };
  } catch {
    return DEFAULTS;
  }
}

export function saveSettings(s: Settings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export function resetSettings(): Settings {
  if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  return DEFAULTS;
}

export function loadPresets(): Record<string, Settings> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(PRESET_KEY) || "{}");
  } catch {
    return {};
  }
}

export function savePreset(name: string, s: Settings): void {
  if (typeof window === "undefined") return;
  const all = loadPresets();
  all[name.trim().toLowerCase()] = s;
  localStorage.setItem(PRESET_KEY, JSON.stringify(all));
}

export function deletePreset(name: string): void {
  if (typeof window === "undefined") return;
  const all = loadPresets();
  delete all[name];
  localStorage.setItem(PRESET_KEY, JSON.stringify(all));
}

export const MIX_LABEL: Record<GenderMix, string> = {
  "solo-f": "one woman",
  mf: "a couple",
  ff: "two women",
  mmf: "two men and a woman",
  ffm: "two women and a man",
  mmmf: "three men and a woman",
  crowd: "a crowd",
};

export const ETH_LABEL: Record<Ethnicity, string> = {
  kerala: "Kerala",
  tamil: "Tamil",
};

export const LIGHT_LABEL: Record<Light, string> = {
  window: "bright window daylight, even",
  softbox: "large softbox, flat and bright",
  overcast: "bright overcast, evenly diffused",
};

export const COVER_LABEL: Record<Covering, string> = {
  "pallu-hip": "pallu across her hip",
  "saree-waist": "saree open at the waist",
  bedsheet: "bedsheet only",
  none: "no cover",
};

export const NEGATIVE =
  "no gloss, no wax skin, no floating bodies, no extra limbs, no merged fabric, no impossible drape";

/** Subject clause only — the frame assembler in step 3 does the rest. */
export function subjectLine(s: Settings): string {
  const who = MIX_LABEL[s.genderMix];
  const eth = ETH_LABEL[s.ethnicity];
  const ages =
    s.genderMix === "solo-f" || s.genderMix === "ff"
      ? `an adult woman of ${s.femaleAge}`
      : `an adult woman of ${s.femaleAge} and a man of ${s.maleAge}`;
  const hair =
    s.genderMix === "solo-f"
      ? "her long hair loose"
      : s.maleHairShort
        ? "her long hair loose, his hair short"
        : "her long hair loose";
  return `${who}, ${eth}, ${ages}, ${hair}`;
}