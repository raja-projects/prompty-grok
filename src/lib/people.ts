import {
  applyKnownFaceLocks,
  defaultFaceCutId,
  randomFaceCutId,
} from "./face-cuts";
import {
  defaultDressId,
  dressesFor,
  getDress,
} from "./dresses";

export type Gender = "woman" | "man" | "nonbinary";

/** Single adult age year (19+), not a range. */
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
  /** Per person: known only valid for woman. */
  faceCutPool?: "general" | "known";
}

/** Individual ages for the picker — not ranges. */
/** Ages 18–80. Under 19 only for everyday/social — Intimate/Hardcore/Romance blocked. */
export const AGES: Age[] = Array.from({ length: 63 }, (_, i) => String(18 + i));

export function ageNumber(age: Age | string | undefined): number {
  const n = Number(age);
  return Number.isFinite(n) ? n : 21;
}

export function isUnder21(age: Age | string | undefined): boolean {
  return ageNumber(age) < 19;
}

export function sceneHasUnder21(people: PersonFields[], peopleCount: PeopleCount): boolean {
  if (peopleCount === "group") return false;
  const n = Number(peopleCount);
  return people.slice(0, n).some((p) => isUnder21(p.age));
}

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
    cues: "HARD LOCK: every person must look clearly Malayali South Indian from Kerala — South Indian Malayali facial features only; not Western European, not East Asian, not African, not Middle Eastern; optional kasavu/mundu attire accents",
  },
  {
    id: "tamil",
    label: "Tamil / Tamil Nadu",
    cues: "HARD LOCK: every person must look clearly Tamil South Indian from Tamil Nadu — Tamil facial features only; not Western European, not East Asian, not African; optional saree/veshti attire accents",
  },
  {
    id: "sri-lankan-tamil",
    label: "Sri Lankan Tamil",
    cues: "HARD LOCK: every person must look clearly Sri Lankan Tamil — Sri Lankan Tamil facial features only; not Western European, not East Asian; elegant South Asian attire hints",
  },
  {
    id: "north-indian",
    label: "North Indian",
    cues: "HARD LOCK: every person must look clearly North Indian — North Indian facial features only; not East Asian, not African, not Dravidian-only South Indian; optional kurta/salwar accents",
  },
  {
    id: "bengali",
    label: "Bengali",
    cues: "HARD LOCK: every person must look clearly Bengali East Indian — Bengali facial features only; not East Asian, not Western European; optional cotton saree/kurta accents",
  },
  {
    id: "telugu",
    label: "Telugu",
    cues: "HARD LOCK: every person must look clearly Telugu South Indian — Telugu facial features only; not Western European, not East Asian; tasteful South Indian dress cues",
  },
  {
    id: "kannada",
    label: "Kannada",
    cues: "HARD LOCK: every person must look clearly Kannada South Indian — Kannada facial features only; not Western European, not East Asian; regional attire hints",
  },
  {
    id: "western",
    label: "Western",
    cues: "HARD LOCK: every person must look clearly Western European / Caucasian — Western facial features only; not South Asian, not East Asian, not African; contemporary global fashion",
  },
  {
    id: "east-asian",
    label: "East Asian",
    cues: "HARD LOCK: every person must look clearly East Asian — East Asian facial features only; not South Asian, not Western European, not African; modern East Asian fashion cues",
  },
  {
    id: "middle-eastern",
    label: "Middle Eastern",
    cues: "HARD LOCK: every person must look clearly Middle Eastern — Middle Eastern facial features only; not East Asian, not South Indian, not Nordic Western; elegant regional fashion accents",
  },
  {
    id: "african",
    label: "African / Afro-diaspora",
    cues: "HARD LOCK: every person must look clearly African or Afro-diaspora — African facial features only; not East Asian, not South Asian, not Western European; rich modern fashion cues",
  },
  {
    id: "latin",
    label: "Latin American",
    cues: "HARD LOCK: every person must look clearly Latin American — Latin American facial features only; not East Asian, not Nordic Western, not South Indian; warm contemporary style",
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
    // Long hair only — regular everyday / festive styles
    "Long straight",
    "Long wavy",
    "Long soft curls",
    "Long loose open hair",
    "Long center-part open",
    "Long side-part open",
    "Long layered open",
    "Long blow-dried smooth",
    "Long beach waves",
    "Half-up half-down long",
    "Half-up with soft face framing",
    "Low ponytail long",
    "High ponytail long",
    "Side ponytail long",
    "Ponytail with long face strands",
    "Simple long braid",
    "Thick single long braid",
    "Double long braids",
    "French braid long",
    "Fishtail braid long",
    "Jasmine-adorned long braid",
    "Flower-pinned long open hair",
    "Low bun with long loose ends",
    "Neat low bun (long hair)",
    "Soft high bun (long hair)",
    "Messy bun with long tendrils",
    "Classic knot bun long",
    "Side-swept long hair",
    "Long hair tucked behind ears",
    "Long hair over one shoulder",
    "Long wet-look open hair",
    "Soft curled ends long",
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

/** Gender-specific body / figure options — all adults 19+ (no teen/underage framing). */
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
    "Boyish adult lean (19+)",
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

/** Young-adult (18–20) body options. */
export const YOUNG_ADULT_BODY_BY_GENDER: Record<Gender, string[]> = {
  woman: [
    "Slim young-adult frame",
    "Petite young-adult build",
    "Soft young-adult build",
    "Athletic young-adult",
    "Average young-adult",
    "Tall lean young-adult",
    "Fresh young-adult slender",
    "Delicate young-adult frame",
    "Small youthful adult figure (18–20)",
  ],
  man: [
    "Slim young-adult frame",
    "Lean young-adult",
    "Athletic young-adult",
    "Average young-adult",
    "Tall lean young-adult",
    "Soft young-adult build",
    "Compact young-adult athletic",
    "Fresh young-adult slender",
  ],
  nonbinary: [
    "Slim young-adult frame",
    "Average young-adult",
    "Soft young-adult build",
    "Tall lean young-adult",
    "Athletic young-adult",
    "Delicate young-adult frame",
  ],
};

const AGE_19_20_WOMAN_BODY_TYPES = [
  "youth body and youth face",
  "small body and small face",
  "teen body and teen face",
  ...YOUNG_ADULT_BODY_BY_GENDER.woman,
];

export function bodyTypesForAge(gender: Gender, age: Age | string | undefined): string[] {
  const n = ageNumber(age);
  if ((n === 19 || n === 20) && gender === "woman") return AGE_19_20_WOMAN_BODY_TYPES;
  if (isUnder21(age) || n === 19 || n === 20) return YOUNG_ADULT_BODY_BY_GENDER[gender];
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
    faceCutId: defaultFaceCutId(gender, undefined, DEFAULT_REGION_IDS, "general"),
    faceCutPool: "general",
  };
  const merged = { ...base, ...overrides, gender: overrides?.gender ?? gender };
  const pool = merged.gender === "woman" ? (merged.faceCutPool ?? "general") : "general";
  const withFace = {
    ...merged,
    faceCutPool: pool,
    faceCutId: overrides?.faceCutId ?? defaultFaceCutId(merged.gender, merged.age, DEFAULT_REGION_IDS, pool),
    dressId: overrides?.dressId ?? defaultDressId(merged.gender),
  };
  return applyKnownFaceLocks(withFace);
}


