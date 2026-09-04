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
  { id: "park", label: "Park (general)", prompt: "a leafy public park with open paths" },
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
  { id: "hotel", label: "Hotel room (tasteful)", prompt: "a tasteful hotel room with soft lamps and neat bedding" },
  { id: "boat-house", label: "Boat house", prompt: "inside a quiet boat house" },
  { id: "storeroom", label: "House storeroom", prompt: "a middle-class house storeroom" },
  { id: "mall-office", label: "Mall manager office", prompt: "a manager's office inside a shopping mall" },
  { id: "mall-corridor", label: "Mall security corridor", prompt: "a quiet empty security screening corridor inside a shopping mall" },
  { id: "theater", label: "Movie theater (general)", prompt: "inside a dim movie theater with soft screen glow" },
  { id: "auto-rickshaw", label: "Auto rickshaw", prompt: "inside a crowded auto rickshaw" },
  { id: "waterfall", label: "Private waterfall", prompt: "under a private waterfall with flowing water" },
  { id: "pond", label: "Quiet pond corner", prompt: "a quiet corner of a pond area" },
  { id: "village-path", label: "Village dirt path", prompt: "a red dirt village path under coconut trees" },
  { id: "festival-fair", label: "Festival fairground", prompt: "a tightly packed local festival fairground in the evening" },

  // Couple close / secluded public & tourist corners (alone, no onlookers)
  { id: "theater-back-row", label: "Theatre back row (close sit)", prompt: "dim movie theatre back row, couple sitting very close together in adjacent seats, screen glow only, empty nearby seats, no one noticing them" },
  { id: "theater-side-aisle", label: "Theatre side aisle seats", prompt: "dim movie theatre side-aisle seats, couple sitting tightly together, soft screen light, quiet empty aisle beside them, private from the crowd" },
  { id: "theater-balcony", label: "Theatre balcony seats", prompt: "upper balcony of a dim movie theatre, couple sitting close in a quiet corner row, soft screen glow below, no one looking their way" },
  { id: "park-bench-close", label: "Park bench close sit", prompt: "quiet park bench under trees, couple sitting pressed close together, empty path nearby, leafy cover, no onlookers" },
  { id: "park-standing-trees", label: "Park standing behind trees", prompt: "standing close together behind a thick cluster of park trees, shaded and hidden from the main path, leafy privacy, no one watching" },
  { id: "park-gazebo", label: "Park gazebo corner", prompt: "small park gazebo in a quiet corner, couple close together under the roof, empty surroundings, soft daylight through slats" },
  { id: "park-lake-edge", label: "Park lake edge secluded", prompt: "secluded edge of a park lake away from the walking trail, couple close together, water and reeds screening them, no visitors nearby" },
  { id: "park-night-lamp", label: "Park night under lamp", prompt: "quiet park at night under a single soft lamp, couple standing or sitting close, empty benches around, darkness giving privacy" },
  { id: "tourist-monument-corner", label: "Tourist monument quiet corner", prompt: "quiet outer corner of a tourist monument precinct, away from tour groups, stone wall recess, couple close together, no one seeing them" },
  { id: "tourist-fort-alcove", label: "Fort wall alcove", prompt: "deep stone alcove in an old fort wall at a tourist site, couple tucked close inside the shade, empty corridor beyond, private from visitors" },
  { id: "tourist-viewpoint-rail", label: "Scenic viewpoint rail", prompt: "tourist scenic viewpoint railing at a quiet off-hour, couple standing close at the rail, empty lookout, hills beyond, no crowd" },
  { id: "tourist-palace-corridor", label: "Palace museum side corridor", prompt: "narrow side corridor of a palace museum, soft window light, empty of tourists for a moment, couple standing close against the wall" },
  { id: "tourist-temple-outer", label: "Temple outer quiet colonnade", prompt: "quiet outer colonnade near a temple precinct exterior (not sacred interior), stone pillars, couple close together, no devotees nearby" },
  { id: "tourist-beach-rocks", label: "Beach rock cove (hidden)", prompt: "hidden cove between beach rocks away from the main shore crowd, couple close together, waves audible, no one in sight" },
  { id: "tourist-lighthouse-base", label: "Lighthouse base corner", prompt: "quiet corner at the base of a tourist lighthouse, windy open sky, empty path, couple standing close out of sight of visitors" },
  { id: "mall-stairwell", label: "Mall empty stairwell", prompt: "empty concrete stairwell inside a shopping mall, quiet landing between floors, couple close together, no cameras facing them closely, no shoppers" },
  { id: "mall-parking-corner", label: "Mall parking corner", prompt: "dim quiet corner of a multi-level mall parking garage, couple close between pillars, empty parked cars, no people walking past" },
  { id: "mall-fitting-alcove", label: "Mall quiet fitting alcove", prompt: "quiet outer alcove near store fitting rooms in a mall (public corridor side), soft lights, momentarily empty, couple standing close" },
  { id: "hotel-corridor-end", label: "Hotel corridor dead-end", prompt: "quiet dead-end of a hotel corridor, soft carpet and wall sconces, empty hallway, couple standing close, no guests nearby" },
  { id: "hotel-elevator-lobby", label: "Hotel elevator lobby alone", prompt: "small hotel elevator lobby between floors, soft lighting, momentarily empty, couple standing very close waiting alone" },
  { id: "rooftop-corner-night", label: "Rooftop corner at night", prompt: "dark corner of a residential rooftop at night, city glow in the distance, couple close together, empty terrace, private from street view" },
  { id: "balcony-night-close", label: "Balcony night close", prompt: "residential balcony at night with soft indoor spill light, couple sitting or standing close, neighbor windows dark, private outdoor nook" },
  { id: "bus-stop-night", label: "Empty night bus stop", prompt: "empty night bus stop shelter on a quiet road, couple sitting close on the bench, streetlamp glow, no other passengers" },
  { id: "train-empty-coach", label: "Near-empty train coach", prompt: "near-empty long-distance train coach, couple sitting close by the window, aisle clear, soft daylight, no passengers nearby" },
  { id: "library-stack-aisle", label: "Library stack aisle", prompt: "narrow aisle between tall library book stacks, soft overhead light, empty of other readers, couple standing close between shelves" },
  { id: "office-afterhours", label: "Office after-hours corner", prompt: "quiet office corner after hours, dim desk lamps, empty cubicles, couple close together, no colleagues present" },
  { id: "cafe-corner-booth", label: "Cafe corner booth", prompt: "deep corner booth of a quiet cafe, couple sitting close on the same side, low light, empty neighboring tables" },
  { id: "restaurant-private-nook", label: "Restaurant private nook", prompt: "semi-private nook table in a restaurant, curtain or partition giving privacy, couple sitting close, soft warm light" },
  { id: "garden-hedge-nook", label: "Garden hedge nook", prompt: "hidden nook behind tall garden hedges, soft filtered light, couple close together, screened from the house and path" },
  { id: "stairwell-apartment", label: "Apartment stair landing", prompt: "quiet apartment building stair landing between floors, couple standing close against the wall, empty stairs above and below" },
  { id: "underpass-quiet", label: "Quiet pedestrian underpass", prompt: "quiet pedestrian underpass with soft tunnel light, couple standing close against the tiled wall, empty of passersby" },
  { id: "bridge-pillar-shadow", label: "Bridge pillar shadow", prompt: "shadowed space beside a bridge pillar away from the walkway, couple close together, river below, no pedestrians nearby" },
  { id: "hill-view-pullout", label: "Hill road viewpoint pullout", prompt: "quiet hill-road viewpoint pullout off a tourist route, couple close at the rail or car side, empty lookout, misty hills" },
  { id: "backwaters-jetty-end", label: "Backwaters jetty end", prompt: "far end of a quiet Kerala backwaters jetty, couple sitting or standing close, still water, no boats docking nearby" },
  { id: "temple-pond-ghats-quiet", label: "Quiet temple pond ghat", prompt: "quiet stretch of temple pond steps (exterior ghat), soft evening light, couple close together, no crowd on that side" },
  { id: "zoo-shaded-path", label: "Zoo shaded side path", prompt: "shaded side path at a zoo or botanical garden away from main exhibits, couple standing close, empty benches, leafy cover" },
  { id: "amusement-queue-shade", label: "Amusement park shade corner", prompt: "quiet shaded corner beside an amusement park queue area during a lull, couple close together, no crowd looking their way" },
  { id: "church-courtyard-alcove", label: "Church courtyard alcove", prompt: "quiet alcove in an old church courtyard exterior, stone benches, soft light, couple sitting close, empty yard" },
  { id: "campus-behind-building", label: "Campus behind building", prompt: "quiet space behind a college campus building, soft shade, empty service path, couple standing close, no students nearby" },
  { id: "petrol-pump-back", label: "Petrol pump back lane", prompt: "quiet back lane behind a petrol pump at night, soft sodium light, couple close near a wall, no customers around" },

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
