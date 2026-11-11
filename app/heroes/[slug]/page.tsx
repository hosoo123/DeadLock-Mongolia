import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroPageView, type HeroPageData } from "@/components/hero-page-view";
import { HEROES, HIGH_MMR_LABEL, getHero } from "@/lib/heroes";
import { getHeroItemStats, getHeroStats, getMatchups, getPopularBuilds } from "@/lib/deadlock-api";
import { COUNTER_ITEMS, HERO_THREATS } from "@/lib/counters";
import { getItem } from "@/lib/items";
import { SITE_URL } from "@/lib/links";

type Params = { slug: string };

// Regenerate every 6 hours with fresh Phantom+ data.
export const revalidate = 21600;
export const dynamicParams = false;

const WINDOW_DAYS = 21;

export function generateStaticParams(): Params[] {
  return HEROES.map((hero) => ({ slug: hero.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const hero = getHero(slug);
  if (!hero) return {};
  const title = `${hero.name} — Deadlock build, counter (Монгол)`;
  const description = `${hero.name}: ${HIGH_MMR_LABEL} тоглогчдын build, хамгийн өндөр win rate-тай item, хэцүү өрсөлдөгчид болон ${hero.name}-гийн эсрэг авах item-ууд монголоор.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/heroes/${hero.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/heroes/${hero.slug}`, images: [hero.image] },
  };
}

async function loadHeroData(heroId: number, heroName: string): Promise<HeroPageData> {
  const [heroStats, matchups, builds] = await Promise.all([
    getHeroStats(undefined, WINDOW_DAYS),
    getMatchups(heroId, undefined, WINDOW_DAYS),
    getPopularBuilds(heroId, 3),
  ]);

  const mine = heroStats.get(heroId);
  const totalPlayerMatches = [...heroStats.values()].reduce((sum, row) => sum + row.matches, 0);
  const stats = mine
    ? {
        matches: mine.matches,
        wr: mine.wins / mine.matches,
        // 12 players per match → share of matches that include this hero
        pickRate: totalPlayerMatches ? (mine.matches / totalPlayerMatches) * 12 : 0,
      }
    : null;

  const items = mine ? await getHeroItemStats(heroId, mine.matches, undefined, WINDOW_DAYS) : [];
  const phases = ([1, 2, 3, 4] as const)
    .map((tier) => ({
      tier,
      items: items
        .filter((entry) => entry.item.tier === tier)
        .sort((a, b) => b.pick - a.pick)
        .slice(0, 4)
        .map((entry) => ({ slug: entry.item.slug, pick: entry.pick, wr: entry.wr })),
    }))
    .filter((phase) => phase.items.length);

  const bestItems = items
    .filter((entry) => entry.pick >= 0.08)
    .sort((a, b) => b.wr - a.wr)
    .slice(0, 6)
    .map((entry) => ({ slug: entry.item.slug, pick: entry.pick, wr: entry.wr }));

  const sortedMatchups = [...matchups].sort((a, b) => a.wr - b.wr);
  const threats = HERO_THREATS[heroName] || [];

  return {
    heroId,
    windowDays: WINDOW_DAYS,
    stats,
    phases,
    bestItems,
    hardest: sortedMatchups.slice(0, 4),
    easiest: sortedMatchups.slice(-4).reverse(),
    builds: builds.map((build) => ({
      id: build.id,
      name: build.name,
      weeklyFavorites: build.weeklyFavorites,
      categories: build.categories.map((category) => ({
        name: category.name,
        items: category.items.map((item) => item.slug),
      })),
    })),
    threats,
    counterItems: threats.slice(0, 3).map((threat) => ({
      threat,
      slugs: COUNTER_ITEMS[threat]
        .slice(0, 3)
        .map((counter) => getItem(counter.name)?.slug)
        .filter(Boolean) as string[],
    })),
    generatedAt: new Date().toISOString(),
  };
}

export default async function HeroPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const hero = getHero(slug);
  if (!hero) notFound();
  const data = await loadHeroData(hero.id, hero.name);
  return <HeroPageView data={data} />;
}
