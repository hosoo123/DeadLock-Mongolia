"use client";

import { useEffect } from "react";
import { useLanguage } from "./language-provider";
import { ItemDetail, ItemIcon } from "./item-detail";
import { getItem, getRelated, getShop } from "@/lib/items";

const ui = {
  mn: {
    home: "Нүүр",
    items: "Item каталог",
    related: (tier: number, shop: string) => `${shop} · Түвшин ${tier}-ийн бусад item`,
    back: "← Бүх item руу буцах",
    counter: "Дайсандаа юу авахаа мэдэхгүй байна уу?",
    counterCta: "Counter helper ашиглах",
    title: (name: string) => `${name} — Deadlock item тайлбар | Deadlock Mongolia`,
  },
  en: {
    home: "Home",
    items: "Item catalog",
    related: (tier: number, shop: string) => `Other ${shop} tier ${tier} items`,
    back: "← Back to all items",
    counter: "Not sure what to buy against the enemy team?",
    counterCta: "Try the counter helper",
    title: (name: string) => `${name} — Deadlock item guide | Deadlock Mongolia`,
  },
};

export function ItemPageView({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const t = ui[language];
  const item = getItem(slug)!;
  const shop = getShop(item.shop);
  const related = getRelated(item);

  useEffect(() => {
    document.title = t.title(item.name);
  }, [t, item.name]);

  return (
    <main className="item-page" data-no-translate>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="/">{t.home}</a>
        <span aria-hidden="true">/</span>
        <a href="/#catalog">{t.items}</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{item.name}</span>
      </nav>

      <ItemDetail item={item} variant="page" />

      <aside className="item-page-cta">
        <p>{t.counter}</p>
        <a className="btn btn-primary" href="/counter">
          {t.counterCta}
        </a>
      </aside>

      {related.length ? (
        <section className="item-related">
          <h2>{t.related(item.tier, shop.label)}</h2>
          <div className="item-related-grid">
            {related.map((other) => (
              <a key={other.slug} href={`/items/${other.slug}`} className="item-related-card">
                <ItemIcon item={other} />
                <span>{other.name}</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <a className="legal-back" href="/#catalog">
        {t.back}
      </a>
    </main>
  );
}
