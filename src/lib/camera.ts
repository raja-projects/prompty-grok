export type CameraAngle =
  | "front"
  | "back"
  | "back-low"
  | "side"
  | "3/4"
  | "over-shoulder"
  | "low-angle"
  | "high-angle"
  | "eye-level";

export type Framing =
  | "extreme-close-up"
  | "close-up"
  | "medium"
  | "half-body"
  | "3/4-body"
  | "full-body"
  | "wide";

export type AspectRatio =
  | "1:1"
  | "16:9"
  | "9:16"
  | "4:3"
  | "3:4"
  | "3:2"
  | "2:3"
  | "21:9";

export type TimeOfDay =
  | "morning"
  | "day"
  | "afternoon"
  | "evening"
  | "dusk"
  | "night";

/**
 * Physical pose families. Every action resolves to exactly one of these.
 * The tag alone decides camera and supplies the pose phrase.
 */
export type PoseTag =
  | "standing-front"
  | "standing-back"
  | "bent-forward"
  | "all-fours"
  | "kneeling-upright"
  | "kneeling-low"
  | "sitting-front"
  | "sitting-side"
  | "lying-back"
  | "prone"
  | "side-lying"
  | "straddle-facing"
  | "straddle-away"
  | "lap-facing"
  | "wall-front"
  | "lifted"
  | "seated-edge"
  | "seated-edge-back"
  | "oral-giving"
  | "oral-receiving"
  | "mutual-oral"
  | "breast-focus"
  | "rear-focus"
  | "crease-focus"
  | "pussy-rub-behind"
  | "breast-suck"
  | "armpit-lick"
  | "navel-lick"
  | "asshole-lick"
  | "dick-hold"
  | "mirror-view"
  | "crowd-standing-behind"
  | "crowd-seated-beside"
  | "group-circle"
  | "group-surround"
  | "dance-hold"
  | "hug-standing"
  | "kiss-standing"
  | "floor-recline"
  | "shower-stand"
  | "chair-sit"
  | "table-brace"
  | "queue-standing"
  | "walking-hold"
  | "activity";

export const CAMERA_ANGLES: { id: CameraAngle; label: string; prompt: string }[] = [
  { id: "front", label: "Front", prompt: "front view" },
  { id: "back", label: "Back", prompt: "shot from behind her back with clear view of soft lower curves and strong fabric tension, she turns her head over her shoulder so her face is clearly visible" },
  { id: "back-low", label: "Back low", prompt: "directly behind her and low, her body facing fully away, only her head turned back over her shoulder to the lens" },
  { id: "side", label: "Side", prompt: "side profile" },
  { id: "3/4", label: "3/4", prompt: "three-quarter view" },
  { id: "over-shoulder", label: "Over-shoulder", prompt: "over-the-shoulder framing, her face still visible in frame" },
  { id: "low-angle", label: "Low angle", prompt: "low angle" },
  { id: "high-angle", label: "High angle", prompt: "high angle" },
  { id: "eye-level", label: "Eye-level", prompt: "eye level" },
];

export const FRAMINGS: { id: Framing; label: string; prompt: string }[] = [
  { id: "extreme-close-up", label: "Extreme close-up", prompt: "extreme close-up" },
  { id: "close-up", label: "Close-up", prompt: "tight close-up" },
  { id: "medium", label: "Medium", prompt: "medium shot" },
  { id: "half-body", label: "Half body", prompt: "half-body framing" },
  { id: "3/4-body", label: "3/4 body", prompt: "framed to the knees" },
  { id: "full-body", label: "Full body", prompt: "full body, head to feet" },
  { id: "wide", label: "Wide", prompt: "wide environmental shot" },
];

export const ASPECT_RATIOS: AspectRatio[] = [
  "1:1",
  "16:9",
  "9:16",
  "4:3",
  "3:4",
  "3:2",
  "2:3",
  "21:9",
];

