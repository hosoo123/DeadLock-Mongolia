/*
  Player profiles — settings that players enter themselves after Steam login.
  Nothing here is read from the game automatically (Valve exposes no API for
  crosshair/sensitivity/config); the player pastes or types it.
*/
import { ensureSchema, hasDatabase, query } from "./db";
import { isOffensiveName } from "./name-filter";

export type Profile = {
  accountId: number;
  steamId64: string;
  displayName: string;
  avatarUrl: string | null;
  crosshairCode: string | null;
  sensitivity: number | null;
  dpi: number | null;
  fov: number | null;
  resolution: string | null;
  refreshRate: number | null;
  mouse: string | null;
  mainHeroId: number | null;
  note: string | null;
  isPublic: boolean;
  isMongolian: boolean;
  updatedAt: string;
};

export type ProfileInput = Pick<
  Profile,
  "crosshairCode" | "sensitivity" | "dpi" | "fov" | "resolution" | "refreshRate" | "mouse" | "mainHeroId" | "note" | "isPublic" | "isMongolian"
>;

type Row = {
  account_id: number;
  steam_id64: string;
  display_name: string;
  avatar_url: string | null;
  crosshair_code: string | null;
  sensitivity: string | null;
  dpi: number | null;
  fov: number | null;
  resolution: string | null;
  refresh_rate: number | null;
  mouse: string | null;
  main_hero_id: number | null;
  note: string | null;
  is_public: boolean;
  is_mongolian: boolean;
  updated_at: string;
};

function fromRow(row: Row): Profile {
  return {
    accountId: row.account_id,
    steamId64: row.steam_id64,
    displayName: isOffensiveName(row.display_name) ? `#${row.account_id}` : row.display_name,
    avatarUrl: row.avatar_url,
    crosshairCode: row.crosshair_code,
    sensitivity: row.sensitivity === null ? null : Number(row.sensitivity),
    dpi: row.dpi,
    fov: row.fov,
    resolution: row.resolution,
    refreshRate: row.refresh_rate,
    mouse: row.mouse,
    mainHeroId: row.main_hero_id,
    note: row.note,
    isPublic: row.is_public,
    isMongolian: row.is_mongolian,
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

// ---------- Validation ----------

const CROSSHAIR_RE = /^DL\.[A-Za-z0-9._\-=]{20,1200}$/;
const RESOLUTION_RE = /^\d{3,4}\s?[x×]\s?\d{3,4}$/;

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const text = value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
  return text || null;
}

function cleanNumber(value: unknown, min: number, max: number, integer: boolean) {
  if (value === null || value === undefined || value === "") return null;
  const number = typeof value === "number" ? value : Number(String(value).replace(",", "."));
  if (!Number.isFinite(number) || number < min || number > max) return undefined; // invalid
  return integer ? Math.round(number) : Math.round(number * 1000) / 1000;
}

/** Returns the cleaned input or a list of field errors. */
export function validateProfileInput(body: Record<string, unknown>): { input: ProfileInput } | { errors: string[] } {
  const errors: string[] = [];

  const crosshairRaw = cleanText(body.crosshairCode, 1300);
  const crosshairCode = crosshairRaw ? crosshairRaw.replace(/\s+/g, "") : null;
  if (crosshairCode && !CROSSHAIR_RE.test(crosshairCode)) errors.push("crosshairCode");

  const sensitivity = cleanNumber(body.sensitivity, 0.01, 50, false);
  const dpi = cleanNumber(body.dpi, 100, 32000, true);
  const fov = cleanNumber(body.fov, 60, 130, true);
  const refreshRate = cleanNumber(body.refreshRate, 30, 1000, true);
  const mainHeroId = cleanNumber(body.mainHeroId, 1, 1000, true);
  if (sensitivity === undefined) errors.push("sensitivity");
  if (dpi === undefined) errors.push("dpi");
  if (fov === undefined) errors.push("fov");
  if (refreshRate === undefined) errors.push("refreshRate");
  if (mainHeroId === undefined) errors.push("mainHeroId");

  const resolution = cleanText(body.resolution, 12);
  if (resolution && !RESOLUTION_RE.test(resolution)) errors.push("resolution");

  const mouse = cleanText(body.mouse, 60);
  const note = cleanText(body.note, 280);
  if ((mouse && isOffensiveName(mouse)) || (note && isOffensiveName(note))) errors.push("language");

  if (errors.length) return { errors };
  return {
    input: {
      crosshairCode,
      sensitivity: sensitivity ?? null,
      dpi: dpi ?? null,
      fov: fov ?? null,
      resolution: resolution ? resolution.replace(/\s/g, "").replace("×", "x") : null,
      refreshRate: refreshRate ?? null,
      mouse,
      mainHeroId: mainHeroId ?? null,
      note,
      isPublic: body.isPublic === true,
      isMongolian: body.isMongolian === true,
    },
  };
}

// ---------- Queries ----------

export async function getProfile(accountId: number): Promise<Profile | null> {
  if (!hasDatabase()) return null;
  await ensureSchema();
  const rows = await query<Row>("SELECT * FROM player_profiles WHERE account_id = $1", [accountId]);
  return rows[0] ? fromRow(rows[0]) : null;
}

/** Called on every login: creates the row or refreshes the Steam name/avatar. */
export async function upsertLogin(accountId: number, steamId64: string, displayName: string, avatarUrl: string | null) {
  await ensureSchema();
  await query(
    `INSERT INTO player_profiles (account_id, steam_id64, display_name, avatar_url)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (account_id) DO UPDATE
       SET display_name = EXCLUDED.display_name, avatar_url = EXCLUDED.avatar_url, updated_at = NOW()`,
    [accountId, steamId64, displayName.slice(0, 64), avatarUrl],
  );
}

export async function saveProfile(accountId: number, input: ProfileInput) {
  await ensureSchema();
  const rows = await query<Row>(
    `UPDATE player_profiles SET
       crosshair_code = $1, sensitivity = $2, dpi = $3, fov = $4, resolution = $5,
       refresh_rate = $6, mouse = $7, main_hero_id = $8, note = $9,
       is_public = $10, is_mongolian = $11, updated_at = NOW()
     WHERE account_id = $12
     RETURNING *`,
    [
      input.crosshairCode, input.sensitivity, input.dpi, input.fov, input.resolution,
      input.refreshRate, input.mouse, input.mainHeroId, input.note,
      input.isPublic, input.isMongolian, accountId,
    ],
  );
  return rows[0] ? fromRow(rows[0]) : null;
}

export async function deleteProfile(accountId: number) {
  await ensureSchema();
  await query("DELETE FROM player_profiles WHERE account_id = $1", [accountId]);
}

/** Public profiles only (is_public = true). */
export async function listPublicProfiles(options: { mongolianOnly?: boolean; withCrosshair?: boolean; limit?: number } = {}) {
  if (!hasDatabase()) return [];
  try {
    await ensureSchema();
    const limit = Math.min(options.limit ?? 200, 500);
    const rows = await query<Row>(
      `SELECT * FROM player_profiles
       WHERE is_public = TRUE
         AND ($1::boolean OR is_mongolian = TRUE)
         AND ($2::boolean OR crosshair_code IS NOT NULL)
       ORDER BY updated_at DESC
       LIMIT $3`,
      [!options.mongolianOnly, !options.withCrosshair, limit],
    );
    return rows.map(fromRow);
  } catch {
    return [];
  }
}

export async function getPublicProfile(accountId: number) {
  const profile = await getProfile(accountId).catch(() => null);
  return profile?.isPublic ? profile : null;
}
