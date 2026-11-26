import type { CameraAngle, Framing, PoseTag } from "./camera";

export type ContactAction =
  | "asshole-lick"
  | "fingering-front"
  | "anal-finger"
  | "pussy-press-front"
  | "nipple-pinch"
  | "nipple-tongue"
  | "thigh-kiss"
  | "spank"
  | "her-hand-on-his-chest"
  | "her-fingers-in-his-mouth"
  | "back-scratch"
  | "tribbing"
  | "wrist-hold-her"
  | "foot-hold"
  | "pussy-lick"
  | "dick-suck"
  | "dick-hold"
  | "breast-press"
  | "breast-suck"
  | "armpit-lick"
  | "navel-lick"
  | "buttock-press"
  | "crease-press"
  | "pussy-rub-behind";

/** Woman-only base. The man is added by the contact clause. */
export const BASE: Partial<Record<PoseTag, string>> = {
  "all-fours": "she is on all fours, knees wide apart, hips lifted high and back dipped deep",
  "bent-forward": "she stands bent forward with her palms flat on the counter, back flat, hips pushed back",
  "side-lying": "they lie on their sides, her top leg lifted high over his hip",
  "seated-edge": "she sits at the edge of the bed, leaning forward on her elbows, hips near the edge",
  "seated-edge-back": "she sits at the edge of the bed, leaning back on her hands, knees apart",
  "kneeling-low": "she is low with her chest down and her forearms braced",
  "lying-back": "she lies on her back, knees raised and parted, one hand above her head",
  "kneeling-upright": "she kneels upright, weight on her heels, hands resting on her own thighs",
  "chair-sit": "he sits back in the chair, she kneels between his knees",
  "standing-front": "both stand upright and close",
  "standing-back": "both stand upright, he stands directly behind her, chest to her back",
  "straddle-facing": "he lies back beneath her, she straddles him face to face, her knees planted either side of his hips, her weight on his thighs",
  "lap-facing": "she sits across his lap, one leg draped over his thigh",
  "wall-front": "her back is flat to the wall, one leg lifted and hooked around him",
  prone: "she lies flat on her stomach, cheek turned so her face is visible",
  "table-brace": "she braces both palms on the edge of the surface, hips back, back flat",
  "walking-hold": "she walks ahead mid-stride, weight shifting onto one hip",
  "queue-standing": "she stands in a queue facing forward, weight on one hip",
  "straddle-away": "she straddles him facing away, leaning forward on her hands",
};

/** Pose tags that duplicate a contact; hidden from the pose list. */
export const CONTACT_TAGS: PoseTag[] = [
  "asshole-lick",
  "pussy-rub-behind",
  "breast-suck",
  "armpit-lick",
  "navel-lick",
  "dick-hold",
];

/** Contacts whose camera is behind her; these use a garment's rear state. */
export const REAR_ACTIONS: ContactAction[] = [
  "buttock-press",
  "crease-press",
  "asshole-lick",
  "anal-finger",
  "pussy-rub-behind",
  "spank",
];

/** Per-pose camera override where a pose cannot take the action's own angle. */
export const CONTACT_CAMERA: Partial<
  Record<ContactAction, Partial<Record<PoseTag, { camera: CameraAngle; framing: Framing }>>>
> = {
  "anal-finger": { "side-lying": { camera: "side", framing: "half-body" } },
  "pussy-rub-behind": { "side-lying": { camera: "side", framing: "half-body" } },
};

export interface ContactDef {
  label: string;
  camera: CameraAngle;
  framing: Framing;
  poses: PoseTag[];
  clauses: Partial<Record<PoseTag, string>>;
}

