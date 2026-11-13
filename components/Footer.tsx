import Link from "next/link";
import { SUPPORT_EMAIL } from "@/lib/products";
import { SITE } from "@/lib/site";
import { FollowIcons } from "./Follow";
import { Mark, Wordmark } from "./Mark";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" aria-label="DarkWire Media home">
              <Mark size={28} />
              <span>
                <Wordmark />
              </span>
            </Link>
            <p style={{ color: "var(--soft)", marginTop: 16, maxWidth: 340, fontSize: 14.5 }}>{SITE.tagline} Fact-checked from established newsrooms, every source named.</p>
            <div style={{ marginTop: 20 }}>
              <FollowIcons />
            </div>
          </div>
          <div>
            <h4>The wire</h4>
            <ul>
              <li><Link href="/news">Latest news</Link></li>
              <li><Link href="/desk/breaking">Breaking</Link></li>
              <li><Link href="/desk/launch">Launches</Link></li>
              <li><Link href="/desk/money">Money</Link></li>
              <li><Link href="/desk/drama">Drama</Link></li>
            </ul>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              <li><Link href="/guides">Guides</Link></li>
              <li><Link href="/guides/ai-glossary">AI glossary</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/newsletter">Newsletter</Link></li>
            </ul>
          </div>
          <div>
            <h4>DarkWire</h4>
            <ul>
              <li><Link href="/about">How we verify</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><a href="/feed.xml">RSS feed</a></li>
              <li><a href={`mailto:${SUPPORT_EMAIL}`}>Contact &amp; support</a></li>
            </ul>
          </div>
        </div>
        <div className="fine">
          <span>© {new Date().getFullYear()} DarkWire Media</span>
          <span>Signal over noise</span>
        </div>
      </div>
    </footer>
  );
}
