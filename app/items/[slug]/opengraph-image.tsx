import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ITEMS, SHOP_COPY, getItem, getShop } from "@/lib/items";

// Per-item share image: icon + name + shop/tier/price.
// Text stays in Latin script: the built-in OG font has no Cyrillic glyphs.
export const alt = "Deadlock item guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ITEMS.map((item) => ({ slug: item.slug }));
}

export default async function ItemOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug)!;
  const shop = getShop(item.shop);
  const icon = await readFile(join(process.cwd(), "public", "items", `${item.name}.png`))
    .then((buffer) => `data:image/png;base64,${buffer.toString("base64")}`)
    .catch(() => null);
  const typeLabel = item.type === "active" ? "Active" : item.type === "imbue" ? "Imbue" : "Passive";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "72px 80px",
          background: `radial-gradient(circle at 15% 50%, ${shop.accent}55 0%, #0a0c10 60%)`,
          color: "#edf1f6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 360,
            height: 360,
            flexShrink: 0,
            overflow: "hidden",
            borderRadius: 40,
            border: `4px solid ${shop.accent}`,
            background: "#11151c",
          }}
        >
          {icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={icon} width={360} height={360} alt="" style={{ objectFit: "cover" }} />
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span style={{ fontSize: 28, color: shop.accent, letterSpacing: 4 }}>
            {`${SHOP_COPY[item.shop].en.toUpperCase()} · TIER ${item.tier} · ${item.price}`}
          </span>
          <span style={{ fontSize: item.name.length > 18 ? 68 : 84, fontWeight: 800, lineHeight: 1 }}>
            {item.name}
          </span>
          <span style={{ fontSize: 30, color: "#9aa6b5" }}>{`${typeLabel} item · Explained in Mongolian`}</span>
          <span style={{ marginTop: 24, fontSize: 26, color: "#6b7686" }}>DEADLOCK MONGOLIA</span>
        </div>
      </div>
    ),
    size,
  );
}
