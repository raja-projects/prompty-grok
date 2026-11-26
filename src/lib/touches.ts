import type { PoseTag } from "./camera";

/**
 * Accidental touches. A stranger's hand during an ordinary task, a husband
 * present and unaware. Supplies the situation and the witness only —
 * the contact supplies the hand, the pose is a fallback.
 */
export interface TouchDef {
  label: string;
  pretext: string;
  witness: string;
  pose: PoseTag;
}

export const TOUCH: Record<string, TouchDef> = {
  "ck-counter": {
    label: "Counter check",
    pretext: "she leans on the counter to read a form, weight on one forearm",
    witness: "her husband is two steps away reading the board, not looking",
    pose: "table-brace",
  },
  "ck-cinema": {
    label: "Cinema armrest",
    pretext: "she settles into the seat with her coat across her lap",
    witness: "her husband sits on her other side watching the screen",
    pose: "seated-edge-back",
  },
  "ck-hotel": {
    label: "Hotel corridor",
    pretext: "they walk the corridor single file past a trolley",
    witness: "her husband is ahead at the lift, back turned",
    pose: "standing-back",
  },
  "ck-tailor1": {
    label: "Tailor measures her seat",
    pretext: "she stands at the mirror while the tailor runs the tape round her hips",
    witness: "her husband waits on the shop stool",
    pose: "standing-front",
  },
  "ck-tailor2": {
    label: "Tailor measures her chest",
    pretext: "she holds her arms out while the tape goes round her upper body",
    witness: "her husband is at the counter with the order book",
    pose: "standing-front",
  },
  "ck-shoe1": {
    label: "Shoe shop, fitting bench",
    pretext: "she sits on the fitting bench with one foot out",
    witness: "her husband is at the shelf, reading boxes",
    pose: "seated-edge",
  },
  "ck-shoe2": {
    label: "Shoe shop, upper",
    pretext: "he crouches to check the fit by pressing the upper of the shoe",
    witness: "her husband is at the counter",
    pose: "seated-edge",
  },
  "ck-hair1": {
    label: "Salon chair",
    pretext: "she sits under the cape while the stylist lifts her hair",
    witness: "her husband is on the bench by the door",
    pose: "seated-edge-back",
  },
  "ck-gym1": {
    label: "Gym trainer, hip",
    pretext: "she holds a bench position mid-set",
    witness: "her husband is at the rack, between sets",
    pose: "prone",
  },
  "ck-gym2": {
    label: "Gym trainer, ribs",
    pretext: "she holds the bar at chest height",
    witness: "her husband is at the mirror",
    pose: "standing-front",
  },
  "ck-yoga1": {
    label: "Yoga hip correction",
    pretext: "she holds a folded forward position on the mat",
    witness: "her husband is on the next mat",
    pose: "all-fours",
  },
  "ck-yoga2": {
    label: "Yoga chest correction",
    pretext: "she holds a chest-open position with her arms back",
    witness: "her husband is on the next mat",
    pose: "kneeling-upright",
  },
  "ck-dental1": {
    label: "Dental chair",
    pretext: "she lies back in the chair with her head tipped",
    witness: "her husband waits by the door",
    pose: "lying-back",
  },
  "ck-eye1": {
    label: "Eye test",
    pretext: "she sits at the machine with her chin on the rest",
    witness: "her husband is on the waiting chair",
    pose: "seated-edge",
  },
  "ck-jewel1": {
    label: "Jewellery counter",
    pretext: "she leans in over the glass to see the tray",
    witness: "her husband is beside her, looking at the tray",
    pose: "table-brace",
  },
  "ck-saree1": {
    label: "Saree drape, pleats",
    pretext: "she stands with her arms out while the drape is pinned",
    witness: "her husband sits in the shop chair",
    pose: "standing-front",
  },
  "ck-saree2": {
    label: "Saree drape, pallu",
    pretext: "he brings the pallu across the front to pin it",
    witness: "her husband is at the counter",
    pose: "standing-front",
  },
  "ck-bus1": {
    label: "Bus seat, side",
    pretext: "she sits at the window with her bag on her lap",
    witness: "her husband stands in the aisle",
    pose: "seated-edge-back",
  },
  "ck-queue1": {
    label: "Queue",
    pretext: "she stands in the line, weight on one hip, purse at her elbow",
    witness: "her husband is further up the line",
    pose: "standing-back",
  },
  "ck-class": {
    label: "Classroom writing",
    pretext: "she sits writing with her head down",
    witness: "the rest of the row is empty",
    pose: "seated-edge",
  },
  "ck-umbrella": {
    label: "Rain umbrella",
    pretext: "they share one umbrella, both stooped under it",
    witness: "her husband walks behind with the bags",
    pose: "standing-back",
  },
  "ck-traindoor": {
    label: "Train doorway",
    pretext: "she stands in the open doorway as the train slows",
    witness: "her husband is inside the coach",
    pose: "standing-front",
  },
  "ck-busstep": {
    label: "Bus step down",
    pretext: "she steps down with her hand on the rail",
    witness: "her husband is on the platform",
    pose: "standing-back",
  },
  "ck-auto": {
    label: "Shared auto",
    pretext: "she sits on the bench with her knees together",
    witness: "her husband sits opposite",
    pose: "seated-edge-back",
  },
  "ck-templestep": {
    label: "Temple steps",
    pretext: "she lifts her hem to take the step",
    witness: "her husband is a step ahead",
    pose: "standing-back",
  },
  "ck-bag": {
    label: "Bag help at the door",
    pretext: "she is loaded with bags and the door is shut",
    witness: "her husband is at the car",
    pose: "standing-back",
  },
  "ck-bridge": {
    label: "Narrow bridge",
    pretext: "they cross the plank single file",
    witness: "her husband is at the far end",
    pose: "standing-back",
  },
  "ck-boat": {
    label: "Boat shore",
    pretext: "she steps off the boat with the gunwale rocking",
    witness: "her husband is on the bank",
    pose: "standing-back",
  },
  "ck-wedline": {
    label: "Wedding food line",
    pretext: "she holds her leaf plate in the queue",
    witness: "her husband is further up the line",
    pose: "standing-back",
  },
  "ck-twowheel": {
    label: "Two-wheeler pillion",
    pretext: "she sits side-saddle on the pillion",
    witness: "her husband is at the gate",
    pose: "seated-edge",
  },
  "ck-aisle": {
    label: "Narrow shop aisle",
    pretext: "she turns sideways to pass him between the shelves",
    witness: "her husband is at the till",
    pose: "standing-back",
  },
};

export type TouchKey = keyof typeof TOUCH;