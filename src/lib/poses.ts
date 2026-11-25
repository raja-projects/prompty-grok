/** Pose library: 6 groups x 6 poses. Indirect wording only — never a named pose. */

export type PoseGroup =
  | "standing"
  | "seated"
  | "reclining"
  | "floor"
  | "wall"
  | "dynamic";

export interface Pose {
  id: string;
  label: string;
  group: PoseGroup;
  /** Compact phrase for draft prompts. */
  brief: string;
  /** Fuller physical description for detailed prompts. */
  detailed: string;
}

export const POSE_GROUPS: { id: PoseGroup; label: string }[] = [
  { id: "standing", label: "Standing" },
  { id: "seated", label: "Seated" },
  { id: "reclining", label: "Lying down" },
  { id: "floor", label: "Low / floor" },
  { id: "wall", label: "Wall & leaning" },
  { id: "dynamic", label: "Moving" },
];

export const POSES: Pose[] = [
  // standing
  { id: "st-weight-one-leg", label: "Weight on one leg", group: "standing", brief: "standing, weight on one leg, other knee soft", detailed: "standing upright with all the weight carried on one leg, the other knee softly bent with the foot set slightly ahead, hips tilted, shoulders loose" },
  { id: "st-square-loose-arms", label: "Square, arms loose", group: "standing", brief: "standing square to the lens, arms loose, chin lowered", detailed: "standing square to the lens with the arms hanging loose at the sides, chin slightly lowered, shoulders dropped and relaxed" },
  { id: "st-side-arm-across", label: "Side profile, arm across", group: "standing", brief: "side profile, arm across the waist, head turned back", detailed: "standing in clean side profile with one arm drawn across the waist, head turned back over the shoulder toward the lens" },
  { id: "st-hands-clasped", label: "Hands clasped low", group: "standing", brief: "hands clasped in front of the waist, one shoulder low", detailed: "standing with the hands loosely clasped in front of the waist, one shoulder dropped lower than the other, weight even" },
  { id: "st-back-turned", label: "Back turned, head over shoulder", group: "standing", brief: "back to the lens, head over the shoulder, hand at the nape", detailed: "standing with the back fully to the lens, head turned over one shoulder, one hand resting at the nape, spine long" },
  { id: "st-tipped-forward", label: "Tipped forward", group: "standing", brief: "upper body tipped forward, arms hanging, gaze up", detailed: "standing with the upper body tipped slightly forward from the hips, arms hanging, gaze lifted toward the lens" },
  // seated
  { id: "se-chair-edge", label: "Front edge of the seat", group: "seated", brief: "seated on the seat edge, knees together, forearms on thighs", detailed: "seated on the very front edge of the seat, knees together, both feet flat, forearms resting along the thighs, back straight" },
  { id: "se-crossed-knee", label: "Crossed leg, hands folded", group: "seated", brief: "seated deep, one leg crossed, hands on the raised knee", detailed: "seated well back in the seat with one leg crossed over the other, hands folded on the raised knee, shoulders squared" },
  { id: "se-turned-away", label: "Turned away on the seat", group: "seated", brief: "seated turned away, torso twisted back, hand on the chair back", detailed: "seated turned away from the lens with the torso twisted back, one hand gripping the chair back, chin over the shoulder" },
  { id: "se-hips-forward", label: "Slid forward, curved spine", group: "seated", brief: "hips slid forward, spine curved, forearms on knees", detailed: "seated with the hips slid forward off the backrest, spine softly curved, forearms dropped across the knees, head low" },
  { id: "se-sideways", label: "Sideways across the seat", group: "seated", brief: "seated sideways, both legs to one side, hand braced behind", detailed: "seated sideways across the seat with both legs folded to one side, one hand braced flat behind the hip, torso open to the lens" },
  { id: "se-leaning-back", label: "Leaning back, throat long", group: "seated", brief: "leaning back into the seat, throat long, arm over the back", detailed: "seated leaning back into the seat with the throat drawn long, one arm draped along the backrest, knees apart" },
  // reclining
  { id: "re-on-side-propped", label: "On side, propped on forearm", group: "reclining", brief: "lying on one side, propped on the forearm, hips stacked", detailed: "lying on one side propped on the lower forearm, hips stacked one over the other, upper hand resting at the waist" },
  { id: "re-on-back-arms-up", label: "On back, arms overhead", group: "reclining", brief: "on the back, arms overhead, one knee bent", detailed: "lying flat on the back with both arms thrown loosely above the head, one knee bent up, ribs lifted" },
  { id: "re-face-down-propped", label: "Face down, propped up", group: "reclining", brief: "face down, propped on both forearms, ankles crossed", detailed: "lying face down propped on both forearms, shoulders lifted, back arched gently, ankles crossed in the air" },
  { id: "re-half-turned", label: "Half-turned on the hip", group: "reclining", brief: "half-turned onto one hip, head to the lens", detailed: "lying half-turned onto one hip with the shoulder rolled up, head turned toward the lens, upper leg bent forward" },
  { id: "re-stretched-long", label: "Stretched full length", group: "reclining", brief: "stretched full length on the back, arms alongside", detailed: "lying stretched to full length on the back, arms straight alongside the body, feet apart, body completely long" },
  { id: "re-curled", label: "Curled on one side", group: "reclining", brief: "curled on one side, knees up, hands under the cheek", detailed: "lying curled tight on one side, knees drawn up toward the chest, both hands tucked under the cheek" },
  // floor
  { id: "fl-kneeling-upright", label: "Kneeling upright", group: "floor", brief: "kneeling upright, weight back on the heels", detailed: "kneeling upright with the weight settled back onto the heels, hands flat on the thighs, spine tall" },
  { id: "fl-floor-knees-up", label: "Floor, knees drawn up", group: "floor", brief: "sitting on the floor, knees up, arms over the knees", detailed: "sitting on the floor with the knees drawn up high, arms folded across the tops of the knees, back rounded" },
  { id: "fl-legs-to-one-side", label: "Legs folded to one side", group: "floor", brief: "seated on the floor, legs to one side, palm down", detailed: "seated on the floor with both legs folded neatly to one side, one palm pressed flat to the ground, torso upright" },
  { id: "fl-lowered-forearms", label: "Torso lowered, hips high", group: "floor", brief: "torso lowered forward, weight on the forearms, hips high", detailed: "lowered onto the forearms with the torso angled down and the hips held high, shoulders drawn in, head turned" },
  { id: "fl-hip-sit", label: "Sitting on one hip", group: "floor", brief: "sitting low on one hip, one leg out, leaning on a hand", detailed: "sitting low on one hip with one leg extended and the other bent, weight taken on one flat hand, body angled to the lens" },
  { id: "fl-crouched", label: "Crouched", group: "floor", brief: "crouched on the balls of the feet, forearms on knees", detailed: "crouched low on the balls of the feet, forearms resting across the knees, chin lifted, heels raised" },
  // wall
  { id: "wa-shoulder-hip-cocked", label: "Shoulder to the wall", group: "wall", brief: "shoulder against the wall, hip cocked, ankles crossed", detailed: "standing with one shoulder flat against the wall, hip cocked out, ankles crossed, arms relaxed" },
  { id: "wa-palms-flat", label: "Palms flat on the wall", group: "wall", brief: "both palms flat on the wall, leaning in, head turned", detailed: "both palms pressed flat against the wall at shoulder height, body leaning in close, head turned back to the lens" },
  { id: "wa-back-slid-down", label: "Back to the wall, slid down", group: "wall", brief: "back to the wall, hips slid down, knees bent", detailed: "back flat against the wall with the hips slid down low, knees bent, hands braced on the wall behind" },
  { id: "wa-forearm-forehead", label: "Forearm and forehead to the wall", group: "wall", brief: "forearm on the wall, forehead near it, body angled out", detailed: "one forearm against the wall with the forehead close to it, body angled out away from the wall, feet back" },
  { id: "wa-doorway", label: "Leaning in a doorway", group: "wall", brief: "leaning in a doorway, one hand on the frame", detailed: "leaning into a doorway with one hand curled around the frame, weight on the back leg, shoulders easy" },
  { id: "wa-foot-on-wall", label: "Foot planted on the wall", group: "wall", brief: "back to the wall, one foot up on the wall", detailed: "back to the wall with one foot lifted and planted flat against it, hands at the hips, other leg straight" },
  // dynamic
  { id: "dy-mid-step", label: "Caught mid-step", group: "dynamic", brief: "caught mid-step, foot lifting, arms swinging", detailed: "caught mid-step with one foot forward and lifting, arms swinging counter to the legs, weight still travelling" },
  { id: "dy-turning", label: "Turning", group: "dynamic", brief: "turning, hair and cloth trailing, arm across the body", detailed: "turning on the spot with hair and loose cloth trailing behind, one arm swung across the body, weight on the pivot foot" },
  { id: "dy-rising", label: "Rising from the seat", group: "dynamic", brief: "caught rising, hips lifted, hands on the seat edge", detailed: "caught in the middle of rising from a seat, hips already lifted, both hands still on the seat edge, back angled forward" },
  { id: "dy-reaching-up", label: "Reaching overhead", group: "dynamic", brief: "reaching up with both arms, body long, heels lifting", detailed: "reaching overhead with both arms, the whole body stretched long, heels lifting off the ground, ribs open" },
  { id: "dy-lowering-down", label: "Lowering to the floor", group: "dynamic", brief: "caught lowering down, one knee down, hand to the ground", detailed: "caught lowering to the floor with one knee already down and one hand reaching to the ground, torso folding forward" },
  { id: "dy-walking-past", label: "Walking past the lens", group: "dynamic", brief: "walking past close, shoulder leading, head turned back", detailed: "walking past close to the lens with the shoulder leading, head turned back toward the camera, stride open" },
];

export function getPoseById(id: string | undefined): Pose | undefined {
  if (!id) return undefined;
  return POSES.find((pose) => pose.id === id);
}

export function posesForGroup(group: PoseGroup): Pose[] {
  return POSES.filter((pose) => pose.group === group);
}

export function randomPoseId(avoidId?: string): string {
  let pick = POSES[Math.floor(Math.random() * POSES.length)]!;
  if (avoidId && POSES.length > 1) {
    let guard = 0;
    while (pick.id === avoidId && guard++ < 12) {
      pick = POSES[Math.floor(Math.random() * POSES.length)]!;
    }
  }
  return pick.id;
}