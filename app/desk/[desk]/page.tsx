import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryCard } from "@/components/StoryCard";
import { getFeed, REVALIDATE } from "@/lib/feed";
import { DESKS } from "@/lib/site";

export const revalidate = 300;
export const generateStaticParams = () => Object.keys(DESKS).map((desk) => ({ desk }));

export async function generateMetadata({ params }: { params: Promise<{ desk: string }> }): Promise<Metadata> {
  const { desk } = await params;
  const d = DESKS[desk];
  if (!d) return {};
  return { title: `${d.label}: AI & Tech News`, description: `${d.blurb} Fact-checked by DarkWire Media.`, alternates: { canonical: `/desk/${desk}` } };
}

export default async function Desk({ params }: { params: Promise<{ desk: string }> }) {
  const { desk } = await params;
  const d = DESKS[desk];
  if (!d) notFound();
  const { stories } = await getFeed();
  const mine = stories.filter((s) => s.desk === desk);
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>/<Link href="/news">News</Link>/<span>{d.label}</span>
          </nav>
          <span className="tag" style={{ color: d.color }}>
            {d.tag}
          </span>
          <h1 style={{ marginTop: 18 }}>{d.label}</h1>
          <p>{d.blurb}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          {mine.length ? (
            <div className="grid">
              {mine.map((s, i) => (
                <StoryCard key={s.id} s={s} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="empty">
              Nothing on this desk yet. <Link href="/news" className="cyan">See the whole wire →</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
