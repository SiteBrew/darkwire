import "server-only";

// Stories come from the Signal Tower (the crew that runs DarkWire's socials): only ones already posted,
// with their sources. Cached and refreshed every few minutes.

export type Section =
  | { type: "point"; title: string; body: string }
  | { type: "stat"; value: string; label: string; source?: string }
  | { type: "quote"; text: string; who: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "why"; title: string; body: string };

export type Story = {
  id: string;
  slug: string;
  headline: string;
  hook: string;
  dek: string;
  summary: string;
  desk: string;
  deskLabel: string;
  deskTag: string;
  evergreen: boolean;
  sections: Section[];
  facts: { claim: string; source: string; kind: string }[];
  attribution: string | null;
  sources: { outlet: string; url: string; title: string; published: string }[];
  hashtags: string[];
  published: string;
  instagram: string | null;
  image: string | null;
  og: string | null;
};

export type Socials = { instagram: string; youtube: string | null; tiktokName: string | null; bluesky: string | null };
type Feed = { stories: Story[]; socials: Socials | null };

/** The short hook reads best as the title; the full headline becomes the subhead. */
function tidy(s: Story): Story {
  const title = s.hook && s.hook.length >= 20 ? s.hook : s.headline;
  const dek = title !== s.headline ? s.headline : s.dek;
  return { ...s, headline: title, dek };
}

const FEED = (process.env.DW_FEED_URL || "https://sitebrew-cockpit.vercel.app/api/public/dw/feed").replace(/\/$/, "");
export const REVALIDATE = 300;

async function get(query: string): Promise<Feed> {
  try {
    const r = await fetch(`${FEED}${query}`, { next: { revalidate: REVALIDATE, tags: ["feed"] } });
    if (!r.ok) return { stories: [], socials: null };
    const j = await r.json();
    return { stories: Array.isArray(j.stories) ? j.stories.map(tidy) : [], socials: j.socials || null };
  } catch {
    return { stories: [], socials: null };
  }
}

export const getFeed = () => get("?limit=200");

export async function getStory(slug: string): Promise<Story | null> {
  const id = (slug.match(/-([0-9a-f]{6})$/) || [])[1];
  if (!id) return null;
  const all = await getFeed();
  const hit = all.stories.find((s) => s.slug === slug) || all.stories.find((s) => s.id.startsWith(id));
  if (hit) return hit;
  const one = await get(`?id=${id}`);
  return one.stories[0] || null;
}

// DarkWire's TikTok handle (the crew only knows the display name, "DarkWire Media")
const TIKTOK = "https://www.tiktok.com/@darkwire.media2";

const DEFAULT_SOCIALS: Socials = { instagram: "https://www.instagram.com/darkwire.media/", youtube: null, tiktokName: null, bluesky: null };

/** Where to follow DarkWire. Env vars win (set NEXT_PUBLIC_TIKTOK_URL etc. in Vercel), then what the crew knows. */
export async function getSocials() {
  const s = (await getFeed()).socials || DEFAULT_SOCIALS;
  const env = (k: string) => (process.env[k] || "").trim() || null;
  const tiktokGuess = s.tiktokName && /^[a-z0-9._]{2,24}$/i.test(s.tiktokName) ? `https://www.tiktok.com/@${s.tiktokName}` : null;
  return [
    { key: "instagram", label: "Instagram", url: env("NEXT_PUBLIC_INSTAGRAM_URL") || s.instagram },
    { key: "tiktok", label: "TikTok", url: env("NEXT_PUBLIC_TIKTOK_URL") || tiktokGuess || TIKTOK },
    { key: "youtube", label: "YouTube", url: env("NEXT_PUBLIC_YOUTUBE_URL") || s.youtube },
    { key: "bluesky", label: "Bluesky", url: env("NEXT_PUBLIC_BLUESKY_URL") || (s.bluesky ? s.bluesky.toLowerCase() : null) },
  ].filter((x): x is { key: string; label: string; url: string } => !!x.url);
}

export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" });
export const ago = (iso: string) => {
  const m = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return d < 8 ? `${d}d ago` : fmtDate(iso);
};
