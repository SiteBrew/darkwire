// The shop's digital products. Add one here (status "live" with a checkout link) and it shows up on the site.
export type Product = {
  slug: string;
  title: string;
  blurb: string;
  kind: string; // e.g. "Guide · PDF"
  price?: number; // USD
  status: "soon" | "live";
  checkout?: string; // payment link (Stripe, Gumroad, Lemon Squeezy…)
  bullets?: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "ai-autopilot-playbook",
    title: "The AI Autopilot Playbook",
    blurb: "How one person runs a news brand, a shop and four social accounts with a crew of AI agents. The real setup, step by step.",
    kind: "Playbook · PDF",
    status: "soon",
  },
  {
    slug: "ai-for-small-business",
    title: "AI for Small Business: The Starter Kit",
    blurb: "The tools worth paying for, the ones to skip, and ready-to-use workflows for email, marketing and admin.",
    kind: "Guide + templates",
    status: "soon",
  },
  {
    slug: "fact-check-field-guide",
    title: "The Fact-Check Field Guide",
    blurb: "DarkWire's verification method as a checklist: spot fake screenshots, AI images and bad stats before you share them.",
    kind: "Guide · PDF",
    status: "soon",
  },
];
