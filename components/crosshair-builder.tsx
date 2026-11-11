"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";
import {
  CROSSHAIR_API,
  CROSSHAIR_PRESETS,
  DEFAULT_CROSSHAIR,
  PRO_CROSSHAIRS,
  crosshairImageUrl,
  type CrosshairEntry,
  type CrosshairSettings,
} from "@/lib/crosshairs";

const ui = {
  mn: {
    docTitle: "Deadlock crosshair builder, code (Монгол) | Deadlock Mongolia",
    eyebrow: "Crosshair",
    title: "Crosshair builder",
    lead: "Crosshair-аа тохируулаад тоглоомд шууд оруулах code аваарай. Зураг нь тоглоом дотор харагдах шиг яг пиксел бүрээр нь зурагдана.",
    code: "Тоглоомын code",
    copy: "Code хуулах",
    copied: "Хуулагдлаа ✓",
    paste: "Code оруулах",
    pastePrompt: "Crosshair code-оо энд буулгана уу (DL.…)",
    reset: "Анхдагч руу",
    howto: "Тоглоомд: Settings → Crosshair → Import / Share code хэсэгт буулгана.",
    invalid: "Code танигдсангүй. DL.-ээр эхэлсэн бүтэн code эсэхийг шалгаарай.",
    loading: "Шинэчилж байна…",
    background: "Арын өнгө",
    groups: { pips: "Шугамууд (pips)", dot: "Цэг", color: "Өнгө", outline: "Хүрээ" },
    fields: {
      pip_height: "Урт",
      pip_width: "Зузаан",
      pip_gap: "Голын зай",
      pip_opacity: "Тод байдал",
      pip_outline_border: "Хүрээ",
      pip_outline_opacity: "Хүрээний тод",
      dot_size: "Хэмжээ",
      dot_opacity: "Тод байдал",
      dot_outline_border: "Хүрээ",
      dot_outline_opacity: "Хүрээний тод",
    } as Record<string, string>,
    static: "Буудах үед тэлэхгүй (static)",
    mainColor: "Үндсэн өнгө",
    outlineColor: "Хүрээний өнгө",
    presets: "Бэлэн загварууд",
    presetsNote: "Дарж builder руу ачаална.",
    pro: "Pro тоглогчдын crosshair",
    community: "Тоглогчдын crosshair",
    communityNote: "Steam-ээр нэвтэрч профайлаа нийтэд харуулсан тоглогчдын crosshair. Дарж builder руу ачаална.",
    communityEmpty: "Одоогоор хуваалцсан crosshair алга.",
    communityCta: "Өөрийнхөөгөө нэмэх →",
    profile: "Профайл",
    proEmpty: "Pro тоглогчдын нийтэд хуваалцсан code-уудыг эх сурвалжтай нь нэмж байна. Мэдэх code байвал Discord-оор илгээгээрэй.",
    proExternal: "Pro тоглогчдын (ABL, Zerggy, Deathy г.м.) Twitch-ээс цуглуулсан бүтэн жагсаалт: Deadlock Labs ↗",
  },
  en: {
    docTitle: "Deadlock crosshair builder & codes | Deadlock Mongolia",
    eyebrow: "Crosshair",
    title: "Crosshair builder",
    lead: "Tune your crosshair and get a share code to import in-game. The preview is rendered pixel-for-pixel the way the game draws it.",
    code: "Share code",
    copy: "Copy code",
    copied: "Copied ✓",
    paste: "Import code",
    pastePrompt: "Paste a crosshair code (DL.…)",
    reset: "Reset to default",
    howto: "In game: Settings → Crosshair → paste it into the import / share code field.",
    invalid: "That code wasn't recognised. Make sure it's the full code starting with DL.",
    loading: "Updating…",
    background: "Background",
    groups: { pips: "Lines (pips)", dot: "Dot", color: "Colour", outline: "Outline" },
    fields: {
      pip_height: "Length",
      pip_width: "Thickness",
      pip_gap: "Gap",
      pip_opacity: "Opacity",
      pip_outline_border: "Outline",
      pip_outline_opacity: "Outline opacity",
      dot_size: "Size",
      dot_opacity: "Opacity",
      dot_outline_border: "Outline",
      dot_outline_opacity: "Outline opacity",
    } as Record<string, string>,
    static: "Static (doesn't expand while shooting)",
    mainColor: "Main colour",
    outlineColor: "Outline colour",
    presets: "Presets",
    presetsNote: "Click to load into the builder.",
    pro: "Pro player crosshairs",
    community: "Player crosshairs",
    communityNote: "Crosshairs from players who signed in with Steam and made their profile public. Click to load.",
    communityEmpty: "No shared crosshairs yet.",
    communityCta: "Add yours →",
    profile: "Profile",
    proEmpty: "Crosshair codes that pro players have shared publicly are being added here with their source. Know one? Send it on Discord.",
    proExternal: "Full list of pro crosshairs (ABL, Zerggy, Deathy…) collected from their Twitch commands: Deadlock Labs ↗",
  },
};

