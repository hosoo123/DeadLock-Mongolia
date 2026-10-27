const heroUpdates = [
  { name: "Nurse Harrow", role: "Support / Control", change: "Шинэ баатар", detail: "Leech Therapy, Wretched Vapors, Healing Needles, Lurking Terrors — sustain болон teamfight control дээр төвлөрнө.", tone: "violet" },
  { name: "Violet", role: "Skirmisher", change: "Шинэ баатар", detail: "Ойрын зайны дарамт, хурдан reposition, ганцаарчилсан pick хийхэд чиглэсэн.", tone: "pink" },
  { name: "Deadman Danny", role: "Gunslinger", change: "Шинэ баатар", detail: "Бууны burst болон зайнаас дарамтлах playstyle-тэй шинэ сонголт.", tone: "amber" },
  { name: "Solomon", role: "Frontline", change: "Шинэ баатар", detail: "Удаан үргэлжлэх тулаан, хамгаалалт, frontline space үүсгэхэд зориулагдсан.", tone: "cyan" },
  { name: "Baba", role: "Bruiser", change: "Шинэ баатар", detail: "Тэсвэр, ойрын зайн дарамт, тогтвортой trade хийхэд хүчтэй.", tone: "lime" },
  { name: "Rat King", role: "Ambush", change: "Шинэ баатар", detail: "Гэнэтийн дайралт, map pressure, жижиг зайд chaos үүсгэнэ.", tone: "red" },
];

const itemUpdates = [
  { name: "Escalating Resilience", type: "Weapon / Defense", detail: "Дайсанд онох бүрд bullet resistance цэнэглэгдэнэ. Удаан үргэлжлэх буудалцаанд хүч нь нэмэгдэнэ.", image: "https://deadlock.wiki/wiki/Special:FilePath/Escalating_Resilience.png" },
  { name: "Spiritual Overflow", type: "Spirit", detail: "Буудсан үед charge цуглуулж fire rate, spirit power, spirit lifesteal-ийг өсгөнө.", image: "https://deadlock.wiki/wiki/Special:FilePath/Spiritual_Overflow.png" },
  { name: "Curse", type: "Spirit / Active", detail: "Идэвхжүүлж дайсны хөдөлгөөн болон чадварын хэмнэлийг таслахад ашиглана.", image: "https://deadlock.wiki/wiki/Special:FilePath/Curse.png" },
  { name: "Debuff Remover", type: "Vitality / Active", detail: "Сөрөг эффект цэвэрлэж, crowd control-д орсон үед дахин тоглолтод орох боломж өгнө.", image: "https://deadlock.wiki/wiki/Special:FilePath/Debuff_Remover.png" },
];

export function PatchRadar() {
  return (
    <section className="patch-radar" aria-labelledby="patch-radar-title">
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
                <div className="hero-index">{hero.name.slice(0, 2).toUpperCase()}</div>
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
                <summary><span className="item-number">0{index + 1}</span><img className="item-icon" src={item.image} alt="" loading="lazy" /><strong>{item.name}</strong><span className="summary-plus">+</span></summary>
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
