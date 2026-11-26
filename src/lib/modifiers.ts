import type { ContactAction } from "./contacts";
import type { PoseTag } from "./camera";

export type ModifierKey =
  | "kiss"
  | "deep-kiss"
  | "neck-kiss"
  | "neck-bite"
  | "hair-grip"
  | "thigh-press"
  | "wrist-pin"
  | "pallu-away"
  | "blouse-open"
  | "brow-to-brow";

export interface ModifierDef {
  label: string;
  clause: string;
  hosts: ContactAction[];
  poses: PoseTag[];
}

/**
 * Secondary contacts. They never set a camera and never replace a pose
 * or a contact. `hosts` = contacts they attach to; `poses` = bare-pose use.
 */
export const MODIFIER: Record<ModifierKey, ModifierDef> = {
  kiss: {
    label: "Kiss",
    clause: "faces close, mouths together",
    hosts: ["dick-hold", "breast-suck"],
    poses: ["lying-back", "straddle-facing", "side-lying", "lap-facing", "standing-front", "wall-front", "seated-edge", "kneeling-upright", "prone"],
  },
  "deep-kiss": {
    label: "Deep kiss",
    clause: "mouths open, her hand at the back of his neck",
    hosts: ["dick-hold", "breast-suck"],
    poses: ["lying-back", "straddle-facing", "lap-facing", "wall-front", "standing-front"],
  },
  "neck-kiss": {
    label: "Neck kiss",
    clause: "his mouth at the side of her neck, just under the jaw",
    hosts: ["breast-press", "buttock-press", "crease-press", "pussy-rub-behind", "dick-hold"],
    poses: ["standing-back", "all-fours", "bent-forward", "queue-standing"],
  },
  "neck-bite": {
    label: "Neck bite",
    clause: "his teeth at the side of her neck, just under the jaw",
    hosts: ["breast-press", "buttock-press", "crease-press", "pussy-rub-behind", "dick-hold"],
    poses: ["standing-back", "all-fours", "bent-forward", "queue-standing"],
  },
  "hair-grip": {
    label: "Hair grip",
    clause: "his hand closed in her hair at the back of her head",
    hosts: ["dick-suck", "asshole-lick", "pussy-lick", "buttock-press", "crease-press"],
    poses: ["all-fours", "bent-forward", "kneeling-upright", "straddle-facing", "standing-back", "prone"],
  },
  "thigh-press": {
    label: "Inner thigh press",
    clause: "his palm flat and pressing on the inside of her thigh",
    hosts: ["fingering-front", "dick-hold", "pussy-lick"],
    poses: ["lying-back", "side-lying", "seated-edge", "standing-front"],
  },
  "wrist-pin": {
    label: "Wrist pin",
    clause: "both her wrists held together above her head",
    hosts: ["fingering-front", "breast-press"],
    poses: ["lying-back", "prone", "wall-front"],
  },
  "pallu-away": {
    label: "Pallu away",
    clause: "the pallu pulled clear of her shoulder",
    hosts: ["breast-press", "breast-suck", "armpit-lick", "buttock-press", "crease-press", "asshole-lick"],
    poses: ["standing-front", "standing-back", "lying-back", "all-fours", "bent-forward"],
  },
  "blouse-open": {
    label: "Blouse open",
    clause: "the blouse opened down the front",
    hosts: ["breast-press", "breast-suck"],
    poses: ["standing-front", "lying-back", "straddle-facing", "wall-front"],
  },
  "brow-to-brow": {
    label: "Brow to brow",
    clause: "foreheads touching, eyes shut",
    hosts: ["dick-hold", "breast-press"],
    poses: ["lying-back", "straddle-facing", "lap-facing"],
  },
};

export function availableModifiers(
  pose: PoseTag,
  contact?: ContactAction,
): ModifierKey[] {
  return (Object.keys(MODIFIER) as ModifierKey[]).filter((k) => {
    const m = MODIFIER[k];
    return contact ? m.hosts.includes(contact) : m.poses.includes(pose);
  });
}