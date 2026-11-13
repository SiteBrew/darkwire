# DarkWire Media website

The daily wire for AI & tech. Next.js on Vercel.

- **Stories** come from the Signal Tower's public feed (`DW_FEED_URL`), only posts already live on Instagram, refreshed every 5 minutes.
- **Guides** are Markdown files in `content/guides`.
- **Shop** products live in `lib/products.ts`. Set `status: "live"`, a `price` and a `checkout` link to sell one.
- **Newsletter** sign-ups go to the Signal Tower (`DW_SUBSCRIBE_URL`) until an email platform is connected.

Optional environment variables: `NEXT_PUBLIC_SITE_URL` (the custom domain), `NEXT_PUBLIC_TIKTOK_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_YOUTUBE_URL`, `NEXT_PUBLIC_BLUESKY_URL`.
