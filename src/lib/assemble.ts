import {
  type Settings,
  ETH_LABEL,
  MIX_LABEL,
  LIGHT_LABEL,
  NEGATIVE,
} from "./settings";
import {
  POSE_CAMERA,
  CAMERA_ANGLES,
  FRAMINGS,
  SHEET_RULE,
  type PoseTag,
} from "./camera";
import { coverPhrase, coverNeedsSheet } from "./cover";

const TITLE: Record<Settings["room"], string> = {
  bedroom: "Editorial bedroom photograph",
  kitchen: "Editorial kitchen photograph",
  bathroom: "Editorial bathroom photograph",
  balcony: "Editorial balcony photograph",
};

function anglePrompt(id: string): string {
  return CAMERA_ANGLES.find((a) => a.id === id)?.prompt ?? "side profile";
}

function framingPrompt(id: string): string {
  return FRAMINGS.find((f) => f.id === id)?.prompt ?? "full-body framing";
}

function subject(s: Settings): string {
  const woman =
    s.femaleAge < 19
      ? `a girl of ${s.femaleAge}`
      : `an adult woman of ${s.femaleAge}`;

  const who =
    s.genderMix === "solo-f" || s.genderMix === "ff"
      ? woman
      : `${woman} and a man of ${s.maleAge}`;

  const hair = s.maleHairShort && s.genderMix !== "solo-f" && s.genderMix !== "ff"
    ? "her long hair loose, his hair short"
    : "her long hair loose";

  const body = s.bodyNote.trim() ? `, ${s.bodyNote.trim()}` : "";

  return `${MIX_LABEL[s.genderMix]}, ${ETH_LABEL[s.ethnicity]}, ${who}, ${hair}${body}`;
}

function dress(s: Settings): string {
  const cover = coverPhrase(s.covering, s.femaleAge);
  if (s.genderMix === "solo-f" || s.genderMix === "ff") return cover;
  return `${cover}; his shirt open`;
}

function camera(s: Settings, pose: PoseTag): string {
  if (s.camera === "manual" && s.cameraOverride.trim()) {
    return s.cameraOverride.trim();
  }
  const p = POSE_CAMERA[pose];
  return `${anglePrompt(p.cameraAngle)}, ${framingPrompt(p.framing)}, ${LENS[p.framing]}`;
}

function texture(s: Settings): string {
  if (s.length === "short") return "matte skin, visible pores";
  return "matte skin, visible pores, slight film grain";
}

function cap(t: string): string {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

const LENS: Record<string, string> = {
  "extreme-close-up": "100mm macro",
  "close-up": "85mm f/2",
  medium: "50mm f/2.8",
  "half-body": "50mm f/2.8",
  "3/4-body": "40mm f/4",
  "full-body": "35mm f/4",
  wide: "24mm f/5.6",
};

export interface Assembled {
  prompt: string;
  negative: string;
  pose: PoseTag;
  sheet: boolean;
}

export function assemblePrompt(s: Settings, pose?: PoseTag): Assembled {
  const tag: PoseTag = pose && POSE_CAMERA[pose] ? pose : "standing-front";
  const geometry = cap(POSE_CAMERA[tag].note);
  const sheet = coverNeedsSheet(s.covering, s.femaleAge);

  const head = `${TITLE[s.room]} of ${cap(subject(s))}. ${cap(dress(s))}.`;

  if (s.mode === "B") {
    return {
      prompt: `${head} Keep both faces 100% identical to the references. If the arrangement drifts, move his hands to her hips. ${camera(s, tag)}. ${LIGHT_LABEL[s.light]}. ${texture(s)}, ${s.ratio}.`,
      negative: NEGATIVE,
      pose: tag,
      sheet,
    };
  }

  const sheetClause = sheet ? ` ${SHEET_RULE}.` : "";

  return {
    prompt: `${head} ${geometry}.${sheetClause} ${camera(s, tag)}. ${LIGHT_LABEL[s.light]}. ${texture(s)}, ${s.ratio}.`,
    negative: NEGATIVE,
    pose: tag,
    sheet,
  };
}