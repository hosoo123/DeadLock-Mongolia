import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getProfile } from "@/lib/profiles";

export const dynamic = "force-dynamic";

// Lightweight "who am I" for the header.
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ loggedIn: false });
  const profile = await getProfile(session.accountId).catch(() => null);
  return NextResponse.json({
    loggedIn: true,
    accountId: session.accountId,
    name: profile?.displayName ?? `#${session.accountId}`,
    avatar: profile?.avatarUrl ?? null,
  });
}
