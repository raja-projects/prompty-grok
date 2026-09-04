/** Soft-language / adult-only safety helpers for prompt assembly. */

export const FORBIDDEN_TERMS = [
  "fuck",
  "fucking",
  "spooning",
  "missionary",
  "doggy",
  "anal",
  "oral",
  "blowjob",
  "handjob",
  "intercourse",
  "penetrat",
  "genital",
  "genitalia",
  "penis",
  "vagina",
  "vulva",
  "clitoris",
  "testicle",
  "scrotum",
  "nipple",
  "breasts",
  "breast",
  "nude",
  "naked",
  "nsfw",
  "porn",
  "xxx",
  "erotic",
  "orgasm",
  "aroused",
  "arousal",
  "face blush",
] as const;

export const DEFAULT_NEGATIVE =
  "face blush, aroused, arousal, explicit NSFW anatomy, deformed, blurry, watermark, low quality, " +
  "fuck, spooning, missionary, genitalia, penis, vagina, breasts as sexual focus, nude, naked, " +
  "extra limbs, bad anatomy, text overlay, logo";

export const DEFAULT_QUALITY_PHRASE =
  "photorealistic, high clarity, real photograph look, sharp focus, natural skin texture, natural colors, crisp detail";

/** Strip / block forbidden substrings from free text (case-insensitive). */
export function sanitizeText(input: string): string {
  let out = input;
  for (const term of FORBIDDEN_TERMS) {
    const re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    out = out.replace(re, "");
  }
  return out.replace(/\s{2,}/g, " ").replace(/,\s*,/g, ",").trim();
}

export function containsForbidden(input: string): boolean {
  const lower = input.toLowerCase();
  return FORBIDDEN_TERMS.some((t) => lower.includes(t.toLowerCase()));
}
