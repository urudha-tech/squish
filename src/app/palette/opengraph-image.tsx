import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Color Palette Extractor — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Color Palette Extractor",
    subtitle: "Extract dominant colors from any image. Perfect for brand matching and design work.",
    category: "Design Tool",
  })
}
