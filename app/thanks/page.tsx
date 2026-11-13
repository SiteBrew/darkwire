import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { NewsletterForm } from "@/components/Newsletter";
import { PRODUCTS } from "@/lib/products";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your Download",
  robots: { index: false, follow: false },
};

// Stripe sends buyers here with ?session_id=…; the cockpit checks the payment with Stripe and returns signed links.
const ORDER = (process.env.DW_ORDER_URL || "https://sitebrew-cockpit.vercel.app/api/public/dw/order").trim();

type Item = { slug: string; title: string; download: string };
type Res = { ok: true; test: boolean; items: Item[] } | { ok: false; error: string };

async function lookup(id: string): Promise<Res> {
  try {
    const r = await fetch(`${ORDER}?session_id=${encodeURIComponent(id)}`, { cache: "no-store" });
    return (await r.json()) as Res;
  } catch {
    return { ok: false, error: "stripe" };
  }
}

const MSG: Record<string, [string, string]> = {
  missing: ["Looking for your download?", "Open the link you were sent to after checkout. If you closed it, find the payment receipt from Stripe in your email and reply to it, and we'll send your download."],
  invalid: ["That link doesn't look right.", "Open the page you were sent to right after checkout, or reply to your Stripe receipt email and we'll send your download."],
  not_found: ["We couldn't find that order.", "Double-check the link from checkout, or reply to your Stripe receipt email and we'll sort it out."],
  unpaid: ["Your payment is still processing.", "Give it a minute, then refresh this page. Some payment methods take a little longer to confirm."],
  unknown_product: ["We found your order, but not the file.", "That's on us. Reply to your Stripe receipt email and we'll send your download right away."],
  setup: ["Downloads are almost ready.", "We're finishing the setup on our end. Refresh in a few minutes, or reply to your Stripe receipt email."],
  stripe: ["We couldn't reach the payment system.", "Refresh this page in a moment. Your purchase is safe."],
};

export default async function Thanks({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const res: Res = session_id ? await lookup(session_id) : { ok: false, error: "missing" };

  if ("error" in res) {
    const [h, p] = MSG[res.error] || MSG.stripe;
    return (
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">Your order</div>
          <h1>{h}</h1>
          <p>{p}</p>
          <div className="actions" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/shop" className="btn ghost">
              Back to the shop
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">{res.test ? "Test purchase · no real charge" : "Payment confirmed"}</div>
          <h1>
            You&apos;re <span className="cyan">in.</span>
          </h1>
          <p>Thanks for supporting DarkWire. Your download is ready below. Bookmark this page: it&apos;ll always give you a fresh download link.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap glist">
          {res.items.map((it) => {
            const p = PRODUCTS.find((x) => x.slug === it.slug);
            return (
              <div key={it.slug} className="product">
                {p?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="product-cover" src={p.image} alt={`${it.title} cover`} width={640} height={828} />
                )}
                <h3>{it.title}</h3>
                <p>PDF{p?.pages ? ` · ${p.pages} pages` : ""} · Letter size, made to read on screen or print.</p>
                <a className="btn solid" href={it.download.replace("/api/public/dw/download/", "/download/")}>
                  Download PDF <Icon name="arrow" />
                </a>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="signal">
            <div>
              <div className="kicker">Stay on the wire</div>
              <h2>Get the next drop first.</h2>
              <p>The day&apos;s biggest AI and tech stories in one short email, plus every new playbook before anyone else.</p>
            </div>
            <NewsletterForm source="thanks" />
          </div>
        </div>
      </section>
    </>
  );
}
