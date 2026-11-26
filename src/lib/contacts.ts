import type { CameraAngle, Framing, PoseTag } from "./camera";

export type ContactAction =
  | "asshole-lick"
  | "fingering-front"
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
  "all-fours": "she is on all fours, knees wide apart, hips lifted high and back dipped deep, the saree pulled up tight across her seat",
  "bent-forward": "she stands bent forward with her palms flat on the counter, back flat, hips pushed back",
  "side-lying": "they lie on their sides, her top leg lifted high over his hip",
  "seated-edge": "she sits at the edge of the bed, leaning forward on her elbows, hips near the edge",
  "seated-edge-back": "she sits at the edge of the bed, leaning back on her hands, knees apart",
  "kneeling-low": "she is low with her chest down and her forearms braced",
  "lying-back": "she lies on her back, knees raised and parted, one hand above her head",
  "kneeling-upright": "she kneels upright, weight on her heels, hands resting on her own thighs",
  "chair-sit": "she sits back in the chair, hands on the arms",
  "standing-front": "both stand upright and close, her hands on his chest",
  "standing-back": "both stand upright, her weight settled back into him",
  "straddle-facing": "she straddles him face to face, knees either side of his hips",
  "lap-facing": "she sits across his lap, one leg draped over his thigh",
  "wall-front": "her back is flat to the wall, one leg lifted and hooked around him",
  prone: "she lies flat on her stomach, cheek turned so her face is visible",
  "table-brace": "she braces both palms on the edge of the surface, hips back, back flat",
  "walking-hold": "she walks ahead mid-stride, weight shifting onto one hip",
  "queue-standing": "she stands in a queue facing forward, weight on one hip",
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
        "he kneels directly behind her with his knees outside her calves, his head low between her hips, face pressed into the centre line, one hand spreading her seat apart",
      "bent-forward":
        "he kneels directly behind her, head low, face pressed into the centre line, one hand spreading her seat apart",
      "side-lying":
        "he slides down behind her, face pressed into the centre line, one hand lifting her top leg higher",
      "seated-edge":
        "he kneels on the floor behind her, head low, face pressed into the centre line, one hand spreading her seat apart",
      "kneeling-low":
        "he kneels over her from behind, head low between her hips, face pressed into the centre line, one hand spreading her seat apart",
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
    framing: "close-up",
    poses: ["lying-back", "seated-edge-back", "side-lying", "straddle-facing", "kneeling-upright"],
    clauses: {
      "lying-back": "he kneels between her thighs with his face pressed close to her front, one hand cupping her hip, her fingers in his hair",
      "seated-edge-back": "he kneels on the floor between her parted knees, face pressed close to her front, one hand on her thigh",
      "side-lying": "he slides down her body, face pressed to her front, one hand holding her top leg up",
      "straddle-facing": "she moves up and straddles his chest, he pulls her down to his face, one hand on her hip",
      "kneeling-upright": "he kneels in front of her and leans in, face pressed to her front, one hand on her hip",
    },
  },
  "dick-suck": {
    label: "Dick suck",
    camera: "3/4",
    framing: "close-up",
    poses: ["kneeling-upright", "chair-sit", "standing-front", "seated-edge"],
    clauses: {
      "kneeling-upright": "he kneels close in front of her and she leans in, face at his lap, one hand braced on his thigh",
      "chair-sit": "he sits back in the chair and she kneels between his knees, face at his lap, one hand on his thigh",
      "standing-front": "he stands and she kneels in front of him, face at his lap, one hand on his thigh",
      "seated-edge": "he stands between her knees and she leans forward, face at his lap, one hand at his hip",
    },
  },
  "dick-hold": {
    label: "Dick hold",
    camera: "3/4",
    framing: "half-body",
    poses: ["lying-back", "straddle-facing", "standing-front", "side-lying", "seated-edge-back"],
    clauses: {
      "lying-back": "her hand closed around him through the fabric at his front, drawing slowly; he leans over her on one arm",
      "straddle-facing": "her hand reaches down between them and closes around him at his front, drawing slowly; she looks up at him",
      "standing-front": "her hand closed around him through the fabric at his front, one slow draw upward; her other hand flat on his chest",
      "side-lying": "her hand reaches back between them and closes around him at his front, drawing slowly",
      "seated-edge-back": "she leans back on one hand and her other hand closes around him at his front, drawing slowly",
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
      "straddle-facing": "she draws his head to her chest, his mouth at the upper curve, both hands at her waist",
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
    poses: ["lying-back", "seated-edge", "lap-facing", "side-lying"],
    clauses: {
      "lying-back": "his head lowered so his mouth is at her navel, both hands flat on her hips holding her steady, her stomach drawn in",
      "seated-edge": "he kneels in front of her, head lowered to her navel, both hands flat on her hips",
      "lap-facing": "she sits across his lap and he lowers his head to her navel, both hands flat on her hips",
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
    ],
    clauses: {
      "all-fours": "the saree pulled tight across her seat; his palm presses deep into it, fingers sinking between the two halves, the cloth pulled tighter around his hand, his weight leaning in",
      "bent-forward": "the saree pulled tight across her seat; his palm presses deep into it from behind, fingers sinking between the two halves",
      "standing-back": "the saree pulled tight across her seat; his palm presses deep into it from behind, fingers curling between the two halves",
      prone: "the saree pulled tight across her seat; he comes down over her back and drives his palm deep into it, fingers sinking between the two halves",
      "table-brace": "the saree pulled tight across her seat; his palm presses deep into it, fingers sinking between the two halves",
      "walking-hold":
        "the saree pulled tight across her seat; he walks half a step behind her and his palm presses deep into it mid-stride, fingers sinking between the two halves",
      "queue-standing":
        "the saree pulled tight across her seat; he stands close behind her and his palm presses deep into it, fingers sinking between the two halves",
    },
  },
  "crease-press": {
    label: "Crease press",
    camera: "back-low",
    framing: "3/4-body",
    poses: ["all-fours", "bent-forward", "prone", "table-brace", "standing-back"],
    clauses: {
      "all-fours": "his palm presses into the centre line, fingers working in a slow circle, knuckles readable through the cloth",
      "bent-forward": "his palm presses into the centre line from behind, fingers working in a slow circle",
      prone: "he presses his palm into the centre line, fingers working in a slow circle, his weight on the other arm",
      "table-brace": "his palm presses into the centre line, fingers working in a slow circle",
      "standing-back": "his hand comes down and presses into the centre line, fingers working slowly",
    },
  },
  "pussy-rub-behind": {
    label: "Pussy rub from behind",
    camera: "back-low",
    framing: "3/4-body",
    poses: ["all-fours", "bent-forward", "side-lying", "standing-back"],
    clauses: {
      "all-fours": "his hand reaches down between her thighs and rubs slow circles at her front, his wrist buried between her legs",
      "bent-forward": "his hand comes around and down between her thighs, rubbing slow circles at her front",
      "side-lying": "his hand slides down between her thighs from behind, rubbing slow circles at her front",
      "standing-back": "his hand comes around and down between her thighs, rubbing slow circles at her front",
    },
  },
};

export function contactLabel(a: ContactAction): string {
  return CONTACT[a].label;
}