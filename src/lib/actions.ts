export type ActionCategoryId =
  | "everyday"
  | "social"
  | "physical"
  | "romance"
  | "intimate"
  | "hardcore"
  | "hardcore-grk"
  | "swap-four-grk"
  | "mmf-grk";

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
    description: "Heated closeness with softer phrasing",
    restricted: true,
  },
  {
    id: "hardcore",
    label: "Hardcore (21+)",
    description: "Direct action phrasing from heated scenes — adults 21+ only",
    restricted: true,
  },
  {
    id: "hardcore-grk",
    label: "Hardcore-grk (21+)",
    description: "Fully indirect heated poses — fabric, pressure, closeness only",
    restricted: true,
  },
  {
    id: "swap-four-grk",
    label: "Swap four (21+)",
    description: "Partner-swap, watching, dual pairs — fully indirect fabric/pressure; auto 4 people",
    restricted: true,
  },
  {
    id: "mmf-grk",
    label: "Two men + her (21+)",
    description: "One woman with two men — fully indirect fabric/pressure; auto 3 people",
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
  { id: "shared-private", label: "Shared private moment", prompt: "he and she sharing a quiet private moment of closeness", category: "intimate", placeHints: ["bedroom", "balcony", "home-interior"], minPeople: 2 },
  { id: "tender-closeness", label: "Tender closeness", prompt: "he and she sharing tender closeness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "wrapped-together", label: "Wrapped together", prompt: "wrapped in each other's arms", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
  { id: "affectionate-intimacy", label: "Affectionate intimacy", prompt: "sharing affectionate intimacy with soft warmth", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "quiet-intimate-evening", label: "Quiet intimate evening", prompt: "he and she enjoying a quiet intimate evening together", category: "intimate", placeHints: ["bedroom", "balcony", "home-interior"], minPeople: 2 },
  { id: "gentle-caress", label: "Gentle caress", prompt: "he gently caresses her arm", category: "intimate", placeHints: ["sofa", "bedroom", "balcony"], minPeople: 2 },
  { id: "passionate-kiss", label: "Passionate kiss", prompt: "he and she sharing a passionate kiss", category: "intimate", placeHints: ["balcony", "bedroom", "rooftop"], minPeople: 2 },
  { id: "intimate-closeness", label: "Intimate closeness", prompt: "he and she resting in intimate closeness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "soft-morning", label: "Soft morning together", prompt: "he and she sharing a soft morning moment of affection", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
  { id: "candlelit-closeness", label: "Candlelit closeness", prompt: "he and she sharing candlelit closeness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },

  // Intimate — more intense, still fully indirect / euphemistic
  { id: "deep-passionate-embrace", label: "Deep passionate embrace", prompt: "he and she locked in a deep passionate embrace", category: "intimate", placeHints: ["bedroom", "home-interior", "balcony"], minPeople: 2 },
  { id: "breathless-closeness", label: "Breathless closeness", prompt: "he and she sharing breathless closeness, faces inches apart", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "urgent-tender-hold", label: "Urgent tender hold", prompt: "holding each other with urgent tenderness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "entwined-on-bedding", label: "Entwined on soft bedding", prompt: "he and she entwined together on soft bedding in a private moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tangled-sheets", label: "Tangled in soft sheets", prompt: "he and she tangled together in soft sheets with quiet intimacy", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "under-covers-closeness", label: "Under-covers closeness", prompt: "he and she sharing warm closeness under light covers", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "pressed-close-kiss", label: "Pressed-close kiss", prompt: "he and she pressed close in a deep lingering kiss", category: "intimate", placeHints: ["bedroom", "home-interior", "balcony"], minPeople: 2 },
  { id: "wall-lean-kiss", label: "Leaned-to-wall kiss", prompt: "he gently leans the other toward a wall in a heated kiss", category: "intimate", placeHints: ["home-interior", "bedroom", "hotel"], minPeople: 2 },
  { id: "lap-closeness", label: "Seated-close affection", prompt: "seated close together in an intimate hold", category: "intimate", placeHints: ["sofa", "bedroom", "home-interior"], minPeople: 2 },
  { id: "waist-pull-close", label: "Pulled close by the waist", prompt: "he pulls the other close by the waist into a heated embrace", category: "intimate", placeHints: ["bedroom", "home-interior", "balcony"], minPeople: 2 },
  { id: "hands-on-back", label: "Hands tracing the back", prompt: "his hands trace softly along her back in intimate affection", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "neck-nuzzle", label: "Nuzzling the neck", prompt: "he nuzzles close along her neck with tender heat", category: "intimate", placeHints: ["bedroom", "sofa", "balcony"], minPeople: 2 },
  { id: "collarbone-kiss-trail", label: "Kiss trail along collarbone", prompt: "he leaves a soft trail of kisses along her collarbone", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "slow-burning-evening", label: "Slow-burning private evening", prompt: "he and she sharing a slow-burning private evening of closeness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "lost-in-each-other", label: "Lost in each other", prompt: "completely lost in each other in quiet passion", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "heated-whispered-closeness", label: "Heated whispered closeness", prompt: "he and she sharing heated whispered closeness", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
  { id: "moonlit-private-passion", label: "Moonlit private passion", prompt: "he and she sharing moonlit private passion with soft shadows", category: "intimate", placeHints: ["bedroom", "balcony", "rooftop"], minPeople: 2 },
  { id: "rainy-window-intimacy", label: "Rainy-window intimacy", prompt: "he and she intimate closeness by a rain-streaked window", category: "intimate", placeHints: ["bedroom", "home-interior", "hotel"], minPeople: 2 },
  { id: "sheer-curtain-silhouette", label: "Sheer-curtain silhouette", prompt: "he and she silhouetted intimate closeness behind sheer curtains", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "falling-onto-bedding", label: "Falling onto soft bedding", prompt: "he and she falling together onto soft bedding in a playful intimate tumble", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "straddled-close-hold", label: "Close seated hold", prompt: "in a close seated hold with faces nearly touching", category: "intimate", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "overnight-entwined", label: "Overnight entwined rest", prompt: "he and she resting overnight entwined in quiet intimacy", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "morning-tangled-affection", label: "Morning tangled affection", prompt: "he and she morning tangled affection in soft natural light", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "private-reunion", label: "Private reunion closeness", prompt: "he and she sharing a private reunion filled with intense closeness", category: "intimate", placeHints: ["bedroom", "hotel", "home-interior"], minPeople: 2 },
  { id: "hearts-racing-hold", label: "Hearts-racing hold", prompt: "holding each other in a hearts-racing close hold", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "consumed-by-longing", label: "Consumed by quiet longing", prompt: "he and she consumed by quiet longing in a close embrace", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
  { id: "shared-warmth-under-blanket", label: "Shared warmth under a blanket", prompt: "sharing warmth under a blanket in intimate quiet", category: "intimate", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "forehead-to-chest", label: "Head rested on chest", prompt: "he rests their head on her chest in intimate calm", category: "intimate", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "legs-entwined", label: "Legs entwined (tasteful)", prompt: "he and she legs gently entwined while resting close", category: "intimate", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "slow-undress-hint", label: "Loosening outer layers (tasteful)", prompt: "he tastefully loosens her outer layers in a private intimate moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "steam-kiss", label: "Steam-misted closeness", prompt: "he and she steam-misted intimate closeness after a warm bath", category: "intimate", placeHints: ["bathroom", "bedroom"], minPeople: 2 },
  { id: "hotel-private-evening", label: "Private hotel evening", prompt: "he and she sharing a private hotel evening of intense but tasteful closeness", category: "intimate", placeHints: ["hotel", "bedroom"], minPeople: 2 },
  { id: "dim-light-devotion", label: "Dim-light devotion", prompt: "he and she dim-light devotion and close passionate affection", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "locked-gaze-desire", label: "Locked-gaze desire", prompt: "he and she locked gaze heavy with unspoken desire, still fully tasteful", category: "intimate", placeHints: ["bedroom", "cafe", "balcony"], minPeople: 2 },
  { id: "biting-lip-kiss", label: "Playful lip catch in a kiss", prompt: "he deep-kisses the other with a playful catch of the lip", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },
  { id: "pinned-softly", label: "Softly guided onto bedding", prompt: "he softly guides the other onto bedding in a consensual intimate moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "straddle-edge-sofa", label: "Close overlap on the sofa", prompt: "he and she overlapping closely on a sofa in heated affection", category: "intimate", placeHints: ["sofa", "home-interior"], minPeople: 2 },
  { id: "after-rain-rush", label: "After-rain rushed closeness", prompt: "he and she rushed indoor closeness after coming in from the rain", category: "intimate", placeHints: ["home-interior", "bedroom"], minPeople: 2 },
  { id: "midnight-quiet-passion", label: "Midnight quiet passion", prompt: "midnight quiet passion in near-dark softness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "sunrise-lingering", label: "Sunrise lingering closeness", prompt: "he and she lingering intimate closeness at sunrise", category: "intimate", placeHints: ["bedroom", "balcony"], minPeople: 2 },

  // Intimate — harder heat, still fully indirect / no forbidden terms
  { id: "feverish-rhythm", label: "Feverish shared rhythm", prompt: "he and she moving together in a feverish shared rhythm of closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hips-pressed-flush", label: "Hips pressed flush", prompt: "he and she press hips flush in a heated private hold", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "slow-grind-euphemism", label: "Slow rolling closeness", prompt: "he and she slow rolling closeness, bodies moving as one", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "rising-falling-together", label: "Rising and falling together", prompt: "he and she rising and falling together in an intense shared rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "straddled-heat", label: "Straddled heated hold", prompt: "he and she in a straddled heated hold, faces nearly touching", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "guided-from-behind-hold", label: "Held close from behind", prompt: "he holds the other close from behind in a heated intimate embrace", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "bent-to-dresser-heat", label: "Leaned-to-furniture heat", prompt: "he gently leans the other toward furniture in a heated private hold", category: "intimate", placeHints: ["bedroom", "hotel"], minPeople: 2 },
  { id: "shower-steam-pressed", label: "Steam-pressed shower closeness", prompt: "he and she pressed close in warm steam in a private bath space", category: "intimate", placeHints: ["bathroom", "hotel"], minPeople: 2 },
  { id: "trembling-want", label: "Trembling with quiet want", prompt: "he and she trembling with quiet want in a tight embrace", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "claiming-deep-kiss", label: "Claiming deep kiss", prompt: "he shares a claiming deep kiss full of hunger with her", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "shoulder-bite-soft", label: "Soft shoulder catch", prompt: "he soft-catches teeth at her shoulder in heated affection", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hair-gather-kiss", label: "Hair gathered for a kiss", prompt: "he gently gathers her hair aside and kisses along their neck", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "wrists-guided-soft", label: "Wrists guided softly", prompt: "he softly guides her wrists above the head in a consensual heated moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "legs-wrapped-tight", label: "Legs wrapped tight", prompt: "he and she with legs wrapped tightly while locked in intimate closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "arch-into-touch", label: "Arching into the touch", prompt: "she arches into he's touch with quiet intensity", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hands-under-fabric", label: "Hands under soft fabric", prompt: "his hands explore under her soft fabric in a private heated moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "skin-on-skin-hint", label: "Warm skin-to-skin closeness", prompt: "he and she warm skin-to-skin closeness kept tasteful and non-explicit", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "breath-on-ear", label: "Breath against the ear", prompt: "his warm breath against her ear with whispered heat", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "afterglow-entwined", label: "Quiet afterglow entwined", prompt: "he and she quietly entwined in soft afterglow closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "still-shaking-hold", label: "Still-shaking close hold", prompt: "he and she still shaking softly while held in a close after-moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hungry-reunion-rush", label: "Hungry reunion rush", prompt: "he rushes into a hungry heated hold with the other at the door", category: "intimate", placeHints: ["home-interior", "hotel"], minPeople: 2 },
  { id: "against-closed-door", label: "Against a closed door", prompt: "he presses the other against a closed door in urgent affectionate hold", category: "intimate", placeHints: ["home-interior", "hotel"], minPeople: 2 },
  { id: "kitchen-counter-heat", label: "Kitchen-counter heat", prompt: "he lifts the other onto a kitchen counter for a heated private kiss and hold", category: "intimate", placeHints: ["home-interior"], minPeople: 2 },
  { id: "sofa-edge-urgency", label: "Sofa-edge urgency", prompt: "he and she urgent closeness at the edge of a sofa", category: "intimate", placeHints: ["sofa", "home-interior"], minPeople: 2 },
  { id: "floor-blanket-passion", label: "Floor-blanket passion", prompt: "he and she intimate passion on a soft blanket on the floor", category: "intimate", placeHints: ["home-interior", "bedroom"], minPeople: 2 },
  { id: "mirror-silhouette-heat", label: "Mirror silhouette heat", prompt: "heated silhouette closeness near a mirror, non-explicit", category: "intimate", placeHints: ["bedroom", "hotel"], minPeople: 2 },
  { id: "balcony-door-pull-in", label: "Pulled in from the balcony", prompt: "he pulls the other in from the balcony into heated indoor closeness", category: "intimate", placeHints: ["balcony", "bedroom"], minPeople: 2 },
  { id: "rain-soaked-rush-inside", label: "Rain-soaked rush inside", prompt: "he and she rain-soaked and rushing into heated indoor closeness", category: "intimate", placeHints: ["home-interior", "bedroom"], minPeople: 2 },
  { id: "midnight-fever", label: "Midnight fever closeness", prompt: "he and she midnight fever of intense private closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "pre-dawn-again", label: "Pre-dawn closeness again", prompt: "finding each other again in pre-dawn intimate closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "slow-undress-buttons", label: "Slow unbuttoning (tasteful)", prompt: "he and she slowly unbuttons her outer layers in a private heated moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "shirt-over-head-hint", label: "Soft fabric pulled away", prompt: "he gently pulls soft fabric away from her in a tasteful private moment", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "chest-to-chest-heat", label: "Chest-to-chest heat", prompt: "he and she press chest-to-chest in a heated breathless hold", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "thigh-guided-closer", label: "Guided closer by the thigh", prompt: "he guides the other closer with a hand at her thigh", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "rocking-slow-heat", label: "Slow rocking heat", prompt: "he and she slow rocking heat while locked in an intimate embrace", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "deep-locked-rhythm", label: "Deep locked rhythm", prompt: "he and she locked together in a deep shared rhythm of closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "gasping-quiet-heat", label: "Quiet gasping heat", prompt: "quiet gasping heat muffled against a shoulder", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "name-whispered-heat", label: "Name whispered in heat", prompt: "he and she sharing a name whispered in the heat of private closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "eyes-half-lidded", label: "Half-lidded locked eyes", prompt: "he and she half-lidded eyes locked in heated unspoken want", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "sweat-glistened-closeness", label: "Warm-glistened closeness", prompt: "he and she warm-glistened closeness after intense private affection", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tangled-again", label: "Tangled together again", prompt: "he and she tangled together again before the night is over", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "cannot-get-close-enough", label: "Cannot get close enough", prompt: "he and she trying to get impossibly closer in heated affection", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "devoured-by-kiss", label: "Devoured by a kiss", prompt: "nearly devouring each other in a deep heated kiss", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "slow-worshipful-touch", label: "Slow worshipful touch", prompt: "slow worshipful touch along the body kept fully tasteful", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "pinned-by-gaze-and-hips", label: "Held by gaze and hips", prompt: "held in place by a heavy gaze and close hips", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },

  // Intimate — body-focused heat, fully euphemistic (no anatomy / banned terms)
  { id: "cupping-chest-curves", label: "Cupping soft chest curves", prompt: "he cups her soft chest curves through fabric with hungry hands", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "squeezing-chest-through-fabric", label: "Squeezing chest through fabric", prompt: "he gently squeezes her soft chest curves through thin fabric", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hands-claiming-chest", label: "Hands claiming the chest", prompt: "he claims her chest with both hands in a heated private hold", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "palm-at-chest-heartbeat", label: "Palm flat on the chest", prompt: "he presses a warm palm flat against her chest, feeling every breath", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-at-chest-curve", label: "Mouth along chest curves", prompt: "his mouth lingers along her soft chest curves over fabric", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "kiss-trail-down-chest", label: "Kiss trail down the chest", prompt: "he leaves a heated kiss trail moving down her chest", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "chest-pressed-flush-hands", label: "Chest pressed with exploring hands", prompt: "he and she press chest-to-chest while one's exploring hands claim her soft curves", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "teasing-chest-edges", label: "Teasing at chest edges", prompt: "his teasing fingertips move along the edges of her soft chest curves", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "firm-rear-squeeze", label: "Firm rear squeeze", prompt: "he firmly squeezes her soft rear curves in a heated hold", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "palming-hips-from-behind", label: "Palming hips from behind", prompt: "he palms her soft hips from behind and pulls them closer", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "hands-claiming-seat", label: "Hands claiming the seat", prompt: "his hands claim her seat with a hungry squeeze", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "lifted-by-hips", label: "Lifted closer by the hips", prompt: "lifted closer by a firm hold at the hips", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "rear-curves-guided", label: "Guiding soft rear curves", prompt: "guiding soft rear curves into a closer heated hold", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hip-grip-while-kissing", label: "Hip grip while kissing", prompt: "he keeps a tight grip on her hips while lost in a deep kiss", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "fingertips-intimate-warmth", label: "Fingertips exploring intimate warmth", prompt: "his skilled fingertips explore her intimate warmth with slow care", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "fingers-between-thighs", label: "Fingers between soft thighs", prompt: "his fingers slip between her soft thighs into intimate closeness", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "slow-finger-circles", label: "Slow circling touch", prompt: "slow circling touch in the most private warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "two-fingers-tracing-heat", label: "Two fingers tracing heat", prompt: "his two fingers trace her secret heat with patient rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hand-cupping-intimate", label: "Hand cupped in intimate warmth", prompt: "he cups a hand gently in her intimate warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "guiding-their-hand-lower", label: "Guiding a hand lower", prompt: "he guides her willing hand lower into private closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tongue-trail-inner-thigh", label: "Tongue trail along inner thigh", prompt: "he leaves a slow tongue trail along her soft inner thigh", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "lavishing-with-tongue", label: "Lavishing with a slow tongue", prompt: "he lavishes her intimate warmth with a slow devoted tongue", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tongue-tracing-secret-heat", label: "Tongue tracing secret heat", prompt: "his tongue traces her secret heat with unhurried focus", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-worship-lower", label: "Mouth worshipping lower", prompt: "his mouth worships her lower with soft heated focus", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "soft-mouth-lingering", label: "Soft mouth lingering", prompt: "his soft mouth lingers on her heated skin with gentle pull", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "drawing-skin-between-lips", label: "Drawing soft skin between lips", prompt: "he and she drawing soft heated skin between the lips", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-claiming-chest", label: "Mouth claiming the chest", prompt: "his mouth claims her soft chest curves with warm attention", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-at-hip-line", label: "Mouth at the hip line", prompt: "he mouth tracing her hip line with heated patience", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "taking-softly-into-mouth", label: "Taking softly into the mouth", prompt: "taking soft heated skin gently into the mouth with care", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "devoted-mouth-attention", label: "Devoted mouth attention", prompt: "he devoted mouth attention on the most private her warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hand-and-mouth-together", label: "Hand and mouth together", prompt: "hand and mouth working together in heated private affection", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mutual-exploring-hands", label: "Mutual exploring hands", prompt: "mutual exploring hands discovering every soft curve", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "guiding-to-mouth", label: "Guided to a waiting mouth", prompt: "gently guided toward a waiting mouth in private closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "straddled-chest-attention", label: "Straddled chest attention", prompt: "he straddles the other close while giving heated mouth and hand attention to her soft chest curves", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "from-behind-chest-reach", label: "Reach around to the chest", prompt: "he reaches around from behind to claim her soft chest curves with both hands", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "kneeling-devotion", label: "Kneeling private devotion", prompt: "kneeling in private devotion with mouth and hands, fully tasteful", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "edge-of-bedding-mouth", label: "At the edge of the bedding", prompt: "at the edge of the bedding with devoted mouth attention", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "thighs-parted-softly", label: "Thighs parted softly", prompt: "thighs parted softly for closer intimate attention", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "taste-of-intimate-warmth", label: "Taste of intimate warmth", prompt: "he savoring the taste of her warmth with a slow tongue", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "fingers-then-mouth", label: "Fingers then mouth", prompt: "fingertips first, then a devoted mouth following the same path", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-then-fingers", label: "Mouth then fingers", prompt: "a heated mouth first, then skilled fingers taking over", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "squeezing-while-kissing-neck", label: "Squeezing while kissing the neck", prompt: "he squeezes her soft chest curves while kissing along her neck", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "rear-squeeze-while-pressed", label: "Rear squeeze while pressed close", prompt: "a firm rear squeeze while pressed flush together", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "rolling-hips-into-hand", label: "Rolling hips into a hand", prompt: "he rolling her hips into a waiting hand with quiet urgency", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "grinding-into-palm", label: "Pressing into a warm palm", prompt: "he presses heated closeness into her warm palm", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },


  // Intimate — more private-focus heat, fully euphemistic (no banned anatomy words)
  { id: "hand-around-hardness", label: "Hand around heated hardness", prompt: "he wraps a hand around her heated hardness with slow care", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "squeezing-firm-length", label: "Squeezing firm length", prompt: "he gently squeezes her firm length in a private hold", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "stroking-heated-length", label: "Stroking heated length", prompt: "he strokes her heated length with a steady intimate rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "thumb-circling-tip", label: "Thumb circling the tip", prompt: "his thumb circles the sensitive tip of her heated length with teasing care", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "fist-guiding-closeness", label: "Fist guiding closeness", prompt: "he and she sharing a loose fist guiding heated closeness between them", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "pressing-hardness-close", label: "Pressing hardness close", prompt: "he pressing her hardness close against soft curves", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "palming-masculine-heat", label: "Palming masculine heat", prompt: "he palms her masculine heat through soft fabric", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "teasing-along-length", label: "Teasing along the length", prompt: "he teasing fingertips traveling slowly along her length", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-near-hardness", label: "Mouth near heated hardness", prompt: "he mouth hovering near her hardness with devoted intent", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "lips-around-tip", label: "Lips soft around the tip", prompt: "he and she soft lips closing gently around the tip", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "taking-length-softly", label: "Taking length softly", prompt: "he taking her length softly into a waiting mouth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hand-and-mouth-on-length", label: "Hand and mouth on length", prompt: "he hand and mouth sharing attention along her length", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "fingertips-at-rear-bloom", label: "Fingertips at rear warmth", prompt: "he fingertips teasing the most private rear her warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "circling-hidden-entrance", label: "Circling a hidden entrance", prompt: "a fingertip slowly circling a hidden intimate entrance", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "pressing-at-private-rear", label: "Pressing at private rear heat", prompt: "gentle pressure at private rear heat with full consent", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "thumb-at-sensitive-rear", label: "Thumb at sensitive rear", prompt: "a thumb resting at the sensitive rear with careful heat", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "kiss-near-rear-curves", label: "Kiss near rear curves", prompt: "he kisses trailing toward soft rear curves and hidden her warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tongue-at-navel", label: "Tongue at the navel", prompt: "a slow tongue circling the navel", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "navel-kiss-trail", label: "Kiss trail to the navel", prompt: "a heated kiss trail ending at the navel", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "licking-into-navel", label: "Lingering at the navel", prompt: "he and she lingering tongue attention into the soft navel", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "underarm-tongue-trail", label: "Tongue along the underarm", prompt: "a slow tongue trail along the soft underarm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "kissing-soft-underarm", label: "Kissing the soft underarm", prompt: "kissing and tasting the soft underarm with intimate focus", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "arms-raised-underarm-heat", label: "Arms raised for underarm heat", prompt: "arms raised while underarms receive heated mouth attention", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-on-chest-peaks", label: "Mouth on chest peaks", prompt: "his soft mouth claims the sensitive peaks of her chest", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "drawing-chest-peaks", label: "Drawing chest peaks between lips", prompt: "he draws her sensitive chest peaks gently between their lips", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "tongue-circling-peaks", label: "Tongue circling chest peaks", prompt: "his tongue circles the sensitive peaks of her chest", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "peaks-through-fabric", label: "Peaks teased through fabric", prompt: "he teases her sensitive chest peaks through thin fabric with mouth and fingers", category: "intimate", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "fingers-and-mouth-on-peaks", label: "Fingers and mouth on peaks", prompt: "his fingers and mouth share attention on her sensitive chest peaks", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "light-pinch-at-peaks", label: "Light pinch at chest peaks", prompt: "he gives a light teasing pinch at her sensitive chest peaks", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "breath-on-peaks", label: "Warm breath on chest peaks", prompt: "his warm breath ghosts over her sensitive chest peaks before their mouth follows", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "both-peaks-attended", label: "Both chest peaks attended", prompt: "he attends both of her sensitive chest peaks with devoted mouth and hands", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "guiding-hand-to-hardness", label: "Guiding a hand to hardness", prompt: "he guiding a willing hand to her hardness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "guiding-mouth-to-length", label: "Guiding a mouth to length", prompt: "he gently guiding a willing mouth toward her length", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "rubbing-along-inner-thigh", label: "Rubbing along inner thigh", prompt: "heated length rubbing slowly along the soft inner thigh", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "nestled-between-softness", label: "Nestled between soft curves", prompt: "heated length nestled between soft curves in private closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "grip-tighten-and-ease", label: "Grip tightening then easing", prompt: "he a grip on her length tightening then easing in teasing rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "twin-hands-on-length", label: "Both hands on length", prompt: "he wraps both hands around her heated length with shared focus", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-watering-devotion", label: "Mouth-watering devotion", prompt: "he mouth-watering devotion along her length, kept non-explicit", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "slow-bobbing-attention", label: "Slow rising mouth attention", prompt: "he and she slow rising and settling mouth attention along heated length", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "rear-tease-while-kissing", label: "Rear tease while kissing", prompt: "he teasing private rear her warmth while locked in a deep kiss", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "navel-to-lower-trail", label: "Navel-to-lower kiss trail", prompt: "a kiss trail from the navel traveling lower with heated patience", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "underarm-to-chest-path", label: "Underarm to chest path", prompt: "his mouth travels from her soft underarm to sensitive chest peaks", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },


  // Intimate — classic positions & acts as soft euphemisms ONLY (no banned terms)
  { id: "face-to-face-on-bedding", label: "Face-to-face on soft bedding", prompt: "he and she face-to-face on soft bedding in a close shared rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "classic-cover-closeness", label: "Classic cover closeness", prompt: "he and she classic cover closeness, bodies aligned face to face", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "kneeling-forward-hold", label: "Kneeling-forward heated hold", prompt: "he and she kneeling forward in a heated hold from behind", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "on-all-fours-closeness", label: "On all fours closeness", prompt: "he and she on all fours with a close heated hold from behind", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "bent-forward-shared-rhythm", label: "Bent-forward shared rhythm", prompt: "he and she bent forward into a deep shared rhythm of closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "seated-over-devoted-mouth", label: "Seated over a devoted mouth", prompt: "he and she seated over a devoted mouth in private heated attention", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "straddled-above-waiting-mouth", label: "Straddled above a waiting mouth", prompt: "straddled above a waiting mouth with gentle guided closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "nested-side-lying-closeness", label: "Nested side-lying closeness", prompt: "he and she nested close side by side in a quiet heated rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "curled-close-from-behind", label: "Curled close from behind", prompt: "he and she curled close from behind in soft heated intimacy", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "side-lying-shared-rhythm", label: "Side-lying shared rhythm", prompt: "he and she side-lying together in a slow shared rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "astride-rising-rhythm", label: "Astride in a rising rhythm", prompt: "seated astride in a rising and falling shared rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "riding-from-above", label: "Guiding rhythm from above", prompt: "guiding the shared rhythm from above while seated astride", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "reversed-astride-hold", label: "Reversed astride hold", prompt: "he and she reversed astride hold facing away in a heated rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "lifted-in-arms-rhythm", label: "Lifted in arms shared rhythm", prompt: "lifted into strong arms in a standing shared rhythm", category: "intimate", placeHints: ["bedroom", "home-interior", "hotel"], minPeople: 2 },
  { id: "held-aloft-closeness", label: "Held aloft in closeness", prompt: "he holds the other aloft against them in intense shared closeness", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "carried-to-wall-heat", label: "Carried into wall heat", prompt: "carried and pressed into wall-side heated closeness", category: "intimate", placeHints: ["home-interior", "hotel"], minPeople: 2 },
  { id: "wall-pressed-shared-rhythm", label: "Wall-pressed shared rhythm", prompt: "he and she pressed to the wall in a heated shared rhythm", category: "intimate", placeHints: ["home-interior", "bedroom", "hotel"], minPeople: 2 },
  { id: "standing-wall-embrace-heat", label: "Standing wall embrace heat", prompt: "he and she standing wall embrace turning into heated shared rhythm", category: "intimate", placeHints: ["home-interior", "hotel"], minPeople: 2 },
  { id: "joined-at-rear-warmth", label: "Joined at private rear warmth", prompt: "joined carefully at private rear warmth with full consent", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "deep-rear-shared-rhythm", label: "Deep rear shared rhythm", prompt: "a deep careful shared rhythm at private rear warmth", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "taken-into-waiting-mouth", label: "Taken into a waiting mouth", prompt: "he and she heated length taken into a waiting mouth with slow rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mouth-claimed-with-rhythm", label: "Mouth claimed with rhythm", prompt: "a willing mouth claimed with a careful heated rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "guided-face-to-hardness", label: "Guided face to heated hardness", prompt: "gently guided face-to-face with heated hardness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "holding-while-mouth-receives", label: "Holding while mouth receives", prompt: "hands holding softly while a devoted mouth receives", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "self-touch-intimate-warmth", label: "Self-touch of intimate warmth", prompt: "alone, she explores their own intimate warmth with skilled fingers", category: "intimate", placeHints: ["bedroom"], minPeople: 1 },
  { id: "woman-self-caress-private", label: "Private self-caress", prompt: "alone, she gives their own intimate warmth a private self-caress", category: "intimate", placeHints: ["bedroom"], minPeople: 1 },
  { id: "fingers-self-rhythm", label: "Fingers in a private rhythm", prompt: "alone, she's fingers move on their own body in a private self-focused rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 1 },
  { id: "self-stroke-heated-length", label: "Self-stroke of heated length", prompt: "alone, she strokes their own heated length with a steady hand", category: "intimate", placeHints: ["bedroom"], minPeople: 1 },
  { id: "man-private-self-hold", label: "Private self-hold on hardness", prompt: "alone, she works their own heated hardness with a private self-hold", category: "intimate", placeHints: ["bedroom"], minPeople: 1 },
  { id: "watched-self-touch", label: "Watched private self-touch", prompt: "she touches herself while he watches with a heated gaze", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "mutual-self-touch-close", label: "Mutual self-touch up close", prompt: "he and she touch themselves while pressed close together, each on their own body", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "deep-tongue-entwine", label: "Deep intertwining tongue kiss", prompt: "he and she a deep kiss with tongues intertwining slowly", category: "intimate", placeHints: ["bedroom", "balcony", "home-interior"], minPeople: 2 },
  { id: "deep-open-mouth-kiss", label: "Deep open-mouth kiss", prompt: "he and she a deep open-mouth kiss full of quiet hunger", category: "intimate", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "breath-stealing-kiss", label: "Breath-stealing deep kiss", prompt: "a breath-stealing deep kiss that lingers", category: "intimate", placeHints: ["bedroom", "wall"], minPeople: 2 },
  { id: "kiss-until-dizzy", label: "Kissing until dizzy", prompt: "kissing deeply until both feel dizzy with closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "lap-facing-shared-rhythm", label: "Lap-facing shared rhythm", prompt: "facing each other in a lap hold with shared rhythm", category: "intimate", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "edge-of-bed-standing", label: "Edge-of-bedding standing heat", prompt: "he and she at the edge of the bedding in standing heated closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "prone-soft-cover", label: "Prone soft cover closeness", prompt: "he and she lying prone under soft cover in a close heated rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "lotus-close-hold", label: "Seated lotus-close hold", prompt: "seated wrapped close face-to-face in a slow shared rhythm", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },
  { id: "one-leg-guided-close", label: "One leg guided close", prompt: "one leg guided close for deeper face-to-face closeness", category: "intimate", placeHints: ["bedroom"], minPeople: 2 },


  // Hardcore (21+) — exact example wording (he/she), adults only
  { id: "hc-face-into-central-curve", label: "Face pressed into central curve", prompt: "leaning his face down deep into her central curve at the lower waist, hands firmly gripping her waist while her fingers tangle tightly in his hair pulling his head firmly down against her skin", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-palm-pressure-center-brief", label: "Palm pressure on center brief", prompt: "her palm applies firm steady pressure on his front upper inner thighs on his center brief, warm friction while his breathing deepens", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-grip-tighten-center", label: "Grip tightens and holds steady", prompt: "reaching down between them, palm applying firm steady pressure on his front upper inner thighs on his center brief as her grip tightens and holds him steady while he leans his head back breathing deeply", category: "hardcore", placeHints: ["bedroom", "boat-house", "park", "storeroom"], minPeople: 2 },
  { id: "hc-hands-into-inner-thigh-shorts", label: "Hands deep into upper inner thigh of shorts", prompt: "kneeling slightly behind her while she rests her hands on a desk, driving his hands deep into the upper inner thigh and lower pelvic region of her light track shorts, fabric pulling taut with intense material strain creating a sharp outline of his gripping hands", category: "hardcore", placeHints: ["mall-office", "office"], minPeople: 2 },
  { id: "hc-hand-into-shorts-front-band", label: "Hand into lower front center band", prompt: "standing closely behind her as she leans against the wall, driving his hand firmly into the lower front center band of her track shorts, soft fabric pulling taut under his unyielding squeeze creating a sharp outline", category: "hardcore", placeHints: ["mall-corridor", "home-interior"], minPeople: 2 },
  { id: "hc-leg-lifted-wall-chest-press", label: "Leg lifted to wall with chest press", prompt: "she stands with her back against the wall, one leg lifted; he presses tightly against her from the front, one hand under her thigh and the other pressing her breast, her face showing a hot expression looking at him", category: "hardcore", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "hc-hands-deep-into-backside", label: "Hands deep into soft lower backside", prompt: "pressing both hands firmly and deeply into the soft lower curves of her backside while his body stays tightly against hers, fabric strongly indented", category: "hardcore", placeHints: ["bedroom", "pool", "beach-kerala", "waterfall"], minPeople: 2 },
  { id: "hc-thigh-catch-between-legs", label: "Catching inner thigh between thighs", prompt: "she catches his inner thigh in between her thighs and reaches to the top with her hand while he presses both hands firmly into the soft lower curves of her backside", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-face-into-backside-crease", label: "Face pressed into backside fabric crease", prompt: "she is bent forward with hands on the sofa; he kneels low behind her with his face pressed tightly into the soft fabric crease of her backside, mouth moving slowly against the fabric", category: "hardcore", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "hc-self-press-lower-front-uniform", label: "Self-press soft lower front through fabric", prompt: "one hand pressing the soft lower front of his body through the uniform fabric in an urgent holding manner while eyes locked on her", category: "hardcore", placeHints: ["kitchen"], minPeople: 1 },
  { id: "hc-kneeling-between-raised-knees", label: "Kneeling between raised knees", prompt: "she lies flat on her back across the bed with knees raised; he kneels directly between her legs, leaning his upper body close over her lower torso to press deep passionate contact against her body", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-straddle-away-pull-down", label: "Straddling away pulled down firmly", prompt: "she is straddling him facing away leaning forward; his hands locked on her waist pulling her down firmly with each slow movement so the soft lower curves press deeply against him through the fabric", category: "hardcore", placeHints: ["sofa", "bedroom"], minPeople: 2 },
  { id: "hc-bent-forward-waist-grip-rhythm", label: "Bent forward waist grip rhythm", prompt: "she leans forward supported on the bed; he presses closely behind her, hands gripping her waist firmly with slow rhythmic pressing movements against her lower curves", category: "hardcore", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-all-fours-hands-in-crease", label: "On all fours hands into fabric crease", prompt: "she is on all fours on the bed, head turned back looking at him; both his hands press firmly and exactly into the deep fabric crease of her soft lower curves, body weight close behind her", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-pool-straddle-backside-grip", label: "Pool straddle backside grip", prompt: "she straddles his waist in the water, rear profile to camera; he wraps his arms around her lower waist planting his hands deep into the soft flesh of her lower backside, stretching wet fabric into a heavy distinct indentation", category: "hardcore", placeHints: ["pool"], minPeople: 2 },
  { id: "hc-hover-straddle-face-close", label: "Hover straddle faces close", prompt: "he lies on his back; she is positioned above him supporting her weight with her arms, torso leaning toward his bringing their faces very close in a face-to-face straddling cuddle", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-bus-crowd-backside-push", label: "Crowd boarding backside press", prompt: "standing on crowded bus steps; he stands close behind her and presses his hands firmly into the soft lower curves of her backside to guide her inside, fabric strongly indented, casual as if nothing unusual", category: "hardcore", placeHints: ["station", "street"], minPeople: 2 },
  { id: "hc-face-lower-front-saree-plus-crease", label: "Face at soft lower front plus crease grip", prompt: "she leans back against the fridge; his face is pressed close against the soft lower front through thin saree fabric while one hand presses firmly into the deep fabric crease of her soft lower curves", category: "hardcore", placeHints: ["kitchen"], minPeople: 2 },
  { id: "hc-waterfall-backside-grip", label: "Waterfall backside grip", prompt: "standing under a private waterfall; he presses both hands firmly into the soft lower curves of her backside while his body stays tightly against hers, wet fabric strongly indented", category: "hardcore", placeHints: ["waterfall"], minPeople: 2 },
  { id: "hc-neck-kiss-hard-backside", label: "Neck kiss with hard backside press", prompt: "he presses his hand hard into the soft lower curves of her backside holding the pressure firmly while kissing her wet neck, thin wet fabric deeply indented outlining soft lower curves", category: "hardcore", placeHints: ["beach-kerala", "pond"], minPeople: 2 },
  { id: "hc-upper-front-and-lower-face", label: "Hand on soft upper front face at lower", prompt: "one of his hands presses firmly on the soft upper front of her body through thin fabric while his face is pressed close against the soft lower front", category: "hardcore", placeHints: ["beach-kerala", "bedroom"], minPeople: 2 },
  { id: "hc-lap-both-hands-upper-front", label: "In lap both hands on soft upper front", prompt: "she sits in his lap; he presses both hands firmly and deeply into her soft upper front through thin fabric while she leans back against him", category: "hardcore", placeHints: ["theater", "sofa"], minPeople: 2 },
  { id: "hc-cupped-under-curve-breast", label: "Cupped under-curve of breast", prompt: "his hand is firmly cupped and pressing inward applying deep constant pressure against the soft under-curve and side of her breast, fabric tension highly defined revealing the firm indentation of his grip", category: "hardcore", placeHints: ["theater", "home-interior"], minPeople: 2 },
  { id: "hc-backside-crease-neck-brush", label: "Backside crease grip neck brush", prompt: "standing close behind her, one hand pressing firmly into the deep fabric crease of her backside while his lips brush her neck", category: "hardcore", placeHints: ["beach-kerala", "street"], minPeople: 2 },
  { id: "hc-locked-backside-heavy-pressure", label: "Locked backside heavy pressure", prompt: "his hand locked firmly on her backside, fingers digging in with heavy pressure into the full soft curves of her buttocks, tight fabric deeply indented and stretched around his hand", category: "hardcore", placeHints: ["street", "park"], minPeople: 2 },
  { id: "hc-walking-chest-grip", label: "Walking with chest grip", prompt: "walking close together, his arm draped around her, hand locked firmly on her chest with fingers digging heavy pressure into the full soft curve of her breast, fabric deeply indented while both look ahead as if nothing is happening", category: "hardcore", placeHints: ["village-path", "street"], minPeople: 2 },
  { id: "hc-casual-arm-low-upper-front", label: "Casual arm low on upper front", prompt: "walking close, his arm wraps naturally around her back, hand resting low on the front of her upper body over the soft rounded shape, tight fabric stretching smoothly under his hand looking like a casual protective hold", category: "hardcore", placeHints: ["village-path"], minPeople: 2 },
  { id: "hc-window-deep-upper-front", label: "Window pose deep upper front press", prompt: "standing close near a window, he behind her, one hand on her waist, the other pressed firmly and deeply into the soft upper front of her body so thin blouse fabric is clearly indented stretched and wrinkled under his palm", category: "hardcore", placeHints: ["home-interior"], minPeople: 2 },
  { id: "hc-facing-camera-upper-front", label: "Facing camera soft upper front press", prompt: "standing very close facing the camera, his hand clearly placed on the soft upper front of her body over her blouse pressing firmly so the fabric shows natural indentation, calm ordinary expressions", category: "hardcore", placeHints: ["village-path", "street"], minPeople: 2 },
  { id: "hc-auto-rickshaw-upper-front", label: "Auto-rickshaw upper front press", prompt: "sitting very close beside her in an auto rickshaw, his hand pressed firmly and deeply into the soft upper front of her body, fabric of her top clearly indented and stretched under his palm", category: "hardcore", placeHints: ["auto-rickshaw", "street"], minPeople: 2 },
  { id: "hc-mouth-against-soft-lower-front", label: "Mouth against soft lower front through fabric", prompt: "his face pressed close against the soft lower front through thin fabric with devoted heated attention", category: "hardcore", placeHints: ["kitchen", "bedroom"], minPeople: 2 },
  { id: "hc-fabric-indent-backside-both-hands", label: "Both hands fabric-indent backside", prompt: "both hands gripping the center of her backside with strong fabric tension and heavy indentation mapping his gripping force", category: "hardcore", placeHints: ["pool", "bedroom"], minPeople: 2 },

  // --- Hardcore-grk: fully indirect only (pose / fabric / pressure / closeness) ---
  { id: "hc-deep-crease-press-fingers", label: "Fingers into deep fabric crease", prompt: "she stands slightly bent; he presses his fingers firmly into the deep fabric crease of her soft lower curves, holding steady pressure so the fabric shows a sharp indentation", category: "hardcore-grk", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "hc-thumb-spread-crease", label: "Thumbs into soft fabric crease", prompt: "she bends forward braced on the bed; he kneels behind resting both thumbs deep into the soft fabric crease of her lower curves, applying firm even pressure along that line", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-face-buried-crease-lick", label: "Face pressed into backside fabric crease", prompt: "she is on all fours; he kneels low behind her with his face pressed tightly into the soft fabric crease of her backside, mouth moving slowly against the fabric while his hands hold her hips", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-mouth-on-firm-center", label: "Close face at his center brief", prompt: "he sits back against the headboard; she leans between his open thighs bringing her face close against the front center brief of him, staying devoted there with slow quiet attention while he watches her", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-kneeling-taking-him-deep", label: "Kneeling close at his center brief", prompt: "she kneels in front of him hands on his hips, face kept close against the firm front center through fabric with slow steady rhythm while he rests a hand lightly in her hair", category: "hardcore-grk", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "hc-lying-side-mouth-on-him", label: "Side-lying face along center brief", prompt: "they lie on their sides facing each other; she lowers her head along his front upper inner thighs keeping her face close against his center brief with slow warm attention", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-standing-her-mouth-on-him", label: "Kneeling face at standing center brief", prompt: "he stands; she sinks to her knees and presses her face firmly against the front center of him through fabric, one hand steady nearby while she keeps slow close rhythm", category: "hardcore-grk", placeHints: ["bedroom", "shower", "home-interior"], minPeople: 2 },
  { id: "hc-tongue-soft-lower-folds", label: "Face between raised knees soft lower front", prompt: "she lies back with knees raised and open; he lowers his face between her thighs pressing close against her soft lower front through thin fabric with devoted attention while she grips the sheets", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-mouth-devoted-soft-center", label: "Face devoted at soft lower front", prompt: "his face pressed close against her soft lower front through thin fabric between her thighs with careful heated focus while her legs rest over his shoulders and her fingers tangle in his hair", category: "hardcore-grk", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-face-between-thighs-long-licks", label: "Kneeling face at soft lower front", prompt: "she sits at the edge of the bed; he kneels between her open thighs pressing his face into her soft lower front through fabric, giving long slow close attention while holding her hips steady", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-sixty-nine-mutual-mouth", label: "Inverted mutual close face attention", prompt: "they lie inverted against each other; her face stays close against his center brief through fabric while his face stays close against her soft lower front through fabric at the same time", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-mouth-on-soft-breast", label: "Face against soft upper front", prompt: "he cups the soft upper front of her body through thin fabric and brings his face firmly against that soft rounded shape with slow devoted pressure while her back arches toward him", category: "hardcore-grk", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-both-breasts-mouth-and-hand", label: "Face and hand on soft upper front", prompt: "she straddles his lap facing him; he brings his face to one soft upper curve through fabric while his other hand presses and shapes her other soft upper curve, both claimed through thin fabric", category: "hardcore-grk", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-from-behind-mouth-on-breast", label: "From behind face on soft upper front", prompt: "he stands behind her one arm around her waist, leaning over her shoulder to press his face firmly against her soft upper front through fabric while his other hand presses between her upper inner thighs", category: "hardcore-grk", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "hc-missionary-deep-joining", label: "On back knees raised deep close press", prompt: "she lies on her back knees raised and open; he settles fully between her thighs leaning his upper body close over her lower torso to press deep passionate contact against her body with slow heavy rhythm, faces close", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-missionary-legs-on-shoulders", label: "Legs raised deep body press", prompt: "she lies back with both legs up toward his shoulders; he draws her close and presses deep rhythmic contact against her lower torso with long firm presses, soft lower curves tilted up to meet him", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-missionary-deep-hold", label: "Close hold deep grind press", prompt: "he presses fully against her lower torso and holds deep grinding slow circles through fabric, her legs wrapped around his waist pulling him tighter into that contact", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-all-fours-rear-deep-entry", label: "All fours deep crease body press", prompt: "she is on all fours looking back; he kneels behind gripping her hips with body weight close, both hands and torso pressing firm slow rhythm into the deep fabric crease of her soft lower curves", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-all-fours-soft-center-from-behind", label: "All fours waist-grip rhythm from behind", prompt: "she is on all fours; he presses closely behind her hands locked on her waist with slow rhythmic pressing movements against her lower curves, pulling her back into each firm press", category: "hardcore-grk", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-prone-flat-deep-press", label: "Flat on stomach covered deep press", prompt: "she lies flat on her stomach; he covers her from behind pressing deep slow grinding contact along her lower torso, full body weight settling her into the mattress", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-cowgirl-she-sinks-deep", label: "Straddle facing pull-down settle", prompt: "he lies on his back; she straddles him facing forward and his hands lock on her waist pulling her down firmly with each slow movement so the soft lower curves press deeply against him through the fabric", category: "hardcore-grk", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-reverse-cowgirl-deep", label: "Straddle away pull-down rhythm", prompt: "she straddles him facing away leaning forward; his hands locked on her waist pulling her down firmly so soft lower curves rise and fall against him through fabric with heavy rhythm", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-spooning-deep-from-behind", label: "Side-by-side from behind deep press", prompt: "they lie on their sides close together; he presses from behind with slow deep body rhythm against her lower curves, one hand on her soft upper front through fabric, her knee slightly lifted", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-standing-lift-deep", label: "Lifted to wall close body press", prompt: "he lifts her with her back to the wall, her legs wrapped around his waist as he presses tightly against her from the front with deep upward rhythm, holding her firmly while their faces stay close", category: "hardcore-grk", placeHints: ["bedroom", "home-interior", "shower"], minPeople: 2 },
  { id: "hc-edge-of-bed-deep-thrust", label: "Edge of bed standing close press", prompt: "she sits at the edge of the bed leaning back on her hands; he stands between her open thighs pressing deep firm contact against her lower torso, her legs hooked around him", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-bent-over-desk-deep", label: "Bent forward waist-grip rhythm", prompt: "she leans forward supported on a desk or bed edge; he presses closely behind her hands gripping her waist firmly with slow rhythmic pressing movements against her lower curves", category: "hardcore-grk", placeHints: ["bedroom", "office", "mall-office"], minPeople: 2 },
  { id: "hc-licking-inner-thighs-to-center", label: "Face along inner thighs to soft lower front", prompt: "he keeps his face close along her inner thighs until he reaches her soft lower front through thin fabric, lingering with warm devoted contact while she opens slightly wider", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-her-hand-guiding-his-mouth", label: "Her hands guiding his face lower", prompt: "she guides his head with both hands pressing his face firmly against her soft lower front through fabric, holding him there with focused heated closeness", category: "hardcore-grk", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-hand-stroking-him-into-mouth", label: "Palm and face at his center brief", prompt: "her palm applies firm steady pressure on his front upper inner thighs on his center brief while her face stays close against that same area through fabric, alternating grip and close attention", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-him-licking-while-fingers-deep", label: "Face and hand at soft lower front", prompt: "his face pressed close against her soft lower front through fabric while his hand presses firmly into the upper inner thigh and lower pelvic region, fabric pulling taut under his grip as her hips lift", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-her-riding-his-mouth", label: "Hover straddle over his face", prompt: "he lies on his back; she is positioned above him supporting her weight with her arms, soft lower front close over his face in a face-to-face straddling cuddle while his hands grip her soft lower curves", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-deep-rear-crease-then-entry", label: "Crease press then close body rhythm", prompt: "first both his hands press firmly into the deep fabric crease of her soft lower curves; then he stays close behind her on all fours with slow deep body rhythm against that same crease line", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-face-down-ass-up-deep", label: "Chest down hips high crease press", prompt: "she presses her chest to the bed with hips high; he kneels behind hands spreading her soft lower curves while pressing firmly into the deep fabric crease with slow heavy body rhythm", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-lap-facing-deep-bounce", label: "In lap facing close bounce press", prompt: "she sits in his lap facing him fully pressed close; he holds her soft lower curves and lifts her in a bouncing rhythm so soft lower curves press deeply against him through fabric, soft upper fronts against his chest", category: "hardcore-grk", placeHints: ["sofa", "bedroom", "chair"], minPeople: 2 },
  { id: "hc-shower-wall-deep-thrust", label: "Shower wall lifted close press", prompt: "hot water running; her back to the wet tiles one leg hooked around him as he presses tightly against her from the front with deep upward rhythm, faces close, wet fabric strongly indented", category: "hardcore-grk", placeHints: ["shower"], minPeople: 2 },
  { id: "hc-slow-pullout-deep-drive", label: "Ease away then reseat deep press", prompt: "he eases slightly away from her lower torso then presses back fully against her with a deep firm stroke through fabric, repeating the long close contact while she holds him tight", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-mouth-on-him-eye-contact", label: "Face at center brief with eye contact", prompt: "she looks up into his eyes while her face stays close against the front center brief of him through fabric, keeping slow deep rhythm as he brushes her cheek", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-spread-folds-tongue-point", label: "Thumbs open soft lower front face focus", prompt: "his thumbs gently open the soft fabric area of her lower front; he keeps his face close there with precise devoted attention in tight small movements while she trembles", category: "hardcore-grk", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-double-claim-mouth-breast-hand-center", label: "Face on upper front hand on lower front", prompt: "one of his hands presses firmly on the soft upper front of her body through thin fabric while his face is pressed close against the soft lower front, claiming upper and lower at once", category: "hardcore-grk", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-from-behind-hand-on-soft-center", label: "From behind hand on soft lower front", prompt: "he presses close behind her one arm around her waist his hand cupped hard against her soft lower front through fabric rubbing firmly between her upper inner thighs while his body presses into the crease of her backside", category: "hardcore-grk", placeHints: ["bedroom", "kitchen", "home-interior"], minPeople: 2 },

  // --- Swap four (21+): partner exchange / watching / dual pairs — fully indirect only ---
  { id: "sf-soft-partner-tease-circle", label: "Soft tease in a close circle", prompt: "four adults in a close circle; soft teasing touches over fabric, warm breath, and lingering eye contact building heat without rushing", category: "swap-four-grk", placeHints: ["bedroom", "home-interior", "hotel"], minPeople: 4 },
  { id: "sf-soft-cross-pair-kiss", label: "Cross-pair lingering kiss", prompt: "partners softly exchange: the younger woman shares a lingering heated kiss with the older man while the older woman shares the same with the younger man, hands resting at waists", category: "swap-four-grk", placeHints: ["bedroom", "sofa", "hotel"], minPeople: 4 },
  { id: "sf-soft-watch-partner-kiss", label: "Watching partner's close kiss", prompt: "the younger man watches from nearby as the older man shares a deep lingering kiss with the younger woman, her partner's gaze heated and steady", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-soft-mid-woman-watched-kiss", label: "Mid-age woman kissed while watched", prompt: "the older woman shares a heated kiss with the younger man while her partner watches close by, one hand on her lower back through fabric", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-soft-parallel-sofa-holds", label: "Parallel sofa heated holds", prompt: "two pairs on one long sofa: each woman pressed close with the other man in quiet heated holds, fabric tension at hips and soft upper fronts", category: "swap-four-grk", placeHints: ["sofa", "home-interior"], minPeople: 4 },
  { id: "sf-soft-fabric-explore-exchange", label: "Fabric explore after partner exchange", prompt: "after a calm partner exchange, hands explore under soft outer fabric with slow care — each woman with the other man — while original partners stay in the same room", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-soft-whisper-dare-circle", label: "Whispered dare circle", prompt: "four adults whispering close dares; fingertips trace waistbands and soft upper fronts through fabric, smiles and flushed cheeks", category: "swap-four-grk", placeHints: ["bedroom", "home-interior"], minPeople: 4 },
  { id: "sf-soft-side-by-side-lap", label: "Side-by-side lap closeness", prompt: "both women seated in the other men's laps side by side, soft lower curves pressed through fabric, hands at waist, partners glancing across", category: "swap-four-grk", placeHints: ["sofa", "bedroom"], minPeople: 4 },

  { id: "sf-watch-ya-woman-older-man-press", label: "Watching YA woman with older man press", prompt: "the younger man watches intently as the older man presses deep close body rhythm against the younger woman's lower torso through fabric, her legs wrapped, faces close", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-watch-mid-woman-ya-man-press", label: "Watching mid woman with YA man press", prompt: "the older man watches as the younger man presses firm rhythmic contact against the older woman's lower curves through fabric, her hands gripping his shoulders", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-watch-partner-face-lower-front", label: "Watching face at soft lower front", prompt: "one partner watches from the edge of the bed while the other man keeps his face pressed close against her soft lower front through thin fabric between her open thighs", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-watch-partner-face-center-brief", label: "Watching face at his center brief", prompt: "a woman keeps her face close against the other man's front center brief through fabric with slow rhythm while her own partner watches from nearby, heated and still", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-watch-straddle-pull-down", label: "Watching straddle pull-down settle", prompt: "she straddles the other man facing him as his hands lock on her waist pulling her down firmly through fabric; her partner watches the rise and fall from close range", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-watch-all-fours-behind", label: "Watching all-fours from-behind press", prompt: "she is on all fours; the other man presses closely behind with waist-grip rhythm against her lower curves while her partner watches from the head of the bed", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-watch-wall-press", label: "Watching wall-pressed shared rhythm", prompt: "pressed to the wall with the other man in heated shared rhythm through fabric while her partner watches from across the room, arms folded, gaze locked", category: "swap-four-grk", placeHints: ["bedroom", "hotel", "home-interior"], minPeople: 4 },
  { id: "sf-watch-lap-bounce", label: "Watching lap bounce press", prompt: "she sits in the other man's lap facing him in a bouncing close press through fabric; her partner watches every lift, one hand resting on his own thigh", category: "swap-four-grk", placeHints: ["sofa", "chair", "bedroom"], minPeople: 4 },

  { id: "sf-swap-cross-on-back-press", label: "Cross-pair on-back deep close press", prompt: "partners exchanged: each woman on her back with knees raised while the other man settles between her thighs pressing deep slow contact through fabric; both pairs on one wide bed", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-swap-cross-from-behind", label: "Cross-pair from-behind waist rhythm", prompt: "partners exchanged: each woman bent forward while the other man grips her waist with slow rhythmic pressing against her lower curves through fabric, side by side", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-swap-cross-straddle", label: "Cross-pair facing straddle settle", prompt: "partners exchanged: each woman straddles the other man facing forward as hands lock on waists pulling down firmly so soft lower curves press deeply through fabric", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-swap-cross-spoon", label: "Cross-pair side-lying from-behind press", prompt: "partners exchanged: each pair side-lying with the other man pressing from behind against her lower curves, one hand on soft upper front through fabric", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-swap-standing-then-bed", label: "Standing swap then bed settle", prompt: "standing partner exchange with deep kisses and hip presses through fabric, then both cross-pairs settle onto the bed in heated close rhythm", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-swap-clothes-half-on", label: "Half-dressed partner exchange", prompt: "outer layers pushed aside; partners exchange so each woman presses flush with the other man, fabric bunched at hips, soft upper fronts claimed through thin cloth", category: "swap-four-grk", placeHints: ["bedroom", "home-interior"], minPeople: 4 },

  { id: "sf-parallel-dual-rhythm", label: "Parallel dual shared rhythm", prompt: "two pairs side by side on one bed, each locked in deep shared rhythm through fabric, quiet gasps overlapping, hands gripping sheets", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-parallel-sofa-and-floor", label: "Sofa pair and floor pair", prompt: "one cross-pair urgent on the sofa; the other cross-pair on a soft blanket on the floor — both in heated fabric-pressure rhythm at once", category: "swap-four-grk", placeHints: ["home-interior", "hotel"], minPeople: 4 },
  { id: "sf-parallel-mirror-pairs", label: "Mirror-facing dual pairs", prompt: "both cross-pairs facing a wide mirror, each woman pressed close with the other man from behind, hands on soft upper fronts through fabric, watching themselves", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },

  { id: "sf-two-on-ya-woman-watched", label: "Two men close with YA woman, partner near", prompt: "the younger woman between both men: one face close at her soft upper front through fabric, the other pressing at her soft lower front through fabric, while one original partner stays near watching", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-two-on-mid-woman-watched", label: "Two men close with mid woman, partner near", prompt: "the older woman between both men with devoted face and hand attention at soft upper and lower fronts through fabric while her partner watches from the chair", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-two-women-one-man-watched", label: "Two women close with one man, other watches", prompt: "both women give close face and hand attention at one man's center brief through fabric while the other man watches from nearby with heated stillness", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-ya-woman-between-cross", label: "YA woman between both men", prompt: "the younger woman pressed between both men — chest-to-back and front contact through fabric — while the older woman watches and guides a hand at a waist", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-mid-woman-between-cross", label: "Mid woman between both men", prompt: "the older woman pressed between both men with firm hip presses through fabric from front and behind while the younger woman watches close, lips parted", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },

  { id: "sf-hc-crease-press-watched", label: "Deep crease press while watched", prompt: "fingers pressed firmly into the deep fabric crease of soft lower curves while the watching partner sits close enough to see every indentation in the cloth", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-face-crease-swap", label: "Face in backside crease, cross pair", prompt: "cross-paired: one man kneels with face pressed into the soft fabric crease of the other woman on all fours while the remaining pair shares a heated kiss nearby", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-center-brief-cross", label: "Cross face at center brief", prompt: "each woman keeps her face close against the other man's front center brief through fabric with slow rhythm, kneeling side by side", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-soft-lower-cross", label: "Cross face at soft lower front", prompt: "each man keeps his face close against the other woman's soft lower front through thin fabric between open thighs, both pairs on one bed", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-inverted-mutual-one-pair", label: "Inverted mutual close faces, others watch", prompt: "one cross-pair lies inverted with faces close at soft lower front and center brief through fabric; the other pair watches from the pillows", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-all-fours-dual", label: "Dual all-fours crease body press", prompt: "both women on all fours side by side; each other man behind them pressing firm slow body rhythm into deep fabric creases of soft lower curves", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-prone-dual", label: "Dual flat-on-stomach covered press", prompt: "both women flat on their stomachs; each other man covers from behind with deep grinding contact along lower torsos through fabric", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-edge-bed-dual", label: "Dual edge-of-bed standing press", prompt: "both women at opposite edges of the bed; each other man stands between open thighs pressing deep firm contact through fabric", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-shower-four-steam", label: "Steam-pressed four in bath space", prompt: "hot steam; cross-pairs pressed close against wet tile with upward rhythm through wet fabric, faces close, water running", category: "swap-four-grk", placeHints: ["bathroom", "hotel"], minPeople: 4 },
  { id: "sf-hc-ease-reseat-watched", label: "Ease away then reseat while watched", prompt: "he eases slightly then presses back fully against her lower torso through fabric in long strokes while her partner watches every reseat from an arm's length away", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-upper-and-lower-claim-watch", label: "Upper and lower claim while watched", prompt: "one hand on soft upper front through fabric and face at soft lower front at once on the cross partner while the original partner watches, jaw tight with heat", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-hc-from-behind-hand-lower-watch", label: "From behind hand on lower front, watched", prompt: "pressed close behind the cross partner with a hand cupped hard at soft lower front through fabric while body presses into the backside crease; original partner watches", category: "swap-four-grk", placeHints: ["bedroom", "kitchen", "home-interior"], minPeople: 4 },
  { id: "sf-hc-lifted-wall-cross", label: "Lifted wall press, other pair close", prompt: "one woman lifted to the wall with legs wrapped as the other man presses upward rhythm through fabric; the other cross-pair shares heated closeness right beside them", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-hc-reverse-straddle-dual", label: "Dual reverse straddle pull-down", prompt: "both women straddle the other men facing away; hands locked on waists pulling down so soft lower curves rise and fall through fabric with heavy rhythm", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-chest-down-hips-high-watch", label: "Chest down hips high, partner watches", prompt: "chest to the bed hips high; the other man presses into the deep fabric crease with slow heavy rhythm while her partner kneels near her face, watching", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-hand-guide-cross-mouth", label: "Guiding cross partner's face lower", prompt: "she guides the other man's head with both hands pressing his face firmly at her soft lower front through fabric while her own partner strokes her hair and watches", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-hc-palm-center-then-face", label: "Palm then face at center brief, watched", prompt: "her palm firm on his front center brief then her face close against that same fabric while her partner watches the alternating grip and attention", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-afterglow-tangled-four", label: "Quiet afterglow four tangled", prompt: "four adults quietly tangled in soft afterglow on wide bedding, limbs crossed, flushed skin, slow breathing, fabric half-settled", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-hc-midnight-rotate-pairs", label: "Midnight rotate close pairs", prompt: "at midnight the pairs rotate again: each woman locked in deep close rhythm through fabric with the other man after already sharing heat with her first partner", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-hc-kitchen-counter-cross", label: "Kitchen-counter cross-pair heat", prompt: "one woman lifted to the kitchen counter with the other man in heated private hold; the second cross-pair pressed close at the fridge with fabric-indent hands", category: "swap-four-grk", placeHints: ["kitchen", "home-interior"], minPeople: 4 },
  { id: "sf-hc-balcony-pull-in-swap", label: "Pulled in from balcony into swap", prompt: "pulled in from the balcony into heated indoor closeness that becomes a calm partner exchange — each woman with the other man in urgent fabric-pressure holds", category: "swap-four-grk", placeHints: ["balcony", "bedroom"], minPeople: 4 },
  // --- Swap four: own-pair rhythm + man grabbing/pressing the other wife ---
  { id: "sf-own-press-other-wife-hip", label: "Own-pair rhythm, grab other wife's hip", prompt: "each couple locked in their own deep shared rhythm through fabric side by side; one man reaches across and firmly grips the other wife's hip, pulling her curve closer without leaving his own partner", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-press-other-wife-waist", label: "Own-pair close, hand on other wife's waist", prompt: "both pairs face-to-face in heated closeness through fabric; one man's free hand rests heavy on the other wife's waist, fingers pressing fabric indent while he stays deep with his own partner", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-own-press-other-upper-front", label: "Own-pair rhythm, palm on other soft upper front", prompt: "each man pressed flush with his own partner in slow rhythm through fabric; one man reaches over and presses a firm palm into the other wife's soft upper front through thin fabric, holding the claim", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-own-press-other-backside", label: "Own-pair hold, squeeze other wife's backside", prompt: "couples in their own close embraces through fabric; one man keeps rhythm with his partner while his other hand digs firmly into the soft lower curves of the other wife's backside, fabric deeply indented", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-press-other-crease", label: "Own-pair grind, fingers into other wife's crease", prompt: "each pair grinding slow circles through fabric; one man slips his free hand to the other wife and presses fingers into the deep fabric crease of her soft lower curves while she stays with her own partner", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-press-other-lower-front", label: "Own-pair rhythm, cup other soft lower front", prompt: "both couples locked in shared rhythm through fabric; one man reaches between the pairs and cups hard against the other wife's soft lower front through fabric, rubbing firmly while never leaving his partner", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-own-behind-grab-other-chest", label: "From-behind with own wife, grab other upper front", prompt: "each man close behind his own wife with waist-grip rhythm through fabric; one man leans sideways and firmly claims the other wife's soft upper front through fabric with a hungry hand", category: "swap-four-grk", placeHints: ["bedroom", "home-interior"], minPeople: 4 },
  { id: "sf-own-behind-grab-other-hip", label: "From-behind own pair, pull other wife's hip in", prompt: "both men pressing from behind their own partners through fabric; one man hooks the other wife's hip and pulls her backside against his thigh without breaking rhythm with his own wife", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-straddle-touch-other", label: "Wife straddles own man, other man grabs her", prompt: "each wife straddles her own partner settling deep through fabric; the other man reaches from his pair and firmly grips her soft lower curves and waist, guiding her bounce while staying with his own wife", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-own-straddle-other-grabs-upper", label: "Dual straddle, cross palm on soft upper front", prompt: "both wives astride their own men in rising rhythm through fabric; each man keeps one hand on his partner and the other pressed into the neighboring wife's soft upper front through fabric", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-onback-cross-thigh-grip", label: "On-back own pairs, grip other wife's thigh", prompt: "each wife on her back with her own man between her thighs in deep close press through fabric; one man reaches across and firmly grips the other wife's open thigh, holding her wider", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-onback-cross-hand-hold", label: "Own-pair on-back, hold other wife's hand to chest", prompt: "parallel on-back deep presses through fabric; one man guides the other wife's hand onto her own soft upper front and presses it there while he stays locked with his partner", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-allfours-grab-neighbor", label: "All-fours own pairs, grab neighbor wife's crease", prompt: "both wives on all fours with their own men behind in crease-press rhythm through fabric; one man reaches to the neighbor and presses hard into her soft lower crease too, claiming both with hands", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-allfours-spank-press-other", label: "All-fours own rhythm, firm press on other backside", prompt: "own-pair all-fours rhythm through fabric side by side; one man keeps driving close with his wife while his free hand firmly presses and shapes the other wife's soft backside curves", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-spoon-reach-other-front", label: "Side-lying own pairs, reach other soft front", prompt: "both couples side-lying in from-behind rhythm through fabric; one man reaches over his partner and cups the other wife's soft upper front through fabric, holding pressure", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-spoon-reach-other-lower", label: "Side-lying own pairs, hand on other lower front", prompt: "stacked side-lying own-pair closeness through fabric; one man's hand slips past to cup the other wife's soft lower front through fabric while hips keep rhythm with his own partner", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-lap-grab-other-waist", label: "Lap own wife, pull other wife by waist", prompt: "each wife in her own man's lap in bouncing close press through fabric; one man hooks the other wife's waist and pulls her soft lower curves against his forearm without leaving his lap partner", category: "swap-four-grk", placeHints: ["sofa", "bedroom"], minPeople: 4 },
  { id: "sf-own-lap-other-sits-close", label: "Own lap rhythm, other wife pressed to his side", prompt: "one wife settling deep in her man's lap through fabric; the other wife stays with her partner but is pulled tight against that man's side as he grips her hip and soft upper front through fabric", category: "swap-four-grk", placeHints: ["sofa", "bedroom"], minPeople: 4 },
  { id: "sf-own-wall-press-grab-other", label: "Wall own-pair press, grab other wife nearby", prompt: "one couple wall-pressed in heated shared rhythm through fabric; the other couple close beside them while that man reaches and firmly grabs the first wife's soft backside through fabric", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-own-edge-bed-cross-grab", label: "Edge-of-bed own pairs, cross grab waist", prompt: "both wives at bed edges with their own men standing between thighs in deep press through fabric; the men reach across and lock free hands on each other's wife's waist", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-kiss-wife-grab-other", label: "Kissing own wife, hand deep on other wife", prompt: "each man in a deep kiss with his own wife through heated closeness; one man's hand is buried firmly in the other wife's soft lower curves and fabric crease at the same time", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-own-rhythm-other-hair-pull-hip", label: "Own-pair rhythm, other wife's hair and hip", prompt: "deep own-pair fabric rhythm; one man gathers the other wife's hair aside with one hand and grips her hip hard with the other while still pressed to his partner", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-face-lower-grab-other-chest", label: "Face at own wife's lower front, grab other upper", prompt: "one man keeps his face close at his own wife's soft lower front through fabric while his free hand firmly presses the other wife's soft upper front; the second couple stays locked in their own close press", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-wife-faces-him-other-grabs", label: "Own wife faces him, other man grabs her from side", prompt: "wife astride her own partner face to face through fabric; the other man, still close with his own wife, reaches and firmly squeezes her soft upper front and waist from the side", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-own-prone-reach-neighbor", label: "Prone own covers, reach neighbor wife's hip", prompt: "both wives flat on stomachs covered by their own men in deep grind through fabric; one man reaches sideways and locks a heavy hand on the neighbor wife's hip and soft backside", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-lotus-cross-palm", label: "Lotus own holds, cross palm under fabric", prompt: "each couple in seated lotus-close shared rhythm through fabric; free hands cross to press under soft fabric at the other wife's soft upper front", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-own-standing-bend-grab-other", label: "Standing bent own pairs, grab other crease", prompt: "both wives bent forward with their own men behind in waist rhythm through fabric; one man also drives fingers into the other wife's deep fabric crease", category: "swap-four-grk", placeHints: ["bedroom", "home-interior"], minPeople: 4 },
  { id: "sf-own-chair-other-stands-grabs", label: "Own chair settle, other man stands and grabs", prompt: "one wife settling on her man in a chair through fabric; the other couple stands close as that man reaches down and firmly grips the seated wife's soft lower curves and soft upper front", category: "swap-four-grk", placeHints: ["hotel", "home-interior"], minPeople: 4 },
  { id: "sf-own-dual-reach-both-wives", label: "Both men on own wives, both grabbing across", prompt: "both pairs in deep own rhythm through fabric while both men simultaneously grip the other wife — hip, soft upper front, or soft lower crease — trading firm claiming hands", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-watch-hand-steal", label: "Own-pair heat, stolen hand under other skirt-fabric", prompt: "each couple lost in their own heated press through fabric; one man's hand steals under the other wife's soft outer fabric to press intimate warmth while her husband keeps his own rhythm", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-own-sofa-parallel-cross-grope", label: "Parallel sofa pairs, cross groping hands", prompt: "two pairs on one sofa in own close rhythm through fabric; hands cross constantly — squeezing soft upper fronts, digging into soft backsides, cupping soft lower fronts of the other wife", category: "swap-four-grk", placeHints: ["sofa", "home-interior"], minPeople: 4 },
  { id: "sf-own-bed-mirror-grab", label: "Own-pair before mirror, grab other wife", prompt: "each couple pressed close facing a mirror in shared rhythm through fabric; one man reaches to the reflection-side pair and firmly grabs the other wife's soft upper front and hip", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-own-floor-blanket-cross-hand", label: "Floor own pairs, cross hand on soft curves", prompt: "both couples on floor blankets in own intimate rhythm through fabric; roaming hands claim the other wife's soft curves — upper front, hip, backside — without swapping partners", category: "swap-four-grk", placeHints: ["home-interior", "bedroom"], minPeople: 4 },
  { id: "sf-own-kitchen-counter-grab", label: "Counter own press, grab other wife at sink", prompt: "one couple in heated counter press through fabric; the other at the sink in their own hold while that man reaches back and firmly grabs the counter wife's soft backside and waist", category: "swap-four-grk", placeHints: ["kitchen", "home-interior"], minPeople: 4 },
  { id: "sf-own-shower-cross-grab", label: "Shower own pairs, cross grab wet fabric", prompt: "both couples under water in own close presses through wet fabric; free hands cross to indent wet cloth at the other wife's soft upper front and soft lower curves", category: "swap-four-grk", placeHints: ["bathroom", "hotel"], minPeople: 4 },
  { id: "sf-own-after-few-keep-grabbing", label: "Own rhythm continues, grabbing never stops", prompt: "pairs stay with their own partners in deep fabric rhythm the whole time; throughout, each man keeps firmly grabbing and pressing the other wife — hip, soft upper front, crease, soft lower front", category: "swap-four-grk", placeHints: ["bedroom", "hotel"], minPeople: 4 },
  { id: "sf-own-wife-pulled-onto-both", label: "Own press, other wife pulled onto his chest", prompt: "man deep with his own wife through fabric; with his free arm he pulls the other wife onto his chest, gripping her soft upper front while her husband keeps close behind her", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },
  { id: "sf-own-double-claim-same-moment", label: "Own hips locked, both hands on other wife", prompt: "hips locked with his own wife in deep rhythm through fabric; both of his hands leave her briefly to firmly claim the other wife's soft upper front and soft lower crease at once, then return", category: "swap-four-grk", placeHints: ["bedroom"], minPeople: 4 },
  { id: "sf-own-guide-other-onto-his-thigh", label: "Own pair close, guide other wife onto thigh", prompt: "staying joined with his own partner through fabric; he guides the other wife to sit partly on his thigh, hand firm on her hip and soft lower front while her husband kisses her neck", category: "swap-four-grk", placeHints: ["sofa", "bedroom"], minPeople: 4 },
  { id: "sf-own-pinch-other-through-fabric", label: "Own rhythm, teasing pinch on other wife", prompt: "own-pair deep shared rhythm through fabric; free fingers tease and lightly pinch the other wife's soft upper front peaks through thin fabric while she stays with her husband", category: "swap-four-grk", placeHints: ["bedroom", "sofa"], minPeople: 4 },

  // --- Two men + her (21+): 1 woman, 2 men — fully indirect fabric/pressure only ---
  { id: "mmf-soft-between-both", label: "Soft between both men", prompt: "she stands between both men; soft teasing hands on her waist and soft upper front through fabric, warm breath on both sides of her neck", category: "mmf-grk", placeHints: ["bedroom", "home-interior", "hotel"], minPeople: 3 },
  { id: "mmf-soft-kiss-one-held-other", label: "Kissing one while the other holds her", prompt: "she shares a lingering heated kiss with one man while the other presses close behind, hands firm on her hips through fabric", category: "mmf-grk", placeHints: ["bedroom", "sofa"], minPeople: 3 },
  { id: "mmf-soft-lap-and-kneel", label: "In one lap, other kneeling close", prompt: "she sits in one man's lap in a quiet heated hold through fabric while the other kneels close, hands exploring her soft thighs", category: "mmf-grk", placeHints: ["sofa", "bedroom"], minPeople: 3 },
  { id: "mmf-soft-guided-hands", label: "Guiding both men's hands on her", prompt: "she guides both men's hands over her soft upper front and soft lower curves through fabric, building heat without rushing", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-front-behind-press", label: "Pressed front and behind", prompt: "she is pressed between both men — chest-to-chest with one, close from behind with the other — firm hip pressure through fabric from both sides", category: "mmf-grk", placeHints: ["bedroom", "hotel", "home-interior"], minPeople: 3 },
  { id: "mmf-front-behind-rhythm", label: "Front-and-behind shared rhythm", prompt: "one man pressed flush to her front and one to her back, both moving in a slow shared rhythm through fabric while she holds onto the man facing her", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-wall-sandwich", label: "Wall sandwich close press", prompt: "her back to the wall with one man kissing her deep; the second man presses close at her side and backside, hands claiming soft upper front and hip through fabric", category: "mmf-grk", placeHints: ["bedroom", "hotel"], minPeople: 3 },
  { id: "mmf-sofa-between", label: "Sofa between both men", prompt: "on the sofa she sits between both men; one kisses her while the other cups her soft upper front through fabric and presses a hand between her soft thighs", category: "mmf-grk", placeHints: ["sofa", "home-interior"], minPeople: 3 },
  { id: "mmf-onback-one-deep-one-upper", label: "On back: one deep press, one at soft upper front", prompt: "she lies on her back knees raised; one man settles between her thighs pressing deep slow contact through fabric while the other claims her soft upper front with mouth and hands through thin fabric", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-onback-legs-shoulders-second-kiss", label: "Legs raised deep press, second at her mouth", prompt: "she lies back with legs toward one man's shoulders as he presses deep rhythmic contact through fabric; the second man kneels at her head sharing a heated kiss and guiding her hands", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-allfours-behind-and-front", label: "All fours: behind press and face at front", prompt: "she is on all fours; one man presses closely behind with waist-grip rhythm against her lower curves through fabric while she keeps her face close against the other man's front center brief through fabric", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-allfours-crease-and-upper", label: "All fours: crease press and soft upper claim", prompt: "on all fours looking back; one man presses into the deep fabric crease of her soft lower curves while the other reaches under to claim her soft upper front through fabric", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-straddle-one-other-behind", label: "Straddle one, other pressed behind", prompt: "she straddles one man facing him as his hands pull her down firmly through fabric; the second man kneels close behind pressing into her backside crease and soft upper front", category: "mmf-grk", placeHints: ["bedroom", "sofa"], minPeople: 3 },
  { id: "mmf-straddle-one-face-other", label: "Straddle one, face close to the other", prompt: "she straddles one man in rising rhythm through fabric while leaning to keep her face close against the other man's front center brief through fabric", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-reverse-straddle-second-front", label: "Reverse straddle, second man at her front", prompt: "she straddles one man facing away with pull-down rhythm through fabric; the second man stands or kneels in front so she can press her face and hands at his center brief through fabric", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-lap-bounce-second-hands", label: "Lap bounce, second man's hands all over", prompt: "she settles bouncing in one man's lap through fabric; the second man stands beside them firmly grabbing her soft upper front, hair, and soft lower curves", category: "mmf-grk", placeHints: ["sofa", "chair", "bedroom"], minPeople: 3 },
  { id: "mmf-edge-bed-standing-second-mouth", label: "Edge standing press, second devoted face", prompt: "she sits at the bed edge; one man stands between her thighs in deep close press through fabric while the other kneels to keep his face close at her soft lower front beside that contact", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-side-lying-front-behind", label: "Side-lying: one behind, one in front", prompt: "she lies on her side; one man presses from behind against her lower curves through fabric while the other faces her sharing deep kisses and palm pressure on soft upper front", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-prone-covered-second-hands", label: "Prone covered press, second man's hands", prompt: "she lies flat on her stomach; one man covers from behind with deep grinding contact through fabric while the second man's hands claim her soft upper front from the side and grip her hair", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-chest-down-hips-high-both", label: "Chest down hips high, both men close", prompt: "chest to the bed hips high; one man presses slow heavy rhythm into her deep fabric crease while the other offers his center brief to her face through fabric", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-lifted-one-other-supports", label: "Lifted by one, other supports and claims", prompt: "one man lifts her with legs wrapped in upward rhythm through fabric; the second man supports her from the side, hands firm on soft upper front and soft lower curves", category: "mmf-grk", placeHints: ["bedroom", "hotel"], minPeople: 3 },
  { id: "mmf-shower-steam-both", label: "Steam shower, both pressed close", prompt: "hot water; she pressed to wet tile with one man in deep upward rhythm through wet fabric while the other claims her mouth and soft upper front beside them", category: "mmf-grk", placeHints: ["bathroom", "hotel"], minPeople: 3 },
  { id: "mmf-face-lower-other-center", label: "Face at her soft lower front, she at his center", prompt: "one man keeps his face devoted at her soft lower front through fabric between her thighs while she keeps her face close against the other man's front center brief through fabric", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-invert-one-second-upper", label: "Inverted with one, second at soft upper front", prompt: "she and one man lie inverted with faces close at soft lower front and center brief through fabric; the second man claims her soft upper front with hands and mouth through thin fabric", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-kneeling-both-centers", label: "Kneeling attention on both center briefs", prompt: "she kneels between both standing men, alternating slow close face attention at each front center brief through fabric while their hands rest in her hair", category: "mmf-grk", placeHints: ["bedroom", "home-interior"], minPeople: 3 },
  { id: "mmf-both-hands-on-her-lower", label: "Both men's hands at soft lower front", prompt: "she stands or sits open; both men press hands firmly at her soft lower front and upper inner thighs through fabric, sharing the claim while kissing her neck and mouth", category: "mmf-grk", placeHints: ["bedroom", "sofa"], minPeople: 3 },
  { id: "mmf-both-on-upper-front", label: "Both men on soft upper front", prompt: "both men give devoted face and hand attention to her soft upper front through fabric at once while she arches between them", category: "mmf-grk", placeHints: ["bedroom", "sofa"], minPeople: 3 },
  { id: "mmf-one-rhythm-other-grabs", label: "One in deep rhythm, other grabs freely", prompt: "one man locked with her in deep shared rhythm through fabric; the other stays close grabbing her soft upper front, hair, backside, and guiding her chin into kisses", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-rotate-who-is-deep", label: "Rotate who presses deep", prompt: "she stays centered between both men; they calmly rotate who presses deep against her lower torso through fabric and who claims her mouth and soft upper front", category: "mmf-grk", placeHints: ["bedroom", "hotel"], minPeople: 3 },
  { id: "mmf-seated-over-face-other-behind", label: "Seated over one face, other behind", prompt: "she sits over one man's devoted face with soft lower front close through fabric while the other man presses close behind with hands on her soft upper front and hips", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-lotus-one-other-kneels", label: "Lotus with one, other kneeling close", prompt: "wrapped face-to-face in one man's lap in slow seated shared rhythm through fabric; the second man kneels beside them pressing hands into her soft backside crease and soft upper front", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-bent-furniture-both", label: "Bent to furniture, both men claiming", prompt: "she leans forward on a dresser; one man grips her waist with rhythmic pressing from behind through fabric while the other stands at her face for close center-brief attention through fabric", category: "mmf-grk", placeHints: ["bedroom", "hotel"], minPeople: 3 },
  { id: "mmf-counter-lift-second-hands", label: "Counter lift press, second man's hands", prompt: "lifted onto a counter with one man between her thighs in deep close press through fabric; the second man beside them firmly claims soft upper front and kisses her", category: "mmf-grk", placeHints: ["kitchen", "hotel"], minPeople: 3 },
  { id: "mmf-door-press-second-joins", label: "Door press, second man joins", prompt: "pressed to a closed door with one man in urgent hold through fabric; the second man joins, sandwiching her with hands on soft curves from the free side", category: "mmf-grk", placeHints: ["hotel", "home-interior"], minPeople: 3 },
  { id: "mmf-mirror-both-behind-front", label: "Mirror: one behind, one in front", prompt: "facing a mirror; one man pressed behind with hip rhythm through fabric and hands on soft upper front while the other faces her, kissing and pressing flush at her soft lower front", category: "mmf-grk", placeHints: ["bedroom", "hotel"], minPeople: 3 },
  { id: "mmf-floor-blanket-both", label: "Floor blanket, both men on her", prompt: "on a soft blanket she is between both men — one deep at her lower torso through fabric, the other devoted at soft upper front and mouth — limbs tangled", category: "mmf-grk", placeHints: ["home-interior", "bedroom"], minPeople: 3 },
  { id: "mmf-afterglow-between-both", label: "Afterglow between both men", prompt: "quiet afterglow; she tangled between both men on wide bedding, their hands still resting on her soft curves through half-settled fabric, slow breathing", category: "mmf-grk", placeHints: ["bedroom", "hotel"], minPeople: 3 },
  { id: "mmf-ease-reseat-second-holds", label: "Ease and reseat, second man holds her open", prompt: "one man eases slightly then presses back fully against her lower torso through fabric in long strokes while the second man holds her thighs open and kisses her", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-hair-guided-between", label: "Hair guided between both", prompt: "both men take turns guiding her head with hands in her hair — close face attention at center briefs through fabric — while the other grips her soft lower curves from behind", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-standing-bent-second-under", label: "Standing bent, second man under her", prompt: "she bends forward braced on the wall with one man behind in waist rhythm through fabric; the second man slips lower in front keeping his face close at her soft lower front through fabric", category: "mmf-grk", placeHints: ["bedroom", "home-interior"], minPeople: 3 },
  { id: "mmf-spit-roast-pose-indirect", label: "Face-forward and from-behind at once", prompt: "aligned so one man is close at her face and center brief through fabric while the other presses deep from behind into her soft lower curves through fabric in matching rhythm", category: "mmf-grk", placeHints: ["bedroom"], minPeople: 3 },
  { id: "mmf-double-hip-claim", label: "Both men claiming her hips", prompt: "both men lock hands on her hips from front and behind, pulling her into overlapping fabric-pressure rhythms while she gasps softly between them", category: "mmf-grk", placeHints: ["bedroom", "hotel"], minPeople: 3 },
  { id: "mmf-night-long-rotate", label: "Night-long rotate attention", prompt: "through the night both men rotate who takes deep shared rhythm through fabric with her and who gives devoted face and hand attention at soft upper and lower fronts", category: "mmf-grk", placeHints: ["bedroom", "hotel"], minPeople: 3 },


];

export function getActionsByCategory(
  category: ActionCategoryId,
  opts?: { allowIntimate?: boolean }
): ActionItem[] {
  if (
    (category === "intimate" || category === "hardcore" || category === "hardcore-grk" || category === "swap-four-grk" || category === "mmf-grk") &&
    opts?.allowIntimate === false
  )
    return [];
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
  const c = getActionById(id)?.category;
  return c === "intimate" || c === "hardcore" || c === "hardcore-grk" || c === "swap-four-grk" || c === "mmf-grk";
}

/** Original Hardcore category only — keeps direct phrasing sanitize path. */
export function isHardcoreAction(id: string): boolean {
  return getActionById(id)?.category === "hardcore";
}

export function isHardcoreGrkAction(id: string): boolean {
  const c = getActionById(id)?.category;
  return c === "hardcore-grk" || c === "swap-four-grk" || c === "mmf-grk";
}

/** Romance / Intimate / Hardcore / Hardcore-grk / Swap-four require every person 21+. */
export function categoryRequiresAdult21(category: ActionCategoryId): boolean {
  return (
    category === "romance" ||
    category === "intimate" ||
    category === "hardcore" ||
    category === "hardcore-grk" ||
    category === "swap-four-grk" ||
    category === "mmf-grk"
  );
}

export function actionRequiresAdult21(id: string): boolean {
  const c = getActionById(id)?.category;
  return !!c && categoryRequiresAdult21(c);
}

export const UNDER21_ALLOWED_CATEGORIES: ActionCategoryId[] = [
  "everyday",
  "social",
  "physical",
];

export function categoryCounts(): Record<ActionCategoryId, number> {
  const counts: Record<ActionCategoryId, number> = {
    everyday: 0,
    social: 0,
    physical: 0,
    romance: 0,
    intimate: 0,
    hardcore: 0,
    "hardcore-grk": 0,
    "swap-four-grk": 0,
    "mmf-grk": 0,
  };
  for (const a of ACTIONS) counts[a.category] += 1;
  return counts;
}
