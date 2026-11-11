"use client";

import { useEffect } from "react";
import { useLanguage } from "./language-provider";
import { DISCORD_URL } from "@/lib/links";

const UPDATED = "2026-11-11";

type Section = { id: string; title: string; body: React.ReactNode };

const content: Record<
  "mn" | "en",
  { title: string; docTitle: string; intro: string; updated: string; toc: string; back: string; sections: Section[] }
> = {
  mn: {
    title: "Нууцлалын бодлого",
    docTitle: "Нууцлалын бодлого — Deadlock Mongolia",
    intro:
      "Deadlock Mongolia нь бүртгэлгүйгээр ашиглах боломжтой fan сайт. Steam-ээр нэвтрэх нь зөвхөн тохиргоогоо хадгалах, хуваалцахыг хүсвэл л хэрэгтэй. Бид аль болох бага мэдээлэл цуглуулахыг зорьдог. Доор ямар мэдээлэл, яагаад, хэрхэн ашиглагддагийг энгийнээр тайлбарлалаа.",
    updated: "Сүүлд шинэчилсэн",
    toc: "Агуулга",
    back: "← Нүүр хуудас руу буцах",
    sections: [
      {
        id: "summary",
        title: "Товчхондоо",
        body: (
          <ul>
            <li>Нууц үг, имэйл хадгалдаггүй. Steam-ээр нэвтрэх нь сонголттой.</li>
            <li>Профайл тань анхдагчаар нууц — өөрөө асаасан үед л бусдад харагдана.</li>
            <li>Бид таны мэдээллийг зарахгүй, зар сурталчилгаанд ашиглахгүй.</li>
            <li>Зөвхөн дэмжлэг үзүүлэх үед л имэйл хаягаа өгнө.</li>
            <li>Хэлний сонголт, түр cache таны browser дотор л хадгалагдана.</li>
          </ul>
        ),
      },
      {
        id: "collect",
        title: "Бид ямар мэдээлэл авдаг вэ",
        body: (
          <>
            <h3>Хандалтын статистик</h3>
            <p>
              Сайтын ачааллыг ойлгохын тулд Vercel Analytics ашигладаг. Энэ нь cookie
              ашигладаггүй бөгөөд хуудас үзсэн тоо, улс, төхөөрөмжийн төрөл зэрэг
              нэргүй (anonymous) нийлбэр мэдээлэл цуглуулна. Таныг хувь хүнээр нь
              танихгүй.
            </p>
            <h3>Тоглогчийн хайлт</h3>
            <p>
              Тоглогчийн статистик хэсэгт оруулсан Steam нэр, Account ID эсвэл профайл
              холбоосыг зөвхөн тухайн хайлтыг гүйцэтгэхэд ашиглана. Бид хүсэлтийг
              Deadlock API болон Steam руу дамжуулдаг бөгөөд хайлтын түүхийг
              хадгалдаггүй. Харагдаж буй бүх статистик нь Steam дээр нийтэд нээлттэй
              мэдээлэл юм.
            </p>
            <h3>Дэмжлэг ба төлбөр</h3>
            <p>
              Дэмжлэг үзүүлэхдээ имэйл хаяг болон дүнгээ оруулна. Имэйлийг төлбөрийн
              баталгаа ба талархлын захидал илгээхэд л ашиглана. Төлбөрийг Wire
              (QPay) боловсруулдаг — картын болон банкны мэдээлэл манай сервер дээр
              хэзээ ч ирдэггүй.
            </p>
          </>
        ),
      },
      {
        id: "storage",
        title: "Browser-т хадгалагдах зүйлс",
        body: (
          <p>
            Таны сонгосон хэл (MN / EN) болон hero, item-ийн мэдээллийн түр cache-ийг
            browser-ийн <code>localStorage</code>-д хадгална. Энэ нь сайтыг хурдан
            ачаалуулахад зориулагдсан бөгөөд манай сервер рүү илгээгддэггүй. Browser-ийн
            тохиргооноос хүссэн үедээ устгаж болно.
          </p>
        ),
      },
      {
        id: "steam-login",
        title: "Steam-ээр нэвтрэх ба профайл",
        body: (
          <>
            <p>
              Steam-ээр нэвтрэхэд Steam бидэнд зөвхөн таны Steam ID-г өгнө — нууц үг, имэйл, тоглоомын тохиргоо
              хэзээ ч ирэхгүй. Бид дараах зүйлсийг Neon Postgres database-д хадгална:
            </p>
            <ul>
              <li>Steam ID, Steam-ийн нийтийн нэр, avatar</li>
              <li>Таны өөрөө оруулсан тохиргоо: crosshair code, sensitivity, DPI, FOV, resolution, хулгана, гол hero, товч тайлбар</li>
              <li>«Нийтэд харуулах», «Монгол тоглогч» гэсэн таны сонголт</li>
            </ul>
            <p>
              Нэвтрэлтийг хадгалахын тулд 30 хоног хүчинтэй, гарын үсэгтэй нэг cookie ашиглана. Үүнийг tracking,
              зар сурталчилгаанд ашиглахгүй. «Миний профайл» хуудаснаас хүссэн үедээ бүх датагаа бүрмөсөн устгаж
              болно.
            </p>
          </>
        ),
      },
      {
        id: "leaderboard",
        title: "Монгол тоглогчдын leaderboard",
        body: (
          <p>
            Монгол жагсаалтад зөвхөн профайлаа нийтэд харуулж, «Би Монгол тоглогч» гэдгийг өөрөө асаасан эсвэл
            Discord-оор хүсэлт гаргасан тоглогчид орно. Тэнд Steam-ийн нийтийн нэр, avatar, Deadlock rank болон
            сүүлийн 30 хоногийн тоглолтын тоо, win rate харагдана — бүгд Steam болон Deadlock API дээр нийтэд
            нээлттэй мэдээлэл. Тохиргоогоо унтраавал эсвэл датагаа устгавал жагсаалтаас автоматаар гарна.
          </p>
        ),
      },
      {
        id: "third-party",
        title: "Гуравдагч талын үйлчилгээ",
        body: (
          <ul>
            <li>
              <strong>Vercel</strong> — сайт байршуулалт ба нэргүй статистик
            </li>
            <li>
              <strong>Deadlock API</strong> (deadlock-api.com) — hero, item, тоглолтын
              мэдээлэл
            </li>
            <li>
              <strong>Steam</strong> — тоглогчийн нийтийн профайл
            </li>
            <li>
              <strong>Wire / QPay</strong> — төлбөр боловсруулалт
            </li>
            <li>
              <strong>Google Fonts</strong> — үсгийн фонт
            </li>
          </ul>
        ),
      },
      {
        id: "rights",
        title: "Таны эрх",
        body: (
          <p>
            Дэмжлэг үзүүлэхдээ өгсөн имэйлээ устгуулах, эсвэл бидэнд байгаа мэдээллийн
            талаар асуух бол доорх холбоосоор холбогдоорой. Бид боломжит хурдан
            хугацаанд хариу өгнө.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Холбоо барих",
        body: (
          <p>
            Асуулт байвал{" "}
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              Deadlock Mongolia Discord
            </a>{" "}
            эсвэл{" "}
            <a
              href="https://www.facebook.com/m.hosanna0129/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            -ээр бичээрэй. Энэ бодлого өөрчлөгдвөл энэ хуудсанд шинэчилнэ.
          </p>
        ),
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    docTitle: "Privacy Policy — Deadlock Mongolia",
    intro:
      "Deadlock Mongolia is a fan site you can use without an account. Signing in with Steam is only needed if you want to save and share your settings. We try to collect as little as possible. Here is what we collect, why, and how it is used.",
    updated: "Last updated",
    toc: "Contents",
    back: "← Back to home",
    sections: [
      {
        id: "summary",
        title: "In short",
        body: (
          <ul>
            <li>We never store passwords or emails. Steam sign-in is optional.</li>
            <li>Your profile is private by default and only visible to others if you turn it on.</li>
            <li>We never sell your data or use it for advertising.</li>
            <li>You only share an email address if you choose to support the project.</li>
            <li>Your language choice and a short data cache stay in your browser.</li>
          </ul>
        ),
      },
      {
        id: "collect",
        title: "What we collect",
        body: (
          <>
            <h3>Usage analytics</h3>
            <p>
              We use Vercel Analytics to understand traffic. It does not use cookies and
              only records anonymous, aggregated data such as page views, country and
              device type. It does not identify you personally.
            </p>
            <h3>Player search</h3>
            <p>
              The Steam name, Account ID or profile link you enter in Player Stats is
              used only to run that search. We forward the request to the Deadlock API
              and Steam and do not keep a search history. All stats shown are public
              Steam data.
            </p>
            <h3>Support payments</h3>
            <p>
              When you support the project you enter an email and an amount. The email
              is used only for the payment confirmation and a thank-you message.
              Payments are processed by Wire (QPay); card and bank details never reach
              our servers.
            </p>
          </>
        ),
      },
      {
        id: "storage",
        title: "Stored in your browser",
        body: (
          <p>
            Your language (MN / EN) and a temporary cache of hero and item data are kept
            in your browser&apos;s <code>localStorage</code> so the site loads faster. This
            is never sent to our servers, and you can clear it any time in your browser
            settings.
          </p>
        ),
      },
      {
        id: "steam-login",
        title: "Steam sign-in and profiles",
        body: (
          <>
            <p>
              When you sign in with Steam, Steam only tells us your Steam ID — never your password, email or game
              settings. We store the following in a Neon Postgres database:
            </p>
            <ul>
              <li>Your Steam ID, public Steam name and avatar</li>
              <li>Settings you enter yourself: crosshair code, sensitivity, DPI, FOV, resolution, mouse, main hero, a short note</li>
              <li>Your choices for “public profile” and “Mongolian player”</li>
            </ul>
            <p>
              A single signed cookie, valid for 30 days, keeps you signed in. It is not used for tracking or
              advertising. You can permanently delete all of your data from the My profile page at any time.
            </p>
          </>
        ),
      },
      {
        id: "leaderboard",
        title: "Mongolian player leaderboard",
        body: (
          <p>
            Only players who made their profile public and turned on “I'm a Mongolian player”, or who asked us on
            Discord, appear in the Mongolian list. It shows your public Steam name, avatar, Deadlock rank and your match
            count and win rate over the last 30 days — all public data from Steam and the Deadlock API. Turn the setting
            off or delete your data and you leave the list automatically.
          </p>
        ),
      },
      {
        id: "third-party",
        title: "Third-party services",
        body: (
          <ul>
            <li>
              <strong>Vercel</strong> — hosting and anonymous analytics
            </li>
            <li>
              <strong>Deadlock API</strong> (deadlock-api.com) — hero, item and match data
            </li>
            <li>
              <strong>Steam</strong> — public player profiles
            </li>
            <li>
              <strong>Wire / QPay</strong> — payment processing
            </li>
            <li>
              <strong>Google Fonts</strong> — web fonts
            </li>
          </ul>
        ),
      },
      {
        id: "rights",
        title: "Your rights",
        body: (
          <p>
            To have the email you gave us deleted, or to ask what we hold about you,
            reach out through the links below and we will respond as soon as we can.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Contact",
        body: (
          <p>
            Questions? Message us on the{" "}
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              Deadlock Mongolia Discord
            </a>{" "}
            or{" "}
            <a
              href="https://www.facebook.com/m.hosanna0129/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            . If this policy changes, we will update this page.
          </p>
        ),
      },
    ],
  },
};

export function PrivacyContent() {
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    document.title = t.docTitle;
  }, [t.docTitle]);

  return (
    <main className="legal-page" data-no-translate>
      <div className="legal-hero">
        <p className="eyebrow">Deadlock Mongolia · Legal</p>
        <h1>{t.title}</h1>
        <p className="legal-intro">{t.intro}</p>
        <p className="legal-updated">
          {t.updated}: <time dateTime={UPDATED}>{UPDATED}</time>
        </p>
      </div>

      <div className="legal-layout">
        <nav className="legal-toc" aria-label={t.toc}>
          <p>{t.toc}</p>
          {t.sections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {section.title}
            </a>
          ))}
        </nav>

        <div className="legal-body">
          {t.sections.map((section, index) => (
            <section key={section.id} id={section.id}>
              <h2>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.body}
            </section>
          ))}
          <a className="legal-back" href="/">
            {t.back}
          </a>
        </div>
      </div>
    </main>
  );
}
