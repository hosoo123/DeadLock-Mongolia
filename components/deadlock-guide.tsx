import Script from "next/script";
import { PatchRadar } from "./patch-radar";
import { PlayerStats } from "./player-stats";
import { ItemCatalog } from "./item-catalog";
import { ITEMS, SHOPS } from "@/lib/items";
import { DISCORD_URL } from "@/lib/links";

const WIRE_SUPPORT_URL =
  "https://pay.wire.mn/link/plink_krd6jmuhq3y6mrrkog7o43mvne";

/*
  The markup strings below are static HTML that public/deadlock-app.js wires up
  by id (heroPicker, generateBuild, buildOutput, backToTop…). Keep those ids
  intact when editing. The item catalog itself is the React <ItemCatalog />.
*/

const heroMarkup = `
  <section class="home-hero" aria-labelledby="homeTitle">
    <div class="home-hero-copy">
      <nav class="game-switcher" aria-label="Тоглоом сонгох">
        <button class="game-pill active" type="button" aria-current="page">Deadlock</button>
        <button class="game-pill soon" type="button" disabled>Valorant <small>soon</small></button>
        <button class="game-pill soon" type="button" disabled>CS2 <small>soon</small></button>
      </nav>
      <p class="eyebrow">Deadlock · Монгол гарын авлага</p>
      <h1 id="homeTitle">Item тайлбар</h1>
      <p class="home-hero-lead">
        Item бүр юу хийдэг, хэзээ авах, ямар hero-д тохирохыг монголоор
        энгийнээр тайлбарлана. Hero-гоо сонгоод бодит тоглолтын дата дээр
        суурилсан build аваарай.
      </p>
      <div class="home-hero-ctas">
        <a class="btn btn-primary" href="#catalog">Item хайх</a>
        <a class="btn btn-ghost" href="#build">Build гаргах</a>
      </div>
    </div>
    <ol class="home-steps" aria-label="Хэрхэн ашиглах вэ">
      <li>
        <span class="step-num">1</span>
        <div><strong>Дэлгүүрээ сонго</strong><p>Fairfax, MPS эсвэл Curiosity Catalog.</p></div>
      </li>
      <li>
        <span class="step-num">2</span>
        <div><strong>Item дээр дар</strong><p>Нэрээр хайх эсвэл түвшингээр шүүх боломжтой.</p></div>
      </li>
      <li>
        <span class="step-num">3</span>
        <div><strong>Тайлбараа унш</strong><p>Хэзээ авах, хэрхэн ашиглах, ямар hero-д тохирох.</p></div>
      </li>
    </ol>
  </section>
`;

const buildMarkup = `
  <section class="home-section build-section" id="build" aria-labelledby="metaBuilderTitle">
    <div class="meta-builder">
      <div class="meta-builder-head">
        <div>
          <p class="eyebrow"><span>02</span> Live meta · Сүүлийн 30 хоног</p>
          <h2 id="metaBuilderTitle">Hero-доо тохирох build</h2>
          <p class="meta-builder-copy">
            Hero-гоо сонгоход сүүлийн 30 хоногийн бодит тоглолтуудаас хамгийн их
            авсан, хамгийн их хожсон item-уудыг харьцуулж, lane-аас late game
            хүртэлх build санал болгоно.
          </p>
        </div>
        <div class="api-status" id="apiStatus">Шинэ мэдээлэл шалгаж байна…</div>
      </div>
      <div class="meta-controls">
        <select class="hero-select visually-hidden" id="heroSelect" aria-label="Hero сонгох">
          <option value="">Hero мэдээлэл ачаалж байна…</option>
        </select>
        <div class="hero-picker" id="heroPicker" aria-label="Зургаар hero сонгох"></div>
        <button class="generate-build" id="generateBuild" type="button" disabled>Build гаргах</button>
      </div>
      <div class="build-output" id="buildOutput" aria-live="polite"></div>
    </div>
  </section>
`;

