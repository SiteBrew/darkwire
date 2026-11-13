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
  // Product page
  seoTitle?: string;
  seoDescription?: string;
  hero?: string; // 3D cover, 1:1
  chapters?: string[];
  forWho?: string[];
  previews?: { src: string; alt: string }[];
  faq?: { q: string; a: string }[];
  guides?: string[]; // related free guides (slugs)
};

export const SUPPORT_EMAIL = "support@darkwire-media.com";

// Questions every buyer has, answered the same way on every product page
const BUY_FAQ = (pages: number) => [
  { q: "How do I get the PDF?", a: "Right after checkout you land on your download page with a button to download the PDF. We also email you a link to that page so you can download it again anytime, on any device." },
  { q: "What format is it?", a: `A ${pages}-page, letter-size PDF. It reads well on a phone, tablet or computer, and prints cleanly in color or black and white.` },
  { q: "Is checkout secure?", a: "Yes. Payment is handled by Stripe, so DarkWire never sees or stores your card details." },
  { q: "What if something's wrong with my file?", a: `Email ${SUPPORT_EMAIL} and we'll make it right. Because downloads are instant, sales are final, but if a file doesn't work or isn't what we described, we'll fix it or refund you.` },
];

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
    seoTitle: "The AI Autopilot Playbook: Run a Business With AI Agents (PDF)",
    seoDescription: "How one person runs a news brand, an online shop and social accounts with a crew of AI agents. The real setup, guardrails, what breaks, and a weekend plan with prompt templates. 30-page PDF.",
    hero: "/shop/hero/ai-autopilot-playbook.jpg",
    chapters: ["One person, a crew of agents", "The crew model", "The stack", "Case study: a fact-checked news brand", "Case study: a printables shop", "Case study: local business marketing", "Guardrails", "What breaks (and how to catch it)", "Your first agent in a weekend", "Templates"],
    forWho: ["Solo founders and creators who want to run more with less", "Small teams curious how AI agents work in a real operation", "Anyone who's tried ChatGPT and wants the next step: systems, not one-off prompts"],
    previews: [
      { src: "/shop/preview/ai-autopilot-playbook-1.jpg", alt: "Table of contents" },
      { src: "/shop/preview/ai-autopilot-playbook-2.jpg", alt: "The crew model: four roles" },
      { src: "/shop/preview/ai-autopilot-playbook-3.jpg", alt: "Your first agent in a weekend" },
    ],
    faq: [
      { q: "Do I need to know how to code?", a: "No. Chapter 9 has you run the whole crew by hand in a chatbot first, using the included prompts. Automating one loop is the last step, and the playbook explains what that involves." },
      { q: "Which AI tools does it use?", a: "The ideas work with any major AI model. The playbook describes the stack behind DarkWire as an example, but the crew model, guardrails and templates aren't tied to one tool." },
    ],
    guides: ["what-is-an-ai-agent", "how-to-write-better-ai-prompts"],
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
    checkout: "https://buy.stripe.com/bJebJ2ehc4gs7RO2Fw9R602",
    bullets: [
      "12 workflows with prompts: reviews, emails, social posts, job ads, quotes, SOPs",
      "The 30-minute setup that makes AI sound like your business",
      "A 4-week content calendar and 20 post ideas",
      "A 30-day plan, guardrails and a one-page AI policy for your team",
    ],
    seoTitle: "AI for Small Business: Starter Kit With 12 Workflows (PDF)",
    seoDescription: "A plain-English AI starter kit for small business owners: which tools are worth it, a 30-minute setup, and 12 copy-paste workflows for reviews, email, social posts, job ads and more. 27-page PDF.",
    hero: "/shop/hero/ai-for-small-business.jpg",
    chapters: ["Start here", "Choosing your tools", "Set up in 30 minutes", "12 workflows that save hours", "Marketing kit", "Guardrails", "Your 30-day plan", "Templates"],
    forWho: ["Owners of service businesses, shops, restaurants and trades", "Busy teams who want AI to handle first drafts", "Anyone who's heard AI can save time but doesn't know where to start"],
    previews: [
      { src: "/shop/preview/ai-for-small-business-1.jpg", alt: "Table of contents" },
      { src: "/shop/preview/ai-for-small-business-2.jpg", alt: "Copy-paste workflow prompts" },
      { src: "/shop/preview/ai-for-small-business-3.jpg", alt: "4-week content calendar and 20 post ideas" },
    ],
    faq: [
      { q: "Which AI tool do I need?", a: "Any major chatbot works: ChatGPT, Claude, Gemini or Copilot. Chapter 2 helps you pick one and explains what to look for in a business plan." },
      { q: "Is it technical?", a: "Not at all. Everything is plain English, and every workflow is a prompt you copy, paste and fill in. No code, no setup beyond your chatbot." },
    ],
    guides: ["how-to-write-better-ai-prompts", "ai-glossary"],
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
    checkout: "https://buy.stripe.com/cNi3cwc94eV6b40dka9R601",
    bullets: [
      "The five-check method and a verdict scale from Confirmed to False",
      "Spot AI images, deepfakes, recycled video and fake screenshots",
      "Read statistics and charts without getting fooled",
      "5 printable cards, including a scam-call card and a family safe-word card",
    ],
    seoTitle: "The Fact-Check Field Guide: Spot Fakes, Deepfakes and Scams (PDF)",
    seoDescription: "DarkWire's fact-checking method as a printable guide: check news, AI images, deepfakes, fake screenshots, statistics and scam calls in minutes. Includes 5 cut-out cards. 32-page PDF.",
    hero: "/shop/hero/fact-check-field-guide.jpg",
    chapters: ["The method", "Checking a news story", "Images", "Video and audio", "Screenshots", "Numbers and statistics", "Scams", "The toolkit", "The cards"],
    forWho: ["Anyone who wants to stop sharing things that turn out to be fake", "Parents and families worried about voice-clone and phone scams", "Teachers, librarians and teams who need a simple method to teach"],
    previews: [
      { src: "/shop/preview/fact-check-field-guide-1.jpg", alt: "Table of contents" },
      { src: "/shop/preview/fact-check-field-guide-2.jpg", alt: "The verdict scale" },
      { src: "/shop/preview/fact-check-field-guide-3.jpg", alt: "Printable image-check card" },
    ],
    faq: [
      { q: "How is this different from your free guides?", a: "The free guides cover single topics. The Field Guide is the full method in one place, with deeper chapters on video, statistics and scams, a toolkit of free tools, and five printable cards." },
      { q: "Can I print the cards for my family or class?", a: "Yes. Print as many copies as you like for your own household, classroom or team. Please don't resell or repost the PDF." },
    ],
    guides: ["how-to-fact-check-a-tech-story", "how-to-spot-ai-generated-images", "ai-voice-clone-scams"],
  },
];

export const product = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const buyerFaq = (p: Product) => [...(p.faq || []), ...BUY_FAQ(p.pages || 0)];

export const liveProducts = () => PRODUCTS.filter((p) => p.status === "live" && p.checkout);
