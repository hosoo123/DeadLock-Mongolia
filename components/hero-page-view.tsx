"use client";

import { useEffect } from "react";
import { useLanguage } from "./language-provider";
import { ItemIcon } from "./item-detail";
import { getItem } from "@/lib/items";
import { HIGH_MMR_LABEL, getHero } from "@/lib/heroes";
import { THREATS, type Threat } from "@/lib/counters";

export type HeroPageData = {
  heroId: number;
  windowDays: number;
  stats: { matches: number; wr: number; pickRate: number } | null;
  phases: { tier: 1 | 2 | 3 | 4; items: { slug: string; pick: number; wr: number }[] }[];
  bestItems: { slug: string; pick: number; wr: number }[];
  hardest: { heroId: number; wr: number; matches: number }[];
  easiest: { heroId: number; wr: number; matches: number }[];
  builds: { id: number; name: string; weeklyFavorites: number; categories: { name: string; items: string[] }[] }[];
  threats: Threat[];
  counterItems: { threat: Threat; slugs: string[] }[];
  generatedAt: string;
};

const ui = {
  mn: {
    home: "Нүүр",
    heroes: "Hero-ууд",
    title: (name: string) => `${name} — Deadlock build, counter (Монгол) | Deadlock Mongolia`,
    lead: (name: string) => `${HIGH_MMR_LABEL} тоглогчид ${name}-г яаж тоглож, юу авч байгааг бодит тоглолтын датагаар харуулна.`,
    wr: "Win rate",
    pick: "Сонголтын хувь",
    matches: "Тоглолт",
    build: `${HIGH_MMR_LABEL} build`,
    buildNote: (days: number) => `Сүүлийн ${days} хоногийн ${HIGH_MMR_LABEL} тоглолтуудаас хамгийн их авсан item-ууд, түвшнээр нь.`,
    phase: { 1: "Lane үе · $800", 2: "Эхэн үе · $1600", 3: "Дунд үе · $3200", 4: "Late game · $6400" } as Record<number, string>,
    buys: "авдаг",
    best: "Хамгийн өндөр win rate-тай item",
    bestNote: "Дор хаяж 8% нь авдаг item-уудаас.",
    hard: "Хэцүү өрсөлдөгч",
    easy: "Амар өрсөлдөгч",
    vs: "эсрэг",
    builds: "Энэ долоо хоногийн алдартай build-ууд",
    buildsNote: "Тоглоом доторх build хайлтад ID-г нь оруулж шууд импортлоорой.",
    favorites: "favorite энэ долоо хоногт",
    against: (name: string) => `${name}-гийн эсрэг юу авах вэ?`,
    againstCta: "Бүх дайсны багаар шалгах →",
    threats: "Онцлог",
    noData: "Live дата түр ирэхгүй байна. Хэсэг хугацааны дараа автоматаар шинэчлэгдэнэ.",
    updated: "Шинэчилсэн",
  },
  en: {
    home: "Home",
    heroes: "Heroes",
    title: (name: string) => `${name} — Deadlock build & counters | Deadlock Mongolia`,
    lead: (name: string) => `How ${HIGH_MMR_LABEL} players play ${name} and what they buy, from real match data.`,
    wr: "Win rate",
    pick: "Pick rate",
    matches: "Matches",
    build: `${HIGH_MMR_LABEL} build`,
    buildNote: (days: number) => `Most-bought items by tier in ${HIGH_MMR_LABEL} matches over the last ${days} days.`,
    phase: { 1: "Laning · $800", 2: "Early · $1600", 3: "Mid · $3200", 4: "Late · $6400" } as Record<number, string>,
    buys: "buy it",
    best: "Highest win-rate items",
    bestNote: "Among items bought in at least 8% of games.",
    hard: "Hard matchups",
    easy: "Easy matchups",
    vs: "vs",
    builds: "Popular builds this week",
    buildsNote: "Search the build ID in the in-game build browser to import it.",
    favorites: "favorites this week",
    against: (name: string) => `What to buy against ${name}?`,
    againstCta: "Check the whole enemy team →",
    threats: "Traits",
    noData: "Live data is unavailable right now. The page refreshes automatically.",
    updated: "Updated",
  },
};

const pct = (value: number) => `${(value * 100).toFixed(value < 0.1 ? 1 : 0)}%`;