/** Default cast for Swap four: young-adult couple + mid-age couple (all 19+). */

/** Default cast for Two men + her: one woman + two men (all 19+). */

/** Default cast for Two women + him: two women + one man (all 19+). */

/** Default cast for Crowd press: young-adult woman + mid-age man (strangers, 19+). */

/** Default cast for Women together: two women (all 19+). */
export function defaultWlwPeople(): PersonFields[] {
  return [
    defaultPerson({
      gender: "woman",
      age: "24",
      dressId: "w-kerala-cotton-sexy",
      hairStyle: "Long wavy",
      bodyType: "Slim",
    }),
    defaultPerson({
      gender: "woman",
      age: "27",
      dressId: "w-skinfit-jeans-tiny-blouse",
      hairStyle: "Long wavy",
      bodyType: "Curvy",
    }),
  ];
}

export function defaultCrowdPressPeople(): PersonFields[] {
  return [
    defaultPerson({
      gender: "woman",
      age: "23",
      dressId: "w-kerala-cotton-sexy",
      hairStyle: "Long wavy",
      bodyType: "Slim",
    }),
    defaultPerson({
      gender: "man",
      age: "44",
      dressId: "m-formal-undone",
      hairStyle: "Short neat",
      bodyType: "Average",
    }),
  ];
}

