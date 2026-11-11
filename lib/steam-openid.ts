/*
  "Sign in through Steam" (OpenID 2.0).

  Steam returns only the user's SteamID64 — no password, email or game
  settings ever reach us. We verify the response by asking Steam directly
  (check_authentication), so a forged callback URL can't log anyone in.
*/
const STEAM_OPENID = "https://steamcommunity.com/openid/login";
const STEAM_ID64_BASE = BigInt("76561197960265728");

export function steamLoginUrl(origin: string) {
  const params = new URLSearchParams({
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.mode": "checkid_setup",
    "openid.return_to": `${origin}/api/auth/steam/callback`,
    "openid.realm": origin,
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
  });
  return `${STEAM_OPENID}?${params}`;
}

/** Returns the SteamID64 if Steam confirms the assertion, otherwise null. */
export async function verifySteamCallback(params: URLSearchParams, origin: string): Promise<string | null> {
  if (params.get("openid.mode") !== "id_res") return null;
  if (params.get("openid.op_endpoint") !== STEAM_OPENID) return null;

  // The assertion must have been issued for our own callback URL.
  const returnTo = params.get("openid.return_to") || "";
  if (!returnTo.startsWith(`${origin}/api/auth/steam/callback`)) return null;

  const claimed = params.get("openid.claimed_id") || "";
  const match = claimed.match(/^https:\/\/steamcommunity\.com\/openid\/id\/(\d{17})$/);
  if (!match) return null;

  const body = new URLSearchParams(params);
  body.set("openid.mode", "check_authentication");
  try {
    const response = await fetch(STEAM_OPENID, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10000),
    });
    const text = await response.text();
    return /is_valid\s*:\s*true/.test(text) ? match[1] : null;
  } catch {
    return null;
  }
}

/** SteamID64 → Deadlock account id (SteamID3). */
export function accountIdFromSteamId64(steamId64: string) {
  return Number(BigInt(steamId64) - STEAM_ID64_BASE);
}
