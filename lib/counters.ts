/*
  COUNTER HELPER DATA

  Hero бүрийг тоглоомд хамгийн их мэдрэгддэг "аюул"-аар нь тэмдэглэнэ
  (heal их, CC их, gun carry …). Аюул бүрт эсрэг нь авах item-ууд байна.
  Энэ нь ерөнхий хандлага — hero-гийн build тоглолт бүрт өөр байж болно.

  Шинэ hero нэмэгдвэл HERO_THREATS-д нэмнэ. Item-ийн нэр lib/item-shops.ts-тэй
  яг таарах ёстой.
*/

export type Threat = "heal" | "gun" | "spirit" | "cc" | "mobility" | "tank" | "dive";
export type PlayStyle = "gun" | "spirit";

type Bilingual = { mn: string; en: string };

export const THREATS: Record<Threat, { label: Bilingual; why: Bilingual }> = {
  heal: {
    label: { mn: "Heal / lifesteal их", en: "Lots of healing" },
    why: {
      mn: "Тэд damage-аа хурдан нөхдөг тул anti-heal-гүй бол хэзээ ч унахгүй.",
      en: "They recover damage quickly — without anti-heal they never go down.",
    },
  },
  gun: {
    label: { mn: "Буугаар их damage", en: "Heavy gun damage" },
    why: {
      mn: "Тэдний гол damage сумнаас ирдэг — bullet resist болон disarm хамгийн үр дүнтэй.",
      en: "Most of their damage comes from bullets — bullet resist and disarms work best.",
    },
  },
  spirit: {
    label: { mn: "Чадвараар burst хийдэг", en: "Spirit burst" },
    why: {
      mn: "Чадваруудаараа нэг дор их damage өгдөг — spirit resist эсвэл silence хэрэгтэй.",
      en: "They nuke you with abilities — you need spirit resist or a silence.",
    },
  },
  cc: {
    label: { mn: "Stun / CC их", en: "Lots of crowd control" },
    why: {
      mn: "Stun, slow, hook-ээр барьж алдаг — CC-ийн хугацааг богиносгох эсвэл хаах item ав.",
      en: "They lock you down with stuns, slows and hooks — shorten or block that CC.",
    },
  },
  mobility: {
    label: { mn: "Хурдан, зугтдаг", en: "Slippery and mobile" },
    why: {
      mn: "Dash, нислэг, teleport-оор зугтдаг — slow болон хөдөлгөөн хаадаг item-ээр барь.",
      en: "They escape with dashes, flight or teleports — catch them with slows and movement locks.",
    },
  },
  tank: {
    label: { mn: "HP их, tanky", en: "Tanky frontline" },
    why: {
      mn: "HP болон resist их — хувиар damage өгдөг эсвэл resist нэвтэлдэг item хэрэгтэй.",
      en: "Huge HP and resists — use percentage damage or resist-piercing items.",
    },
  },
  dive: {
    label: { mn: "Ойроос дайрдаг (dive)", en: "Dives onto you" },
    why: {
      mn: "Чам руу шууд үсэрч орж ирдэг — зай гаргах, удаашруулах, зугтах item ав.",
      en: "They jump straight onto you — buy items to peel, slow or escape.",
    },
  },
};

type CounterItem = { name: string; style?: PlayStyle; why: Bilingual };