type NumericKey = {
  [K in keyof CrosshairSettings]: CrosshairSettings[K] extends number ? K : never;
}[keyof CrosshairSettings];

const PIP_FIELDS: [NumericKey, number, number, number][] = [
  ["pip_height", 0, 30, 1],
  ["pip_width", 1, 10, 1],
  ["pip_gap", 0, 30, 1],
  ["pip_opacity", 0, 1, 0.05],
  ["pip_outline_border", 0, 4, 1],
  ["pip_outline_opacity", 0, 1, 0.05],
];
const DOT_FIELDS: [NumericKey, number, number, number][] = [
  ["dot_size", 0, 12, 1],
  ["dot_opacity", 0, 1, 0.05],
  ["dot_outline_border", 0, 4, 1],
  ["dot_outline_opacity", 0, 1, 0.05],
];
const SWATCHES = ["#ffffff", "#00ff00", "#00ffff", "#ffff00", "#ff40c8", "#ff3c3c", "#7f5cff"];
const BACKGROUNDS = ["#3b4a5a", "#1d2026", "#8fb0c8", "#5c6b3a", "#9a6a3c", "#d9d4c7"];

const toHex = (r: number, g: number, b: number) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
const fromHex = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];

function settingsQuery(settings: CrosshairSettings) {
  return new URLSearchParams(Object.entries(settings).map(([key, value]) => [key, String(value)]));
}

export type CommunityCrosshair = CrosshairEntry & { accountId: number; isMongolian: boolean };

