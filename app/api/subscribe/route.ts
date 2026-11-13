import { NextResponse } from "next/server";

// Passes newsletter sign-ups to the Signal Tower, which stores them until the email platform is connected.
const SUB = (process.env.DW_SUBSCRIBE_URL || "https://sitebrew-cockpit.vercel.app/api/public/dw/subscribe").trim();

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (body.website) return NextResponse.json({ ok: true });
  const email = String(body.email || "").trim().slice(0, 200);
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) return NextResponse.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });
  const ip = req.headers.get("x-real-ip") || (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  try {
    const r = await fetch(SUB, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, ip, source: String(body.source || "site").slice(0, 40) }) });
    const j = await r.json().catch(() => ({}));
    return NextResponse.json(j.ok ? { ok: true, already: !!j.already } : { ok: false, error: j.error || "Couldn't sign you up. Try again." }, { status: j.ok ? 200 : 400 });
  } catch {
    return NextResponse.json({ ok: false, error: "Couldn't sign you up right now. Try again in a minute." }, { status: 502 });
  }
}
