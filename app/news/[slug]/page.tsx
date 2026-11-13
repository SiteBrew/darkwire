import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Follow } from "@/components/Follow";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterForm } from "@/components/Newsletter";
import { DeskTag, StoryCard } from "@/components/StoryCard";
import { fmtDate, getFeed, getStory, REVALIDATE, type Story } from "@/lib/feed";
import { deskOf, SITE, SITE_URL } from "@/lib/site";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { stories } = await getFeed();
  return stories.slice(0, 40).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = await getStory(slug);
  if (!s) return { title: "Story not found", robots: { index: false } };
  const desc = (s.dek || s.summary).slice(0, 158);
  const url = `/news/${s.slug}`;
  return {
    title: s.headline,
    description: desc,
    alternates: { canonical: url },
    openGraph: { type: "article", title: s.headline, description: desc, url, publishedTime: s.published, section: deskOf(s.desk).label, images: s.og ? [{ url: s.og, width: 1200, height: 630, alt: s.headline }] : undefined },
    twitter: { card: "summary_large_image", title: s.headline, description: desc, images: s.og ? [s.og] : undefined },
  };
}

/** The caption as article text, minus the Instagram-only bits (hashtags, "comment below", "follow us"). */
const bodyOf = (s: Story) =>
  s.summary
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter((p) => p && !/^#/.test(p) && !/@\w|\bfollow\b|\bcomment|\blink in bio|\bdrop (a|your)\b/i.test(p) && !/\?\s*$/.test(p));

const kindLabel: Record<string, string> = { reported: "Reported", allegation: "Alleged", quote: "Quote", number: "Figure", fact: "Fact" };

function Sections({ s }: { s: Story }) {
  return (
    <>
      {s.sections.map((x, i) => {
        switch (x.type) {
          case "point":
            return (
              <div key={i}>
                <h2>{x.title}</h2>
                <p>{x.body}</p>
              </div>
            );
          case "stat":
            return (
              <div key={i} className="block statbox">
                <span className="v">{x.value}</span>
                <span className="l">
                  {x.label}
                  {x.source ? <span className="meta" style={{ display: "block", marginTop: 6 }}>{x.source}</span> : null}
                </span>
              </div>
            );
          case "quote":
            return (
              <blockquote key={i} className="quote" style={{ fontStyle: "normal" }}>
                “{x.text}”<cite>{x.who}</cite>
              </blockquote>
            );
          case "list":
            return (
              <div key={i}>
                <h2>{x.title}</h2>
                <ul>
                  {x.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              </div>
            );
          case "why":
            return (
              <div key={i} className="block why">
                <div className="kicker" style={{ marginBottom: 10 }}>
                  Why it matters
                </div>
                {x.title && <p style={{ fontWeight: 700, color: "var(--ink)", fontSize: 20 }}>{x.title}</p>}
                <p style={{ marginTop: 8 }}>{x.body}</p>
              </div>
            );
        }
        return null;
      })}
    </>
  );
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getStory(slug);
  if (!s) notFound();
  const { stories } = await getFeed();
  const related = stories.filter((x) => x.id !== s.id && x.desk === s.desk).slice(0, 3);
  const more = related.length >= 3 ? related : [...related, ...stories.filter((x) => x.id !== s.id && !related.includes(x))].slice(0, 3);
  const d = deskOf(s.desk);
  const url = `${SITE_URL}/news/${s.slug}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: s.headline.slice(0, 110),
      description: s.dek || s.summary.slice(0, 200),
      datePublished: s.published,
      dateModified: s.published,
      articleSection: d.label,
      image: [s.og, s.image].filter(Boolean),
      mainEntityOfPage: url,
      url,
      author: { "@type": "Organization", name: SITE.name, url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#org` },
      isBasedOn: s.sources.map((x) => x.url),
      citation: s.sources.map((x) => ({ "@type": "CreativeWork", name: x.title, url: x.url, publisher: x.outlet })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "News", item: `${SITE_URL}/news` },
        { "@type": "ListItem", position: 3, name: d.label, item: `${SITE_URL}/desk/${s.desk}` },
        { "@type": "ListItem", position: 4, name: s.headline, item: url },
      ],
    },
  ];
  return (
    <article className="article">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>/<Link href="/news">News</Link>/<Link href={`/desk/${s.desk}`}>{d.label}</Link>
        </nav>
        <div className="article-head">
          <div>
            <DeskTag desk={s.desk} />
            <h1>{s.headline}</h1>
            {s.dek && <p className="dek">{s.dek}</p>}
            <div className="byline">
              <span className="meta">By the DarkWire desk</span>
              <span className="meta">
                <time dateTime={s.published}>{fmtDate(s.published)}</time>
              </span>
              <span className="meta">
                {s.sources.length} source{s.sources.length === 1 ? "" : "s"} · {s.facts.length} checked facts
              </span>
            </div>
          </div>
          {s.image && (
            <div className="cover">
              <span className="corner tl" />
              <span className="corner br" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={`DarkWire cover: ${s.headline}`} />
            </div>
          )}
        </div>

        <div className="prose" style={{ marginTop: 48 }}>
          {bodyOf(s).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <Sections s={s} />

          {s.facts.length > 0 && (
            <>
              <h2>The facts we checked</h2>
              {s.attribution && <p style={{ color: "var(--dim)", fontSize: 15 }}>{s.attribution}</p>}
              <ol className="facts">
                {s.facts.map((f, i) => (
                  <li key={i}>
                    <span>
                      {f.claim}
                      <span className="src">
                        {kindLabel[f.kind] || "Fact"} · {f.source}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </>
          )}

          {s.sources.length > 0 && (
            <>
              <h2>Sources</h2>
              <ul className="sources">
                {s.sources.map((x, i) => (
                  <li key={i}>
                    <a href={x.url} target="_blank" rel="noopener noreferrer nofollow">
                      <b>{x.outlet}</b>
                      <span>{x.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="block" style={{ marginTop: 40 }}>
            <div className="kicker" style={{ marginBottom: 12 }}>
              Follow the signal
            </div>
            <p style={{ marginBottom: 18 }}>Get stories like this the moment they drop.</p>
            <Follow />
            {s.instagram && (
              <p style={{ marginTop: 16, fontSize: 15 }}>
                <a href={s.instagram} target="_blank" rel="noopener noreferrer">
                  See this story on Instagram →
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="section" style={{ marginTop: 56 }}>
          <div className="wrap">
            <div className="head-row">
              <div>
                <div className="kicker">Keep reading</div>
                <h2 className="h2">More from the wire.</h2>
              </div>
            </div>
            <div className="grid">
              {more.map((x) => (
                <StoryCard key={x.id} s={x} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="section">
        <div className="wrap">
          <div className="signal">
            <div>
              <div className="kicker">The newsletter</div>
              <h2>Never miss the wire.</h2>
              <p>The day&apos;s biggest AI and tech stories in one short, sourced email.</p>
            </div>
            <NewsletterForm source="article" />
          </div>
        </div>
      </section>
      <JsonLd data={ld} />
    </article>
  );
}
