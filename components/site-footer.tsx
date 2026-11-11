"use client";

import Link from "next/link";
import { useLanguage } from "./language-provider";
import { DISCORD_URL } from "@/lib/links";

const copy = {
  mn: {
    tagline:
      "Монгол Deadlock тоглогчдод зориулсан item тайлбар, build санал, patch мэдээ болон тоглогчийн статистик.",
    explore: "Хэсгүүд",
    community: "Community",
    legal: "Мэдээлэл",
    items: "Item каталог",
    builds: "Build generator",
    patch: "Patch мэдээ",
    players: "Тоглогчийн статистик",
    heroes: "Hero-ууд · meta",
    pro: "Top тоглогчид",
    guide: "Шинэ тоглогчид",
    support: "Дэмжлэг үзүүлэх",
    privacy: "Нууцлалын бодлого",
    disclaimer:
      "Deadlock нь Valve Corporation-ий бүтээгдэхүүн. Энэ сайт нь fan project бөгөөд Valve-тай холбоогүй.",
  },
  en: {
    tagline:
      "Item guides, build suggestions, patch notes and player stats for the Mongolian Deadlock community.",
    explore: "Explore",
    community: "Community",
    legal: "Info",
    items: "Item catalog",
    builds: "Build generator",
    patch: "Patch notes",
    players: "Player stats",
    heroes: "Heroes · meta",
    pro: "Top players",
    guide: "Beginner guide",
    support: "Support the project",
    privacy: "Privacy Policy",
    disclaimer:
      "Deadlock is a product of Valve Corporation. This is a fan project and is not affiliated with Valve.",
  },
};

export function SiteFooter() {
  const { language } = useLanguage();
  const t = copy[language];
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" data-no-translate>
      <div className="site-footer-inner">
        <div className="footer-brand">
          <a className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              DL
            </span>
            <span className="brand-text">
              <strong>Deadlock</strong>
              <small>Mongolia</small>
            </span>
          </a>
          <p>{t.tagline}</p>
        </div>

        <div className="footer-col">
          <h3>{t.explore}</h3>
          <a href="/#catalog">{t.items}</a>
          <a href="/heroes">{t.heroes}</a>
          <a href="/counter">Counter helper</a>
          <a href="/pro">{t.pro}</a>
          <a href="/crosshair">Crosshair builder</a>
          <a href="/guide">{t.guide}</a>
          <a href="/#build">{t.builds}</a>
          <a href="/#patchRadar">{t.patch}</a>
        </div>

        <div className="footer-col">
          <h3>{t.community}</h3>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
            Discord
          </a>
          <a href="https://instagram.com/m.hosoo/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a
            href="https://www.facebook.com/m.hosanna0129/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>

        <div className="footer-col">
          <h3>{t.legal}</h3>
          <Link href="/privacy">{t.privacy}</Link>
          <button
            type="button"
            className="footer-link-button"
            onClick={() => window.dispatchEvent(new Event("open-wire-checkout"))}
          >
            {t.support}
          </button>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© {year} Deadlock Mongolia</span>
        <span>{t.disclaimer}</span>
      </div>
    </footer>
  );
}
