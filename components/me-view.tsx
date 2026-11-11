"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLanguage } from "./language-provider";
import { HEROES } from "@/lib/heroes";
import { crosshairImageUrl } from "@/lib/crosshairs";
import type { Profile } from "@/lib/profiles";

const ui = {
  mn: {
    docTitle: "Миний профайл | Deadlock Mongolia",
    eyebrow: "Профайл",
    loginTitle: "Steam-ээр нэвтрэх",
    loginLead:
      "Нэвтэрснээр crosshair, sensitivity зэрэг тохиргоогоо хадгалж, бусадтай хуваалцаж, Монгол leaderboard-д орох боломжтой. Бид зөвхөн таны Steam ID-г авна — нууц үг, имэйл хэзээ ч ирэхгүй.",
    login: "Steam-ээр нэвтрэх",
    setupError: "Нэвтрэх систем одоогоор тохируулагдаагүй байна (database). Удахгүй нээгдэнэ.",
    steamError: "Steam нэвтрэлтийг баталгаажуулж чадсангүй. Дахин оролдоно уу.",
    dbError: "Профайл хадгалахад алдаа гарлаа. Дахин оролдоно уу.",
    hello: (name: string) => `Сайн уу, ${name}`,
    helloLead: "Тохиргоогоо бөглөөд хадгал. Rank, win rate, top hero автоматаар Deadlock API-аас гарна.",
    viewPublic: "Нийтийн профайлаа харах ↗",
    logout: "Гарах",
    crosshair: "Crosshair code",
    crosshairHelp: "Тоглоомд: Settings → Game → Reticle → Copy code. DL.-ээр эхэлнэ.",
    sensitivity: "Sensitivity",
    dpi: "DPI",
    fov: "FOV",
    resolution: "Resolution",
    resolutionPh: "1920x1080",
    refreshRate: "Hz",
    mouse: "Хулгана",
    mainHero: "Гол hero",
    none: "—",
    note: "Товч тайлбар",
    notePh: "Жишээ нь: Haze main, Asia server, орой тоглодог",
    visibility: "Харагдах байдал",
    isPublic: "Профайлаа нийтэд харуулах (бусад хүмүүс crosshair, тохиргоог минь харж болно)",
    isMongolian: "Би Монгол тоглогч — Монгол leaderboard-д нэмэх",
    mongolianNeedsPublic: "Leaderboard-д орохын тулд профайл нийтэд харагдах ёстой.",
    save: "Хадгалах",
    saving: "Хадгалж байна…",
    saved: "Хадгалагдлаа ✓",
    invalid: "Зарим талбар буруу байна:",
    fields: {
      crosshairCode: "Crosshair code (DL.-ээр эхэлсэн бүтэн code)",
      sensitivity: "Sensitivity (0.01–50)",
      dpi: "DPI (100–32000)",
      fov: "FOV (60–130)",
      resolution: "Resolution (жишээ 1920x1080)",
      refreshRate: "Hz (30–1000)",
      mainHeroId: "Гол hero",
      language: "Хулгана эсвэл тайлбарт зохисгүй үг байна",
    } as Record<string, string>,
    danger: "Миний датаг устгах",
    dangerLead: "Профайл болон бүх тохиргоо бүрмөсөн устаж, гарах болно.",
    deleteConfirm: "Профайлаа бүрмөсөн устгах уу?",
  },
  en: {
    docTitle: "My profile | Deadlock Mongolia",
    eyebrow: "Profile",
    loginTitle: "Sign in with Steam",
    loginLead:
      "Sign in to save your crosshair, sensitivity and other settings, share them, and join the Mongolian leaderboard. We only receive your Steam ID — never a password or email.",
    login: "Sign in through Steam",
    setupError: "Sign-in isn't set up yet (database). It's coming soon.",
    steamError: "Couldn't verify the Steam sign-in. Please try again.",
    dbError: "Couldn't save your profile. Please try again.",
    hello: (name: string) => `Hi, ${name}`,
    helloLead: "Fill in your settings and save. Rank, win rate and top heroes come from the Deadlock API automatically.",
    viewPublic: "View public profile ↗",
    logout: "Sign out",
    crosshair: "Crosshair code",
    crosshairHelp: "In game: Settings → Game → Reticle → Copy code. Starts with DL.",
    sensitivity: "Sensitivity",
    dpi: "DPI",
    fov: "FOV",
    resolution: "Resolution",
    resolutionPh: "1920x1080",
    refreshRate: "Hz",
    mouse: "Mouse",
    mainHero: "Main hero",
    none: "—",
    note: "Short note",
    notePh: "e.g. Haze main, Asia server, plays evenings",
    visibility: "Visibility",
    isPublic: "Make my profile public (others can see my crosshair and settings)",
    isMongolian: "I'm a Mongolian player — add me to the Mongolian leaderboard",
    mongolianNeedsPublic: "Your profile must be public to appear on the leaderboard.",
    save: "Save",
    saving: "Saving…",
    saved: "Saved ✓",
    invalid: "Some fields are invalid:",
    fields: {
      crosshairCode: "Crosshair code (the full code starting with DL.)",
      sensitivity: "Sensitivity (0.01–50)",
      dpi: "DPI (100–32000)",
      fov: "FOV (60–130)",
      resolution: "Resolution (e.g. 1920x1080)",
      refreshRate: "Hz (30–1000)",
      mainHeroId: "Main hero",
      language: "Mouse or note contains inappropriate words",
    } as Record<string, string>,
    danger: "Delete my data",
    dangerLead: "Your profile and all settings are permanently deleted and you are signed out.",
    deleteConfirm: "Permanently delete your profile?",
  },
};

