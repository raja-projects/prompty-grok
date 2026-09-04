/** Dress options: short UI labels + detailed Gemini/ChatGPT/Grok-ready prompts. */
import type { Gender } from "./people";

export interface DressOption {
  id: string;
  label: string;
  /** Full attire prompt fragment */
  prompt: string;
}

export const WOMAN_DRESSES: DressOption[] = [
  { id: "w-saree-low-hip-chiffon", label: "Low-hip chiffon saree + plunging bralette", prompt: "a bold sensual South Indian saree look: fluid chiffon saree fastened low on the hip bones well below the navel, front pleats gathered tightly to expose the side waist and midriff, plunging bralette-style blouse, narrow micro-pleated pallu pinned at the absolute edge of the shoulder to accentuate the bust, current Instagram-trend drape" },
  { id: "w-bikini-two-piece", label: "Two-piece bikini (beach trend)", prompt: "a modern South Indian beach two-piece bikini: skimpy triangle top and high-cut bottoms that trace her hips and curves, glossy sun-kissed skin, Pondicherry/Goa vacation vibe, maximum body-hugging fit" },
  { id: "w-skintight-salwar", label: "Skin-tight salwar that traces curves", prompt: "a contemporary skin-tight salwar kameez in stretch fabric that closely traces her bust, waist, and hips, deep neckline, side slits at the calves, chic Chennai/Hyderabad street fashion, body-contouring fit" },
  { id: "w-micro-blouse-silk", label: "Micro-blouse silk saree", prompt: "a rich South Indian silk saree paired with a tiny micro-blouse that ends high under the bust, deep backless cut, midriff fully exposed, pallu draped loosely over one shoulder, temple-city glam trend" },
  { id: "w-crop-dhoti-pants", label: "Crop top + high-waist dhoti pants", prompt: "Indo-western crop top ending just below the bust with high-waist draped dhoti pants sitting low on the hips, bare midriff, Bangalore cafe fashion, sleek and figure-hugging" },
  { id: "w-bodycon-indowestern", label: "Bodycon Indo-western gown", prompt: "a bodycon Indo-western gown with thigh-high slit and structured sweetheart neckline, fabric clinging to her silhouette, South Indian reception/party trend, sensual modern cut" },
  { id: "w-sheer-organza-saree", label: "Sheer organza saree + deep-V blouse", prompt: "sheer organza saree over a deep-V fitted blouse, translucent pallu catching light on her waist and bust, trendy Coimbatore/Chennai festive look, deliberately revealing drape" },
  { id: "w-lehenga-corset", label: "Lehenga + corset blouse", prompt: "lehenga with a tight corset blouse that cinches the waist and lifts the bust, bare midriff, modern South Indian wedding-guest glam, body-sculpting fit" },
  { id: "w-coord-crop-flare", label: "Crop + flared skirt co-ord", prompt: "matching co-ord set: tiny crop top and high-flare mini skirt, midriff bare, Hyderabad brunch trend, playful yet maximum skin-forward styling" },
  { id: "w-wetlook-beach-saree", label: "Wet-look beach saree", prompt: "thin wet-look saree clinging to her body after sea spray, low hip drape, tiny blouse, Kerala/Tamil coastal photoshoot aesthetic, fabric tracing every curve" },
  { id: "w-mundu-set-short-blouse", label: "Mundu set + short blouse", prompt: "Kerala mundu set with an ultra-short fitted blouse, navel visible, kasavu border, Onam-party modern twist worn provocatively" },
  { id: "w-linen-unbuttoned", label: "Linen shirt dress unbuttoned", prompt: "oversized linen shirt dress worn barely buttoned, long legs bare, slip shorts hint underneath, Pondy French-quarter fashion, breezy and revealing" },
  { id: "w-bikini-sheer-wrap", label: "Bikini + sheer beach wrap", prompt: "two-piece bikini under a sheer chiffon beach wrap tied loosely at the hip, wrap slipping open, South Indian resort trend" },
  { id: "w-anarkali-cutouts", label: "Tight anarkali with cutouts", prompt: "body-hugging anarkali with side waist cutouts and a plunging neckline, stretch georgette tracing her figure, current South Indian festive fashion" },
  { id: "w-hotpants-crop-jacket", label: "Hot pants + crop jacket", prompt: "tiny hot pants with a short cropped jacket left open over a bralette, urban Chennai nightlife look, legs and midriff on display" },
  { id: "w-backless-blouse-saree", label: "Backless blouse saree", prompt: "saree with a fully backless blouse tied with thin strings, deep U-back, pallu tucked low, classic South Indian sensual party drape" },
  { id: "w-nivi-side-slit", label: "Nivi saree with side slit", prompt: "nivi-style saree with a daring side slit up the thigh, fitted blouse, hip bones visible above the petticoat line, modern Tamil cinema-inspired styling" },
  { id: "w-silk-sexy-drape", label: "Soft silk sexy temple-city drape", prompt: "soft Kanchipuram-style silk draped tightly at the waist with exaggerated hip accent, short blouse, glamorous temple-city evening look" },
  { id: "w-tube-blouse-saree", label: "Tube blouse + saree", prompt: "strapless tube blouse under a flowing saree, shoulders bare, tight wrap at the bust, trending South Indian influencer drape" },
  { id: "w-mini-skirt-kurti", label: "Mini skirt + short kurti", prompt: "ultra-short kurti over a tight mini skirt, mid-thigh hem, figure-hugging, college-city South Indian street style turned glam" },
  { id: "w-skinfit-jeans-tiny-blouse", label: "Skin-fit jeans + tiny blouse", prompt: "skin-fit high-waist jeans with a tiny cropped blouse that ends under the bust, bare midriff, Bangalore/Hyderabad casual sexy" },
  { id: "w-onepiece-cutout", label: "Cutout one-piece swimwear", prompt: "modern one-piece swimwear with bold side cutouts and high-leg cut, body-contouring, South Indian pool-party trend" },
  { id: "w-saree-gown-fusion", label: "Saree-gown fusion", prompt: "fusion saree-gown with clingy mermaid silhouette and draped pallu, deep neckline, Chennai designer reception trend" },
  { id: "w-deepneck-softsilk", label: "Deep-neck soft silk saree", prompt: "soft silk saree with an extremely deep-neck blouse and thin straps, midriff exposed, sensual South Indian evening wear" },
  { id: "w-kerala-cotton-sexy", label: "Kerala cotton saree sexy tuck", prompt: "light Kerala cotton saree tucked snug at the hips, short blouse, damp coastal breeze cling, natural yet boldly revealing" },
  { id: "w-palazzo-bralette", label: "Palazzo + bralette crop", prompt: "flowing palazzo pants with a tiny bralette crop top, bare midriff and back, Indo-western cafe look popular across South India" },
  { id: "w-offshoulder-blouse-saree", label: "Off-shoulder blouse saree", prompt: "off-shoulder blouse with a saree draped low, collarbones and shoulders bare, bust accentuated, trending wedding-sangeet look" },
  { id: "w-net-sequin-party", label: "Net sequin party saree", prompt: "sheer net sequin saree over a skin-tone fitted blouse, sparkle clinging to curves, Hyderabad/Chennai party night trend" },
  { id: "w-athleisure-crop-shorts", label: "Athleisure crop + tiny shorts", prompt: "cropped sports hoodie zipped low with tiny bike shorts that hug the hips, gym-to-street South Indian fitness influencer look" },
  { id: "w-cocktail-cape-blouse", label: "Cocktail saree + cape blouse", prompt: "cocktail saree with a dramatic cape blouse open at the front to reveal a plunging inner neckline, red-carpet South Indian glam" },
  { id: "w-lungi-wrap-bikini-top", label: "Lungi wrap + bikini top", prompt: "colorful lungi wrap skirt tied at the hip with a bikini top, beach-club Kochi/Goa-Tamil crossover trend, midriff bare" },
  { id: "w-sheer-shirt-over-bikini", label: "Sheer white shirt over bikini", prompt: "oversized sheer white shirt worn open over a two-piece bikini, shirt tails framing her hips, coastal South Indian editorial look" },
  { id: "w-lehenga-skirt-crop", label: "Lehenga skirt + crop only", prompt: "heavy lehenga skirt worn with only a tiny embroidered crop, navel and waist fully visible, modern reception after-party styling" },
  { id: "w-dhoti-sports-bra", label: "Dhoti pants + sports-bra crop", prompt: "draped dhoti pants with a tight sports-bra crop top, athletic-sexy South Indian dance-reels aesthetic" },
  { id: "w-belted-saree-cinch", label: "Belted cinched-waist saree", prompt: "saree cinched with a statement belt at the narrowest waist, blouse cut short, hips emphasized, viral South Indian reel trend" },
];

