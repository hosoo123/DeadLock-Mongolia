import { PATCH_SUMMARY, getOfficialPatches } from "@/lib/patch-notes";
import { getItem } from "@/lib/items";

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}

// Server component: the official patch list refreshes hourly (ISR).
export async function PatchRadar() {
  const { updatedAt, title, intro, heroUpdates, itemUpdates } = PATCH_SUMMARY;
  const official = await getOfficialPatches();
  const latest = official[0];
  const summaryIsBehind = Boolean(latest && latest.date > updatedAt);

  return (
    <section className="patch-radar" id="patchRadar" aria-labelledby="patch-radar-title">
      <div className="patch-radar-head">
        <div>
          <p className="patch-eyebrow">LIVE INTEL // {formatDate(updatedAt)}</p>
          <h2 id="patch-radar-title">{title}</h2>
          <p className="patch-intro">{intro}</p>
        </div>
        <div className="patch-signal" aria-label="Шинэчлэл идэвхтэй">
          <span className="signal-dot" /> LIVE PATCH
        </div>
      </div>

      {summaryIsBehind ? (
        <a className="patch-behind" href={latest.link} target="_blank" rel="noopener noreferrer">
          {/* Single text nodes so the DOM translator's patterns can match them */}
          <strong>{`Шинэ patch гарсан: ${latest.title}`}</strong>
          <span>{`Доорх товчлол ${formatDate(updatedAt)}-ны байдлаар. Албан ёсны тэмдэглэлийг унших ↗`}</span>
        </a>
      ) : null}

      <div className="patch-grid">
        <div className="patch-column">
          <div className="patch-column-label">
            <span>01</span> HERO DROP
          </div>
          <div className="hero-update-list">
            {heroUpdates.map((hero) => (
              <article className={`hero-update hero-${hero.tone}`} key={hero.name}>
                <div className="hero-index">
                  {hero.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={hero.image} alt={`${hero.name} баатрын зураг`} loading="lazy" />
                  ) : (
                    <span aria-hidden="true">{hero.name.slice(0, 1)}</span>
                  )}
                </div>
                <div className="hero-copy">
                  <div className="hero-meta">
                    <span>{hero.change}</span>
                    <span>{hero.role}</span>
                  </div>
                  <h3>{hero.name}</h3>
                  <p>{hero.detail}</p>
                </div>
                <span className="hero-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </div>

        <div className="patch-column item-update-column">
          <div className="patch-column-label">
            <span>02</span> ITEM SHIFT
          </div>
          <div className="item-update-list">
            {itemUpdates.map((update, index) => {
              const item = getItem(update.name);
              return (
                <details className="item-update" key={update.name} open={index === 0}>
                  <summary>
                    <span className="item-number">0{index + 1}</span>
                    {item ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="item-icon" src={item.image} alt="" loading="lazy" />
                    ) : (
                      <span className="item-icon item-icon-fallback" aria-hidden="true">
                        {update.name.slice(0, 1)}
                      </span>
                    )}
                    <strong>{update.name}</strong>
                    <span className="summary-plus">+</span>
                  </summary>
                  <div className="item-update-body">
                    <span>{update.type}</span>
                    <p>{update.detail}</p>
                    {item ? (
                      <a className="patch-item-link" href={`/items/${item.slug}`}>
                        Item-ийн бүтэн тайлбар →
                      </a>
                    ) : null}
                  </div>
                </details>
              );
            })}
          </div>

          {official.length ? (
            <div className="patch-official">
              <div className="patch-column-label">
                <span>03</span> OFFICIAL NOTES
              </div>
              <ul>
                {official.map((patch) => (
                  <li key={patch.link}>
                    <a href={patch.link} target="_blank" rel="noopener noreferrer">
                      <span>{patch.title}</span>
                      <time dateTime={patch.date}>{formatDate(patch.date)}</time>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="patch-footnote">
            Тайлбаруудыг тоглолтод хэрэгтэй байдлаар нь товчилсон. Шинэ patch гарахад шинэчилнэ.
          </p>
        </div>
      </div>
    </section>
  );
}
