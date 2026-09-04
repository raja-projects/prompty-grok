export type ActionCategoryId =
  | "everyday"
  | "social"
  | "physical"
  | "romance"
  | "intimate"
  | "hardcore";

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

  // --- Expanded Hardcore: full complete acts, he/she, indirect but unmistakable ---
  { id: "hc-deep-crease-press-fingers", label: "Deep backside crease press", prompt: "she stands slightly bent forward; he presses his fingers firmly into the deep fabric crease between the soft lower curves of her backside, holding steady pressure along the warm middle line while her breath deepens", category: "hardcore", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "hc-thumb-spread-crease", label: "Thumbs into soft crease", prompt: "she bends forward braced on the bed; he kneels behind her resting both thumbs deep into the soft middle crease of her lower curves, spreading gentle firm pressure along that line with focused attention", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-face-buried-crease-lick", label: "Face pressed into soft crease", prompt: "she is on all fours; he kneels low behind her with his face pressed tightly into the soft middle crease of her lower curves, mouth moving slowly against warm skin and fabric while his hands hold her hips", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-mouth-on-firm-center", label: "Close mouth attention at his center", prompt: "he sits back against the headboard thighs open; she leans in close between them bringing her mouth to the firm front center of him, lips staying sealed with slow devoted attention while he watches her", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-kneeling-taking-him-deep", label: "Kneeling devoted mouth at his center", prompt: "she kneels in front of him hands on his hips, bringing her mouth close against the firm front center of his body with deep slow rhythm, staying tightly connected there while he rests a hand lightly in her hair", category: "hardcore", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "hc-lying-side-mouth-on-him", label: "Side-lying mouth along his front center", prompt: "they lie on their sides facing each other; she lowers her head along his front upper inner thighs and gives slow close mouth attention along the firm center line of him, lingering with warm contact", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-standing-her-mouth-on-him", label: "Kneeling mouth at standing center", prompt: "he stands; she sinks to her knees and presses her mouth firmly against the front center of him, one hand steady at the base of that contact while she keeps slow close rhythm", category: "hardcore", placeHints: ["bedroom", "shower", "home-interior"], minPeople: 2 },
  { id: "hc-tongue-soft-lower-folds", label: "Close mouth between raised knees", prompt: "she lies back with knees raised and open; he lowers his face between her thighs pressing close against her soft lower front, mouth moving slowly with devoted attention while she grips the sheets", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-mouth-devoted-soft-center", label: "Mouth devoted at soft lower front", prompt: "his face pressed close against her soft lower front between her thighs, mouth moving with careful heated focus while her legs rest over his shoulders and her fingers tangle in his hair", category: "hardcore", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-face-between-thighs-long-licks", label: "Face between thighs soft lower front", prompt: "she sits at the edge of the bed; he kneels between her open thighs pressing his face into her soft lower front, giving long slow mouth attention upward while holding her hips steady", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-sixty-nine-mutual-mouth", label: "Inverted mutual close mouth attention", prompt: "they lie inverted against each other; her mouth stays devoted at the firm front center of him while his mouth stays devoted at her soft lower front at the same time, both giving close heated attention", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-mouth-on-soft-breast", label: "Mouth sealed on soft upper front", prompt: "he cups the soft upper front of her body and brings his mouth firmly against the soft curve of her breast, lips sealed with slow devoted pressure while his tongue traces gently and her back arches toward him", category: "hardcore", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-both-breasts-mouth-and-hand", label: "Mouth and hand on soft upper front", prompt: "she straddles his lap facing him; he brings his mouth to one soft breast with firm sealed attention while his other hand presses and shapes her other soft upper curve, both claimed at once", category: "hardcore", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-from-behind-mouth-on-breast", label: "From behind mouth on soft upper front", prompt: "he stands behind her one arm around her waist, leaning over her shoulder to bring his mouth firmly against her soft upper front while his other hand presses between her upper inner thighs", category: "hardcore", placeHints: ["bedroom", "home-interior"], minPeople: 2 },
  { id: "hc-missionary-deep-joining", label: "Missionary close deep body join", prompt: "she lies on her back knees raised and open; he settles fully between her thighs pressing his body deeply against her soft lower front with slow heavy rhythmic presses, hips locked tight to hers, faces close, every movement fully seated against her", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-missionary-legs-on-shoulders", label: "Missionary legs raised deep press", prompt: "she lies back with both legs up on his shoulders; he folds her close and presses deep rhythmic contact into her soft lower front with long firm strokes, her soft lower curves tilted up to meet him fully", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-missionary-deep-hold", label: "Missionary deep hold grind", prompt: "in close missionary he presses fully against her soft lower front and holds deep grinding slow circles, her legs wrapped around his waist pulling him tighter into that contact", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-all-fours-rear-deep-entry", label: "All fours deep rear press", prompt: "she is on all fours looking back; he kneels behind gripping her hips and presses deep rhythmic contact into the soft middle crease of her lower curves with slow controlled strokes, soft curves meeting him on every press", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-all-fours-soft-center-from-behind", label: "All fours deep from behind", prompt: "she is on all fours; he presses close behind her driving deep rhythmic contact against her soft lower front from behind, hands locked on her waist pulling her back into each firm press", category: "hardcore", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-prone-flat-deep-press", label: "Prone flat deep body press", prompt: "she lies flat on her stomach; he covers her from behind pressing deep rhythmic contact along her soft lower front, full body weight settling her into the mattress with slow grinding presses", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-cowgirl-she-sinks-deep", label: "She settles deep over him", prompt: "he lies on his back; she straddles him facing forward and settles her soft lower front fully down against the firm front center of him, rolling her hips with full weight while his hands grip her soft lower curves", category: "hardcore", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-reverse-cowgirl-deep", label: "Reverse straddle deep settle", prompt: "she straddles him facing away leaning forward on her hands; he guides her hips as she settles deep against him, soft lower curves rising and falling with heavy rhythm", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-spooning-deep-from-behind", label: "Spooning deep press from behind", prompt: "they lie on their sides spooned; he presses deep slow rhythmic contact against her soft lower front from behind, one hand on her soft upper front, her knee lifted to open that contact", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-standing-lift-deep", label: "Standing lift deep body join", prompt: "he lifts her with her back to the wall, her legs wrapped around his waist as he presses deep upward rhythmic contact against her soft lower front, holding her firmly while their faces stay close", category: "hardcore", placeHints: ["bedroom", "home-interior", "shower"], minPeople: 2 },
  { id: "hc-edge-of-bed-deep-thrust", label: "Edge of bed deep standing press", prompt: "she sits at the edge of the bed leaning back on her hands; he stands between her open thighs pressing deep firm rhythmic contact into her soft lower front, her legs hooked around him", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-bent-over-desk-deep", label: "Bent over deep from behind", prompt: "she bends forward over a desk or bed edge; he stands behind gripping her hips and presses deep hard rhythmic contact against her soft lower front, soft lower curves meeting him on every push", category: "hardcore", placeHints: ["bedroom", "office", "mall-office"], minPeople: 2 },
  { id: "hc-licking-inner-thighs-to-center", label: "Mouth along inner thighs to soft lower front", prompt: "he gives slow close mouth attention up her inner thighs until his face reaches her soft lower front, lingering with warm devoted contact over her most private soft center while she opens wider", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-her-hand-guiding-his-mouth", label: "Her hands guiding his face lower", prompt: "she guides his head with both hands pressing his face firmly against her soft lower front, holding him there as he gives close heated mouth attention with hungry focus", category: "hardcore", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-hand-stroking-him-into-mouth", label: "Hand and mouth at his firm center", prompt: "she wraps one hand around the firm front center of him with steady strokes while bringing her mouth close against him with sealed attention, alternating tight hand rhythm and close mouth contact", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-him-licking-while-fingers-deep", label: "Mouth and fingers at soft lower front", prompt: "his mouth works slowly against her soft lower front while his fingers press deep into the soft warm folds there, curling firmly as her hips lift into his hand and mouth", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-her-riding-his-mouth", label: "She settles over his mouth", prompt: "he lies on his back; she kneels over his face lowering her soft lower front onto his mouth, rolling gently as he gives upward devoted mouth attention while both hands grip her soft lower curves", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-deep-rear-crease-then-entry", label: "Crease press then deep rear contact", prompt: "first he presses thumbs deep into the warm middle crease of her backside spreading soft pressure; then he guides firm close contact into that same rear line with deep slow presses while she stays on all fours", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-face-down-ass-up-deep", label: "Chest down hips high deep press", prompt: "she presses her chest to the bed with hips high; he kneels behind and drives deep rhythmic contact against her soft lower front and middle crease, hands spreading her soft lower curves wide", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-lap-facing-deep-bounce", label: "In his lap deep bounce join", prompt: "she sits in his lap facing him fully pressed close; he holds her soft lower curves and lifts her so she settles deep against the firm front center of him in a bouncing rhythm, soft upper fronts pressed to his chest", category: "hardcore", placeHints: ["sofa", "bedroom", "chair"], minPeople: 2 },
  { id: "hc-shower-wall-deep-thrust", label: "Shower wall deep body join", prompt: "hot water running; her back to the wet tiles one leg hooked around him as he presses deep upward rhythmic contact against her soft lower front, mouths open close, bodies slick and locked", category: "hardcore", placeHints: ["shower"], minPeople: 2 },
  { id: "hc-slow-pullout-deep-drive", label: "Slow ease then deep reseat press", prompt: "in close missionary he eases almost away from her soft lower front then presses back in fully with a deep firm stroke, repeating the long contact while she holds him tight", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-mouth-on-him-eye-contact", label: "Mouth at his center with eye contact", prompt: "she looks up into his eyes while her mouth stays sealed in close attention at the firm front center of him, keeping slow deep rhythm as he brushes her cheek", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-spread-folds-tongue-point", label: "Thumbs open soft lower front mouth focus", prompt: "his thumbs gently open the soft warm area of her lower front; he gives precise close mouth attention over her most sensitive peak in tight circles while she trembles", category: "hardcore", placeHints: ["bedroom"], minPeople: 2 },
  { id: "hc-double-claim-mouth-breast-hand-center", label: "Mouth on breast hand on soft lower front", prompt: "he gives firm sealed mouth attention on her soft breast while his hand slides between her thighs pressing and rubbing her soft lower front, claiming upper and lower at once", category: "hardcore", placeHints: ["bedroom", "sofa"], minPeople: 2 },
  { id: "hc-from-behind-hand-on-soft-center", label: "From behind hand on soft lower front", prompt: "he presses close behind her one arm around her waist his hand cupped hard against her soft lower front rubbing firmly between her thighs while the firm front of him presses into the crease of her backside", category: "hardcore", placeHints: ["bedroom", "kitchen", "home-interior"], minPeople: 2 },


];

export function getActionsByCategory(
  category: ActionCategoryId,
  opts?: { allowIntimate?: boolean }
): ActionItem[] {
  if (
    (category === "intimate" || category === "hardcore") &&
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
  return c === "intimate" || c === "hardcore";
}

export function isHardcoreAction(id: string): boolean {
  return getActionById(id)?.category === "hardcore";
}

/** Romance / Intimate / Hardcore require every person 21+. */
export function categoryRequiresAdult21(category: ActionCategoryId): boolean {
  return category === "romance" || category === "intimate" || category === "hardcore";
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
  const counts = {
    everyday: 0,
    social: 0,
    physical: 0,
    romance: 0,
    intimate: 0,
    hardcore: 0,
  } as Record<ActionCategoryId, number>;
  for (const a of ACTIONS) counts[a.category] += 1;
  return counts;
}
