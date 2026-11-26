export type FemaleBand = "preteen" | "teen" | "young" | "woman";
export type MaleBand = "boy" | "teenboy" | "youngman" | "man" | "midage" | "old";

export function femaleBand(age: number): FemaleBand {
  if (age <= 13) return "preteen";
  if (age <= 21) return "teen";
  if (age <= 27) return "young";
  return "woman";
}

export function maleBand(age: number): MaleBand {
  if (age <= 13) return "boy";
  if (age <= 19) return "teenboy";
  if (age <= 30) return "youngman";
  if (age <= 45) return "man";
  if (age <= 60) return "midage";
  return "old";
}

export interface DressDef {
  id: string;
  label: string;
  state: string;
  rear?: string;
}

export const FEMALE_DRESS: Record<FemaleBand, DressDef[]> = {
  preteen: [
    { id: "pattu-pavada", label: "Pattu pavada", state: "the pavada to the knee, the blouse on", rear: "the pavada to the knee" },
    { id: "pavada-blouse", label: "Pavada and blouse", state: "the pavada to the knee, the blouse on", rear: "the pavada to the knee" },
    { id: "dhavani", label: "Dhavani", state: "the skirt to the knee, the upper cloth over one shoulder", rear: "the upper cloth thrown forward, the back bare" },
    { id: "half-saree", label: "Half saree", state: "the skirt to the knee, the upper cloth loose over one shoulder", rear: "the upper cloth thrown forward, the back bare" },
    { id: "churidar", label: "Churidar", state: "the kurta to the hip", rear: "the kurta pulled up to the hip" },
    { id: "skirt-top", label: "Skirt and top", state: "the skirt to the knee, the top on", rear: "the skirt to the knee" },
    { id: "long-skirt", label: "Long skirt and top", state: "the long skirt to the ankle, the top on", rear: "the long skirt to the ankle" },
    { id: "frock", label: "Frock", state: "the frock to the knee", rear: "the frock to the knee" },
    { id: "school-uniform", label: "School uniform", state: "the pinafore to the knee, the shirt tucked", rear: "the pinafore to the knee" },
    { id: "jeans-top", label: "Jeans and top", state: "the jeans at the hip, the top on", rear: "the jeans at the hip" },
    { id: "shorts-tshirt", label: "Shorts and T-shirt", state: "the shorts to the thigh, the t-shirt on", rear: "the shorts to the thigh" },
    { id: "nightie", label: "Nightie", state: "the nightie to the knee", rear: "the nightie to the knee" },
  ],
  teen: [
    { id: "half-saree", label: "Half saree", state: "the skirt to the knee, the upper cloth loose over one shoulder", rear: "the upper cloth thrown forward, the back bare" },
    { id: "cotton-saree", label: "Cotton saree", state: "wrapped to the hip, the pallu across it", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "saree-pallu", label: "Saree, pallu over shoulder", state: "wrapped to the hip, the pallu over her shoulder", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "churidar", label: "Churidar", state: "the kurta to the hip", rear: "the kurta pulled up to the hip" },
    { id: "kurti-leggings", label: "Kurti and leggings", state: "the kurti to the thigh", rear: "the kurti pulled up to the thigh" },
    { id: "kurti-skirt", label: "Kurti and skirt", state: "the kurti to the thigh, the skirt to the knee", rear: "the kurti pulled up, the skirt to the knee" },
    { id: "salwar", label: "Salwar kameez", state: "the kameez to the thigh", rear: "the kameez pulled up to the thigh" },
    { id: "jeans-top", label: "Jeans and top", state: "the jeans at the hip, the top on", rear: "the jeans at the hip" },
    { id: "college-uniform", label: "College uniform", state: "the skirt to the knee, the shirt tucked", rear: "the skirt to the knee" },
    { id: "pattu-pavada", label: "Pattu pavada", state: "the pavada to the knee, the blouse on", rear: "the pavada to the knee" },
    { id: "nightie", label: "Nightie", state: "the nightie to the knee", rear: "the nightie to the knee" },
    { id: "long-skirt", label: "Long skirt and top", state: "the long skirt to the ankle, the top on", rear: "the long skirt to the ankle" },
  ],
  young: [
    { id: "kasavu-saree", label: "Kasavu saree", state: "wrapped to the hip, the pallu across it", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "silk-saree", label: "Silk saree", state: "wrapped to the hip, the pallu across it", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "cotton-saree", label: "Cotton saree", state: "wrapped to the hip, the pallu across it", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "chiffon-saree", label: "Chiffon saree", state: "wrapped to the hip, the pallu across it", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "office-saree", label: "Saree, office wear", state: "wrapped to the hip, the pallu pinned at the shoulder", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "churidar", label: "Churidar", state: "the kurta to the hip", rear: "the kurta pulled up to the hip" },
    { id: "kurti-leggings", label: "Kurti and leggings", state: "the kurti to the thigh", rear: "the kurti pulled up to the thigh" },
    { id: "salwar", label: "Salwar kameez", state: "the kameez to the thigh", rear: "the kameez pulled up to the thigh" },
    { id: "jeans-top", label: "Jeans and top", state: "the jeans at the hip, the top on", rear: "the jeans at the hip" },
    { id: "skirt-top", label: "Skirt and top", state: "the skirt to the knee, the top on", rear: "the skirt to the knee" },
    { id: "coord-set", label: "Co-ord set", state: "the top to the waist, the shorts to the thigh", rear: "the shorts to the thigh" },
    { id: "nightie", label: "Nightie", state: "the nightie to the knee", rear: "the nightie to the knee" },
    { id: "nightdress", label: "Short nightdress", state: "the nightdress to the thigh", rear: "the nightdress to the thigh" },
  ],
  woman: [
    { id: "kasavu-saree", label: "Kasavu saree", state: "wrapped to the hip, the pallu across it", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "silk-saree", label: "Silk saree", state: "wrapped to the hip, the pallu across it", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "kanjeevaram", label: "Kanjeevaram saree", state: "wrapped to the hip, the pallu across it", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "cotton-saree", label: "Cotton saree", state: "wrapped to the hip, the pallu across it", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "chiffon-saree", label: "Chiffon saree", state: "wrapped to the hip, the pallu across it", rear: "the pallu thrown forward, the back bare to the waistband" },
    { id: "churidar", label: "Churidar", state: "the kurta to the hip", rear: "the kurta pulled up to the hip" },
    { id: "salwar", label: "Salwar kameez", state: "the kameez to the thigh", rear: "the kameez pulled up to the thigh" },
    { id: "kurti-leggings", label: "Kurti and leggings", state: "the kurti to the thigh", rear: "the kurti pulled up to the thigh" },
    { id: "nightie", label: "Nightie", state: "the nightie to the knee", rear: "the nightie to the knee" },
    { id: "nightdress", label: "Short nightdress", state: "the nightdress to the thigh", rear: "the nightdress to the thigh" },
    { id: "jeans-top", label: "Jeans and top", state: "the jeans at the hip, the top on", rear: "the jeans at the hip" },
    { id: "skirt-blouse", label: "Skirt and blouse", state: "the skirt to the knee, the blouse on", rear: "the skirt to the knee" },
  ],
};

