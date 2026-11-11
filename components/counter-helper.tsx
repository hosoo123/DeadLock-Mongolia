"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./language-provider";
import { ItemDetail, ItemIcon } from "./item-detail";
import heroesData from "@/public/data/deadlock-heroes.json";
import { THREATS, computeCounters, type PlayStyle } from "@/lib/counters";
import { getItem, heroPortrait, type Item } from "@/lib/items";

const HEROES = (heroesData as { name: string; player_selectable?: boolean }[])
  .filter((hero) => hero.player_selectable !== false)
  .map((hero) => hero.name)
  .sort((a, b) => a.localeCompare(b));

const MAX_ENEMIES = 6;

const ui = {
  mn: {
    eyebrow: "Counter helper",
    title: "Дайсандаа юу авах вэ?",
    intro: "Дайсны багийн hero-уудыг сонго. Тэдний аюулыг тоолж, эсрэг нь хамгийн үр дүнтэй item-уудыг тайлбартай нь санал болгоно.",
    pick: (n: number) => `Дайсны hero сонгох (${n}/${MAX_ENEMIES})`,
    search: "Hero хайх...",
    clear: "Цэвэрлэх",
    style: "Чи юугаар тоглодог вэ?",
    styles: { any: "Хоёулаа", gun: "Буугаар", spirit: "Чадвараар" } as Record<PlayStyle | "any", string>,
    empty: "Дээрээс дайсны hero-уудыг сонгоход санал энд гарна.",
    top: "Хамгийн түрүүнд авах item-ууд",
    breakdown: "Аюул бүрийн задаргаа",
    from: "Хэнээс:",
    share: "Линк хуулах",
    copied: "Хуулагдлаа ✓",
    note: "Энэ нь hero бүрийн ерөнхий хандлага дээр суурилсан санал. Дайсны тухайн тоглолтын build-ийг харж тааруулаарай.",
    close: "Хаах",
  },
  en: {
    eyebrow: "Counter helper",
    title: "What should I buy?",
    intro: "Pick the enemy heroes. We'll tally their threats and suggest the items that counter them best — with reasons.",
    pick: (n: number) => `Pick enemy heroes (${n}/${MAX_ENEMIES})`,
    search: "Search heroes...",
    clear: "Clear",
    style: "How do you play?",
    styles: { any: "Both", gun: "Gun", spirit: "Spirit" } as Record<PlayStyle | "any", string>,
    empty: "Pick enemy heroes above to see suggestions here.",
    top: "Buy these first",
    breakdown: "Threat breakdown",
    from: "From:",
    share: "Copy link",
    copied: "Copied ✓",
    note: "Suggestions are based on each hero's general tendencies. Check what the enemy actually builds and adjust.",
    close: "Close",
  },
};

function readUrl(): { enemies: string[]; style: PlayStyle | "any" } {
  const params = new URLSearchParams(window.location.search);
  const enemies = (params.get("vs") || "")
    .split(",")
    .map((name) => decodeURIComponent(name.trim()))
    .filter((name) => HEROES.includes(name))
    .slice(0, MAX_ENEMIES);
  const raw = params.get("style");
  const style = raw === "gun" || raw === "spirit" ? raw : "any";
  return { enemies, style };
}

