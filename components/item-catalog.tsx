"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "./language-provider";
import { ItemDetail, ItemIcon } from "./item-detail";
import { ITEMS, SHOPS, WHEN_TO_BUY, getShop, type Item, type ShopKey } from "@/lib/items";

type TierFilter = "all" | 1 | 2 | 3 | 4;

const ui = {
  mn: {
    shops: "Дэлгүүр",
    search: "Item нэрээр эсвэл тайлбараар хайх...",
    all: "Бүгд",
    tier: "Түвшин",
    empty: "Тохирох item олдсонгүй.",
    active: "Active",
    imbue: "Imbue",
    use: "АШИГЛАХ",
    when: "ХЭЗЭЭ",
    press: "Товч дарна",
    attach: "Чадварт холбоно",
    always: "Өөрөө ажиллана",
    hint: "Дарж дэлгэрэнгүйг үз",
    close: "Item тайлбарыг хаах",
    open: (name: string) => `${name} item-ийн дэлгэрэнгүй тайлбарыг нээх`,
    results: (n: number) => `${n} item`,
  },
  en: {
    shops: "Shop",
    search: "Search by item name or description...",
    all: "All",
    tier: "Tier",
    empty: "No matching items found.",
    active: "Active",
    imbue: "Imbue",
    use: "USE",
    when: "WHEN",
    press: "Press to use",
    attach: "Attach to an ability",
    always: "Always on",
    hint: "Click for the full guide",
    close: "Close item details",
    open: (name: string) => `Open ${name} item details`,
    results: (n: number) => `${n} items`,
  },
};

const TIERS = [1, 2, 3, 4] as const;

