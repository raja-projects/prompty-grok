export type CoverLevel = "pallu-hip" | "saree-waist" | "bedsheet" | "none";

export interface CoverDef {
  id: CoverLevel;
  label: string;
  prompt: string;
  sheet: boolean;
}

/** Ordered most-covered first. Lower index = safer. */
export const COVER_LEVELS: CoverDef[] = [
  {
    id: "pallu-hip",
    label: "Pallu across hip",
    prompt: "the saree wrapped to the hip, the pallu across it",
    sheet: false,
  },
  {
    id: "saree-waist",
    label: "Saree open at waist",
    prompt: "the saree open at the waist, the pallu fallen back",
    sheet: false,
  },
  {
    id: "bedsheet",
    label: "Bedsheet only",
    prompt: "a bedsheet over the hip only",
    sheet: true,
  },
  {
    id: "none",
    label: "No cover",
    prompt: "the saree low at the hip, the midriff bare",
    sheet: false,
  },
];

const ORDER: CoverLevel[] = COVER_LEVELS.map((c) => c.id);

export function coverIndex(level: CoverLevel): number {
  const i = ORDER.indexOf(level);
  return i < 0 ? 0 : i;
}

/** Under 19 shifts one step more covered, floored at pallu-hip. */
export function resolveCover(level: CoverLevel, femaleAge: number): CoverLevel {
  const i = coverIndex(level);
  const shifted = femaleAge < 19 ? Math.max(0, i - 1) : i;
  return ORDER[shifted]!;
}

export function coverPhrase(level: CoverLevel, femaleAge: number): string {
  const def = COVER_LEVELS.find((c) => c.id === resolveCover(level, femaleAge))!;
  return def.sheet ? `${def.prompt}, the join visible` : def.prompt;
}

export function coverNeedsSheet(level: CoverLevel, femaleAge: number): boolean {
  return COVER_LEVELS.find((c) => c.id === resolveCover(level, femaleAge))!.sheet;
}