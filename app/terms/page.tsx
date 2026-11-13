import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use", description: "The terms for using DarkWire Media's website and products.", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <section className="article">
      <div className="wrap prose">
        <div className="kicker">Legal</div>
        <h1 style={{ fontSize: "clamp(34px,5vw,56px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>Terms of Use</h1>
        <p className="meta">Last updated November 13, 2026</p>
        <h2>Using the site</h2>
        <p>DarkWire Media publishes news summaries and guides for general information. We work hard to be accurate and to link our sources, but news changes fast. Nothing here is legal, financial or professional advice.</p>
        <h2>Our content</h2>
        <p>DarkWire&apos;s text, graphics and branding belong to DarkWire Media. You&apos;re welcome to share links and short quotes with credit. Linked articles belong to their publishers.</p>
        <h2>Digital products</h2>
        <p>Digital products are for your personal or internal business use and may not be resold or redistributed. Because they&apos;re delivered instantly, sales are final, but if a file doesn&apos;t work or isn&apos;t what was described, contact us and we&apos;ll make it right.</p>
        <h2>Links</h2>
        <p>We link to other websites for sourcing and reference. We&apos;re not responsible for their content.</p>
        <h2>Contact</h2>
        <p>Questions? Send us a message on Instagram at @darkwire.media.</p>
      </div>
    </section>
  );
}
