import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head" style={{ borderBottom: "none", minHeight: "50vh" }}>
      <div className="wrap">
        <div className="kicker">404 // Signal lost</div>
        <h1>
          Nothing on <span className="cyan">this wire.</span>
        </h1>
        <p>That page moved or never existed. The latest stories are one click away.</p>
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <Link href="/news" className="btn solid">
            Latest news
          </Link>
          <Link href="/" className="btn ghost">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