export const MALE_DRESS: Record<MaleBand, DressDef[]> = {
  boy: [
    { id: "shorts-shirt", label: "Shorts and shirt", state: "the shorts to the knee, the shirt on" },
    { id: "tshirt-shorts", label: "T-shirt and shorts", state: "the shorts to the knee, the t-shirt on" },
    { id: "school-uniform", label: "School uniform", state: "the shorts to the knee, the shirt tucked" },
    { id: "mundu-shirt", label: "Mundu and shirt", state: "the mundu to the ankle, the shirt on" },
    { id: "track-pants", label: "Track pants and tee", state: "the track pants to the ankle, the tee on" },
    { id: "kurta", label: "Kurta", state: "the kurta to the knee" },
  ],
  teenboy: [
    { id: "shirt-jeans", label: "Shirt and jeans", state: "the jeans at the hip, the shirt on" },
    { id: "tshirt-jeans", label: "T-shirt and jeans", state: "the jeans at the hip, the t-shirt on" },
    { id: "hoodie-jeans", label: "Hoodie and jeans", state: "the jeans at the hip, the hoodie on" },
    { id: "mundu-shirt", label: "Mundu and shirt", state: "the mundu to the ankle, the shirt on" },
    { id: "kurta", label: "Kurta", state: "the kurta to the knee" },
    { id: "track-pants", label: "Track pants and tee", state: "the track pants to the ankle, the tee on" },
    { id: "formal-shirt", label: "Formal shirt and trousers", state: "the trousers at the waist, the shirt on" },
  ],
  youngman: [
    { id: "shirt-jeans", label: "Shirt and jeans", state: "the jeans at the hip, the shirt on" },
    { id: "shirt-trousers", label: "Shirt and trousers", state: "the trousers at the waist, the shirt on" },
    { id: "tshirt-jeans", label: "T-shirt and jeans", state: "the jeans at the hip, the t-shirt on" },
    { id: "hoodie-jeans", label: "Hoodie and jeans", state: "the jeans at the hip, the hoodie on" },
    { id: "mundu-shirt", label: "Mundu and shirt", state: "the mundu to the ankle, the shirt on" },
    { id: "veshti-shirt", label: "Veshti and shirt", state: "the veshti to the ankle, the shirt on" },
    { id: "kurta-pyjama", label: "Kurta pyjama", state: "the kurta to the knee" },
    { id: "formal-shirt", label: "Formal shirt and trousers", state: "the trousers at the waist, the shirt on" },
  ],
  man: [
    { id: "shirt-mundu", label: "Shirt and mundu", state: "the mundu to the ankle, the shirt on" },
    { id: "shirt-trousers", label: "Shirt and trousers", state: "the trousers at the waist, the shirt on" },
    { id: "formal-shirt", label: "Formal shirt and trousers", state: "the trousers at the waist, the shirt on" },
    { id: "mundu-shirt", label: "Mundu and shirt", state: "the mundu to the ankle, the shirt on" },
    { id: "kurta", label: "Kurta", state: "the kurta to the knee" },
    { id: "kurta-pyjama", label: "Kurta pyjama", state: "the kurta to the knee" },
  ],
  midage: [
    { id: "shirt-mundu", label: "Shirt and mundu", state: "the mundu to the ankle, the shirt on" },
    { id: "shirt-trousers", label: "Shirt and trousers", state: "the trousers at the waist, the shirt on" },
    { id: "formal-shirt", label: "Formal shirt and trousers", state: "the trousers at the waist, the shirt on" },
    { id: "kurta", label: "Kurta", state: "the kurta to the knee" },
    { id: "veshti-shirt", label: "Veshti and shirt", state: "the veshti to the ankle, the shirt on" },
  ],
  old: [
    { id: "mundu-shirt", label: "Mundu and shirt", state: "the mundu to the ankle, the shirt on" },
    { id: "mundu-shawl", label: "Mundu, shirt and shawl", state: "the mundu to the ankle, a shawl over the shoulders" },
    { id: "veshti-shirt", label: "Veshti and shirt", state: "the veshti to the ankle, the shirt on" },
    { id: "kurta", label: "Kurta", state: "the kurta to the knee" },
    { id: "dhoti-shirt", label: "Dhoti and shirt", state: "the dhoti to the ankle, the shirt on" },
  ],
};