export function CrosshairBuilder({ community = [] }: { community?: CommunityCrosshair[] }) {
  const { language } = useLanguage();
  const t = ui[language];
  const [settings, setSettings] = useState<CrosshairSettings>(DEFAULT_CROSSHAIR);
  const [code, setCode] = useState<string>(CROSSHAIR_PRESETS[0]?.code ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const skipEncode = useRef(false);

  useEffect(() => {
    document.title = t.docTitle;
  }, [t.docTitle]);

  // "Open in builder" links pass ?code=DL.…
  useEffect(() => {
    const shared = new URLSearchParams(window.location.search).get("code");
    if (shared) loadCode(shared);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Encode settings → share code (debounced)
  useEffect(() => {
    if (skipEncode.current) {
      skipEncode.current = false;
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`${CROSSHAIR_API}/settings/code?${settingsQuery(settings)}`, { signal: controller.signal });
        const data = (await response.json()) as { code?: string };
        if (data.code) setCode(data.code);
      } catch {
        /* keep the previous code */
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [settings]);

  async function loadCode(raw: string) {
    const value = raw.trim();
    if (!value) return;
    setError("");
    try {
      const response = await fetch(`${CROSSHAIR_API}/code/settings?${new URLSearchParams({ code: value })}`);
      if (!response.ok) throw new Error("invalid");
      const decoded = (await response.json()) as Partial<CrosshairSettings>;
      skipEncode.current = true;
      setSettings({ ...DEFAULT_CROSSHAIR, ...decoded });
      setCode(value);
    } catch {
      setError(t.invalid);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt(t.copy, code);
    }
  }

  const set = <K extends keyof CrosshairSettings>(key: K, value: CrosshairSettings[K]) =>
    setSettings((current) => ({ ...current, [key]: value }));

  const slider = ([key, min, max, step]: [NumericKey, number, number, number]) => (
    <label className="xh-field" key={key}>
      <span>{t.fields[key]}</span>
      <input type="range" min={min} max={max} step={step} value={settings[key]} onChange={(event) => set(key, Number(event.target.value))} />
      <output>{step < 1 ? settings[key].toFixed(2) : settings[key]}</output>
    </label>
  );

  const card = (entry: CrosshairEntry) => (
    <button key={entry.id} type="button" className="xh-card" onClick={() => loadCode(entry.code)}>
      <span className="xh-thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={crosshairImageUrl(entry.code, 2)} alt="" loading="lazy" />
      </span>
      <strong>{entry.name[language]}</strong>
      <small>{entry.note[language]}</small>
      {entry.source ? <span className="xh-source">{entry.source.label}</span> : null}
    </button>
  );

  return (
    <main className="counter-page" data-no-translate>
      <div className="section-head">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="counter-title">{t.title}</h1>
        <p>{t.lead}</p>
      </div>

      <div className="xh-layout">
        <div className="xh-preview">
          <div className="xh-stage" style={{ ["--xh-bg" as string]: background }}>
            {code ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={crosshairImageUrl(code, 3)} alt="Crosshair preview" />
            ) : null}
            {loading ? <span className="xh-loading">{t.loading}</span> : null}
          </div>
          <div className="xh-bgs" role="group" aria-label={t.background}>
            {BACKGROUNDS.map((color) => (
              <button
                key={color}
                type="button"
                style={{ background: color }}
                aria-label={`${t.background} ${color}`}
                aria-pressed={background === color}
                onClick={() => setBackground(color)}
              />
            ))}
          </div>
          <div className="xh-code">
            <label htmlFor="xhCode">{t.code}</label>
            <textarea id="xhCode" readOnly value={code} onFocus={(event) => event.currentTarget.select()} />
            <div className="xh-code-actions">
              <button type="button" className="btn btn-primary" onClick={copy}>
                {copied ? t.copied : t.copy}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  const value = window.prompt(t.pastePrompt);
                  if (value) loadCode(value);
                }}
              >
                {t.paste}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setSettings(DEFAULT_CROSSHAIR)}>
                {t.reset}
              </button>
            </div>
            {error ? <p className="xh-error">{error}</p> : null}
            <p className="xh-howto">{t.howto}</p>
          </div>
        </div>

        <div className="xh-controls">
          <div className="xh-group">
            <h3>{t.groups.color}</h3>
            <div className="xh-color">
              <span className="xh-toggle">{t.mainColor}</span>
              <input
                type="color"
                value={toHex(settings.color_r, settings.color_g, settings.color_b)}
                onChange={(event) => {
                  const [r, g, b] = fromHex(event.target.value);
                  setSettings((current) => ({ ...current, color_r: r, color_g: g, color_b: b }));
                }}
                aria-label={t.mainColor}
              />
              {SWATCHES.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  className="xh-swatch"
                  style={{ background: hex }}
                  aria-label={hex}
                  onClick={() => {
                    const [r, g, b] = fromHex(hex);
                    setSettings((current) => ({ ...current, color_r: r, color_g: g, color_b: b }));
                  }}
                />
              ))}
            </div>
            <div className="xh-color" style={{ marginTop: 10 }}>
              <span className="xh-toggle">{t.outlineColor}</span>
              <input
                type="color"
                value={toHex(settings.outline_color_r, settings.outline_color_g, settings.outline_color_b)}
                onChange={(event) => {
                  const [r, g, b] = fromHex(event.target.value);
                  setSettings((current) => ({ ...current, outline_color_r: r, outline_color_g: g, outline_color_b: b }));
                }}
                aria-label={t.outlineColor}
              />
            </div>
          </div>
          <div className="xh-group">
            <h3>{t.groups.pips}</h3>
            {PIP_FIELDS.map(slider)}
            <label className="xh-toggle">
              <input type="checkbox" checked={settings.pip_gap_static} onChange={(event) => set("pip_gap_static", event.target.checked)} />
              {t.static}
            </label>
          </div>
          <div className="xh-group">
            <h3>{t.groups.dot}</h3>
            {DOT_FIELDS.map(slider)}
          </div>
        </div>
      </div>

      <section className="hp-section">
        <h2 className="pro-h2">{t.presets}</h2>
        <p className="id-note">{t.presetsNote}</p>
        <div className="xh-gallery">{CROSSHAIR_PRESETS.map(card)}</div>
      </section>

      <section className="hp-section">
        <h2 className="pro-h2">{t.community}</h2>
        <p className="id-note">{t.communityNote}</p>
        {community.length ? (
          <div className="xh-gallery">
            {community.map((entry) => (
              <div key={entry.id} className="xh-community">
                {card(entry)}
                <a className="xh-source" href={`/players/${entry.accountId}`}>
                  {entry.isMongolian ? "🇲🇳 " : ""}
                  {t.profile} →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="counter-empty">
            {t.communityEmpty}{" "}
            <a href="/me" style={{ color: "var(--accent)" }}>
              {t.communityCta}
            </a>
          </p>
        )}
      </section>

      <section className="hp-section">
        <h2 className="pro-h2">{t.pro}</h2>
        {PRO_CROSSHAIRS.length ? <div className="xh-gallery">{PRO_CROSSHAIRS.map(card)}</div> : <p className="counter-empty">{t.proEmpty}</p>}
        <p className="xh-howto" style={{ marginTop: 12 }}>
          <a href="https://deadlocklabs.gg/crosshairs/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
            {t.proExternal}
          </a>
        </p>
      </section>
    </main>
  );
}