export const COUNTER_ITEMS: Record<Threat, CounterItem[]> = {
  heal: [
    { name: "Toxic Bullets", style: "gun", why: { mn: "Сумаараа heal-ийг нь бууруулж, max HP-ийн хувиар damage өгнө.", en: "Cuts their healing with bullets and deals % max HP damage." } },
    { name: "Healbane", style: "spirit", why: { mn: "Чадвараараа heal-ийг нь бууруулна. Хямд, эрт авч болно.", en: "Cuts healing with your abilities. Cheap and early." } },
    { name: "Decay", style: "spirit", why: { mn: "Heal-ийг нь ихээр бууруулж, HP-ийн хувиар damage өгнө.", en: "Heavily reduces healing and deals % HP damage." } },
    { name: "Inhibitor", style: "gun", why: { mn: "Damage болон heal-ийг нь хоёуланг нь сулруулна.", en: "Weakens both their damage and their healing." } },
    { name: "Crippling Headshot", style: "gun", why: { mn: "Headshot-оор heal-ийг нь бууруулж, resist-ийг нь хасна.", en: "Headshots cut their healing and shred resists." } },
    { name: "Spirit Burn", style: "spirit", why: { mn: "Burst-ийн дараа шатааж, heal-ийг нь 70% бууруулна.", en: "Burns them after a burst and cuts healing hard." } },
  ],
  gun: [
    { name: "Bullet Resilience", why: { mn: "Их bullet resist, HP багатай үед бүр нэмэгдэнэ.", en: "Big bullet resist, even more at low HP." } },
    { name: "Metal Skin", why: { mn: "Хэдэн секунд сумнаас бүрэн хамгаалагдана.", en: "Become immune to bullets for a few seconds." } },
    { name: "Weapon Shielding", why: { mn: "Буугаар burst авахад автоматаар barrier өгнө.", en: "Auto barrier when you take a burst of gun damage." } },
    { name: "Disarming Hex", style: "spirit", why: { mn: "Gun carry-г хэдэн секунд буудуулахгүй.", en: "Stops their gun carry from shooting for a few seconds." } },
    { name: "Rusted Barrel", why: { mn: "Хямд: fire rate болон bullet resist-ийг нь бууруулна.", en: "Cheap: lowers their fire rate and bullet resist." } },
    { name: "Juggernaut", why: { mn: "Чамайг буудсан хүмүүсийн fire rate буурна.", en: "Anyone shooting you has their fire rate slowed." } },
    { name: "Plated Armor", why: { mn: "Сумыг хазайлгаж, on-hit эффектүүдийг хаана.", en: "Deflects bullets and blocks on-hit effects." } },
  ],
  spirit: [
    { name: "Spirit Resilience", why: { mn: "Их spirit resist, HP багатай үед бүр нэмэгдэнэ.", en: "Big spirit resist, even more at low HP." } },
    { name: "Spirit Shielding", why: { mn: "Spirit burst авахад автоматаар barrier өгнө.", en: "Auto barrier when you take a spirit burst." } },
    { name: "Spellbreaker", why: { mn: "Дараагийн том spirit цохилтыг ихээр багасгана.", en: "Massively reduces the next big spirit hit." } },
    { name: "Counterspell", why: { mn: "Parry-гаар дайсны чадварыг бүрэн хаана.", en: "Parry to block an enemy ability entirely." } },
    { name: "Silencer", style: "gun", why: { mn: "Сумаараа silence хийж, spirit damage-ийг нь бууруулна.", en: "Silence them with bullets and cut their spirit damage." } },
    { name: "Spirit Sap", style: "spirit", why: { mn: "Spirit power болон resist-ийг нь бууруулна.", en: "Lowers their spirit power and resist." } },
    { name: "Ethereal Shift", why: { mn: "Тэдний combo ирэхэд түр invulnerable бол.", en: "Go invulnerable as their combo lands." } },
  ],
  cc: [
    { name: "Debuff Reducer", why: { mn: "Бүх stun, slow богино хугацаатай болно. Хямд.", en: "Shortens every stun and slow. Cheap." } },
    { name: "Reactive Barrier", why: { mn: "CC авах мөчид автоматаар barrier өгнө.", en: "Auto barrier the moment you get CC'd." } },
    { name: "Indomitable", why: { mn: "Дараагийн stun-ийг автоматаар арилгана.", en: "Automatically cleanses the next stun." } },
    { name: "Unstoppable", why: { mn: "Хэдэн секунд ямар ч CC-д өртөхгүй.", en: "Immune to all CC for a few seconds." } },
    { name: "Dispel Magic", why: { mn: "Slow, debuff-ээ шууд цэвэрлэнэ.", en: "Instantly cleanses slows and debuffs." } },
    { name: "Divine Barrier", why: { mn: "Найзаа CC-ээс цэвэрлээд barrier өгнө (support).", en: "Cleanse and shield an ally (support)." } },
  ],
  mobility: [
    { name: "Slowing Hex", style: "spirit", why: { mn: "Хурдыг нь бууруулж, хөдөлгөөний чадварыг нь хаана.", en: "Slows them and locks movement abilities." } },
    { name: "Capacitor", style: "gun", why: { mn: "Хүчтэй slow, stamina болон dash-ийг нь хаана.", en: "Strong slow that blocks stamina and dashes." } },
    { name: "Slowing Bullets", style: "gun", why: { mn: "Сумаараа удаашруулна. Хямд.", en: "Slows with every bullet. Cheap." } },
    { name: "Mystic Slow", style: "spirit", why: { mn: "Чадвараараа удаашруулж, dash-ийг нь богиносгоно.", en: "Your abilities slow and shorten their dashes." } },
    { name: "Knockdown", why: { mn: "Агаарт байгаа дайсныг удаан stun хийнэ.", en: "Long stun on airborne enemies." } },
    { name: "Phantom Strike", why: { mn: "Тэдэн рүү teleport хийж газар руу татаж буулгана.", en: "Teleport to them and slam them down." } },
  ],
  tank: [
    { name: "Toxic Bullets", style: "gun", why: { mn: "Max HP-ийн хувиар damage — HP их байх тусам хүчтэй.", en: "% max HP damage — stronger the bigger they are." } },
    { name: "Armor Piercing Rounds", style: "gun", why: { mn: "Bullet resist-ийг нь огт тоохгүй.", en: "Ignores their bullet resist." } },
    { name: "Siphon Bullets", style: "gun", why: { mn: "Max HP-г нь хулгайлж өөртөө нэмнэ.", en: "Steals their max HP for yourself." } },
    { name: "Tankbuster", style: "spirit", why: { mn: "Одоогийн HP-ийн хувиар, spirit resist-гүй damage.", en: "% current HP damage that ignores spirit resist." } },
    { name: "Escalating Exposure", style: "spirit", why: { mn: "Удаан fight-д таны spirit damage улам өснө.", en: "Your spirit damage keeps ramping in long fights." } },
    { name: "Decay", style: "spirit", why: { mn: "HP-ийн хувиар damage, heal-ийг нь бас бууруулна.", en: "% HP damage plus healing reduction." } },
  ],
  dive: [
    { name: "Cold Front", why: { mn: "Ойртож ирсэн дайснуудыг удаашруулж зай гарга.", en: "Slow divers and create space." } },
    { name: "Warp Stone", why: { mn: "Шууд teleport хийж зугт.", en: "Teleport away instantly." } },
    { name: "Majestic Leap", why: { mn: "Агаарт үсэрч barrier авна.", en: "Leap away with a barrier." } },
    { name: "Rebuttal", why: { mn: "Melee-г нь parry хийж буцааж өг.", en: "Parry their melee and return the damage." } },
    { name: "Point Blank", style: "gun", why: { mn: "Ойртож ирсэн дайсанд их damage өгч удаашруулна.", en: "Punish divers up close and slow them." } },
    { name: "Arctic Blast", why: { mn: "Ойрын дайснуудыг хөлдөөнө.", en: "Freeze everyone who jumps on you." } },
  ],
};

