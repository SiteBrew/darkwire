// Simple outline glyphs for the follow links.
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function Icon({ name }: { name: string }) {
  switch (name) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" {...S} />
          <circle cx="12" cy="12" r="4.2" {...S} />
          <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" {...S} />
          <path d="M14 3c.6 2.6 2.4 4.3 5 4.6" {...S} />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" {...S} />
          <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
        </svg>
      );
    case "bluesky":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 11.2C10.6 8.4 7 4.4 4.6 4.4c-1.5 0-1.6 1.7-1.6 3 0 1.7.9 5 3.6 5.4-2.4.6-3 2.4-1.4 4.1 2.6 2.8 4.5-.5 6.8-4.7 2.3 4.2 4.2 7.5 6.8 4.7 1.6-1.7 1-3.5-1.4-4.1 2.7-.4 3.6-3.7 3.6-5.4 0-1.3-.1-3-1.6-3-2.4 0-6 4-7.4 6.8z" {...S} />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" {...S} />
        </svg>
      );
    case "menu":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" {...S} />
        </svg>
      );
  }
  return null;
}
