import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Squish — Free Online Image Tools"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Free Online Image Tools",
    subtitle: "Convert, compress, remove backgrounds, make PDFs and more — all in your browser.",
    tools: ["WebP Convert", "Remove BG", "Compress", "Make PDF", "Watermark", "EXIF"],
  })
}