export const FEMALE_HAIR: Record<FemaleBand, DressDef[]> = {
  preteen: [
    { id: "two-plaits-ribbon", label: "Two tight plaits, ribbons", state: "her thick hair in two tight plaits with ribbons" },
    { id: "two-plaits-loose", label: "Two loose plaits", state: "her thick hair in two loose plaits" },
    { id: "single-plait", label: "Single plait", state: "her thick hair in one plait down her back" },
    { id: "single-plait-jasmine", label: "Plaît with jasmine", state: "her thick hair in one plait with jasmine wound into it" },
    { id: "high-ponytail", label: "High ponytail", state: "her thick hair in a high ponytail" },
    { id: "low-ponytail", label: "Low ponytail", state: "her thick hair in a low ponytail" },
    { id: "half-tied-clips", label: "Half tied, clips", state: "her thick hair half tied back with clips" },
    { id: "twin-buns", label: "Twin buns", state: "her thick hair in two buns" },
    { id: "braided-crown", label: "Braided crown", state: "her thick hair braided in a crown around her head" },
    { id: "side-braid", label: "Side braid", state: "her thick hair in a braid over one shoulder" },
    { id: "loose", label: "Loose", state: "her thick hair loose, past her shoulders" },
  ],
  teen: [
    { id: "single-plait", label: "Single thick plait", state: "her thick hair in one heavy plait down her back" },
    { id: "single-plait-jasmine", label: "Plaît with jasmine", state: "her thick hair in one heavy plait with jasmine wound into it" },
    { id: "two-plaits", label: "Two plaits", state: "her thick hair in two long plaits" },
    { id: "loose", label: "Loose", state: "her thick hair loose, past her waist" },
    { id: "loose-flowers", label: "Loose with flowers", state: "her thick hair loose with small flowers pinned through it" },
    { id: "half-tied", label: "Half tied", state: "her thick hair half tied back" },
    { id: "high-ponytail", label: "High ponytail", state: "her thick hair in a high ponytail" },
    { id: "low-ponytail", label: "Low ponytail", state: "her thick hair in a low ponytail over one shoulder" },
    { id: "low-bun", label: "Low bun", state: "her thick hair in a low bun" },
    { id: "crown-braid", label: "Crown braid", state: "her thick hair braided in a crown around her head" },
    { id: "side-braid", label: "Side braid", state: "her thick hair in a long braid over one shoulder" },
    { id: "pinned-half", label: "Pinned half up", state: "her thick hair pinned half up, the rest falling" },
  ],
  young: [
    { id: "loose", label: "Loose", state: "her thick hair loose, past her waist" },
    { id: "loose-jasmine", label: "Loose with jasmine", state: "her thick hair loose with jasmine strands through it" },
    { id: "low-bun-jasmine", label: "Low bun with jasmine", state: "her thick hair in a low bun with jasmine in it" },
    { id: "high-bun", label: "High bun", state: "her thick hair in a high bun, a few strands loose" },
    { id: "side-braid", label: "Side braid", state: "her thick hair in one loose braid over her shoulder" },
    { id: "half-up", label: "Half up", state: "her thick hair half pinned up, the rest loose" },
    { id: "half-up-clips", label: "Half up with clips", state: "her thick hair half pinned with clips, the rest falling past her waist" },
    { id: "single-plait", label: "Single plait", state: "her thick hair in one plait down her back" },
    { id: "low-ponytail", label: "Low ponytail", state: "her thick hair in a low ponytail" },
    { id: "over-one-shoulder", label: "Over one shoulder", state: "her thick hair drawn over one shoulder" },
    { id: "pinned-loosely", label: "Pinned up loosely", state: "her thick hair pinned up loosely, strands escaping" },
    { id: "braid-down-back", label: "Braid down the back", state: "her thick hair in a long braid down her back" },
  ],
  woman: [
    { id: "low-bun", label: "Low bun", state: "her thick hair in a low bun" },
    { id: "low-bun-jasmine", label: "Low bun with jasmine", state: "her thick hair in a low bun with jasmine in it" },
    { id: "loose", label: "Loose", state: "her thick hair loose, past her waist" },
    { id: "pinned", label: "Pinned up", state: "her thick hair pinned up off her neck" },
    { id: "braid", label: "Braid", state: "her thick hair in one braid down her back" },
    { id: "half-up", label: "Half up", state: "her thick hair half pinned up, the rest falling" },
    { id: "side-swept", label: "Side swept", state: "her thick hair swept over one shoulder" },
    { id: "single-plait", label: "Single plait", state: "her thick hair in one plait" },
    { id: "top-bun", label: "Top bun", state: "her thick hair in a loose bun on top, strands down" },
  ],
};

