"use client";

import { useEffect, type ReactNode } from "react";
import { useLanguage } from "./language-provider";
import { DISCORD_URL } from "@/lib/links";

/*
  Beginner guide. Patch бүрт өөрчлөгддөг тоо (lane-ийн тоо, slot-ын тоо г.м.)
  бичихгүй — удаан хугацаанд үнэн хэвээр байх үндсэн механикийг л тайлбарлана.
*/

type Section = { id: string; title: string; body: ReactNode };

const content: Record<
  "mn" | "en",
  { docTitle: string; eyebrow: string; title: string; lead: string; toc: string; next: string; sections: Section[] }
> = {
  mn: {
    docTitle: "Deadlock шинэ тоглогчийн гарын авлага (Монгол) | Deadlock Mongolia",
    eyebrow: "Шинэ тоглогчид",
    title: "Deadlock-ийн үндэс",
    lead: "Deadlock-ийг анх тоглож байгаа бол эндээс эхэл. Soul, lane, item, objective гэж юу болох, эхний тоглолтуудад юуг анхаарахыг энгийнээр тайлбарлалаа.",
    toc: "Агуулга",
    next: "Дараагийн алхам",
    sections: [
      {
        id: "what",
        title: "Deadlock гэж юу вэ?",
        body: (
          <>
            <p>
              Deadlock бол Valve-ийн хийсэн <strong>6v6 MOBA + shooter</strong> тоглоом. Hero бүр буу болон 4
              чадвартай. Зорилго нь lane-ээр түрж дайсны хамгаалалтуудыг нурааж, эцэст нь тэдний баазын{" "}
              <strong>Patron</strong>-ыг устгах.
            </p>
            <p>
              Dota, League of Legends тоглож байсан бол map, lane, item гэдэг ойлголт танил санагдана. Харин энд
              бүх зүйлийг өөрөө онилж буудна, мөн dash, үсрэлт, zipline гээд хөдөлгөөн их чухал.
            </p>
          </>
        ),
      },
      {
        id: "souls",
        title: "Soul — гол валют",
        body: (
          <>
            <p>
              <strong>Soul</strong> бол тоглоомын мөнгө ба туршлага хоёулаа. Soul цуглуулах тусам item авч,
              чадвараа сайжруулна.
            </p>
            <ul>
              <li>
                <strong>Last hit:</strong> Creep (trooper)-ийг сүүлийн цохилтоор албал soul авна.
              </li>
              <li>
                <strong>Soul orb:</strong> Creep үхэхэд дээрээс нь гэрэлтэй бөмбөлөг гарна. Түүнийг буудвал soul-оо
                бүрэн авна. Дайсны orb-ыг буудвал тэдэнд өгөхгүй (<strong>deny</strong>).
              </li>
              <li>
                <strong>Jungle:</strong> Lane хоорондох neutral кампууд, эвдэрдэг хайрцаг, хөшөөнөөс soul гарна.
              </li>
              <li>
                <strong>Hero kill, objective:</strong> Дайсныг алах, хамгаалалт нураах нь их soul өгнө.
              </li>
            </ul>
            <p className="guide-callout">
              Шинэ тоглогчийн хамгийн том алдаа бол soul orb буудахаа мартах. Creep алах бүрт orb-оо буудаж
              дасаарай — энэ нь kill хийхээс ч илүү чухал.
            </p>
          </>
        ),
      },
      {
        id: "lanes",
        title: "Lane ба objective",
        body: (
          <>
            <p>
              Тоглолтын эхэнд баг lane-уудад хуваагдаж, creep-үүдтэйгээ хамт түрнэ. Lane бүрт дайсны хамгаалалтын
              байгууламжууд дарааллаараа байрладаг:
            </p>
            <ol>
              <li>
                <strong>Guardian</strong> — lane-ийн эхний хамгаалагч.
              </li>
              <li>
                <strong>Walker</strong> — том, хүчтэй хамгаалагч. Нураахад багаараа очих хэрэгтэй.
              </li>
              <li>
                <strong>Base Guardian, Shrine</strong> — баазын орцны хамгаалалт.
              </li>
              <li>
                <strong>Patron</strong> — эцсийн зорилго. Үүнийг устгавал ялна.
              </li>
            </ol>
            <p>
              Map-ийн голд <strong>Mid Boss</strong> байдаг. Түүнийг алсан баг <strong>Rejuvenator</strong> авч,
              түр хугацаанд хүчтэй давуу тал олж авна. Мөн <strong>Soul Urn</strong>-ыг заасан газар хүргэвэл бүх
              багт soul өгнө.
            </p>
            <p>
              Lane-ийн хажуугаар явдаг <strong>zipline</strong>-аар хурдан шилжиж болно — base-ээс буцаж ирэхдээ
              заавал ашигла.
            </p>
          </>
        ),
      },
      {
        id: "items",
        title: "Item ба дэлгүүр",
        body: (
          <>
            <p>Item гурван төрөлтэй. Энэ сайт дээр дэлгүүрийн нэрээр нь ангилсан:</p>
            <table className="guide-table">
              <thead>
                <tr>
                  <th>Дэлгүүр</th>
                  <th>Төрөл</th>
                  <th>Юунд зориулсан</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fairfax</td>
                  <td>Weapon</td>
                  <td>Бууны damage, fire rate, сум</td>
                </tr>
                <tr>
                  <td>MPS</td>
                  <td>Vitality</td>
                  <td>HP, хамгаалалт, heal, хурд</td>
                </tr>
                <tr>
                  <td>Curiosity Catalog</td>
                  <td>Spirit</td>
                  <td>Чадварын хүч, cooldown, ability-тэй холбоотой</td>
                </tr>
              </tbody>
            </table>
            <p>Item бүр 4 түвшинтэй, үнэ нь түвшин бүрт хоёр дахин нэмэгдэнэ:</p>
            <table className="guide-table">
              <thead>
                <tr>
                  <th>Түвшин</th>
                  <th>Үнэ</th>
                  <th>Хэзээ авах</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Түвшин 1</td>
                  <td>800</td>
                  <td>Lane-ийн эхэнд</td>
                </tr>
                <tr>
                  <td>Түвшин 2</td>
                  <td>1600</td>
                  <td>Lane дуусах үед</td>
                </tr>
                <tr>
                  <td>Түвшин 3</td>
                  <td>3200</td>
                  <td>Дунд үе, teamfight</td>
                </tr>
                <tr>
                  <td>Түвшин 4</td>
                  <td>6400</td>
                  <td>Late game</td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>
                <strong>Active</strong> item-ийг товч дарж ажиллуулна, <strong>passive</strong> нь өөрөө ажиллана,{" "}
                <strong>imbue</strong> нь сонгосон нэг чадварт тань холбогдоно.
              </li>
              <li>
                Зарим item нь дараагийн түвшний item-ийн <strong>component</strong> байдаг. Component-оо аваад
                байвал upgrade хийхэд хямд болно — item хуудас бүр дээр upgrade замыг харуулсан.
              </li>
              <li>
                Item slot хязгаартай. Зарим нэмэлт (flex) slot objective нураах үед нээгдэнэ. Хуучирсан хямд
                item-ээ зарж том item-д байр гарга.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "abilities",
        title: "Чадвар ба хөдөлгөөн",
        body: (
          <>
            <ul>
              <li>
                Hero бүр <strong>4 чадвартай</strong>, сүүлийнх нь ultimate. Soul цуглуулах тусам{" "}
                <strong>ability point</strong> авч чадвараа нээж, сайжруулна.
              </li>
              <li>
                <strong>Stamina</strong>-аар dash, агаарт үсрэлт хийнэ. Сумнаас бултах, зугтахад хадгалж байгаарай.
              </li>
              <li>
                <strong>Melee</strong> цохилт creep алах, дайсныг гүйцээхэд хэрэгтэй. Heavy melee илүү хүчтэй.
              </li>
              <li>
                <strong>Parry</strong> (анхдагч товч F) — дайсны melee-г яг мөчид нь хаавал тэднийг түр
                гацаана.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "tips",
        title: "Эхний тоглолтын 10 зөвлөгөө",
        body: (
          <ol>
            <li>Creep алах бүрт soul orb-оо буудаж бай.</li>
            <li>Эхний soul-оороо 1–2 хямд item (800) аваад lane-д хүчтэй бай.</li>
            <li>HP бага бол base руу буцахаас бүү ай — zipline-аар хурдан ирнэ.</li>
            <li>Ганцаараа дайсны lane руу гүн бүү ор. Map дээр дайснууд хаана байгааг ажигла.</li>
            <li>Нэг hero-гоор хэдэн тоглолт тогло. Олон hero туршихаас илүү хурдан сурна.</li>
            <li>
              Дайсанд heal их байвал anti-heal (Toxic Bullets, Healbane) ав.{" "}
              <a href="/counter">Counter helper</a> туслана.
            </li>
            <li>Багаараа objective руу хамт яв. Kill-ээс илүү Walker нураах нь тоглолтыг шийднэ.</li>
            <li>Чадваруудынхаа cooldown-ыг мэдэж бай — fight-ийг чадвар бэлэн үедээ эхлүүл.</li>
            <li>Тоглолтын дараа replay эсвэл статистикаа хар — юуг сайжруулахаа ойлгоно.</li>
            <li>
              Хамт тоглох хүн хайж байвал <a href={DISCORD_URL}>Deadlock Mongolia Discord</a>-д нэгд.
            </li>
          </ol>
        ),
      },
    ],
  },
  en: {
    docTitle: "Deadlock beginner guide | Deadlock Mongolia",
    eyebrow: "New players",
    title: "Deadlock basics",
    lead: "New to Deadlock? Start here. A plain-language overview of souls, lanes, items and objectives, plus what to focus on in your first games.",
    toc: "Contents",
    next: "What next",
    sections: [
      {
        id: "what",
        title: "What is Deadlock?",
        body: (
          <>
            <p>
              Deadlock is Valve&apos;s <strong>6v6 MOBA shooter</strong>. Every hero has a gun and four abilities.
              You push lanes, destroy the enemy&apos;s defenses and finally take down their <strong>Patron</strong>{" "}
              to win.
            </p>
            <p>
              If you&apos;ve played Dota or League, lanes and items will feel familiar — but here you aim every
              shot yourself, and movement (dashes, jumps, ziplines) matters a lot.
            </p>
          </>
        ),
      },
      {
        id: "souls",
        title: "Souls — the main currency",
        body: (
          <>
            <p>
              <strong>Souls</strong> are both your gold and your experience. The more you collect, the more items
              you can buy and the stronger your abilities get.
            </p>
            <ul>
              <li>
                <strong>Last hits:</strong> Get the killing blow on troopers to earn souls.
              </li>
              <li>
                <strong>Soul orbs:</strong> When a trooper dies, a glowing orb pops out. Shoot it to secure the full
                souls. Shooting the enemy&apos;s orbs <strong>denies</strong> them.
              </li>
              <li>
                <strong>Jungle:</strong> Neutral camps, breakable crates and statues between lanes drop souls.
              </li>
              <li>
                <strong>Kills and objectives:</strong> Killing heroes and destroying defenses pays out big.
              </li>
            </ul>
            <p className="guide-callout">
              The #1 beginner mistake is forgetting to shoot soul orbs. Make it a habit on every last hit — it&apos;s
              worth more than chasing kills.
            </p>
          </>
        ),
      },
      {
        id: "lanes",
        title: "Lanes and objectives",
        body: (
          <>
            <p>Teams split into lanes at the start and push alongside their troopers. Each lane has defenses in order:</p>
            <ol>
              <li>
                <strong>Guardian</strong> — the first defender in a lane.
              </li>
              <li>
                <strong>Walker</strong> — a big, tough defender. Bring your team.
              </li>
              <li>
                <strong>Base Guardians and Shrines</strong> — the base entrance.
              </li>
              <li>
                <strong>Patron</strong> — the final objective. Destroy it to win.
              </li>
            </ol>
            <p>
              The <strong>Mid Boss</strong> sits in the middle of the map; the team that kills it gets the{" "}
              <strong>Rejuvenator</strong> and a temporary edge. Delivering the <strong>Soul Urn</strong> gives your
              whole team souls.
            </p>
            <p>
              <strong>Ziplines</strong> run along the lanes — always use them to get back from base quickly.
            </p>
          </>
        ),
      },
      {
        id: "items",
        title: "Items and shops",
        body: (
          <>
            <p>There are three item types. This site groups them by shop name:</p>
            <table className="guide-table">
              <thead>
                <tr>
                  <th>Shop</th>
                  <th>Type</th>
                  <th>For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fairfax</td>
                  <td>Weapon</td>
                  <td>Gun damage, fire rate, ammo</td>
                </tr>
                <tr>
                  <td>MPS</td>
                  <td>Vitality</td>
                  <td>Health, defense, healing, speed</td>
                </tr>
                <tr>
                  <td>Curiosity Catalog</td>
                  <td>Spirit</td>
                  <td>Ability power, cooldowns, ability effects</td>
                </tr>
              </tbody>
            </table>
            <p>Items come in four tiers, each costing double the last:</p>
            <table className="guide-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Cost</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tier 1</td>
                  <td>800</td>
                  <td>Early lane</td>
                </tr>
                <tr>
                  <td>Tier 2</td>
                  <td>1600</td>
                  <td>End of laning</td>
                </tr>
                <tr>
                  <td>Tier 3</td>
                  <td>3200</td>
                  <td>Mid game, teamfights</td>
                </tr>
                <tr>
                  <td>Tier 4</td>
                  <td>6400</td>
                  <td>Late game</td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>
                <strong>Active</strong> items are pressed, <strong>passive</strong> items are always on, and{" "}
                <strong>imbue</strong> items attach to one ability you choose.
              </li>
              <li>
                Some items are <strong>components</strong> of higher-tier items — owning the component makes the
                upgrade cheaper. Every item page shows its upgrade path.
              </li>
              <li>
                Item slots are limited; extra flex slots unlock as you destroy objectives. Sell outdated cheap items
                to make room.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "abilities",
        title: "Abilities and movement",
        body: (
          <ul>
            <li>
              Every hero has <strong>four abilities</strong>; the last is the ultimate. Collecting souls grants{" "}
              <strong>ability points</strong> to unlock and upgrade them.
            </li>
            <li>
              <strong>Stamina</strong> powers dashes and air jumps — save some for dodging and escaping.
            </li>
            <li>
              <strong>Melee</strong> is great for last hits and finishing enemies; heavy melee hits harder.
            </li>
            <li>
              <strong>Parry</strong> (F by default) — time it right against an enemy melee to stun them briefly.
            </li>
          </ul>
        ),
      },
      {
        id: "tips",
        title: "10 tips for your first games",
        body: (
          <ol>
            <li>Shoot the soul orb on every last hit.</li>
            <li>Spend your first souls on one or two cheap (800) items to win lane.</li>
            <li>Don&apos;t be afraid to go back to base at low HP — ziplines get you back fast.</li>
            <li>Don&apos;t wander deep into enemy lanes alone. Keep an eye on the map.</li>
            <li>Stick with one hero for a few games — you&apos;ll learn faster than by switching.</li>
            <li>
              If the enemy heals a lot, buy anti-heal (Toxic Bullets, Healbane). The{" "}
              <a href="/counter">counter helper</a> can help.
            </li>
            <li>Group up for objectives. Taking a Walker wins more games than a kill.</li>
            <li>Know your cooldowns — start fights when your abilities are ready.</li>
            <li>Check your stats or replay after a game to see what to improve.</li>
            <li>
              Looking for teammates? Join the <a href={DISCORD_URL}>Deadlock Mongolia Discord</a>.
            </li>
          </ol>
        ),
      },
    ],
  },
};

const nextLinks = {
  mn: [
    { href: "/#catalog", title: "Item каталог", text: "Item бүрийн тайлбар" },
    { href: "/counter", title: "Counter helper", text: "Дайсандаа юу авах вэ" },
    { href: "/#build", title: "Build generator", text: "Hero-доо тохирох build" },
  ],
  en: [
    { href: "/#catalog", title: "Item catalog", text: "Every item explained" },
    { href: "/counter", title: "Counter helper", text: "What to buy vs the enemy" },
    { href: "/#build", title: "Build generator", text: "A build for your hero" },
  ],
};

export function GuideContent() {
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    document.title = t.docTitle;
  }, [t.docTitle]);

  return (
    <main className="guide-page" data-no-translate>
      <p className="eyebrow">{t.eyebrow}</p>
      <h1 className="guide-title">{t.title}</h1>
      <p className="guide-lead">{t.lead}</p>

      <div className="guide-layout">
        <nav className="legal-toc" aria-label={t.toc}>
          <p>{t.toc}</p>
          {t.sections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {section.title}
            </a>
          ))}
        </nav>

        <div className="guide-body">
          {t.sections.map((section, index) => (
            <section key={section.id} id={section.id}>
              <h2>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.body}
            </section>
          ))}
          <section>
            <h2>{t.next}</h2>
            <div className="guide-next">
              {nextLinks[language].map((link) => (
                <a key={link.href} href={link.href}>
                  <strong>{link.title}</strong>
                  <span>{link.text}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