export const MAN_DRESSES: DressOption[] = [
  { id: "m-bare-boxers", label: "Bare chest + short boxers", prompt: "bare chested man in short fitted boxers, housewear, relaxed domestic morning look, skin and torso fully visible" },
  { id: "m-mundu-bare", label: "Mundu only, bare chest", prompt: "traditional mundu wrapped at the waist, bare chest, Kerala/Tamil housewear, casual home setting" },
  { id: "m-vest-shorts", label: "Vest + shorts (house)", prompt: "thin cotton vest and short house shorts, everyday South Indian homewear, soft casual fit" },
  { id: "m-open-linen", label: "Open linen shirt + shorts", prompt: "linen shirt worn completely open over bare chest with casual shorts, coastal South Indian vacation style" },
  { id: "m-towel-wrap", label: "Bath towel wrap, bare chest", prompt: "bare chested with a bath towel wrapped low at the hips, just-out-of-bath house look" },
  { id: "m-gym-shorts-bare", label: "Gym shorts, bare chest", prompt: "bare chest and slim gym shorts, post-workout house/gym look, athletic modern" },
  { id: "m-lungi-bare", label: "Folded lungi, bare chest", prompt: "colorful lungi folded and tucked at the waist, bare chest, classic South Indian home comfort wear" },
  { id: "m-boxer-briefs", label: "Boxer-briefs only", prompt: "wearing only short boxer-briefs, bare chest and legs, intimate housewear styling" },
  { id: "m-tee-shorts", label: "Casual tee + shorts", prompt: "fitted casual tee and chino shorts, modern weekend South Indian streetwear" },
  { id: "m-unbuttoned-jeans", label: "Unbuttoned shirt + jeans", prompt: "shirt unbuttoned down the front over bare chest with slim jeans, night-out modern look" },
  { id: "m-pathani-open", label: "Open pathani set", prompt: "pathani-style kurta worn open over bare chest with matching pants, relaxed festive-home hybrid" },
  { id: "m-sleep-shorts-bare", label: "Sleep shorts, bare chest", prompt: "bare chested in soft sleep shorts, late-night housewear, natural domestic vibe" },
  { id: "m-hoodie-open-shorts", label: "Open hoodie + shorts", prompt: "zip hoodie worn open with no shirt underneath, short shorts, urban casual South Indian youth style" },
  { id: "m-formal-undone", label: "Undone formal shirt + trousers", prompt: "white formal shirt half-unbuttoned, sleeves rolled, tailored trousers, after-office undone look" },
];

