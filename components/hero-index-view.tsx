"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "./language-provider";
import { HIGH_MMR_LABEL, getHero } from "@/lib/heroes";

export type HeroIndexRow = { heroId: number; wr: number | null; pickRate: number | null; matches: number };

const ui = {
  mn: {
    eyebrow: `${HIGH_MMR_LABEL} meta`,
    title: "Hero-ууд",
    lead: `Сүүлийн 3 долоо хоногийн ${HIGH_MMR_LABEL} тоглолтуудаас hero бүрийн win rate болон хэр олон сонгогдож байгаа. Hero дээр дарж build, counter-ийг нь хар.`,
    sort: "Эрэмбэлэх",
    byWr: "Win rate",
    byPick: "Сонголт",
    byName: "Нэр",
    wr: "WR",
    pick: "сонголт",
    noData: "Live дата түр ирэхгүй байна — hero дээр дарж хуудсыг нь нээж болно.",
  },
  en: {
    eyebrow: `${HIGH_MMR_LABEL} meta`,
    title: "Heroes",
    lead: `Win rate and pick rate for every hero in ${HIGH_MMR_LABEL} matches over the last 3 weeks. Pick a hero for builds and counters.`,
    sort: "Sort by",
    byWr: "Win rate",
    byPick: "Pick rate",
    byName: "Name",
    wr: "WR",
    pick: "pick",
    noData: "Live data is unavailable right now — you can still open each hero page.",
  },
};

type SortKey = "wr" | "pick" | "name";
const pct = (value: number) => `${(value * 100).toFixed(1)}%`;

export function HeroIndexView({ rows }: { rows: HeroIndexRow[] }) {
  const { language } = useLanguage();
  const t = ui[language];
  const hasData = rows.some((row) => row.wr !== null);
  const [sort, setSort] = useState<SortKey>(hasData ? "wr" : "name");

  const sorted = useMemo(() => {
    const list = [...rows];
    if (sort === "name") return list.sort((a, b) => getHero(a.heroId)!.name.localeCompare(getHero(b.heroId)!.name));
    const key = sort === "wr" ? "wr" : "pickRate";
    return list.sort((a, b) => (b[key] ?? -1) - (a[key] ?? -1));
  }, [rows, sort]);

  return (
    <main className="counter-page" data-no-translate>
      <div className="section-head">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="counter-title">{t.title}</h1>
        <p>{t.lead}</p>
      </div>

      {hasData ? (
        <div className="counter-style hi-sort" role="group" aria-label={t.sort}>
          <span>{t.sort}</span>
          {(
            [
              ["wr", t.byWr],
              ["pick", t.byPick],
              ["name", t.byName],
            ] as [SortKey, string][]
          ).map(([key, label]) => (
            <button key={key} type="button" className={`chip${sort === key ? " active" : ""}`} aria-pressed={sort === key} onClick={() => setSort(key)}>
              {label}
            </button>
          ))}
        </div>
      ) : (
        <p className="counter-empty">{t.noData}</p>
      )}

      <ol className="hi-grid">
        {sorted.map((row, index) => {
          const hero = getHero(row.heroId)!;
          return (
            <li key={hero.id}>
              <a className="hi-card" href={`/heroes/${hero.slug}`}>
                {sort !== "name" && row.wr !== null ? <span className="hi-rank">{index + 1}</span> : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hero.image} alt="" loading="lazy" />
                <strong>{hero.name}</strong>
                {row.wr !== null ? (
                  <span className="hi-meta">
                    <b className={row.wr >= 0.5 ? "good" : "bad"}>
                      {pct(row.wr)} {t.wr}
                    </b>
                    <small>
                      {pct(row.pickRate ?? 0)} {t.pick}
                    </small>
                  </span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
