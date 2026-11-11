"use client";

import { useEffect } from "react";
import { useLanguage } from "./language-provider";
import { getHero, rankLabel } from "@/lib/heroes";

export type ProBoard = { region: string; entries: { position: number; name: string; hidden: boolean; heroIds: number[] }[] };
export type MnPlayerRow = {
  accountId: number;
  name: string;
  avatar: string | null;
  profileUrl: string | null;
  badge: number | null;
  matches: number;
  wins: number;
  topHeroIds: number[];
};

const REGION_LABEL: Record<string, { mn: string; en: string }> = {
  Asia: { mn: "Ази", en: "Asia" },
  Europe: { mn: "Европ", en: "Europe" },
  NAmerica: { mn: "Хойд Америк", en: "North America" },
  SAmerica: { mn: "Өмнөд Америк", en: "South America" },
  Oceania: { mn: "Номхон далай", en: "Oceania" },
};

const ui = {
  mn: {
    docTitle: "Top тоглогчид, Монгол leaderboard — Deadlock | Deadlock Mongolia",
    eyebrow: "Pro · Leaderboard",
    title: "Top тоглогчид",
    lead: "Valve-ийн албан ёсны leaderboard болон Монгол тоглогчдын жагсаалт. Цаг тутам автоматаар шинэчлэгдэнэ.",
    mn: "🇲🇳 Монгол тоглогчид",
    mnLead: "Бүртгүүлсэн Монгол тоглогчдыг одоогийн rank-аар нь эрэмбэлэв. Тоглолт, win rate нь сүүлийн 30 хоногийнх.",
    mnEmpty: "Одоогоор бүртгүүлсэн тоглогч алга. Эхнийх нь чи бол!",
    join: "Жагсаалтад орох бол:",
    joinSteps: [
      "Steam профайлаа Public болго (Deadlock API зөвхөн нийтийн датаг хардаг).",
      "Steam-ээр нэвтэрч «Миний профайл» хуудсанд орно.",
      "«Профайлаа нийтэд харуулах», «Би Монгол тоглогч» гэдгийг асаагаад хадгал. Жагсаалтад шууд гарна.",
    ],
    joinCta: "Steam-ээр нэвтрэх",
    removeNote: "Хүссэн үедээ «Миний профайл» дээрээс унтрааж эсвэл бүх датагаа устгаж болно.",
    matches: "тоглолт",
    unranked: "Rank-гүй",
    global: "Бүсийн leaderboard",
    globalLead: "Valve цаг тутам шинэчилдэг. Season-ий эхэн үед жагсаалт богино байж болно.",
    emptyBoard: "Энэ бүсэд одоогоор жагсаалт гараагүй байна.",
    heroesCta: "Phantom+ meta, hero бүрийн build →",
    hiddenName: "Нэр нуугдсан",
  },
  en: {
    docTitle: "Top players & Mongolian leaderboard — Deadlock | Deadlock Mongolia",
    eyebrow: "Pro · Leaderboard",
    title: "Top players",
    lead: "Valve's official leaderboards plus a list of Mongolian players. Refreshed automatically every hour.",
    mn: "🇲🇳 Mongolian players",
    mnLead: "Registered Mongolian players sorted by current rank. Matches and win rate cover the last 30 days.",
    mnEmpty: "No players registered yet. Be the first!",
    join: "To get listed:",
    joinSteps: [
      "Make your Steam profile public (the Deadlock API only sees public data).",
      "Sign in with Steam and open My profile.",
      "Turn on \u201cpublic profile\u201d and \u201cI'm a Mongolian player\u201d, then save. You'll appear right away.",
    ],
    joinCta: "Sign in with Steam",
    removeNote: "You can switch it off or delete all your data on My profile at any time.",
    matches: "matches",
    unranked: "Unranked",
    global: "Regional leaderboards",
    globalLead: "Updated hourly by Valve. Lists can be short early in a season.",
    emptyBoard: "No leaderboard for this region yet.",
    heroesCta: "Phantom+ meta and hero builds →",
    hiddenName: "Name hidden",
  },
};

function HeroIcons({ ids, size = 26 }: { ids: number[]; size?: number }) {
  return (
    <span className="heroes">
      {ids.slice(0, 3).map((id) => {
        const hero = getHero(id);
        return hero ? (
          <a key={id} href={`/heroes/${hero.slug}`} title={hero.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.image} alt={hero.name} width={size} height={size} loading="lazy" />
          </a>
        ) : null;
      })}
    </span>
  );
}

export function ProView({ boards, mongolians }: { boards: ProBoard[]; mongolians: MnPlayerRow[] }) {
  const { language } = useLanguage();
  const t = ui[language];

  useEffect(() => {
    document.title = t.docTitle;
  }, [t.docTitle]);

  return (
    <main className="counter-page" data-no-translate>
      <div className="section-head">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="counter-title">{t.title}</h1>
        <p>{t.lead}</p>
      </div>

      <section className="hp-section" aria-labelledby="mnTitle">
        <h2 id="mnTitle" className="pro-h2">
          {t.mn}
        </h2>
        <p className="id-note">{t.mnLead}</p>
        {mongolians.length ? (
          <ol className="mn-board">
            {mongolians.map((player, index) => {
              const rank = rankLabel(player.badge);
              const wr = player.matches ? Math.round((player.wins / player.matches) * 100) : null;
              return (
                <li key={player.accountId} className="mn-row">
                  <span className="pos">{index + 1}</span>
                  {player.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="avatar" src={player.avatar} alt="" loading="lazy" />
                  ) : (
                    <span className="avatar" />
                  )}
                  <span className="who">
                    <strong>
                      {player.profileUrl ? (
                        <a
                          href={player.profileUrl}
                          {...(player.profileUrl.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          {player.name}
                        </a>
                      ) : (
                        player.name
                      )}
                    </strong>
                    <small>
                      {player.matches} {t.matches}
                      {wr !== null ? ` · ${wr}% WR` : ""}
                    </small>
                  </span>
                  <span className="rank" style={{ color: rank?.color }}>
                    {rank?.name ?? t.unranked}
                  </span>
                  <HeroIcons ids={player.topHeroIds} size={30} />
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="counter-empty">{t.mnEmpty}</p>
        )}
        <div className="mn-join">
          <strong>{t.join}</strong>
          <ol>
            {t.joinSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p style={{ margin: "10px 0 0" }}>
            <a className="btn btn-steam" href="/me">
              {t.joinCta}
            </a>
          </p>
          <p className="id-note">{t.removeNote}</p>
        </div>
      </section>

      <section className="hp-section" aria-labelledby="globalTitle">
        <h2 id="globalTitle" className="pro-h2">
          {t.global}
        </h2>
        <p className="id-note">{t.globalLead}</p>
        <div className="pro-regions">
          {boards.map((board) => (
            <article key={board.region} className="pro-board">
              <h3>{REGION_LABEL[board.region]?.[language] ?? board.region}</h3>
              {board.entries.length ? (
                <ol>
                  {board.entries.slice(0, 15).map((entry) => (
                    <li key={`${entry.position}-${entry.name}`} className="pro-row">
                      <span className="pos">#{entry.position}</span>
                      <span className={`name${entry.hidden ? " hidden" : ""}`}>{entry.hidden ? t.hiddenName : entry.name}</span>
                      <HeroIcons ids={entry.heroIds} />
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="pro-empty">{t.emptyBoard}</p>
              )}
            </article>
          ))}
        </div>
        <a className="btn btn-ghost hp-counter-cta" href="/heroes">
          {t.heroesCta}
        </a>
      </section>
    </main>
  );
}
