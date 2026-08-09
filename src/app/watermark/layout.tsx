import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/watermark`

export const metadata: Metadata = {
  title: "Add Watermark to Images Online Free - Batch Watermarking",
  description:
    "Add text or image watermarks to photos online free. Batch watermark multiple images at once. Custom position, opacity, font size. No uploads, instant results.",
  keywords: [
    "add watermark to image online", "watermark photo free", "batch watermark images",
    "image watermark tool", "text watermark online", "logo watermark photos",
    "watermark multiple images", "free watermark maker", "photo watermark online",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Add Watermark to Images Free - Batch Processing",
    description: "Watermark photos in bulk with text or logo. Set position and opacity. Nothing uploaded.",
    url: PAGE,
    siteName: "Squish",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@urudha",
    creator: "@urudha",
    title: "Add Watermark to Images Free - Batch Processing",
    description: "Watermark photos in bulk with text or logo. Set position and opacity.",
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
  name: "Squish Watermark Tool",
  url: PAGE,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Photo Editor",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  description:
    "Add text or image watermarks to photos in bulk online. Set custom position, opacity and font size. Batch process dozens of images at once. No uploads required.",
  featureList: [
    "Text and image watermarks",
    "Batch processing",
    "Custom position and opacity",
    "Font size control",
    "No file uploads",
    "ZIP download of all results",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Watermark", item: PAGE },
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
