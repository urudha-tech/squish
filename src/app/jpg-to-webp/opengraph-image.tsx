import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "JPG to WebP Converter — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "JPG to WebP Converter",
    subtitle: "Convert JPG files to WebP online free. Up to 80% smaller. Batch convert. Nothing uploaded.",
    category: "Image Converter",
  })
}
