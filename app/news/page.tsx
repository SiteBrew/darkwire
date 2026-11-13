import type { Metadata } from "next";
import Link from "next/link";
import { StoryCard } from "@/components/StoryCard";
import { getFeed, REVALIDATE } from "@/lib/feed";
import { DESKS } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Latest AI & Tech News",
  description: "Today's AI and tech news, fact-checked against the reporting: launches, money moves, drama, policy and security. Every story names its sources.",
  alternates: { canonical: "/news" },
};

export default async function News() {
  const { stories } = await getFeed();
  const desks = Object.keys(DESKS).filter((k) => stories.some((s) => s.desk === k));
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">The wire</div>
          <h1>
            Latest <span className="cyan">news</span>
          </h1>
          <p>Every AI and tech story DarkWire has run, newest first. Fact-checked, sourced, no rumors.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <nav className="chips" aria-label="Desks">
            <Link href="/news" className="chip on">
              All
            </Link>
            {desks.map((k) => (
              <Link key={k} href={`/desk/${k}`} className="chip">
                {DESKS[k].label}
              </Link>
            ))}
          </nav>
          {stories.length ? (
            <div className="grid">
              {stories.map((s, i) => (
                <StoryCard key={s.id} s={s} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="empty">The wire is warming up. Stories land here as they post.</div>
          )}
        </div>
      </section>
    </>
  );
}
