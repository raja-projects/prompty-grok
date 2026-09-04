export type CameraAngle =
  | "front"
  | "back"
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

export const CAMERA_ANGLES: { id: CameraAngle; label: string; prompt: string }[] = [
  { id: "front", label: "Front", prompt: "front-facing camera angle" },
  { id: "back", label: "Back", prompt: "shot from behind, any woman turns her head to show her face clearly" },
  { id: "side", label: "Side", prompt: "side profile angle" },
  { id: "3/4", label: "3/4", prompt: "three-quarter angle" },
  { id: "over-shoulder", label: "Over-shoulder", prompt: "over-the-shoulder framing, any woman\'s face still visible in frame" },
  { id: "low-angle", label: "Low angle", prompt: "low-angle perspective" },
  { id: "high-angle", label: "High angle", prompt: "high-angle perspective" },
  { id: "eye-level", label: "Eye-level", prompt: "eye-level camera" },
];

export const FRAMINGS: { id: Framing; label: string; prompt: string }[] = [
  { id: "extreme-close-up", label: "Extreme close-up", prompt: "extreme close-up" },
  { id: "close-up", label: "Close-up", prompt: "close-up portrait framing" },
  { id: "medium", label: "Medium", prompt: "medium shot" },
  { id: "half-body", label: "Half body", prompt: "half-body framing" },
  { id: "3/4-body", label: "3/4 body", prompt: "three-quarter body framing" },
  { id: "full-body", label: "Full body", prompt: "full-body framing" },
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
  {
    id: "morning",
    label: "Morning",
    lighting: "soft morning light, gentle cool-warm balance, fresh atmosphere",
  },
  {
    id: "day",
    label: "Day",
    lighting: "bright daylight, clear sky illumination, natural clarity",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    lighting: "harsh noon-to-afternoon sun, strong highlights with crisp shadows",
  },
  {
    id: "evening",
    label: "Evening",
    lighting: "golden hour warmth, long soft shadows, glowing rim light",
  },
  {
    id: "dusk",
    label: "Dusk",
    lighting: "warm dusk tones transitioning to blue hour, soft ambient glow",
  },
  {
    id: "night",
    label: "Night",
    lighting: "low-key night scene with practical lights, subtle highlights, deep shadows",
  },
];

export function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function randomCameraDefaults() {
  return {
    cameraAngle: pickRandom(CAMERA_ANGLES).id,
    framing: pickRandom(FRAMINGS).id,
    aspectRatio: pickRandom(ASPECT_RATIOS),
    timeOfDay: pickRandom(TIMES_OF_DAY).id,
  };
}
