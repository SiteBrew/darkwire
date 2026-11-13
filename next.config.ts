import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "sitebrew-cockpit.vercel.app", pathname: "/api/public/dw/img/**" }],
  },
  // Buyers' downloads come from the cockpit (which checks the signed link), served under DarkWire's own address
  async rewrites() {
    const base = (process.env.DW_DOWNLOAD_BASE || "https://sitebrew-cockpit.vercel.app").replace(/\/$/, "");
    return [{ source: "/download/:slug/:exp/:sig", destination: `${base}/api/public/dw/download/:slug/:exp/:sig` }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default config;
