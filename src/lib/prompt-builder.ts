import { getActionById, isHardcoreAction, isIntimateAction, actionRequiresAdult21, randomEverydayOrSocialAction, resolvePose } from "./actions";
import {
  CAMERA_ANGLES,
  FRAMINGS,
  TIMES_OF_DAY,
  randomCameraDefaults,
  cameraForPose,
  poseNote,
  type CameraAngle,
  type Framing,
  type AspectRatio,
  type PoseTag,
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
import { applyKnownFaceLocks, defaultFaceCutId, getFaceCut, isKnownFaceId } from "./face-cuts";
import { getDress } from "./dresses";
import { getPlaceById, randomPlace } from "./places";
import {
  DEFAULT_NEGATIVE,
  DEFAULT_QUALITY_PHRASE,
  sanitizeText,
} from "./safety";
import type { BuiltPrompts, SceneFormState } from "./types";

/** One-line quality for draft prompts. Full block is used in detailed only. */
const SHORT_QUALITY =
  "real photograph, 50mm lens wide open, natural side light, true colour, real skin texture with visible pores, light film grain";

/** Trim a long face description to its first few clauses for draft prompts. */
function trimFace(face: string, max = 300): string {
  if (face.length <= max) return face;
  const cut = face.slice(0, max);
  const lastComma = cut.lastIndexOf(", ");
  return lastComma > 120 ? cut.slice(0, lastComma) : cut;
}

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

function describePerson(
  p: PersonFields,
  index: number,
  regionIds: string[] | undefined,
  brief: boolean
): string {
  const label = `person ${index + 1}`;
  const pool =
    p.faceCutPool === "known" || isKnownFaceId(p.faceCutId) ? "known" : "general";
  const locked = pool === "known" ? applyKnownFaceLocks(p) : p;
  const faceCut = getFaceCut(locked.gender, locked.faceCutId, locked.age, regionIds, pool);
  const face = faceCut?.prompt;
  const dress = getDress(locked.gender, locked.dressId)?.prompt ?? locked.dressId;
  const ageNum = locked.age || "24";
  const regionLock = faceCut?.regionIds?.length
    ? `phenotype locked to ${faceCut.regionIds.join(" / ")} region look`
    : "";
  const knownCue =
    pool === "known" && !brief
      ? "KNOWN LOOK MODE: face, brows, eyes, nose, lips, jaw, age, hair style, hair color, skin tone, and body type are hard-locked from the selected known face cut — do not invent alternate features"
      : "";

  return clean([
    `${label}: ${locked.gender}`,
    knownCue,
    `exactly ${ageNum} years old`,
    regionLock,
    `${locked.skinTone} skin tone`,
    `${locked.bodyType} build`,
    /youth|teen|young|innocent|fresh-faced|delicate|boyish/i.test(locked.bodyType) && !brief
      ? "clearly adult age 19+ appearance — not a minor"
      : "",
    `${locked.hairColor} ${locked.hairStyle} hair`,
    face ? `face: ${brief ? trimFace(face) : face}` : "",
    locked.gender === "woman" ? "beautiful and attractive" : "",
    `wearing complete outfit: ${dress}`,
    `${locked.fashionVibe} vibe`,
  ]);
}

function peopleBlock(state: SceneFormState, brief: boolean): string {
  if (state.peopleCount === "group") {
    const crowd =
      sanitizeText(state.crowdDescriptors) ||
      "a diverse adult group, ages 19 and above, natural expressions";
    const favorites = (state.groupPeople ?? [])
      .map((person, index) => describePerson(person, index, state.regionIds, brief))
      .join("; ");
    return favorites
      ? `group of five or more adults (${crowd}); specifically include ${favorites}`
      : `group of five or more adults (${crowd})`;
  }
  const n = Number(state.peopleCount);
  const listed = state.people
    .slice(0, n)
    .map((p, i) => describePerson(p, i, state.regionIds, brief))
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

function femaleFaceVisibleCue(
  state: SceneFormState,
  brief: boolean,
  angle: CameraAngle
): string {
  if (!sceneHasWoman(state)) return "";
  const rear = angle === "back" || angle === "over-shoulder";
  if (rear) {
    return brief
      ? "her face visible, head turned over her shoulder"
      : "her face stays clearly visible — even from behind she turns her head over her shoulder so you can see her face";
  }
  return "her face stays clearly visible in frame";
}

function femaleBeautyCue(state: SceneFormState): string {
  if (!sceneHasWoman(state)) return "";
  return "she looks beautiful and attractive";
}

function cameraPhrase(angle: CameraAngle, framing: Framing, aspect: AspectRatio): string {
  const angleText = CAMERA_ANGLES.find((a) => a.id === angle)?.prompt ?? "";
  const framingText = FRAMINGS.find((f) => f.id === framing)?.prompt ?? "";
  return clean([angleText, framingText, `aspect ratio ${aspect}`]);
}

/** The resolved pose for this state, or null when the user typed their own action. */
function currentPose(state: SceneFormState): PoseTag | null {
  if (state.useCustomActionPrompt && state.customActionPrompt?.trim()) return null;
  const action = getActionById(state.actionId);
  if (!action) return null;
  return resolvePose(action);
}

export function buildPrompts(state: SceneFormState): BuiltPrompts {
  const action = getActionById(state.actionId);
  const place = getPlaceById(state.placeId);
  const customActionText = state.customActionPrompt?.trim();
  const actionText =
    state.useCustomActionPrompt && customActionText
      ? customActionText
      : action?.prompt ?? "posed naturally";

  // POSE LAYER — its own separate sentence, never mixed into the action text.
  const pose = currentPose(state);
  const poseText = pose ? poseNote(pose) : "";

  // CAMERA — the pose tag owns it. Manual fields only apply to custom actions.
  const cam = pose
    ? cameraForPose(pose)
    : { cameraAngle: state.cameraAngle, framing: state.framing };

  const placeText = place?.prompt ?? "an everyday setting";
  const regions = regionCues(state.regionIds);
  const rel = relationshipPhrase(state);
  const lighting = lightingFor(state);
  const camera = cameraPhrase(cam.cameraAngle, cam.framing, state.aspectRatio);
  const sanitizeMode = isHardcoreAction(state.actionId) ? "hardcore" : "soft";
  const notes = sanitizeText(state.extraNotes, sanitizeMode);

  // DRAFT: essentials only, compressed face, one-line quality.
  const short = sanitizeText(
    clean([
      "real photograph shot on camera",
      peopleBlock(state, true),
      rel,
      regions ? `appearance cues: ${regions}` : "",
      actionText,
      poseText,
      femaleFaceVisibleCue(state, true, cam.cameraAngle),
      femaleBeautyCue(state),
      `at ${placeText}`,
      `${state.timeOfDay} lighting`,
      camera,
      SHORT_QUALITY,
      state.mode === "video" ? "natural camera motion, real movement" : "still real photo",
      notes,
    ]),
    sanitizeMode
  );

  // FINAL: full face descriptions, full quality block, labelled sections.
  const detailed = sanitizeText(
    sentence([
      `Photorealistic real photograph of ${peopleBlock(state, false)}`,
      rel ? `They share a ${rel}` : "",
      regions ? `Cultural/appearance cues: ${regions}` : "",
      `Action: ${actionText}`,
      poseText ? `Pose: ${poseText}` : "",
      `Setting: ${placeText}`,
      `Time: ${state.timeOfDay} with ${lighting}`,
      femaleFaceVisibleCue(state, false, cam.cameraAngle)
        ? `Face visibility: ${femaleFaceVisibleCue(state, false, cam.cameraAngle)}`
        : "",
      femaleBeautyCue(state) ? `Beauty: ${femaleBeautyCue(state)}` : "",
      `Camera: ${camera}`,
      `Quality: ${DEFAULT_QUALITY_PHRASE}`,
      state.mode === "video"
        ? "Motion: natural continuous movement suitable for short video"
        : "Still image with documentary realism",
      notes ? `Notes: ${notes}` : "",
    ]),
    sanitizeMode
  );

  const negative = sanitizeText(
    state.negativePrompt.trim() || DEFAULT_NEGATIVE,
    "soft"
  );

  return { short, detailed, negative };
}

/** Camera the UI should show as selected for a given action. */
export function cameraForAction(actionId: string): {
  cameraAngle: CameraAngle;
  framing: Framing;
} | null {
  const action = getActionById(actionId);
  if (!action) return null;
  return cameraForPose(resolvePose(action));
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
    useCustomActionPrompt: false,
    customActionPrompt: "",
    regionIds: ["kerala"],
    peopleCount: "2",
    relationship: "couple",
    people: [woman, man],
    groupPeople: [],
    crowdDescriptors:
      "mixed adult ages 19+, Kerala–Malayali inspired attire, natural candid expressions",
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
    useCustomActionPrompt: false,
    customActionPrompt: "",
    regionIds: [...DEFAULT_REGION_IDS],
    peopleCount,
    relationship,
    people: defaultPeopleForCount(peopleCount),
    groupPeople: [],
    crowdDescriptors:
      "mixed adult ages 19+, Kerala–Tamil inspired attire, natural candid expressions",
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