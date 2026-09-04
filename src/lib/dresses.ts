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

  // Young-adult feminine outfits (adult 18+ framing) — cute/casual/college-city; adult woman styling only
  { id: "w-ya-pastel-sundress", label: "Complete YA pastel sundress", prompt: "a complete full-body young-adult outfit: soft pastel sundress as one continuous dress covering bust through mid-thigh with thin straps, simple sandals, fresh college-city daytime look for an adult woman" },
  { id: "w-ya-denim-skirt-crop", label: "Complete YA denim skirt + crop", prompt: "a complete full-body young-adult casual set: fitted crop tee covering the bust, high-waist denim mini skirt covering from waist to mid-thigh as the full lower garment, bare midriff, sneakers, adult college-city street look" },
  { id: "w-ya-pleated-skirt-blouse", label: "Complete YA pleated skirt set", prompt: "a complete full-body young-adult outfit: soft short-sleeve blouse covering the bust and torso, high-waist pleated mini skirt covering from waist to mid-thigh as the full lower piece, loafers, cute adult campus-cafe complete look" },
  { id: "w-ya-overall-shorts", label: "Complete YA denim overall shorts", prompt: "a complete full-body young-adult outfit: denim short overalls as the main garment covering torso and hips with a fitted tee underneath covering the bust, cuffed short legs, sneakers, playful adult weekend set" },
  { id: "w-ya-hoodie-mini", label: "Complete YA hoodie + mini skirt", prompt: "a complete full-body young-adult outfit: oversized soft hoodie covering the bust and torso, stretch mini skirt covering from waist to mid-thigh as the full lower garment, ankle socks and sneakers, cozy adult street-casual set" },
  { id: "w-ya-gingham-mini", label: "Complete YA gingham mini dress", prompt: "a complete full-body young-adult outfit: gingham check mini dress as one continuous garment covering bust through mid-thigh with a soft sash waist, simple flats, sweet adult picnic/cafe complete look" },
  { id: "w-ya-ribbed-set", label: "Complete YA ribbed co-ord set", prompt: "a complete full-body young-adult co-ord: ribbed scoop tank covering the bust, matching ribbed mini skirt covering from waist to mid-thigh as the full lower piece, bare midriff optional, adult soft-casual complete set" },
  { id: "w-ya-cargo-crop", label: "Complete YA cargo + crop set", prompt: "a complete full-body young-adult street set: cropped tee covering the bust, low-slung cargo shorts covering the hips as the full lower garment, chunky sneakers, adult urban campus complete look" },
  { id: "w-ya-knit-cardigan-dress", label: "Complete YA cardigan over slip dress", prompt: "a complete full-body young-adult layered outfit: soft slip mini dress covering bust through mid-thigh as the base, open knit cardigan as the outer full-torso layer, Mary-jane flats, gentle adult cafe complete look" },
  { id: "w-ya-tennis-skirt-tank", label: "Complete YA tennis skirt + tank", prompt: "a complete full-body young-adult sporty set: fitted tank covering the bust, pleated tennis mini skirt covering from waist to mid-thigh as the full lower garment, white sneakers, athletic-cute adult complete look" },
  { id: "w-ya-floral-midi", label: "Complete YA floral midi dress", prompt: "a complete full-body young-adult outfit: light floral midi dress as one continuous garment covering bust through mid-calf with a soft neckline, flat sandals, breezy adult garden/cafe complete look" },
  { id: "w-ya-boyfriend-shirt-shorts", label: "Complete YA shirt + soft shorts", prompt: "a complete full-body young-adult house-casual set: oversized boyfriend shirt covering the bust and torso (lightly buttoned), soft cotton shorts covering the hips as the full lower garment, bare legs, adult cozy weekend complete look" },
  { id: "w-ya-pinafore-dress", label: "Complete YA pinafore + tee set", prompt: "a complete full-body young-adult outfit: short denim or cotton pinafore dress as the main layer covering torso through mid-thigh, fitted tee underneath covering the bust, sneakers, cute adult complete look" },
  { id: "w-ya-wrap-mini", label: "Complete YA wrap mini dress", prompt: "a complete full-body young-adult outfit: soft wrap mini dress as one continuous garment covering bust through mid-thigh with a side tie, low heels or flats, flirty adult evening-casual complete look" },
  { id: "w-ya-balloon-sleeve-dress", label: "Complete YA balloon-sleeve dress", prompt: "a complete full-body young-adult outfit: balloon-sleeve short dress as one continuous piece covering bust through mid-thigh, soft waist definition, simple shoes, pretty adult daytime complete look" },
  { id: "w-ya-track-set-crop", label: "Complete YA cropped track set", prompt: "a complete full-body young-adult athleisure set: cropped track jacket covering the bust/torso, matching short track shorts covering the hips as the full lower garment, sneakers, sporty adult campus complete look" },
  { id: "w-ya-soft-salwar-cute", label: "Complete YA soft pastel salwar", prompt: "a complete full-body young-adult salwar set: soft pastel kameez covering bust to hips, matching light salwar trousers covering legs to ankles, thin dupatta, gentle adult college-festive complete look" },
  { id: "w-ya-short-kurti-leggings", label: "Complete YA short kurti + leggings", prompt: "a complete full-body young-adult casual Indian set: short fitted kurti covering the bust and upper torso, stretch leggings covering from waist to ankles as the full lower garment, sandals, everyday adult college-city complete look" },
  { id: "w-ya-chudi-simple", label: "Complete YA simple churidar set", prompt: "a complete full-body young-adult churidar outfit: simple fitted kurta covering bust through thighs, churidar pants covering the legs, light dupatta, neat adult campus-festive complete set" },
  { id: "w-ya-babydoll-dress", label: "Complete YA soft babydoll dress", prompt: "a complete full-body young-adult outfit: soft babydoll mini dress as one continuous garment covering bust through mid-thigh with a gentle empire line, simple flats, sweet adult daytime complete look — adult woman styling only" },

  // Normal late-teen style outfits for adult women age 19–20
  { id: "w-ya19-basic-tee-jeans", label: "Age 19–20 basic tee + jeans", prompt: "a realistic complete everyday outfit for an adult woman age 19–20: regular-fit crew-neck cotton T-shirt covering the torso, comfortable straight-leg blue jeans covering waist to ankles, simple sneakers, natural college or neighborhood styling" },
  { id: "w-ya19-hoodie-jeans", label: "Age 19–20 hoodie + jeans", prompt: "a realistic complete casual outfit for an adult woman age 19–20: soft pullover hoodie covering the upper body, relaxed high-waist jeans covering waist to ankles, everyday sneakers, practical campus or travel styling" },
  { id: "w-ya19-oversized-tee-leggings", label: "Age 19–20 oversized tee + leggings", prompt: "a realistic complete relaxed outfit for an adult woman age 19–20: oversized cotton T-shirt covering the torso and upper hips, opaque ankle-length leggings as the full lower garment, running shoes, simple everyday errand or study-day styling" },
  { id: "w-ya19-plaid-shirt-jeans", label: "Age 19–20 plaid shirt + jeans", prompt: "a realistic complete casual outfit for an adult woman age 19–20: softly oversized plaid button-up shirt over a plain crew-neck tee, classic straight jeans covering waist to ankles, canvas sneakers, believable college-day styling" },
  { id: "w-ya19-denim-jacket-dress", label: "Age 19–20 denim jacket + casual dress", prompt: "a realistic complete daytime outfit for an adult woman age 19–20: lightweight denim jacket over a simple knee-length cotton dress covering the torso through the knees, low-top sneakers, natural cafe or weekend styling" },
  { id: "w-ya19-kurti-jeans", label: "Age 19–20 kurti + jeans", prompt: "a realistic complete Indian casual outfit for an adult woman age 19–20: comfortable cotton kurti covering shoulders and torso through upper thighs, straight blue jeans covering waist to ankles, flat sandals, ordinary college-city styling" },
  { id: "w-ya19-cotton-salwar", label: "Age 19–20 cotton salwar set", prompt: "a realistic complete Indian everyday outfit for an adult woman age 19–20: simple printed cotton kameez covering shoulders through thighs, matching salwar trousers covering the legs to the ankles, lightweight dupatta and flat sandals, natural campus or family-outing styling" },
  { id: "w-ya19-long-kurta-palazzo", label: "Age 19–20 long kurta + palazzo", prompt: "a realistic complete young-adult outfit for an adult woman age 19–20: modest long cotton kurta covering the torso through the knees, comfortable full-length palazzo trousers, simple flats, believable classroom or daytime-event styling" },
  { id: "w-ya19-midi-sneakers", label: "Age 19–20 casual midi dress + sneakers", prompt: "a realistic complete casual outfit for an adult woman age 19–20: short-sleeve cotton midi dress covering shoulders through mid-calf with a natural relaxed fit, clean sneakers and a small crossbody bag, ordinary weekend styling" },
  { id: "w-ya19-cardigan-skirt", label: "Age 19–20 cardigan + knee skirt", prompt: "a realistic complete youthful outfit for an adult woman age 19–20: lightweight buttoned cardigan over a plain fitted tee, simple knee-length A-line skirt as the full lower garment, ankle socks and loafers, believable library or cafe styling" },
  { id: "w-ya19-sweatshirt-joggers", label: "Age 19–20 sweatshirt + joggers", prompt: "a realistic complete athleisure outfit for an adult woman age 19–20: relaxed crew-neck sweatshirt covering the upper body, full-length cotton joggers covering waist to ankles, practical trainers, natural study, travel or morning-walk styling" },
  { id: "w-ya19-polo-trousers", label: "Age 19–20 polo + casual trousers", prompt: "a realistic complete smart-casual outfit for an adult woman age 19–20: simple short-sleeve polo shirt covering the torso, relaxed ankle-length cotton trousers, clean sneakers and a practical watch, believable college-presentation styling" },
  { id: "w-ya19-tunic-leggings", label: "Age 19–20 tunic + leggings", prompt: "a realistic complete everyday outfit for an adult woman age 19–20: comfortable printed tunic covering shoulders and torso through mid-thigh, opaque full-length leggings, flat sandals and a small backpack, natural Indian college styling" },
  { id: "w-ya19-salwar-backpack", label: "Age 19–20 salwar + backpack", prompt: "a realistic complete student-casual outfit for an adult woman age 19–20: simple knee-length cotton salwar kameez with full-length trousers and a neatly draped dupatta, practical backpack, flat sandals, ordinary commute-to-college styling" },

  // Adult age 19–20 office, track-pant, and midriff-visible outfits
  { id: "w-ya19-office-blouse-trousers", label: "Age 19–20 office blouse + trousers", prompt: "a realistic complete office outfit for an adult woman age 19–20: neatly tucked long-sleeve collared blouse covering the torso, tailored high-waist straight trousers covering waist to ankles, closed-toe flats, slim belt and practical work tote" },
  { id: "w-ya19-office-blazer-set", label: "Age 19–20 blazer office set", prompt: "a realistic complete office outfit for an adult woman age 19–20: fitted single-breasted blazer over a modest shell top covering the bust and torso, matching ankle-length tailored trousers, low block heels, simple watch and structured handbag" },
  { id: "w-ya19-office-pencil-skirt", label: "Age 19–20 office shirt + pencil skirt", prompt: "a realistic complete office outfit for an adult woman age 19–20: crisp button-front shirt covering shoulders and torso, knee-length tailored pencil skirt as the full lower garment, sheer-neutral stockings optional, low pumps and an employee lanyard" },
  { id: "w-ya19-office-kurti-pants", label: "Age 19–20 office kurti + pants", prompt: "a realistic complete Indian office outfit for an adult woman age 19–20: clean straight-cut cotton kurti covering shoulders through the knees, fitted full-length cigarette pants, flat sandals, simple earrings and a practical laptop bag" },
  { id: "w-ya19-track-tee", label: "Age 19–20 tee + track pants", prompt: "a realistic complete athleisure outfit for an adult woman age 19–20: regular fitted crew-neck cotton tee covering the bust and torso, full-length relaxed track pants with side stripes and drawstring waist, running shoes, natural training or travel styling" },
  { id: "w-ya19-track-hoodie", label: "Age 19–20 hoodie + track pants", prompt: "a realistic complete sporty outfit for an adult woman age 19–20: zip-front hoodie worn closed over a simple inner tee, full-length tapered track pants covering waist to ankles, cushioned trainers, believable campus, jogging or airport styling" },
  { id: "w-ya19-track-crop", label: "Age 19–20 crop tee + track pants", prompt: "a realistic complete sporty outfit for an adult woman age 19–20: fitted short crop T-shirt securely covering the bust and ending above the natural waist, low-rise full-length track pants as the lower garment, clearly visible bare midriff and navel, trainers, adult gym-to-street styling" },
  { id: "w-ya19-track-sports-top", label: "Age 19–20 sports top + track pants", prompt: "a realistic complete workout outfit for an adult woman age 19–20: supportive fitted sports crop top covering the bust, relaxed low-waist full-length track pants, clearly visible toned midriff and navel, athletic shoes, practical adult dance-practice or fitness styling" },
  { id: "w-ya19-crop-jeans-navel", label: "Age 19–20 crop tee + jeans, navel visible", prompt: "a realistic complete casual outfit for an adult woman age 19–20: fitted short-sleeve crop tee covering the bust and ending above the waist, low-rise straight jeans covering hips to ankles, clear natural gap of bare midriff with the navel visible, sneakers and a small shoulder bag" },
  { id: "w-ya19-crop-cargo-navel", label: "Age 19–20 crop top + cargos, navel visible", prompt: "a realistic complete streetwear outfit for an adult woman age 19–20: simple fitted crop top securely covering the bust, low-slung full-length cargo trousers covering hips to ankles, clearly visible bare waist and navel, chunky sneakers and a light overshirt tied at the hips" },
  { id: "w-ya19-saree-navel", label: "Age 19–20 simple saree, navel visible", prompt: "a realistic complete South Indian occasion outfit for an adult woman age 19–20: properly fitted short-sleeve blouse covering the bust, lightweight cotton-blend saree fully draped over a petticoat from low waist to floor, neat shoulder pallu, natural midriff gap with the navel visibly framed, sandals and minimal jewelry" },
  { id: "w-ya19-lehenga-navel", label: "Age 19–20 simple lehenga, navel visible", prompt: "a realistic complete festive outfit for an adult woman age 19–20: fitted short choli securely covering the bust, full ankle-length lightly flared lehenga skirt sitting below the natural waist, clearly visible midriff and navel, lightweight dupatta over one shoulder, flat embellished sandals" },

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