function matches(item: Item, query: string) {
  if (!query) return true;
  const haystack = `${item.name} ${item.copy.mn.d} ${item.copy.en.d}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export function ItemCatalog() {
  const { language } = useLanguage();
  const t = ui[language];
  const [shopKey, setShopKey] = useState<ShopKey>("fairfax");
  const [tier, setTier] = useState<TierFilter>("all");
  const [query, setQuery] = useState("");
  const [openItem, setOpenItem] = useState<Item | null>(null);
  const [tooltip, setTooltip] = useState<{ item: Item; rect: DOMRect } | null>(null);
  const shop = getShop(shopKey);

  // A search looks across every shop so players don't need to know where an item lives.
  const searching = query.trim().length > 0;
  const visible = useMemo(
    () =>
      ITEMS.filter(
        (item) =>
          (searching || item.shop === shopKey) &&
          (tier === "all" || item.tier === tier) &&
          matches(item, query.trim()),
      ),
    [shopKey, tier, query, searching],
  );

  useEffect(() => {
    document.documentElement.style.setProperty("--shop-accent", shop.accent);
  }, [shop.accent]);

  const groups = TIERS.map((tierValue) => ({
    tier: tierValue,
    items: visible.filter((item) => item.tier === tierValue),
  })).filter((group) => group.items.length);

  return (
    <div className="item-catalog" data-no-translate>
      <div className="catalog-toolbar">
        <div className="tabs" role="tablist" aria-label={t.shops}>
          {SHOPS.map((entry) => (
            <button
              key={entry.key}
              type="button"
              role="tab"
              aria-selected={entry.key === shopKey && !searching}
              className={`tab${entry.key === shopKey && !searching ? " active" : ""}`}
              data-shop={entry.key}
              onClick={() => {
                setShopKey(entry.key);
                setQuery("");
              }}
            >
              <span className="dot" />
              {entry.label}
            </button>
          ))}
        </div>

        <div className="controls">
          <div className="search">
            <input
              type="search"
              id="searchInput"
              value={query}
              placeholder={t.search}
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="filter-chips" role="group" aria-label={t.tier}>
            {(["all", ...TIERS] as TierFilter[]).map((value) => (
              <button
                key={String(value)}
                type="button"
                className={`chip${tier === value ? " active" : ""}`}
                aria-pressed={tier === value}
                onClick={() => setTier(value)}
              >
                {value === "all" ? t.all : `${t.tier} ${value}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {searching ? (
        <p className="catalog-result-count" aria-live="polite">
          {t.results(visible.length)}
        </p>
      ) : null}

      <div
        id="content"
        className={tier === "all" ? "catalog-board" : "catalog-board single-tier"}
        data-shop={searching ? "all" : shopKey}
      >
        {groups.map((group) => (
          <div className="tier-block" data-tier={group.tier} key={group.tier}>
            <div className="tier-head">
              <span className="tier-num">
                {t.tier} {group.tier}
              </span>
              <span className="tier-price">{shop.tierPrices[group.tier]}</span>
              {!searching && shop.tierNote[group.tier] ? (
                <span className="tier-note">{shop.tierNote[group.tier]}</span>
              ) : null}
            </div>
            <div className="grid">
              {group.items.map((item) => (
                <a
                  key={item.slug}
                  className="card"
                  href={`/items/${item.slug}`}
                  aria-label={t.open(item.name)}
                  onClick={(event) => {
                    // Let ctrl/cmd-click open the real page in a new tab.
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                    event.preventDefault();
                    setTooltip(null);
                    setOpenItem(item);
                  }}
                  onMouseEnter={(event) => {
                    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                    setTooltip({ item, rect: event.currentTarget.getBoundingClientRect() });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  onBlur={() => setTooltip(null)}
                >
                  <div className="item-img-slot">
                    <ItemIcon item={item} />
                  </div>
                  <div className="card-top">
                    <div className="item-name">{item.name}</div>
                    <div className="badges">
                      {item.type === "active" ? <span className="badge active">{t.active}</span> : null}
                      {item.type === "imbue" ? <span className="badge imbue">{t.imbue}</span> : null}
                    </div>
                  </div>
                  <div className="item-desc">{item.copy[language].d}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!groups.length ? <div className="empty-msg" style={{ display: "block" }}>{t.empty}</div> : null}

      {tooltip ? <ItemTooltip item={tooltip.item} rect={tooltip.rect} /> : null}
      {openItem ? <ItemModal item={openItem} onChange={setOpenItem} onClose={() => setOpenItem(null)} /> : null}
    </div>
  );
}

function ItemTooltip({ item, rect }: { item: Item; rect: DOMRect }) {
  const { language } = useLanguage();
  const t = ui[language];
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: -9999, top: -9999 });

  useEffect(() => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const gap = 12;
    let left = rect.right + gap;
    if (left + box.width > window.innerWidth - gap) left = rect.left - box.width - gap;
    left = Math.max(gap, Math.min(left, window.innerWidth - box.width - gap));
    let top = rect.top + rect.height / 2 - box.height / 2;
    top = Math.max(gap, Math.min(top, window.innerHeight - box.height - gap));
    setPosition({ left, top });
  }, [rect, item]);

  const usage = item.type === "active" ? t.press : item.type === "imbue" ? t.attach : t.always;

  return (
    <div
      ref={ref}
      className="item-tooltip visible"
      role="tooltip"
      style={{ left: position.left, top: position.top }}
      data-no-translate
    >
      <div className="tooltip-head">
        <ItemIcon item={item} />
        <div>
          <small>
            {item.price} · {t.tier.toUpperCase()} {item.tier}
          </small>
          <strong>{item.name}</strong>
        </div>
      </div>
      <p>{item.copy[language].d}</p>
      {item.stats.length ? (
        <div className="game-stat-grid compact">
          {item.stats.slice(0, 2).map((stat) => (
            <div className={`game-stat ${stat.cls}`} key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      ) : null}
      <div className="tooltip-rule" />
      <dl>
        <div>
          <dt>{t.use}</dt>
          <dd>{usage}</dd>
        </div>
        <div>
          <dt>{t.when}</dt>
          <dd>{WHEN_TO_BUY[item.tier][language]}</dd>
        </div>
      </dl>
      <span className="tooltip-hint">{t.hint}</span>
    </div>
  );
}

function ItemModal({
  item,
  onChange,
  onClose,
}: {
  item: Item;
  onChange: (item: Item) => void;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.classList.remove("modal-open");
      previous?.focus?.();
    };
  }, [close]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [item]);

  return (
    <div
      className="ic-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="itemModalTitle"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="ic-modal-panel" ref={panelRef}>
        <button
          ref={closeRef}
          className="ic-modal-close"
          type="button"
          aria-label={ui[language].close}
          onClick={close}
        >
          ×
        </button>
        <ItemDetail item={item} variant="modal" onNavigate={onChange} />
      </div>
    </div>
  );
}
