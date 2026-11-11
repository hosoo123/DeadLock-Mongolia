import heroesData from "@/public/data/deadlock-heroes.json";
import { slugify } from "./items";

export type Hero = { id: number; name: string; slug: string; image: string };

export const HEROES: Hero[] = (heroesData as { id: number; name: string; player_selectable?: boolean }[])
  .filter((hero) => hero.player_selectable !== false)
  .map((hero) => ({
    id: hero.id,
    name: hero.name,
    slug: slugify(hero.name),
    image: `/heroes/${encodeURIComponent(hero.name)}.webp`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const byId = new Map(HEROES.map((hero) => [hero.id, hero]));
const bySlug = new Map(HEROES.map((hero) => [hero.slug, hero]));
const byName = new Map(HEROES.map((hero) => [hero.name, hero]));

export function getHero(key: number | string) {
  if (typeof key === "number") return byId.get(key);
  return bySlug.get(key) || byName.get(key);
}

/** Rank tiers as the game names them (badge = tier * 10 + subtier). */
export const RANKS = [
  { name: "Obscurus", color: "#8a8a8a" },
  { name: "Initiate", color: "#b07a4f" },
  { name: "Seeker", color: "#c4558f" },
  { name: "Acolyte", color: "#7f8fd1" },
  { name: "Sentinel", color: "#8fc265" },
  { name: "Mystic", color: "#e3b13d" },
  { name: "Ritualist", color: "#f06b72" },
  { name: "Emissary", color: "#c39bf0" },
  { name: "Oracle", color: "#c07a5c" },
  { name: "Phantom", color: "#b5b5b5" },
  { name: "Ascendant", color: "#d6ad63" },
  { name: "Eternus", color: "#5ce9a9" },
];

export function rankLabel(badge?: number | null) {
  if (!badge || badge < 10) return null;
  const tier = Math.floor(badge / 10);
  const sub = badge % 10;
  const rank = RANKS[tier];
  return rank ? { name: `${rank.name} ${sub}`, color: rank.color, tier, sub } : null;
}

/** "High MMR" across the site = Phantom and above. */
export const HIGH_MMR_BADGE = 91;
export const HIGH_MMR_LABEL = "Phantom+";
