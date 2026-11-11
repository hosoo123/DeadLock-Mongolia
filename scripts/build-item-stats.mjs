#!/usr/bin/env node
/*
  public/data/deadlock-items.json (Deadlock API dump) → lib/data/item-stats.json

  Item бүрийн shop tooltip дээр харагддаг гол stat-уудыг (6 хүртэл) жижиг
  JSON болгоно. Ингэснээр 460KB-ийн бүтэн dump browser руу очихгүй.

  Ажиллуулах:  node scripts/build-item-stats.mjs
*/
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const items = JSON.parse(readFileSync(join(root, "public/data/deadlock-items.json"), "utf8"));

// Манай нэр → API нэр (зарим item өөр нэртэй)
const ALIASES = { "Armor Piercing Rounds": "Armor Piercer" };
const shopsSrc = readFileSync(join(root, "lib/item-shops.ts"), "utf8");
const names = [...shopsSrc.matchAll(/"name": "([^"]+)"/g)].map((m) => m[1]);
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function statsFor(remote) {
  const keys = [];
  for (const section of remote.tooltip_sections || []) {
    for (const attrs of section.section_attributes || []) {
      for (const field of ["properties", "elevated_properties", "important_properties"]) {
        for (const key of attrs[field] || []) keys.push(key);
      }
    }
  }
  if (!keys.length) {
    for (const [key, prop] of Object.entries(remote.properties || {})) if (prop.tooltip_section) keys.push(key);
  }
  return [...new Set(keys)]
    .map((key) => remote.properties?.[key])
    .filter((p) => p && p.value != null && !/^0(?:\.0+)?(?:s|m)?$/i.test(String(p.value).trim()))
    .slice(0, 6)
    .map((p) => {
      const raw = String(p.value).trim();
      const numeric = Number.parseFloat(raw);
      const sign = String(p.prefix || "").includes("sign") && numeric > 0 ? "+" : "";
      const postfix = /[a-z%]/i.test(raw) ? "" : String(p.postfix || "").trim();
      return {
        label: String(p.label || p.postvalue_label || "Bonus").trim(),
        value: `${sign}${raw}${postfix}`,
        cls: String(p.css_class || "default").replace(/[^a-z0-9_-]/gi, ""),
      };
    })
    .filter((s) => s.label);
}

const out = {};
for (const name of names) {
  const remote = items.find((i) => norm(i.name) === norm(ALIASES[name] || name));
  if (remote) out[name] = statsFor(remote);
}
writeFileSync(join(root, "lib/data/item-stats.json"), JSON.stringify(out) + "\n");
console.log(`Wrote stats for ${Object.keys(out).length}/${names.length} items`);
