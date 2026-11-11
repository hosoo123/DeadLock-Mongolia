#!/usr/bin/env node
/*
  Crosshair preset-үүдийн тохиргоог Deadlock API-аар тоглоомын share code
  болгон хувиргаж lib/data/crosshair-presets.json-д хадгална.

  Ажиллуулах:  node scripts/build-crosshair-presets.mjs
  Preset нэмэх/засах бол доорх PRESETS-ийг засаад дахин ажиллуул.
*/
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const PRESETS = [
  { id: "default", mn: "Тоглоомын анхдагч", en: "Game default", note: { mn: "Deadlock-ийн үндсэн crosshair.", en: "Deadlock's stock crosshair." }, settings: {} },
  { id: "small-cross", mn: "Жижиг загалмай", en: "Small cross", note: { mn: "Нарийн, тод — headshot онилоход тохиромжтой.", en: "Tight and crisp — good for headshots." }, settings: { pip_height: 6, pip_width: 2, pip_gap: 3, pip_opacity: 1, dot_opacity: 0, dot_outline_opacity: 0, color_r: 0, color_g: 255, color_b: 255 } },
  { id: "green-dot", mn: "Ногоон цэг", en: "Green dot", note: { mn: "Зөвхөн цэг — дэлгэц цэвэрхэн харагдана.", en: "Dot only — keeps the screen clean." }, settings: { pip_opacity: 0, pip_outline_opacity: 0, dot_size: 3, dot_opacity: 1, dot_outline_border: 1, dot_outline_opacity: 1, color_r: 0, color_g: 255, color_b: 0 } },
  { id: "high-contrast", mn: "Өндөр ялгаралт", en: "High contrast", note: { mn: "Цагаан, хар хүрээтэй — ямар ч map дээр харагдана.", en: "White with a black outline — visible on any map." }, settings: { pip_height: 8, pip_width: 2, pip_gap: 4, pip_opacity: 1, pip_outline_border: 1, pip_outline_opacity: 1, dot_size: 2, dot_opacity: 1, dot_outline_opacity: 1, color_r: 255, color_g: 255, color_b: 255 } },
  { id: "wide-gap", mn: "Өргөн зай", en: "Wide gap", note: { mn: "Голоо нээлттэй үлдээнэ — бай руугаа харахад саадгүй.", en: "Open centre so the target stays visible." }, settings: { pip_height: 10, pip_width: 2, pip_gap: 9, pip_opacity: 0.9, dot_opacity: 0, dot_outline_opacity: 0, color_r: 255, color_g: 235, color_b: 59 } },
  { id: "static-yellow", mn: "Хөдөлгөөнгүй шар", en: "Static yellow", note: { mn: "Буудах үед тэлэхгүй — тогтвортой онилгоо.", en: "Doesn't expand while shooting — steady aim." }, settings: { pip_gap_static: true, pip_height: 7, pip_width: 2, pip_gap: 4, pip_opacity: 1, dot_size: 2, dot_opacity: 1, color_r: 255, color_g: 214, color_b: 0 } },
  { id: "tiny-pink", mn: "Жижиг ягаан", en: "Tiny pink", note: { mn: "Маш жижиг — холын зайд нарийн онилно.", en: "Very small — precise at long range." }, settings: { pip_height: 4, pip_width: 1, pip_gap: 2, pip_opacity: 1, dot_size: 1, dot_opacity: 1, color_r: 255, color_g: 64, color_b: 200 } },
  { id: "thick-red", mn: "Зузаан улаан", en: "Thick red", note: { mn: "Том, тод — ойрын зайн hero-д.", en: "Big and bold — for close-range heroes." }, settings: { pip_height: 12, pip_width: 4, pip_gap: 5, pip_opacity: 1, pip_outline_border: 1, pip_outline_opacity: 1, dot_opacity: 0, dot_outline_opacity: 0, color_r: 255, color_g: 60, color_b: 60 } },
];

const out = [];
for (const preset of PRESETS) {
  const query = new URLSearchParams(Object.entries(preset.settings).map(([k, v]) => [k, String(v)]));
  const response = await fetch(`https://api.deadlock-api.com/v1/crosshair/settings/code?${query}`);
  if (!response.ok) throw new Error(`${preset.id}: ${response.status}`);
  const { code } = await response.json();
  out.push({ id: preset.id, name: { mn: preset.mn, en: preset.en }, note: preset.note, code, source: null });
  console.log(preset.id, code.slice(0, 24) + "…");
}
writeFileSync(join(root, "lib/data/crosshair-presets.json"), JSON.stringify(out, null, 1) + "\n");
console.log(`Wrote ${out.length} presets`);
