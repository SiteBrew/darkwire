import "server-only";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { Marked } from "marked";

// Evergreen guides live as Markdown in content/guides. The top block holds the details:
// ---
// title: …
// description: … (the search snippet, ~150 characters)
// updated: 2026-11-13
// category: Basics
// faq: Question one? | Answer one. || Question two? | Answer two.
// ---

export type Guide = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  category: string;
  minutes: number;
  html: string;
  toc: { id: string; text: string }[];
  faq: { q: string; a: string }[];
};

const DIR = join(process.cwd(), "content", "guides");
const idOf = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function parse(file: string): Guide {
  const raw = readFileSync(join(DIR, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta: Record<string, string> = {};
  for (const line of (m?.[1] || "").split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const body = m?.[2] || raw;
  const toc: Guide["toc"] = [];
  const md = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = idOf(text);
        if (depth === 2) toc.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${text}</h${depth}>`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const ext = /^https?:\/\//.test(href);
        return `<a href="${href}"${title ? ` title="${title}"` : ""}${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text}</a>`;
      },
    },
  });
  const html = md.parse(body) as string;
  const words = body.split(/\s+/).length;
  const faq = (meta.faq || "")
    .split("||")
    .map((x) => x.split("|").map((y) => y.trim()))
    .filter((x) => x.length === 2 && x[0] && x[1])
    .map(([q, a]) => ({ q, a }));
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title || file,
    description: meta.description || "",
    updated: meta.updated || "2026-11-13",
    category: meta.category || "Guide",
    minutes: Math.max(2, Math.round(words / 230)),
    html,
    toc,
    faq,
  };
}

export function allGuides(): Guide[] {
  let files: string[] = [];
  try {
    files = readdirSync(DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  return files.map(parse).sort((a, b) => a.title.localeCompare(b.title));
}

export const guide = (slug: string) => allGuides().find((g) => g.slug === slug) || null;
