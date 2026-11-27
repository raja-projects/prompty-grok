import {
  type Settings,
  ETH_LABEL,
  LIGHT_LABEL,
  NEGATIVE,
  REALISM,
  stripExpressions,
} from "./settings";
import {
  POSE_CAMERA,
  CAMERA_ANGLES,
  FRAMINGS,
  SHEET_RULE,
  type PoseTag,
} from "./camera";
import { coverPhrase, coverNeedsSheet } from "./cover";
import {
  CONTACT,
  CONTACT_CAMERA,
  BASE,
  REAR_ACTIONS,
  type ContactAction,
} from "./contacts";
import { MODIFIER, type ModifierKey } from "./modifiers";
import { findDress, findHair, femaleDresses, frontPhrase } from "./wardrobe";
import { TOUCH } from "./touches";
import { applyCast, castFor } from "./pronoun";

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

  const man2 = s.maleAge + 3;
  const man3 = s.maleAge + 7;

  let who = `a ${eth} couple`;
  if (s.genderMix === "solo-f") who = `a ${eth} woman`;
  else if (s.genderMix === "ff") who = `two ${eth} women`;
  else if (s.genderMix === "mmf") who = `a ${eth} woman and two men`;
  else if (s.genderMix === "ffm") who = `two ${eth} women and a man`;
  else if (s.genderMix === "mmmf") who = `a ${eth} woman and three men`;
  else if (s.genderMix === "crowd") who = `a ${eth} crowd`;

  let ages = woman;
  if (s.genderMix === "ff") ages = `two adult women, ${s.femaleAge} and ${s.femaleAge + 2}`;
  else if (s.genderMix === "mf") ages = `${woman} and a man of ${s.maleAge}`;
  else if (s.genderMix === "mmf") ages = `${woman} and two adult men, ${s.maleAge} and ${man2}`;
  else if (s.genderMix === "ffm") ages = `two adult women, ${s.femaleAge} and ${s.femaleAge + 2}, and an adult man of ${s.maleAge}`;
  else if (s.genderMix === "mmmf") ages = `${woman} and three adult men, ${s.maleAge}, ${man2} and ${man3}`;
  else if (s.genderMix === "crowd") ages = `${woman} and several adult men`;

  const herHair = findHair(s.femaleAge, s.femaleHair, true)?.state ?? "her thick hair loose";
  const hisHair = findHair(s.maleAge, s.maleHair, false)?.state ?? "his hair short";
  const manyMen =
    s.genderMix === "mmf" || s.genderMix === "mmmf" || s.genderMix === "crowd";
  const hair =
    s.genderMix === "solo-f"
      ? herHair
      : s.genderMix === "ff"
        ? `${herHair}, the other woman with her hair tied back`
        : `${herHair}, ${manyMen ? "each man with short hair" : hisHair}`;

  const body = s.bodyNote.trim() ? `, ${s.bodyNote.trim()}` : "";

  return `${who}, ${ages}, ${hair}${body}`;
}

function tint(state: string, colour: string): string {
  if (!colour) return state;
  return state.replace(/^(the [a-z-]+)/, `$1 in ${colour}`);
}

/** A second woman's garment, so ff never shows one woman undressed twice. */
function otherWomanDress(s: Settings, rear: boolean): string {
  const list = femaleDresses(s.femaleAge);
  const other = list.find((d) => d.id !== s.femaleDress) ?? list[0];
  const state = rear && other.rear ? other.rear : other.state;
  return tint(state, s.femaleColour).replace(/^the /, "a ");
}

