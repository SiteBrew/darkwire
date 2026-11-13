import type { MetadataRoute } from "next";
import { getFeed } from "@/lib/feed";
import { allGuides } from "@/lib/guides";
import { PRODUCTS } from "@/lib/products";
import { DESKS, SITE_URL } from "@/lib/site";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { stories } = await getFeed();
  const now = new Date();
  const pages = ["", "/news", "/guides", "/shop", "/newsletter", "/about"].map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: p === "" || p === "/news" ? ("hourly" as const) : ("weekly" as const), priority: p === "" ? 1 : 0.8 }));
  const desks = Object.keys(DESKS).map((d) => ({ url: `${SITE_URL}/desk/${d}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.6 }));
  const guides = allGuides().map((g) => ({ url: `${SITE_URL}/guides/${g.slug}`, lastModified: new Date(`${g.updated}T12:00:00Z`), changeFrequency: "monthly" as const, priority: 0.9 }));
  const news = stories.map((s) => ({ url: `${SITE_URL}/news/${s.slug}`, lastModified: new Date(s.published), changeFrequency: "weekly" as const, priority: 0.7, images: s.image ? [s.image] : undefined }));
  const shop = PRODUCTS.map((p) => ({ url: `${SITE_URL}/shop/${p.slug}`, lastModified: new Date("2026-11-13T12:00:00Z"), changeFrequency: "monthly" as const, priority: 0.9, images: [p.hero, p.image].filter(Boolean).map((i) => `${SITE_URL}${i}`) }));
  return [...pages, ...shop, ...guides, ...desks, ...news];
}
