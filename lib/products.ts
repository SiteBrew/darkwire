// The shop's digital products. To sell one: set status "live" and paste its checkout link. It shows up on the site with a buy button.
export type Product = {
  slug: string;
  title: string;
  blurb: string;
  kind: string; // e.g. "Guide · PDF"
  price?: number; // USD
  pages?: number;
  image?: string; // cover, served from /public
  status: "soon" | "live";
  checkout?: string; // payment link (Lemon Squeezy, Stripe, Gumroad…)
  bullets?: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "ai-autopilot-playbook",
    title: "The AI Autopilot Playbook",
    blurb: "How one person runs a news brand, an online shop and a stack of social accounts with a crew of AI agents. The real setup, the rules that keep it safe, and what breaks.",
    kind: "Playbook · PDF",
    price: 39,
    pages: 30,
    image: "/shop/ai-autopilot-playbook.jpg",
    status: "live",
    checkout: "https://buy.stripe.com/00wdRaflg00c6NKbc29R600",
    bullets: [
      "The crew model: planner, writer, designer and critic, and why the critic matters most",
      "Three real case studies: a fact-checked news brand, a printables shop, local business marketing",
      "Guardrails, plus the daily check that catches what breaks",
      "Build your first agent in a weekend, with copy-paste prompt templates",
    ],
  },
  {
    slug: "ai-for-small-business",
    title: "AI for Small Business: The Starter Kit",
    blurb: "The plain-English starter kit for owners: which AI tools are worth it, how to set them up in 30 minutes, and 12 copy-paste workflows that save hours every week.",
    kind: "Starter kit · PDF",
    price: 24,
    pages: 27,
    image: "/shop/ai-for-small-business.jpg",
    status: "live",
    checkout: "https://buy.stripe.com/cNi3cwc94eV6b40dka9R601",
    bullets: [
      "12 workflows with prompts: reviews, emails, social posts, job ads, quotes, SOPs",
      "The 30-minute setup that makes AI sound like your business",
      "A 4-week content calendar and 20 post ideas",
      "A 30-day plan, guardrails and a one-page AI policy for your team",
    ],
  },
  {
    slug: "fact-check-field-guide",
    title: "The Fact-Check Field Guide",
    blurb: "DarkWire's verification method, made printable. Check stories, images, video, screenshots, numbers and scam calls in minutes.",
    kind: "Field guide · PDF",
    price: 15,
    pages: 32,
    image: "/shop/fact-check-field-guide.jpg",
    status: "live",
    checkout: "https://buy.stripe.com/bJebJ2ehc4gs7RO2Fw9R602",
    bullets: [
      "The five-check method and a verdict scale from Confirmed to False",
      "Spot AI images, deepfakes, recycled video and fake screenshots",
      "Read statistics and charts without getting fooled",
      "5 printable cards, including a scam-call card and a family safe-word card",
    ],
  },
];

export const liveProducts = () => PRODUCTS.filter((p) => p.status === "live" && p.checkout);