const communityMarkup = `
  <section class="home-section community-section" aria-labelledby="communityTitle">
    <div class="community-card">
      <div>
        <p class="eyebrow">Community 🇲🇳</p>
        <h2 id="communityTitle">Deadlock Mongolia Discord</h2>
        <p>
          Монгол тоглогчидтой танилцаж, хамт тоглох хүн олох, build болон
          item-ийн мэдээлэл солилцох community-д нэгдээрэй.
        </p>
      </div>
      <a class="btn btn-discord" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer"
        aria-label="Deadlock Mongolia Discord серверт нэгдэх">Discord-д нэгдэх</a>
    </div>
  </section>
`;

const overlayMarkup = `
  <button class="back-to-top" id="backToTop" type="button" aria-label="Хуудасны эхэнд очих" title="Дээш очих">↑</button>
`;

// Minimal item list for the vanilla build generator (public/deadlock-app.js).
const API_NAME: Record<string, string> = { "Armor Piercing Rounds": "Armor Piercer" };
const itemDataScript = `window.ITEM_DATA=${JSON.stringify(
  Object.fromEntries(
    SHOPS.map((shop) => [
      shop.key,
      {
        label: shop.label,
        items: ITEMS.filter((item) => item.shop === shop.key).map((item) => ({
          n: item.name,
          t: item.tier,
          slug: item.slug,
          ...(API_NAME[item.name] ? { alias: API_NAME[item.name] } : {}),
        })),
      },
    ]),
  ),
).replace(/</g, "\\u003c")};`;

function Markup({ html }: { html: string }) {
  return (
    <div
      className="markup-block"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}

export function DeadlockGuide() {
  return (
    <main className="site-root home">
      <Markup html={heroMarkup} />
      <section className="home-section catalog-section" id="catalog" aria-labelledby="catalogTitle">
        <div className="section-head">
          <p className="eyebrow">
            <span>01</span> Item каталог
          </p>
          <h2 id="catalogTitle">Бүх item нэг дор</h2>
          <p>Дэлгүүр болон түвшингээр шүүгээд item дээр дарж дэлгэрэнгүй тайлбарыг харна.</p>
        </div>
        <ItemCatalog />
      </section>
      <section className="home-section tools-section" aria-label="Tools">
        <div className="tools-grid">
          <a className="tool-card" href="/heroes">
            <div>
              <p className="eyebrow">Phantom+ meta</p>
              <h3>Hero бүрийн build</h3>
              <p>Өндөр rank-ийн тоглогчид юу авч, хэнийг хэцүү гэж үздэгийг бодит датагаар.</p>
            </div>
            <span className="tool-arrow" aria-hidden="true">→</span>
          </a>
          <a className="tool-card" href="/counter">
            <div>
              <p className="eyebrow">Counter helper</p>
              <h3>Дайсандаа юу авах вэ?</h3>
              <p>Дайсны hero-уудыг сонгоход эсрэг нь авах item-уудыг тайлбартай нь санал болгоно.</p>
            </div>
            <span className="tool-arrow" aria-hidden="true">→</span>
          </a>
          <a className="tool-card" href="/crosshair">
            <div>
              <p className="eyebrow">Crosshair</p>
              <h3>Crosshair builder</h3>
              <p>Crosshair-аа тохируулаад тоглоомд шууд оруулах code аваарай.</p>
            </div>
            <span className="tool-arrow" aria-hidden="true">→</span>
          </a>
          <a className="tool-card" href="/guide">
            <div>
              <p className="eyebrow">Шинэ тоглогчид</p>
              <h3>Deadlock-ийн үндэс</h3>
              <p>Soul, lane, item slot, objective — эхлэхэд хэрэгтэй бүх зүйл монголоор.</p>
            </div>
            <span className="tool-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      <Markup html={buildMarkup} />
      <PatchRadar />
      <PlayerStats />
      <Markup html={communityMarkup} />
      <Markup html={overlayMarkup} />
      <a
        className="wire-float"
        href={WIRE_SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Deadlock Mongolia-г Wire QPay-аар хүссэн дүнгээр дэмжих"
      >
        <span className="wire-float-brand">QPay</span>
        <strong>Дэмжлэг өгөх</strong>
      </a>
      <script dangerouslySetInnerHTML={{ __html: itemDataScript }} />
      <Script src="/deadlock-app.js" strategy="afterInteractive" />
    </main>
  );
}
