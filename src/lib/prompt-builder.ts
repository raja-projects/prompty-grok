import { getActionById, isHardcoreAction, isIntimateAction, randomEverydayOrSocialAction } from "./actions";
import {
  CAMERA_ANGLES,
  FRAMINGS,
  TIMES_OF_DAY,
  randomCameraDefaults,
} from "./camera";
import {
  DEFAULT_REGION_IDS,
  defaultPeopleForCount,
  regionCues,
  relationshipBlocksIntimate,
  type PersonFields,
} from "./people";
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

function describePerson(p: PersonFields, index: number): string {
  const label = `person ${index + 1}`;
  return clean([
    `${label}: ${p.gender}`,
    `age ${p.ageBand}`,
    `${p.skinTone} skin tone`,
    `${p.bodyType} build`,
    `${p.hairColor} ${p.hairStyle} hair`,
    `wearing ${p.dress}`,
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
    .map((p, i) => describePerson(p, i))
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

export function buildPrompts(raw: SceneFormState): BuiltPrompts {
  const state = enforceRelationshipSafety(raw);
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
  const partnerAgencyCue =
    isIntimateAction(state.actionId) && state.peopleCount !== "1"
      ? "Clear partner agency: one adult partner performs the touching/grabbing/pressing on the other adult partner's body — never self-touch on their own chest, backside, or center unless the chosen action is explicitly labeled solo self-touch"
      : isIntimateAction(state.actionId) && state.peopleCount === "1"
        ? "Solo adult self-touch only if the selected action is explicitly a solo self-touch action"
        : "";

  const notes = sanitizeText(state.extraNotes, sanitizeMode);
  const quality = DEFAULT_QUALITY_PHRASE;

  const short = sanitizeText(
    clean([
      people,
      rel,
      regions ? `appearance cues: ${regions}` : "",
      actionText,
      partnerAgencyCue,
      `at ${placeText}`,
      `${state.timeOfDay} lighting`,
      camera,
      quality,
      state.mode === "video" ? "cinematic motion, natural movement" : "",
      notes,
    ])
, sanitizeMode);

  const detailed = sanitizeText(
    sentence([
      `Photorealistic real photograph of ${people}`,
      rel ? `They share a ${rel}` : "",
      regions ? `Cultural/appearance cues: ${regions}` : "",
      `Action: ${actionText}${partnerAgencyCue ? `. ${partnerAgencyCue}` : ""}`,
      `Setting: ${placeText}`,
      `Time: ${state.timeOfDay} with ${lighting}`,
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

/** Static seed used until client hydration randomizes */
export const DEFAULT_FORM: SceneFormState = {
  mode: "image",
  actionCategory: "everyday",
  actionId: "walking",
  regionIds: [...DEFAULT_REGION_IDS],
  peopleCount: "2",
  relationship: "couple",
  people: defaultPeopleForCount("2"),
  crowdDescriptors:
    "mixed adult ages 21+, Kerala–Tamil inspired attire, natural candid expressions",
  placeId: "beach-kerala",
  cameraAngle: "3/4",
  framing: "full-body",
  aspectRatio: "3:4",
  timeOfDay: "evening",
  extraNotes: "",
  negativePrompt: DEFAULT_NEGATIVE,
};