function dress(s: Settings, contact?: ContactAction): string {
  const d = findDress(s.femaleAge, s.femaleDress, true);
  const rear = !!contact && REAR_ACTIONS.includes(contact);
  const state = d ? (rear && d.rear ? d.rear : d.state) : "";
  const cover =
    s.covering === "bedsheet" || s.covering === "none"
      ? coverPhrase(s.covering, s.femaleAge)
      : tint(state, s.femaleColour);

  if (s.genderMix === "solo-f") return cover;
  if (s.genderMix === "ff") {
    return `${cover}; the other woman in ${otherWomanDress(s, rear)}`;
  }

  const m = findDress(s.maleAge, s.maleDress, false);
  const many = s.genderMix === "mmf" || s.genderMix === "mmmf" || s.genderMix === "crowd";
  const manState = m ? tint(m.state, s.maleColour) : "his shirt open";
  // dick-hold only: the hem must clear the fly, or the crotch is unreadable and refusals climb.
  const lifted =
    contact === "dick-hold" ? ", the shirt lifted clear of his waistband" : "";
  return `${cover}; ${many ? `each man in ${manState.replace(/\bthe /g, "")}` : manState.replace(/^the /, "his ")}${lifted}`;
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
  const o = contact ? CONTACT_CAMERA[contact]?.[pose] : undefined;
  const angle = o ? o.camera : c ? c.camera : POSE_CAMERA[pose].cameraAngle;
  const frame = o ? o.framing : c ? c.framing : POSE_CAMERA[pose].framing;
  return `${anglePrompt(angle)}, ${framingPrompt(frame)}, ${LENS[frame]}`;
}

function extraCast(s: Settings): string {
  switch (s.genderMix) {
    case "mmf":
      return "the second man close at her head, one hand in her hair";
    case "ffm":
      return "the second woman at her shoulder, her hand on her hip";
    case "mmmf":
      return "the other two men close at her head and her side, hands on her shoulder and hip";
    case "crowd":
      return "more men close around her, hands on her hips, shoulders and waist";
    default:
      return "";
  }
}

function texture(s: Settings): string {
  if (s.length === "short") return `anatomically correct, matte skin, visible pores, ${REALISM}`;
  return `anatomically correct, matte skin, visible pores, ${REALISM}, slight film grain`;
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
  const cast = castFor(s.genderMix, contact);
  const touch = s.touch ? TOUCH[s.touch] : undefined;
  const base = contact ? BASE[tag] : undefined;

  // {front} is always his clothing, so no gender is needed. Where there is no
  // man in frame the token is overridden rather than left dangling.
  const front =
    s.genderMix === "ff"
      ? "the front of the other woman's body"
      : s.genderMix === "solo-f"
        ? "the front of her body"
        : frontPhrase(findDress(s.maleAge, s.maleDress, false)?.id ?? "");

  const clause = contact
    ? CONTACT[contact].clauses[tag]?.replace("{front}", front)
    : undefined;

  const mods = modifiers
    .slice(0, 2)
    .map((m) => MODIFIER[m]?.clause && applyCast(MODIFIER[m].clause, cast))
    .filter(Boolean) as string[];

  const castExtra = extraCast(s);
  const core = touch
    ? clause
      ? `${touch.pretext}; ${applyCast(clause, cast)}; ${touch.witness}`
      : `${applyCast(POSE_CAMERA[tag].note, cast)}; ${touch.witness}`
    : base && clause
      ? `${applyCast(base, cast)}; ${applyCast(clause, cast)}`
      : applyCast(POSE_CAMERA[tag].note, cast);

  const withCast = castExtra && !touch ? `${core}; ${castExtra}` : core;

  const hands =
    s.genderMix === "solo-f"
      ? ""
      : s.genderMix === "mf"
        ? " He has exactly two hands, each hand on its own arm."
        : " Each person has exactly two hands, each hand on its own arm.";

  const raw = cap(mods.length ? `${withCast}; ${mods.join("; ")}` : withCast) + hands;
  const geometry = s.expressions ? raw : stripExpressions(raw);
  const sheet = coverNeedsSheet(s.covering, s.femaleAge);

  const head = `${TITLE[s.room]} of ${subject(s)}. ${cap(dress(s, contact))}.`;
  const cam = cap(cameraClause(s, tag, contact));

  if (s.mode === "B") {
    const drift =
      s.genderMix === "ff"
        ? "move her hands to the other woman's hips"
        : "move his hands to her hips";
    return {
      prompt: `${head} Keep both faces 100% identical to the references. If the arrangement drifts, ${drift}. ${cam}. ${cap(LIGHT_LABEL[s.light])}. ${cap(texture(s))}, ${s.ratio}.`,
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