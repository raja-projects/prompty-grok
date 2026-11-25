import { CAMERA_ANGLES, FRAMINGS } from "./camera";
import { dressesForAge, reshuffleFaceCuts, type PersonFields } from "./people";
import { buildPrompts } from "./prompt-builder";
import type { SceneFormState } from "./types";

export interface Variation {
  id: number;
  short: string;
  detailed: string;
  cast: string;
  angle: string;
}

const HAIR = [
  "Long straight",
  "Long wavy",
  "Long layered",
  "Long soft curls",
  "Thick long waves",
  "Extra long straight",
  "Hip length waves",
  "Shoulder length straight",
  "Low bun with loose strands",
  "Messy bun",
];

const BODIES = ["Slim", "Average", "Curvy", "Athletic", "Petite", "Tall"];

function pick<T>(list: T[], fallback: T): T {
  if (!list.length) return fallback;
  return list[Math.floor(Math.random() * list.length)]!;
}

function varyPeople(people: PersonFields[], regionIds: string[]): PersonFields[] {
  return reshuffleFaceCuts(people, regionIds).map((person) => {
    const outfits = dressesForAge(person.gender, person.age).filter((d) => d.id !== person.dressId);
    const next: PersonFields = {
      ...person,
      dressId: pick(outfits, { id: person.dressId } as { id: string }).id,
      bodyType: pick(BODIES, person.bodyType) as PersonFields["bodyType"],
    };
    if (person.gender === "woman") {
      next.hairStyle = pick(HAIR, person.hairStyle) as PersonFields["hairStyle"];
    }
    return next;
  });
}

export function buildVariations(form: SceneFormState): Variation[] {
  const angleIds = CAMERA_ANGLES.map((a) => a.id);
  const frameIds = FRAMINGS.map((f) => f.id);
  const baseA = Math.max(0, angleIds.indexOf(form.cameraAngle));
  const baseF = Math.max(0, frameIds.indexOf(form.framing));

  return Array.from({ length: 10 }, (_, i) => {
    const people =
      form.peopleCount === "group" ? form.people : varyPeople(form.people, form.regionIds);
    const variant: SceneFormState = {
      ...form,
      people,
      cameraAngle: angleIds[(baseA + i) % angleIds.length] as SceneFormState["cameraAngle"],
      framing: frameIds[(baseF + i) % frameIds.length] as SceneFormState["framing"],
    };
    const built = buildPrompts(variant);
    const cast =
      form.peopleCount === "group"
        ? "10 people"
        : people
            .map((p) => `${p.gender === "woman" ? "W" : p.gender === "man" ? "M" : "N"}${p.age}`)
            .join(" · ");
    return {
      id: i,
      short: built.short,
      detailed: built.detailed,
      cast,
      angle: CAMERA_ANGLES.find((a) => a.id === variant.cameraAngle)?.label ?? "",
    };
  });
}