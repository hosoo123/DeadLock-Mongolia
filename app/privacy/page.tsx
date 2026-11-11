import type { Metadata } from "next";
import { PrivacyContent } from "@/components/privacy-content";

export const metadata: Metadata = {
  title: "Нууцлалын бодлого — Deadlock Mongolia",
  description:
    "Deadlock Mongolia ямар мэдээлэл цуглуулдаг, хэрхэн ашигладаг тухай нууцлалын бодлого.",
  alternates: { canonical: "https://dead-lock-mongolia.vercel.app/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
