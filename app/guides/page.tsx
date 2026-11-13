import type { Metadata } from "next";
import Link from "next/link";
import { allGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "AI Guides: Plain-English How-Tos",
  description: "Plain-English guides to AI and tech: what AI agents are, how to write better prompts, spot AI images and scams, and fact-check a story in five minutes.",
  alternates: { canonical: "/guides" },
};

export default function Guides() {
  const guides = allGuides();
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">Guides</div>
          <h1>
            Get it. <span className="cyan">Use it.</span>
          </h1>
          <p>Plain-English guides to the AI and tech everyone&apos;s talking about. No jargon, no hype, just what it is and how to use it.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap glist">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="gcard">
              <span className="meta">
                {g.category} · {g.minutes} min read
              </span>
              <h3>{g.title}</h3>
              <p>{g.description}</p>
              <span className="more">Read the guide →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
