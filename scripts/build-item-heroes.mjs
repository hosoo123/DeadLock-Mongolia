#!/usr/bin/env node
/*
  Item бүрийг аль hero-ууд хамгийн их авдаг, хэр хожиж байгааг Deadlock API-аас
  татаж lib/data/item-heroes.json болгон хадгална.

  Ажиллуулах:  node scripts/build-item-heroes.mjs
  Шинэ patch гарсны дараа дахин ажиллуулж commit хийнэ.

  pick = тухайн hero-гийн тоглолтуудын хэдэн хувьд энэ item авсан
  wr   = энэ item авсан тоглолтын ялалтын хувь
*/
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.deadlock-api.com/v1";
const WINDOW_DAYS = 30;
const MIN_MATCHES = 1500; // жижиг sample-ийг хасна
const TOP_HEROES = 6;

const items = JSON.parse(readFileSync(join(root, "public/data/deadlock-items.json"), "utf8"));
const heroes = JSON.parse(readFileSync(join(root, "public/data/deadlock-heroes.json"), "utf8"));
const itemName = new Map(items.map((item) => [item.id, item.name]));
const heroName = new Map(heroes.map((hero) => [hero.id, hero.name]));

async function getJson(path) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const response = await fetch(`${API}${path}`, { headers: { accept: "application/json" } });
    if (response.ok) return response.json();
    console.warn(`${path} → ${response.status}, retry ${attempt}`);
    await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
  }
  throw new Error(`Failed: ${path}`);
}

const since = Math.floor(Date.now() / 1000) - WINDOW_DAYS * 86400;
const [heroStats, itemStats] = await Promise.all([
  getJson(`/analytics/hero-stats?min_unix_timestamp=${since}`),
  getJson(`/analytics/item-stats?bucket=hero&min_unix_timestamp=${since}`),
]);

const heroMatches = new Map(heroStats.map((row) => [row.hero_id, row.matches]));
const byItem = {};

for (const row of itemStats) {
  const item = itemName.get(row.item_id);
  const hero = heroName.get(row.bucket);
  const total = heroMatches.get(row.bucket);
  if (!item || !hero || !total || row.matches < MIN_MATCHES) continue;
  (byItem[item] ||= []).push({
    hero,
    pick: +(row.matches / total).toFixed(4),
    wr: +(row.wins / row.matches).toFixed(4),
    matches: row.matches,
  });
}

for (const name of Object.keys(byItem)) {
  byItem[name] = byItem[name]
    // Олон авдаг нь эхэнд; ялалтын хувь бага зэрэг жин нэмнэ.
    .sort((a, b) => b.pick * (0.5 + b.wr) - a.pick * (0.5 + a.wr))
    .slice(0, TOP_HEROES);
}

const out = {
  generatedAt: new Date().toISOString(),
  windowDays: WINDOW_DAYS,
  items: Object.fromEntries(Object.entries(byItem).sort(([a], [b]) => a.localeCompare(b))),
};

const target = join(root, "lib/data/item-heroes.json");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, JSON.stringify(out, null, 1) + "\n");
console.log(`Wrote ${Object.keys(out.items).length} items → lib/data/item-heroes.json`);
