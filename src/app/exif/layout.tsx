import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/exif`

export const metadata: Metadata = {
  title: "EXIF Viewer - View and Remove Image Metadata Online Free",
  description:
    "View EXIF metadata from photos online free. See GPS location, camera settings, timestamps. Strip and remove EXIF data for privacy. No uploads needed.",
  keywords: [
    "exif viewer online", "view image metadata", "remove exif data", "strip gps from photo",
    "photo metadata viewer", "image metadata remover", "exif data reader",
    "remove metadata from photo free", "gps photo viewer online",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "EXIF Viewer - View and Strip Image Metadata Free",
    description: "Read GPS, camera settings and timestamps from any photo. Strip metadata for privacy. Nothing uploaded.",
    url: PAGE,
    siteName: "Squish",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@urudha",
    creator: "@urudha",
    title: "EXIF Viewer - View and Strip Image Metadata Free",
    description: "Read GPS, camera settings from any photo. Strip metadata for privacy.",
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
  name: "Squish EXIF Viewer",
  url: PAGE,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Image Utility",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  description:
    "View and remove EXIF metadata from photos in your browser. Read GPS coordinates, camera model, lens settings and timestamps. Strip all metadata for privacy before sharing.",
  featureList: [
    "View GPS coordinates",
    "Camera and lens metadata",
    "Timestamp data",
    "Strip all EXIF data",
    "Privacy protection",
    "No file uploads",
    "JPG, PNG, WebP support",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "EXIF Viewer", item: PAGE },
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
