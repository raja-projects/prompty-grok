import {
  ACTIONS,
  ACTION_CATEGORIES,
  categoryRequiresAdult21,
  type ActionCategoryId,
} from "./actions";
import { ASPECT_RATIOS, CAMERA_ANGLES, FRAMINGS, TIMES_OF_DAY } from "./camera";
import {
  defaultPerson,
  dressesForAge,
  relationshipBlocksIntimate,
  sceneHasUnder21,
  type Gender,
  type PersonFields,
} from "./people";
import { PLACES } from "./places";
import { randomDefaultPeople } from "./defaults";
import { ACTS, BODY, EXPLAIN, VOCAB } from "./chat-vocab";
import { POSES } from "./poses";
import type { SceneFormState } from "./types";

export interface EngineQuestion {
  text: string;
  options: { label: string; send: string }[];
}

export interface Known {
  action: boolean;
  place: boolean;
  pose: boolean;
  people: boolean;
}

export interface TurnResult {
  steps: Partial<SceneFormState>[];
  applied: string[];
  leftovers: string;
  question: EngineQuestion | null;
  filled: Known;
  placeId?: string;
}

const INTIMATE_CATS: ActionCategoryId[] = [
  "intimate",
  "hardcore",
  "hardcore-grk",
  "swap-own-grk",
  "swap-cross-grk",
  "gf-exchange-grk",
  "five-couples-games",
  "mmf-grk",
  "mmmf-grk",
  "ffm-grk",
  "crowd-press-grk",
  "wlw-grk",
];

const CAST_SIZE: Partial<Record<ActionCategoryId, number>> = {
  "swap-own-grk": 4,
  "swap-cross-grk": 4,
  "gf-exchange-grk": 4,
  "mmmf-grk": 4,
  "mmf-grk": 3,
  "ffm-grk": 3,
  "crowd-press-grk": 2,
  "wlw-grk": 2,
};

const STOP = new Set([
  "a","an","the","and","with","in","on","at","of","to","is","are","was","be","it","this","that","then",
  "some","very","quite","please","make","give","show","me","her","his","him","them","their","they","she",
  "he","both","into","over","under","for","as","wearing","wears","wore","has","have","from","age","old",
  "year","years","yr","yrs","yo","two","three","four","five","six","seven","eight","nine","ten","one","about",
  "teen","girl","girls","boy","boys","woman","women","man","men","guy","guys","lady","ladies","people","with",
]);

const NUMBERS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6,
};

const ALIASES: Record<string, string[]> = {
  spooning: ["spoon", "side lying", "from the side", "lying behind"],
  missionary: ["missionary", "on her back", "between her legs", "legs around waist", "facing up"],
  doggy: ["doggy", "from behind", "all fours", "hands and knees", "bent over", "behind her"],
  cowgirl: ["cowgirl", "on top", "riding", "straddle", "girl on top", "astride"],
  reverse: ["reverse", "facing away", "back to him", "reverse riding"],
  blowjob: ["blowjob", "oral", "sucking", "bj", "fellatio", "on knees"],
  handjob: ["handjob", "stroking", "jerking"],
  fingering: ["fingering", "fingers", "hand between", "digital"],
  cunnilingus: ["cunnilingus", "eating out", "going down on her", "face between thighs"],
  sixty: ["69", "sixty nine", "mutual oral"],
  anal: ["anal", "rear entry", "from the back"],
  titjob: ["titjob", "between breasts", "boob press"],
  butt: ["butt", "ass", "pressing against", "grinding behind", "hips pressed"],
  boobs: ["boobs", "breast", "chest press", "bust"],
  kiss: ["kiss", "kissing", "lips", "make out"],
  neck: ["neck", "necking", "nuzzle", "throat"],
  hug: ["hug", "embrace", "arms around", "cuddle"],
  standing: ["standing", "upright", "against the wall"],
  sitting: ["sitting", "seated", "chair", "sofa", "on lap"],
  straddle: ["straddle", "legs around", "lap sit"],
  legs: ["legs up", "ankles up", "legs over shoulders", "knees to chest"],
  bent: ["bent over", "leaning over", "hips back"],
  prone: ["face down", "prone", "on stomach"],
  grinding: ["grinding", "rubbing", "dry rub", "hips roll"],
  undress: ["undress", "pulling off", "half off", "open shirt"],
  tease: ["tease", "teasing", "light touch"],
  deep: ["deep", "buried", "pressed in"],
  fast: ["fast", "hard pace", "pounding", "urgent"],
  wall: ["wall", "pinned to wall", "against wall", "doorway"],
  table: ["table", "counter", "desk", "worktop", "island"],
  shower: ["shower", "wet", "steam", "bathroom"],
  bed: ["bed", "mattress", "sheets", "pillow", "bedroom"],
};

