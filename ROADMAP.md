# Deadlock Mongolia — Дараагийн алхмууд

> Сүүлд шинэчилсэн: 2026-11-11
> Сайт: https://dead-lock-mongolia.vercel.app

Энэ файлд сайтын одоогийн байдал, хийх ёстой зүйлс, сайжруулах санаануудыг чухлаас нь эхлээд жагсаалаа.

**Тэмдэглэгээ**
- **Хэн:** 👤 Чи (account, шийдвэр шаардлагатай) · 🤖 Claude (код)
- **Хэмжээ:** 🟢 Бага (< 1 цаг) · 🟡 Дунд (хагас өдөр) · 🔴 Их (1+ өдөр)

---

## ✅ Одоо байгаа зүйлс

| Хэсэг | Хаяг |
|---|---|
| Item каталог (156 item, MN/EN тайлбар) | `/` , `/items/[нэр]` |
| Hero хуудсууд (Phantom+ build, matchup) | `/heroes`, `/heroes/[нэр]` |
| Counter helper | `/counter` |
| Top тоглогчид + Монгол leaderboard | `/pro` |
| Crosshair builder + тоглогчдын gallery | `/crosshair` |
| Шинэ тоглогчийн гарын авлага | `/guide` |
| Steam login + профайл | `/me`, `/players/[id]` |
| Нууцлалын бодлого | `/privacy` |
| Шалгах хуудас | `/api/health` |
| Google Search Console | Баталгаажсан, sitemap илгээсэн |

---

## 🚨 1. Яаралтай (энэ долоо хоногт)

### 1.1 ✅ Аюулгүй байдлын шинэчлэлт — 🤖 🟢 *(2026-11-13 дууссан)*
`npm audit` 5 цоорхой олсон байсан (1 critical, 3 high, 1 moderate). **Одоо 0.**
- `npm audit fix`: next 15.5.25 → 15.5.29, nodemailer → 10.5.0, sharp, source-map-js
- Next.js дотор ашиглагддаг postcss-ийг `package.json`-ийн `overrides`-аар 8.5.32 болгосон (Next 16 руу шилжихгүйгээр засах арга). Next 16 руу шилжихэд (§4.5) энэ override-ийг устгаж болно.
- Build, 17 end-to-end шалгалт бүгд давсан.

### 1.2 Steam login-ийг жинхэнэ сайт дээр турших — 👤 🟢
1. https://dead-lock-mongolia.vercel.app/me → "Steam-ээр нэвтрэх"
2. Crosshair code, sensitivity-гээ оруулаад хадгал
3. "Нийтэд харуулах", "Монгол тоглогч" сонголтуудыг асаагаад `/pro` дээр өөрийгөө харагдаж байгаа эсэхийг шалга

Алдаа гарвал Claude-д screenshot явуул.

### 1.3 Vercel дээрх илүүдэл secret-ийг устгах — 👤 🟢
Шалгалт хийх үед "Protection Bypass for Automation" secret санаандгүй нэмэгдсэн. Аюул учруулахгүй ч хэрэггүй тул:
Vercel → dead-lock-mongolia → **Settings → Deployment Protection → Protection Bypass for Automation → Revoke**

### 1.4 Discord-д зарлах — 👤 🟢
Тоглогчид Steam-ээр нэвтэрч, профайлаа нийтэд харуулахад л Монгол leaderboard-д орно.

```
🇲🇳 Deadlock Mongolia шинэчлэгдлээ!

• Item бүрийн тайлбар монголоор
• Hero бүрийн өндөр rank-ийн build
• Дайсандаа юу авахаа олох Counter helper
• Crosshair builder
• Монгол тоглогчдын leaderboard

Steam-ээрээ нэвтэрч профайлаа үүсгээд leaderboard-д ороорой:
👉 https://dead-lock-mongolia.vercel.app/me
```

---

## 📅 2. Patch бүрийн дараа хийх (тогтмол ажил)

Шинэ Deadlock patch гарах бүрт:

| # | Ажил | Хэн | Команд / файл |
|---|---|---|---|
| 1 | Item өгөгдлийг шинэчлэх | 🤖 | `scripts/sync-deadlock-asset-data.ps1` |
| 2 | Item stat-уудыг шинэчлэх | 🤖 | `node scripts/build-item-stats.mjs` |
| 3 | "Хэнд тохирох" hero датаг шинэчлэх | 🤖 | `node scripts/build-item-heroes.mjs` |
| 4 | Шинэ item байвал MN/EN тайлбар бичих | 🤖 | `lib/item-copy.ts` (тайлбаргүй item байвал build зогсох тул мартагдахгүй) |
| 5 | Шинэ hero байвал зураг, counter тэмдэглэгээ нэмэх | 🤖 | `public/heroes/`, `lib/counters.ts` |
| 6 | Patch radar-ийн монгол товчлолыг шинэчлэх | 🤖 | `lib/patch-notes.ts` |

> Patch radar товчлол хоцорвол сайт өөрөө "Шинэ patch гарсан" гэж харуулна.
> Hero хуудаснууд (6 цаг), leaderboard (10 мин) API-аас **автоматаар** шинэчлэгддэг.

**Санаа:** 2, 3-р алхмыг GitHub Actions-ээр долоо хоног бүр автоматаар ажиллуулж болно (§4.6).

---

## ⭐ 3. Тоглогчдод хамгийн их ашигтай сайжруулалтууд

### 3.1 Өөрийн домэйн (жишээ нь `deadlock.mn`) — 👤🤖 🟢
- `dead-lock-mongolia.vercel.app`-аас илүү санахад амар, итгэл төрүүлнэ, Google-д ч илүү.
- Чи домэйн худалдаж авна → Claude Vercel-д холбож, sitemap, canonical URL-уудыг шинэчилнэ.

### 3.2 Hero хуудсанд ability-ийн дараалал — 🤖 🟡
- "Аль чадвараа эхэлж максладаг вэ" гэдгийг Phantom+ датагаар харуулах. API-д `ability-order-stats` бий.
- Ability бүрийн товч монгол тайлбар.

### 3.3 Counter helper-ийг бодит датад суурилуулах — 🤖 🟡
- Одоо hero бүрийн "аюул"-ыг (heal, CC…) гараар тэмдэглэсэн (`lib/counters.ts`).
- API-ийн `hero-counter-stats` болон `item-stats`-аар "энэ hero-гийн эсрэг тоглоход аль item-ийн win rate хамгийн их өсдөг вэ" гэдгийг бодитоор тооцож болно.

### 3.4 Хамт тоглох хүн хайх (LFG) — 🤖 🔴
- Профайл дээр "одоо тоглохоор хүн хайж байна", rank, гол hero, тоглодог цаг.
- `/lfg` хуудсанд Монгол тоглогчдыг rank-аар нь шүүх.
- Steam login болон database бэлэн тул суурь нь байгаа.

### 3.5 Профайлд нэмэх зүйлс — 🤖 🟡
- Discord нэр (хамт тоглох хүн олоход)
- Дуртай build (тоглоом доторх build ID)
- Keybind-ууд
- Профайл хуудсыг хуваалцах OG зураг (crosshair + rank)

### 3.6 Pro тоглогчдын crosshair — 👤 🟢
- Twitch чат дээр `!crosshair` гэж бичихэд pro тоглогчид code-оо гаргадаг.
- Code болон Twitch линкийг Claude-д явуулбал `lib/crosshairs.ts`-д эх сурвалжтай нь нэмнэ.

### 3.7 Монгол тоглогчдоор тайлбаруудыг шалгуулах — 👤 🟡
- 156 item-ийн тайлбарыг Discord-ийн туршлагатай тоглогчдоор уншуулж, нэр томьёо болон механикийн алдааг засах.
- Ялангуяа шинэ hero-ууд (Mina, Billy, Graves, Rat King…) дээрх counter тэмдэглэгээ.

---

## 🛠 4. Техникийн сайжруулалт (сайтыг найдвартай болгох)

### 4.1 Preview болон Production-д тусдаа database — 👤🤖 🟢
- Одоо preview deploy дээр нэвтрэхэд жинхэнэ database-д бичигдэнэ.
- Neon-ийн branch ашиглаж preview бүрт тусдаа database өгөх (Neon ↔ Vercel integration).