/** Hero → main threats. Ordered by how strongly the hero shows that threat. */
export const HERO_THREATS: Record<string, Threat[]> = {
  Abrams: ["tank", "heal", "dive", "cc"],
  Apollo: ["dive", "mobility"],
  Bebop: ["cc", "spirit"],
  Billy: ["dive", "tank"],
  Calico: ["dive", "mobility"],
  Celeste: ["spirit", "mobility"],
  "Deadman Danny": ["gun"],
  Drifter: ["dive", "mobility"],
  Dynamo: ["cc", "heal"],
  Graves: ["spirit"],
  "Grey Talon": ["gun", "cc"],
  Haze: ["gun", "mobility"],
  Holliday: ["gun", "cc"],
  Infernus: ["spirit", "heal", "mobility"],
  Ivy: ["heal", "cc", "mobility"],
  Kelvin: ["cc", "heal"],
  "Lady Geist": ["spirit", "heal"],
  Lash: ["cc", "dive", "mobility"],
  McGinnis: ["heal", "cc", "gun"],
  Mina: ["spirit"],
  Mirage: ["spirit", "mobility"],
  "Mo & Krill": ["tank", "cc", "dive", "heal"],
  "Nurse Harrow": ["heal", "cc"],
  Paige: ["heal", "spirit"],
  Paradox: ["cc", "spirit"],
  Pocket: ["spirit", "mobility"],
  "Rat King": ["dive", "mobility"],
  Rem: ["heal", "spirit"],
  Seven: ["spirit", "cc"],
  Shiv: ["dive", "heal", "mobility"],
  Silver: ["dive", "tank", "heal"],
  Sinclair: ["spirit", "cc"],
  Solomon: ["tank"],
  "The Doorman": ["cc", "tank"],
  Venator: ["gun"],
  Victor: ["gun"],
  Vindicta: ["gun", "mobility"],
  Viscous: ["tank", "cc"],
  Vyper: ["gun", "cc", "mobility"],
  Warden: ["tank", "cc", "gun"],
  Wraith: ["gun", "cc"],
  Yamato: ["dive", "mobility"],
};

export type CounterResult = {
  threats: { threat: Threat; heroes: string[]; weight: number; items: CounterItem[] }[];
  top: { name: string; weight: number; threats: Threat[]; why: Bilingual }[];
};

/**
 * Rank threats across the enemy team and pick counter items.
 * A hero's first threat counts more than its later ones.
 */
export function computeCounters(enemies: string[], style: PlayStyle | "any"): CounterResult {
  const threatWeight = new Map<Threat, { weight: number; heroes: string[] }>();
  for (const hero of enemies) {
    (HERO_THREATS[hero] || []).forEach((threat, index) => {
      const entry = threatWeight.get(threat) || { weight: 0, heroes: [] };
      entry.weight += index === 0 ? 1.5 : index === 1 ? 1 : 0.6;
      entry.heroes.push(hero);
      threatWeight.set(threat, entry);
    });
  }

  const fits = (item: CounterItem) => style === "any" || !item.style || item.style === style;

  const threats = [...threatWeight.entries()]
    .sort((a, b) => b[1].weight - a[1].weight)
    .map(([threat, { weight, heroes }]) => ({
      threat,
      heroes,
      weight,
      items: COUNTER_ITEMS[threat].filter(fits).slice(0, 4),
    }));

  const itemScore = new Map<string, { weight: number; threats: Threat[]; why: Bilingual }>();
  for (const { threat, weight, items } of threats) {
    items.forEach((item, index) => {
      const entry = itemScore.get(item.name) || { weight: 0, threats: [], why: item.why };
      entry.weight += weight * (1 - index * 0.15);
      entry.threats.push(threat);
      itemScore.set(item.name, entry);
    });
  }
  const top = [...itemScore.entries()]
    .sort((a, b) => b[1].weight - a[1].weight)
    .slice(0, 6)
    .map(([name, value]) => ({ name, ...value }));

  return { threats, top };
}
