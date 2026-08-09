import { buildOgImage, ogSize, ogContentType } from "@/lib/og/ogImage"

export const alt = "Images to Video — Squish"
export const size = ogSize
export const contentType = ogContentType

export default function OgImage() {
  return buildOgImage({
    title: "Images to Video",
    subtitle: "Turn a sequence of images into an MP4 video. Control speed and order. Nothing uploaded.",
    category: "Video Tool",
  })
}
