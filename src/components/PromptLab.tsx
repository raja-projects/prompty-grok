"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ACTION_CATEGORIES,
  ACTIONS,
  getActionById,
  isIntimateAction,
  categoryRequiresAdult21,
} from "@/lib/actions";
import { ASPECT_RATIOS, CAMERA_ANGLES, FRAMINGS, TIMES_OF_DAY } from "@/lib/camera";
import {
  PEOPLE_COUNTS,
  REGIONS,
  RELATIONSHIPS,
  defaultPerson,
  defaultDressId,
  dressesForAge,
  defaultFoursomeSwapPeople,
  defaultMmfPeople,
  defaultMmmfPeople,
  defaultFiveCouplesPeople,
  defaultFfmPeople,
  defaultCrowdPressPeople,
  defaultWlwPeople,
  relationshipBlocksIntimate,
  reshuffleFaceCuts,
  applyRegionLook,
  sceneHasUnder21,
  type PeopleCount,
  type Relationship,
  type Gender,
} from "@/lib/people";
import { PLACES } from "@/lib/places";
import {
  buildPrompts,
  createRandomizedDefaults,
  createStudioDefaults,
  DEFAULT_FORM,
} from "@/lib/prompt-builder";
import {
  clearRecent,
  deleteFavoritePerson,
  loadFavoritePeople,
  loadRecent,
  saveFavoritePerson,
  saveRecent,
  updateFavoritePerson,
} from "@/lib/storage";
import type { FavoritePerson, Mode, RecentPrompt, SceneFormState } from "@/lib/types";
import { CopyButton } from "./CopyButton";
import { ModeToggle } from "./ModeToggle";
import { PersonCard } from "./PersonCard";
import { RecentList } from "./RecentList";

const chipIdle =
  "border border-prompty-line bg-white text-prompty-ink hover:border-prompty-accent hover:text-prompty-accent";
const chipActive = "border border-prompty-accent bg-prompty-accentSoft text-prompty-accent font-semibold";

const ACTION_FAMILIES: { id: string; label: string; categories: string[] }[] = [
  { id: "basics", label: "Everyday", categories: ["everyday", "social", "physical"] },
  { id: "romance", label: "Romance", categories: ["romance", "intimate"] },
  { id: "hardcore", label: "Hardcore", categories: ["hardcore", "hardcore-grk"] },
  {
    id: "couples",
    label: "Couples",
    categories: ["swap-own-grk", "swap-cross-grk", "gf-exchange-grk", "five-couples-games"],
  },
  {
    id: "multi",
    label: "Multi",
    categories: ["mmf-grk", "mmmf-grk", "ffm-grk", "crowd-press-grk", "wlw-grk"],
  },
];

const SUBGROUPS: { id: string; label: string; words: string[] }[] = [
  { id: "threesome", label: "Threesome", words: ["threesome", "three"] },
  { id: "foursome", label: "Foursome", words: ["foursome", "four"] },
  { id: "group", label: "Group", words: ["group", "crowd", "gang", "five", "ten"] },
  { id: "butt", label: "Butt", words: ["butt", "rear", "glute", "ass"] },
  { id: "boobs", label: "Boobs", words: ["boob", "breast", "chest", "bust"] },
  { id: "oral", label: "Oral", words: ["oral", "mouth", "blow", "lick", "suck", "tongue"] },
  { id: "missionary", label: "Missionary", words: ["missionary"] },
  { id: "behind", label: "From behind", words: ["behind", "doggy", "rear entry"] },
  { id: "cowgirl", label: "On top", words: ["cowgirl", "riding", "on top", "straddle"] },
  { id: "standing", label: "Standing", words: ["standing", "against the wall", "upright"] },
  { id: "seated", label: "Seated", words: ["seated", "sitting", "chair", "on a lap"] },
  { id: "lying", label: "Lying", words: ["lying", "on her back", "on his back", "spoon"] },
  { id: "hands", label: "Hands", words: ["hand", "finger", "touch", "grip", "caress"] },
  { id: "kiss", label: "Kiss", words: ["kiss", "lip", "neck"] },
  { id: "move", label: "Walk / move", words: ["walk", "stroll", "dance", "run"] },
  { id: "look", label: "Look / pose", words: ["look", "gaze", "stare", "pose", "smile", "photo"] },
];

