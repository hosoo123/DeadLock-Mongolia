import type { Metadata } from "next";
import { ProView, type MnPlayerRow, type ProBoard } from "@/components/pro-view";
import { REGIONS, getLeaderboard, getPlayerSummaries } from "@/lib/deadlock-api";
import { MONGOLIAN_PLAYERS } from "@/lib/mn-players";
import { listPublicProfiles } from "@/lib/profiles";
import { SITE_URL } from "@/lib/links";

// Valve refreshes the leaderboard hourly; so do we.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Deadlock top тоглогчид, Монгол leaderboard | Deadlock Mongolia",
  description:
    "Deadlock-ийн бүс тус бүрийн албан ёсны leaderboard болон Монгол тоглогчдын rank, win rate. Цаг тутам автоматаар шинэчлэгдэнэ.",
  alternates: { canonical: `${SITE_URL}/pro` },
};

export default async function ProPage() {
  // Mongolian players = manual list + everyone who opted in on /me (public + "I am Mongolian").
  const optedIn = await listPublicProfiles({ mongolianOnly: true });
  const withProfile = new Set(optedIn.map((profile) => profile.accountId));
  const ids = [...new Set([...MONGOLIAN_PLAYERS.map((player) => player.accountId), ...withProfile])];
  const [boards, players] = await Promise.all([
    Promise.all(REGIONS.map(async (region): Promise<ProBoard> => ({ region, entries: await getLeaderboard(region) }))),
    getPlayerSummaries(ids),
  ]);

  const mongolians: MnPlayerRow[] = players
    .map((player) => ({
      accountId: player.accountId,
      name: player.name,
      avatar: player.avatar,
      profileUrl: withProfile.has(player.accountId) ? `/players/${player.accountId}` : player.profileUrl,
      badge: player.badge,
      matches: player.matches,
      wins: player.wins,
      topHeroIds: player.topHeroes.map((hero) => hero.heroId),
    }))
    .sort((a, b) => (b.badge ?? 0) - (a.badge ?? 0) || b.matches - a.matches);

  return <ProView boards={boards} mongolians={mongolians} />;
}
