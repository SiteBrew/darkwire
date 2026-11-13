import type { Metadata } from "next";
import Link from "next/link";
import { Follow } from "@/components/Follow";

export const metadata: Metadata = {
  title: "How We Verify: DarkWire's Fact-Checking Rules",
  description: "How every DarkWire story gets checked: established newsrooms only, facts from the actual reporting, two sources for drama and politics, every line checked twice, sources named.",
  alternates: { canonical: "/about" },
};

const RULES = [
  { k: "01 // The sources", t: "Real newsrooms. Never rumors.", b: "We pull only from established outlets with editors and corrections policies, plus companies' own announcements. No social media posts, forums or rumor sites." },
  { k: "02 // The fact desk", t: "We read the actual reporting.", b: "Before a word is written, the original articles are read in full. A claim makes the story only if the reporting states it plainly, with names and numbers exactly as published." },
  { k: "03 // Two-source rule", t: "Drama and politics need two sources.", b: "Feuds, allegations and political stories need two independent outlets or an official statement. Allegations are always attributed, never stated as fact." },
  { k: "04 // The final check", t: "Every line, checked twice.", b: "Each finished story is checked line by line against the verified facts. Anything we can't confirm is cut. A story we can't confirm doesn't run at all." },
  { k: "05 // No takes", t: "Politics, straight.", b: "We report what happened and what each side said. No opinions, no spin, no sides." },
  { k: "06 // Receipts", t: "Sources on every story.", b: "Every story names and links the outlets behind it, so you can check us." },
];

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">How we verify</div>
          <h1>
            If it&apos;s not confirmed, <span className="cyan">it&apos;s not posted.</span>
          </h1>
          <p>DarkWire Media is a daily wire for AI and tech news. Here are the rules every story runs on, from the first source to the final check.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="glist">
            {RULES.map((r) => (
              <div key={r.k} className="gcard">
                <span className="meta cyan">{r.k}</span>
                <h3>{r.t}</h3>
                <p>{r.b}</p>
              </div>
            ))}
          </div>
          <div className="prose" style={{ marginTop: 56 }}>
            <h2>How DarkWire is made</h2>
            <p>DarkWire is produced with the help of AI tools. They read the reporting, pull out the facts and draft each story, and every one of the rules above applies to them. Nothing is published from memory or guesswork: if a fact isn&apos;t in the sources, it isn&apos;t in the story.</p>
            <h2>Corrections</h2>
            <p>
              Spot an error? Send us a DM on <a href="https://www.instagram.com/darkwire.media/" target="_blank" rel="noopener noreferrer">Instagram</a> with the story and what&apos;s wrong. If we got it wrong, we fix it and say so.
            </p>
            <h2>What we cover</h2>
            <p>
              Launches, money moves, research, security, policy and the occasional tech-world drama, sorted into <Link href="/news">desks</Link>. Plus plain-English <Link href="/guides">guides</Link> to the ideas behind the headlines.
            </p>
          </div>
          <div style={{ marginTop: 48 }}>
            <div className="kicker">Follow the signal</div>
            <Follow />
          </div>
        </div>
      </section>
    </>
  );
}
