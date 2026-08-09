import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Remove EXIF Data — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Remove EXIF Data",
    subtitle: "Strip GPS, camera info and metadata from photos before sharing. Nothing uploaded.",
    category: "Privacy Tool",
  })
}
