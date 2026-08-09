import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "WebP Converter — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "WebP Converter",
    subtitle: "Bulk convert JPG, PNG, HEIC to WebP. Up to 80% smaller. Nothing uploaded.",
    category: "Image Converter",
  })
}
