import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "PNG to WebP Converter — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "PNG to WebP Converter",
    subtitle: "Convert PNG to WebP with transparency preserved. Free, batch, nothing uploaded.",
    category: "Image Converter",
  })
}
