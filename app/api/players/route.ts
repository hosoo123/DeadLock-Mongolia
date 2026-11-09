import { NextResponse } from "next/server";
import heroes from "@/public/data/deadlock-heroes.json";

export const runtime = "nodejs";

const API_BASE = "https://api.deadlock-api.com/v1";
const RANK_NAMES = [
  "Obscurus",
  "Initiate",
  "Seeker",
  "Alchemist",
  "Arcanist",
  "Ritualist",
  "Emissary",
  "Archon",
  "Oracle",
  "Phantom",
  "Ascendant",
  "Eternus",
];

type SteamProfile = {
  account_id: number;
  personaname: string;
  profileurl: string;
  avatarfull: string;
  countrycode: string | null;
  matches_played_last_30d: number;
  last_updated: string;
};

type MatchHistoryEntry = {
  hero_id: number;
  player_kills: number;
  player_deaths: number;
  player_assists: number;
  player_match_outcome: number;
  start_time: number;
};

type HeroAsset = {
  id: number;
  name: string;
  images?: { icon_hero_card?: string };
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function normalizeAccountId(value: string) {
  if (!/^\d{1,20}$/.test(value)) return null;

  try {
    let accountId = BigInt(value);
    const steamIdBase = BigInt("76561197960265728");

    if (accountId >= steamIdBase) accountId -= steamIdBase;
    if (accountId < BigInt(0) || accountId > BigInt(2147483647)) return null;

    return accountId.toString();
  } catch {
    return null;
  }
}

function parseSteamSearch(value: string) {
  const trimmed = value.trim();

  if (/^\d+$/.test(trimmed)) {
    return { accountId: normalizeAccountId(trimmed), query: trimmed };
  }

  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    const hostname = url.hostname.toLowerCase();

    if (hostname === "steamcommunity.com" || hostname === "www.steamcommunity.com") {
      const [, profileType, profileValue] = url.pathname.split("/");

      if (profileType === "profiles" && profileValue) {
        return {
          accountId: normalizeAccountId(profileValue),
          query: profileValue,
        };
      }

      if (profileType === "id" && profileValue) {
        const vanity = decodeURIComponent(profileValue);
        return { accountId: null, query: vanity, vanity };
      }
    }
  } catch {
    return { accountId: null, query: trimmed };
  }

  return { accountId: null, query: trimmed };
}

async function fetchApi<T>(path: string) {
  return fetch(`${API_BASE}${path}`, {
    cache: "force-cache",
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(12000),
  }).then(async (response) => ({
    response,
    data: response.ok ? ((await response.json()) as T) : null,
  }));
}

