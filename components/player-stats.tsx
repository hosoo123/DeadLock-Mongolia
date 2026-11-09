"use client";

import { FormEvent, useState } from "react";

type SteamProfile = {
  account_id: number;
  personaname: string;
  profileurl: string;
  avatarfull: string;
  countrycode: string | null;
  matches_played_last_30d: number;
  last_updated: string;
};

type PlayerDetails = {
  player: SteamProfile;
  rank: { name: string; subrank: number; badge: number } | null;
  rankUnavailable: string | null;
  recentStats: {
    totalAvailable: number;
    windows: Array<{
      limit: number;
      matches?: number;
      wins?: number;
      losses?: number;
      winRate?: number;
      averageKills?: number;
      averageDeaths?: number;
      averageAssists?: number;
      mostPlayedHero?: {
        name: string;
        image: string | null;
        matches: number;
        winRate: number;
      } | null;
      heroPerformance?: Array<{
        name: string;
        image: string | null;
        matches: number;
        winRate: number;
      }>;
    }>;
  } | null;
  statsUnavailable: string | null;
};

export function PlayerStats() {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState<SteamProfile[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detailLoading, setDetailLoading] = useState(false);
  const [matchWindow, setMatchWindow] = useState(20);

  const selectedStats = selectedPlayer?.recentStats?.windows.find(
    (window) => window.limit === matchWindow,
  );

  async function searchPlayers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (!value) {
      setError("Steam нэр эсвэл ID оруулна уу.");
      return;
    }

    setLoading(true);
    setError("");
    setPlayers([]);
    setSelectedPlayer(null);

    try {
      const response = await fetch(`/api/players?q=${encodeURIComponent(value)}`);
      const result = (await response.json()) as {
        players?: SteamProfile[];
        error?: string;
        hint?: string;
      };

      if (!response.ok) throw new Error(result.error ?? "Тоглогч хайж чадсангүй.");
      setPlayers(result.players ?? []);
      if (!result.players?.length) {
        setError(result.hint ?? "Тохирох Steam профайл олдсонгүй.");
      }
    } catch (searchError) {
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Тоглогч хайхад алдаа гарлаа.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadPlayer(player: SteamProfile) {
    setSelectedPlayer(null);
    setDetailLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/players?accountId=${player.account_id}`);
      const result = (await response.json()) as PlayerDetails & { error?: string };

      if (!response.ok) throw new Error(result.error ?? "Профайл нээж чадсангүй.");
      setSelectedPlayer(result);
      setMatchWindow(20);
    } catch (profileError) {
      setError(
        profileError instanceof Error
          ? profileError.message
          : "Профайл ачаалахад алдаа гарлаа.",
      );
    } finally {
      setDetailLoading(false);
    }
  }

  return (
    <section
      className="player-stats"
      id="playerStats"
      aria-labelledby="player-stats-title"
    >
      <div className="player-stats-heading">
        <div>
          <p className="player-eyebrow">PLAYER INTEL // STEAM</p>
          <h2 id="player-stats-title">Тоглогчийн статистик</h2>
          <p>
            Steam нэр, Account ID, SteamID64 эсвэл профайлын холбоосоор хайж
            тоглогчийн үзүүлэлтээ харна.
          </p>
        </div>
        <span className="player-country-note">🇲🇳 Монгол тоглогчдыг хай</span>
      </div>

      <form className="player-search" onSubmit={searchPlayers}>
        <label className="visually-hidden" htmlFor="player-query">
          Steam нэр эсвэл ID
        </label>
        <input
          id="player-query"
          autoComplete="off"
          maxLength={100}
          placeholder="Steam нэр, ID эсвэл Steam профайлын холбоос..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Хайж байна..." : "Тоглогч хайх"}
        </button>
      </form>

      <p className="player-search-hint">
        Steam дээрх нэрээ эсвэл профайлаа хуваалцахад ашигладаг холбоосоо оруулна.
      </p>

      {error && (
        <div className="player-feedback" role="status">
          <strong>{error}</strong>
          <details className="player-search-help">
            <summary>Профайлаа олох зөвлөгөө</summary>
            <ol>
              <li>Steam профайлаа нээгээд visibility нь Public эсэхийг шалга.</li>
              <li>
                Нэрээр олдохгүй бол Steam-ийн профайлын холбоос эсвэл 17 оронтой
                SteamID64-аа хуулж хай.
              </li>
              <li>
                Steam-ийн холбоос `/id/нэр` хэлбэртэй бол public нэрээр хайж
                үз; хамгийн найдвартай нь `/profiles/`-ийн дараах 17 оронтой
                SteamID64.
              </li>
            </ol>
          </details>
        </div>
      )}

      {players.length > 0 && (
        <div className="player-results" aria-label="Хайлтын үр дүн">
          {players.map((player) => (
            <button
              className="player-result"
              key={player.account_id}
              type="button"
              onClick={() => loadPlayer(player)}
              aria-pressed={selectedPlayer?.player.account_id === player.account_id}
            >
              <img src={player.avatarfull} alt="" loading="lazy" />
              <span className="player-result-copy">
                <strong>{player.personaname}</strong>
                <small>
                  {player.countrycode === "MN" ? "🇲🇳 Монгол" : "Steam тоглогч"}
                  {" · "}
                  30 хоногт {player.matches_played_last_30d} тоглолт
                </small>
              </span>
              <span className="player-result-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      )}

      {detailLoading && <p className="player-feedback" role="status">Статистик ачаалж байна...</p>}

      {selectedPlayer && (
        <article className="player-profile">
          <div className="player-profile-head">
            <img
              className="player-avatar"
              src={selectedPlayer.player.avatarfull}
              alt={`${selectedPlayer.player.personaname} профайлын зураг`}
            />
            <div className="player-profile-name">
              <span>
                {selectedPlayer.player.countrycode === "MN"
                  ? "🇲🇳 МОНГОЛ ТОГЛОГЧ"
                  : "STEAM ПРОФАЙЛ"}
              </span>
              <h3>{selectedPlayer.player.personaname}</h3>
              <a href={selectedPlayer.player.profileurl} target="_blank" rel="noreferrer">
                Steam профайл нээх ↗
              </a>
            </div>
            <span className="player-id">ID {selectedPlayer.player.account_id}</span>
          </div>

          {selectedPlayer.recentStats && (
            <div className="player-period-picker" aria-label="Тоглолтын хугацаа">
              <span>Сүүлийн тоглолтууд</span>
              <div role="group" aria-label="Статистикийн тоглолтын тоо">
                {[20, 50, 100].map((limit) => {
                  const available = selectedPlayer.recentStats?.windows.find(
                    (window) => window.limit === limit,
                  );
                  return (
                    <button
                      type="button"
                      key={limit}
                      disabled={!available?.matches}
                      aria-pressed={matchWindow === limit}
                      onClick={() => setMatchWindow(limit)}
                    >
                      {limit}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="player-stat-grid">
            <div className="player-stat">
              <span>Rank</span>
              <strong>
                {selectedPlayer.rank
                  ? `${selectedPlayer.rank.name} ${selectedPlayer.rank.subrank}`
                  : "—"}
              </strong>
              {!selectedPlayer.rank && <small>{selectedPlayer.rankUnavailable}</small>}
            </div>
            <div className="player-stat">
              <span>
                {selectedStats?.matches
                  ? `${selectedStats.matches} тоглолтын win rate`
                  : "Тоглолтын win rate"}
              </span>
              <strong>
                {selectedStats ? `${selectedStats.winRate}%` : "—"}
              </strong>
              {selectedStats && (
                <small>
                  {selectedStats.wins}W – {selectedStats.losses}L
                </small>
              )}
              {!selectedStats && (
                <small>{selectedPlayer.statsUnavailable ?? "Тоглолтын дата олдсонгүй."}</small>
              )}
            </div>
            <div className="player-stat">
              <span>Дундаж K / D / A</span>
              <strong>
                {selectedStats
                  ? `${selectedStats.averageKills} / ${selectedStats.averageDeaths} / ${selectedStats.averageAssists}`
                  : "—"}
              </strong>
              <small>Сонгосон тоглолтын цонх</small>
            </div>
            <div className="player-stat">
              <span>30 хоногт</span>
              <strong>{selectedPlayer.player.matches_played_last_30d}</strong>
              <small>нийт тоглолт</small>
            </div>
          </div>

          {selectedStats?.heroPerformance && selectedStats.heroPerformance.length > 0 && (
            <div className="player-hero-performance">
              <div className="player-hero-performance-title">
                <span>HERO POOL</span>
                <small>Сонгосон {selectedStats.matches} тоглолт</small>
              </div>
              <div className="player-hero-list">
                {selectedStats.heroPerformance.map((hero) => (
                  <div className="player-hero-row" key={hero.name}>
                    {hero.image ? (
                      <img src={hero.image} alt="" loading="lazy" />
                    ) : (
                      <span className="player-hero-fallback" aria-hidden="true">
                        {hero.name.slice(0, 1)}
                      </span>
                    )}
                    <strong>{hero.name}</strong>
                    <span>{hero.matches} тоглолт</span>
                    <b>{hero.winRate}% WR</b>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      )}

      <p className="player-data-note">
        Steam profile location-оо нийтэд харуулсан үед л 🇲🇳 тэмдэг гарна. Одоогийн
        Deadlock API бүх Монгол тоглогчийн жагсаалт өгдөггүй тул бүрэн Монгол
        leaderboard гаргах боломжгүй байна.
      </p>
    </section>
  );
}