const CAMERA_WORDS: [string, string][] = [
  ["from behind", "behind"],
  ["over the shoulder", "over the shoulder"],
  ["from above", "above"],
  ["top down", "above"],
  ["overhead", "above"],
  ["from below", "low"],
  ["low angle", "low"],
  ["from the side", "side"],
  ["eye level", "eye"],
  ["three quarter", "three-quarter"],
];

const DRESS_WORDS = [
  "saree","sari","salwar","kurta","kurti","leggings","dhoti","jeans","slip","dress","skirt","shorts",
  "shirt","tee","hoodie","gown","blouse","bra","lingerie","bikini","towel","track","pajama","nightgown",
];

const ASPECT_WORDS: [string, string][] = [
  ["9:16", "9:16"], ["vertical", "9:16"], ["portrait", "9:16"],
  ["16:9", "16:9"], ["landscape", "16:9"],
  ["1:1", "1:1"], ["square", "1:1"],
];

function escapeRe(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function word(text: string, phrase: string): boolean {
  const p = phrase.toLowerCase().trim();
  if (!p) return false;
  return new RegExp(`\\b${escapeRe(p)}\\b`).test(text);
}

function anyWord(text: string, list: string[]): boolean {
  return list.some((w) => word(text, w));
}

function visibleCategories(form: SceneFormState): ActionCategoryId[] {
  const blocked = relationshipBlocksIntimate(form.relationship);
  const under21 = sceneHasUnder21(form.people, form.peopleCount);
  return ACTION_CATEGORIES.filter((c) => {
    if (blocked && INTIMATE_CATS.includes(c.id)) return false;
    if (under21 && categoryRequiresAdult21(c.id)) return false;
    return true;
  }).map((c) => c.id);
}

function editDistance(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const grid: number[][] = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      grid[i]![j] = Math.min(grid[i - 1]![j]! + 1, grid[i]![j - 1]! + 1, grid[i - 1]![j - 1]! + cost);
    }
  }
  return grid[rows - 1]![cols - 1]!;
}

function resolveToken(token: string): string[] {
  if (VOCAB[token]) return VOCAB[token];
  const singular = token.endsWith("es")
    ? token.slice(0, -2)
    : token.endsWith("s")
      ? token.slice(0, -1)
      : token;
  if (VOCAB[singular]) return VOCAB[singular];
  const keys = Object.keys(VOCAB);
  for (const key of keys) {
    if (key.length >= 3 && (token.startsWith(key) || key.startsWith(token))) return VOCAB[key] ?? [];
  }
  for (const key of keys) {
    const limit = key.length >= 8 ? 2 : key.length >= 5 ? 1 : 0;
    if (limit && Math.abs(key.length - token.length) <= limit && editDistance(key, token) <= limit) {
      return VOCAB[key] ?? [];
    }
  }
  return [];
}

