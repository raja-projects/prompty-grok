export type Mode = "image" | "video";

export type AspectRatio =
  | "1:1"
  | "16:9"
  | "9:16"
  | "4:3"
  | "3:4"
  | "21:9"
  | "3:2"
  | "2:3";

export type QualityTag =
  | "high detail"
  | "8k"
  | "raw"
  | "cinematic"
  | "photorealistic"
  | "sharp focus"
  | "masterpiece"
  | "trending";

export interface PromptFormState {
  mode: Mode;
  subject: string;
  style: string;
  customStyle: string;
  camera: string;
  lighting: string;
  composition: string;
  motion: string;
  cameraMove: string;
  duration: string;
  aspectRatio: AspectRatio;
  qualityTags: QualityTag[];
  negativePrompt: string;
  target: string;
}

export interface BuiltPrompts {
  short: string;
  detailed: string;
  negative: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  mode: Mode;
  icon: string;
  state: Partial<PromptFormState>;
}

export interface RecentPrompt {
  id: string;
  createdAt: number;
  mode: Mode;
  subject: string;
  short: string;
  detailed: string;
}
