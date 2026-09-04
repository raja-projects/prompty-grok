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

  // Intimate — harder heat, still fully indirect / no forbidden terms
  { id: "feverish-rhythm", label: "Feverish shared rhythm", prompt: "moving together in a feverish shared rhythm of closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hips-pressed-flush", label: "Hips pressed flush", prompt: "hips pressed flush in a heated private hold", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "slow-grind-euphemism", label: "Slow rolling closeness", prompt: "slow rolling closeness, bodies moving as one", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "rising-falling-together", label: "Rising and falling together", prompt: "rising and falling together in an intense shared rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "straddled-heat", label: "Straddled heated hold", prompt: "in a straddled heated hold, faces nearly touching", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "guided-from-behind-hold", label: "Held close from behind", prompt: "held close from behind in a heated intimate embrace", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "bent-to-dresser-heat", label: "Leaned-to-furniture heat", prompt: "gently leaned toward furniture in a heated private hold", category: "intimate", placeHints: ["bedroom", "hotel"], minPeople: 2 },
  { id: "shower-steam-pressed", label: "Steam-pressed shower closeness", prompt: "pressed close in warm steam in a private bath space, modest and non-explicit", category: "intimate", placeHints: ["bathroom", "hotel"], minPeople: 2 },
  { id: "trembling-want", label: "Trembling with quiet want", prompt: "trembling with quiet want in a tight embrace", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "claiming-deep-kiss", label: "Claiming deep kiss", prompt: "sharing a claiming deep kiss full of hunger", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "shoulder-bite-soft", label: "Soft shoulder catch", prompt: "a soft catch of teeth at the shoulder in heated affection", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hair-gather-kiss", label: "Hair gathered for a kiss", prompt: "hair gently gathered aside for a heated kiss along the neck", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "wrists-guided-soft", label: "Wrists guided softly", prompt: "wrists guided softly above the head in a consensual heated moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "legs-wrapped-tight", label: "Legs wrapped tight", prompt: "legs wrapped tightly while locked in intimate closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "arch-into-touch", label: "Arching into the touch", prompt: "arching into the touch with quiet intensity", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hands-under-fabric", label: "Hands under soft fabric", prompt: "hands exploring under soft fabric in a private heated moment, still non-explicit", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "skin-on-skin-hint", label: "Warm skin-to-skin closeness", prompt: "warm skin-to-skin closeness kept tasteful and non-explicit", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "breath-on-ear", label: "Breath against the ear", prompt: "warm breath against the ear with whispered heat", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "afterglow-entwined", label: "Quiet afterglow entwined", prompt: "quietly entwined in soft afterglow closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "still-shaking-hold", label: "Still-shaking close hold", prompt: "still shaking softly while held in a close after-moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hungry-reunion-rush", label: "Hungry reunion rush", prompt: "a hungry rushed reunion of heated closeness at the door", category: "intimate", placeHints: ["home-interior", "hotel"], minPeople: 2 },
  { id: "against-closed-door", label: "Against a closed door", prompt: "pressed together against a closed door in urgent affection", category: "intimate", placeHints: ["home-interior", "hotel"], minPeople: 2 },
  { id: "kitchen-counter-heat", label: "Kitchen-counter heat", prompt: "lifted to a kitchen counter for a heated private kiss and hold", category: "intimate", placeHints: ["home-interior"], minPeople: 2 },
  { id: "sofa-edge-urgency", label: "Sofa-edge urgency", prompt: "urgent closeness at the edge of a sofa", category: "intimate", placeHints: ["sofa", "home-interior"], minPeople: 2 },
  { id: "floor-blanket-passion", label: "Floor-blanket passion", prompt: "intimate passion on a soft blanket on the floor", category: "intimate", placeHints: ["home-interior", "bedroom"], minPeople: 2 },
  { id: "mirror-silhouette-heat", label: "Mirror silhouette heat", prompt: "heated silhouette closeness near a mirror, non-explicit", category: "intimate", placeHints: ["bedroom", "hotel"], minPeople: 2 },
  { id: "balcony-door-pull-in", label: "Pulled in from the balcony", prompt: "pulled in from the balcony into heated indoor closeness", category: "intimate", placeHints: ["balcony", "bedroom"], minPeople: 2 },
  { id: "rain-soaked-rush-inside", label: "Rain-soaked rush inside", prompt: "rain-soaked and rushing into heated indoor closeness", category: "intimate", placeHints: ["home-interior", "bedroom"], minPeople: 2 },
  { id: "midnight-fever", label: "Midnight fever closeness", prompt: "midnight fever of intense private closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "pre-dawn-again", label: "Pre-dawn closeness again", prompt: "finding each other again in pre-dawn intimate closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "slow-undress-buttons", label: "Slow unbuttoning (tasteful)", prompt: "slowly unbuttoning outer layers in a private heated moment, modest framing", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "shirt-over-head-hint", label: "Soft fabric pulled away", prompt: "soft fabric gently pulled away in a tasteful private moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "chest-to-chest-heat", label: "Chest-to-chest heat", prompt: "chest-to-chest in a heated breathless hold", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "thigh-guided-closer", label: "Guided closer by the thigh", prompt: "guided closer by a hand at the thigh in heated consent", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "rocking-slow-heat", label: "Slow rocking heat", prompt: "slow rocking heat while locked in an intimate embrace", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "deep-locked-rhythm", label: "Deep locked rhythm", prompt: "locked together in a deep shared rhythm of closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "gasping-quiet-heat", label: "Quiet gasping heat", prompt: "quiet gasping heat muffled against a shoulder", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "name-whispered-heat", label: "Name whispered in heat", prompt: "a name whispered in the heat of private closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "eyes-half-lidded", label: "Half-lidded locked eyes", prompt: "half-lidded eyes locked in heated unspoken want", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "sweat-glistened-closeness", label: "Warm-glistened closeness", prompt: "warm-glistened closeness after intense private affection", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tangled-again", label: "Tangled together again", prompt: "tangled together again before the night is over", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "cannot-get-close-enough", label: "Cannot get close enough", prompt: "trying to get impossibly closer in heated affection", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "devoured-by-kiss", label: "Devoured by a kiss", prompt: "nearly devouring each other in a deep heated kiss", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "slow-worshipful-touch", label: "Slow worshipful touch", prompt: "slow worshipful touch along the body kept fully tasteful", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "pinned-by-gaze-and-hips", label: "Held by gaze and hips", prompt: "held in place by a heavy gaze and close hips", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },

  // Intimate — body-focused heat, fully euphemistic (no anatomy / banned terms)
  { id: "cupping-chest-curves", label: "Cupping soft chest curves", prompt: "cupping soft chest curves through fabric with hungry hands", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "squeezing-chest-through-fabric", label: "Squeezing chest through fabric", prompt: "gently squeezing soft chest curves through thin fabric", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hands-claiming-chest", label: "Hands claiming the chest", prompt: "both hands claiming the chest in a heated private hold", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "palm-at-chest-heartbeat", label: "Palm flat on the chest", prompt: "a warm palm pressed flat against the chest, feeling every breath", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-at-chest-curve", label: "Mouth along chest curves", prompt: "mouth lingering along soft chest curves over fabric, tasteful and non-explicit", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "kiss-trail-down-chest", label: "Kiss trail down the chest", prompt: "a heated kiss trail moving down the chest", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "chest-pressed-flush-hands", label: "Chest pressed with exploring hands", prompt: "chest pressed flush while exploring hands claim soft curves", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "teasing-chest-edges", label: "Teasing at chest edges", prompt: "teasing fingertips along the edges of soft chest curves", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "firm-rear-squeeze", label: "Firm rear squeeze", prompt: "a firm squeeze of soft rear curves in a heated hold", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "palming-hips-from-behind", label: "Palming hips from behind", prompt: "palming soft hips from behind and pulling closer", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "hands-claiming-seat", label: "Hands claiming the seat", prompt: "hands claiming the seat with a hungry squeeze", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "lifted-by-hips", label: "Lifted closer by the hips", prompt: "lifted closer by a firm hold at the hips", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "rear-curves-guided", label: "Guiding soft rear curves", prompt: "guiding soft rear curves into a closer heated hold", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hip-grip-while-kissing", label: "Hip grip while kissing", prompt: "a tight hip grip while lost in a deep kiss", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "fingertips-intimate-warmth", label: "Fingertips exploring intimate warmth", prompt: "skilled fingertips exploring intimate warmth with slow care", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "fingers-between-thighs", label: "Fingers between soft thighs", prompt: "fingers slipping between soft thighs into intimate closeness", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "slow-finger-circles", label: "Slow circling touch", prompt: "slow circling touch in the most private warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "two-fingers-tracing-heat", label: "Two fingers tracing heat", prompt: "two fingers tracing secret heat with patient rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hand-cupping-intimate", label: "Hand cupped in intimate warmth", prompt: "a hand cupped gently in intimate warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "guiding-their-hand-lower", label: "Guiding a hand lower", prompt: "guiding a willing hand lower into private closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tongue-trail-inner-thigh", label: "Tongue trail along inner thigh", prompt: "a slow tongue trail along the soft inner thigh", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "lavishing-with-tongue", label: "Lavishing with a slow tongue", prompt: "lavishing intimate warmth with a slow devoted tongue", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tongue-tracing-secret-heat", label: "Tongue tracing secret heat", prompt: "tongue tracing secret heat with unhurried focus", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-worship-lower", label: "Mouth worshipping lower", prompt: "mouth worshipping lower with soft heated focus, fully non-explicit", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "soft-mouth-lingering", label: "Soft mouth lingering", prompt: "soft mouth lingering on heated skin with gentle pull", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "drawing-skin-between-lips", label: "Drawing soft skin between lips", prompt: "drawing soft heated skin between the lips", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-claiming-chest", label: "Mouth claiming the chest", prompt: "mouth claiming soft chest curves with warm attention", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-at-hip-line", label: "Mouth at the hip line", prompt: "mouth tracing the hip line with heated patience", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "taking-softly-into-mouth", label: "Taking softly into the mouth", prompt: "taking soft heated skin gently into the mouth with care", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "devoted-mouth-attention", label: "Devoted mouth attention", prompt: "devoted mouth attention on the most private warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hand-and-mouth-together", label: "Hand and mouth together", prompt: "hand and mouth working together in heated private affection", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mutual-exploring-hands", label: "Mutual exploring hands", prompt: "mutual exploring hands discovering every soft curve", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "guiding-to-mouth", label: "Guided to a waiting mouth", prompt: "gently guided toward a waiting mouth in private closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "straddled-chest-attention", label: "Straddled chest attention", prompt: "straddled close while giving heated attention to soft chest curves", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "from-behind-chest-reach", label: "Reach around to the chest", prompt: "reaching around from behind to claim soft chest curves", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "kneeling-devotion", label: "Kneeling private devotion", prompt: "kneeling in private devotion with mouth and hands, fully tasteful", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "edge-of-bedding-mouth", label: "At the edge of the bedding", prompt: "at the edge of the bedding with devoted mouth attention", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "thighs-parted-softly", label: "Thighs parted softly", prompt: "thighs parted softly for closer intimate attention", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "taste-of-intimate-warmth", label: "Taste of intimate warmth", prompt: "savoring the taste of intimate warmth with a slow tongue", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "fingers-then-mouth", label: "Fingers then mouth", prompt: "fingertips first, then a devoted mouth following the same path", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-then-fingers", label: "Mouth then fingers", prompt: "a heated mouth first, then skilled fingers taking over", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "squeezing-while-kissing-neck", label: "Squeezing while kissing the neck", prompt: "squeezing soft chest curves while kissing along the neck", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "rear-squeeze-while-pressed", label: "Rear squeeze while pressed close", prompt: "a firm rear squeeze while pressed flush together", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "rolling-hips-into-hand", label: "Rolling hips into a hand", prompt: "rolling hips into a waiting hand with quiet urgency", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "grinding-into-palm", label: "Pressing into a warm palm", prompt: "pressing heated closeness into a warm palm", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },


  // Intimate — more private-focus heat, fully euphemistic (no banned anatomy words)
  { id: "hand-around-hardness", label: "Hand around heated hardness", prompt: "a hand wrapped around heated hardness with slow care", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "squeezing-firm-length", label: "Squeezing firm length", prompt: "gently squeezing firm length in a private hold", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "stroking-heated-length", label: "Stroking heated length", prompt: "stroking heated length with a steady intimate rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "thumb-circling-tip", label: "Thumb circling the tip", prompt: "a thumb circling the sensitive tip with teasing care", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "fist-guiding-closeness", label: "Fist guiding closeness", prompt: "a loose fist guiding heated closeness between them", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "pressing-hardness-close", label: "Pressing hardness close", prompt: "pressing hardness close against soft curves", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "palming-masculine-heat", label: "Palming masculine heat", prompt: "palming masculine heat through soft fabric", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "teasing-along-length", label: "Teasing along the length", prompt: "teasing fingertips traveling slowly along the length", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-near-hardness", label: "Mouth near heated hardness", prompt: "mouth hovering near heated hardness with devoted intent", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "lips-around-tip", label: "Lips soft around the tip", prompt: "soft lips closing gently around the tip", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "taking-length-softly", label: "Taking length softly", prompt: "taking heated length softly into a waiting mouth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hand-and-mouth-on-length", label: "Hand and mouth on length", prompt: "hand and mouth sharing attention along heated length", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "fingertips-at-rear-bloom", label: "Fingertips at rear warmth", prompt: "fingertips teasing the most private rear warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "circling-hidden-entrance", label: "Circling a hidden entrance", prompt: "a fingertip slowly circling a hidden intimate entrance", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "pressing-at-private-rear", label: "Pressing at private rear heat", prompt: "gentle pressure at private rear heat with full consent", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "thumb-at-sensitive-rear", label: "Thumb at sensitive rear", prompt: "a thumb resting at the sensitive rear with careful heat", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "kiss-near-rear-curves", label: "Kiss near rear curves", prompt: "kisses trailing toward soft rear curves and hidden warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tongue-at-navel", label: "Tongue at the navel", prompt: "a slow tongue circling the navel", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "navel-kiss-trail", label: "Kiss trail to the navel", prompt: "a heated kiss trail ending at the navel", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "licking-into-navel", label: "Lingering at the navel", prompt: "lingering tongue attention into the soft navel", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "underarm-tongue-trail", label: "Tongue along the underarm", prompt: "a slow tongue trail along the soft underarm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "kissing-soft-underarm", label: "Kissing the soft underarm", prompt: "kissing and tasting the soft underarm with intimate focus", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "arms-raised-underarm-heat", label: "Arms raised for underarm heat", prompt: "arms raised while underarms receive heated mouth attention", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-on-chest-peaks", label: "Mouth on chest peaks", prompt: "soft mouth claiming the sensitive peaks of the chest", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "drawing-chest-peaks", label: "Drawing chest peaks between lips", prompt: "drawing sensitive chest peaks gently between the lips", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tongue-circling-peaks", label: "Tongue circling chest peaks", prompt: "tongue circling the sensitive peaks of the chest", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "peaks-through-fabric", label: "Peaks teased through fabric", prompt: "sensitive chest peaks teased through thin fabric by mouth and fingers", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "fingers-and-mouth-on-peaks", label: "Fingers and mouth on peaks", prompt: "fingers and mouth sharing attention on sensitive chest peaks", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "light-pinch-at-peaks", label: "Light pinch at chest peaks", prompt: "a light teasing pinch at sensitive chest peaks", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "breath-on-peaks", label: "Warm breath on chest peaks", prompt: "warm breath ghosting over sensitive chest peaks before the mouth follows", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "both-peaks-attended", label: "Both chest peaks attended", prompt: "both sensitive chest peaks attended with devoted mouth and hands", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "guiding-hand-to-hardness", label: "Guiding a hand to hardness", prompt: "guiding a willing hand to heated hardness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "guiding-mouth-to-length", label: "Guiding a mouth to length", prompt: "gently guiding a willing mouth toward heated length", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "rubbing-along-inner-thigh", label: "Rubbing along inner thigh", prompt: "heated length rubbing slowly along the soft inner thigh", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "nestled-between-softness", label: "Nestled between soft curves", prompt: "heated length nestled between soft curves in private closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "grip-tighten-and-ease", label: "Grip tightening then easing", prompt: "a grip on heated length tightening then easing in teasing rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "twin-hands-on-length", label: "Both hands on length", prompt: "both hands wrapping heated length with shared focus", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-watering-devotion", label: "Mouth-watering devotion", prompt: "mouth-watering devotion along heated length, kept non-explicit", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "slow-bobbing-attention", label: "Slow rising mouth attention", prompt: "slow rising and settling mouth attention along heated length", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "rear-tease-while-kissing", label: "Rear tease while kissing", prompt: "teasing private rear warmth while locked in a deep kiss", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "navel-to-lower-trail", label: "Navel-to-lower kiss trail", prompt: "a kiss trail from the navel traveling lower with heated patience", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "underarm-to-chest-path", label: "Underarm to chest path", prompt: "mouth traveling from soft underarm to sensitive chest peaks", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },

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
