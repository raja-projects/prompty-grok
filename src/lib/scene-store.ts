"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_FORM } from "./prompt-builder";
import type { SceneFormState } from "./types";

let state: SceneFormState = DEFAULT_FORM;
let initialised = false;
const listeners = new Set<() => void>();

export function getScene(): SceneFormState {
  return state;
}

export function subscribeScene(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function updateScene(next: SceneFormState | ((prev: SceneFormState) => SceneFormState)): void {
  const value =
    typeof next === "function"
      ? (next as (prev: SceneFormState) => SceneFormState)(state)
      : next;
  if (value === state) return;
  state = value;
  listeners.forEach((listener) => listener());
}

export function hasInitialised(): boolean {
  return initialised;
}

export function markInitialised(): void {
  initialised = true;
}

export function useScene(): SceneFormState {
  return useSyncExternalStore(subscribeScene, getScene, () => DEFAULT_FORM);
}