const ALIAS_MAP: Record<string, string[]> = {
  spooning: ["spoon", "side lying", "lying on side", "side by side", "big spoon", "hips against", "from the side", "lying behind", "cuddle lying", "curled behind"],
  missionary: ["missionary", "on her back", "lying under", "between her legs", "face to face", "legs around waist", "under him", "on the bed", "facing up", "classic position"],
  doggy: ["doggy", "from behind", "all fours", "hands and knees", "bent over", "rear", "kneeling behind", "hips pulled back", "face down hips up", "behind her"],
  cowgirl: ["cowgirl", "on top", "riding", "straddle", "sitting on him", "astride", "on his lap", "girl on top", "upright riding", "over him"],
  reverse: ["reverse", "facing away", "back to him", "reverse riding", "reverse straddle", "on top backwards", "facing her back", "reverse seat", "riding away", "back facing"],
  blowjob: ["blowjob", "oral", "mouth", "sucking", "bj", "fellatio", "licking", "head down", "tongue", "on knees"],
  handjob: ["handjob", "hand", "stroking", "grip", "fingers", "manual", "jerking", "palm", "rubbing", "wrist"],
  fingering: ["fingering", "fingers", "hand between", "digital", "exploring", "touching under", "rub between", "insert", "knuckles", "palm press"],
  cunnilingus: ["cunnilingus", "eating out", "mouth down", "licking her", "tongue down", "face between thighs", "going down on her", "oral on her", "tasting", "face buried"],
  sixty: ["69", "sixty nine", "mutual oral", "both mouths", "stacked", "inverted", "one over other", "face to groin", "double oral", "head to hips"],
  anal: ["anal", "ass", "rear entry", "back door", "bottom", "bum", "rear sex", "from the back", "behind anal", "deep behind"],
  titjob: ["titjob", "breasts", "boobs", "between breasts", "chest", "cleavage", "bust", "pressed together", "boob press", "wrapped"],
  butt: ["butt", "ass press", "pressing against", "grinding behind", "hips pressed", "bottom against", "bum press", "push back", "pressed rear", "contact"],
  boobs: ["boobs", "chest press", "breasts against", "bust press", "pressed chest", "front contact", "torso press", "chest to chest", "tight hug", "front press"],
  kiss: ["kiss", "kissing", "lips", "mouth to mouth", "make out", "lip lock", "peck", "mouth press", "kissing deep", "smooch"],
  neck: ["neck", "necking", "kissing neck", "nuzzle", "throat", "collar", "nape", "bite neck", "lips on neck", "neck nibble"],
  hug: ["hug", "embrace", "hold", "arms around", "cuddle", "wrap arms", "clinging", "clasp", "squeeze", "snuggle"],
  standing: ["standing", "upright", "vertical", "on feet", "standing against", "lifted", "supported", "standing hug", "up on toes", "held up"],
  sitting: ["sitting", "seated", "chair", "sofa", "couch", "on lap", "sitting on", "stool", "perched", "seated together"],
  straddle: ["straddle", "legs around", "lap sit", "facing straddle", "wrapped legs", "thigh over", "hips over", "astride lap", "sitting facing", "legs crossed behind"],
  legs: ["legs up", "ankles up", "raised legs", "legs over shoulders", "feet up", "knees to chest", "folded legs", "lifted legs", "legs in air", "ankles held"],
  bent: ["bent over", "leaning over", "folded", "hips back", "torso down", "hands down", "arch", "bow", "leaning down", "over the edge"],
  prone: ["face down", "prone", "on stomach", "flat", "lying front", "cheek down", "pillow face", "spread flat", "front down", "pressed flat"],
  grinding: ["grinding", "rubbing", "friction", "hips roll", "press rub", "slide", "rocking", "pelvis press", "dry rub", "rolling hips"],
  undress: ["undress", "undressing", "pulling off", "half off", "slipping down", "unbuttoned", "open shirt", "tugging", "peeling", "loosened"],
  tease: ["tease", "teasing", "slow", "drawn out", "hover", "almost", "feather", "light touch", "anticipation", "suspended"],
  deep: ["deep", "buried", "pressed in", "full", "bottomed", "sink", "drive", "rooted", "hilt", "flush"],
  fast: ["fast", "quick", "urgent", "hard pace", "rapid", "driving", "pounding", "frantic", "sharp", "brisk"],
  wall: ["wall", "against wall", "pinned to wall", "vertical wall", "wall press", "lifted at wall", "held to wall", "wall lean", "against door", "doorway"],
  table: ["table", "counter", "kitchen counter", "desk", "dining table", "over table", "worktop", "island", "sideboard", "ledge"],
  shower: ["shower", "bathing", "wet", "water", "steam", "bathroom", "washing", "soap", "drenched", "running water"],
  bed: ["bed", "on the bed", "mattress", "sheets", "pillow", "under covers", "bedroom", "blankets", "duvet", "lying in bed"],
};

function subgroupOf(action: { label: string; prompt: string }) {
  const hay = `${action.label} ${action.prompt}`.toLowerCase();
  return SUBGROUPS.find((s) => s.words.some((w) => hay.includes(w)))?.id ?? "other";
}

const CAMERA_RULES: Record<string, string[]> = {
  butt: ["behind", "back", "rear", "over the shoulder", "over-shoulder", "side-back", "low", "above"],
  behind: ["behind", "back", "rear", "over the shoulder", "over-shoulder", "side-back", "low"],
  anal: ["behind", "back", "rear", "over the shoulder", "over-shoulder", "low"],
  boobs: ["front", "face on", "eye level", "eye-level", "level", "front-facing"],
  missionary: ["above", "high", "top", "overhead", "side", "three-quarter"],
  lying: ["above", "high", "side", "three-quarter"],
  oral: ["above", "high", "top", "overhead"],
  cowgirl: ["low", "below", "upward", "eye"],
  seated: ["eye", "level", "side", "three-quarter"],
  standing: ["eye", "level", "side", "three-quarter"],
  kiss: ["eye", "level", "front", "three-quarter"],
  hands: ["eye", "level", "above"],
  threesome: ["above", "high", "side", "three-quarter"],
  foursome: ["above", "high", "side", "three-quarter"],
  group: ["above", "high", "side"],
};

const SHOT_NOTES: Record<string, string> = {
  butt: "camera placed behind her, her back and hips square to the lens, torso dipped slightly forward, his hands planted on her waist and pressing firmly in, her face turned back over her shoulder toward the camera",
  behind: "camera directly behind both of them, her back to the lens, hips lifted, his body pressed against her from behind, her face turned back over her shoulder",
  anal: "camera behind and slightly low, her back to the lens, hips raised, his hips flush against her rear, her face turned back toward the camera",
  boobs: "camera squarely in front of her, chest and face toward the lens, his hands and mouth at her chest, both faces in view",
  missionary: "camera high and off to one side, looking down across both bodies, her face and her raised legs clearly in frame",
  lying: "camera from the side at mattress height, both bodies in clear profile, faces visible",
  oral: "camera above and slightly in front, looking down over her face and his mouth on her",
  cowgirl: "camera low and in front, looking up at her above him, her face and torso filling the frame",
};

function cameraForSubgroup(group: string): string | null {
  const words = CAMERA_RULES[group];
  if (!words) return null;
  for (const word of words) {
    const hit = CAMERA_ANGLES.find((c) => c.label.toLowerCase().includes(word));
    if (hit) return hit.id;
  }
  return null;
}