### 4.2 Build generator-ийг React руу шилжүүлэх — 🤖 🟡
- `public/deadlock-app.js` (596 мөр) нь хуучин JavaScript хэвээр.
- Үүнтэй холбоотойгоор `components/language-provider.tsx` хуудсыг ажиглаж текст солих (MutationObserver) аргаар орчуулдаг. Энэ нь эмзэг, удаан.
- React руу шилжүүлбэл орчуулга шууд, найдвартай болно, хуучин кодыг устгаж болно.

### 4.3 Хуучин CSS цэвэрлэх — 🤖 🟡
- `app/globals.css` 2596 мөртэй, ихэнх нь одоо ашиглагдахгүй хуучин дүрэм (хуучин modal, хандив, хуучин header).
- Цэвэрлэвэл сайт хурдан ачаалагдаж, засахад амар болно.

### 4.4 Автомат тест + GitHub Actions — 🤖 🟡
- Steam login, профайл, leaderboard-ийн 17 шалгалт одоо гараар л ажилладаг.
- Push бүрт typecheck, build болон эдгээр шалгалтыг автоматаар ажиллуулах.

### 4.5 Next.js 16 руу шинэчлэх — 🤖 🟡
- Одоо 15.5. Шинэ хувилбар нь хурд, кэшийн сайжруулалттай.
- §1.1-ийн дараа хийх.

### 4.6 Өгөгдлийг долоо хоног бүр автоматаар шинэчлэх — 🤖 🟡
- GitHub Actions cron: `build-item-heroes.mjs`-ийг ажиллуулж, өөрчлөлт гарвал commit хийнэ → Vercel автоматаар deploy хийнэ.

### 4.7 Хамгаалалт — 🤖 🟢
- `/api/me`, `/api/players`-д rate limit (Vercel Firewall).
- `/api/health`-ийг uptime monitor-т холбох (сайт унавал мэдэгдэл ирнэ).

### 4.8 Хурдны сайжруулалт — 🤖 🟢
- Item, hero зургуудыг `next/image`-ээр шахах.
- Vercel Speed Insights асаах.

---

## 💡 5. Ирээдүйн санаанууд

- **Мэдэгдэл:** шинэ patch гармагц Discord-д автоматаар товчлол илгээх bot.
- **Тоглолтын шинжилгээ:** тоглогч өөрийн сүүлийн тоглолтыг оруулахад "энэ үед ийм item авсан бол илүү байсан" гэх мэт зөвлөгөө.
- **Tier list:** Phantom+ датагаар S/A/B/C hero tier list, patch бүрт автоматаар.
- **Valorant, CS2:** нүүр хуудсанд "soon" гэж байгаа. Deadlock хэсэг тогтворжсоны дараа.

---

## 🔑 6. Мэдэж байх ёстой тохиргоо

| Хаана | Юу | Тэмдэглэл |
|---|---|---|
| `.env.local` | `DATABASE_URL`, `SESSION_SECRET`, Neon хувьсагчид | **Хэзээ ч GitHub-д бүү оруул** (gitignore-д орсон) |
| Vercel → Environment Variables | `DATABASE_URL`, `SESSION_SECRET` (Production + Preview), Wire, Gmail | Preview-ийн `SESSION_SECRET` нь тусдаа |
| Neon | Project `aged-water-29568829`, branch `production` | `neon.ts`, `.neon` |
| Google Search Console | `public/google9e0edb9e754e9d74.html` | **Бүү устга** — устгавал баталгаажуулалт цуцлагдана |
| Монгол leaderboard (гараар) | `lib/mn-players.ts` | Steam login-оор өөрөө нэмэгдэх тул ихэвчлэн хэрэггүй |
| Бүдүүлэг нэрийн шүүлтүүр | `lib/name-filter.ts` | Шинэ үг нэмж болно |

**Буцаах:** ямар нэг deploy асуудалтай бол Vercel → Deployments → өмнөх хувилбар → **Promote to Production**.

---

## Санал болгох дараалал

1. §1.1 Аюулгүй байдлын шинэчлэлт
2. §1.2 Steam login турших
3. §1.3, §1.4 Secret устгах, Discord-д зарлах
4. §3.1 Өөрийн домэйн
5. §4.1 Тусдаа preview database
6. §3.2 Ability дараалал → §3.3 Бодит counter
7. §4.2 Build generator React руу → §4.3 CSS цэвэрлэх
8. §3.4 LFG
