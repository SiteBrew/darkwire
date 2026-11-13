import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Follow } from "@/components/Follow";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterForm } from "@/components/Newsletter";
import { allGuides, guide } from "@/lib/guides";
import { PRODUCTS } from "@/lib/products";
import { SITE, SITE_URL } from "@/lib/site";

export const generateStaticParams = () => allGuides().map((g) => ({ slug: g.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guide(slug);
  if (!g) return {};
  const url = `/guides/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: g.title, description: g.description, url, modifiedTime: g.updated, section: "Guides" },
    twitter: { card: "summary_large_image", title: g.title, description: g.description },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guide(slug);
  if (!g) notFound();
  const others = allGuides().filter((x) => x.slug !== g.slug).slice(0, 3);
  const url = `${SITE_URL}/guides/${g.slug}`;
  const ld: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.description,
      dateModified: g.updated,
      datePublished: g.updated,
      mainEntityOfPage: url,
      url,
      image: `${SITE_URL}/guides/${g.slug}/opengraph-image`,
      author: { "@type": "Organization", name: SITE.name, url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: g.title, item: url },
      ],
    },
  ];
  if (g.faq.length) ld.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
  return (
    <article className="article">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>/<Link href="/guides">Guides</Link>/<span>{g.category}</span>
        </nav>
        <span className="tag" style={{ color: "var(--cyan)" }}>
          GUIDE
        </span>
        <h1 style={{ maxWidth: 900 }}>{g.title}</h1>
        <p className="dek" style={{ maxWidth: 760 }}>
          {g.description}
        </p>
        <div className="byline" style={{ maxWidth: 760 }}>
          <span className="meta">By the DarkWire desk</span>
          <span className="meta">Updated <time dateTime={g.updated}>{new Date(`${g.updated}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time></span>
          <span className="meta">{g.minutes} min read</span>
        </div>
        <div className="guide-layout" style={{ marginTop: 48 }}>
          <div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: g.html }} />
            {g.faq.length > 0 && (
              <div className="prose faq" style={{ marginTop: 48 }}>
                <h2 id="faq">Quick answers</h2>
                {g.faq.map((f, i) => (
                  <details key={i}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            )}
            <div className="block" style={{ marginTop: 48, maxWidth: 720 }}>
              <div className="kicker" style={{ marginBottom: 12 }}>
                Follow the signal
              </div>
              <p style={{ marginBottom: 18, color: "var(--soft)" }}>Daily AI and tech news, fact-checked. Pick your feed.</p>
              <Follow />
            </div>
          </div>
          {g.toc.length > 2 && (
            <aside className="toc" aria-label="In this guide">
              <div className="meta">In this guide</div>
              <ol>
                {g.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.text}</a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </div>
      {(() => {
        const deeper = PRODUCTS.find((x) => x.guides?.includes(g.slug));
        if (!deeper) return null;
        return (
          <section className="section" style={{ marginTop: 56 }}>
            <div className="wrap">
              <Link href={`/shop/${deeper.slug}`} className="deeper">
                {deeper.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={deeper.image} alt={`${deeper.title} cover`} width={640} height={828} loading="lazy" />
                )}
                <div>
                  <div className="kicker">Go deeper</div>
                  <h3>{deeper.title}</h3>
                  <p>{deeper.blurb}</p>
                  <span className="more">
                    See what&apos;s inside{deeper.status === "live" && deeper.price ? ` · $${deeper.price}` : ""} →
                  </span>
                </div>
              </Link>
            </div>
          </section>
        );
      })()}
      {others.length > 0 && (
        <section className="section" style={{ marginTop: 56 }}>
          <div className="wrap">
            <div className="kicker">More guides</div>
            <div className="glist" style={{ marginTop: 8 }}>
              {others.map((o) => (
                <Link key={o.slug} href={`/guides/${o.slug}`} className="gcard">
                  <span className="meta">
                    {o.category} · {o.minutes} min read
                  </span>
                  <h3>{o.title}</h3>
                  <p>{o.description}</p>
                </Link>
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
              <h2>New guides, first.</h2>
              <p>Get the daily wire plus every new guide and playbook the day it drops.</p>
            </div>
            <NewsletterForm source={`guide-${g.slug}`} />
          </div>
        </div>
      </section>
      <JsonLd data={ld} />
    </article>
  );
}