const DRESS_MATCHES: string[][] = [["salwar"], ["co-ord kurta"], ["dhoti"], ["kurti", "leggings"], ["track"]];
const LIGHT_WORDS = ["light grey", "light", "off-white", "white", "cream", "beige", "ivory", "pastel", "pale", "sand"];
const MALE_BOTTOM_WORDS = ["trouser", "chino", "short", "track", "cargo", "jean", "boxer"];
const WOMAN_LONG_HAIR = [
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
const SWAP_CATEGORIES = ["swap-own-grk", "swap-cross-grk", "gf-exchange-grk"];
const BARE_OK_WORDS = ["beach", "pool", "resort", "bath", "shower", "bedroom", "bed", "home", "house", "garden", "terrace", "balcony", "lake", "river", "waterfall", "backwater"];
const SHIRTED_WORDS = ["shirt", "tee", "t-shirt", "vest", "hoodie", "kurta", "pathani"];

function dressHay(d: { label: string; prompt: string }) {
  return `${d.label} ${d.prompt}`.toLowerCase();
}

function bareAllowed(placeLabel: string) {
  const hay = placeLabel.toLowerCase();
  return BARE_OK_WORDS.some((w) => hay.includes(w));
}

function fixDressForPlace<T extends { gender: Gender; age: string; dressId: string }>(person: T, placeLabel: string): T {
  if (person.gender !== "man") return person;
  if (bareAllowed(placeLabel)) return person;
  const list = dressesForAge(person.gender, person.age);
  const current = list.find((d) => d.id === person.dressId);
  if (!current || !dressHay(current).includes("bare chest")) return person;
  const shirted = list.filter((d) => SHIRTED_WORDS.some((w) => dressHay(d).includes(w)));
  if (!shirted.length) return person;
  return { ...person, dressId: shirted[Math.floor(Math.random() * shirted.length)]!.id };
}

function pickWomanHair() {
  return WOMAN_LONG_HAIR[Math.floor(Math.random() * WOMAN_LONG_HAIR.length)]!;
}

function pickDressId(gender: Gender, age: string): string {
  const all = dressesForAge(gender, age);
  if (!all.length) return defaultDressId(gender);
  if (gender === "man") {
    const bottoms = all.filter((d) => MALE_BOTTOM_WORDS.some((w) => dressHay(d).includes(w)));
    if (!bottoms.length) return defaultDressId(gender);
    return bottoms[Math.floor(Math.random() * bottoms.length)]!.id;
  }
  if (gender !== "woman") return defaultDressId(gender);
  const pool = all.filter((d) => DRESS_MATCHES.some((g) => g.every((w) => dressHay(d).includes(w))));
  if (!pool.length) return defaultDressId(gender);
  const chosen = pool[Math.floor(Math.random() * pool.length)]!;
  if (dressHay(chosen).includes("track")) {
    const light = pool.filter((d) => dressHay(d).includes("track") && LIGHT_WORDS.some((w) => dressHay(d).includes(w)));
    if (light.length) return light[Math.floor(Math.random() * light.length)]!.id;
  }
  return chosen.id;
}

function makePerson(gender: "woman" | "man", age: string, bodyType: string) {
  const person = { ...defaultPerson({ gender, age }), bodyType, dressId: pickDressId(gender, age) };
  if (gender === "woman") person.hairStyle = pickWomanHair();
  return person;
}

function withRandomDress<T extends { gender: Gender; age: string; hairStyle: string }>(person: T): T {
  return {
    ...person,
    dressId: pickDressId(person.gender, person.age),
    ...(person.gender === "woman" ? { hairStyle: pickWomanHair() } : {}),
  };
}

function adjustPeopleCount(people: SceneFormState["people"], count: PeopleCount): SceneFormState["people"] {
  if (count === "group") return people;
  const n = Number(count);
  if (people.length === n) return people;
  if (people.length > n) return people.slice(0, n);
  const next = [...people];
  const ladder: { gender: "woman" | "man"; age: string; bodyType: string }[] = [
    { gender: "woman", age: "19", bodyType: "Petite" },
    { gender: "man", age: "30", bodyType: "Average" },
    { gender: "woman", age: "30", bodyType: "Average" },
    { gender: "man", age: "50", bodyType: "Average" },
  ];
  while (next.length < n) {
    const step = ladder[next.length % ladder.length]!;
    next.push(makePerson(step.gender, step.age, step.bodyType));
  }
  return next;
}

function buildCast(category: string): { count: PeopleCount; people: SceneFormState["people"]; relationship?: Relationship } | null {
  const a = () => [makePerson("woman", "19", "Petite"), makePerson("man", "30", "Average")];
  const b = () => [makePerson("woman", "30", "Average"), makePerson("man", "50", "Average")];
  switch (category) {
    case "swap-own-grk":
    case "swap-cross-grk":
    case "gf-exchange-grk":
      return { count: "4", people: [...a(), ...b()], relationship: "friends" };
    case "mmf-grk":
      return { count: "3", people: [makePerson("man", "32", "Average"), makePerson("woman", "21", "Slim"), makePerson("man", "45", "Average")], relationship: "friends" };
    case "ffm-grk":
      return { count: "3", people: [makePerson("woman", "21", "Slim"), makePerson("woman", "24", "Average"), makePerson("man", "34", "Average")], relationship: "friends" };
    case "mmmf-grk":
      return { count: "4", people: [makePerson("woman", "22", "Slim"), makePerson("man", "30", "Average"), makePerson("man", "36", "Athletic"), makePerson("man", "44", "Average")], relationship: "friends" };
    case "wlw-grk":
      return { count: "2", people: [makePerson("woman", "24", "Slim"), makePerson("woman", "28", "Average")], relationship: "couple" };
    case "crowd-press-grk":
      return { count: "2", people: [makePerson("man", "34", "Average"), makePerson("woman", "21", "Slim")], relationship: "strangers" };
    default:
      return null;
  }
}

function Bot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-prompty-accentSoft text-[12px] text-prompty-accent">
        ◍
      </span>
      <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[13px] leading-relaxed shadow-card">
        {children}
      </div>
    </div>
  );
}

function You({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-prompty-accentSoft px-3.5 py-2 text-[13px] text-prompty-ink">
        {children}
      </div>
    </div>
  );
}

