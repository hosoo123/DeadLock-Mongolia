import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SupportCheckout } from "../components/support-checkout";
import { LanguageProvider } from "../components/language-provider";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { QuickNav } from "../components/quick-nav";
import { SITE_URL } from "../lib/links";
import "./globals.css";
import "./player-stats.css";
import "./support-checkout.css";
import "./redesign.css";
import "./item-detail.css";
import "./pages.css";
import "./heroes.css";
import "./profile.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  themeColor: "#0a0c10",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn">
      <body>
        <LanguageProvider>
          <a className="skip-link" href="#catalog">
            Үндсэн агуулга руу шилжих
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
          <QuickNav />
          <SupportCheckout />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
