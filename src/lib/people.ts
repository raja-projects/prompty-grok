import {
  defaultFaceCutId,
  randomFaceCutId,
} from "./face-cuts";
import {
  defaultDressId,
  dressesFor,
  getDress,
} from "./dresses";

export type Gender = "woman" | "man" | "nonbinary";

/** Single adult age year (21+), not a range. */
export type Age = string;

export type PeopleCount = "1" | "2" | "3" | "4" | "group";

export type Relationship =
  | "strangers"
  | "friends"
  | "siblings"
  | "colleagues"
  | "couple"
  | "married"
  | "parent-child";

export interface RegionOption {
  id: string;
  label: string;
  /** Soft appearance / attire cues — tasteful, non-offensive */
  cues: string;
}

export interface PersonFields {
  gender: Gender;
  age: Age;
  dressId: string;
  hairStyle: string;
  bodyType: string;
  fashionVibe: string;
  hairColor: string;
  skinTone: string;
  faceCutId: string;
}

/** Individual ages for the picker — not ranges. */
export const AGES: Age[] = Array.from({ length: 35 }, (_, i) => String(21 + i));

/** @deprecated alias */
export const AGE_BANDS = AGES;

export const PEOPLE_COUNTS: { id: PeopleCount; label: string }[] = [
  { id: "1", label: "1 person" },
  { id: "2", label: "2 people" },
  { id: "3", label: "3 people" },
  { id: "4", label: "4 people" },
  { id: "group", label: "Group (5+)" },
];

export const RELATIONSHIPS: {
  id: Relationship;
  label: string;
  blocksIntimate: boolean;
}[] = [
  { id: "strangers", label: "Strangers", blocksIntimate: false },
  { id: "friends", label: "Friends", blocksIntimate: false },
  { id: "siblings", label: "Siblings", blocksIntimate: true },
  { id: "colleagues", label: "Colleagues", blocksIntimate: false },
  { id: "couple", label: "Couple", blocksIntimate: false },
  { id: "married", label: "Married", blocksIntimate: false },
  { id: "parent-child", label: "Parent–child", blocksIntimate: true },
];

export const REGIONS: RegionOption[] = [
  {
    id: "kerala",
    label: "Kerala / Malayali",
    cues: "South Indian Malayali features, soft coastal Indian look, optional kasavu or mundu accents",
  },
  {
    id: "tamil",
    label: "Tamil / Tamil Nadu",
    cues: "Tamil South Indian features, tasteful South Indian attire cues such as saree or veshti accents",
  },
  {
    id: "sri-lankan-tamil",
    label: "Sri Lankan Tamil",
    cues: "Sri Lankan Tamil features, elegant South Asian attire hints",
  },
  {
    id: "north-indian",
    label: "North Indian",
    cues: "North Indian features, optional kurta or salwar accents",
  },
  {
    id: "bengali",
    label: "Bengali",
    cues: "Bengali features, soft East Indian look, optional cotton saree or kurta accents",
  },
  {
    id: "telugu",
    label: "Telugu",
    cues: "Telugu South Indian features, tasteful South Indian dress cues",
  },
  {
    id: "kannada",
    label: "Kannada",
    cues: "Kannada South Indian features, regional attire hints",
  },
  {
    id: "western",
    label: "Western",
    cues: "Western features, contemporary global fashion",
  },
  {
    id: "east-asian",
    label: "East Asian",
    cues: "East Asian features, modern East Asian fashion cues",
  },
  {
    id: "middle-eastern",
    label: "Middle Eastern",
    cues: "Middle Eastern features, elegant regional fashion accents",
  },
  {
    id: "african",
    label: "African / Afro-diaspora",
    cues: "African or Afro-diaspora features, rich modern fashion cues",
  },
  {
    id: "latin",
    label: "Latin American",
    cues: "Latin American features, warm contemporary style",
  },
];

export const DEFAULT_REGION_IDS = ["kerala", "tamil"];

export const GENDERS: { id: Gender; label: string }[] = [
  { id: "woman", label: "Woman" },
  { id: "man", label: "Man" },
  { id: "nonbinary", label: "Non-binary" },
];

export const DRESS_BY_GENDER: Record<Gender, string[]> = {
  woman: dressesFor("woman").map((d) => d.label),
  man: dressesFor("man").map((d) => d.label),
  nonbinary: dressesFor("nonbinary").map((d) => d.label),
};

export { dressesFor, getDress, defaultDressId };

export const HAIR_BY_GENDER: Record<Gender, string[]> = {
  woman: [
    "Long straight",
    "Long wavy",
    "Soft curls",
    "Braided",
    "Bun / knot",
    "Ponytail",
    "Shoulder-length bob",
    "Half-up style",
    "Jasmine-adorned braid",
    "Loose open hair",
  ],
  man: [
    "Short neat",
    "Side part",
    "Wavy medium",
    "Curly",
    "Undercut",
    "Slicked back",
    "Casual messy",
    "Buzz cut",
    "Man bun",
    "Classic middle part",
  ],
  nonbinary: [
    "Short textured",
    "Medium wavy",
    "Long loose",
    "Undercut",
    "Curly volume",
    "Neat bob",
    "Tied back",
  ],
};

/** Shared list (legacy / nonbinary fallback). */
export const BODY_TYPES = [
  "Slim",
  "Athletic",
  "Average",
  "Curvy",
  "Broad-shouldered",
  "Petite",
  "Tall lean",
  "Soft build",
  "Youthful adult frame",
  "Soft innocent adult look",
  "Delicate adult build",
] as const;

