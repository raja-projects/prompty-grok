import { getActionById, isHardcoreAction, isIntimateAction, actionRequiresAdult21, randomEverydayOrSocialAction } from "./actions";
import {
  CAMERA_ANGLES,
  FRAMINGS,
  TIMES_OF_DAY,
  randomCameraDefaults,
} from "./camera";
import {
  DEFAULT_REGION_IDS,
  defaultPeopleForCount,
  defaultPerson,
  regionCues,
  relationshipBlocksIntimate,
  sceneHasUnder21,
  type PersonFields,
} from "./people";
import { defaultFaceCutId, getFaceCut } from "./face-cuts";
import { getDress } from "./dresses";
import { getPlaceById, randomPlace } from "./places";
import {
  DEFAULT_NEGATIVE,
  DEFAULT_QUALITY_PHRASE,
  sanitizeText,
} from "./safety";
import type { BuiltPrompts, SceneFormState } from "./types";

function clean(parts: Array<string | undefined | null | false>): string {
  return parts
    .map((p) => (typeof p === "string" ? p.trim() : ""))
    .filter(Boolean)
    .join(", ");
}

function sentence(parts: Array<string | undefined | null | false>): string {
  const text = parts
    .map((p) => (typeof p === "string" ? p.trim() : ""))
    .filter(Boolean)
    .join(". ");
  if (!text) return "";
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function describePerson(p: PersonFields, index: number, regionIds?: string[], faceCutPool?: "general" | "known"): string {
  const label = `person ${index + 1}`;
  const faceCut = getFaceCut(p.gender, p.faceCutId, p.age, regionIds, faceCutPool);
  const face = faceCut?.prompt;
  const dress = getDress(p.gender, p.dressId)?.prompt ?? p.dressId;
  const ageNum = p.age || "24";
  const regionLock = faceCut?.regionIds?.length
    ? `phenotype locked to ${faceCut.regionIds.join(" / ")} region look`
    : "";
  return clean([
    `${label}: ${p.gender}`,
    `exactly ${ageNum} years old`,
    regionLock,
    `${p.skinTone} skin tone`,
    `${p.bodyType} build`,
    /youthful|innocent|fresh-faced|delicate|boyish/i.test(p.bodyType)
      ? "clearly adult 21+ appearance — not underage, not teen"
      : "",
    `${p.hairColor} ${p.hairStyle} hair`,
    face ? `face: ${face}` : "",
    p.gender === "woman" ? "beautiful and attractive" : "",
    `wearing complete outfit: ${dress}`,
    `${p.fashionVibe} vibe`,
  ]);
}

function peopleBlock(state: SceneFormState): string {
  if (state.peopleCount === "group") {
    const crowd = sanitizeText(state.crowdDescriptors) ||
      "a diverse adult group, ages 21 and above, natural expressions";
    return `group of five or more adults (${crowd})`;
  }
  const n = Number(state.peopleCount);
  const listed = state.people
    .slice(0, n)
    .map((p, i) => describePerson(p, i, state.regionIds, state.faceCutPool))
    .join("; ");
  return listed || `${n} adult${n > 1 ? "s" : ""}`;
}

function relationshipPhrase(state: SceneFormState): string {
  if (state.peopleCount === "1") return "";
  return `${state.relationship} relationship`;
}

function lightingFor(state: SceneFormState): string {
  return TIMES_OF_DAY.find((t) => t.id === state.timeOfDay)?.lighting ?? "";
}


function sceneHasWoman(state: SceneFormState): boolean {
  if (state.peopleCount === "group") return true;
  const n = Number(state.peopleCount);
  return state.people.slice(0, n).some((p) => p.gender === "woman");
}

/** Keep her face readable in any angle or pose. */
function femaleFaceVisibleCue(state: SceneFormState): string {
  if (!sceneHasWoman(state)) return "";
  const rear =
    state.cameraAngle === "back" || state.cameraAngle === "over-shoulder";
  if (rear) {
    return "her face stays clearly visible — even from behind she turns her head over her shoulder so you can see her face";
  }
  return "her face stays clearly visible in frame";
}

function femaleBeautyCue(state: SceneFormState): string {
  if (!sceneHasWoman(state)) return "";
  return "she looks beautiful and attractive";
}

function cameraPhrase(state: SceneFormState): string {
  const angle =
    CAMERA_ANGLES.find((a) => a.id === state.cameraAngle)?.prompt ?? "";
  const framing =
    FRAMINGS.find((f) => f.id === state.framing)?.prompt ?? "";
  return clean([angle, framing, `aspect ratio ${state.aspectRatio}`]);
}

function enforceRelationshipSafety(state: SceneFormState): SceneFormState {
  const blocked = relationshipBlocksIntimate(state.relationship);
  if (!blocked) return state;
  if (!isIntimateAction(state.actionId)) return state;
  const fallback = randomEverydayOrSocialAction();
  return {
    ...state,
    actionCategory: fallback.category,
    actionId: fallback.id,
  };
}


function enforceAgeCategorySafety(state: SceneFormState): SceneFormState {
  if (!sceneHasUnder21(state.people, state.peopleCount)) return state;
  if (!actionRequiresAdult21(state.actionId) && !["romance","intimate","hardcore","hardcore-grk"].includes(state.actionCategory)) {
    return state;
  }
  const fallback = randomEverydayOrSocialAction();
  return {
    ...state,
    actionCategory: fallback.category,
    actionId: fallback.id,
  };
}

export function buildPrompts(raw: SceneFormState): BuiltPrompts {
  const state = enforceAgeCategorySafety(enforceRelationshipSafety(raw));
  const action = getActionById(state.actionId);
  const place = getPlaceById(state.placeId);
  const actionText = action?.prompt ?? "posed naturally";
  const placeText = place?.prompt ?? "an everyday setting";
  const regions = regionCues(state.regionIds);
  const people = peopleBlock(state);
  const rel = relationshipPhrase(state);
  const lighting = lightingFor(state);
  const camera = cameraPhrase(state);
  const sanitizeMode = isHardcoreAction(state.actionId) ? "hardcore" : "soft";

  const faceVisibleCue = femaleFaceVisibleCue(state);
  const beautyCue = femaleBeautyCue(state);

  const notes = sanitizeText(state.extraNotes, sanitizeMode);
  const quality = DEFAULT_QUALITY_PHRASE;

  const short = sanitizeText(
    clean([
      "real photograph shot on camera",
      people,
      rel,
      regions ? `appearance cues: ${regions}` : "",
      actionText,
      faceVisibleCue,
      beautyCue,
      `at ${placeText}`,
      `${state.timeOfDay} lighting`,
      camera,
      quality,
      state.mode === "video" ? "natural camera motion, real movement" : "still real photo",
      notes,
    ])
, sanitizeMode);

  const detailed = sanitizeText(
    sentence([
      `Photorealistic real photograph of ${people}`,
      rel ? `They share a ${rel}` : "",
      regions ? `Cultural/appearance cues: ${regions}` : "",
      `Action: ${actionText}`,
      `Setting: ${placeText}`,
      `Time: ${state.timeOfDay} with ${lighting}`,
      faceVisibleCue ? `Face visibility: ${faceVisibleCue}` : "",
      beautyCue ? `Beauty: ${beautyCue}` : "",
      `Camera: ${camera}`,
      `Quality: ${quality}`,
      state.mode === "video"
        ? "Motion: natural continuous movement suitable for short video"
        : "Still image with documentary realism",
      notes ? `Notes: ${notes}` : "",
    ])
, sanitizeMode);

  const negative = sanitizeText(
    state.negativePrompt.trim() || DEFAULT_NEGATIVE
, "soft");

  return { short, detailed, negative };
}


/** Fixed studio defaults — used on load and Reset. Independent fields. */
export function createStudioDefaults(): SceneFormState {
  const studioRegions = ["kerala"];
  const woman = defaultPerson({
    gender: "woman",
    age: "21",
    hairStyle: "Ponytail",
    dressId: "w-saree-low-hip-chiffon",
    bodyType: "Petite",
    fashionVibe: "Everyday casual",
    hairColor: "Natural black",
    skinTone: "Fair warm",
    faceCutId: defaultFaceCutId("woman", "21", studioRegions),
  });
  const man = defaultPerson({
    gender: "man",
    age: "34",
    hairStyle: "Short neat",
    dressId: "m-tee-shorts",
    bodyType: "Tall lean",
    fashionVibe: "Everyday casual",
    hairColor: "Natural black",
    skinTone: "Medium wheatish",
    faceCutId: defaultFaceCutId("man", "34", studioRegions),
  });
  return {
    mode: "image",
    actionCategory: "hardcore",
    actionId: "hc-face-into-central-curve",
    regionIds: ["kerala"],
    faceCutPool: "general",
    peopleCount: "2",
    relationship: "couple",
    people: [woman, man],
    crowdDescriptors:
      "mixed adult ages 21+, Kerala–Malayali inspired attire, natural candid expressions",
    placeId: "bedroom",
    cameraAngle: "front",
    framing: "medium",
    aspectRatio: "1:1",
    timeOfDay: "day",
    extraNotes: "",
    negativePrompt: DEFAULT_NEGATIVE,
  };
}

export function createRandomizedDefaults(): SceneFormState {
  const action = randomEverydayOrSocialAction();
  const cam = randomCameraDefaults();
  const place = randomPlace(action.placeHints);
  const peopleCount = Math.random() < 0.65 ? "2" : "1";
  const relationship = peopleCount === "2" ? "couple" : "friends";

  return {
    mode: "image",
    actionCategory: action.category,
    actionId: action.id,
    regionIds: [...DEFAULT_REGION_IDS],
    faceCutPool: "general",
    peopleCount,
    relationship,
    people: defaultPeopleForCount(peopleCount),
    crowdDescriptors:
      "mixed adult ages 21+, Kerala–Tamil inspired attire, natural candid expressions",
    placeId: place.id,
    cameraAngle: cam.cameraAngle,
    framing: cam.framing,
    aspectRatio: cam.aspectRatio,
    timeOfDay: cam.timeOfDay,
    extraNotes: "",
    negativePrompt: DEFAULT_NEGATIVE,
  };
}

/** Static seed = studio defaults (no randomize on load). */
export const DEFAULT_FORM: SceneFormState = createStudioDefaults();