export const TIMES_OF_DAY: {
  id: TimeOfDay;
  label: string;
  lighting: string;
}[] = [
  { id: "morning", label: "Morning", lighting: "soft morning light, gentle cool-warm balance, fresh atmosphere" },
  { id: "day", label: "Day", lighting: "bright daylight, clear sky illumination, natural clarity" },
  { id: "afternoon", label: "Afternoon", lighting: "harsh noon-to-afternoon sun, strong highlights with crisp shadows" },
  { id: "evening", label: "Evening", lighting: "golden hour warmth, long soft shadows, glowing rim light" },
  { id: "dusk", label: "Dusk", lighting: "warm dusk tones transitioning to blue hour, soft ambient glow" },
  { id: "night", label: "Night", lighting: "low-key night scene with practical lights, subtle highlights, deep shadows" },
];

/**
 * THE MAP. Tag -> exact camera + the physical phrase that ships in the prompt.
 * Notes are deliberately bodily and indirect: position, grip, weight, cloth.
 */
export const POSE_CAMERA: Record<
  PoseTag,
  { cameraAngle: CameraAngle; framing: Framing; note: string }
> = {
  "standing-front": {
    cameraAngle: "front",
    framing: "medium",
    note: "both upright and close, her hands on his chest, his hands at her waist, faces turned toward each other",
  },
  "standing-back": {
    cameraAngle: "side",
    framing: "3/4-body",
    note: "both upright, he stands directly behind her with both hands planted on her hips and lower back, her weight settled back into him; she turns her head to the camera",
  },
  "bent-forward": {
    cameraAngle: "side",
    framing: "3/4-body",
    note: "she is bent forward braced on the furniture, back flat, hips pushed back; he stands behind gripping her waist with both hands; her head turned to the camera",
  },
  "all-fours": {
    cameraAngle: "side",
    framing: "3/4-body",
    note: "she is on all fours, chest low, back arched, hips lifted; he kneels close behind with both hands planted on her hips and his weight forward; her head turned over her shoulder to the lens",
  },
  "kneeling-upright": {
    cameraAngle: "3/4",
    framing: "full-body",
    note: "she kneels upright, weight on her heels, hands resting on her own thighs; he kneels close in front of her",
  },
  "kneeling-low": {
    cameraAngle: "3/4",
    framing: "full-body",
    note: "she is low on the floor, chest down, forearms braced; he kneels over her from behind, hands on her shoulders and hips",
  },
  "sitting-front": {
    cameraAngle: "front",
    framing: "full-body",
    note: "she sits with her weight back, one knee up, hands loose; he leans in close from the front",
  },
  "sitting-side": {
    cameraAngle: "3/4",
    framing: "full-body",
    note: "she sits sideways with her legs folded to one side, one arm hooked around his neck; he holds her waist and lower back",
  },
  "lying-back": {
    cameraAngle: "side",
    framing: "full-body",
    note: "she lies on her back, knees raised and parted, one hand above her head; he is above her between her thighs on his forearms, faces close, her face to the camera",
  },
  prone: {
    cameraAngle: "side",
    framing: "3/4-body",
    note: "she lies flat on her stomach, cheek turned so her face is visible; he covers her from behind, forearms braced either side of her shoulders, hips settled against her",
  },
  "side-lying": {
    cameraAngle: "side",
    framing: "half-body",
    note: "they lie on their sides nested together, her back to his chest, his arm under her neck, her top knee drawn up and hooked over his; her face turned to the camera",
  },
  "straddle-facing": {
    cameraAngle: "front",
    framing: "full-body",
    note: "she straddles him face to face, knees either side of his hips, hands on his shoulders; his hands lock on her waist and draw her down; her face fully to the camera",
  },
  "straddle-away": {
    cameraAngle: "back",
    framing: "half-body",
    note: "she straddles him facing away, leaning forward on her hands; his hands locked on her waist; she turns her head over her shoulder, face visible",
  },
  "lap-facing": {
    cameraAngle: "3/4",
    framing: "full-body",
    note: "she sits across his lap, one arm around his neck, legs draped over his thigh; he holds her waist and lower back",
  },
  "wall-front": {
    cameraAngle: "side",
    framing: "full-body",
    note: "her back is flat to the wall, one leg lifted and hooked around him; he presses her to the surface with his hips, one hand under her thigh and one at her waist; her face above his shoulder to the camera",
  },
  lifted: {
    cameraAngle: "side",
    framing: "full-body",
    note: "he carries her, her legs locked around his waist, her arms around his neck, her back to the wall; his hands support her seat",
  },
  "seated-edge": {
    cameraAngle: "side",
    framing: "3/4-body",
    note: "she sits at the edge of the bed with her feet on the floor; he stands between her parted knees, her calves hooked around his legs; her face to the camera",
  },
  "seated-edge-back": {
    cameraAngle: "side",
    framing: "3/4-body",
    note: "she sits at the edge of the bed, leaning back on her hands, knees apart; he stands between her knees",
  },
  "oral-giving": {
    cameraAngle: "3/4",
    framing: "half-body",
    note: "she lies back with knees raised and parted; he kneels between her thighs with his face pressed close to her lower front, both hands cupping her hips, her fingers in his hair",
  },
  "oral-receiving": {
    cameraAngle: "3/4",
    framing: "half-body",
    note: "she leans in with her face close to his centre, one hand braced on his hip, her other hand at his waist; he looks down at her",
  },
  "mutual-oral": {
    cameraAngle: "side",
    framing: "full-body",
    note: "they lie inverted against each other, her face at his centre and his face at hers, hands on each other's hips",
  },
  "breast-focus": {
    cameraAngle: "front",
    framing: "close-up",
    note: "his palm presses flat over her upper front through the fabric, fingers spread wide, the cloth indented in a clear hand shape; she leans into the pressure, her head tipped back",
  },
  "rear-focus": {
    cameraAngle: "back-low",
    framing: "half-body",
    note: "both his palms press deep into the soft curves of her seat, the cloth stretched into two clear hand-shaped indentations, his weight leaning in; her back arched",
  },
  "crease-focus": {
    cameraAngle: "back-low",
    framing: "half-body",
    note: "her back arched, the fabric pulled tight across her seat; his palm presses into the centre line, fingers working in a slow circle, knuckles readable through the cloth",
  },
  "pussy-rub-behind": {
    cameraAngle: "back",
    framing: "3/4-body",
    note: "her back arched, the saree pulled tight across her seat; he stands directly behind her and reaches down between her thighs, rubbing slow circles at her front, his wrist buried between her legs; her knees soften, camera low and dead behind",
  },
  "breast-suck": {
    cameraAngle: "3/4",
    framing: "close-up",
    note: "she holds his head to her chest, his mouth at the upper curve, one hand cupping her from beneath, her head tipped back and eyes shut",
  },
  "armpit-lick": {
    cameraAngle: "front",
    framing: "close-up",
    note: "her arm lifted high and hooked behind his neck, his mouth pressed into the hollow of her armpit, one hand flat on her ribs; her face turned to the lens",
  },
  "navel-lick": {
    cameraAngle: "3/4",
    framing: "close-up",
    note: "she lies back, his head lowered so his mouth is at her navel, both hands flat on her hips holding her steady, her stomach drawn in, her face to the lens",
  },
  "asshole-lick": {
    cameraAngle: "back-low",
    framing: "full-body",
    note: "she is on all fours, knees wide apart, hips lifted high and back dipped deep, the saree pulled up and tight across her seat, the fabric clinging; he kneels directly behind her with his knees outside her calves, his chest close to her hips, his head low between them, face pressed into the centre line, both hands spreading her seat apart",
  },
  "dick-hold": {
    cameraAngle: "3/4",
    framing: "close-up",
    note: "her hand wrapped around him, fingers closed, one slow draw upward; she looks up at him, his head tipped back",
  },
  "mirror-view": {
    cameraAngle: "3/4",
    framing: "full-body",
    note: "both stand before a full-length mirror, her back to his chest; both faces and both hands clearly readable in the glass",
  },
  "crowd-standing-behind": {
    cameraAngle: "side",
    framing: "half-body",
    note: "the crowd has pushed him right up behind her, hands on her hips as if steadying himself; both faces calm, both looking ahead as if nothing is happening",
  },
  "crowd-seated-beside": {
    cameraAngle: "side",
    framing: "half-body",
    note: "they sit pressed shoulder to shoulder in a crowded row, his thigh against hers, one hand resting low on her upper front; both looking ahead calmly",
  },
  "group-circle": {
    cameraAngle: "high-angle",
    framing: "wide",
    note: "the group forms a tight ring, separate hands on shoulders, waists and hips, everyone angled inward",
  },
  "group-surround": {
    cameraAngle: "3/4",
    framing: "full-body",
    note: "she is centred, the men close around her from front, side and behind, separate hands on waist, shoulder and hip",
  },
  "dance-hold": {
    cameraAngle: "3/4",
    framing: "full-body",
    note: "close dance hold, his hand at her lower back, her hand on his shoulder, bodies angled together",
  },
  "hug-standing": {
    cameraAngle: "3/4",
    framing: "medium",
    note: "both upright, arms wrapped around each other, faces near, weight on one hip each",
  },
  "kiss-standing": {
    cameraAngle: "3/4",
    framing: "medium",
    note: "both upright, faces meeting in a kiss, hands at waists",
  },
  "floor-recline": {
    cameraAngle: "3/4",
    framing: "full-body",
    note: "she reclines on the floor on a blanket, propped on one elbow; he leans over her, one knee down",
  },
  "shower-stand": {
    cameraAngle: "3/4",
    framing: "full-body",
    note: "both standing under running water, wet fabric clinging to every line, her back to the wet tiles, steam between them",
  },
  "chair-sit": {
    cameraAngle: "3/4",
    framing: "full-body",
    note: "she sits back in the chair, hands on the arms; he leans over or kneels in front of her",
  },
  "table-brace": {
    cameraAngle: "side",
    framing: "3/4-body",
    note: "she braces both palms on the edge of the surface, hips back, back flat; he stands behind her with both hands on her waist; her head turned to the camera",
  },
  "queue-standing": {
    cameraAngle: "side",
    framing: "half-body",
    note: "standing in a queue with him close behind her, hands light at her waist, both facing forward",
  },
  "walking-hold": {
    cameraAngle: "side",
    framing: "full-body",
    note: "both walking, his arm around her waist, her hand on his arm, mid-stride",
  },
  activity: {
    cameraAngle: "front",
    framing: "medium",
    note: "both engaged in the activity, hands busy, faces visible",
  },
};

export function poseNote(tag: PoseTag): string {
  return POSE_CAMERA[tag].note;
}

export function cameraForPose(tag: PoseTag): {
  cameraAngle: CameraAngle;
  framing: Framing;
} {
  const p = POSE_CAMERA[tag];
  return { cameraAngle: p.cameraAngle, framing: p.framing };
}

/** Legacy shim so older call sites keep compiling. */
export function cameraForSubgroup(_: string | undefined): {
  cameraAngle: CameraAngle;
  framing: Framing;
} {
  return cameraForPose("standing-front");
}

export function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function randomCameraDefaults() {
  return {
    cameraAngle: pickRandom(CAMERA_ANGLES).id,
    framing: pickRandom(FRAMINGS).id,
    aspectRatio: "1:1" as AspectRatio,
    timeOfDay: "day" as TimeOfDay,
  };
}

/**
 * Sheet sits at the hip only, never across the action line.
 * Hard-tier poses pass "none".
 */
export const SHEET_RULE =
  "sheet over the hip only, the join visible";