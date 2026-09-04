import type { FavoritePerson, RecentPrompt } from "./types";
import type { PersonFields } from "./people";

const KEY = "prompty-recent-v1";
const MAX = 12;
const FAVORITES_KEY = "prompty-favorite-people-v1";

export function loadRecent(): RecentPrompt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RecentPrompt[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRecent(entry: Omit<RecentPrompt, "id" | "createdAt">): RecentPrompt[] {
  if (typeof window === "undefined") return [];
  const next: RecentPrompt = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
  };
  const list = [next, ...loadRecent().filter((r) => r.short !== next.short)].slice(0, MAX);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // ignore quota errors
  }
  return list;
}

export function clearRecent(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function loadFavoritePeople(): FavoritePerson[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]") as FavoritePerson[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFavoritePerson(name: string, person: PersonFields): FavoritePerson[] {
  const favorite: FavoritePerson = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim() || "Favorite person",
    person: { ...person },
  };
  const list = [favorite, ...loadFavoritePeople()];
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  return list;
}

export function deleteFavoritePerson(id: string): FavoritePerson[] {
  const list = loadFavoritePeople().filter((favorite) => favorite.id !== id);
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  return list;
}
