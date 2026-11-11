import type { Metadata } from "next";
import { MeView } from "@/components/me-view";
import { getSession } from "@/lib/session";
import { getProfile } from "@/lib/profiles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Миний профайл | Deadlock Mongolia",
  robots: { index: false },
};

export default async function MePage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const session = await getSession();
  const profile = session ? await getProfile(session.accountId).catch(() => null) : null;
  return <MeView profile={profile} error={error ?? null} />;
}