/** Gender-specific body / figure options — all adults 21+ (no teen/underage framing). */
export const BODY_BY_GENDER: Record<Gender, string[]> = {
  woman: [
    "Slim",
    "Petite",
    "Athletic",
    "Average",
    "Curvy",
    "Hourglass",
    "Pear-shaped",
    "Apple-soft",
    "Tall lean",
    "Soft build",
    "Voluptuous",
    "Toned fitness",
    "Youthful adult frame",
    "Soft innocent adult look",
    "Delicate adult build",
    "Graceful slender adult",
    "Fresh-faced adult youthful",
    "Soft feminine curves",
    "Narrow-waist curvy",
    "Compact petite adult",
  ],
  man: [
    "Slim",
    "Athletic",
    "Average",
    "Broad-shouldered",
    "Tall lean",
    "Muscular",
    "Lean runner",
    "Soft build",
    "Stocky solid",
    "V-taper athletic",
    "Youthful adult frame",
    "Soft innocent adult look",
    "Boyish adult lean (21+)",
    "Fresh-faced adult youthful",
    "Lean toned",
    "Rugged athletic",
    "Slim-tall",
    "Compact athletic",
  ],
  nonbinary: [
    "Slim",
    "Athletic",
    "Average",
    "Soft build",
    "Tall lean",
    "Petite",
    "Broad-shouldered",
    "Youthful adult frame",
    "Soft innocent adult look",
    "Delicate adult build",
    "Androgynous lean",
    "Fresh-faced adult youthful",
  ],
};

export function bodyTypesFor(gender: Gender): string[] {
  return BODY_BY_GENDER[gender];
}

export const FASHION_VIBES = [
  "Everyday casual",
  "Festive traditional",
  "Smart office",
  "Beach leisure",
  "Editorial fashion",
  "Village chic",
  "Urban street",
  "Minimal elegant",
  "Vintage film look",
  "Monsoon cozy",
] as const;

export const HAIR_COLORS = [
  "Natural black",
  "Dark brown",
  "Warm brown",
  "Soft auburn",
  "Salt-and-pepper",
  "Silver grey",
  "Subtle highlights",
] as const;

export const SKIN_TONES = [
  "Fair warm",
  "Light wheatish",
  "Medium wheatish",
  "Golden tan",
  "Deep brown",
  "Rich dark brown",
] as const;

export function defaultPerson(overrides?: Partial<PersonFields>): PersonFields {
  const gender = overrides?.gender ?? "woman";
  const base: PersonFields = {
    gender,
    age: "24",
    dressId: defaultDressId(gender),
    hairStyle: gender === "man" ? "Short neat" : gender === "nonbinary" ? "Medium wavy" : "Long wavy",
    bodyType: "Average",
    fashionVibe: "Everyday casual",
    hairColor: "Natural black",
    skinTone: "Medium wheatish",
    faceCutId: defaultFaceCutId(gender),
  };
  const merged = { ...base, ...overrides, gender: overrides?.gender ?? gender };
  return {
    ...merged,
    faceCutId: overrides?.faceCutId ?? defaultFaceCutId(merged.gender),
    dressId: overrides?.dressId ?? defaultDressId(merged.gender),
  };
}

export function defaultPeopleForCount(count: PeopleCount): PersonFields[] {
  if (count === "1") {
    return [
      defaultPerson({
        gender: "woman",
        dressId: "w-kerala-cotton-sexy",
        hairStyle: "Jasmine-adorned braid",
      }),
    ];
  }
  if (count === "2") {
    return [
      defaultPerson({
        gender: "woman",
        dressId: "w-kerala-cotton-sexy",
        hairStyle: "Long wavy",
        age: "24",
      }),
      defaultPerson({
        gender: "man",
        dressId: "m-mundu-bare",
        hairStyle: "Short neat",
        age: "29",
        bodyType: "Athletic",
      }),
    ];
  }
  if (count === "3") {
    return [
      defaultPerson({ gender: "woman", age: "24" }),
      defaultPerson({
        gender: "man",
        dressId: "m-tee-shorts",
        hairStyle: "Wavy medium",
        age: "29",
      }),
      defaultPerson({
        gender: "woman",
        dressId: "w-skintight-salwar",
        hairStyle: "Ponytail",
        age: "22",
      }),
    ];
  }
  if (count === "4") {
    return [
      defaultPerson({ gender: "woman" }),
      defaultPerson({
        gender: "man",
        dressId: "m-pathani-open",
        hairStyle: "Side part",
      }),
      defaultPerson({
        gender: "woman",
        dressId: "w-skinfit-jeans-tiny-blouse",
        hairStyle: "Shoulder-length bob",
        age: "34",
      }),
      defaultPerson({
        gender: "man",
        dressId: "m-formal-undone",
        hairStyle: "Short neat",
        age: "34",
      }),
    ];
  }
  return [];
}

export function relationshipBlocksIntimate(rel: Relationship): boolean {
  return RELATIONSHIPS.find((r) => r.id === rel)?.blocksIntimate ?? false;
}

export function regionCues(ids: string[]): string {
  const selected = REGIONS.filter((r) => ids.includes(r.id));
  if (!selected.length) return "";
  return selected.map((r) => r.cues).join("; ");
}

/** Only swaps faceCutId — hair, body, dress, skin stay unchanged. */
export function reshuffleFaceCuts(people: PersonFields[]): PersonFields[] {
  return people.map((p) => ({
    ...p,
    faceCutId: randomFaceCutId(p.gender, p.faceCutId),
  }));
}
