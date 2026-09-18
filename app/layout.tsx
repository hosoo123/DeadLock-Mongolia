import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SupportCheckout } from "../components/support-checkout";
import "./globals.css";
import "./support-checkout.css";

export const metadata: Metadata = {
  title: "Deadlock хэрэгслийн тайлбар — Монгол",
  description:
    "Deadlock item бүрийн Монгол тайлбар, hero/build тохироо, counter зөвлөмж болон Монгол тоглогчдын Deadlock Mongolia Discord community.",
  keywords: [
    "Deadlock Mongolia",
    "Deadlock Монгол",
    "Deadlock item guide",
    "Deadlock Discord Mongolia",
    "Deadlock build Монгол",
  ],
  alternates: {
    canonical: "https://dead-lock-mongolia.vercel.app/",
  },
  openGraph: {
    title: "Deadlock Item Guide — Монгол",
    description:
      "Монгол хэл дээрх Deadlock item guide болон Монгол тоглогчдын Discord community.",
    type: "website",
    url: "https://dead-lock-mongolia.vercel.app/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#161310",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn">
      <body>
        {children}
        <SupportCheckout />
        <Analytics />
      </body>
    </html>
  );
}
