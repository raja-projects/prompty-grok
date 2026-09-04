export interface PlaceItem {
  id: string;
  label: string;
  prompt: string;
}

export const PLACES: PlaceItem[] = [
  { id: "home-interior", label: "Home interior", prompt: "a warm South Indian home interior" },
  { id: "courtyard", label: "Courtyard", prompt: "a traditional courtyard with soft daylight" },
  { id: "beach-kerala", label: "Beach (Kerala)", prompt: "a scenic Kerala beach with gentle waves and palms" },
  { id: "temple-vicinity", label: "Temple vicinity (exterior)", prompt: "respectful exterior near a temple precinct, no sacred interiors" },
  { id: "market", label: "Market", prompt: "a lively local market with colorful stalls" },
  { id: "cafe", label: "Cafe", prompt: "a cozy cafe with warm ambient light" },
  { id: "rainforest", label: "Rainforest", prompt: "a lush rainforest path with filtered green light" },
  { id: "riverside", label: "Riverside", prompt: "a calm riverside with reflective water" },
  { id: "bedroom", label: "Bedroom (tasteful)", prompt: "a tasteful bedroom with soft natural tones" },
  { id: "balcony", label: "Balcony", prompt: "a residential balcony overlooking greenery" },
  { id: "rooftop", label: "Rooftop", prompt: "a rooftop terrace with open sky" },
  { id: "office", label: "Office", prompt: "a modern office workspace" },
  { id: "gym", label: "Gym", prompt: "a clean contemporary gym" },
  { id: "pool", label: "Pool", prompt: "a resort swimming pool with clear water" },
  { id: "park", label: "Park", prompt: "a leafy public park" },
  { id: "garden", label: "Garden", prompt: "a flowering home garden" },
  { id: "kitchen", label: "Kitchen", prompt: "a lived-in home kitchen" },
  { id: "street", label: "Street", prompt: "a busy town street with everyday life" },
  { id: "station", label: "Station / transit", prompt: "a transit station platform" },
  { id: "library", label: "Library", prompt: "a quiet library with tall shelves" },
  { id: "studio", label: "Art studio", prompt: "a bright art studio" },
  { id: "bathroom", label: "Bathroom (tasteful)", prompt: "a tasteful bathroom with soft steam and calm lighting" },
  { id: "sofa", label: "Living room sofa", prompt: "a cozy living room with a sofa" },
  { id: "hills", label: "Hillside", prompt: "a green hillside trail" },
  { id: "backwaters", label: "Kerala backwaters", prompt: "serene Kerala backwaters with houseboats in the soft distance" },
  { id: "museum", label: "Museum / gallery", prompt: "a quiet museum gallery" },
  { id: "airport", label: "Airport arrivals", prompt: "an airport arrivals hall" },
  { id: "monsoon-street", label: "Monsoon street", prompt: "a rain-washed street during monsoon" },
];

export function getPlaceById(id: string): PlaceItem | undefined {
  return PLACES.find((p) => p.id === id);
}

export function randomPlace(preferIds?: string[]): PlaceItem {
  if (preferIds?.length) {
    const preferred = preferIds
      .map((id) => getPlaceById(id))
      .filter((p): p is PlaceItem => Boolean(p));
    if (preferred.length) {
      return preferred[Math.floor(Math.random() * preferred.length)]!;
    }
  }
  return PLACES[Math.floor(Math.random() * PLACES.length)]!;
}
