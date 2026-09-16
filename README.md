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

## Төслийн бүтэц

- `app/` — Next.js хуудас, metadata болон үндсэн CSS
- `components/` — Deadlock guide React component
- `public/deadlock-app.js` — каталог, API болон интерактив үйлдлүүд
- `legacy/index.html` — хөрвүүлэлтээс өмнөх эх хувилбар
- `scripts/migrate-to-next.mjs` — legacy хувилбараас UI/CSS/JS-ийг дахин салгах хэрэгсэл
