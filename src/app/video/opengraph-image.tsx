import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Video to Images — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Video to Images",
    subtitle: "Extract frames from any video as PNG or JPG. Choose FPS and range. Nothing uploaded.",
    category: "Video Tool",
  })
}
