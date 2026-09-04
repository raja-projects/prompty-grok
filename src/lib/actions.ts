export type ActionCategoryId =
  | "everyday"
  | "social"
  | "physical"
  | "romance"
  | "intimate";

export interface ActionItem {
  id: string;
  label: string;
  /** Soft phrase injected into prompts */
  prompt: string;
  category: ActionCategoryId;
  /** Suggested place ids when this action is picked */
  placeHints?: string[];
  minPeople?: number;
}

export const ACTION_CATEGORIES: {
  id: ActionCategoryId;
  label: string;
  description: string;
  restricted?: boolean;
}[] = [
  {
    id: "everyday",
    label: "Everyday / posture",
    description: "Standing, sitting, walking, and daily poses",
  },
  {
    id: "social",
    label: "Social",
    description: "Talking, laughing, greeting, comforting",
  },
  {
    id: "physical",
    label: "Physical / play",
    description: "Sports, hobbies, staged action, leisure",
  },
  {
    id: "romance",
    label: "Romance",
    description: "Affectionate but indirect — hands, hugs, kisses",
  },
  {
    id: "intimate",
    label: "Intimate (intense)",
    description: "Soft → hard scenes in indirect wording only — no explicit terms",
    restricted: true,
  },
];

export const ACTIONS: ActionItem[] = [
  // Everyday / posture
  { id: "sitting", label: "Sitting", prompt: "sitting casually", category: "everyday", placeHints: ["home-interior", "cafe", "courtyard", "balcony"] },
  { id: "standing", label: "Standing", prompt: "standing naturally", category: "everyday", placeHints: ["market", "temple-vicinity", "rooftop"] },
  { id: "walking", label: "Walking", prompt: "walking at an easy pace", category: "everyday", placeHints: ["beach-kerala", "market", "riverside", "rainforest"] },
  { id: "running", label: "Running", prompt: "running with energetic stride", category: "everyday", placeHints: ["beach-kerala", "park", "riverside"] },
  { id: "leaning", label: "Leaning", prompt: "leaning against a surface", category: "everyday", placeHints: ["balcony", "cafe", "home-interior"] },
  { id: "kneeling", label: "Kneeling", prompt: "kneeling gently", category: "everyday", placeHints: ["temple-vicinity", "garden", "home-interior"] },
  { id: "lying-down", label: "Lying down", prompt: "lying down relaxed", category: "everyday", placeHints: ["bedroom", "beach-kerala", "home-interior"] },
  { id: "stretching", label: "Stretching", prompt: "stretching after rest", category: "everyday", placeHints: ["bedroom", "gym", "balcony"] },
  { id: "climbing", label: "Scrambling / climbing", prompt: "scrambling up a gentle incline", category: "everyday", placeHints: ["rainforest", "riverside", "hills"] },
  { id: "crouching", label: "Crouching", prompt: "crouching low", category: "everyday", placeHints: ["garden", "market"] },
  { id: "resting-chin", label: "Resting chin on hand", prompt: "resting chin thoughtfully on hand", category: "everyday", placeHints: ["cafe", "balcony", "home-interior"] },
  { id: "looking-away", label: "Looking into distance", prompt: "gazing into the distance", category: "everyday", placeHints: ["rooftop", "beach-kerala", "balcony"] },
  { id: "waiting", label: "Waiting patiently", prompt: "waiting patiently", category: "everyday", placeHints: ["cafe", "station", "market"] },
  { id: "crossing-arms", label: "Arms crossed", prompt: "standing with arms crossed casually", category: "everyday" },
  { id: "hands-in-pockets", label: "Hands in pockets", prompt: "standing with hands in pockets", category: "everyday" },
  { id: "adjusting-attire", label: "Adjusting attire", prompt: "adjusting clothing casually", category: "everyday" },
  { id: "tying-hair", label: "Tying hair", prompt: "tying hair back", category: "everyday", placeHints: ["balcony", "home-interior", "beach-kerala"] },
  { id: "drinking-tea", label: "Sipping tea", prompt: "sipping tea from a cup", category: "everyday", placeHints: ["cafe", "home-interior", "courtyard"] },
  { id: "umbrella", label: "Holding umbrella", prompt: "holding an umbrella", category: "everyday", placeHints: ["market", "street", "courtyard"] },
  { id: "carrying-bag", label: "Carrying bag", prompt: "carrying a cloth bag", category: "everyday", placeHints: ["market", "street"] },

  // Social
  { id: "talking", label: "Talking", prompt: "engaged in conversation", category: "social", placeHints: ["cafe", "courtyard", "office", "home-interior"], minPeople: 2 },
  { id: "laughing", label: "Laughing", prompt: "laughing together warmly", category: "social", placeHints: ["cafe", "home-interior", "park"], minPeople: 2 },
  { id: "arguing", label: "Arguing (mild)", prompt: "having a mild disagreement with expressive gestures", category: "social", placeHints: ["office", "home-interior", "street"], minPeople: 2 },
  { id: "comforting", label: "Comforting", prompt: "comforting one another with a gentle hand on the shoulder", category: "social", placeHints: ["home-interior", "park", "cafe"], minPeople: 2 },
  { id: "waving", label: "Waving", prompt: "waving hello", category: "social", placeHints: ["street", "balcony", "beach-kerala"] },
  { id: "handshake", label: "Handshake", prompt: "sharing a friendly handshake", category: "social", placeHints: ["office", "cafe"], minPeople: 2 },
  { id: "high-five", label: "High five", prompt: "sharing a high five", category: "social", placeHints: ["gym", "park"], minPeople: 2 },
  { id: "storytelling", label: "Storytelling", prompt: "telling a lively story with animated hands", category: "social", placeHints: ["cafe", "courtyard", "home-interior"], minPeople: 2 },
  { id: "listening", label: "Listening intently", prompt: "listening intently", category: "social", placeHints: ["cafe", "office"], minPeople: 2 },
  { id: "greeting", label: "Greeting with namaste", prompt: "greeting with a respectful namaste", category: "social", placeHints: ["temple-vicinity", "home-interior", "courtyard"] },
  { id: "group-chat", label: "Group chat huddle", prompt: "huddled in a lively group chat", category: "social", placeHints: ["cafe", "office", "courtyard"], minPeople: 3 },
  { id: "selfie", label: "Taking selfie", prompt: "taking a cheerful selfie together", category: "social", placeHints: ["rooftop", "beach-kerala", "cafe"], minPeople: 2 },
  { id: "pointing", label: "Pointing something out", prompt: "pointing something out with curiosity", category: "social", placeHints: ["market", "museum", "park"], minPeople: 2 },
  { id: "celebrating", label: "Celebrating", prompt: "celebrating a small victory together", category: "social", placeHints: ["cafe", "home-interior", "rooftop"], minPeople: 2 },
  { id: "teaching", label: "Teaching / showing", prompt: "patiently showing how something is done", category: "social", placeHints: ["kitchen", "office", "garden"], minPeople: 2 },
  { id: "farewell", label: "Saying goodbye", prompt: "saying a warm goodbye", category: "social", placeHints: ["station", "street", "courtyard"], minPeople: 2 },

  // Physical / play
  { id: "staged-fight", label: "Fighting (staged)", prompt: "performing a staged playful fight pose", category: "physical", placeHints: ["gym", "courtyard", "park"], minPeople: 2 },
  { id: "bathing", label: "Bathing (tasteful)", prompt: "enjoying a tasteful bath scene with water and calm mood", category: "physical", placeHints: ["bathroom", "riverside"] },
  { id: "swimming", label: "Swimming", prompt: "swimming gracefully", category: "physical", placeHints: ["pool", "beach-kerala", "riverside"] },
  { id: "dancing", label: "Dancing", prompt: "dancing with joyful movement", category: "physical", placeHints: ["home-interior", "rooftop", "courtyard"] },
  { id: "cooking", label: "Cooking", prompt: "cooking together in a warm kitchen", category: "physical", placeHints: ["kitchen", "home-interior"] },
  { id: "reading", label: "Reading", prompt: "reading a book quietly", category: "physical", placeHints: ["cafe", "home-interior", "park", "library"] },
  { id: "yoga", label: "Yoga / stretch flow", prompt: "practicing a calm yoga pose", category: "physical", placeHints: ["balcony", "park", "beach-kerala", "gym"] },
  { id: "cycling", label: "Cycling", prompt: "riding a bicycle", category: "physical", placeHints: ["street", "park", "riverside"] },
  { id: "cricket", label: "Playing cricket", prompt: "playing a casual cricket game", category: "physical", placeHints: ["park", "beach-kerala"], minPeople: 2 },
  { id: "football", label: "Kicking a ball", prompt: "kicking a football casually", category: "physical", placeHints: ["park", "beach-kerala"] },
  { id: "gardening", label: "Gardening", prompt: "tending plants in a garden", category: "physical", placeHints: ["garden", "courtyard"] },
  { id: "fishing", label: "Fishing", prompt: "fishing by the water", category: "physical", placeHints: ["riverside", "beach-kerala"] },
  { id: "painting", label: "Painting", prompt: "painting on a canvas", category: "physical", placeHints: ["studio", "balcony", "home-interior"] },
  { id: "playing-instrument", label: "Playing instrument", prompt: "playing a musical instrument", category: "physical", placeHints: ["home-interior", "courtyard", "cafe"] },
  { id: "jogging", label: "Jogging", prompt: "jogging along a path", category: "physical", placeHints: ["park", "beach-kerala", "riverside"] },
  { id: "weightlifting", label: "Gym workout", prompt: "training lightly at the gym", category: "physical", placeHints: ["gym"] },
  { id: "board-game", label: "Board game", prompt: "playing a board game together", category: "physical", placeHints: ["home-interior", "cafe"], minPeople: 2 },
  { id: "kite", label: "Flying a kite", prompt: "flying a colorful kite", category: "physical", placeHints: ["beach-kerala", "park", "rooftop"] },
  { id: "boating", label: "Boating", prompt: "riding a small boat on calm water", category: "physical", placeHints: ["riverside", "backwaters"] },
  { id: "picnic", label: "Picnic", prompt: "enjoying a picnic spread", category: "physical", placeHints: ["park", "beach-kerala", "garden"], minPeople: 2 },

  // Romance (indirect)
  { id: "holding-hands", label: "Holding hands", prompt: "holding hands warmly", category: "romance", placeHints: ["beach-kerala", "park", "market", "riverside"], minPeople: 2 },
  { id: "hugging", label: "Hugging", prompt: "sharing a warm hug", category: "romance", placeHints: ["home-interior", "airport", "courtyard"], minPeople: 2 },
  { id: "kissing", label: "Kissing", prompt: "sharing a tender kiss", category: "romance", placeHints: ["balcony", "rooftop", "park"], minPeople: 2 },
  { id: "smooching", label: "Smooching", prompt: "sharing a soft smooch", category: "romance", placeHints: ["cafe", "balcony"], minPeople: 2 },
  { id: "forehead-kiss", label: "Forehead kiss", prompt: "placing a gentle forehead kiss", category: "romance", placeHints: ["home-interior", "balcony"], minPeople: 2 },
  { id: "close-embrace", label: "Close embrace", prompt: "wrapped in a close embrace", category: "romance", placeHints: ["balcony", "bedroom", "rooftop"], minPeople: 2 },
  { id: "leaning-shoulder", label: "Leaning on shoulder", prompt: "leaning comfortably on the other's shoulder", category: "romance", placeHints: ["cafe", "park", "home-interior"], minPeople: 2 },
  { id: "slow-dance", label: "Slow dance", prompt: "sharing a slow dance", category: "romance", placeHints: ["home-interior", "rooftop", "courtyard"], minPeople: 2 },
  { id: "cheek-kiss", label: "Cheek kiss", prompt: "giving a light cheek kiss", category: "romance", placeHints: ["cafe", "courtyard"], minPeople: 2 },
  { id: "walking-arm-in-arm", label: "Arm in arm", prompt: "walking arm in arm", category: "romance", placeHints: ["beach-kerala", "market", "park"], minPeople: 2 },
  { id: "whispering", label: "Whispered conversation", prompt: "sharing a whispered conversation up close", category: "romance", placeHints: ["cafe", "balcony", "park"], minPeople: 2 },
  { id: "forehead-touch", label: "Foreheads touching", prompt: "foreheads gently touching", category: "romance", placeHints: ["home-interior", "balcony"], minPeople: 2 },
  { id: "piggyback", label: "Playful piggyback", prompt: "giving a playful piggyback ride", category: "romance", placeHints: ["park", "beach-kerala"], minPeople: 2 },
  { id: "flower-gift", label: "Giving flowers", prompt: "presenting a small bouquet of flowers", category: "romance", placeHints: ["park", "cafe", "courtyard"], minPeople: 2 },
  { id: "under-umbrella", label: "Under one umbrella", prompt: "sharing one umbrella in light rain", category: "romance", placeHints: ["street", "courtyard"], minPeople: 2 },
  { id: "sunset-gaze", label: "Watching sunset together", prompt: "watching the sunset side by side", category: "romance", placeHints: ["beach-kerala", "rooftop", "balcony"], minPeople: 2 },

  // Intimate (soft euphemisms ONLY)
  { id: "shared-private", label: "Shared private moment", prompt: "sharing a quiet private moment of closeness", category: "intimate", placeHints: ["bedroom", "balcony", "home-interior"], minPeople: 2 },
  { id: "tender-closeness", label: "Tender closeness", prompt: "sharing tender closeness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "wrapped-together", label: "Wrapped together", prompt: "wrapped in each other's arms", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
  { id: "affectionate-intimacy", label: "Affectionate intimacy", prompt: "sharing affectionate intimacy with soft warmth", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "quiet-intimate-evening", label: "Quiet intimate evening", prompt: "enjoying a quiet intimate evening together", category: "intimate", placeHints: ["bedroom", "balcony", "home-interior"], minPeople: 2 },
  { id: "gentle-caress", label: "Gentle caress", prompt: "sharing a gentle caress on the arm", category: "intimate", placeHints: ["sofa", "bedroom", "balcony"], minPeople: 2 },
  { id: "passionate-kiss", label: "Passionate kiss", prompt: "sharing a passionate kiss", category: "intimate", placeHints: ["balcony", "bedroom", "rooftop"], minPeople: 2 },
  { id: "intimate-closeness", label: "Intimate closeness", prompt: "resting in intimate closeness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "soft-morning", label: "Soft morning together", prompt: "sharing a soft morning moment of affection", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
  { id: "candlelit-closeness", label: "Candlelit closeness", prompt: "sharing candlelit closeness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },

  // Intimate — more intense, still fully indirect / euphemistic
  { id: "deep-passionate-embrace", label: "Deep passionate embrace", prompt: "locked in a deep passionate embrace", category: "intimate", placeHints: ["bedroom", "home-interior", "balcony"], minPeople: 2 },
  { id: "breathless-closeness", label: "Breathless closeness", prompt: "sharing breathless closeness, faces inches apart", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "urgent-tender-hold", label: "Urgent tender hold", prompt: "holding each other with urgent tenderness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "entwined-on-bedding", label: "Entwined on soft bedding", prompt: "entwined together on soft bedding in a private moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tangled-sheets", label: "Tangled in soft sheets", prompt: "tangled together in soft sheets with quiet intimacy", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "under-covers-closeness", label: "Under-covers closeness", prompt: "sharing warm closeness under light covers", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "pressed-close-kiss", label: "Pressed-close kiss", prompt: "pressed close in a deep lingering kiss", category: "intimate", placeHints: ["bedroom", "home-interior", "balcony"], minPeople: 2 },
  { id: "wall-lean-kiss", label: "Leaned-to-wall kiss", prompt: "gently leaned toward a wall in a heated kiss", category: "intimate", placeHints: ["home-interior", "bedroom", "hotel"], minPeople: 2 },
  { id: "lap-closeness", label: "Seated-close affection", prompt: "seated close together in an intimate hold", category: "intimate", placeHints: ["sofa", "bedroom", "home-interior"], minPeople: 2 },
  { id: "waist-pull-close", label: "Pulled close by the waist", prompt: "pulled close by the waist into a heated embrace", category: "intimate", placeHints: ["bedroom", "home-interior", "balcony"], minPeople: 2 },
  { id: "hands-on-back", label: "Hands tracing the back", prompt: "hands tracing softly along the back in intimate affection", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "neck-nuzzle", label: "Nuzzling the neck", prompt: "nuzzling close along the neck with tender heat", category: "intimate", placeHints: ["bedroom", "sofa", "balcony"], minPeople: 2 },
  { id: "collarbone-kiss-trail", label: "Kiss trail along collarbone", prompt: "a soft trail of kisses along the collarbone", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "slow-burning-evening", label: "Slow-burning private evening", prompt: "sharing a slow-burning private evening of closeness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "lost-in-each-other", label: "Lost in each other", prompt: "completely lost in each other in quiet passion", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "heated-whispered-closeness", label: "Heated whispered closeness", prompt: "sharing heated whispered closeness", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
  { id: "moonlit-private-passion", label: "Moonlit private passion", prompt: "sharing moonlit private passion with soft shadows", category: "intimate", placeHints: ["bedroom", "balcony", "rooftop"], minPeople: 2 },
  { id: "rainy-window-intimacy", label: "Rainy-window intimacy", prompt: "intimate closeness by a rain-streaked window", category: "intimate", placeHints: ["bedroom", "home-interior", "hotel"], minPeople: 2 },
  { id: "sheer-curtain-silhouette", label: "Sheer-curtain silhouette", prompt: "silhouetted intimate closeness behind sheer curtains", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "falling-onto-bedding", label: "Falling onto soft bedding", prompt: "falling together onto soft bedding in a playful intimate tumble", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "straddled-close-hold", label: "Close seated hold", prompt: "in a close seated hold with faces nearly touching", category: "intimate", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "overnight-entwined", label: "Overnight entwined rest", prompt: "resting overnight entwined in quiet intimacy", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "morning-tangled-affection", label: "Morning tangled affection", prompt: "morning tangled affection in soft natural light", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "private-reunion", label: "Private reunion closeness", prompt: "a private reunion filled with intense closeness", category: "intimate", placeHints: ["bedroom", "hotel", "home-interior"], minPeople: 2 },
  { id: "hearts-racing-hold", label: "Hearts-racing hold", prompt: "holding each other in a hearts-racing close hold", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "consumed-by-longing", label: "Consumed by quiet longing", prompt: "consumed by quiet longing in a close embrace", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
  { id: "shared-warmth-under-blanket", label: "Shared warmth under a blanket", prompt: "sharing warmth under a blanket in intimate quiet", category: "intimate", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "forehead-to-chest", label: "Head rested on chest", prompt: "one head resting on the other's chest in intimate calm", category: "intimate", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "legs-entwined", label: "Legs entwined (tasteful)", prompt: "legs gently entwined while resting close", category: "intimate", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "slow-undress-hint", label: "Loosening outer layers (tasteful)", prompt: "tastefully loosening outer layers in a private intimate moment, modest and non-explicit", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "steam-kiss", label: "Steam-misted closeness", prompt: "steam-misted intimate closeness after a warm bath", category: "intimate", placeHints: ["bathroom", "bedroom"], minPeople: 2 },
  { id: "hotel-private-evening", label: "Private hotel evening", prompt: "a private hotel evening of intense but tasteful closeness", category: "intimate", placeHints: ["hotel", "bedroom"], minPeople: 2 },
  { id: "dim-light-devotion", label: "Dim-light devotion", prompt: "dim-light devotion and close passionate affection", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "locked-gaze-desire", label: "Locked-gaze desire", prompt: "locked gaze heavy with unspoken desire, still fully tasteful", category: "intimate", placeHints: ["bedroom", "cafe", "balcony"], minPeople: 2 },
  { id: "biting-lip-kiss", label: "Playful lip catch in a kiss", prompt: "a deep kiss with a playful catch of the lip", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
  { id: "pinned-softly", label: "Softly guided onto bedding", prompt: "softly guided onto bedding in a consensual intimate moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "straddle-edge-sofa", label: "Close overlap on the sofa", prompt: "overlapping closely on a sofa in heated affection", category: "intimate", placeHints: ["sofa", "home-interior"], minPeople: 2 },
  { id: "after-rain-rush", label: "After-rain rushed closeness", prompt: "rushed indoor closeness after coming in from the rain", category: "intimate", placeHints: ["home-interior", "bedroom"], minPeople: 2 },
  { id: "midnight-quiet-passion", label: "Midnight quiet passion", prompt: "midnight quiet passion in near-dark softness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "sunrise-lingering", label: "Sunrise lingering closeness", prompt: "lingering intimate closeness at sunrise", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
];

export function getActionsByCategory(
  category: ActionCategoryId,
  opts?: { allowIntimate?: boolean }
): ActionItem[] {
  if (category === "intimate" && opts?.allowIntimate === false) return [];
  return ACTIONS.filter((a) => a.category === category);
}

export function getActionById(id: string): ActionItem | undefined {
  return ACTIONS.find((a) => a.id === id);
}

export function randomEverydayOrSocialAction(): ActionItem {
  const pool = ACTIONS.filter(
    (a) => a.category === "everyday" || a.category === "social"
  );
  return pool[Math.floor(Math.random() * pool.length)]!;
}

export function isIntimateAction(id: string): boolean {
  return getActionById(id)?.category === "intimate";
}

export function categoryCounts(): Record<ActionCategoryId, number> {
  const counts = {
    everyday: 0,
    social: 0,
    physical: 0,
    romance: 0,
    intimate: 0,
  } as Record<ActionCategoryId, number>;
  for (const a of ACTIONS) counts[a.category] += 1;
  return counts;
}
