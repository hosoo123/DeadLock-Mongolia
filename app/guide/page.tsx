import type { Metadata } from "next";
import { GuideContent } from "@/components/guide-content";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Deadlock шинэ тоглогчийн гарын авлага (Монгол) | Deadlock Mongolia",
  description:
    "Deadlock-ийг анх тоглож байгаа хүмүүст: soul, lane, objective, item, чадвар болон эхний тоглолтын 10 зөвлөгөө монголоор.",
  alternates: { canonical: `${SITE_URL}/guide` },
};

export default function GuidePage() {
  return <GuideContent />;
}
