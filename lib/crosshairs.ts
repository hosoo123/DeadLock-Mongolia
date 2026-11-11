/*
  CROSSHAIRS

  PRESETS  — сайтын бэлдсэн загварууд (scripts/build-crosshair-presets.mjs).
  PRO      — pro тоглогч, streamer-уудын НИЙТЭД хуваалцсан code-ууд.
             Тоглогчийн settings API-аар гардаггүй тул гараар нэмнэ. Заавал
             эх сурвалжийн линктэй (stream, video, tweet) байх ёстой — нэрийг
             нь хуурамчаар бүү тавь.

  Pro нэмэх жишээ:
    {
      id: "player-name",
      name: { mn: "Player Name", en: "Player Name" },
      note: { mn: "Haze main, EU top 10", en: "Haze main, EU top 10" },
      code: "DL.AQ…",
      source: { label: "twitch.tv/…", url: "https://…" },
    },
*/
import presets from "./data/crosshair-presets.json";

export type CrosshairEntry = {
  id: string;
  name: { mn: string; en: string };
  note: { mn: string; en: string };
  code: string;
  source: { label: string; url: string } | null;
};

export const CROSSHAIR_PRESETS = presets as CrosshairEntry[];

export const PRO_CROSSHAIRS: CrosshairEntry[] = [];

export const CROSSHAIR_API = "https://api.deadlock-api.com/v1/crosshair";

export type CrosshairSettings = {
  themed: boolean;
  pip_gap_static: boolean;
  pip_width: number;
  pip_height: number;
  pip_gap: number;
  pip_opacity: number;
  pip_outline_border: number;
  pip_outline_gap: number;
  pip_outline_opacity: number;
  dot_size: number;
  dot_opacity: number;
  dot_outline_border: number;
  dot_outline_gap: number;
  dot_outline_opacity: number;
  color_r: number;
  color_g: number;
  color_b: number;
  outline_color_r: number;
  outline_color_g: number;
  outline_color_b: number;
};

/** The game's defaults (from the API spec). */
export const DEFAULT_CROSSHAIR: CrosshairSettings = {
  themed: false,
  pip_gap_static: false,
  pip_width: 2,
  pip_height: 16,
  pip_gap: 4,
  pip_opacity: 0.5,
  pip_outline_border: 1,
  pip_outline_gap: 0,
  pip_outline_opacity: 0.7,
  dot_size: 4,
  dot_opacity: 0.7,
  dot_outline_border: 2,
  dot_outline_gap: 0,
  dot_outline_opacity: 0.7,
  color_r: 255,
  color_g: 255,
  color_b: 255,
  outline_color_r: 0,
  outline_color_g: 0,
  outline_color_b: 0,
};

export function crosshairImageUrl(code: string, scale = 3) {
  const query = new URLSearchParams({ code, scale: String(scale), screen_height: "1080" });
  return `${CROSSHAIR_API}/code/image?${query}`;
}
