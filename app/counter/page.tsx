import type { Metadata } from "next";
import { CounterHelper } from "@/components/counter-helper";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Counter helper — Дайсандаа ямар item авах вэ? | Deadlock Mongolia",
  description:
    "Дайсны Deadlock hero-уудыг сонгоход heal, CC, gun damage зэрэг аюулыг нь тоолж, эсрэг нь авах item-уудыг монголоор тайлбартай санал болгоно.",
  alternates: { canonical: `${SITE_URL}/counter` },
};

export default function CounterPage() {
  return <CounterHelper />;
}
