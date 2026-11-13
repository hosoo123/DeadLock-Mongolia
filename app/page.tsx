import type { Metadata } from "next";
import { DeadlockGuide } from "@/components/deadlock-guide";
import { SITE_URL } from "@/lib/links";

// Canonical lives here, not in the root layout, so other pages never inherit "/".
export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
};

export default function HomePage() {
  return <DeadlockGuide />;
}
