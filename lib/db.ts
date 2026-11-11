/*
  Neon Postgres via node-postgres (pg).

  Per Neon's guidance for Vercel: use `pg` with a pooled (-pooler) connection
  string and register the pool with Vercel Fluid compute via
  `attachDatabasePool`, so idle clients are released before a function
  instance is suspended.

  DATABASE_URL is added automatically when Neon is linked to the Vercel
  project; locally it comes from .env.local (`neon env pull`). Without it every
  profile helper degrades gracefully and the rest of the site keeps working.

  The table is created on first use — no manual SQL needed.
*/
import { Pool, type QueryResultRow } from "pg";
import { attachDatabasePool } from "@vercel/functions";

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Neon hands out `sslmode=require`. pg currently treats that as verify-full but
 * will weaken it in its next major version, so pin the strict mode explicitly.
 */
function connectionString() {
  const url = new URL(process.env.DATABASE_URL!);
  if (!url.searchParams.has("sslmode") || url.searchParams.get("sslmode") === "require") {
    url.searchParams.set("sslmode", "verify-full");
  }
  return url.toString();
}

function getPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  if (!pool) {
    pool = new Pool({
      connectionString: connectionString(),
      max: 5,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    });
    attachDatabasePool(pool);
  }
  return pool;
}

/** Parameterised query ($1, $2, …). Never interpolate user input into `text`. */
export async function query<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  const result = await getPool().query<T>(text, params);
  return result.rows;
}

export function ensureSchema() {
  schemaReady ??= (async () => {
    await query(`
      CREATE TABLE IF NOT EXISTS player_profiles (
        account_id      INTEGER PRIMARY KEY,
        steam_id64      TEXT NOT NULL,
        display_name    TEXT NOT NULL DEFAULT '',
        avatar_url      TEXT,
        crosshair_code  TEXT,
        sensitivity     NUMERIC(6, 3),
        dpi             INTEGER,
        fov             INTEGER,
        resolution      TEXT,
        refresh_rate    INTEGER,
        mouse           TEXT,
        main_hero_id    INTEGER,
        note            TEXT,
        is_public       BOOLEAN NOT NULL DEFAULT FALSE,
        is_mongolian    BOOLEAN NOT NULL DEFAULT FALSE,
        created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await query(`CREATE INDEX IF NOT EXISTS player_profiles_public_idx ON player_profiles (is_public, is_mongolian)`);
  })().catch((error) => {
    schemaReady = null; // retry on the next request
    throw error;
  });
  return schemaReady;
}
