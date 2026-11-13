"use client";
import { useState } from "react";

/** Sign-up for the DarkWire newsletter. */
export function NewsletterForm({ source = "site", cta = "Subscribe" }: { source?: string; cta?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const hp = (new FormData(e.currentTarget).get("website") as string) || "";
    setState("busy");
    try {
      const r = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, source, website: hp }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.error || "Couldn't sign you up. Try again.");
      setState("ok");
      setMsg(j.already ? "You're already on the wire." : "You're on the wire. Watch your inbox.");
      setEmail("");
    } catch (err: any) {
      setState("err");
      setMsg(err.message);
    }
  }
  return (
    <form className="form" onSubmit={submit}>
      <label className="sr" htmlFor={`email-${source}`}>
        Email address
      </label>
      <input id={`email-${source}`} type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn solid" type="submit" disabled={state === "busy"}>
        {state === "busy" ? "Sending…" : cta}
      </button>
      {state === "ok" && <p className="ok" role="status">✓ {msg}</p>}
      {state === "err" && <p className="err" role="alert">{msg}</p>}
      {state !== "ok" && <p className="note">The day's biggest AI and tech stories, fact-checked. Free. Unsubscribe anytime.</p>}
    </form>
  );
}
