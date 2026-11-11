/*
  Signed session cookie (no session table needed).

  Cookie value = base64url(JSON payload) + "." + HMAC-SHA256 signature.
  SESSION_SECRET must be a long random string (Vercel env + .env.local).
*/
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "dlmn_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export type Session = { accountId: number; steamId64: string; exp: number };

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET must be set (32+ characters)");
  return value;
}

function sign(data: string) {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

export function hasSessionSecret() {
  return Boolean(process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32);
}

export function encodeSession(accountId: number, steamId64: string) {
  const payload: Session = { accountId, steamId64, exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function decodeSession(value: string | undefined): Session | null {
  if (!value || !hasSessionSecret()) return null;
  const [data, signature] = value.split(".");
  if (!data || !signature) return null;
  const expected = Buffer.from(sign(data));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as Session;
    if (!Number.isInteger(payload.accountId) || payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  return decodeSession(store.get(SESSION_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
