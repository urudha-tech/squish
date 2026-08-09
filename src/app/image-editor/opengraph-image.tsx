import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Image Editor — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Image Editor",
    subtitle: "Crop, rotate, resize, and adjust images online. HEIC and RAW supported. Nothing uploaded.",
    category: "Editor",
  })
}