export const CONTACT: Record<ContactAction, ContactDef> = {
  "asshole-lick": {
    label: "Asshole lick",
    camera: "back-low",
    framing: "3/4-body",
    poses: ["all-fours", "bent-forward", "side-lying", "seated-edge", "kneeling-low"],
    clauses: {
      "all-fours":
        "he kneels directly behind her with his knees outside her calves, his head low between her hips, face pressed into the centre line of her backside, one hand spreading her seat apart",
      "bent-forward":
        "he kneels directly behind her, head low, face pressed into the centre line of her backside, one hand spreading her seat apart",
      "side-lying":
        "he slides down behind her, face pressed into the centre line of her backside, one hand lifting her top leg higher",
      "seated-edge":
        "he kneels on the floor behind her, head low, face pressed into the centre line of her backside, one hand spreading her seat apart",
      "kneeling-low":
        "he kneels over her from behind, head low between her hips, face pressed into the centre line of her backside, one hand spreading her seat apart",
    },
  },
  "fingering-front": {
    label: "Fingering, front",
    camera: "front",
    framing: "close-up",
    poses: ["lying-back", "seated-edge-back", "straddle-facing", "side-lying", "lap-facing"],
    clauses: {
      "lying-back":
        "his hand slips down between her thighs and works in slow circles, two fingers pressed in, her hips lifting to meet it",
      "seated-edge-back":
        "his hand comes between her thighs from the front, working in slow circles, her knees opening wider",
      "straddle-facing":
        "her hand guiding his between them, his fingers working in slow circles",
      "side-lying":
        "his hand comes over her hip and down between her thighs, working slowly",
      "lap-facing":
        "his hand between them, fingers working in slow circles, her forehead against his",
    },
  },
  "pussy-lick": {
    label: "Pussy lick",
    camera: "3/4",
    framing: "half-body",
    poses: ["lying-back", "seated-edge-back", "side-lying", "straddle-facing", "kneeling-upright"],
    clauses: {
      "lying-back": "he kneels between her thighs with his face pressed close to her front, one hand cupping her hip, her fingers in his hair",
      "seated-edge-back": "he kneels on the floor between her parted knees, face pressed close to her front, one hand on her thigh",
      "side-lying": "he slides down her body, face pressed to her front, one hand holding her top leg up",
      "straddle-facing": "she shifts up so she is over his face, he pulls her down to it, one hand on her hip",
      "kneeling-upright": "he kneels in front of her and leans in, face pressed to her front, one hand on her hip",
    },
  },
  "dick-suck": {
    label: "Dick suck",
    camera: "3/4",
    framing: "half-body",
    poses: ["kneeling-upright", "chair-sit", "seated-edge"],
    clauses: {
      "kneeling-upright": "he stands close in front of her and she leans in, face at his lap, one hand braced on his thigh",
      "chair-sit": "she leans in, face at his lap, one hand on his thigh",
      "seated-edge": "he stands between her knees and she leans forward, face at his lap, one hand at his hip",
    },
  },
  "dick-hold": {
    label: "Dick hold",
    camera: "3/4",
    framing: "half-body",
    poses: ["lying-back", "straddle-facing", "standing-front", "side-lying", "seated-edge-back"],
    clauses: {
      "lying-back": "her free hand slides down over her own belly and closes over the shape at the front of his clothing, just below his navel, fingers curled and thumb up, one slow draw; he leans over her on one arm, watching her",
      "straddle-facing": "her hand slides down between them and closes over the shape at the front of his clothing, just below his navel, fingers curled and thumb up, one slow draw; she looks up at him",
      "standing-front": "her arm reaching down between them, her fingers curled over the shape at the front of his clothing, just below his navel, thumb up, one slow draw upward; his hand at the back of her neck",
      "side-lying": "her hand reaches back between them and closes over the shape at the front of his clothing, fingers curled, one slow draw",
      "seated-edge-back": "she leans back on one hand and her other hand closes over the shape at the front of his clothing, just below his navel, fingers curled, one slow draw",
    },
  },
  "breast-press": {
    label: "Breast press",
    camera: "front",
    framing: "close-up",
    poses: ["standing-back", "standing-front", "lying-back", "side-lying", "lap-facing"],
    clauses: {
      "standing-back":
        "he stands behind her and reaches around, his palm pressing flat over her upper front, fingers spread, the cloth indented in a clear hand shape, both faces to the camera",
      "lying-back":
        "he leans over her from the side and presses his palm flat over her upper front, fingers spread, the cloth indented",
      "side-lying":
        "his arm comes over her from behind, palm flat and pressing, fingers spread, the cloth indented",
      "lap-facing":
        "his arm comes around her from behind, palm flat and pressing, the cloth indented; she leans back into him",
      "standing-front":
        "he stands close and presses his palm flat over her upper front, fingers spread, the cloth indented in a clear hand shape",
    },
  },
  "breast-suck": {
    label: "Breast suck",
    camera: "3/4",
    framing: "close-up",
    poses: ["lying-back", "lap-facing", "straddle-facing", "wall-front", "side-lying"],
    clauses: {
      "lying-back": "he lowers his mouth to the upper curve, one hand cupping her from beneath, her head tipped back",
      "lap-facing": "she holds his head to her chest, his mouth at the upper curve, one hand cupping from beneath",
      "straddle-facing": "she draws his head to her chest, his mouth at the upper curve, one hand at her waist",
      "wall-front": "his mouth at the upper curve, one hand cupping from beneath, her head tipped back to the wall",
      "side-lying": "his mouth at the upper curve from behind, one hand cupping from beneath",
    },
  },
  "armpit-lick": {
    label: "Armpit lick",
    camera: "front",
    framing: "close-up",
    poses: ["standing-front", "standing-back", "lying-back", "side-lying"],
    clauses: {
      "standing-front": "her arm lifted high and hooked behind his neck, his mouth pressed into the hollow of her armpit, one hand flat on her ribs",
      "standing-back": "her arm lifted back over his shoulder, his mouth pressed into the hollow, one hand flat on her ribs",
      "lying-back": "her arm stretched above her head, he lies beside her propped on one elbow, his mouth pressed into the hollow, one hand flat on her ribs",
      "side-lying": "her top arm lifted, he lies behind her on one elbow, his mouth pressed into the hollow, one hand flat on her ribs",
    },
  },
  "navel-lick": {
    label: "Navel lick",
    camera: "3/4",
    framing: "close-up",
    poses: ["lying-back", "seated-edge-back", "lap-facing", "side-lying"],
    clauses: {
      "lying-back": "his head lowered so his mouth is at her navel, one hand flat on her hip holding her steady, her stomach drawn in",
      "seated-edge-back": "he kneels in front of her, head lowered to her navel, one hand flat on her hip",
      "lap-facing": "she sits across his lap and he lowers his head to her navel, one hand flat on her hip",
      "side-lying": "he slides down, mouth at her navel, one hand flat on her hip",
    },
  },
  "buttock-press": {
    label: "Buttock press",
    camera: "back-low",
    framing: "3/4-body",
    poses: [
      "all-fours",
      "bent-forward",
      "standing-back",
      "prone",
      "table-brace",
      "walking-hold",
      "queue-standing",
      "straddle-away",
    ],
    clauses: {
      "all-fours": "his hand low on the curve below her waistband, palm flat, fingers spread, pressing in, his weight leaning in",
      "bent-forward": "his hand low on the curve below her waistband, palm flat, fingers spread, pressing in",
      "standing-back": "his hand low on the curve below her waistband, palm flat, fingers spread, pressing in",
      prone: "he comes down over her back and presses his palm flat into the curve below her waistband, fingers spread",
      "table-brace": "his hand low on the curve below her waistband, palm flat, fingers spread",
      "walking-hold":
        "he walks half a step behind her and his hand presses flat into the curve below her waistband, fingers spread",
      "queue-standing":
        "he stands close behind her and his hand presses flat into the curve below her waistband, fingers spread",
      "straddle-away":
        "his hand low on the curve below her waistband, palm flat, fingers spread, his other hand at her waist",
    },
  },
  "crease-press": {
    label: "Crease press",
    camera: "back-low",
    framing: "3/4-body",
    poses: ["all-fours", "bent-forward", "prone", "table-brace", "standing-back", "straddle-away"],
    clauses: {
      "all-fours": "his palm presses into the centre line of her backside, fingers working in a slow circle, knuckles readable through the cloth",
      "bent-forward": "his palm presses into the centre line of her backside from behind, fingers working in a slow circle",
      prone: "he presses his palm into the centre line of her backside, fingers working in a slow circle, his weight on the other arm",
      "table-brace": "his palm presses into the centre line of her backside, fingers working in a slow circle",
      "standing-back": "his hand comes down and presses into the centre line of her backside, fingers working slowly",
      "straddle-away": "his palm presses into the centre line of her backside, fingers working in a slow circle",
    },
  },
  "pussy-rub-behind": {
    label: "Pussy rub from behind",
    camera: "back-low",
    framing: "3/4-body",
    poses: ["all-fours", "bent-forward", "side-lying", "standing-back", "straddle-away"],
    clauses: {
      "all-fours": "he leans in over her back and his hand reaches down between her thighs, rubbing slow circles low at the front of her body, his wrist buried between her legs",
      "bent-forward": "he leans over her back and his hand comes down between her thighs, rubbing slow circles low at the front of her body",
      "side-lying": "his hand comes over her hip and down between her thighs, rubbing slow circles low at the front of her body",
      "standing-back": "his hand comes around her waist and down between her thighs, rubbing slow circles low at the front of her body",
      "straddle-away": "his hand reaches around and down between her thighs, rubbing slow circles low at the front of her body",
    },
  },
"anal-finger": {
    label: "Anal finger",
    camera: "back-low",
    framing: "3/4-body",
    poses: ["all-fours", "prone", "side-lying", "seated-edge", "bent-forward"],
    clauses: {
      "all-fours": "his fingers press into the centre line of her backside, one fingertip pressed just past the edge, her back dipping",
      prone: "his hand comes down into the centre line of her backside, one fingertip pressed just past the edge",
      "side-lying": "his hand comes over her hip from behind and his fingertip presses into the centre line of her backside, just past the edge, her top leg lifting higher",
      "seated-edge": "he kneels behind her and one fingertip presses into the centre line of her backside, just past the edge",
      "bent-forward": "his fingers press into the centre line of her backside from behind, one fingertip pressed just past the edge",
    },
  },
  "pussy-press-front": {
    label: "Pussy press, front",
    camera: "front",
    framing: "close-up",
    poses: ["lying-back", "seated-edge-back", "straddle-facing", "side-lying"],
    clauses: {
      "lying-back": "his palm presses flat over her front, the heel of his hand low, holding still",
      "seated-edge-back": "his palm presses flat over her front from below, holding still",
      "straddle-facing": "his palm presses flat up against her front, holding still",
      "side-lying": "his palm presses flat over her front, holding still",
    },
  },
  "nipple-pinch": {
    label: "Nipple pinch",
    camera: "front",
    framing: "close-up",
    poses: ["lying-back", "straddle-facing", "side-lying", "standing-back", "lap-facing"],
    clauses: {
      "lying-back": "his thumb and finger close on one point of her chest through the cloth, tugging gently, her back lifting",
      "straddle-facing": "his thumb and finger close on one point of her chest, tugging, she arches",
      "side-lying": "his fingers find one point of her chest from behind and pinch, tugging gently",
      "standing-back": "his hand comes around and pinches one point of her chest, tugging",
      "lap-facing": "his thumb and finger close on one point of her chest, tugging gently",
    },
  },
  "nipple-tongue": {
    label: "Nipple tongue",
    camera: "3/4",
    framing: "close-up",
    poses: ["lying-back", "straddle-facing", "lap-facing", "wall-front"],
    clauses: {
      "lying-back": "his tongue at one point of her chest, circling, the cloth wet through",
      "straddle-facing": "she holds his head down, his tongue circling one point of her chest",
      "lap-facing": "his tongue circling one point of her chest, her head tipped back",
      "wall-front": "his tongue at one point of her chest, her back to the wall",
    },
  },
  "thigh-kiss": {
    label: "Thigh kiss",
    camera: "3/4",
    framing: "close-up",
    poses: ["lying-back", "seated-edge-back", "side-lying", "prone"],
    clauses: {
      "lying-back": "he turns his head and presses his mouth to the inside of her thigh, working upward",
      "seated-edge-back": "he kneels and presses his mouth to the inside of her thigh",
      "side-lying": "he presses his mouth to the inside of her lifted thigh",
      prone: "he presses his mouth to the back of her thigh, working up",
    },
  },
  spank: {
    label: "Spank",
    camera: "back-low",
    framing: "3/4-body",
    poses: ["all-fours", "bent-forward", "prone", "table-brace", "straddle-away"],
    clauses: {
      "all-fours": "his palm comes down flat on her backside, the cloth snapping tight, her hips jolting forward",
      "bent-forward": "his palm comes down flat on her backside from behind, the cloth snapping tight",
      prone: "he brings his palm down on her backside, the cloth snapping tight",
      "table-brace": "his palm comes down flat on her backside, the cloth snapping tight",
      "straddle-away": "his palm comes down on her backside, the cloth snapping tight, she rocks forward",
      "lap-facing": "his palm comes down on her backside where it meets his lap",
    },
  },
  "her-hand-on-his-chest": {
    label: "Her hand on his chest",
    camera: "3/4",
    framing: "half-body",
    poses: ["lying-back", "straddle-facing", "side-lying", "standing-front"],
    clauses: {
      "lying-back": "her palm flat on his chest, fingers spread, holding him up",
      "straddle-facing": "her palm flat on his chest, bracing",
      "side-lying": "her hand flat on his chest, holding him back",
      "standing-front": "her palm flat on his chest, fingers spread",
    },
  },
  "her-fingers-in-his-mouth": {
    label: "Her fingers in his mouth",
    camera: "3/4",
    framing: "close-up",
    poses: ["lying-back", "straddle-facing", "lap-facing", "side-lying"],
    clauses: {
      "lying-back": "she pushes two fingers into his mouth, he closes his lips around them",
      "straddle-facing": "she lifts her hand to his mouth, two fingers between his lips",
      "lap-facing": "her fingers at his mouth, he takes them in",
      "side-lying": "she reaches back and slides two fingers into his mouth",
    },
  },
  "back-scratch": {
    label: "Back scratch",
    camera: "3/4",
    framing: "half-body",
    poses: ["lying-back", "straddle-facing", "lap-facing", "wall-front"],
    clauses: {
      "lying-back": "her nails drag down his back as he leans over her",
      "straddle-facing": "her nails drag down his back, leaving faint lines",
      "lap-facing": "her nails drag slowly down his back",
      "wall-front": "her nails drag down his back, her other arm around his neck",
    },
  },
  tribbing: {
    label: "Tribbing (ff)",
    camera: "3/4",
    framing: "3/4-body",
    poses: ["side-lying", "straddle-facing", "lying-back"],
    clauses: {
      "side-lying": "their thighs interlocked, fronts pressed together, both rocking",
      "straddle-facing": "she kneels over her, thighs between hers, fronts pressed, hips rolling",
      "lying-back": "she lies over her, one thigh between both of hers, hips rocking",
    },
  },
  "wrist-hold-her": {
    label: "Her wrists held",
    camera: "3/4",
    framing: "half-body",
    poses: ["lying-back", "wall-front", "prone", "standing-front"],
    clauses: {
      "lying-back": "his hand closed around both her wrists, pinning them above her head",
      "wall-front": "his hand closed around both her wrists, pinning them to the wall",
      prone: "his hand closed around both her wrists, pinning them above her head",
      "standing-front": "his hand closed around both her wrists, drawing them together",
    },
  },
  "foot-hold": {
    label: "Foot hold",
    camera: "3/4",
    framing: "half-body",
    poses: ["lying-back", "seated-edge-back", "side-lying"],
    clauses: {
      "lying-back": "his hand closed around her ankle, lifting her foot to his chest",
      "seated-edge-back": "his hand closed around her ankle, drawing her foot up",
      "side-lying": "his hand closed around her top ankle, holding her leg up",
    },
  },
};

export function contactLabel(a: ContactAction): string {
  return CONTACT[a].label;
}