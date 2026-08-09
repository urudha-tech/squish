import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Images to PDF — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Images to PDF",
    subtitle: "Combine JPG, PNG and other images into a single PDF. Free. Nothing uploaded.",
    category: "PDF Tool",
  })
}
