import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterForm } from "@/components/Newsletter";
import { liveProducts, PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop: AI Playbooks & Guides",
  description: "Digital playbooks and guides from DarkWire Media: the AI Autopilot Playbook, AI for Small Business starter kit and the Fact-Check Field Guide. Instant PDF download.",
  alternates: { canonical: "/shop" },
};

export default function Shop() {
  const live = liveProducts();
  return (
    <>
      {live.length > 0 && (
        <JsonLd
          data={live.map((p) => ({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.title,
            description: p.blurb,
            image: p.image ? `${SITE_URL}${p.image}` : undefined,
            brand: { "@type": "Brand", name: "DarkWire Media" },
            url: `${SITE_URL}/shop#${p.slug}`,
            offers: { "@type": "Offer", price: p.price, priceCurrency: "USD", availability: "https://schema.org/InStock", url: p.checkout },
          }))}
        />
      )}
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">The shop</div>
          <h1>
            Playbooks from <span className="cyan">the wire.</span>
          </h1>
          <p>Practical guides and templates for putting AI to work, built from what we cover every day and tested on our own operation. Instant download.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap glist">
          {PRODUCTS.map((p) => (
            <div key={p.slug} className="product" id={p.slug}>
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="product-cover" src={p.image} alt={`${p.title} cover`} width={640} height={828} loading="lazy" />
              )}
              <span className="soon" style={p.status === "live" ? { color: "var(--green)", borderColor: "rgba(61,255,160,.5)" } : undefined}>
                {p.status === "live" ? "OUT NOW" : "DROPPING SOON"}
              </span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              {p.bullets && (
                <ul style={{ color: "var(--soft)", fontSize: 14.5, paddingLeft: 18 }}>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              <span className="price">
                {p.kind}
                {p.pages ? ` · ${p.pages} pages` : ""}
                {p.status === "live" && p.price ? ` · $${p.price}` : ""}
              </span>
              {p.status === "live" && p.checkout ? (
                <a className="btn solid" href={p.checkout} target="_blank" rel="noopener noreferrer">
                  Get it{p.price ? ` · $${p.price}` : ""}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="signal">
            <div>
              <div className="kicker">First access</div>
              <h2>Get the drops first.</h2>
              <p>Subscribers hear about every new playbook the day it lands, usually with a launch discount.</p>
            </div>
            <NewsletterForm source="shop" cta="Notify me" />
          </div>
        </div>
      </section>
    </>
  );
}
