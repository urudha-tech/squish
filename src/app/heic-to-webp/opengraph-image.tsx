import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "HEIC to WebP Converter — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "HEIC to WebP Converter",
    subtitle: "Convert iPhone HEIC photos to WebP online. Fast, free, nothing uploaded.",
    category: "Image Converter",
  })
}
