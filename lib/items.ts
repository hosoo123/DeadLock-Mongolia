/*
  Item өгөгдлийн нэг эх сурвалж.

  - lib/item-shops.ts        дэлгүүр, tier, item-ийн нэр
  - lib/item-copy.ts         хүний гараар бичсэн MN/EN тайлбар + төрөл
  - lib/data/item-stats.json shop tooltip-ийн stat-ууд   (scripts/build-item-stats.mjs)
  - lib/data/item-heroes.json аль hero хамгийн их авдаг (scripts/build-item-heroes.mjs)

  Item хуудас, каталог, counter helper бүгд эндээс уншина.
*/
import { ITEM_COPY, type ItemCopy, type ItemType } from "./item-copy";
import { SHOPS, type Shop, type ShopKey } from "./item-shops";
import itemStats from "./data/item-stats.json";
import itemHeroes from "./data/item-heroes.json";

export type { ShopKey, ItemType };

export type ItemStat = { label: string; value: string; cls: string };
export type ItemHero = { hero: string; pick: number; wr: number; matches: number };

export type Item = {
  name: string;
  slug: string;
  shop: ShopKey;
  tier: 1 | 2 | 3 | 4;
  price: string;
  type: ItemType;
  image: string;
  remoteImg?: string;
  copy: ItemCopy;
  stats: ItemStat[];
  heroes: ItemHero[];
};

// Манай нэр → API нэр (stat, hero дата API нэрээр хадгалагдсан)
const API_ALIASES: Record<string, string> = {
  "Armor Piercing Rounds": "Armor Piercer",
};

// Component → шууд upgrade. Нэг item олон салаа upgrade-тай байж болно.
export const ITEM_UPGRADES: Record<string, string[]> = {
  "Close Quarters": ["Point Blank"],
  "Extended Magazine": ["Titanic Magazine"],
  "Headshot Booster": ["Headhunter"],
  "Rapid Rounds": ["Swift Striker"],
  "Long Range": ["Sharpshooter"],
  "Spirit Shredder": ["Spirit Rend"],
  "Split Shot": ["Ricochet"],
  Headhunter: ["Crippling Headshot"],
  Grit: ["Weapon Shielding", "Spirit Shielding", "Reactive Barrier", "Guardian Ward"],
  "Extra Health": ["Fortitude"],
  "Extra Stamina": ["Stamina Mastery"],
  "Sprint Boots": ["Enduring Speed"],
  "Melee Lifesteal": ["Lifestrike"],
  "Bullet Lifesteal": ["Fury Trance"],
  "Enchanter's Emblem": ["Spirit Resilience"],
  "Battle Vest": ["Bullet Resilience"],
  "Healing Rite": ["Healing Nova"],
  "Extra Charge": ["Rapid Recharge"],
  "Extra Spirit": ["Improved Spirit"],
  "Improved Spirit": ["Boundless Spirit"],
  "Mystic Expansion": ["Greater Expansion"],
  "Mystic Regeneration": ["Radiant Regeneration"],
  "Cold Front": ["Arctic Blast"],
  "Compress Cooldown": ["Superior Cooldown"],
  "Superior Cooldown": ["Transcendent Cooldown"],
  "Duration Extender": ["Superior Duration"],
  "Mystic Vulnerability": ["Escalating Exposure"],
  Suppressor: ["Silence Wave"],
  "Slowing Hex": ["Vortex Web"],
};

export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const statsByName = itemStats as Record<string, ItemStat[]>;
const heroesByName = (itemHeroes as { items: Record<string, ItemHero[]> }).items;

export const ITEM_HEROES_META = {
  generatedAt: (itemHeroes as { generatedAt: string }).generatedAt,
  windowDays: (itemHeroes as { windowDays: number }).windowDays,
};

export const ITEMS: Item[] = SHOPS.flatMap((shop) =>
  shop.items.map((base) => {
    const copy = ITEM_COPY[base.name];
    if (!copy) throw new Error(`Missing item copy for ${base.name}`);
    const apiName = API_ALIASES[base.name] || base.name;
    return {
      name: base.name,
      slug: slugify(base.name),
      shop: shop.key,
      tier: base.tier,
      price: shop.tierPrices[base.tier],
      type: copy.type,
      image: `/items/${encodeURIComponent(base.name)}.png`,
      remoteImg: base.remoteImg,
      copy,
      stats: statsByName[base.name] || statsByName[apiName] || [],
      heroes: heroesByName[apiName] || heroesByName[base.name] || [],
    };
  }),
);

const bySlug = new Map(ITEMS.map((item) => [item.slug, item]));
const byName = new Map(ITEMS.map((item) => [item.name, item]));

export function getItem(slugOrName: string) {
  return bySlug.get(slugOrName) || byName.get(slugOrName);
}

export function getShop(key: ShopKey): Shop {
  return SHOPS.find((shop) => shop.key === key)!;
}

export function getUpgrades(name: string) {
  const into = (ITEM_UPGRADES[name] || []).map((n) => byName.get(n)).filter(Boolean) as Item[];
  const from = Object.entries(ITEM_UPGRADES)
    .filter(([, next]) => next.includes(name))
    .map(([n]) => byName.get(n))
    .filter(Boolean) as Item[];
  return { from, into };
}

/** Same shop & tier, excluding the item itself — for "related items". */
export function getRelated(item: Item, limit = 6) {
  return ITEMS.filter((other) => other.shop === item.shop && other.tier === item.tier && other.slug !== item.slug).slice(0, limit);
}

export { SHOPS };

export const SHOP_COPY: Record<ShopKey, { mn: string; en: string; slot: string }> = {
  fairfax: { mn: "Weapon item", en: "Weapon item", slot: "weapon" },
  mps: { mn: "Vitality item", en: "Vitality item", slot: "vitality" },
  cc: { mn: "Spirit item", en: "Spirit item", slot: "spirit" },
};

export const WHEN_TO_BUY: Record<1 | 2 | 3 | 4, { mn: string; en: string }> = {
  1: {
    mn: "Lane-ийн эхэнд. Хямд тул эрт аваад хурдан хүч ав.",
    en: "Early in lane — it's cheap, so grab it for a quick power boost.",
  },
  2: {
    mn: "Lane дуусах үе буюу эхний 10 минут орчимд.",
    en: "Around the end of laning, roughly the first 10 minutes.",
  },
  3: {
    mn: "Дунд үед, teamfight эхлэх үед гол item болгож ав.",
    en: "Mid game, as a core item once teamfights start.",
  },
  4: {
    mn: "Сүүлд, үндсэн item-уудаа бүрдүүлсний дараа.",
    en: "Late, after your core items are done.",
  },
};

export const TYPE_COPY: Record<ItemType, { mn: string; en: string }> = {
  active: { mn: "Active · товч дарна", en: "Active · press to use" },
  passive: { mn: "Passive · өөрөө ажиллана", en: "Passive · always on" },
  imbue: { mn: "Imbue · чадварт холбоно", en: "Imbue · attach to an ability" },
};

export function heroPortrait(name: string) {
  return `/heroes/${encodeURIComponent(name)}.webp`;
}