export function defaultFfmPeople(): PersonFields[] {
  return [
    defaultPerson({
      gender: "woman",
      age: "23",
      dressId: "w-kerala-cotton-sexy",
      hairStyle: "Long wavy",
      bodyType: "Slim",
    }),
    defaultPerson({
      gender: "woman",
      age: "28",
      dressId: "w-skinfit-jeans-tiny-blouse",
      hairStyle: "Long wavy",
      bodyType: "Curvy",
    }),
    defaultPerson({
      gender: "man",
      age: "30",
      dressId: "m-tee-shorts",
      hairStyle: "Short neat",
      bodyType: "Athletic",
    }),
  ];
}

export function defaultMmfPeople(): PersonFields[] {
  return [
    defaultPerson({
      gender: "woman",
      age: "24",
      dressId: "w-kerala-cotton-sexy",
      hairStyle: "Long wavy",
      bodyType: "Curvy",
    }),
    defaultPerson({
      gender: "man",
      age: "28",
      dressId: "m-tee-shorts",
      hairStyle: "Short neat",
      bodyType: "Athletic",
    }),
    defaultPerson({
      gender: "man",
      age: "34",
      dressId: "m-formal-undone",
      hairStyle: "Short neat",
      bodyType: "Broad-shouldered",
    }),
  ];
}

export function defaultFoursomeSwapPeople(): PersonFields[] {
  return [
    defaultPerson({
      gender: "woman",
      age: "23",
      dressId: "w-kerala-cotton-sexy",
      hairStyle: "Long wavy",
      bodyType: "Slim",
    }),
    defaultPerson({
      gender: "man",
      age: "26",
      dressId: "m-tee-shorts",
      hairStyle: "Short neat",
      bodyType: "Athletic",
    }),
    defaultPerson({
      gender: "woman",
      age: "42",
      dressId: "w-skinfit-jeans-tiny-blouse",
      hairStyle: "Long wavy",
      bodyType: "Curvy",
    }),
    defaultPerson({
      gender: "man",
      age: "45",
      dressId: "m-formal-undone",
      hairStyle: "Short neat",
      bodyType: "Broad-shouldered",
    }),
  ];
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
    return defaultFoursomeSwapPeople();
  }
  return [];
}

export function relationshipBlocksIntimate(rel: Relationship): boolean {
  return RELATIONSHIPS.find((r) => r.id === rel)?.blocksIntimate ?? false;
}


/** Preferred skin tones per region (first = default). */
export const SKIN_TONES_BY_REGION: Record<string, readonly string[]> = {
  kerala: ["Fair warm", "Light wheatish", "Medium wheatish", "Golden tan"],
  tamil: ["Fair warm", "Light wheatish", "Medium wheatish", "Golden tan", "Deep brown"],
  "sri-lankan-tamil": ["Light wheatish", "Medium wheatish", "Golden tan", "Deep brown"],
  "north-indian": ["Fair warm", "Light wheatish", "Medium wheatish", "Golden tan"],
  bengali: ["Fair warm", "Light wheatish", "Medium wheatish"],
  telugu: ["Light wheatish", "Medium wheatish", "Golden tan", "Deep brown"],
  kannada: ["Fair warm", "Light wheatish", "Medium wheatish", "Golden tan"],
  western: ["Fair warm", "Light wheatish", "Golden tan"],
  "east-asian": ["Fair warm", "Light wheatish", "Medium wheatish"],
  "middle-eastern": ["Light wheatish", "Medium wheatish", "Golden tan", "Deep brown"],
  african: ["Deep brown", "Rich dark brown", "Golden tan", "Medium wheatish"],
  latin: ["Light wheatish", "Medium wheatish", "Golden tan", "Deep brown"],
};

