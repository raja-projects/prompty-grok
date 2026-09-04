/** Dress options: short UI labels + detailed Gemini/ChatGPT/Grok-ready prompts.
 *  Woman entries are always COMPLETE full-body outfits (top + bottom/drape together), not separate pieces alone. */
import type { Gender } from "./people";

export interface DressOption {
  id: string;
  label: string;
  /** Full attire prompt fragment */
  prompt: string;
}

export const WOMAN_DRESSES: DressOption[] = [
  { id: "w-saree-low-hip-chiffon", label: "Complete low-hip chiffon saree set", prompt: "a complete full-body South Indian outfit: plunging fitted bralette blouse covering the bust, fluid chiffon saree draped as the full lower and upper wrap fastened low on the hip bones well below the navel, front pleats gathered tightly, petticoat under the saree, narrow micro-pleated pallu pinned at the shoulder edge accentuating the bust, bare midriff between blouse and saree line, sandals completing the look" },
  { id: "w-bikini-two-piece", label: "Complete two-piece bikini set", prompt: "a complete full-body beach outfit: matching triangle bikini top covering the bust and high-cut bikini bottoms covering the hips, worn as a full coordinated two-piece set that traces her figure, optional thin anklet, Pondicherry/Goa vacation complete look" },
  { id: "w-skintight-salwar", label: "Complete skin-tight salwar kameez", prompt: "a complete full-body salwar kameez: deep-neck stretch kameez top covering bust to hips, matching skin-tight salwar trousers covering legs to ankles with calf slits, dupatta draped over one shoulder, the whole set body-contouring as one outfit, Chennai/Hyderabad street fashion" },
  { id: "w-micro-blouse-silk", label: "Complete silk saree + micro-blouse", prompt: "a complete full-body silk saree ensemble: tiny micro-blouse covering the bust with deep back, rich silk saree draped full-length over petticoat from low waist to floor, pallu over one shoulder, midriff exposed between blouse and saree, temple-city glam complete attire" },
  { id: "w-crop-dhoti-pants", label: "Complete crop + dhoti pants set", prompt: "a complete full-body Indo-western outfit: fitted crop top covering the bust ending under the bustline, high-waist draped dhoti pants covering from hips to ankles as the full lower garment, bare midriff between top and pants, Bangalore cafe complete look" },
  { id: "w-bodycon-indowestern", label: "Complete bodycon Indo-western gown", prompt: "a complete full-body single-piece Indo-western gown: sweetheart neckline covering the bust, bodycon fabric covering torso through legs with thigh-high slit, no separate top/bottom — one continuous gown silhouette, South Indian reception complete attire" },
  { id: "w-sheer-organza-saree", label: "Complete sheer organza saree set", prompt: "a complete full-body festive outfit: deep-V fitted blouse covering the bust, sheer organza saree draped full over petticoat from waist to floor, translucent pallu across torso, midriff visible, Coimbatore/Chennai complete saree set" },
  { id: "w-lehenga-corset", label: "Complete lehenga + corset blouse set", prompt: "a complete full-body lehenga set: tight corset blouse covering the bust and cinching the waist, flared lehenga skirt as full lower garment from waist to floor, optional thin dupatta, bare midriff between blouse and lehenga, wedding-guest complete ensemble" },
  { id: "w-coord-crop-flare", label: "Complete crop + mini skirt co-ord", prompt: "a complete full-body matching co-ord outfit: crop top covering the bust and flared mini skirt covering from waist to mid-thigh as the full lower piece, bare midriff, worn as one coordinated set, Hyderabad brunch complete look" },
  { id: "w-wetlook-beach-saree", label: "Complete wet-look beach saree set", prompt: "a complete full-body coastal outfit: tiny fitted blouse covering the bust, thin wet-look saree draped full-length over petticoat clinging from low hips to ankles, pallu over shoulder, fabric tracing the whole figure, Kerala/Tamil beach complete attire" },
  { id: "w-mundu-set-short-blouse", label: "Complete mundu set + short blouse", prompt: "a complete full-body Kerala mundu set: ultra-short fitted blouse covering the bust, set-mundu / mundu lower cloth covering from waist to ankles with kasavu border as the full bottom drape, navel visible between blouse and mundu, Onam-party complete traditional set worn boldly" },
  { id: "w-linen-unbuttoned", label: "Complete linen shirt-dress look", prompt: "a complete full-body linen outfit: oversized linen shirt-dress covering torso as the main garment worn barely buttoned from chest down, matching or coordinated slip shorts underneath covering the hips as the lower layer, long legs bare below, Pondy complete breezy look" },
  { id: "w-bikini-sheer-wrap", label: "Complete bikini + sheer wrap set", prompt: "a complete full-body resort outfit: two-piece bikini (top covering bust + bottoms covering hips) as the base full swim set, sheer chiffon wrap tied at the hip draping over the lower body as an outer layer, South Indian resort complete attire" },
  { id: "w-anarkali-cutouts", label: "Complete cutout anarkali suit", prompt: "a complete full-body anarkali outfit: plunging stretch anarkali kurta covering bust through knees as the main dress piece with side waist cutouts, matching churidar or slim pants underneath covering the legs, optional dupatta, festive South Indian complete suit" },
  { id: "w-hotpants-crop-jacket", label: "Complete nightlife shorts set", prompt: "a complete full-body nightlife outfit: bralette covering the bust, short cropped jacket worn open over it as the top layer, tiny hot pants covering the hips as the full lower garment, midriff bare, heels completing the Chennai nightlife set" },
  { id: "w-backless-blouse-saree", label: "Complete backless-blouse saree set", prompt: "a complete full-body party saree outfit: backless string blouse covering the bust, saree draped full-length over petticoat from waist to floor, pallu tucked low, deep U-back visible, South Indian sensual party complete ensemble" },
  { id: "w-nivi-side-slit", label: "Complete nivi slit saree set", prompt: "a complete full-body nivi saree outfit: fitted blouse covering the bust, nivi-draped saree over petticoat covering from waist to floor with a thigh-high side slit in the drape, pallu over shoulder, Tamil cinema-inspired complete attire" },
  { id: "w-silk-sexy-drape", label: "Complete Kanchipuram-style silk set", prompt: "a complete full-body silk saree outfit: short fitted blouse covering the bust, soft Kanchipuram-style silk saree draped tightly at the waist over petticoat down to the floor, pallu arranged to accent hips, temple-city evening complete look" },
  { id: "w-tube-blouse-saree", label: "Complete tube-blouse saree set", prompt: "a complete full-body saree outfit: strapless tube blouse covering the bust, flowing saree draped full over petticoat from waist to floor, pallu over one shoulder, bare shoulders, influencer-style complete South Indian set" },
  { id: "w-mini-skirt-kurti", label: "Complete short kurti + mini skirt", prompt: "a complete full-body street-glam outfit: short fitted kurti covering the bust and upper torso, tight mini skirt covering from waist to mid-thigh as the full lower garment, worn together as one set, South Indian college-city complete look" },
  { id: "w-skinfit-jeans-tiny-blouse", label: "Complete jeans + crop blouse set", prompt: "a complete full-body casual outfit: tiny cropped blouse covering the bust, skin-fit high-waist jeans covering from waist to ankles as the full lower garment, bare midriff between blouse and jeans, Bangalore/Hyderabad complete casual sexy set" },
  { id: "w-onepiece-cutout", label: "Complete cutout one-piece swimsuit", prompt: "a complete full-body one-piece swimsuit: single continuous garment covering bust through hips with side cutouts and high-leg cut — no separate top or bottom — South Indian pool-party complete swimwear" },
  { id: "w-saree-gown-fusion", label: "Complete saree-gown fusion", prompt: "a complete full-body fusion gown: single mermaid-silhouette saree-gown covering bust through legs with draped pallu panel, deep neckline, continuous dress (not separate skirt+top), Chennai designer reception complete attire" },
  { id: "w-deepneck-softsilk", label: "Complete deep-neck soft silk saree", prompt: "a complete full-body soft silk saree set: thin-strap deep-neck blouse covering the bust, soft silk saree draped full over petticoat from waist to floor, pallu over shoulder, midriff exposed, evening South Indian complete ensemble" },
  { id: "w-kerala-cotton-sexy", label: "Complete Kerala cotton saree set", prompt: "a complete full-body Kerala cotton saree outfit: short fitted blouse covering the bust, light cotton saree tucked snug at the hips over petticoat and draped to the ankles, pallu over shoulder, coastal complete traditional set worn boldly" },
  { id: "w-palazzo-bralette", label: "Complete palazzo + bralette set", prompt: "a complete full-body Indo-western outfit: bralette crop covering the bust, flowing palazzo pants covering from waist to ankles as the full lower garment, bare midriff and back, cafe-fashion complete set across South India" },
  { id: "w-offshoulder-blouse-saree", label: "Complete off-shoulder saree set", prompt: "a complete full-body sangeet saree outfit: off-shoulder blouse covering the bust, saree draped low over petticoat from waist to floor, pallu styled to frame shoulders, wedding-sangeet complete ensemble" },
  { id: "w-net-sequin-party", label: "Complete net sequin party saree", prompt: "a complete full-body party saree set: skin-tone fitted blouse covering the bust, sheer net sequin saree draped full over petticoat to the floor, sparkling pallu, Hyderabad/Chennai night-out complete attire" },
  { id: "w-athleisure-crop-shorts", label: "Complete athleisure crop + shorts", prompt: "a complete full-body athleisure outfit: cropped sports hoodie covering the bust/torso (zipped low), tiny bike shorts covering the hips as the full lower garment, sneakers implied, gym-to-street South Indian complete set" },
  { id: "w-cocktail-cape-blouse", label: "Complete cocktail saree + cape", prompt: "a complete full-body cocktail saree outfit: plunging inner blouse covering the bust under an open cape-blouse layer, cocktail saree draped full over petticoat to the floor, pallu arranged for glam, red-carpet South Indian complete look" },
  { id: "w-lungi-wrap-bikini-top", label: "Complete lungi wrap beach set", prompt: "a complete full-body beach-club outfit: bikini top covering the bust, colorful lungi wrap tied at the hip covering from waist to calves as the full lower garment (with bikini bottoms underneath), midriff bare, Kochi/Goa-Tamil complete set" },
  { id: "w-sheer-shirt-over-bikini", label: "Complete sheer shirt + bikini set", prompt: "a complete full-body coastal editorial outfit: two-piece bikini (top + bottoms) as the full base swimwear, oversized sheer white shirt worn open as the outer full-torso layer with tails framing hips, complete layered beach look" },
  { id: "w-lehenga-skirt-crop", label: "Complete lehenga + embroidered crop", prompt: "a complete full-body after-party lehenga set: tiny embroidered crop covering the bust, heavy lehenga skirt as full lower garment from waist to floor, optional sheer dupatta, navel visible, reception after-party complete ensemble" },
  { id: "w-dhoti-sports-bra", label: "Complete dhoti + sports-bra set", prompt: "a complete full-body dance-reel outfit: tight sports-bra crop covering the bust, draped dhoti pants covering from waist to ankles as the full lower garment, bare midriff, athletic-sexy South Indian complete set" },
  { id: "w-belted-saree-cinch", label: "Complete belted cinched saree set", prompt: "a complete full-body viral saree outfit: short blouse covering the bust, saree draped full over petticoat from waist to floor with a statement belt cinching the waist over the complete drape, pallu pinned, hips emphasized, reel-trend complete attire" },
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