function findAction(text: string, form: SceneFormState, castSize: number) {
  const tokens = text.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1);
  const allowed = visibleCategories(form);
  const groups = tokens.map((token) => Array.from(new Set([token, ...resolveToken(token)])));
  const actToken = tokens.find((t) => ACTS.has(t)) ?? "";
  const bodyToken = tokens.find((t) => BODY.has(t)) ?? "";
  const soft = ["fingering", "finger", "lick", "licking", "kiss", "kissing", "grinding", "grind"];
  const key = bodyToken && soft.includes(actToken) ? bodyToken : actToken || tokens[tokens.length - 1] || "";

  let best: { id: string; label: string; score: number; key: string } | null = null;

  for (const action of ACTIONS) {
    if (!allowed.includes(action.category)) continue;
    const need = CAST_SIZE[action.category];
    if (need && need !== castSize) continue;

    const label = action.label.toLowerCase();
    const hay = `${label} ${action.prompt.toLowerCase()}`;
    let score = 0;
    let labelHits = 0;
    let actBonus = 0;

    groups.forEach((group, index) => {
      const weight = 1 + index * 0.5;
      let groupScore = 0;
      for (const term of group) {
        if (word(label, term)) {
          groupScore = Math.max(groupScore, term.includes(" ") ? 8 : 6);
        } else if (word(hay, term)) {
          groupScore = Math.max(groupScore, 1.5);
        }
      }
      if (groupScore >= 6) labelHits += 1;
      score += groupScore * weight;

      const tok = tokens[index] ?? "";
      if (ACTS.has(tok)) {
        const root = tok.replace(/(ing|s)$/, "");
        if (root && new RegExp(`\\b${escapeRe(root)}`).test(label)) actBonus += 18;
      }
    });

    if (!labelHits) continue;

    const total = score + labelHits * 10 + actBonus + Math.min(2, Math.floor(action.prompt.length / 120));
    if (total > (best?.score ?? 0)) best = { id: action.id, label: action.label, score: total, key };
  }

  return best && best.score >= 6 ? best : null;
}

const PLACE_ALIASES: Record<string, string> = {
  shower: "bathroom",
  bath: "bathroom",
  couch: "sofa",
  "living room": "sofa",
  counter: "kitchen",
};

function findPlace(text: string) {
  const extra = Object.entries(PLACE_ALIASES)
    .filter(([key]) => word(text, key))
    .map(([, id]) => id);
  let best: { id: string; label: string; score: number } | null = null;
  for (const place of PLACES) {
    const clean = place.label.replace(/\(.*?\)/g, "").trim().toLowerCase();
    const inner = place.label.match(/\((.*?)\)/)?.[1]?.toLowerCase() ?? "";
    let score = 0;
    if (clean && word(text, clean)) score += 9;
    if (inner && word(text, inner)) score += 7;
    for (const w of clean.split(/[^a-z]+/)) {
      if (w.length >= 4 && word(text, w)) score += 5;
    }
    if (extra.includes(place.id)) score += 7;
    if (score > (best?.score ?? 0)) best = { id: place.id, label: place.label, score };
  }
  return best && best.score >= 5 ? best : null;
}

function findPose(text: string) {
  let best: { id: string; label: string; brief: string; score: number } | null = null;
  for (const pose of POSES) {
    let score = 0;
    if (word(text, pose.label)) score += 8;
    for (const part of pose.brief.split(",").slice(0, 2)) {
      if (word(text, part.trim())) score += 3;
    }
    if (score > (best?.score ?? 0)) best = { id: pose.id, label: pose.label, brief: pose.brief, score };
  }
  return best && best.score >= 8 ? best : null;
}

function findDress(text: string, word2: string) {
  let best: { id: string; label: string; score: number } | null = null;
  for (const person of ["woman", "man"] as Gender[]) {
    for (const age of ["22", "30"]) {
      for (const dress of dressesForAge(person, age)) {
        const label = dress.label.toLowerCase();
        const hay = `${label} ${dress.prompt.toLowerCase()}`;
        let score = 0;
        if (word(label, word2)) score += 8;
        else if (word(hay, word2)) score += 2;
        if (score > (best?.score ?? 0)) best = { id: dress.id, label: dress.label, score };
      }
    }
  }
  return best && best.score >= 8 ? best : null;
}

