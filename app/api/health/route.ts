import { NextResponse } from "next/server";
import { ensureSchema, hasDatabase, query } from "@/lib/db";
import { hasSessionSecret } from "@/lib/session";

export const dynamic = "force-dynamic";

// Deployment health check. Reports only status flags — never values.
export async function GET() {
  let database: "ok" | "unconfigured" | "error" = "unconfigured";
  if (hasDatabase()) {
    try {
      await ensureSchema();
      await query("SELECT 1 FROM player_profiles LIMIT 1");
      database = "ok";
    } catch {
      database = "error";
    }
  }
  const session = hasSessionSecret();
  const ok = database === "ok" && session;
  return NextResponse.json({ ok, database, session }, { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
