import type { EngineQuestion, Known } from "./chat-engine";
import { createStudioDefaults } from "./prompt-builder";
import type { SceneFormState } from "./types";
import type { Variation } from "./variations";

export interface ChatMsg {
  id: number;
  role: "user" | "bot";
  text: string;
  question?: EngineQuestion;
  cards?: Variation[];
}

export interface Chat {
  id: string;
  title: string;
  createdAt: number;
  messages: ChatMsg[];
  scene: SceneFormState;
  known: Known;
}

const KEY = "prompty-chats-v1";
let seq = Date.now();

export function nextMsgId(): number {
  seq += 1;
  return seq;
}

export function newChat(): Chat {
  return {
    id: `c${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
    title: "",
    createdAt: Date.now(),
    messages: [
      {
        id: nextMsgId(),
        role: "bot",
        text: "Tell me the scene — age, who, what they're doing, where. I'll build it and ask only what's missing.",
      },
    ],
    scene: createStudioDefaults(),
    known: { action: false, place: false, pose: false, people: false },
  };
}

export function loadChats(): Chat[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Chat[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveChats(chats: Chat[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(chats.slice(0, 40)));
  } catch {
    // ignore quota errors
  }
}