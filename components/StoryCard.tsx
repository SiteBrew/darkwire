import Link from "next/link";
import { ago, type Story } from "@/lib/feed";
import { deskOf } from "@/lib/site";

export function DeskTag({ desk }: { desk: string }) {
  const d = deskOf(desk);
  return (
    <span className="tag" style={{ color: d.color }}>
      {d.tag}
    </span>
  );
}

export function StoryCard({ s, priority = false }: { s: Story; priority?: boolean }) {
  return (
    <Link href={`/news/${s.slug}`} className="card">
      {s.image && (
        <div className="img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image} alt="" loading={priority ? "eager" : "lazy"} />
        </div>
      )}
      <div className="body">
        <DeskTag desk={s.desk} />
        <h3>{s.headline}</h3>
        {s.dek && <p>{s.dek}</p>}
        <div className="row">
          <span className="meta">{ago(s.published)}</span>
          <span className="meta">{s.sources.length} source{s.sources.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </Link>
  );
}

export function Feature({ s }: { s: Story }) {
  return (
    <Link href={`/news/${s.slug}`} className="feature">
      {s.image && (
        <div className="img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image} alt="" />
        </div>
      )}
      <div className="body">
        <DeskTag desk={s.desk} />
        <h3>{s.headline}</h3>
        {s.dek && <p>{s.dek}</p>}
        <span className="meta">
          {ago(s.published)} · {[...new Set(s.sources.map((x) => x.outlet))].slice(0, 3).join(", ")}
        </span>
      </div>
    </Link>
  );
}
