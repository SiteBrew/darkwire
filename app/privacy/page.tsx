import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "How DarkWire Media handles your information.", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <section className="article">
      <div className="wrap prose">
        <div className="kicker">Legal</div>
        <h1 style={{ fontSize: "clamp(34px,5vw,56px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>Privacy Policy</h1>
        <p className="meta">Last updated November 13, 2026</p>
        <p>DarkWire Media (&quot;we&quot;) runs this website. This page explains what we collect and why. Short version: we collect as little as possible and never sell it.</p>
        <h2>What we collect</h2>
        <ul>
          <li><strong>Your email address</strong>, if you sign up for the newsletter or a product waitlist. We use it only to send you the newsletter and news about our products.</li>
          <li><strong>Basic technical data</strong> that every website receives (like your IP address and browser type), used to keep the site running and to stop spam and abuse.</li>
        </ul>
        <h2>What we don&apos;t do</h2>
        <ul>
          <li>We don&apos;t sell or rent your information.</li>
          <li>We don&apos;t run third-party advertising trackers on this site.</li>
        </ul>
        <h2>Service providers</h2>
        <p>The site is hosted by Vercel. We use Vercel Web Analytics to count visits and see which pages people read. It doesn&apos;t use cookies and doesn&apos;t identify you personally. Newsletter sign-ups are stored securely and will be managed with an email service provider, which processes your email only to deliver the newsletter. If you buy a digital product, Stripe handles your payment details; we never see your card number. We use the email address from your order only to send you your download link and help with that order.</p>
        <h2>Your choices</h2>
        <p>Every newsletter email has a one-click unsubscribe link. To have your email deleted from our list entirely, email support@darkwire-media.com or message us on Instagram (@darkwire.media) and we&apos;ll remove it.</p>
        <h2>Children</h2>
        <p>This site isn&apos;t directed at children under 13, and we don&apos;t knowingly collect their information.</p>
        <h2>Changes</h2>
        <p>If this policy changes, we&apos;ll update the date above.</p>
      </div>
    </section>
  );
}