function rebuildPeople(form: SceneFormState, count: number): PersonFields[] {
  const people = [...form.people];
  const ladder: { gender: Gender; age: string; bodyType: string }[] = [
    { gender: "woman", age: "24", bodyType: "Average" },
    { gender: "man", age: "31", bodyType: "Average" },
    { gender: "woman", age: "27", bodyType: "Slim" },
    { gender: "man", age: "36", bodyType: "Athletic" },
  ];
  while (people.length < count) {
    const step = ladder[people.length % ladder.length]!;
    const person = defaultPerson({ gender: step.gender, age: step.age });
    person.bodyType = step.bodyType;
    people.push(person);
  }
  return people.slice(0, count);
}

function collectAges(text: string): number[] {
  const found: { at: number; age: number }[] = [];
  const patterns = [
    /\b(\d{2})\s*(?:year|yr|yo)s?(?:\s*old)?\b/g,
    /\b(?:she|he|her|his|age|aged)\b\s*(?:is|'s|:)?\s*(\d{2})\b/g,
  ];
  for (const pattern of patterns) {
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(text)) !== null) {
      const age = Number(m[1]);
      if (age >= 18 && age <= 70) found.push({ at: m.index, age });
    }
  }
  if (!found.length) {
    const bare = text.trim().match(/^(\d{2})$/);
    if (bare) {
      const age = Number(bare[1]);
      if (age >= 18 && age <= 70) found.push({ at: 0, age });
    }
  }
  return found.sort((a, b) => a.at - b.at).map((f) => f.age);
}

