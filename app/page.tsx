import Link from "next/link";
import { Follow } from "@/components/Follow";
import { Icon } from "@/components/Icons";
import { NewsletterForm } from "@/components/Newsletter";
import { DeskTag, Feature, StoryCard } from "@/components/StoryCard";
import { ago, getFeed, REVALIDATE } from "@/lib/feed";
import { allGuides } from "@/lib/guides";
import { DESKS } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

export const revalidate = 300;

const SHOWN_DESKS = ["breaking", "launch", "money", "drama", "policy", "security", "research", "decoded"];

export default async function Home() {
  const { stories } = await getFeed();
  const [top, second, ...rest] = stories;
  const latest = rest.slice(0, 6);
  const guides = allGuides().slice(0, 3);
  const deskCounts = stories.reduce<Record<string, number>>((a, s) => ((a[s.desk] = (a[s.desk] || 0) + 1), a), {});

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="kicker">Signal over noise</div>
            <h1>
              The daily wire for <span className="cyan">AI &amp; tech.</span>
            </h1>
            <p className="lead">The biggest stories in AI and tech, fact-checked against the reporting and cut down to what matters. Every story names its sources. No hype, no rumors.</p>
            <div className="actions">
              <Link href="/news" className="btn solid">
                Read the wire <Icon name="arrow" />
              </Link>
              <Link href="/newsletter" className="btn">
                Get it by email
              </Link>
            </div>
            <div className="stats">
              <div>
                <b>27</b>
                <span>Newsrooms</span>
              </div>
              <div>
                <b>100%</b>
                <span>Sourced</span>
              </div>
              <div>
                <b>Daily</b>
                <span>On the wire</span>
              </div>
            </div>
          </div>
          {top && (
            <Link href={`/news/${top.slug}`} className="hero-card" aria-label={top.headline}>
              <span className="corner tl" />
              <span className="corner br" />
              {top.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={top.image} alt={top.headline} fetchPriority="high" />
              )}
              <div className="cap">
                <DeskTag desk={top.desk} />
                <span className="meta">{ago(top.published)}</span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="head-row">
            <div>
              <div className="kicker">Latest on the wire</div>
              <h2 className="h2">What happened today.</h2>
            </div>
            <Link href="/news" className="more">
              All stories →
            </Link>
          </div>
          {stories.length === 0 ? (
            <div className="empty">The wire is warming up. Stories land here as they post.</div>
          ) : (
            <>
              {second && <Feature s={second} />}
              <div className="grid" style={{ marginTop: 20 }}>
                {latest.map((s, i) => (
                  <StoryCard key={s.id} s={s} priority={i < 3} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="head-row">
            <div>
              <div className="kicker">The desks</div>
              <h2 className="h2">Pick your channel.</h2>
            </div>
          </div>
          <div className="desks">
            {SHOWN_DESKS.map((k) => (
              <Link key={k} href={`/desk/${k}`} className="desk">
                <span className="tag" style={{ color: DESKS[k].color, alignSelf: "flex-start" }}>
                  {DESKS[k].tag}
                </span>
                <b>{DESKS[k].label}</b>
                <p>{DESKS[k].blurb}</p>
                <span className="meta">{deskCounts[k] ? `${deskCounts[k]} ${deskCounts[k] === 1 ? "story" : "stories"}` : "Open the desk"} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="head-row">
            <div>
              <div className="kicker">How we verify</div>
              <h2 className="h2">If it&apos;s not confirmed, it&apos;s not posted.</h2>
            </div>
            <Link href="/about" className="more">
              The full method →
            </Link>
          </div>
          <div className="verify">
            <div className="step">
              <b>Real newsrooms only</b>
              <p>We read 27 established outlets and companies&apos; own announcements. Never rumor accounts or anonymous posts.</p>
            </div>
            <div className="step">
              <b>Facts from the article</b>
              <p>Every line comes from facts pulled out of the actual reporting, with numbers and names exactly as published.</p>
            </div>
            <div className="step">
              <b>Two sources for the spicy stuff</b>
              <p>Drama and politics need two outlets or an official statement. Allegations say who&apos;s alleging them.</p>
            </div>
            <div className="step">
              <b>Checked twice, sources named</b>
              <p>Everything is checked again before it posts, and every story links to where it came from.</p>
            </div>
          </div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="head-row">
              <div>
                <div className="kicker">Guides</div>
                <h2 className="h2">Get it, then use it.</h2>
              </div>
              <Link href="/guides" className="more">
                All guides →
              </Link>
            </div>
            <div className="glist">
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
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="head-row">
            <div>
              <div className="kicker">The shop</div>
              <h2 className="h2">Playbooks, built from the wire.</h2>
            </div>
            <Link href="/shop" className="more">
              Visit the shop →
            </Link>
          </div>
          <div className="glist">
            {PRODUCTS.slice(0, 3).map((p) => (
              <div key={p.slug} className="product">
                <span className="soon">{p.status === "live" ? "OUT NOW" : "DROPPING SOON"}</span>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <span className="price">{p.kind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="signal">
            <div>
              <div className="kicker">The newsletter</div>
              <h2>Get the wire in your inbox.</h2>
              <p>The day&apos;s biggest AI and tech stories in one short email, fact-checked and sourced. Plus first access to new guides and playbooks.</p>
            </div>
            <NewsletterForm source="home" />
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
