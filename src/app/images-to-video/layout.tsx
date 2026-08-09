import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/images-to-video`

export const metadata: Metadata = {
  title: "Images to Video Maker - Turn Photos into Video Online Free",
  description:
    "Turn photos into a video online free. Convert a sequence of images to WebM video. Set frame rate and duration. No uploads, instant download, runs in your browser.",
  keywords: [
    "images to video online", "photos to video maker", "convert images to video free",
    "make video from pictures", "image sequence to video", "slideshow video maker online",
    "jpg to video online", "png to video", "create video from images free",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Images to Video Maker - Free Online Tool",
    description: "Turn a sequence of images into a WebM video. Set frame rate, instant download. Nothing uploaded.",
    url: PAGE,
    siteName: "Squish",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@urudha",
    creator: "@urudha",
    title: "Images to Video Maker - Free Online Tool",
    description: "Turn images into a WebM video. Set frame rate, instant download.",
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
  name: "Squish Images to Video",
  url: PAGE,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Video Tool",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  description:
    "Combine a sequence of images into a WebM video in your browser. Upload individual frames or a ZIP file. Set frame rate from 1 to 60 fps. No uploads to any server.",
  featureList: [
    "Convert image sequence to video",
    "Custom frame rate (1-60 fps)",
    "ZIP file input",
    "WebM video output",
    "No file uploads",
    "Instant download",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Images to Video", item: PAGE },
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
