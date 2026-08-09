import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/image-editor`

export const metadata: Metadata = {
  title: "Free Online Image Editor - Crop Rotate Resize Photos",
  description:
    "Best free online image editor. Crop, rotate, flip, resize, adjust brightness, contrast and sharpen photos. No download, no sign-up, runs entirely in your browser.",
  keywords: [
    "free image editor online", "online photo editor", "crop image online",
    "rotate image online", "resize image online", "adjust brightness online",
    "photo editor no download", "best free image editor", "image editor browser",
    "sharpen image online", "flip image online",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Free Online Image Editor - No Download Needed",
    description: "Crop, rotate, flip, resize and adjust photos in your browser. No software, no uploads.",
    url: PAGE,
    siteName: "Squish",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@urudha",
    creator: "@urudha",
    title: "Free Online Image Editor - No Download Needed",
    description: "Crop, rotate, resize and adjust photos in your browser. No software, no uploads.",
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
  name: "Squish Image Editor",
  url: PAGE,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Photo Editor",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  description:
    "Free online image editor. Crop, rotate, flip, resize images and adjust brightness, contrast, saturation and sharpness. Runs entirely in your browser with no uploads.",
  featureList: [
    "Crop and resize",
    "Rotate and flip",
    "Brightness and contrast adjustment",
    "Saturation control",
    "Sharpness adjustment",
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
    { "@type": "ListItem", position: 2, name: "Image Editor", item: PAGE },
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