type FormState = {
  crosshairCode: string;
  sensitivity: string;
  dpi: string;
  fov: string;
  resolution: string;
  refreshRate: string;
  mouse: string;
  mainHeroId: string;
  note: string;
  isPublic: boolean;
  isMongolian: boolean;
};

function toForm(profile: Profile): FormState {
  const s = (value: number | string | null) => (value === null ? "" : String(value));
  return {
    crosshairCode: profile.crosshairCode ?? "",
    sensitivity: s(profile.sensitivity),
    dpi: s(profile.dpi),
    fov: s(profile.fov),
    resolution: profile.resolution ?? "",
    refreshRate: s(profile.refreshRate),
    mouse: profile.mouse ?? "",
    mainHeroId: s(profile.mainHeroId),
    note: profile.note ?? "",
    isPublic: profile.isPublic,
    isMongolian: profile.isMongolian,
  };
}

export function MeView({ profile, error }: { profile: Profile | null; error: string | null }) {
  const { language } = useLanguage();
  const t = ui[language];
  const [form, setForm] = useState<FormState | null>(profile ? toForm(profile) : null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    document.title = t.docTitle;
  }, [t.docTitle]);

  if (!profile || !form) {
    const message = error === "setup" ? t.setupError : error === "steam" ? t.steamError : error === "db" ? t.dbError : null;
    return (
      <main className="counter-page me-page" data-no-translate>
        <div className="section-head">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="counter-title">{t.loginTitle}</h1>
          <p>{t.loginLead}</p>
        </div>
        {message ? <p className="xh-error me-alert">{message}</p> : null}
        <a className="btn btn-steam" href="/api/auth/steam/login">
          <SteamIcon /> {t.login}
        </a>
        <p className="id-note">
          <a href="/privacy#leaderboard">Privacy</a>
        </p>
      </main>
    );
  }

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => (current ? { ...current, [key]: value } : current));
    setStatus("idle");
  };

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!form) return;
    setStatus("saving");
    setFieldErrors([]);
    setSaveError(false);
    const response = await fetch("/api/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, isMongolian: form.isPublic && form.isMongolian }),
    }).catch(() => null);
    if (!response) {
      setSaveError(true);
      setStatus("idle");
      return;
    }
    const data = (await response.json().catch(() => ({}))) as { profile?: Profile; fields?: string[] };
    if (response.ok && data.profile) {
      setForm(toForm(data.profile));
      setStatus("saved");
    } else {
      if (data.fields) setFieldErrors(data.fields);
      else setSaveError(true);
      setStatus("idle");
    }
  }

  async function remove() {
    if (!window.confirm(t.deleteConfirm)) return;
    const response = await fetch("/api/me", { method: "DELETE" }).catch(() => null);
    if (response?.ok) window.location.assign("/");
  }

  const crosshairValid = /^DL\.[A-Za-z0-9._\-=]{20,}$/.test(form.crosshairCode.trim());

  return (
    <main className="counter-page me-page" data-no-translate>
      <div className="me-head">
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatarUrl} alt="" className="me-avatar" />
        ) : null}
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="counter-title">{t.hello(profile.displayName)}</h1>
          <p className="hp-lead">{t.helloLead}</p>
          <div className="me-head-actions">
            {form.isPublic ? (
              <a className="btn btn-ghost" href={`/players/${profile.accountId}`}>
                {t.viewPublic}
              </a>
            ) : null}
            <form method="post" action="/api/auth/logout">
              <button type="submit" className="btn btn-ghost">
                {t.logout}
              </button>
            </form>
          </div>
        </div>
      </div>

      <form className="me-form" onSubmit={submit}>
        <section className="me-card">
          <label className="me-field me-field-wide">
            <span>{t.crosshair}</span>
            <textarea
              value={form.crosshairCode}
              onChange={(event) => update("crosshairCode", event.target.value)}
              placeholder="DL.AQ…"
              rows={3}
              spellCheck={false}
            />
            <small>{t.crosshairHelp}</small>
          </label>
          {crosshairValid ? (
            <div className="me-xh-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={crosshairImageUrl(form.crosshairCode.trim(), 2)} alt="Crosshair preview" />
            </div>
          ) : null}
        </section>

        <section className="me-card me-grid">
          {(
            [
              ["sensitivity", t.sensitivity, "1.25", "decimal"],
              ["dpi", t.dpi, "800", "numeric"],
              ["fov", t.fov, "90", "numeric"],
              ["resolution", t.resolution, t.resolutionPh, "text"],
              ["refreshRate", t.refreshRate, "144", "numeric"],
              ["mouse", t.mouse, "Logitech G Pro X", "text"],
            ] as [keyof FormState, string, string, "decimal" | "numeric" | "text"][]
          ).map(([key, label, placeholder, mode]) => (
            <label className="me-field" key={key}>
              <span>{label}</span>
              <input
                value={form[key] as string}
                inputMode={mode}
                placeholder={placeholder}
                maxLength={key === "mouse" ? 60 : 16}
                onChange={(event) => update(key, event.target.value)}
              />
            </label>
          ))}
          <label className="me-field">
            <span>{t.mainHero}</span>
            <select value={form.mainHeroId} onChange={(event) => update("mainHeroId", event.target.value)}>
              <option value="">{t.none}</option>
              {HEROES.map((hero) => (
                <option key={hero.id} value={hero.id}>
                  {hero.name}
                </option>
              ))}
            </select>
          </label>
          <label className="me-field me-field-wide">
            <span>{t.note}</span>
            <input value={form.note} maxLength={280} placeholder={t.notePh} onChange={(event) => update("note", event.target.value)} />
          </label>
        </section>

        <section className="me-card">
          <h2 className="me-card-title">{t.visibility}</h2>
          <label className="xh-toggle me-check">
            <input type="checkbox" checked={form.isPublic} onChange={(event) => update("isPublic", event.target.checked)} />
            {t.isPublic}
          </label>
          <label className="xh-toggle me-check">
            <input
              type="checkbox"
              checked={form.isPublic && form.isMongolian}
              disabled={!form.isPublic}
              onChange={(event) => update("isMongolian", event.target.checked)}
            />
            {t.isMongolian}
          </label>
          {!form.isPublic ? <p className="id-note">{t.mongolianNeedsPublic}</p> : null}
        </section>

        {fieldErrors.length ? (
          <div className="xh-error me-alert">
            {t.invalid}
            <ul>
              {fieldErrors.map((field) => (
                <li key={field}>{t.fields[field] ?? field}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {saveError ? <p className="xh-error me-alert">{t.dbError}</p> : null}

        <div className="me-actions">
          <button type="submit" className="btn btn-primary" disabled={status === "saving"}>
            {status === "saving" ? t.saving : status === "saved" ? t.saved : t.save}
          </button>
        </div>
      </form>

      <section className="me-card me-danger">
        <h2 className="me-card-title">{t.danger}</h2>
        <p className="id-note">{t.dangerLead}</p>
        <button type="button" className="btn btn-ghost" onClick={remove}>
          {t.danger}
        </button>
      </section>
    </main>
  );
}

export function SteamIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-9.96 9.18l5.36 2.21a2.83 2.83 0 0 1 1.6-.49h.16l2.38-3.45v-.05a3.77 3.77 0 1 1 3.77 3.77h-.09l-3.4 2.42v.13a2.84 2.84 0 0 1-5.63.53L2.4 14.7A10 10 0 1 0 12 2Zm-4.15 15.2-1.23-.51a2.13 2.13 0 1 0 1.16-2.88l1.27.53a1.57 1.57 0 1 1-1.2 2.86Zm9.52-7.8a2.51 2.51 0 1 0-2.51 2.51 2.51 2.51 0 0 0 2.51-2.51Zm-4.4 0a1.89 1.89 0 1 1 1.89 1.89 1.89 1.89 0 0 1-1.89-1.89Z"
      />
    </svg>
  );
}