export const MALE_HAIR: Record<MaleBand, DressDef[]> = {
  boy: [
    { id: "short-crop", label: "Short crop", state: "his hair in a short crop" },
    { id: "side-part", label: "Short side part", state: "his hair short and side parted" },
    { id: "short-fringe", label: "Short with fringe", state: "his hair short with a fringe" },
    { id: "curly-short", label: "Short curly", state: "his hair short and curly" },
    { id: "shaved-sides", label: "Shaved sides, short top", state: "his hair shaved at the sides, short on top" },
  ],
  teenboy: [
    { id: "side-part", label: "Short side part", state: "his hair short and side parted" },
    { id: "textured", label: "Textured short", state: "his hair short and textured" },
    { id: "short-fringe", label: "Short with fringe", state: "his hair short with a fringe over the brow" },
    { id: "curly-short", label: "Short curly", state: "his hair short and curly" },
    { id: "fade", label: "Short fade", state: "his hair faded at the sides, short on top" },
    { id: "medium-top", label: "Short sides, medium top", state: "his hair short at the sides and longer on top" },
    { id: "slicked", label: "Slicked back", state: "his short hair slicked back" },
  ],
  youngman: [
    { id: "side-part", label: "Short side part", state: "his hair short and side parted" },
    { id: "short-back-sides", label: "Short back and sides", state: "his hair short at the back and sides" },
    { id: "medium-top", label: "Short sides, medium top", state: "his hair short at the sides and longer on top" },
    { id: "textured-crop", label: "Textured crop", state: "his hair in a short textured crop" },
    { id: "slicked", label: "Slicked back", state: "his short hair slicked back" },
    { id: "curly-short", label: "Short curly", state: "his hair short and curly" },
    { id: "short-fringe", label: "Short with fringe", state: "his hair short with a fringe" },
  ],
  man: [
    { id: "side-part", label: "Short side part", state: "his hair short and side parted" },
    { id: "short-back-sides", label: "Short back and sides", state: "his hair short at the back and sides" },
    { id: "receding", label: "Receding", state: "his hair thinning at the temples" },
    { id: "thinning-crown", label: "Thinning crown", state: "his hair thin at the crown" },
    { id: "salt-pepper", label: "Salt and pepper", state: "his short hair salt and pepper" },
  ],
  midage: [
    { id: "half-bald", label: "Half bald", state: "his hair receded to a half bald head" },
    { id: "half-bald-grey", label: "Half bald, greying", state: "his hair half bald, grey at the sides" },
    { id: "salt-pepper", label: "Salt and pepper", state: "his short hair salt and pepper" },
    { id: "receding-grey", label: "Receding, grey", state: "his hair receding and grey at the temples" },
    { id: "thin-all-over", label: "Thin all over", state: "his hair thin all over" },
  ],
  old: [
    { id: "full-grey", label: "Full grey", state: "his hair fully grey" },
    { id: "white", label: "White", state: "his hair white" },
    { id: "salt-pepper", label: "Salt and pepper", state: "his short hair salt and pepper" },
    { id: "thin-white", label: "Thin white", state: "his white hair thin and wispy" },
    { id: "bald-crown-grey", label: "Bald crown, grey sides", state: "his hair bald on the crown, grey at the sides" },
  ],
};

export function femaleDresses(age: number): DressDef[] {
  return FEMALE_DRESS[femaleBand(age)];
}

export function maleDresses(age: number): DressDef[] {
  return MALE_DRESS[maleBand(age)];
}

export function femaleHairStyles(age: number): DressDef[] {
  return FEMALE_HAIR[femaleBand(age)];
}

export function maleHairStyles(age: number): DressDef[] {
  return MALE_HAIR[maleBand(age)];
}

export function findDress(
  age: number,
  id: string,
  female: boolean,
): DressDef | undefined {
  const list = female ? femaleDresses(age) : maleDresses(age);
  return list.find((d) => d.id === id) ?? list[0];
}

export function findHair(
  age: number,
  id: string,
  female: boolean,
): DressDef | undefined {
  const list = female ? femaleHairStyles(age) : maleHairStyles(age);
  return list.find((d) => d.id === id) ?? list[0];
}