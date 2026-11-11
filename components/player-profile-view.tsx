"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./language-provider";
import { getHero, rankLabel } from "@/lib/heroes";
import { crosshairImageUrl } from "@/lib/crosshairs";
import type { Profile } from "@/lib/profiles";

export type PlayerStatsSummary = {
  badge: number | null;
  matches: number;
  wins: number;
  topHeroes: { heroId: number; matches: number; wins: number }[];
} | null;

const ui = {
  mn: {
    docTitle: (name: string) => `${name} — Deadlock тохиргоо, crosshair | Deadlock Mongolia`,
    eyebrow: "Тоглогчийн профайл",
    mongolian: "🇲🇳 Монгол тоглогч",
    rank: "Rank",
    unranked: "Rank-гүй",
    matches: "Тоглолт (30 хоног)",
    wr: "Win rate",
    crosshair: "Crosshair",
    copy: "Code хуулах",
    copied: "Хуулагдлаа ✓",
    tryIt: "Builder дээр нээх",
    settings: "Тохиргоо",
    noCrosshair: "Crosshair оруулаагүй байна.",
    topHeroes: "Хамгийн их тоглосон hero (30 хоног)",
    labels: { sensitivity: "Sensitivity", dpi: "DPI", edpi: "eDPI", fov: "FOV", resolution: "Resolution", refreshRate: "Hz", mouse: "Хулгана", mainHero: "Гол hero" },
    selfReported: "Тохиргоог тоглогч өөрөө оруулсан. Rank, тоглолт Deadlock API-аас автоматаар шинэчлэгдэнэ.",
    updated: "Шинэчилсэн",
  },
  en: {
    docTitle: (name: string) => `${name} — Deadlock settings & crosshair | Deadlock Mongolia`,
    eyebrow: "Player profile",
    mongolian: "🇲🇳 Mongolian player",
    rank: "Rank",
    unranked: "Unranked",
    matches: "Matches (30 days)",
    wr: "Win rate",
    crosshair: "Crosshair",
    copy: "Copy code",
    copied: "Copied ✓",
    tryIt: "Open in builder",
    settings: "Settings",
    noCrosshair: "No crosshair added yet.",
    topHeroes: "Most played heroes (30 days)",
    labels: { sensitivity: "Sensitivity", dpi: "DPI", edpi: "eDPI", fov: "FOV", resolution: "Resolution", refreshRate: "Hz", mouse: "Mouse", mainHero: "Main hero" },
    selfReported: "Settings are entered by the player. Rank and matches update automatically from the Deadlock API.",
    updated: "Updated",
  },
};

export function PlayerProfileView({ profile, stats }: { profile: Profile; stats: PlayerStatsSummary }) {
  const { language } = useLanguage();
  const t = ui[language];
  const [copied, setCopied] = useState(false);
  const rank = rankLabel(stats?.badge);
  const mainHero = profile.mainHeroId ? getHero(profile.mainHeroId) : null;

  useEffect(() => {
    document.title = t.docTitle(profile.displayName);
  }, [t, profile.displayName]);

  async function copy() {
    if (!profile.crosshairCode) return;
    try {
      await navigator.clipboard.writeText(profile.crosshairCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt(t.copy, profile.crosshairCode);
    }
  }

  const settings: [string, string | number | null][] = [
    [t.labels.sensitivity, profile.sensitivity],
    [t.labels.dpi, profile.dpi],
    [t.labels.edpi, profile.sensitivity && profile.dpi ? Math.round(profile.sensitivity * profile.dpi) : null],
    [t.labels.fov, profile.fov],
    [t.labels.resolution, profile.resolution],
    [t.labels.refreshRate, profile.refreshRate],
    [t.labels.mouse, profile.mouse],
    [t.labels.mainHero, mainHero?.name ?? null],
  ];

  return (
    <main className="counter-page me-page" data-no-translate>
      <div className="me-head">
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatarUrl} alt="" className="me-avatar" />
        ) : null}
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="counter-title">{profile.displayName}</h1>
          {profile.isMongolian ? <p className="hp-traits"><span className="me-flag">{t.mongolian}</span></p> : null}
          {profile.note ? <p className="hp-lead">{profile.note}</p> : null}
        </div>
        <dl className="hp-stats">
          <div>
            <dt>{t.rank}</dt>
            <dd style={{ color: rank?.color, fontSize: 18 }}>{rank?.name ?? t.unranked}</dd>
          </div>
          <div>
            <dt>{t.matches}</dt>
            <dd>{stats?.matches ?? 0}</dd>
          </div>
          <div>
            <dt>{t.wr}</dt>
            <dd>{stats?.matches ? `${Math.round((stats.wins / stats.matches) * 100)}%` : "—"}</dd>
          </div>
        </dl>
      </div>

      <div className="pp-grid">
        <section className="me-card">
          <h2 className="me-card-title">{t.crosshair}</h2>
          {profile.crosshairCode ? (
            <>
              <div className="xh-stage pp-stage">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={crosshairImageUrl(profile.crosshairCode, 3)} alt="Crosshair" />
              </div>
              <div className="xh-code-actions" style={{ marginTop: 10 }}>
                <button type="button" className="btn btn-primary" onClick={copy}>
                  {copied ? t.copied : t.copy}
                </button>
                <a className="btn btn-ghost" href={`/crosshair?code=${encodeURIComponent(profile.crosshairCode)}`}>
                  {t.tryIt}
                </a>
              </div>
            </>
          ) : (
            <p className="id-note">{t.noCrosshair}</p>
          )}
        </section>

        <section className="me-card">
          <h2 className="me-card-title">{t.settings}</h2>
          <dl className="pp-settings">
            {settings.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value ?? "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {stats?.topHeroes.length ? (
        <section className="hp-section">
          <h2 className="pro-h2">{t.topHeroes}</h2>
          <ul className="hp-matchups good">
            {stats.topHeroes.map((entry) => {
              const hero = getHero(entry.heroId);
              if (!hero) return null;
              return (
                <li key={entry.heroId}>
                  <a href={`/heroes/${hero.slug}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={hero.image} alt="" loading="lazy" />
                    <span>
                      <strong>{hero.name}</strong>
                      <small>
                        {entry.matches} · {Math.round((entry.wins / entry.matches) * 100)}% WR
                      </small>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <p className="id-note hp-updated">
        {t.selfReported} {t.updated}: {profile.updatedAt.slice(0, 10)}
      </p>
    </main>
  );
}