export const NONBINARY_DRESSES: DressOption[] = [
  { id: "nb-coord-soft", label: "Soft co-ord set", prompt: "soft linen co-ord set with an open collar and tapered pants, androgynous modern South Indian cafe style" },
  { id: "nb-kurta-trousers", label: "Kurta + trousers", prompt: "light kurta worn slightly open with tailored trousers, gender-fluid festive-casual look" },
  { id: "nb-oversized-tee", label: "Oversized tee + shorts", prompt: "oversized tee and shorts, relaxed street style" },
  { id: "nb-saree-drape-soft", label: "Soft saree drape (tasteful)", prompt: "soft saree draped in a modern gender-fluid style with a fitted inner top, contemporary South Indian fashion" },
  { id: "nb-open-shirt", label: "Open shirt + pants", prompt: "shirt worn open over a tank with straight pants, androgynous coastal vibe" },
];

export const DRESS_OPTIONS_BY_GENDER: Record<Gender, DressOption[]> = {
  woman: WOMAN_DRESSES,
  man: MAN_DRESSES,
  nonbinary: NONBINARY_DRESSES,
};

export function dressesFor(gender: Gender): DressOption[] {
  return DRESS_OPTIONS_BY_GENDER[gender];
}

export function getDress(gender: Gender, idOrPrompt: string): DressOption | undefined {
  const list = dressesFor(gender);
  return list.find((d) => d.id === idOrPrompt || d.prompt === idOrPrompt || d.label === idOrPrompt) ?? list[0];
}

export function defaultDressId(gender: Gender): string {
  return dressesFor(gender)[0]?.id ?? "";
}

