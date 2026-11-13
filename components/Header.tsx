"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icons";
import { Mark, Wordmark } from "./Mark";

const NAV = [
  { href: "/news", label: "News" },
  { href: "/guides", label: "Guides" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "How we verify" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="DarkWire Media home" onClick={() => setOpen(false)}>
          <Mark size={30} />
          <span>
            <Wordmark />
          </span>
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/newsletter" className="btn">
          Get the wire
        </Link>
        <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name="menu" />
        </button>
      </div>
      <nav className="mobile-nav" hidden={!open} aria-label="Mobile">
        {[...NAV, { href: "/newsletter", label: "Get the wire" }].map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