async function resolveSteamVanity(vanity: string, apiKey: string) {
  const params = new URLSearchParams({ key: apiKey, vanityurl: vanity });
  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?${params}`,
    {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!response.ok) {
    console.error("Steam vanity URL resolution failed", { status: response.status });
    throw new Error("Steam холбоосыг шалгаж чадсангүй.");
  }

  const result = (await response.json()) as {
    response?: { success?: number; steamid?: string };
  };
  const steamId64 = result.response?.steamid;
  return result.response?.success === 1 && steamId64
    ? normalizeAccountId(steamId64)
    : null;
}

async function getPlayerProfiles(accountId: string) {
  const { response, data } = await fetchApi<SteamProfile[]>(
    `/players/steam?account_ids=${accountId}`,
  );
  return { response, players: data ?? [] };
}

function getRecentStats(history: MatchHistoryEntry[]) {
  const recent = history
    .filter((match) => match.player_match_outcome === 1 || match.player_match_outcome === 2)
    .sort((a, b) => b.start_time - a.start_time)
    .slice(0, 100);

  if (!recent.length) return null;

  const heroAssets = heroes as HeroAsset[];
  const summarize = (matches: MatchHistoryEntry[]) => {
    if (!matches.length) return null;

    const wins = matches.filter((match) => match.player_match_outcome === 1).length;
    const totals = matches.reduce(
      (result, match) => ({
        kills: result.kills + match.player_kills,
        deaths: result.deaths + match.player_deaths,
        assists: result.assists + match.player_assists,
      }),
      { kills: 0, deaths: 0, assists: 0 },
    );
    const heroCounts = new Map<number, { matches: number; wins: number }>();

    for (const match of matches) {
      const current = heroCounts.get(match.hero_id) ?? { matches: 0, wins: 0 };
      heroCounts.set(match.hero_id, {
        matches: current.matches + 1,
        wins: current.wins + (match.player_match_outcome === 1 ? 1 : 0),
      });
    }

    const heroPerformance = [...heroCounts.entries()]
      .sort((a, b) => b[1].matches - a[1].matches)
      .slice(0, 3)
      .flatMap(([heroId, stats]) => {
        const hero = heroAssets.find((asset) => asset.id === heroId);
        return hero
          ? [
              {
                name: hero.name,
                image: hero.images?.icon_hero_card ?? null,
                matches: stats.matches,
                winRate: Math.round((stats.wins / stats.matches) * 100),
              },
            ]
          : [];
      });
    const mostPlayedHero = heroPerformance[0] ?? null;

    return {
      matches: matches.length,
      wins,
      losses: matches.length - wins,
      winRate: Math.round((wins / matches.length) * 100),
      averageKills: Number((totals.kills / matches.length).toFixed(1)),
      averageDeaths: Number((totals.deaths / matches.length).toFixed(1)),
      averageAssists: Number((totals.assists / matches.length).toFixed(1)),
      mostPlayedHero,
      heroPerformance,
    };
  };

  return {
    totalAvailable: recent.length,
    windows: [20, 50, 100].map((limit) => ({
      limit,
      ...summarize(recent.slice(0, limit)),
    })),
  };
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = params.get("q")?.trim();
  const accountIdValue = params.get("accountId")?.trim();

  if (query) {
    if (query.length < 2 || query.length > 100) {
      return jsonError("Хайлт 2–100 тэмдэгт байх ёстой.", 400);
    }

    try {
      const search = parseSteamSearch(query);
      if (search.accountId) {
        const { response, players } = await getPlayerProfiles(search.accountId);

        if (!response.ok) {
          return jsonError(
            response.status === 404
              ? "Тухайн Steam ID-аар тоглогч олдсонгүй."
              : "Steam профайлыг ачаалж чадсангүй.",
            response.status === 404 ? 404 : 502,
          );
        }

        return NextResponse.json({ players });
      }

      let searchQuery = search.query;
      if (search.vanity && process.env.STEAM_API_KEY) {
        const resolvedAccountId = await resolveSteamVanity(
          search.vanity,
          process.env.STEAM_API_KEY,
        );
        if (resolvedAccountId) searchQuery = resolvedAccountId;
      }

      const upstreamParams = new URLSearchParams({
        search_query: searchQuery,
        limit: "8",
        min_matches_played_last_30d: "0",
      });
      const { response, data } = await fetchApi<SteamProfile[]>(
        `/players/steam-search?${upstreamParams.toString()}`,
      );

      if (!response.ok) {
        if (response.status === 404 && search.vanity && !process.env.STEAM_API_KEY) {
          return NextResponse.json({
            players: [],
            hint:
              "Custom Steam холбоосыг танихгүй байна. STEAM_API_KEY тохируулах эсвэл SteamID64-аа ашиглана уу.",
          });
        }
        console.error("Deadlock player search failed", { status: response.status });
        return jsonError(
          response.status === 404
            ? "Тохирох Steam профайл олдсонгүй."
            : "Тоглогчийн хайлтын үйлчилгээ түр ажиллахгүй байна.",
          response.status === 404 ? 404 : 502,
        );
      }

      return NextResponse.json({ players: data ?? [] });
    } catch (error) {
      console.error("Deadlock player search request failed", error);
      return jsonError(
        error instanceof Error
          ? error.message
          : "Тоглогч хайхад алдаа гарлаа. Дахин оролдоно уу.",
        502,
      );
    }
  }

  const accountId = accountIdValue ? normalizeAccountId(accountIdValue) : null;
  if (!accountId) return jsonError("Steam ID эсвэл тоглогчийн нэр оруулна уу.", 400);

  try {
    const [profileResult, rankResult, historyResult] = await Promise.all([
      fetchApi<SteamProfile[]>(`/players/steam?account_ids=${accountId}`),
      fetchApi<{ badge: number; rank: number; subrank: number }>(
        `/players/${accountId}/rank`,
      ),
      fetchApi<MatchHistoryEntry[]>(`/players/${accountId}/match-history`),
    ]);

    if (!profileResult.response.ok || !profileResult.data?.[0]) {
      console.error("Deadlock player profile lookup failed", {
        status: profileResult.response.status,
      });
      return jsonError(
        profileResult.response.status === 404
          ? "Steam профайлын мэдээлэл олдсонгүй."
          : "Steam профайлыг ачаалж чадсангүй.",
        profileResult.response.status === 404 ? 404 : 502,
      );
    }

    const rank = rankResult.response.ok ? rankResult.data : null;
    const history = historyResult.response.ok ? historyResult.data ?? [] : null;
    const rankName =
      rank && rank.rank > 0 ? RANK_NAMES[rank.rank] ?? `Rank ${rank.rank}` : null;

    return NextResponse.json({
      player: profileResult.data[0],
      rank:
        rank && rankName
          ? { name: rankName, subrank: rank.subrank, badge: rank.badge }
          : null,
      rankUnavailable: rankResult.response.ok
        ? null
        : "Rank мэдээлэл одоогоор олдсонгүй.",
      recentStats: history ? getRecentStats(history) : null,
      statsUnavailable: historyResult.response.ok
        ? null
        : "Match history мэдээлэл одоогоор олдсонгүй.",
    });
  } catch (error) {
    console.error("Deadlock player profile request failed", error);
    return jsonError("Тоглогчийн мэдээллийг ачаалж чадсангүй. Дахин оролдоно уу.", 502);
  }
}
