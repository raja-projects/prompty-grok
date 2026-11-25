import { defaultPerson, dressesForAge, type Gender, type PersonFields } from "./people";

const KEY = "prompty-default-cast-v1";

interface Spec {
  gender: Gender;
  age: string;
  bodyType: string;
}

const SEED: Spec[] = [
  { gender: "woman", age: "21", bodyType: "Slim" },
  { gender: "woman", age: "24", bodyType: "Average" },
  { gender: "woman", age: "27", bodyType: "Curvy" },
  { gender: "man", age: "26", bodyType: "Athletic" },
  { gender: "man", age: "31", bodyType: "Average" },
  { gender: "man", age: "38", bodyType: "Tall" },
];

function make(spec: Spec): PersonFields {
  const person = defaultPerson({ gender: spec.gender, age: spec.age });
  person.bodyType = spec.bodyType;
  const list = dressesForAge(spec.gender, spec.age);
  if (list[0]) person.dressId = list[0].id;
  return person;
}

export function seededCast(): PersonFields[] {
  return SEED.map(make);
}

export function loadDefaultCast(): PersonFields[] {
  if (typeof window === "undefined") return seededCast();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return seededCast();
    const parsed = JSON.parse(raw) as PersonFields[];
    return Array.isArray(parsed) && parsed.length ? parsed : seededCast();
  } catch {
    return seededCast();
  }
}

export function saveDefaultCast(list: PersonFields[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function randomDefaultPeople(): PersonFields[] {
  const pool = loadDefaultCast();
  const women = pool.filter((p) => p.gender === "woman");
  const men = pool.filter((p) => p.gender === "man");
  const pick = (arr: PersonFields[]) => arr[Math.floor(Math.random() * arr.length)];
  const chosen = [pick(women) ?? pick(pool), pick(men) ?? pick(pool)].filter(
    (p): p is PersonFields => Boolean(p)
  );
  return chosen.map((p) => {
    const list = dressesForAge(p.gender, p.age);
    const valid = list.some((d) => d.id === p.dressId);
    return { ...p, dressId: valid ? p.dressId : list[0]?.id ?? p.dressId };
  });
}