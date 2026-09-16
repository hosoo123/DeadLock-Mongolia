import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const source = readFileSync(
  new URL("../legacy/index.html", import.meta.url),
  "utf8",
);
const style = source.match(/<style>([\s\S]*?)<\/style>/)?.[1]?.trim();
const body = source.match(/<body>([\s\S]*?)<script>/)?.[1]?.trim();
const script = source.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/)?.[1]?.trim();

if (!style || !body || !script) {
  throw new Error("index.html-ээс style, body эсвэл script хэсгийг салгаж чадсангүй.");
}

mkdirSync(new URL("../app", import.meta.url), { recursive: true });
mkdirSync(new URL("../components", import.meta.url), { recursive: true });
mkdirSync(new URL("../public", import.meta.url), { recursive: true });

writeFileSync(
  new URL("../app/globals.css", import.meta.url),
  `${style}\n`,
);

writeFileSync(
  new URL("../public/deadlock-app.js", import.meta.url),
  `${script}\n`,
);

writeFileSync(
  new URL("../components/deadlock-guide.tsx", import.meta.url),
  `import Script from "next/script";\n\nconst pageMarkup = ${JSON.stringify(body)};\n\nexport function DeadlockGuide() {\n  return (\n    <>\n      <div\n        className="site-root"\n        dangerouslySetInnerHTML={{ __html: pageMarkup }}\n        suppressHydrationWarning\n      />\n      <Script src="/deadlock-app.js" strategy="afterInteractive" />\n    </>\n  );\n}\n`,
);
