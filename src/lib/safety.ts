/** Soft-language / adult-only safety helpers for prompt assembly. */

/** Always stripped — never allowed in any mode */
export const ALWAYS_FORBIDDEN = [
  "pre-teen",
  "preteen",
  "underage",
  "child porn",
  "cp ",
  "lolita",
  "too young",
  "too-young",
  "minor",
  "schoolboy",
  "schoolgirl",
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
  "AI-generated appearance, synthetic image, generative-art look, fake photograph, overprocessed image, " +
  "plastic skin, wax skin, waxy, doll-like, mannequin, porcelain doll, fake skin, airbrushed, " +
  "overly smooth skin, glossy plastic face, uncanny valley, artificial skin, beauty filter, excessive retouching, " +
  "repeated skin texture, smeared pores, painted hair, fused hair strands, unnatural catchlights, mismatched eye reflections, " +
  "face blush, underage, pre-teen, child, deformed, blurry, soft focus, motion blur, compression artifacts, watermark, low quality, " +
  "extra limbs, extra fingers, missing fingers, fused fingers, malformed hands, bad anatomy, impossible joints, duplicated features, " +
  "warped background, repeated background pattern, floating objects, inconsistent shadows, text overlay, logo, " +
  "female face hidden, woman face obscured, back of head only, faceless woman, " +
  "cropped female face, woman looking fully away with no visible face";

export const DEFAULT_QUALITY_PHRASE =
  "genuine high-resolution full-frame DSLR photograph of real human people, captured through a professional prime lens, " +
  "optically sharp focus on the eyes and faces, high micro-contrast and true photographic clarity without digital oversharpening, " +
  "physically plausible exposure, lens rendering, depth of field, perspective, shadows, reflections and natural color response, " +
  "lifelike human anatomy and proportions, candid micro-expressions, natural posture and believable interaction with gravity and surroundings, " +
  "authentic unretouched skin with unique pores, peach fuzz, fine lines, tiny blemishes and subtle uneven tonal variation, " +
  "realistic subsurface scattering without plastic, waxy or airbrushed skin, individually resolved eyelashes, eyebrows and hair strands, " +
  "real textile weave, seams, folds and material tension, coherent environmental detail and consistent lighting across every person, " +
  "crisp DSLR detail with gentle natural sensor grain and believable optical imperfections, clear visible female faces when women are present — " +
  "indistinguishable in appearance from an authentic professionally photographed real-life scene, not illustration, not CGI, not a 3D render, not a doll";

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
