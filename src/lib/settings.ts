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
  bodyNote: string;
  room: Room;
  surface: Surface;
  light: Light;
  noDim: boolean;
  femaleDress: string;
  maleDress: string;
  femaleHair: string;
  maleHair: string;
  covering: Covering;
  camera: "auto" | "manual";
  cameraOverride: string;
  ratio: Ratio;
  length: "short" | "normal";
  mode: Mode;
  touch: string;
  expressions: boolean;
  femaleColour: string;
  maleColour: string;
}

export type LockKey = "noDim" | "ethnicity" | "light";

export const DEFAULTS: Settings = {
  genderMix: "mf",
  ethnicity: "tamil",
  femaleAge: 19,
  maleAge: 25,
  
  bodyNote: "",
  room: "bedroom",
  surface: "bed",
  light: "window",
  noDim: true,
  femaleDress: "cotton-saree",
  maleDress: "shirt-jeans",
  femaleHair: "loose",
  maleHair: "side-part",
  covering: "pallu-hip",
  camera: "auto",
  cameraOverride: "",
  ratio: "1:1",
  length: "normal",
  mode: "A",
  touch: "",
  expressions: true,
  femaleColour: "",
  maleColour: "",
};

export const LOCKS: LockKey[] = ["ethnicity", "noDim"];

export const STORAGE_KEY = "pg_settings_v1";
export const PRESET_KEY = "pg_presets_v1";

export const FEMALE_AGE_MIN = 10;
export const FEMALE_AGE_MAX = 30;

export function clampAge(v: number): number {
  if (Number.isNaN(v)) return DEFAULTS.femaleAge;
  return Math.min(FEMALE_AGE_MAX, Math.max(FEMALE_AGE_MIN, Math.round(v)));
}

export function clampMaleAge(v: number): number {
  if (Number.isNaN(v)) return DEFAULTS.maleAge;
  return Math.min(70, Math.max(10, Math.round(v)));
}

export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      ...DEFAULTS,
      ...parsed,
      femaleAge: clampAge(parsed.femaleAge ?? DEFAULTS.femaleAge),
      maleAge: clampMaleAge(parsed.maleAge ?? DEFAULTS.maleAge),
    };
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

export const COLOURS = [
  "deep ruby red", "royal blue", "emerald green", "midnight black", "ivory white",
  "champagne gold", "silver grey", "burgundy wine", "coral pink", "peach",
  "mint teal", "lavender purple", "mustard yellow", "olive green", "navy blue",
  "blush pink", "cream beige", "chocolate brown", "rose gold", "turquoise",
  "deep magenta", "sunset orange", "pastel lilac",
] as const;

export const NEGATIVE =
  "no gloss, no wax skin, no floating bodies, no extra limbs, no extra hands, no orphan hands, each hand on its own arm, no reversed body, no twisted neck, no merged fabric, no impossible drape";

/** Realism floor. Rooms and cloth have to look used, not styled. */
export const REALISM =
  "real skin with pores, fine uneven tone, faint shine, stray hairs; real fabric weave, wrinkles, slight wear";

/** Strips every face sentence, for when reactions are switched off. */
export function stripExpressions(text: string): string {
  return text
    .replace(/\b(Her|His|Both)\b[^.!?]*?\b(face|expression|eyes|lips)\b[^.!?]*\.\s*/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Subject clause only — the frame assembler in step 3 does the rest. */
export function subjectLine(s: Settings): string {
  const who = MIX_LABEL[s.genderMix];
  const eth = ETH_LABEL[s.ethnicity];
  const woman =
    s.femaleAge < 19
      ? `a girl of ${s.femaleAge}`
      : `an adult woman of ${s.femaleAge}`;
  const ages =
    s.genderMix === "solo-f" || s.genderMix === "ff"
      ? woman
      : `${woman} and a man of ${s.maleAge}`;
  const hair =
    s.genderMix === "solo-f" || s.genderMix === "ff"
      ? "her long hair loose"
      : "her long hair loose, his hair short";
  return `${who}, ${eth}, ${ages}, ${hair}`;
}