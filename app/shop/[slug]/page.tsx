import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { guide } from "@/lib/guides";
import { buyerFaq, product, PRODUCTS, SUPPORT_EMAIL } from "@/lib/products";
import { SITE, SITE_URL } from "@/lib/site";

export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = product((await params).slug);
  if (!p) return {};
  const title = p.seoTitle || p.title;
  const description = p.seoDescription || p.blurb;
  return {
    title: { absolute: `${title} | ${SITE.name}` },
    description,
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: { type: "website", title, description, url: `/shop/${p.slug}`, images: p.hero ? [{ url: p.hero, width: 1000, height: 1000, alt: p.title }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: p.hero ? [p.hero] : undefined },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = product((await params).slug);
  if (!p) notFound();
  const live = p.status === "live" && !!p.checkout;
  const faq = buyerFaq(p);
  const related = (p.guides || []).map((g) => guide(g)).filter((g): g is NonNullable<typeof g> => !!g);
  const others = PRODUCTS.filter((x) => x.slug !== p.slug);
  const url = `${SITE_URL}/shop/${p.slug}`;

  const ld: Record<string, any>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.title,
      description: p.seoDescription || p.blurb,
      image: [p.hero, p.image].filter(Boolean).map((i) => `${SITE_URL}${i}`),
      brand: { "@type": "Brand", name: SITE.name },
      sku: p.slug,
      category: "Digital download (PDF)",
      url,
      ...(live && p.price
        ? { offers: { "@type": "Offer", price: p.price.toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock", url, seller: { "@type": "Organization", name: SITE.name } } }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];

  const Buy = ({ big }: { big?: boolean }) =>
    live ? (
      <a className={`btn solid${big ? " buy-big" : ""}`} href={p.checkout} rel="noopener">
        Get it · ${p.price} <Icon name="arrow" />
      </a>
    ) : (
      <span className="soon">DROPPING SOON</span>
    );

  return (
    <article>
      <section className="pdp-hero">
        <div className="wrap pdp-grid">
          <div className="pdp-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.hero || p.image} alt={`${p.title}: ${p.kind}`} width={1000} height={1000} fetchPriority="high" />
          </div>
          <div className="pdp-info">
            <nav className="meta crumbs" aria-label="Breadcrumb">
              <Link href="/shop">Shop</Link> <span>/</span> {p.kind}
            </nav>
            <h1>{p.title}</h1>
            <p className="lead">{p.blurb}</p>
            {p.bullets && (
              <ul className="pdp-bullets">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            <div className="pdp-buy">
              <Buy big />
              {live && p.price ? <span className="pdp-price">${p.price}</span> : null}
            </div>
            <ul className="pdp-trust">
              <li>Instant PDF download</li>
              {p.pages ? <li>{p.pages} pages · letter size</li> : null}
              <li>Secure checkout by Stripe</li>
              <li>Download link emailed to you</li>
            </ul>
          </div>
        </div>
      </section>

      {p.chapters && (
        <section className="section">
          <div className="wrap pdp-two">
            <div>
              <div className="kicker">What&apos;s inside</div>
              <h2 className="h2">{p.chapters.length} chapters, no filler.</h2>
              <ol className="pdp-chapters">
                {p.chapters.map((c, i) => (
                  <li key={c}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {c}
                  </li>
                ))}
              </ol>
            </div>
            {p.forWho && (
              <div>
                <div className="kicker">Who it&apos;s for</div>
                <h2 className="h2">Made for you if…</h2>
                <ul className="pdp-for">
                  {p.forWho.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {p.previews && p.previews.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="kicker">Look inside</div>
            <h2 className="h2">Real pages from the guide.</h2>
            <div className="pdp-previews">
              {p.previews.map((pv) => (
                <figure key={pv.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pv.src} alt={`${p.title}: ${pv.alt}`} width={765} height={990} loading="lazy" />
                  <figcaption className="meta">{pv.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap pdp-two">
          <div className="faq">
            <div className="kicker">Questions</div>
            <h2 className="h2">Before you buy.</h2>
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
            <p className="meta" style={{ marginTop: 18 }}>
              Anything else? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </p>
          </div>
          <div className="pdp-cta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {p.image && <img className="product-cover" src={p.image} alt={`${p.title} cover`} width={640} height={828} loading="lazy" />}
            <h3>{p.title}</h3>
            <Buy />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="kicker">Free guides on this</div>
            <div className="glist" style={{ marginTop: 8 }}>
              {related.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="gcard">
                  <span className="meta">
                    {g.category} · {g.minutes} min read
                  </span>
                  <h3>{g.title}</h3>
                  <p>{g.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="kicker">Also from the shop</div>
          <div className="glist" style={{ marginTop: 8 }}>
            {others.map((o) => (
              <Link key={o.slug} href={`/shop/${o.slug}`} className="gcard">
                <span className="meta">
                  {o.kind}
                  {o.status === "live" && o.price ? ` · $${o.price}` : ""}
                </span>
                <h3>{o.title}</h3>
                <p>{o.blurb}</p>
                <span className="more">See what&apos;s inside →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={ld} />
    </article>
  );
}
