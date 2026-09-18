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

## Production build

```bash
npm run build
npm start
```

## Wire төлбөр ба талархлын имэйл

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