export function PromptLab() {
  const [form, setForm] = useState<SceneFormState>(DEFAULT_FORM);
  const [hydrated, setHydrated] = useState(false);
  const [recent, setRecent] = useState<RecentPrompt[]>([]);
  const [savedFlash, setSavedFlash] = useState(false);
  const [actionQuery, setActionQuery] = useState("");
  const [actionFamily, setActionFamily] = useState("basics");
  const [actionPage, setActionPage] = useState(0);
  const [actionSubgroup, setActionSubgroup] = useState("all");
  const [favoritePeople, setFavoritePeople] = useState<FavoritePerson[]>([]);
  const [tab, setTab] = useState<"short" | "detailed">("short");
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [drawer, setDrawer] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setRecent(loadRecent());
    setFavoritePeople(loadFavoritePeople());
    const studio = createStudioDefaults();
    const placeLabel = PLACES.find((p) => p.id === studio.placeId)?.label ?? "";
    setForm({ ...studio, people: studio.people.map((p) => fixDressForPlace(withRandomDress(p), placeLabel)) });
    setHydrated(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [step, log.length]);

  const intimateBlocked = relationshipBlocksIntimate(form.relationship);
  const under21 = sceneHasUnder21(form.people, form.peopleCount);
  const prompts = useMemo(() => buildPrompts(form), [form]);
  const activeAction = getActionById(form.actionId);
  const activePlace = PLACES.find((p) => p.id === form.placeId);
  const searching = actionQuery.trim().length > 0;

  function rerollPeople(people: SceneFormState["people"]) {
    if (form.peopleCount === "group") return people;
    return reshuffleFaceCuts(people, form.regionIds).map((p) => ({
      ...p,
      dressId: pickDressId(p.gender, p.age),
      ...(p.gender === "woman" ? { hairStyle: pickWomanHair() } : {}),
    }));
  }

  const variations = useMemo(() => {
    const angleIds = CAMERA_ANGLES.map((a) => a.id);
    const frameIds = FRAMINGS.map((f) => f.id);
    const baseA = Math.max(0, angleIds.indexOf(form.cameraAngle));
    const baseF = Math.max(0, frameIds.indexOf(form.framing));
    return Array.from({ length: 10 }, (_, i) => {
      const people = form.peopleCount === "group" ? form.people : rerollPeople(form.people);
      const v: SceneFormState = {
        ...form,
        people,
        cameraAngle: angleIds[(baseA + i) % angleIds.length] as SceneFormState["cameraAngle"],
        framing: frameIds[(baseF + i) % frameIds.length] as SceneFormState["framing"],
      };
      const built = buildPrompts(v);
      const cast =
        form.peopleCount === "group"
          ? "10 people"
          : people.map((p) => `${p.gender === "woman" ? "W" : p.gender === "man" ? "M" : "N"}${p.age}`).join(" · ");
      return { id: i, short: built.short, detailed: built.detailed, cast, angle: CAMERA_ANGLES.find((a) => a.id === v.cameraAngle)?.label ?? "" };
    });
  }, [form]);

  const allText = variations.map((v) => (tab === "short" ? v.short : v.detailed)).join("\n\n———\n\n");

  function patch(partial: Partial<SceneFormState>) {
    setForm((prev) => {
      const next: SceneFormState = { ...prev, ...partial };

      if (partial.actionCategory && categoryRequiresAdult21(partial.actionCategory)) {
        next.people = next.people.map((p) => (Number(p.age) < 19 ? { ...p, age: "19" } : p));
        next.groupPeople = (next.groupPeople ?? []).map((p) => (Number(p.age) < 19 ? { ...p, age: "19" } : p));
      }

      if (partial.peopleCount && partial.peopleCount !== prev.peopleCount) {
        next.people = adjustPeopleCount(prev.people, partial.peopleCount);
      }

      if (SWAP_CATEGORIES.includes(partial.actionCategory ?? "")) {
        next.peopleCount = "4";
        next.people = defaultFoursomeSwapPeople();
        if (!relationshipBlocksIntimate("friends")) next.relationship = "friends";
        const cat = partial.actionCategory!;
        const first = ACTIONS.find((a) => a.category === cat) ?? getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== cat) {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      if (partial.actionCategory === "mmf-grk") {
        next.peopleCount = "3";
        next.people = defaultMmfPeople();
        if (!relationshipBlocksIntimate("friends")) next.relationship = "friends";
        const first = ACTIONS.find((a) => a.category === "mmf-grk") ?? getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== "mmf-grk") {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      if (partial.actionCategory === "mmmf-grk") {
        next.peopleCount = "4";
        next.people = defaultMmmfPeople();
        next.relationship = "friends";
        const first = ACTIONS.find((a) => a.category === "mmmf-grk") ?? getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== "mmmf-grk") {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      if (partial.actionCategory === "five-couples-games") {
        next.peopleCount = "group";
        next.relationship = "friends";
        next.crowdDescriptors =
          "exactly five established adult couples, ten consenting adults age 19+, dressed for a stylish private couples party, every face distinct and visible";
        next.groupPeople = defaultFiveCouplesPeople();
        const first = ACTIONS.find((a) => a.category === "five-couples-games");
        if (first) {
          next.actionId = first.id;
          next.actionCategory = first.category;
          if (first.placeHints?.length) next.placeId = first.placeHints[0]!;
        }
      }

      if (partial.actionCategory === "ffm-grk") {
        next.peopleCount = "3";
        next.people = defaultFfmPeople();
        if (!relationshipBlocksIntimate("friends")) next.relationship = "friends";
        const first = ACTIONS.find((a) => a.category === "ffm-grk") ?? getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== "ffm-grk") {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      if (partial.actionCategory === "crowd-press-grk") {
        next.peopleCount = "2";
        next.people = defaultCrowdPressPeople();
        next.relationship = "strangers";
        const first = ACTIONS.find((a) => a.category === "crowd-press-grk") ?? getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== "crowd-press-grk") {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      if (partial.actionCategory === "wlw-grk") {
        next.peopleCount = "2";
        next.people = defaultWlwPeople();
        if (!relationshipBlocksIntimate("couple")) next.relationship = "couple";
        const first = ACTIONS.find((a) => a.category === "wlw-grk") ?? getActionById(next.actionId);
        if (first && getActionById(next.actionId)?.category !== "wlw-grk") {
          next.actionId = first.id;
          next.actionCategory = first.category;
        }
      }

      if (partial.relationship) {
        if (relationshipBlocksIntimate(partial.relationship) && isIntimateAction(next.actionId)) {
          const fallback = ACTIONS.find((a) => a.category === "everyday");
          if (fallback) {
            next.actionCategory = fallback.category;
            next.actionId = fallback.id;
          }
        }
      }

      if (partial.actionId) {
        const action = getActionById(partial.actionId);
        if (action) {
          next.actionCategory = action.category;
          const sub = subgroupOf(action);
          const autoAngle = cameraForSubgroup(sub);
          if (autoAngle) next.cameraAngle = autoAngle as SceneFormState["cameraAngle"];
          else if (action.autoCamera) next.cameraAngle = action.autoCamera;
          if (action.autoFraming) next.framing = action.autoFraming;
          if (action.placeHints?.length) next.placeId = action.placeHints[0]!;

          const shot = SHOT_NOTES[sub];
          if (shot) {
            next.extraNotes = SWAP_CATEGORIES.includes(action.category)
              ? `${shot}. each man's attention stays fixed on the other man's wife — eyes on her, hands on her waist and hips — while each woman answers the other man, the two men almost never looking at each other`
              : shot;
          }
          if (action.prompt.trim().length < 45) {
            next.extraNotes = `${action.label}${next.extraNotes ? `. ${next.extraNotes}` : ""}`;
          }
        }
      }

      const castCategory = partial.actionId ? (getActionById(partial.actionId)?.category ?? next.actionCategory) : next.actionCategory;
      if (castCategory !== prev.actionCategory) {
        const cast = buildCast(castCategory);
        if (cast) {
          next.peopleCount = cast.count;
          next.people = cast.people;
          if (cast.relationship && !relationshipBlocksIntimate(cast.relationship)) next.relationship = cast.relationship;
        }
        if (SWAP_CATEGORIES.includes(castCategory)) {
          next.extraNotes =
            "each man's attention stays fixed on the other man's wife — eyes on her face and her body, hands on her waist and hips, leaning in close to her — while each woman answers the other man rather than her own, the two men almost never looking at each other, all four faces clearly visible";
        }
      }

      if (sceneHasUnder21(next.people, next.peopleCount)) {
        next.useCustomActionPrompt = false;
        next.customActionPrompt = "";
        if (next.relationship === "couple" || next.relationship === "married") next.relationship = "friends";
        if (categoryRequiresAdult21(next.actionCategory) || categoryRequiresAdult21(getActionById(next.actionId)?.category ?? "everyday")) {
          const fallback = ACTIONS.find((a) => a.category === "everyday");
          if (fallback) {
            next.actionCategory = fallback.category;
            next.actionId = fallback.id;
          }
        }
      }

      const placeLabel = PLACES.find((p) => p.id === next.placeId)?.label ?? "";
      next.people = next.people.map((p) => fixDressForPlace(p, placeLabel));
      if (next.groupPeople) next.groupPeople = next.groupPeople.map((p) => fixDressForPlace(p, placeLabel));

      return next;
    });
  }

  function persist() {
    if (!prompts.short.trim()) return;
    const list = saveRecent({
      mode: form.mode,
      subject: activeAction?.label ?? "Scene",
      short: prompts.short,
      detailed: prompts.detailed,
    });
    setRecent(list);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1400);
  }

  function startOver() {
    const next = createStudioDefaults();
    const placeLabel = PLACES.find((p) => p.id === next.placeId)?.label ?? "";
    setForm({ ...next, people: next.people.map((p) => fixDressForPlace(withRandomDress(p), placeLabel)) });
    setLog([]);
    setActionQuery("");
    setStep(1);
  }

  function randomizeAll() {
    const next = createRandomizedDefaults();
    const placeLabel = PLACES.find((p) => p.id === next.placeId)?.label ?? "";
    setForm({ ...next, people: next.people.map((p) => fixDressForPlace(withRandomDress(p), placeLabel)) });
    setActionQuery("");
  }

  function saveCurrentPerson(index: number) {
    const person = form.people[index];
    if (!person) return;
    const name = window.prompt("Name this person", `Person ${index + 1}`);
    if (name === null) return;
    setFavoritePeople(saveFavoritePerson(name, person));
  }

  function submitText(e: React.FormEvent) {
    e.preventDefault();
    const q = draft.trim();
    if (!q) return;
    setLog((l) => [...l, q]);
    setDraft("");

    const hits = searchActions(q);
    if (hits.length) {
      setActionQuery(q);
      setStep(2);
      if (hits.length === 1) {
        patch({ actionId: hits[0]!.id, useCustomActionPrompt: false });
        setActionQuery("");
      }
    } else {
      patch({ customActionPrompt: q, useCustomActionPrompt: true });
      setActionQuery("");
      setStep(3);
    }
  }

  const visibleCategories = ACTION_CATEGORIES.filter((c) => {
    if (
      (c.id === "intimate" || c.id === "hardcore" || c.id === "hardcore-grk" || c.id === "swap-own-grk" || c.id === "swap-cross-grk" || c.id === "gf-exchange-grk" || c.id === "five-couples-games" || c.id === "mmf-grk" || c.id === "mmmf-grk" || c.id === "ffm-grk" || c.id === "crowd-press-grk" || c.id === "wlw-grk") &&
      intimateBlocked
    )
      return false;
    if (under21 && categoryRequiresAdult21(c.id)) return false;
    return true;
  });

  const visibleIds = visibleCategories.map((c) => c.id);

  function searchActions(raw: string) {
    const tokens = raw.toLowerCase().split(/[\s,]+/).filter((t) => t.length > 1);
    if (!tokens.length) return [];

    const expanded: string[] = [];
    for (const token of tokens) {
      expanded.push(token);
      const aliases = ALIAS_MAP[token];
      if (aliases) expanded.push(...aliases);
    }
    const terms = Array.from(new Set(expanded));

    return ACTIONS.filter((a) => visibleIds.includes(a.category))
      .map((a) => {
        const label = a.label.toLowerCase();
        const hay = `${label} ${a.prompt} ${
          ACTION_CATEGORIES.find((c) => c.id === a.category)?.label ?? ""
        } ${subgroupOf(a)}`.toLowerCase();
        let score = 0;
        for (const term of terms) {
          if (label.includes(term)) score += 3;
          else if (hay.includes(term)) score += 1;
        }
        return { a, score };
      })
      .filter((x) => x.score > 0)
      .sort((x, y) => y.score - x.score)
      .map((x) => x.a)
      .slice(0, 40);
  }

  const searchResults = searching ? searchActions(actionQuery) : [];

  const familyOfCategory = ACTION_FAMILIES.find((f) => f.categories.includes(form.actionCategory))?.id;
  const effectiveFamily =
    ACTION_FAMILIES.find((f) => f.id === actionFamily && f.categories.some((id) => visibleIds.includes(id)))?.id ?? familyOfCategory ?? "basics";
  const familyCategories = visibleCategories.filter((c) => ACTION_FAMILIES.find((f) => f.id === effectiveFamily)?.categories.includes(c.id));
  const shownCategory = familyCategories.some((c) => c.id === form.actionCategory) ? form.actionCategory : familyCategories[0]?.id;
  const shownActions = ACTIONS.filter((a) => a.category === shownCategory);
  const taggedActions = shownActions.map((action) => ({ action, group: subgroupOf(action) }));
  const presentSubgroups = SUBGROUPS.filter((s) => taggedActions.some((t) => t.group === s.id));
  const hasOther = taggedActions.some((t) => t.group === "other");
  const subgroupOptions = hasOther ? [...presentSubgroups, { id: "other", label: "Other", words: [] }] : presentSubgroups;
  const activeSubgroup = subgroupOptions.some((s) => s.id === actionSubgroup) ? actionSubgroup : "all";
  const filteredActions = activeSubgroup === "all" ? shownActions : taggedActions.filter((t) => t.group === activeSubgroup).map((t) => t.action);

  const PAGE_SIZE = 10;
  const pageCount = Math.max(1, Math.ceil(filteredActions.length / PAGE_SIZE));
  const safePage = Math.min(actionPage, pageCount - 1);
  const pageActions = filteredActions.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    setActionPage(0);
  }, [shownCategory, effectiveFamily, actionQuery, actionSubgroup]);

  const personSlots = form.peopleCount === "group" ? 0 : Number(form.peopleCount);

  return (
    <div className="flex min-h-screen bg-prompty-page text-prompty-ink">
      <aside className="hidden w-[248px] shrink-0 flex-col border-r border-prompty-line bg-white px-2.5 py-3 lg:flex">
        <div className="mb-3 flex items-center gap-2 px-1">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-prompty-accent text-[13px] text-white">◍</span>
          <p className="text-[13px] font-bold">Prompty</p>
        </div>

        <button
          type="button"
          onClick={startOver}
          className="mb-3 rounded-lg bg-prompty-ink px-3 py-2 text-[12px] font-semibold text-white"
        >
          New scene
        </button>

        <p className="mb-1 px-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-prompty-muted">
          Saved people
        </p>
        <div className="mb-3 space-y-0.5">
          {favoritePeople.length ? (
            favoritePeople.map((f) => (
              <div key={f.id} className="group flex items-center gap-1 rounded-lg px-1.5 py-1 hover:bg-prompty-page">
                <button
                  type="button"
                  onClick={() => {
                    const people = [...form.people];
                    people[0] = { ...f.person };
                    patch({ people, peopleCount: form.peopleCount === "group" ? "1" : form.peopleCount });
                  }}
                  className="flex-1 truncate text-left text-[12px]"
                >
                  {f.name}
                </button>
                <button
                  type="button"
                  onClick={() => setFavoritePeople(deleteFavoritePerson(f.id))}
                  className="text-[11px] text-prompty-muted opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className="px-1 text-[11px] text-prompty-muted">None yet</p>
          )}
        </div>

        <p className="mb-1 px-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-prompty-muted">
          Recent
        </p>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <RecentList items={recent} onClear={() => { clearRecent(); setRecent([]); }} onReuse={(item) => patch({ mode: item.mode })} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-prompty-line bg-white/95 px-4 py-2 backdrop-blur">
          <div className="mr-auto">
            <p className="text-[13px] font-semibold">New scene</p>
            <p className="text-[10.5px] text-prompty-muted">
              {activePlace?.label} · {activeAction?.label ?? "nothing picked"}
            </p>
          </div>
          <ModeToggle mode={form.mode} onChange={(mode: Mode) => patch({ mode })} />
          <div className="flex rounded-lg border border-prompty-line p-0.5">
            {(["short", "detailed"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-[6px] px-2.5 py-1 text-[11px] font-semibold capitalize ${
                  tab === t ? "bg-prompty-ink text-white" : "text-prompty-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </header>

        <div className="mx-auto w-full max-w-[720px] flex-1 space-y-3 px-4 py-4">
          {under21 ? (
            <p className="rounded-lg border border-prompty-warn/30 bg-prompty-warnSoft px-3 py-2 text-[11.5px] text-prompty-warn">
              Someone is under 19 — limited to Everyday, Social and Play.
            </p>
          ) : null}

          <Bot>
            Hi. Tell me the action, or tap through the steps — who&apos;s in the scene first.
            {step > 1 ? (
              <button type="button" onClick={() => setStep(1)} className="ml-1 text-[11px] text-prompty-accent underline">
                change
              </button>
            ) : null}
          </Bot>

          {step >= 1 ? (
            <div className="ml-9 space-y-2">
              {log.length ? <You>{log[0]}</You> : null}
              <div className="flex flex-wrap gap-1.5">
                {favoritePeople.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      const people = [...form.people];
                      people[0] = { ...f.person };
                      patch({ people, peopleCount: form.peopleCount === "group" ? "1" : form.peopleCount });
                    }}
                    className={`rounded-pill px-3 py-1.5 text-[11.5px] font-medium ${chipIdle}`}
                  >
                    {f.name}
                  </button>
                ))}
                {form.peopleCount !== "group"
                  ? form.people.slice(0, personSlots).map((p, i) => (
                      <span key={i} className="flex items-center gap-1 rounded-pill border border-prompty-line bg-white px-2.5 py-1.5 text-[11.5px]">
                        {i + 1} · {p.gender === "woman" ? "W" : p.gender === "man" ? "M" : "N"}
                        {p.age}
                        <button type="button" onClick={() => saveCurrentPerson(i)} className="text-[10px] text-prompty-accent">
                          save
                        </button>
                      </span>
                    ))
                  : null}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {(["1", "2", "3", "4"] as PeopleCount[]).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => patch({ peopleCount: n })}
                    className={`h-7 w-7 rounded-pill text-[11.5px] font-semibold ${form.peopleCount === n ? chipActive : chipIdle}`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, people: p.peopleCount === "group" ? p.people : reshuffleFaceCuts(p.people, p.regionIds) }))}
                  className={`rounded-pill px-2.5 py-1.5 text-[11px] ${chipIdle}`}
                >
                  new faces
                </button>
                <button type="button" onClick={() => setDrawer(true)} className={`rounded-pill px-2.5 py-1.5 text-[11px] ${chipIdle}`}>
                  edit details
                </button>
              </div>

              {step === 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-lg bg-prompty-accent px-3 py-1.5 text-[12px] font-semibold text-white"
                >
                  Next
                </button>
              ) : null}
            </div>
          ) : null}

          {step >= 2 ? (
            <>
              <Bot>
                What happens?
                {step > 2 ? (
                  <button type="button" onClick={() => setStep(2)} className="ml-1 text-[11px] text-prompty-accent underline">
                    change
                  </button>
                ) : null}
              </Bot>
              <div className="ml-9 space-y-2">
                {log.length > 1 ? <You>{log[log.length - 1]}</You> : null}
                <div className="relative">
                  <input
                    ref={searchRef}
                    type="search"
                    value={actionQuery}
                    onChange={(e) => setActionQuery(e.target.value)}
                    placeholder="butt press, anal press, missionary…"
                    className="w-full rounded-pill border border-prompty-line bg-white px-3 py-2 text-[12px] outline-none focus:border-prompty-accent"
                  />
                </div>

                {searching ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    {searchResults.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => { patch({ actionId: a.id, useCustomActionPrompt: false }); setActionQuery(""); }}
                        className={`rounded-lg px-2.5 py-2 text-left text-[11.5px] ${chipIdle}`}
                      >
                        {a.label}
                      </button>
                    ))}
                    {!searchResults.length ? (
                      <button
                        type="button"
                        onClick={() => {
                          patch({ customActionPrompt: actionQuery.trim(), useCustomActionPrompt: true });
                          setActionQuery("");
                          setStep(3);
                        }}
                        className="rounded-lg border border-prompty-accent bg-prompty-accentSoft px-2.5 py-2 text-left text-[11.5px] font-medium text-prompty-accent"
                      >
                        Use “{actionQuery.trim()}” as my own words
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-1">
                      {ACTION_FAMILIES.map((f) => {
                        if (!f.categories.some((id) => visibleIds.includes(id))) return null;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setActionFamily(f.id)}
                            className={`rounded-pill px-2.5 py-1 text-[11px] font-medium ${effectiveFamily === f.id ? chipActive : chipIdle}`}
                          >
                            {f.label}
                          </button>
                        );
                      })}
                    </div>
                    {familyCategories.length > 1 ? (
                      <div className="flex flex-wrap gap-1">
                        {familyCategories.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              const first = ACTIONS.find((a) => a.category === c.id);
                              if (first) patch({ actionId: first.id, useCustomActionPrompt: false });
                            }}
                            className={`rounded-pill px-2.5 py-1 text-[10.5px] ${shownCategory === c.id ? chipActive : chipIdle}`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    ) : null}
                    {subgroupOptions.length > 1 ? (
                      <div className="flex flex-wrap gap-1">
                        <button type="button" onClick={() => setActionSubgroup("all")} className={`rounded-pill px-2.5 py-1 text-[10.5px] ${activeSubgroup === "all" ? chipActive : chipIdle}`}>
                          All {shownActions.length}
                        </button>
                        {subgroupOptions.map((s) => (
                          <button key={s.id} type="button" onClick={() => setActionSubgroup(s.id)} className={`rounded-pill px-2.5 py-1 text-[10.5px] ${activeSubgroup === s.id ? chipActive : chipIdle}`}>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    ) : null}

                    <div className="grid grid-cols-2 gap-1.5">
                      {pageActions.map((a) => {
                        const active = form.actionId === a.id && !form.useCustomActionPrompt;
                        return (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => patch({ actionId: a.id, useCustomActionPrompt: false })}
                            className={`rounded-lg px-2.5 py-2 text-left text-[11.5px] leading-snug ${active ? chipActive : chipIdle}`}
                          >
                            {a.label}
                          </button>
                        );
                      })}
                    </div>

                    {pageCount > 1 ? (
                      <div className="flex items-center justify-between">
                        <button type="button" onClick={() => setActionPage(Math.max(0, safePage - 1))} disabled={safePage === 0} className="text-[11px] text-prompty-muted disabled:opacity-30">
                          ← Prev
                        </button>
                        <span className="text-[11px] text-prompty-muted">{safePage + 1} / {pageCount}</span>
                        <button type="button" onClick={() => setActionPage(Math.min(pageCount - 1, safePage + 1))} disabled={safePage === pageCount - 1} className="text-[11px] text-prompty-muted disabled:opacity-30">
                          Next →
                        </button>
                      </div>
                    ) : null}
                  </>
                )}

                {step === 2 ? (
                  <button type="button" onClick={() => setStep(3)} className="rounded-lg bg-prompty-accent px-3 py-1.5 text-[12px] font-semibold text-white">
                    Next
                  </button>
                ) : null}
              </div>
            </>
          ) : null}

          {step >= 3 ? (
            <>
              <Bot>
                Where, and when?
                {step > 3 ? (
                  <button type="button" onClick={() => setStep(3)} className="ml-1 text-[11px] text-prompty-accent underline">
                    change
                  </button>
                ) : null}
              </Bot>
              <div className="ml-9 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {PLACES.slice(0, 14).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => patch({ placeId: p.id })}
                      className={`rounded-pill px-2.5 py-1.5 text-[11px] ${form.placeId === p.id ? chipActive : chipIdle}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <select value={form.placeId} onChange={(e) => patch({ placeId: e.target.value })} className="rounded-pill border border-prompty-line bg-white px-2 py-1.5 text-[11px] outline-none">
                    {PLACES.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                  <select value={form.timeOfDay} onChange={(e) => patch({ timeOfDay: e.target.value as SceneFormState["timeOfDay"] })} className="rounded-pill border border-prompty-line bg-white px-2 py-1.5 text-[11px] outline-none">
                    {TIMES_OF_DAY.map((t) => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                  <select value={form.aspectRatio} onChange={(e) => patch({ aspectRatio: e.target.value as SceneFormState["aspectRatio"] })} className="rounded-pill border border-prompty-line bg-white px-2 py-1.5 text-[11px] outline-none">
                    {ASPECT_RATIOS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                {step === 3 ? (
                  <button type="button" onClick={() => setStep(4)} className="rounded-lg bg-prompty-accent px-3 py-1.5 text-[12px] font-semibold text-white">
                    Give me 10
                  </button>
                ) : null}
              </div>
            </>
          ) : null}

          {step >= 4 ? (
            <>
              <Bot>
                Ten ready — different faces and angles in each. Copy any.
                <button type="button" onClick={() => setStep(3)} className="ml-1 text-[11px] text-prompty-accent underline">
                  change
                </button>
              </Bot>
              <div className="ml-9 grid grid-cols-2 gap-2">
                {variations.map((v, i) => (
                  <div key={v.id} className="rounded-xl border border-prompty-line bg-white p-2.5">
                    <p className="mb-1 text-[10px] font-semibold text-prompty-muted">
                      {i + 1} · {v.cast}
                    </p>
                    <p className="mb-2 truncate text-[10px] text-prompty-muted">{v.angle}</p>
                    <CopyButton text={tab === "short" ? v.short : v.detailed} label={`Copy ${i + 1}`} compact />
                  </div>
                ))}
              </div>
              <div className="ml-9 flex flex-wrap gap-1.5">
                <CopyButton text={allText} label="Copy all 10" />
                <button type="button" onClick={persist} className="rounded-lg bg-prompty-ink px-3 py-2 text-[12px] font-semibold text-white">
                  {savedFlash ? "Saved" : "Save scene"}
                </button>
                <button type="button" onClick={randomizeAll} className={`rounded-lg px-3 py-2 text-[12px] font-semibold ${chipIdle}`}>
                  Shuffle everything
                </button>
                <button type="button" onClick={startOver} className={`rounded-lg px-3 py-2 text-[12px] font-semibold ${chipIdle}`}>
                  Start over
                </button>
              </div>
            </>
          ) : null}

          <div ref={bottomRef} />
        </div>

        <form onSubmit={submitText} className="sticky bottom-0 border-t border-prompty-line bg-white/95 px-4 py-2.5 backdrop-blur">
          <div className="mx-auto flex max-w-[720px] items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="type anything — butt press, anal press, missionary…"
              className="flex-1 rounded-pill border border-prompty-line bg-white px-3.5 py-2 text-[12.5px] outline-none focus:border-prompty-accent"
            />
            <button type="submit" className="grid h-9 w-9 place-items-center rounded-full bg-prompty-accent text-[14px] text-white">
              →
            </button>
          </div>
        </form>
      </div>

      {drawer ? (
        <>
          <div className="fixed inset-0 z-40 bg-prompty-ink/40" onClick={() => setDrawer(false)} aria-hidden />
          <aside className="on-ink fixed right-0 top-0 z-50 h-screen w-full overflow-y-auto bg-prompty-inkPanel p-3 sm:w-[440px]">
            <div className="mb-3 flex items-center gap-2">
              <p className="mr-auto text-[12px] font-semibold text-white">Cast details</p>
              <button type="button" onClick={() => setDrawer(false)} className="grid h-7 w-7 place-items-center rounded-full border border-prompty-inkLine text-[12px] text-prompty-inkMuted hover:text-white">
                ✕
              </button>
            </div>
            <div className="space-y-1.5">
              {form.peopleCount !== "group"
                ? form.people.slice(0, personSlots).map((person, i) => (
                    <PersonCard
                      key={i}
                      index={i}
                      person={person}
                      regionIds={form.regionIds}
                      favoritePeople={favoritePeople}
                      onSelectFavorite={(f) => {
                        const people = [...form.people];
                        people[i] = { ...f.person };
                        patch({ people });
                      }}
                      onSaveFavorite={() => saveCurrentPerson(i)}
                      allowUnder19={["everyday", "social", "physical"].includes(form.actionCategory)}
                      onChange={(p) => {
                        const people = [...form.people];
                        people[i] = p;
                        patch({ people });
                      }}
                    />
                  ))
                : null}
            </div>
            <div className="mt-3">
              <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-prompty-inkMuted">Region look</p>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {REGIONS.map((r) => {
                  const on = form.regionIds.includes(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        const regionIds = on ? form.regionIds.filter((x) => x !== r.id) : [...form.regionIds, r.id];
                        const nextIds = regionIds.length ? regionIds : ["kerala"];
                        setForm((prev) => ({
                          ...prev,
                          regionIds: nextIds,
                          people: prev.peopleCount === "group" ? prev.people : applyRegionLook(prev.people, nextIds),
                        }));
                      }}
                      className={`shrink-0 rounded-pill px-2 py-1 text-[10.5px] ${on ? chipActive : chipIdle}`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </div>
  );
}