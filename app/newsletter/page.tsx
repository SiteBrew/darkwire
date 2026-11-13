import type { Metadata } from "next";
import { Follow } from "@/components/Follow";
import { NewsletterForm } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "The DarkWire Newsletter: AI & Tech News by Email",
  description: "The day's biggest AI and tech stories in one short email: fact-checked, sourced and free. Plus first access to new guides and playbooks.",
  alternates: { canonical: "/newsletter" },
};

export default function Newsletter() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">The newsletter</div>
          <h1>
            The wire, in your <span className="cyan">inbox.</span>
          </h1>
          <p>One short email with the AI and tech stories that actually matter. Every story checked against the reporting and linked to its sources. Free, and you can unsubscribe in one click.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="signal">
            <div>
              <h2>What you get</h2>
              <ul style={{ color: "var(--soft)", marginTop: 16, paddingLeft: 20, display: "grid", gap: 8 }}>
                <li>The day&apos;s biggest launches, money moves and drama</li>
                <li>Why it matters, in a sentence or two</li>
                <li>Sources on every story</li>
                <li>New guides and playbooks before anyone else</li>
              </ul>
            </div>
            <NewsletterForm source="newsletter-page" />
          </div>
          <div style={{ marginTop: 48 }}>
            <div className="kicker">Or follow along</div>
            <Follow />
          </div>
        </div>
      </section>
    </>
  );
}
