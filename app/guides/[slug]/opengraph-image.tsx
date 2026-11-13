import { allGuides, guide } from "@/lib/guides";
import { ogCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "DarkWire guide";
export const generateStaticParams = () => allGuides().map((g) => ({ slug: g.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guide(slug);
  return ogCard(`Guide · ${g?.category || "AI"}`, g?.title || "DarkWire guide");
}
