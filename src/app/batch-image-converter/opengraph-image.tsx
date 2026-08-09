import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Batch Image Converter — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Batch Image Converter",
    subtitle: "Convert hundreds of images to WebP at once. ZIP in, ZIP out. No limits. Nothing uploaded.",
    category: "Batch Converter",
  })
}
