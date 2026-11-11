"use client";

import { useState } from "react";
import { useLanguage } from "./language-provider";
import { getHero } from "@/lib/heroes";
import {
  ITEM_HEROES_META,
  TYPE_COPY,
  WHEN_TO_BUY,
  getShop,
  getUpgrades,
  heroPortrait,
  type Item,
} from "@/lib/items";

const ui = {
  mn: {
    tier: "Түвшин",
    what: "Юу хийдэг вэ?",
    how: "Яаж ашиглах вэ?",
    when: "Хэзээ авах вэ?",
    tip: "Санамж",
    goodOn: "Хэнд тохирох вэ?",
    goodOnNote: (days: number) => `Сүүлийн ${days} хоногийн тоглолтуудаас: тухайн hero-гийн хэдэн хувь нь энэ item авсан, авсан үеийн win rate.`,
    noHeroData: "Энэ item-ийн hero датаг одоогоор гаргаж чадсангүй.",
    pick: "авдаг",
    upgrades: "Upgrade зам",
    now: "одоо",
    copyLink: "Линк хуулах",
    copied: "Хуулагдлаа ✓",
    fullPage: "Бүтэн хуудсаар нээх ↗",
  },
  en: {
    tier: "Tier",
    what: "What it does",
    how: "How to use it",
    when: "When to buy",
    tip: "Pro tip",
    goodOn: "Good on",
    goodOnNote: (days: number) => `From the last ${days} days of matches: how often each hero buys this item, and their win rate with it.`,
    noHeroData: "Hero data for this item isn't available yet.",
    pick: "buy it",
    upgrades: "Upgrade path",
    now: "this item",
    copyLink: "Copy link",
    copied: "Copied ✓",
    fullPage: "Open full page ↗",
  },
};

export function ItemIcon({ item, className }: { item: Item; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={item.image}
      alt={item.name}
      loading="lazy"
      onError={(event) => {
        const img = event.currentTarget;
        if (item.remoteImg && img.src !== item.remoteImg) img.src = item.remoteImg;
      }}
    />
  );
}

function pct(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function ItemDetail({
  item,
  variant,
  onNavigate,
}: {
  item: Item;
  variant: "page" | "modal";
  /** Modal: open another item in place instead of following the link. */
  onNavigate?: (item: Item) => void;
}) {
  const { language } = useLanguage();
  const t = ui[language];
  const copy = item.copy[language];
  const shop = getShop(item.shop);
  const { from, into } = getUpgrades(item.name);
  const [copied, setCopied] = useState(false);
  const TitleTag = variant === "page" ? "h1" : "h2";

  async function copyLink() {
    const url = `${window.location.origin}/items/${item.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt(t.copyLink, url);
    }
  }

  function itemLink(target: Item, label?: string) {
    return (
      <a
        key={target.slug}
        className="id-chip"
        href={`/items/${target.slug}`}
        onClick={(event) => {
          if (!onNavigate) return;
          event.preventDefault();
          onNavigate(target);
        }}
      >
        <ItemIcon item={target} />
        <span>
          <strong>{target.name}</strong>
          <small>{label ?? `${t.tier} ${target.tier} · ${target.price}`}</small>
        </span>
      </a>
    );
  }

  return (
    <article
      className={`item-detail item-detail-${variant}`}
      style={{ ["--shop-accent" as string]: shop.accent }}
      data-no-translate
    >
      <div className="id-head">
        <div className="id-icon">
          <ItemIcon item={item} />
        </div>
        <div className="id-head-copy">
          <p className="id-kicker">
            {shop.label} · {t.tier} {item.tier} · {item.price}
          </p>
          <TitleTag className="id-title" id={variant === "modal" ? "itemModalTitle" : undefined}>
            {item.name}
          </TitleTag>
          <div className="id-pills">
            <span className={`id-pill type-${item.type}`}>{TYPE_COPY[item.type][language]}</span>
          </div>
        </div>
      </div>

      <section className="id-summary">
        <span className="id-label">{t.what}</span>
        <p>{copy.d}</p>
      </section>

      {item.stats.length ? (
        <div className="id-stats">
          {item.stats.map((stat) => (
            <div className={`id-stat ${stat.cls}`} key={`${stat.label}-${stat.value}`}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="id-grid">
        <section className="id-card id-card-wide">
          <h3>{t.how}</h3>
          <ol>
            {copy.use.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
        <section className="id-card">
          <h3>{t.when}</h3>
          <p>{WHEN_TO_BUY[item.tier][language]}</p>
        </section>
        <section className="id-card id-card-tip">
          <h3>{t.tip}</h3>
          <p>{copy.tip}</p>
        </section>
      </div>

      <section className="id-heroes">
        <h3>{t.goodOn}</h3>
        {item.heroes.length ? (
          <>
            <ul>
              {item.heroes.map((hero) => (
                <li key={hero.hero}>
                  {getHero(hero.hero) ? (
                    <a className="id-hero-link" href={`/heroes/${getHero(hero.hero)!.slug}`} aria-label={hero.hero} />
                  ) : null}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={heroPortrait(hero.hero)} alt="" loading="lazy" />
                  <div>
                    <strong>{hero.hero}</strong>
                    <span>
                      {pct(hero.pick)} {t.pick} · {pct(hero.wr)} WR
                    </span>
                  </div>
                  <span className="id-bar" aria-hidden="true">
                    <span style={{ width: pct(hero.pick) }} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="id-note">{t.goodOnNote(ITEM_HEROES_META.windowDays)}</p>
          </>
        ) : (
          <p className="id-note">{t.noHeroData}</p>
        )}
      </section>

      {from.length || into.length ? (
        <section className="id-upgrades">
          <h3>{t.upgrades}</h3>
          <div className="id-upgrade-row">
            {from.map((entry) => itemLink(entry))}
            {from.length ? <span className="id-arrow">→</span> : null}
            <span className="id-chip id-chip-current">
              <ItemIcon item={item} />
              <span>
                <strong>{item.name}</strong>
                <small>{t.now}</small>
              </span>
            </span>
            {into.length ? <span className="id-arrow">→</span> : null}
            {into.map((entry) => itemLink(entry))}
          </div>
        </section>
      ) : null}

      <div className="id-actions">
        <button type="button" className="btn btn-ghost" onClick={copyLink}>
          {copied ? t.copied : t.copyLink}
        </button>
        {variant === "modal" ? (
          <a className="btn btn-ghost" href={`/items/${item.slug}`}>
            {t.fullPage}
          </a>
        ) : null}
      </div>
    </article>
  );
}
