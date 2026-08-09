import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Compress Image Online — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Compress Image Online",
    subtitle: "Reduce image file size by up to 80% with no visible quality loss. Free. Nothing uploaded.",
    category: "Image Compressor",
  })
}
