import { NextResponse, type NextRequest } from "next/server";
import { accountIdFromSteamId64, verifySteamCallback } from "@/lib/steam-openid";
import { SESSION_COOKIE, encodeSession, hasSessionSecret, sessionCookieOptions } from "@/lib/session";
import { hasDatabase } from "@/lib/db";
import { upsertLogin } from "@/lib/profiles";

type SteamRow = { personaname?: string; avatarmedium?: string };

async function steamProfile(accountId: number): Promise<SteamRow | null> {
  try {
    const response = await fetch(`https://api.deadlock-api.com/v1/players/steam?account_ids=${accountId}`, {
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) return null;
    const rows = (await response.json()) as SteamRow[];
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const fail = (reason: string) => NextResponse.redirect(`${origin}/me?error=${reason}`);

  if (!hasSessionSecret() || !hasDatabase()) return fail("setup");

  const steamId64 = await verifySteamCallback(request.nextUrl.searchParams, origin);
  if (!steamId64) return fail("steam");

  const accountId = accountIdFromSteamId64(steamId64);
  const profile = await steamProfile(accountId);
  const avatar = profile?.avatarmedium?.startsWith("https://") ? profile.avatarmedium : null;

  try {
    await upsertLogin(accountId, steamId64, profile?.personaname || `#${accountId}`, avatar);
  } catch {
    return fail("db");
  }

  const response = NextResponse.redirect(`${origin}/me`);
  response.cookies.set(SESSION_COOKIE, encodeSession(accountId, steamId64), sessionCookieOptions);
  return response;
}
