import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Remove Background — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Remove Background",
    subtitle: "AI-powered background removal. Instant. Nothing uploaded — runs in your browser.",
    category: "AI Tool",
  })
}
