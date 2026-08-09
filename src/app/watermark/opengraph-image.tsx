import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Add Watermark — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Add Watermark",
    subtitle: "Add text or image watermarks to photos in bulk. Batch processing. Nothing uploaded.",
    category: "Watermark Tool",
  })
}