/** Preferred hair colors per region (first = default). */
export const HAIR_COLORS_BY_REGION: Record<string, readonly string[]> = {
  kerala: ["Natural black", "Dark brown"],
  tamil: ["Natural black", "Dark brown"],
  "sri-lankan-tamil": ["Natural black", "Dark brown"],
  "north-indian": ["Natural black", "Dark brown", "Warm brown"],
  bengali: ["Natural black", "Dark brown"],
  telugu: ["Natural black", "Dark brown"],
  kannada: ["Natural black", "Dark brown"],
  western: ["Dark brown", "Warm brown", "Soft auburn", "Natural black", "Subtle highlights"],
  "east-asian": ["Natural black", "Dark brown"],
  "middle-eastern": ["Natural black", "Dark brown"],
  african: ["Natural black", "Dark brown"],
  latin: ["Natural black", "Dark brown", "Warm brown", "Soft auburn"],
};

export function primaryRegionId(regionIds: string[] | undefined): string {
  return regionIds?.[0] || DEFAULT_REGION_IDS[0] || "kerala";
}

export function skinTonesForRegions(regionIds: string[] | undefined): string[] {
  const ids = regionIds?.length ? regionIds : DEFAULT_REGION_IDS;
  const set = new Set<string>();
  for (const id of ids) {
    for (const s of SKIN_TONES_BY_REGION[id] ?? SKIN_TONES) set.add(s);
  }
  return set.size ? [...set] : [...SKIN_TONES];
}

export function hairColorsForRegions(regionIds: string[] | undefined): string[] {
  const ids = regionIds?.length ? regionIds : DEFAULT_REGION_IDS;
  const set = new Set<string>();
  for (const id of ids) {
    for (const h of HAIR_COLORS_BY_REGION[id] ?? HAIR_COLORS) set.add(h);
  }
  return set.size ? [...set] : [...HAIR_COLORS];
}

export function defaultSkinToneForRegions(regionIds: string[] | undefined): string {
  const id = primaryRegionId(regionIds);
  return SKIN_TONES_BY_REGION[id]?.[0] ?? "Medium wheatish";
}

export function defaultHairColorForRegions(regionIds: string[] | undefined): string {
  const id = primaryRegionId(regionIds);
  return HAIR_COLORS_BY_REGION[id]?.[0] ?? "Natural black";
}

export function regionCues(ids: string[]): string {
  const selected = REGIONS.filter((r) => ids.includes(r.id));
  if (!selected.length) return "";
  return selected.map((r) => r.cues).join("; ");
}

/** Only swaps faceCutId — hair, body, dress, skin stay unchanged. Region-filtered. */
export function reshuffleFaceCuts(
  people: PersonFields[],
  regionIds?: string[],
): PersonFields[] {
  return people.map((p) => {
    const pool = p.gender === "woman" ? (p.faceCutPool ?? "general") : "general";
    const next = {
      ...p,
      faceCutPool: pool,
      faceCutId: randomFaceCutId(p.gender, p.faceCutId, p.age, regionIds, pool),
    };
    return applyKnownFaceLocks(next);
  });
}

/** When region changes: swap to a matching face cut; nudge skin/hair into region prefs if off-list. */
export function applyRegionLook(
  people: PersonFields[],
  regionIds: string[],
): PersonFields[] {
  const skins = skinTonesForRegions(regionIds);
  const hairs = hairColorsForRegions(regionIds);
  const defSkin = defaultSkinToneForRegions(regionIds);
  const defHair = defaultHairColorForRegions(regionIds);
  return people.map((p) => {
    const pool = p.gender === "woman" ? (p.faceCutPool ?? "general") : "general";
    const next = {
      ...p,
      faceCutPool: pool,
      faceCutId: randomFaceCutId(p.gender, p.faceCutId, p.age, regionIds, pool),
      skinTone: skins.includes(p.skinTone) ? p.skinTone : defSkin,
      hairColor: hairs.includes(p.hairColor) ? p.hairColor : defHair,
    };
    return applyKnownFaceLocks(next);
  });
}
