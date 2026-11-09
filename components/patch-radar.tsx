const heroUpdates = [
  { name: "Nurse Harrow", role: "Support / Control", change: "Шинэ баатар", detail: "Leech Therapy, Wretched Vapors, Healing Needles, Lurking Terrors — sustain болон teamfight control дээр төвлөрнө.", tone: "violet", image: "/heroes/Nurse%20Harrow.webp" },
  { name: "Violet", role: "Skirmisher", change: "Шинэ баатар", detail: "Ойрын зайны дарамт, хурдан reposition, ганцаарчилсан pick хийхэд чиглэсэн.", tone: "pink" },
  { name: "Deadman Danny", role: "Gunslinger", change: "Шинэ баатар", detail: "Бууны burst болон зайнаас дарамтлах playstyle-тэй шинэ сонголт.", tone: "amber", image: "/heroes/Deadman%20Danny.webp" },
  { name: "Solomon", role: "Frontline", change: "Шинэ баатар", detail: "Удаан үргэлжлэх тулаан, хамгаалалт, frontline space үүсгэхэд зориулагдсан.", tone: "cyan", image: "/heroes/Solomon.webp" },
  { name: "Baba", role: "Bruiser", change: "Шинэ баатар", detail: "Тэсвэр, ойрын зайн дарамт, тогтвортой trade хийхэд хүчтэй.", tone: "lime" },
  { name: "Rat King", role: "Ambush", change: "Шинэ баатар", detail: "Гэнэтийн дайралт, map pressure, жижиг зайд chaos үүсгэнэ.", tone: "red", image: "/heroes/Rat%20King.webp" },
];

const itemUpdates = [
  { name: "Escalating Resilience", type: "Weapon / Defense", detail: "Дайсанд онох бүрд bullet resistance цэнэглэгдэнэ. Удаан үргэлжлэх буудалцаанд хүч нь нэмэгдэнэ.", image: "/items/Escalating%20Resilience.png" },
  { name: "Spiritual Overflow", type: "Spirit", detail: "Буудсан үед charge цуглуулж fire rate, spirit power, spirit lifesteal-ийг өсгөнө.", image: "/items/Spiritual%20Overflow.png" },
  { name: "Curse", type: "Spirit / Active", detail: "Идэвхжүүлж дайсны хөдөлгөөн болон чадварын хэмнэлийг таслахад ашиглана." },
  { name: "Debuff Remover", type: "Vitality / Active", detail: "Сөрөг эффект цэвэрлэж, crowd control-д орсон үед дахин тоглолтод орох боломж өгнө." },
];

export function PatchRadar() {
  return (
    <section
      className="patch-radar"
      id="patchRadar"
      aria-labelledby="patch-radar-title"
    >
      <div className="patch-radar-head">
        <div>
          <p className="patch-eyebrow">LIVE INTEL // 20.10.2026</p>
          <h2 id="patch-radar-title">Сүүлийн өөрчлөлтүүд</h2>
          <p className="patch-intro">City Never Sleeps цувралын шинэ баатрууд болон item-ийн meta өөрчлөлтийг Монгол хэлээр товчлоод нэг дор цуглууллаа.</p>
        </div>
        <div className="patch-signal" aria-label="Шинэчлэл идэвхтэй">
          <span className="signal-dot" /> LIVE PATCH
        </div>
      </div>

      <div className="patch-grid">
        <div className="patch-column">
          <div className="patch-column-label"><span>01</span> HERO DROP</div>
          <div className="hero-update-list">
            {heroUpdates.map((hero) => (
              <article className={`hero-update hero-${hero.tone}`} key={hero.name}>
                <div className="hero-index">
                  {hero.image ? (
                    <img src={hero.image} alt={`${hero.name} баатрын зураг`} loading="lazy" />
                  ) : (
                    <span aria-hidden="true">{hero.name.slice(0, 1)}</span>
                  )}
                </div>
                <div className="hero-copy">
                  <div className="hero-meta"><span>{hero.change}</span><span>{hero.role}</span></div>
                  <h3>{hero.name}</h3>
                  <p>{hero.detail}</p>
                </div>
                <span className="hero-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>

        <div className="patch-column item-update-column">
          <div className="patch-column-label"><span>02</span> ITEM SHIFT</div>
          <div className="item-update-list">
            {itemUpdates.map((item, index) => (
              <details className="item-update" key={item.name} open={index === 0}>
                <summary>
                  <span className="item-number">0{index + 1}</span>
                  {item.image ? (
                    <img className="item-icon" src={item.image} alt="" loading="lazy" />
                  ) : (
                    <span className="item-icon item-icon-fallback" aria-hidden="true">
                      {item.name.slice(0, 1)}
                    </span>
                  )}
                  <strong>{item.name}</strong>
                  <span className="summary-plus">+</span>
                </summary>
                <div className="item-update-body"><span>{item.type}</span><p>{item.detail}</p></div>
              </details>
            ))}
          </div>
          <p className="patch-footnote">Тайлбарууд нь тоглолтын практик хэрэглээгээр хөрвүүлсэн. Patch өөрчлөгдөхөд дахин шинэчилнэ.</p>
        </div>
      </div>
    </section>
  );
}
