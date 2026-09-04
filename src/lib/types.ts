import type { ActionCategoryId } from "./actions";
import type {
  AspectRatio,
  CameraAngle,
  Framing,
  TimeOfDay,
} from "./camera";
import type {
  PeopleCount,
  PersonFields,
  Relationship,
} from "./people";

export type Mode = "image" | "video";

export type { AspectRatio, CameraAngle, Framing, TimeOfDay };
export type { PeopleCount, PersonFields, Relationship, ActionCategoryId };

export interface SceneFormState {
  mode: Mode;
  actionCategory: ActionCategoryId;
  actionId: string;
  regionIds: string[];
  peopleCount: PeopleCount;
  relationship: Relationship;
  people: PersonFields[];
  /** Simplified descriptors when peopleCount === "group" */
  crowdDescriptors: string;
  placeId: string;
  cameraAngle: CameraAngle;
  framing: Framing;
  aspectRatio: AspectRatio;
  timeOfDay: TimeOfDay;
  extraNotes: string;
  negativePrompt: string;
}

/** @deprecated kept for storage compatibility aliases */
export type PromptFormState = SceneFormState;

export interface BuiltPrompts {
  short: string;
  detailed: string;
  negative: string;
}

export interface RecentPrompt {
  id: string;
  createdAt: number;
  mode: Mode;
  subject: string;
  short: string;
  detailed: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  mode: Mode;
  icon: string;
  state: Partial<SceneFormState>;
}