export function HeroPageView({ data }: { data: HeroPageData }) {
  const { language } = useLanguage();
  const t = ui[language];
  const hero = getHero(data.heroId)!;

  useEffect(() => {
    document.title = t.title(hero.name);
  }, [t, hero.name]);

  const itemChip = (slug: string, meta: string) => {
    const item = getItem(slug);
    if (!item) return null;
    return (
      <a key={slug} className="id-chip hp-item" href={`/items/${slug}`}>
        <ItemIcon item={item} />
        <span>
          <strong>{item.name}</strong>
          <small>{meta}</small>
        </span>
      </a>
    );
  };

  const matchupList = (list: HeroPageData["hardest"], tone: "bad" | "good") => (
    <ul className={`hp-matchups ${tone}`}>
      {list.map((entry) => {
        const enemy = getHero(entry.heroId);
        if (!enemy) return null;
        return (
          <li key={entry.heroId}>
            <a href={`/heroes/${enemy.slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={enemy.image} alt="" loading="lazy" />
              <span>
                <strong>{enemy.name}</strong>
                <small>
                  {pct(entry.wr)} WR · {entry.matches.toLocaleString()}
                </small>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <main className="hero-page" data-no-translate>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="/">{t.home}</a>
        <span aria-hidden="true">/</span>
        <a href="/heroes">{t.heroes}</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{hero.name}</span>
      </nav>

      <div className="hp-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hp-portrait" src={hero.image} alt={hero.name} />
        <div>
          <p className="eyebrow">{HIGH_MMR_LABEL} · Deadlock</p>
          <h1 className="hp-title">{hero.name}</h1>
          <p className="hp-lead">{t.lead(hero.name)}</p>
          {data.threats.length ? (
            <div className="hp-traits" aria-label={t.threats}>
              {data.threats.map((threat) => (
                <span key={threat}>{THREATS[threat].label[language]}</span>
              ))}
            </div>
          ) : null}
        </div>
        {data.stats ? (
          <dl className="hp-stats">
            <div>
              <dt>{t.wr}</dt>
              <dd className={data.stats.wr >= 0.5 ? "good" : "bad"}>{pct(data.stats.wr)}</dd>
            </div>
            <div>
              <dt>{t.pick}</dt>
              <dd>{pct(data.stats.pickRate)}</dd>
            </div>
            <div>
              <dt>{t.matches}</dt>
              <dd>{data.stats.matches.toLocaleString()}</dd>
            </div>
          </dl>
        ) : null}
      </div>

      {!data.phases.length ? <p className="counter-empty">{t.noData}</p> : null}

      {data.phases.length ? (
        <section className="hp-section">
          <h2>{t.build}</h2>
          <p className="id-note">{t.buildNote(data.windowDays)}</p>
          <div className="hp-phases">
            {data.phases.map((phase) => (
              <div className="hp-phase" key={phase.tier}>
                <h3>{t.phase[phase.tier]}</h3>
                {phase.items.map((entry) => itemChip(entry.slug, `${pct(entry.pick)} ${t.buys} · ${pct(entry.wr)} WR`))}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.bestItems.length ? (
        <section className="hp-section">
          <h2>{t.best}</h2>
          <p className="id-note">{t.bestNote}</p>
          <div className="hp-best">
            {data.bestItems.map((entry) => itemChip(entry.slug, `${pct(entry.wr)} WR · ${pct(entry.pick)} ${t.buys}`))}
          </div>
        </section>
      ) : null}

      {data.hardest.length ? (
        <section className="hp-section hp-matchup-grid">
          <div>
            <h2>{t.hard}</h2>
            {matchupList(data.hardest, "bad")}
          </div>
          <div>
            <h2>{t.easy}</h2>
            {matchupList(data.easiest, "good")}
          </div>
        </section>
      ) : null}

      {data.counterItems.length ? (
        <section className="hp-section">
          <h2>{t.against(hero.name)}</h2>
          <div className="hp-against">
            {data.counterItems.map(({ threat, slugs }) => (
              <div key={threat}>
                <h3>{THREATS[threat].label[language]}</h3>
                {slugs.map((slug) => itemChip(slug, `${getItem(slug)?.price ?? ""}`))}
              </div>
            ))}
          </div>
          <a className="btn btn-ghost hp-counter-cta" href={`/counter?vs=${encodeURIComponent(hero.name)}`}>
            {t.againstCta}
          </a>
        </section>
      ) : null}

      {data.builds.length ? (
        <section className="hp-section">
          <h2>{t.builds}</h2>
          <p className="id-note">{t.buildsNote}</p>
          <div className="hp-builds">
            {data.builds.map((build) => (
              <article key={build.id} className="hp-build">
                <header>
                  <strong>{build.name}</strong>
                  <span>
                    ID {build.id} · ★ {build.weeklyFavorites} {t.favorites}
                  </span>
                </header>
                {build.categories.slice(0, 4).map((category, index) => (
                  <div key={`${category.name}-${index}`} className="hp-build-row">
                    <small>{category.name}</small>
                    <div>
                      {category.items.slice(0, 8).map((slug, itemIndex) => {
                        const item = getItem(slug);
                        return item ? (
                          <a key={`${slug}-${itemIndex}`} href={`/items/${slug}`} title={item.name}>
                            <ItemIcon item={item} />
                          </a>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <p className="id-note hp-updated">
        {t.updated}: {data.generatedAt.slice(0, 16).replace("T", " ")} UTC · api.deadlock-api.com
      </p>
    </main>
  );
}
