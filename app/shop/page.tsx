import type { Metadata } from "next";
import { NewsletterForm } from "@/components/Newsletter";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop: AI Playbooks & Guides",
  description: "Digital playbooks and guides from DarkWire Media: practical, tested ways to put AI to work. First drops coming soon.",
  alternates: { canonical: "/shop" },
};

export default function Shop() {
  return (
    <>
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
                {p.price ? ` · $${p.price}` : ""}
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
