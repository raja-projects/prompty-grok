/** Soft-language / adult-only safety helpers for prompt assembly. */

/** Always stripped — never allowed in any mode */
export const ALWAYS_FORBIDDEN = [
  "pre-teen",
  "preteen",
  "underage",
  "under-age",
  "child porn",
  "cp ",
  "lolita",
  "jailbait",
  "too young",
  "too-young",
  "minor",
  "schoolboy",
  "schoolgirl",
  "immature",
  "teen",
  "teenager",
] as const;

/** Soft path only — intimate/romance/everyday free text */
export const SOFT_FORBIDDEN = [
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
  "cowgirl",
  "doggy style",
  "creampie",
  "cumshot",
  "deepthroat",
  "threesome",
  "gangbang",
  "bdsm",
  "bondage",
] as const;

/** @deprecated use SOFT_FORBIDDEN — kept for imports */
export const FORBIDDEN_TERMS = SOFT_FORBIDDEN;

export const DEFAULT_NEGATIVE =
  "illustration, drawing, painting, anime, cartoon, comic, sketch, digital art, 3d render, cgi, " +
  "plastic skin, wax skin, waxy, doll-like, mannequin, porcelain doll, fake skin, airbrushed, " +
  "overly smooth skin, glossy plastic face, uncanny valley, artificial skin, beauty filter, " +
  "face blush, underage, pre-teen, child, deformed, blurry, watermark, low quality, " +
  "extra limbs, bad anatomy, text overlay, logo, " +
  "female face hidden, woman face obscured, back of head only, faceless woman, " +
  "cropped female face, woman looking fully away with no visible face";

export const DEFAULT_QUALITY_PHRASE =
  "real photograph, shot on camera, photorealistic documentary realism, natural skin with visible pores and fine texture, " +
  "realistic subsurface skin, no plastic or wax finish, authentic lighting, sharp focus, natural colors, " +
  "high clarity, crisp detail, clear visible female faces when women are present — not illustration, not CGI, not doll";

export type SanitizeMode = "soft" | "hardcore";

function stripTerms(input: string, terms: readonly string[]): string {
  let out = input;
  for (const term of terms) {
    const re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    out = out.replace(re, "");
  }
  return out.replace(/\s{2,}/g, " ").replace(/,\s*,/g, ",").trim();
}

/** Strip forbidden substrings. hardcore mode only strips ALWAYS_FORBIDDEN. */
export function sanitizeText(input: string, mode: SanitizeMode = "soft"): string {
  const terms =
    mode === "hardcore"
      ? ALWAYS_FORBIDDEN
      : ([...ALWAYS_FORBIDDEN, ...SOFT_FORBIDDEN] as string[]);
  return stripTerms(input, terms);
}

export function containsForbidden(input: string, mode: SanitizeMode = "soft"): boolean {
  const terms =
    mode === "hardcore"
      ? ALWAYS_FORBIDDEN
      : ([...ALWAYS_FORBIDDEN, ...SOFT_FORBIDDEN] as string[]);
  const lower = input.toLowerCase();
  return terms.some((t) => lower.includes(t.toLowerCase()));
}
