import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ItemPageView } from "@/components/item-page-view";
import { ITEMS, getItem, getShop } from "@/lib/items";
import { SITE_URL } from "@/lib/links";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return {};
  const shop = getShop(item.shop);
  const title = `${item.name} — Deadlock item тайлбар (Монгол)`;
  const description = `${item.copy.mn.d} ${shop.label}, түвшин ${item.tier}, ${item.price}. Хэзээ авах, яаж ашиглах, аль hero-д тохирохыг монголоор.`;
  const url = `${SITE_URL}/items/${item.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ItemPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();

  // Structured data so search engines understand the page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${item.name} — Deadlock item тайлбар`,
    inLanguage: "mn",
    about: { "@type": "Thing", name: item.name },
    description: item.copy.mn.d,
    image: `${SITE_URL}${item.image}`,
    publisher: { "@type": "Organization", name: "Deadlock Mongolia" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ItemPageView slug={item.slug} />
    </>
  );
}
