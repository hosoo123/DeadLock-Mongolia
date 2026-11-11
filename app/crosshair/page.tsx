import type { Metadata } from "next";
import { CrosshairBuilder, type CommunityCrosshair } from "@/components/crosshair-builder";
import { listPublicProfiles } from "@/lib/profiles";
import { SITE_URL } from "@/lib/links";

// Community crosshairs refresh every 5 minutes.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Deadlock crosshair builder, code (Монгол) | Deadlock Mongolia",
  description:
    "Deadlock-ийн crosshair-аа тохируулж, тоглоомд шууд оруулах share code аваарай. Бэлэн загварууд болон Монгол тоглогчдын crosshair.",
  alternates: { canonical: `${SITE_URL}/crosshair` },
};

export default async function CrosshairPage() {
  const profiles = await listPublicProfiles({ withCrosshair: true, limit: 48 });
  const community: CommunityCrosshair[] = profiles.map((profile) => ({
    id: `player-${profile.accountId}`,
    accountId: profile.accountId,
    isMongolian: profile.isMongolian,
    name: { mn: profile.displayName, en: profile.displayName },
    note: { mn: profile.note ?? "", en: profile.note ?? "" },
    code: profile.crosshairCode!,
    source: null,
  }));
  return <CrosshairBuilder community={community} />;
}
