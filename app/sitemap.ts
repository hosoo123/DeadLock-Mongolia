import type { MetadataRoute } from "next";
import { ITEMS } from "@/lib/items";
import { HEROES } from "@/lib/heroes";
import { SITE_URL } from "@/lib/links";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/heroes", "/counter", "/pro", "/crosshair", "/guide", "/privacy"].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const items = ITEMS.map((item) => ({
    url: `${SITE_URL}/items/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const heroes = HEROES.map((hero) => ({
    url: `${SITE_URL}/heroes/${hero.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));
  return [...pages, ...heroes, ...items];
}
