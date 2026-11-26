import {
  type Settings,
  ETH_LABEL,
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
import { CONTACT, BASE, type ContactAction } from "./contacts";
import { MODIFIER, type ModifierKey } from "./modifiers";

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
  const eth = ETH_LABEL[s.ethnicity];
  const woman =
    s.femaleAge < 19
      ? `a girl of ${s.femaleAge}`
      : `an adult woman of ${s.femaleAge}`;

  let who = `a ${eth} couple`;
  if (s.genderMix === "solo-f") who = `a ${eth} woman`;
  else if (s.genderMix === "ff") who = `two ${eth} women`;
  else if (s.genderMix === "mmf") who = `a ${eth} woman and two men`;
  else if (s.genderMix === "ffm") who = `two ${eth} women and a man`;
  else if (s.genderMix === "mmmf") who = `a ${eth} woman and three men`;
  else if (s.genderMix === "crowd") who = `a ${eth} crowd`;

  const ages =
    s.genderMix === "solo-f" || s.genderMix === "ff"
      ? woman
      : `${woman} and a man of ${s.maleAge}`;

  const hair =
    s.genderMix === "solo-f" || s.genderMix === "ff"
      ? "her long hair loose"
      : "her long hair loose, his hair short";

  const body = s.bodyNote.trim() ? `, ${s.bodyNote.trim()}` : "";

  return `${who}, ${ages}, ${hair}${body}`;
}

function dress(s: Settings): string {
  const cover = coverPhrase(s.covering, s.femaleAge);
  if (s.genderMix === "solo-f" || s.genderMix === "ff") return cover;
  return `${cover}; his shirt open`;
}

function cameraClause(
  s: Settings,
  pose: PoseTag,
  contact?: ContactAction,
): string {
  if (s.camera === "manual" && s.cameraOverride.trim()) {
    return s.cameraOverride.trim();
  }
  const c = contact ? CONTACT[contact] : undefined;
  const angle = c ? c.camera : POSE_CAMERA[pose].cameraAngle;
  const frame = c ? c.framing : POSE_CAMERA[pose].framing;
  return `${anglePrompt(angle)}, ${framingPrompt(frame)}, ${LENS[frame]}`;
}

function texture(s: Settings): string {
  if (s.length === "short") return "anatomically correct, matte skin, visible pores";
  return "anatomically correct, matte skin, visible pores, slight film grain";
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

export function assemblePrompt(
  s: Settings,
  pose?: PoseTag,
  contact?: ContactAction,
  modifiers: ModifierKey[] = [],
): Assembled {
  const tag: PoseTag = pose && POSE_CAMERA[pose] ? pose : "standing-front";
  const base = contact ? BASE[tag] : undefined;
  const clause = contact ? CONTACT[contact].clauses[tag] : undefined;
  const mods = modifiers
    .slice(0, 2)
    .map((m) => MODIFIER[m]?.clause)
    .filter(Boolean) as string[];
  const core = base && clause ? `${base}; ${clause}` : POSE_CAMERA[tag].note;
  const geometry = cap(mods.length ? `${core}; ${mods.join("; ")}` : core);
  const sheet = coverNeedsSheet(s.covering, s.femaleAge);

  const head = `${TITLE[s.room]} of ${subject(s)}. ${cap(dress(s))}.`;
  const cam = cap(cameraClause(s, tag, contact));

  if (s.mode === "B") {
    return {
      prompt: `${head} Keep both faces 100% identical to the references. If the arrangement drifts, move his hands to her hips. ${cam}. ${cap(LIGHT_LABEL[s.light])}. ${cap(texture(s))}, ${s.ratio}.`,
      negative: NEGATIVE,
      pose: tag,
      sheet,
    };
  }

  const sheetClause = sheet ? ` ${SHEET_RULE}.` : "";

  return {
    prompt: `${head} ${geometry}.${sheetClause} ${cam}. ${cap(LIGHT_LABEL[s.light])}. ${cap(texture(s))}, ${s.ratio}.`,
    negative: NEGATIVE,
    pose: tag,
    sheet,
  };
}