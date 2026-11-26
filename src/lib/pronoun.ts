import type { GenderMix } from "./settings";

export interface Pack {
  subj: string;
  obj: string;
  poss: string;
}

export const FEMALE: Pack = { subj: "she", obj: "her", poss: "her" };
export const MALE: Pack = { subj: "he", obj: "him", poss: "his" };

const PAIRS: Partial<Record<GenderMix, [Pack, Pack]>> = {
  ff: [FEMALE, FEMALE],
  ffm: [MALE, FEMALE],
  mmf: [MALE, FEMALE],
  mmmf: [MALE, FEMALE],
  crowd: [MALE, FEMALE],
  mf: [MALE, FEMALE],
  "solo-f": [MALE, FEMALE],
};

/**
 * Clauses are authored male-actor. Where the actor is female the pronouns are
 * swapped and the first receiver reference becomes a noun, so two women never
 * collapse into "she ... her".
 */
export function applyCast(text: string, mix: GenderMix): string {
  const pair = PAIRS[mix];
  if (!pair) return text;
  const [actor] = pair;
  if (actor !== FEMALE) return text;
  const out = text
    .replace(/\bhe\b/g, "she")
    .replace(/\bHe\b/g, "She")
    .replace(/\bhis\b/g, "her")
    .replace(/\bHis\b/g, "Her")
    .replace(/\bhim\b/g, "her")
    .replace(/\bhimself\b/g, "herself");
  return out.replace(/\bher\b/, "the other woman");
}