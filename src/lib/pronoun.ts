import type { GenderMix } from "./settings";

export type Gender = "f" | "m";
export type Receiver = Gender | "none";

export interface Cast {
  actor: Gender;
  receiver: Receiver;
}

const PACK: Record<Gender, { subj: string; obj: string; poss: string; self: string }> = {
  f: { subj: "she", obj: "her", poss: "her", self: "herself" },
  m: { subj: "he", obj: "him", poss: "his", self: "himself" },
};

/** Which pair the clause is about. The mix alone cannot say it. */
export function castFor(mix: GenderMix, contact?: string): Cast {
  if (mix === "solo-f") return { actor: "f", receiver: "none" };
  if (mix === "ff") return { actor: "f", receiver: "f" };
  if (contact === "tribbing") return { actor: "f", receiver: "f" };
  // mf, ffm, mmf, mmmf, crowd: the clause is the man and her.
  // Second and third bodies are named by extraCast, never here.
  return { actor: "m", receiver: "f" };
}

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/**
 * Clauses are authored male-actor, female-receiver.
 * Every receiver reference is tokenised, so none is missed and the first
 * same-gender receiver becomes a noun instead of an ambiguous "her".
 */
export function applyCast(text: string, cast: Cast): string {
  const a = PACK[cast.actor];

  let out = text
    .replace(/\bhimself\b/g, "\u0001SELF")
    .replace(/\bhim\b/g, "\u0001OBJ")
    .replace(/\bhis\b/g, "\u0001POSS")
    .replace(/\bHis\b/g, "\u0001POSSC")
    .replace(/\bhe\b/g, "\u0001SUBJ")
    .replace(/\bHe\b/g, "\u0001SUBJC")
    .replace(/\bher\b/g, "\u0001RECV");

  let named = false;
  out = out.replace(/\u0001RECV/g, () => {
    if (cast.receiver === "none") return a.obj;
    if (cast.receiver === cast.actor) {
      if (!named) {
        named = true;
        return cast.actor === "f" ? "the other woman" : "the other man";
      }
      return a.obj;
    }
    return a.obj;
  });

  return out
    .replace(/\u0001SUBJC/g, cap(a.subj))
    .replace(/\u0001SUBJ/g, a.subj)
    .replace(/\u0001POSSC/g, cap(a.poss))
    .replace(/\u0001POSS/g, a.poss)
    .replace(/\u0001OBJ/g, a.obj)
    .replace(/\u0001SELF/g, a.self);
}