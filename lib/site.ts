// Site-wide settings. The live domain comes from NEXT_PUBLIC_SITE_URL once one is connected; until then
// Vercel's own production address.
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || fromVercel || "http://localhost:3000").replace(/\/$/, "");

export const SITE = {
  name: "DarkWire Media",
  short: "DarkWire",
  tagline: "The daily wire for AI & tech.",
  description:
    "DarkWire Media is the daily wire for AI and tech: fact-checked news, launches, money moves and drama from 27 established newsrooms, plus plain-English guides. Every story names its sources.",
  handle: "@darkwire.media",
};

/** Desk colors match DarkWire's covers on Instagram. */
export const DESKS: Record<string, { label: string; tag: string; color: string; blurb: string }> = {
  breaking: { label: "The Wire", tag: "BREAKING", color: "#FF4D4D", blurb: "The biggest AI and tech story of the moment: what happened, who it hits, what's next." },
  launch: { label: "Launch", tag: "LAUNCH", color: "#3DFFA0", blurb: "New models, products, features and devices, and what they can actually do." },
  drama: { label: "Drama", tag: "DRAMA", color: "#FF4FD8", blurb: "Feuds, lawsuits and shake-ups in tech. Who said and did what, no side-taking." },
  policy: { label: "Policy", tag: "POLICY", color: "#00D9FF", blurb: "Laws, bans, rulings and hearings touching AI and tech. Strictly neutral." },
  money: { label: "Money", tag: "MONEY", color: "#FFC94D", blurb: "Funding, acquisitions, earnings, valuations and layoffs." },
  research: { label: "Research", tag: "RESEARCH", color: "#00D9FF", blurb: "Papers, benchmarks and breakthroughs, explained plainly." },
  security: { label: "Security", tag: "SECURITY", color: "#00D9FF", blurb: "Hacks, breaches, scams and privacy, and what to do about them." },
  hardware: { label: "Hardware", tag: "HARDWARE", color: "#00D9FF", blurb: "Chips, GPUs, phones, robots, cars and gadgets." },
  win: { label: "Win", tag: "WIN", color: "#00D9FF", blurb: "Good news: tech helping medicine, science, accessibility and underdogs." },
  decoded: { label: "Decoded", tag: "DECODED", color: "#00D9FF", blurb: "The concepts behind the headlines, explained so anyone gets it." },
  archive: { label: "Archive", tag: "ARCHIVE", color: "#00D9FF", blurb: "True, surprising facts from tech history." },
};

export const deskOf = (key: string) => DESKS[key] || { label: key, tag: key.toUpperCase(), color: "#00D9FF", blurb: "" };