export const MINOR_DRESSES_BY_GENDER: Record<Gender, DressOption[]> = {
  woman: [
    { id: "girl-tee-jeans", label: "T-shirt + full-length jeans", prompt: "age-appropriate crew-neck cotton T-shirt and comfortable full-length jeans with sneakers" },
    { id: "girl-kurta-leggings", label: "Modest kurta + leggings", prompt: "age-appropriate knee-length cotton kurta with full-length opaque leggings and flat sandals" },
    { id: "girl-salwar-set", label: "Simple salwar set", prompt: "age-appropriate cotton salwar kameez with full-length trousers and neatly arranged dupatta" },
    { id: "girl-hoodie-joggers", label: "Hoodie + joggers", prompt: "age-appropriate pullover hoodie with relaxed full-length joggers and practical trainers" },
    { id: "girl-school-casual", label: "Polo + straight trousers", prompt: "age-appropriate polo shirt with comfortable straight full-length trousers and sneakers" },
    { id: "girl-sports-set", label: "Sports tee + track pants", prompt: "age-appropriate sports T-shirt with full-length track pants and running shoes" },
  ],
  man: [
    { id: "boy-tee-jeans", label: "T-shirt + full-length jeans", prompt: "age-appropriate crew-neck cotton T-shirt and comfortable full-length jeans with sneakers" },
    { id: "boy-shirt-trousers", label: "Casual shirt + trousers", prompt: "age-appropriate button-front casual shirt worn closed with full-length cotton trousers" },
    { id: "boy-kurta-pajama", label: "Kurta + pajama trousers", prompt: "age-appropriate modest kurta with full-length pajama trousers and sandals" },
    { id: "boy-hoodie-joggers", label: "Hoodie + joggers", prompt: "age-appropriate pullover hoodie with relaxed full-length joggers and trainers" },
    { id: "boy-polo-chinos", label: "Polo + chinos", prompt: "age-appropriate polo shirt with full-length chinos and sneakers" },
    { id: "boy-sports-set", label: "Sports tee + track pants", prompt: "age-appropriate sports T-shirt with full-length track pants and running shoes" },
  ],
  nonbinary: [
    { id: "minor-nb-tee-jeans", label: "T-shirt + full-length jeans", prompt: "age-appropriate relaxed crew-neck T-shirt with full-length jeans and sneakers" },
    { id: "minor-nb-hoodie-joggers", label: "Hoodie + joggers", prompt: "age-appropriate hoodie with relaxed full-length joggers and trainers" },
    { id: "minor-nb-kurta-trousers", label: "Kurta + trousers", prompt: "age-appropriate modest kurta with comfortable full-length trousers" },
    { id: "minor-nb-sports-set", label: "Sports tee + track pants", prompt: "age-appropriate sports T-shirt with full-length track pants and running shoes" },
  ],
};

export const DRESS_OPTIONS_BY_GENDER: Record<Gender, DressOption[]> = {
  woman: WOMAN_DRESSES,
  man: MAN_DRESSES,
  nonbinary: NONBINARY_DRESSES,
};

export function dressesFor(gender: Gender): DressOption[] {
  return DRESS_OPTIONS_BY_GENDER[gender];
}

export function dressesForAge(gender: Gender, age?: string): DressOption[] {
  return Number(age) < 19 ? MINOR_DRESSES_BY_GENDER[gender] : dressesFor(gender);
}

export function getDress(gender: Gender, idOrPrompt: string): DressOption | undefined {
  const list = [...dressesFor(gender), ...MINOR_DRESSES_BY_GENDER[gender]];
  return list.find((d) => d.id === idOrPrompt || d.prompt === idOrPrompt || d.label === idOrPrompt) ?? list[0];
}

export function defaultDressId(gender: Gender): string {
  return dressesFor(gender)[0]?.id ?? "";
}
