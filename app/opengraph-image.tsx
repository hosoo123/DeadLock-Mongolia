import { ImageResponse } from "next/og";

// Shown when the site link is shared on Facebook / Discord / Messenger.
// Text stays in Latin script: the built-in OG font has no Cyrillic glyphs.
export const alt = "Deadlock Mongolia — item guide, builds and counters";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 20% 0%, #3a2410 0%, #0a0c10 55%)",
          color: "#edf1f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              borderRadius: 20,
              background: "linear-gradient(135deg, #f2a541, #d9772b)",
              color: "#1a1206",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            DL
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>DEADLOCK</span>
            <span style={{ fontSize: 22, color: "#9aa6b5", letterSpacing: 8 }}>MONGOLIA</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 84, fontWeight: 800, lineHeight: 1 }}>Item guide in Mongolian</span>
          <span style={{ fontSize: 34, color: "#9aa6b5" }}>
            156 items explained · Live builds · Counter helper · Patch notes
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Weapon", "Vitality", "Spirit"].map((label, index) => (
            <span
              key={label}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: `2px solid ${["#c9852f", "#4f9a63", "#8b5fc9"][index]}`,
                color: ["#f2a541", "#64d995", "#b9a3ff"][index],
                fontSize: 26,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