export function CounterHelper() {
  const { language } = useLanguage();
  const t = ui[language];
  const [enemies, setEnemies] = useState<string[]>([]);
  const [style, setStyle] = useState<PlayStyle | "any">("any");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [openItem, setOpenItem] = useState<Item | null>(null);

  // Restore a shared link (?vs=Abrams,Haze&style=gun)
  useEffect(() => {
    const initial = readUrl();
    setEnemies(initial.enemies);
    setStyle(initial.style);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (enemies.length) params.set("vs", enemies.join(","));
    if (style !== "any") params.set("style", style);
    const search = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${search ? `?${search}` : ""}`);
  }, [enemies, style]);

  const result = useMemo(() => computeCounters(enemies, style), [enemies, style]);
  const visibleHeroes = HEROES.filter((hero) => hero.toLowerCase().includes(query.trim().toLowerCase()));

  function toggle(hero: string) {
    setEnemies((current) =>
      current.includes(hero)
        ? current.filter((name) => name !== hero)
        : current.length < MAX_ENEMIES
          ? [...current, hero]
          : current,
    );
  }

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt(t.share, window.location.href);
    }
  }

  return (
    <main className="counter-page" data-no-translate>
      <div className="section-head">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="counter-title">{t.title}</h1>
        <p>{t.intro}</p>
      </div>

      <section className="counter-panel">
        <div className="counter-panel-head">
          <h2>{t.pick(enemies.length)}</h2>
          <div className="counter-panel-tools">
            <input
              type="search"
              value={query}
              placeholder={t.search}
              onChange={(event) => setQuery(event.target.value)}
              aria-label={t.search}
            />
            {enemies.length ? (
              <button type="button" className="btn btn-ghost" onClick={() => setEnemies([])}>
                {t.clear}
              </button>
            ) : null}
          </div>
        </div>
        <div className="counter-heroes">
          {visibleHeroes.map((hero) => {
            const selected = enemies.includes(hero);
            const disabled = !selected && enemies.length >= MAX_ENEMIES;
            return (
              <button
                key={hero}
                type="button"
                className={`counter-hero${selected ? " selected" : ""}`}
                aria-pressed={selected}
                disabled={disabled}
                onClick={() => toggle(hero)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroPortrait(hero)} alt="" loading="lazy" />
                <span>{hero}</span>
              </button>
            );
          })}
        </div>

        <div className="counter-style" role="group" aria-label={t.style}>
          <span>{t.style}</span>
          {(["any", "gun", "spirit"] as const).map((value) => (
            <button
              key={value}
              type="button"
              className={`chip${style === value ? " active" : ""}`}
              aria-pressed={style === value}
              onClick={() => setStyle(value)}
            >
              {t.styles[value]}
            </button>
          ))}
        </div>
      </section>

      {!enemies.length ? (
        <p className="counter-empty">{t.empty}</p>
      ) : (
        <>
          <section className="counter-top">
            <div className="counter-section-head">
              <h2>{t.top}</h2>
              <button type="button" className="btn btn-ghost" onClick={share}>
                {copied ? t.copied : t.share}
              </button>
            </div>
            <ol className="counter-top-list">
              {result.top.map((entry, index) => {
                const item = getItem(entry.name);
                if (!item) return null;
                return (
                  <li key={entry.name}>
                    <a
                      href={`/items/${item.slug}`}
                      className="counter-item"
                      onClick={(event) => {
                        if (event.metaKey || event.ctrlKey || event.button !== 0) return;
                        event.preventDefault();
                        setOpenItem(item);
                      }}
                    >
                      <span className="counter-rank">{index + 1}</span>
                      <ItemIcon item={item} />
                      <span className="counter-item-copy">
                        <strong>{item.name}</strong>
                        <small>{entry.why[language]}</small>
                        <span className="counter-tags">
                          {entry.threats.map((threat) => (
                            <span key={threat}>{THREATS[threat].label[language]}</span>
                          ))}
                        </span>
                      </span>
                      <span className="counter-price">{item.price}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="counter-breakdown">
            <h2>{t.breakdown}</h2>
            <div className="counter-threats">
              {result.threats.map(({ threat, heroes, items }) => (
                <article key={threat} className="counter-threat">
                  <h3>{THREATS[threat].label[language]}</h3>
                  <p className="counter-threat-from">
                    {t.from}{" "}
                    {heroes.map((hero) => (
                      <span key={hero} className="counter-mini-hero">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={heroPortrait(hero)} alt="" />
                        {hero}
                      </span>
                    ))}
                  </p>
                  <p className="counter-threat-why">{THREATS[threat].why[language]}</p>
                  <div className="counter-threat-items">
                    {items.map((counter) => {
                      const item = getItem(counter.name);
                      if (!item) return null;
                      return (
                        <a
                          key={counter.name}
                          href={`/items/${item.slug}`}
                          className="id-chip"
                          title={counter.why[language]}
                          onClick={(event) => {
                            if (event.metaKey || event.ctrlKey || event.button !== 0) return;
                            event.preventDefault();
                            setOpenItem(item);
                          }}
                        >
                          <ItemIcon item={item} />
                          <span>
                            <strong>{item.name}</strong>
                            <small>{counter.why[language]}</small>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
            <p className="id-note">{t.note}</p>
          </section>
        </>
      )}

      {openItem ? (
        <div
          className="ic-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="itemModalTitle"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpenItem(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpenItem(null);
          }}
        >
          <div className="ic-modal-panel">
            <button
              className="ic-modal-close"
              type="button"
              aria-label={t.close}
              autoFocus
              onClick={() => setOpenItem(null)}
            >
              ×
            </button>
            <ItemDetail item={openItem} variant="modal" onNavigate={setOpenItem} />
          </div>
        </div>
      ) : null}
    </main>
  );
}