export function parseTurn(raw: string, form: SceneFormState, known: Known): TurnResult {
  const text = ` ${raw.toLowerCase().replace(/\s+/g, " ").trim()} `;
  const steps: Partial<SceneFormState>[] = [];
  const applied: string[] = [];
  const used: string[] = [];
  const filled: Known = { ...known };

  let people = known.people ? form.people.map((p) => ({ ...p })) : randomDefaultPeople();
  let count: number | null = null;
  let chosenPlace: string | undefined;

  const saysWoman = anyWord(text, ["woman", "women", "girl", "girls", "lady", "ladies", "female"]);
  const saysMan = anyWord(text, ["man", "men", "guy", "guys", "male", "boy"]);

  const countMatch = text.match(/\b(two|three|four|five|six)\s+(women|woman|girls|girl|men|man|guys|guy|people)\b/);
  if (countMatch) {
    const n = NUMBERS[countMatch[1]!] ?? 0;
    if (n >= 1 && n <= 6) {
      count = n;
      used.push(countMatch[0]);
    }
  } else if (saysWoman && saysMan) {
    count = 2;
  }

  if (count) {
    people = rebuildPeople({ ...form, people }, count);
    applied.push(`${count} ${count === 1 ? "person" : "people"}`);
    filled.people = true;
  }

  if (!count && (saysWoman || saysMan)) {
    const gender: Gender = saysWoman && !saysMan ? "woman" : saysMan && !saysWoman ? "man" : people[0]?.gender ?? "woman";
    if (people[0] && people[0].gender !== gender) {
      people[0] = { ...people[0], gender, dressId: dressesForAge(gender, people[0].age)[0]?.id ?? people[0].dressId };
    }
    applied.push(gender === "woman" ? "a woman" : "a man");
    filled.people = true;
  }

  collectAges(text).forEach((age, i) => {
    const person = people[i];
    if (!person) return;
    people[i] = { ...person, age: String(age) };
    applied.push(`${person.gender === "man" ? "he" : "she"} is ${age}`);
    filled.people = true;
  });

  const dressWord = DRESS_WORDS.find((w) => word(text, w));
  if (dressWord) {
    const dress = findDress(text, dressWord);
    if (dress) {
      people = people.map((person) => {
        if (!dressesForAge(person.gender, person.age).some((d) => d.id === dress.id)) return person;
        applied.push(dress.label);
        return { ...person, dressId: dress.id };
      });
      used.push(dressWord);
    }
  }

  if (applied.length) {
    steps.push({
      people,
      ...(count ? { peopleCount: String(count) as SceneFormState["peopleCount"] } : {}),
    });
  }

  const action = findAction(text, form, people.length);
  if (action) {
    steps.push({ actionId: action.id, useCustomActionPrompt: false });
    applied.push(action.label);
    filled.action = true;
    used.push(action.label.toLowerCase());
  }

  const cameraWord = CAMERA_WORDS.find(([phrase]) => word(text, phrase));
  if (cameraWord) {
    const angle = CAMERA_ANGLES.find((a) => a.label.toLowerCase().includes(cameraWord[1]));
    if (angle) {
      steps.push({ cameraAngle: angle.id });
      applied.push(`shot ${cameraWord[0]}`);
      used.push(cameraWord[0]);
    }
  }

  const framing = FRAMINGS.find((f) => word(text, f.label));
  if (framing) {
    steps.push({ framing: framing.id });
    applied.push(framing.label);
    used.push(framing.label.toLowerCase());
  }

  const place = findPlace(text);
  if (place) {
    steps.push({ placeId: place.id });
    applied.push(place.label);
    filled.place = true;
    chosenPlace = place.id;
    used.push(place.label.replace(/\(.*?\)/g, "").trim().toLowerCase());
  }

  const time = TIMES_OF_DAY.find((t) => word(text, t.label));
  if (time) {
    steps.push({ timeOfDay: time.id });
    applied.push(time.label);
    used.push(time.label.toLowerCase());
  }

  const aspect = ASPECT_WORDS.find(([phrase]) => word(text, phrase));
  if (aspect) {
    const ratio = ASPECT_RATIOS.find((r) => r === aspect[1]);
    if (ratio) {
      steps.push({ aspectRatio: ratio });
      applied.push(ratio);
      used.push(aspect[0]);
    }
  }

  const pose = findPose(text);
  if (pose) {
    applied.push(pose.label);
    filled.pose = true;
    used.push(pose.label.toLowerCase());
  }

  let remaining = text;
  for (const phrase of used) {
    if (!phrase) continue;
    remaining = remaining.replace(new RegExp(escapeRe(phrase), "g"), " ");
  }
  const leftovers = remaining
    .split(/[^a-z0-9']+/)
    .filter((w) => w.length > 2 && !STOP.has(w) && !VOCAB[w] && !ACTS.has(w) && !BODY.has(w))
    .slice(0, 18)
    .join(" ");

  const notes: string[] = [];
  if (action) {
    const explain = EXPLAIN[action.key];
    if (explain) notes.push(explain);
  }
  if (pose) notes.push(pose.brief);
  if (leftovers) notes.push(leftovers);
  if (notes.length) steps.push({ extraNotes: notes.join(". ") });

  const question = nextQuestion(filled);

  return { steps, applied, leftovers, question, filled, placeId: chosenPlace };
}

function nextQuestion(filled: Known): EngineQuestion | null {
  if (!filled.action) {
    return {
      text: "What are they doing?",
      options: [
        { label: "Kissing", send: "kissing" },
        { label: "Missionary", send: "missionary" },
        { label: "From behind", send: "from behind" },
        { label: "On top", send: "on top" },
      ],
    };
  }

  if (!filled.place) {
    return {
      text: "Where is it set?",
      options: [
        { label: "Bedroom", send: "in the bedroom" },
        { label: "Bathroom", send: "in the bathroom" },
        { label: "Kitchen counter", send: "on the kitchen counter" },
        { label: "Balcony", send: "on the balcony" },
      ],
    };
  }

  return null;
}