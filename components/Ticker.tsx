import Link from "next/link";
import type { Story } from "@/lib/feed";
import { deskOf } from "@/lib/site";

/** The live wire: the latest headlines scrolling across the top of every page. */
export function Ticker({ stories }: { stories: Story[] }) {
  const items = stories.slice(0, 12);
  if (!items.length) return null;
  const row = items.map((s) => (
    <Link key={s.id} href={`/news/${s.slug}`} className="item">
      <b style={{ color: deskOf(s.desk).color }}>{deskOf(s.desk).tag}</b>
      {s.headline}
    </Link>
  ));
  return (
    <div className="ticker" aria-label="Latest headlines">
      <div className="live">
        <span className="dot" aria-hidden="true" />
        LIVE WIRE
      </div>
      <div className="track">
        {row}
        <span aria-hidden="true" style={{ display: "contents" }}>
          {items.map((s) => (
            <Link key={`${s.id}-2`} href={`/news/${s.slug}`} className="item" tabIndex={-1}>
              <b style={{ color: deskOf(s.desk).color }}>{deskOf(s.desk).tag}</b>
              {s.headline}
            </Link>
          ))}
        </span>
      </div>
    </div>
  );
}
