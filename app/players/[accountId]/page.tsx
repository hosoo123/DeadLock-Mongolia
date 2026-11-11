import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlayerProfileView } from "@/components/player-profile-view";
import { getPublicProfile } from "@/lib/profiles";
import { getPlayerSummaries } from "@/lib/deadlock-api";
import { SITE_URL } from "@/lib/links";

// Profiles change whenever a player saves; re-render at most every 5 minutes.
export const revalidate = 300;

type Params = { accountId: string };

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 && id < 2 ** 31 ? id : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { accountId } = await params;
  const id = parseId(accountId);
  const profile = id ? await getPublicProfile(id) : null;
  if (!profile) return { robots: { index: false } };
  const title = `${profile.displayName} — Deadlock crosshair, тохиргоо`;
  return {
    title,
    description: `${profile.displayName}-ийн Deadlock crosshair code, sensitivity, DPI болон rank.`,
    alternates: { canonical: `${SITE_URL}/players/${profile.accountId}` },
    openGraph: { title, images: profile.avatarUrl ? [profile.avatarUrl] : undefined },
  };
}

export default async function PlayerPage({ params }: { params: Promise<Params> }) {
  const { accountId } = await params;
  const id = parseId(accountId);
  if (!id) notFound();
  const profile = await getPublicProfile(id);
  if (!profile) notFound();
  const [summary] = await getPlayerSummaries([id]);
  return (
    <PlayerProfileView
      profile={profile}
      stats={summary ? { badge: summary.badge, matches: summary.matches, wins: summary.wins, topHeroes: summary.topHeroes } : null}
    />
  );
}
