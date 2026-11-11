import type { Metadata } from "next";
import { HeroIndexView, type HeroIndexRow } from "@/components/hero-index-view";
import { HEROES, HIGH_MMR_LABEL } from "@/lib/heroes";
import { getHeroStats } from "@/lib/deadlock-api";
import { SITE_URL } from "@/lib/links";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: `Deadlock hero-ууд — ${HIGH_MMR_LABEL} meta, win rate (Монгол) | Deadlock Mongolia`,
  description: `Deadlock-ийн бүх hero-гийн ${HIGH_MMR_LABEL} win rate, сонголтын хувь. Hero бүрийн build, counter, хэцүү өрсөлдөгчдийг монголоор.`,
  alternates: { canonical: `${SITE_URL}/heroes` },
};

export default async function HeroesPage() {
  const stats = await getHeroStats();
  const total = [...stats.values()].reduce((sum, row) => sum + row.matches, 0);
  const rows: HeroIndexRow[] = HEROES.map((hero) => {
    const row = stats.get(hero.id);
    return {
      heroId: hero.id,
      matches: row?.matches ?? 0,
      wr: row ? row.wins / row.matches : null,
      pickRate: row && total ? (row.matches / total) * 12 : null,
    };
  });
  return <HeroIndexView rows={rows} />;
}
