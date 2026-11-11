# Deadlock Mongolia

Монгол Deadlock тоглогчдод зориулсан item тайлбар, hero build generator болон community вебсайт.

## Ажиллуулах

```bash
npm install
npm run dev
```

Дараа нь [http://localhost:3000](http://localhost:3000) хаягийг нээнэ.

## Технологи

- Next.js App Router
- React + TypeScript
- Deadlock API
- Vercel Analytics

## Тоглогчийн статистик

Нүүр хуудасны **Тоглогчийн статистик** хэсэгт Steam нэр, Account ID эсвэл
Steam профайлын холбоосоор хайж профайл, rank болон сүүлийн 20, 50 эсвэл 100
хүчинтэй тоглолтын win rate, дундаж K/D/A, hero тус бүрийн сонголт ба win
rate-ийг харж болно. Steam profile location нь нийтэд харагддаг бөгөөд `MN`
гэж тохируулсан тохиолдолд Монгол тоглогч гэж тэмдэглэнэ.

Өгөгдлийг Deadlock API-ийн Steam profile, rank болон match-history endpoint-оос
авна. API Монголын бүх тоглогчийн жагсаалт өгдөггүй тул энэ хувилбар бүрэн
Монгол leaderboard гаргахгүй.

Steam профайлын `https://steamcommunity.com/id/нэр` custom холбоосыг автоматаар
тайлахын тулд `.env.local` болон Vercel Environment Variables-д optional
`STEAM_API_KEY` тохируулна. Түлхүүргүй үед Steam нэр, Account ID, SteamID64
эсвэл `/profiles/` хэлбэрийн холбоосоор хайж болно. Хайлт олдохгүй байвал
Steam профайлаа public болгож, `/profiles/` замтай холбоос эсвэл 17 оронтой
SteamID64 ашиглана.

Хуудасны доод талын шууд цэсээр item каталог, build generator, patch мэдээлэл,
тоглогчийн статистик руу нэг даралтаар шилжинэ.

Хуудасны зүүн дээд булангийн EN / MN сонголтоор интерфэйсийн хэлээ сольж болно.
Сонголт browser-д хадгалагдана. Hero, item, rank, build зэрэг
тоглоомын нэр томьёог англиар хэвээр үлдээнэ. EN горимд item-ийн UI болон
тайлбар англиар гарч, MN горимд `damage` зэрэг тоглоомын түгээмэл нэр томьёог
орчуулалгүй үлдээнэ.

## Item өгөгдөл ба засвар

Item-тэй холбоотой бүх өгөгдөл `lib/` дотор байрлана. Каталог, `/items/[slug]`
хуудас, counter helper гурвуулаа эндээс уншина.

| Файл | Юу байдаг |
|---|---|
| [`lib/item-copy.ts`](./lib/item-copy.ts) | Item бүрийн MN/EN тайлбар (`d`, `use`, `tip`), active/passive/imbue төрөл |
| [`lib/item-shops.ts`](./lib/item-shops.ts) | Дэлгүүр, tier, үнэ, item-ийн нэр |
| [`lib/items.ts`](./lib/items.ts) | Дээрхийг нэгтгэж slug, upgrade зам, stat, hero датаг нэмнэ |
| [`lib/counters.ts`](./lib/counters.ts) | Hero бүрийн аюул (heal, CC, gun…) ба эсрэг item-ууд |
| [`lib/patch-notes.ts`](./lib/patch-notes.ts) | Patch radar-ийн монгол товчлол + албан ёсны patch feed |
| [`lib/deadlock-api.ts`](./lib/deadlock-api.ts) | Deadlock API-аас Phantom+ stat, build, leaderboard татах (сервер тал, ISR cache) |
| [`lib/mn-players.ts`](./lib/mn-players.ts) | Монгол leaderboard-ийн Account ID жагсаалт (зөвхөн зөвшөөрөлтэй) |
| [`lib/crosshairs.ts`](./lib/crosshairs.ts) | Crosshair preset болон pro тоглогчдын (эх сурвалжтай) code |

Тайлбар бичихдээ damage, cooldown, lane зэрэг тоглогчдын өдөр тутам хэрэглэдэг
нэр томьёог англиар нь үлдээж, найздаа тайлбарлаж байгаа юм шиг энгийн бичнэ.

### Шинэ patch гарсны дараа

```bash
node scripts/build-item-heroes.mjs   # аль hero ямар item авдаг (Deadlock API, сүүлийн 30 хоног)
node scripts/build-item-stats.mjs    # public/data/deadlock-items.json → item stat-ууд
node scripts/build-crosshair-presets.mjs  # crosshair preset-үүдийг code болгоно (preset өөрчилсөн үед)
```

Дараа нь `lib/patch-notes.ts` дахь `PATCH_SUMMARY`-г шинэчилнэ. Албан ёсны patch-ийн
жагсаалт цаг тутам автоматаар шинэчлэгддэг бөгөөд товчлол хоцорвол сайт өөрөө
"Шинэ patch гарсан" гэж харуулна.

## Монгол leaderboard-д тоглогч нэмэх

Тоглогч Discord дээр өөрөө хүсэлт гаргасны дараа [`lib/mn-players.ts`](./lib/mn-players.ts)-д
Account ID-г нь нэмнэ. Rank, тоглолт, win rate нь автоматаар шинэчлэгдэнэ. Хасуулах хүсэлт
ирвэл мөрийг нь устгана.

## Хуудсууд

- `/` — нүүр: item каталог, build generator, patch radar, тоглогчийн статистик
- `/items/[slug]` — item тус бүрийн хуудас (156 ширхэг, SEO + Facebook/Discord preview зурагтай)
- `/heroes`, `/heroes/[slug]` — Phantom+ meta, hero бүрийн build, matchup, алдартай build (6 цаг тутам шинэчлэгдэнэ)
- `/pro` — бүсийн leaderboard + Монгол тоглогчид (цаг тутам)
- `/crosshair` — crosshair builder, тоглоомын share code, бэлэн загварууд
- `/counter` — дайсны hero-уудыг сонгоход эсрэг нь авах item санал болгоно (`?vs=Abrams,Haze` линкээр хуваалцана)
- `/guide` — шинэ тоглогчийн гарын авлага
- `/privacy` — нууцлалын бодлого

## Production build

```bash
npm run build
npm start
```

## Wire төлбөр ба талархлын имэйл

Бүх код, тохиргоо, аюулгүй байдал болон туршилтын дэлгэрэнгүй тайлбарыг
[`WIRE_PAYMENT_EMAIL_GUIDE.md`](./WIRE_PAYMENT_EMAIL_GUIDE.md)-ээс үзнэ үү.

`.env.example`-ийг `.env.local` болгон хуулж Wire болон Gmail-ийн нууц
түлхүүрүүдийг оруулна. Нууц түлхүүртэй `.env.local`-ийг GitHub руу push хийж
болохгүй.

- `POST /api/wire/checkout` — хэрэглэгчийн email, дүнгээр Wire PaymentIntent
  болон hosted checkout үүсгэнэ.
- `POST /api/wire/webhook` — `payment_intent.succeeded` event-ийн signature-г
  шалгаад metadata дахь email рүү талархлын имэйл илгээнэ.
- Wire webhook URL:
  `https://dead-lock-mongolia.vercel.app/api/wire/webhook`
- Wire webhook event: `payment_intent.succeeded`

Gmail account дээр 2-Step Verification асаагаад App Password үүсгэн
`GMAIL_APP_PASSWORD`-д оруулна. Vercel-ийн Environment Variables хэсэгт
`.env.example` доторх бүх утгыг мөн тохируулна.

## Төслийн бүтэц

- `app/` — Next.js хуудас, metadata болон үндсэн CSS
- `components/` — Deadlock guide React component
- `public/deadlock-app.js` — каталог, API болон интерактив үйлдлүүд
- `legacy/index.html` — хөрвүүлэлтээс өмнөх эх хувилбар
- `scripts/migrate-to-next.mjs` — legacy хувилбараас UI/CSS/JS-ийг дахин салгах хэрэгсэл
