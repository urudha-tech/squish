import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/video`

export const metadata: Metadata = {
  title: "Video to Images - Extract Frames from Video Online Free",
  description:
    "Extract frames from any video online free. Convert video to JPG, PNG or WebP images. Set frame intervals. Runs in your browser, no uploads.",
  keywords: [
    "video to images online", "extract frames from video", "video frame extractor",
    "convert video to images free", "video to jpg online", "video to png",
    "screenshot from video online", "video frame grabber", "extract frames online",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Video to Images - Extract Frames Online Free",
    description: "Extract any frame from video as JPG, PNG or WebP. Set custom intervals. No uploads.",
    url: PAGE,
    siteName: "Squish",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@urudha",
    creator: "@urudha",
    title: "Video to Images - Extract Frames Online Free",
    description: "Extract frames from video as JPG, PNG or WebP. Custom intervals. No uploads.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
}

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Squish Video Frame Extractor",
  url: PAGE,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Video Tool",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  description:
    "Extract individual frames from any video directly in your browser. Set frame interval, choose WebP or PNG output, download as a ZIP file. No uploads required.",
  featureList: [
    "Extract frames at any interval",
    "WebP and PNG output",
    "ZIP archive download",
    "MP4, WebM, MOV support",
    "No file uploads",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Video to Images", item: PAGE },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  )
}
