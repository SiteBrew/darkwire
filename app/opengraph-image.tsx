import { ogCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "DarkWire Media: the daily wire for AI & tech";

export default function Image() {
  return ogCard("Signal over noise", "The daily wire for AI & tech.");
}
