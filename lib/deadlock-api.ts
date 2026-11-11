/*
  Server-side Deadlock API helpers (https://api.deadlock-api.com).

  Every call is cached by Next.js with `revalidate`, so pages regenerate in the
  background (ISR) and the site keeps working if the API is briefly down —
  each helper returns an empty result instead of throwing.

  Only import this from server components / route handlers: it pulls in the
  460KB item dump to map item ids to names.
*/
import itemsDump from "@/public/data/deadlock-items.json";
import { HIGH_MMR_BADGE } from "./heroes";
import { getItem, type Item } from "./items";
import { isOffensiveName } from "./name-filter";

const API = "https://api.deadlock-api.com/v1";
const DAY = 86400;

// Our item names that differ from the API's
const API_NAME_TO_OURS: Record<string, string> = { "Armor Piercer": "Armor Piercing Rounds" };

const itemById = new Map<number, Item>();
for (const raw of itemsDump as { id: number; name: string }[]) {
  const item = getItem(API_NAME_TO_OURS[raw.name] || raw.name);
  if (item) itemById.set(raw.id, item);
}
export function itemFromApiId(id: number) {
  return itemById.get(id);
}

async function get<T>(path: string, params: Record<string, string | number | boolean | number[] | undefined>, revalidate: number, fallback: T): Promise<T> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) value.forEach((entry) => query.append(key, String(entry)));
    else query.set(key, String(value));
  }
  try {
    const response = await fetch(`${API}${path}${query.size ? `?${query}` : ""}`, {
      headers: { accept: "application/json" },
      next: { revalidate },
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

/** Unix timestamp N days ago, rounded to the day so cache keys stay stable. */
function since(days: number) {
  const now = Math.floor(Date.now() / 1000 / DAY) * DAY;
  return now - days * DAY;
}

// ---------- Hero analytics (Phantom+ by default) ----------

export type HeroStatRow = { hero_id: number; wins: number; losses: number; matches: number };

export async function getHeroStats(minBadge = HIGH_MMR_BADGE, days = 21) {
  const rows = await get<HeroStatRow[]>(
    "/analytics/hero-stats",
    { min_average_badge: minBadge, min_unix_timestamp: since(days) },
    6 * 3600,
    [],
  );
  return new Map(rows.map((row) => [row.hero_id, row]));
}

type ItemStatRow = { item_id: number; wins: number; losses: number; matches: number; avg_buy_time_s?: number };

export type HeroItemStat = { item: Item; pick: number; wr: number; matches: number; buyMinute: number | null };

export async function getHeroItemStats(heroId: number, heroMatches: number, minBadge = HIGH_MMR_BADGE, days = 21) {
  const rows = await get<ItemStatRow[]>(
    "/analytics/item-stats",
    { hero_ids: heroId, min_average_badge: minBadge, min_unix_timestamp: since(days) },
    6 * 3600,
    [],
  );
  if (!heroMatches) return [];
  return rows
    .map((row) => {
      const item = itemFromApiId(row.item_id);
      if (!item || row.matches < 150) return null;
      return {
        item,
        pick: row.matches / heroMatches,
        wr: row.wins / row.matches,
        matches: row.matches,
        buyMinute: row.avg_buy_time_s ? Math.round(row.avg_buy_time_s / 60) : null,
      };
    })
    .filter(Boolean) as HeroItemStat[];
}

type CounterRow = { hero_id: number; enemy_hero_id: number; wins: number; matches_played: number };

export type Matchup = { heroId: number; wr: number; matches: number };

/** Win rate of `heroId` against every enemy hero (Phantom+). The API returns the full matrix once; Next caches it. */
export async function getMatchups(heroId: number, minBadge = HIGH_MMR_BADGE, days = 21): Promise<Matchup[]> {
  const rows = await get<CounterRow[]>(
    "/analytics/hero-counter-stats",
    { min_average_badge: minBadge, min_unix_timestamp: since(days) },
    6 * 3600,
    [],
  );
  return rows
    .filter((row) => row.hero_id === heroId && row.matches_played >= 300)
    .map((row) => ({ heroId: row.enemy_hero_id, wr: row.wins / row.matches_played, matches: row.matches_played }));
}

// ---------- In-game builds ----------

type RawBuild = {
  hero_build: {
    hero_id: number;
    hero_build_id: number;
    author_account_id: number;
    name: string;
    version: number;
    last_updated_timestamp?: number | null;
    details: { mod_categories: { name: string; mods?: { ability_id: number }[] | null }[] };
  };
  num_weekly_favorites?: number | null;
  num_favorites?: number | null;
};

export type PopularBuild = {
  id: number;
  name: string;
  weeklyFavorites: number;
  favorites: number;
  updated: number | null;
  categories: { name: string; items: Item[] }[];
};

export async function getPopularBuilds(heroId: number, limit = 3): Promise<PopularBuild[]> {
  const rows = await get<RawBuild[]>(
    "/builds",
    {
      hero_id: heroId,
      sort_by: "weekly_favorites",
      sort_direction: "desc",
      only_latest: true,
      limit: limit * 3,
    },
    12 * 3600,
    [],
  );
  return rows
    .map((row) => ({
      id: row.hero_build.hero_build_id,
      name: row.hero_build.name.trim().slice(0, 80),
      weeklyFavorites: row.num_weekly_favorites || 0,
      favorites: row.num_favorites || 0,
      updated: row.hero_build.last_updated_timestamp || null,
      categories: row.hero_build.details.mod_categories
        .map((category) => ({
          name: category.name.trim().slice(0, 40),
          items: (category.mods || []).map((mod) => itemFromApiId(mod.ability_id)).filter(Boolean) as Item[],
        }))
        .filter((category) => category.items.length),
    }))
    .filter((build) => build.categories.length)
    .slice(0, limit);
}

// ---------- Leaderboard & players ----------

export const REGIONS = ["Asia", "Europe", "NAmerica", "SAmerica", "Oceania"] as const;
export type Region = (typeof REGIONS)[number];

export type LeaderboardEntry = { position: number; name: string; hidden: boolean; heroIds: number[] };

export async function getLeaderboard(region: Region): Promise<LeaderboardEntry[]> {
  const data = await get<{ entries?: { account_name?: string | null; rank?: number | null; top_hero_ids?: number[] }[] }>(
    `/leaderboard/${region}`,
    {},
    3600,
    {},
  );
  return (data.entries || [])
    .map((entry, index) => {
      const name = (entry.account_name || "—").slice(0, 40);
      const hidden = isOffensiveName(name);
      return { position: entry.rank || index + 1, name: hidden ? "" : name, hidden, heroIds: entry.top_hero_ids || [] };
    })
    .slice(0, 50);
}

export type PlayerSummary = {
  accountId: number;
  name: string;
  avatar: string | null;
  profileUrl: string | null;
  badge: number | null;
  matches30d: number;
  topHeroes: { heroId: number; matches: number; wins: number }[];
  wins: number;
  matches: number;
};

type SteamRow = { account_id: number; personaname: string; avatarmedium?: string; profileurl?: string; matches_played_last_30d?: number };
type RankRow = { account_id: number; badge?: number | null };
type PlayerHeroRow = { account_id: number; hero_id: number; matches_played: number; wins: number };

/** Public profile + rank + recent hero stats for a list of account ids (max 1000). */
export async function getPlayerSummaries(accountIds: number[], days = 30): Promise<PlayerSummary[]> {
  if (!accountIds.length) return [];
  const [steam, ranks, heroes] = await Promise.all([
    get<SteamRow[]>("/players/steam", { account_ids: accountIds }, 3600, []),
    get<RankRow[]>("/players/rank", { account_ids: accountIds }, 3600, []),
    get<PlayerHeroRow[]>("/players/hero-stats", { account_ids: accountIds, min_unix_timestamp: since(days) }, 3600, []),
  ]);
  const steamById = new Map(steam.map((row) => [row.account_id, row]));
  const rankById = new Map(ranks.map((row) => [row.account_id, row.badge ?? null]));

  return accountIds.map((accountId) => {
    const profile = steamById.get(accountId);
    const mine = heroes.filter((row) => row.account_id === accountId);
    const matches = mine.reduce((sum, row) => sum + row.matches_played, 0);
    const wins = mine.reduce((sum, row) => sum + row.wins, 0);
    return {
      accountId,
      name: (() => {
        const raw = profile?.personaname?.slice(0, 40) || `#${accountId}`;
        return isOffensiveName(raw) ? `#${accountId}` : raw;
      })(),
      avatar: profile?.avatarmedium || null,
      profileUrl: profile?.profileurl?.startsWith("https://steamcommunity.com/") ? profile.profileurl : null,
      badge: rankById.get(accountId) ?? null,
      matches30d: profile?.matches_played_last_30d || matches,
      matches,
      wins,
      topHeroes: mine
        .sort((a, b) => b.matches_played - a.matches_played)
        .slice(0, 3)
        .map((row) => ({ heroId: row.hero_id, matches: row.matches_played, wins: row.wins })),
    };
  });
}
