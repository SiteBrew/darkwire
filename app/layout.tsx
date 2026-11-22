import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Ticker } from "@/components/Ticker";
import { getFeed, getSocials } from "@/lib/feed";
import { SITE, SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sans = localFont({ src: "./fonts/Inter.woff2", variable: "--font-sans", weight: "100 900", display: "swap" });
const mono = localFont({
  src: [
    { path: "./fonts/JetBrainsMono-400.woff2", weight: "400" },
    { path: "./fonts/JetBrainsMono-700.woff2", weight: "700" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name}: The Daily Wire for AI & Tech`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["AI news", "tech news", "artificial intelligence", "AI launches", "AI guides", "DarkWire"],
  alternates: { canonical: "/", types: { "application/rss+xml": [{ url: "/feed.xml", title: "DarkWire Media" }] } },
  openGraph: { type: "website", siteName: SITE.name, title: `${SITE.name}: The Daily Wire for AI & Tech`, description: SITE.description, url: "/", locale: "en_US" },
  twitter: { card: "summary_large_image", title: `${SITE.name}: The Daily Wire for AI & Tech`, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  category: "technology",
};

export const viewport: Viewport = { themeColor: "#0a0a0a", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [{ stories }, socials] = await Promise.all([getFeed(), getSocials()]);
  const org = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "@id": `${SITE_URL}/#org`,
    name: SITE.name,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
    sameAs: socials.map((s) => s.url),
    description: SITE.description,
    publishingPrinciples: `${SITE_URL}/about`,
    verificationFactCheckingPolicy: `${SITE_URL}/about`,
  };
  const site = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#site`, name: SITE.name, url: SITE_URL, publisher: { "@id": `${SITE_URL}/#org` }, inLanguage: "en-US" };
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr">
          Skip to content
        </a>
        <Ticker stories={stories} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={[org, site]} />
        <Analytics />
      </body>
    </html>
  );
}
