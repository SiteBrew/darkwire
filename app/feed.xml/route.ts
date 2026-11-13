import { getFeed } from "@/lib/feed";
import { SITE, SITE_URL } from "@/lib/site";

export const revalidate = 300;

const x = (s: string) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const { stories } = await getFeed();
  const items = stories
    .slice(0, 50)
    .map(
      (s) => `<item><title>${x(s.headline)}</title><link>${SITE_URL}/news/${s.slug}</link><guid isPermaLink="true">${SITE_URL}/news/${s.slug}</guid><pubDate>${new Date(s.published).toUTCString()}</pubDate><category>${x(s.deskLabel)}</category><description>${x(s.dek || s.summary.slice(0, 300))}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${x(SITE.name)}</title><link>${SITE_URL}</link><description>${x(SITE.tagline)}</description><language>en-us</language><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=300" } });
}
