import {
  defaultFaceCutId,
  randomFaceCutId,
} from "./face-cuts";

export type Gender = "woman" | "man" | "nonbinary";

export type AgeBand =
  | "21–24"
  | "23–27"
  | "28–32"
  | "33–40"
  | "41–50"
  | "51+";

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
  ageBand: AgeBand;
  dress: string;
  hairStyle: string;
  bodyType: string;
  fashionVibe: string;
  hairColor: string;
  skinTone: string;
  faceCutId: string;
}

export const AGE_BANDS: AgeBand[] = [
  "21–24",
  "23–27",
  "28–32",
  "33–40",
  "41–50",
  "51+",
];

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
  woman: [
    "Kerala kasavu saree",
    "Tamil silk saree",
    "Cotton saree",
    "Salwar kameez",
    "Anarkali",
    "Mundu set / set mundu",
    "Kurti with jeans",
    "Western dress",
    "Blouse and skirt",
    "Lehenga (tasteful)",
    "Office formals",
    "Casual tee and jeans",
    "Linen summer outfit",
    "Maxi dress",
    "Churidar",
  ],
  man: [
    "Mundu and shirt",
    "White shirt and trousers",
    "Kurta pajama",
    "Veshti / dhoti with shirt",
    "Casual shirt and jeans",
    "Linen shirt",
    "Office formals",
    "Polo and chinos",
    "Pathani suit",
    "South Indian wedding sherwani (tasteful)",
    "Tee and shorts",
    "Nehru jacket over shirt",
    "Safari-style shirt",
  ],
  nonbinary: [
    "Smart casual mix",
    "Kurta with trousers",
    "Linen co-ord",
    "Oversized shirt and pants",
    "Gender-fluid fusion wear",
    "Casual tee and jeans",
    "Layered jacket look",
    "Soft saree drape (tasteful)",
    "Mundu with contemporary top",
  ],
};

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
    "Pixie cut",
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

export const BODY_TYPES = [
  "Slim",
  "Athletic",
  "Average",
  "Curvy",
  "Broad-shouldered",
  "Petite",
  "Tall lean",
  "Soft build",
] as const;

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
  const base: PersonFields = {
    gender: "woman",
    ageBand: "23–27",
    dress: "Cotton saree",
    hairStyle: "Long wavy",
    bodyType: "Average",
    fashionVibe: "Everyday casual",
    hairColor: "Natural black",
    skinTone: "Medium wheatish",
    faceCutId: defaultFaceCutId("woman"),
    ...overrides,
  };
  return {
    ...base,
    faceCutId: overrides?.faceCutId ?? defaultFaceCutId(base.gender),
  };
}

export function defaultPeopleForCount(count: PeopleCount): PersonFields[] {
  if (count === "1") {
    return [
      defaultPerson({
        gender: "woman",
        dress: "Kerala kasavu saree",
        hairStyle: "Jasmine-adorned braid",
      }),
    ];
  }
  if (count === "2") {
    return [
      defaultPerson({
        gender: "woman",
        dress: "Kerala kasavu saree",
        hairStyle: "Long wavy",
        ageBand: "23–27",
      }),
      defaultPerson({
        gender: "man",
        dress: "Mundu and shirt",
        hairStyle: "Short neat",
        ageBand: "28–32",
        bodyType: "Athletic",
      }),
    ];
  }
  if (count === "3") {
    return [
      defaultPerson({ gender: "woman", ageBand: "23–27" }),
      defaultPerson({
        gender: "man",
        dress: "Casual shirt and jeans",
        hairStyle: "Wavy medium",
        ageBand: "28–32",
      }),
      defaultPerson({
        gender: "woman",
        dress: "Salwar kameez",
        hairStyle: "Ponytail",
        ageBand: "21–24",
      }),
    ];
  }
  if (count === "4") {
    return [
      defaultPerson({ gender: "woman" }),
      defaultPerson({
        gender: "man",
        dress: "Kurta pajama",
        hairStyle: "Side part",
      }),
      defaultPerson({
        gender: "woman",
        dress: "Kurti with jeans",
        hairStyle: "Shoulder-length bob",
        ageBand: "33–40",
      }),
      defaultPerson({
        gender: "man",
        dress: "White shirt and trousers",
        hairStyle: "Short neat",
        ageBand: "33–40",
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

export function reshuffleFaceCuts(people: PersonFields[]): PersonFields[] {
  return people.map((p) => ({
    ...p,
    faceCutId: randomFaceCutId(p.gender, p.faceCutId),
    hairColor: HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)]!,
    skinTone: SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)]!,
    hairStyle: HAIR_BY_GENDER[p.gender][
      Math.floor(Math.random() * HAIR_BY_GENDER[p.gender].length)
    ]!,
  }));
}
