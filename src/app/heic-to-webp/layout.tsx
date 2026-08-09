import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/heic-to-webp`

export const metadata: Metadata = {
  title: "Convert HEIC to WebP Free Online — Squish",
  description:
    "Convert HEIC (iPhone photos) to WebP free online. Works on Windows, Mac and Android. No software needed, nothing uploaded. Batch convert HEIC files instantly.",
  keywords: [
    "heic to webp", "convert heic to webp", "heic to webp converter", "iphone photo to webp",
    "heic converter online free", "heif to webp", "convert iphone photos online",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Convert HEIC to WebP Free Online",
    description: "Convert iPhone HEIC photos to WebP in your browser. Works on Windows, Mac, Android. Nothing uploaded.",
    url: PAGE, siteName: "Squish",
    type: "website", locale: "en_US",
  },
  twitter: {
    card: "summary_large_image", site: "@urudha", creator: "@urudha",
    title: "Convert HEIC to WebP Free Online",
    description: "Convert iPhone HEIC photos to WebP in your browser. Nothing uploaded.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
}

const softwareSchema = {
  "@context": "https://schema.org", "@type": "SoftwareApplication",
  name: "HEIC to WebP Converter", url: PAGE,
  applicationCategory: "MultimediaApplication", applicationSubCategory: "Image Converter",
  operatingSystem: "Web", browserRequirements: "Requires JavaScript",
  description: "Convert HEIC and HEIF images to WebP format free online. Works on any device. Batch conversion. Nothing uploaded.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "HEIC to WebP", item: PAGE },
  ],
}

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  name: "How to Convert HEIC to WebP Online",
  description: "Convert iPhone HEIC photos to WebP format for free in your browser on any device.",
  totalTime: "PT1M",
  tool: { "@type": "HowToTool", name: "Squish HEIC to WebP Converter" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Upload your HEIC files", text: "Transfer HEIC photos from your iPhone to your computer, then drag and drop them onto the converter." },
    { "@type": "HowToStep", position: 2, name: "Convert to WebP", text: "Squish converts your HEIC files to WebP automatically. Adjust quality if needed." },
    { "@type": "HowToStep", position: 3, name: "Download the WebP files", text: "Download your converted WebP files individually or as a ZIP archive." },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />
      {children}
    </>
  )
}
