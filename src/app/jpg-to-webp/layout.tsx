import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/jpg-to-webp`

export const metadata: Metadata = {
  title: "Convert JPG to WebP Free Online — Squish",
  description:
    "Convert JPG to WebP free online. Reduce file size by up to 80% with no quality loss. Batch convert multiple JPGs at once. Nothing uploaded — runs in your browser.",
  keywords: [
    "jpg to webp", "convert jpg to webp", "jpeg to webp", "jpg to webp converter",
    "convert jpeg to webp online", "jpg webp converter free", "bulk jpg to webp",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Convert JPG to WebP Free Online",
    description: "Convert JPG to WebP in your browser. Up to 80% smaller. Batch convert. Nothing uploaded.",
    url: PAGE, siteName: "Squish",
    type: "website", locale: "en_US",
  },
  twitter: {
    card: "summary_large_image", site: "@urudha", creator: "@urudha",
    title: "Convert JPG to WebP Free Online",
    description: "Convert JPG to WebP in your browser. Up to 80% smaller. Nothing uploaded.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
}

const softwareSchema = {
  "@context": "https://schema.org", "@type": "SoftwareApplication",
  name: "JPG to WebP Converter", url: PAGE,
  applicationCategory: "MultimediaApplication", applicationSubCategory: "Image Converter",
  operatingSystem: "Web", browserRequirements: "Requires JavaScript",
  description: "Convert JPG and JPEG images to WebP format free online. Bulk conversion, custom quality, nothing uploaded.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "JPG to WebP", item: PAGE },
  ],
}

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  name: "How to Convert JPG to WebP Online",
  description: "Convert JPG images to WebP format for free in your browser in under a minute.",
  totalTime: "PT1M",
  tool: { "@type": "HowToTool", name: "Squish JPG to WebP Converter" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Upload your JPG files", text: "Drag and drop your JPG or JPEG files onto the converter, or click to browse." },
    { "@type": "HowToStep", position: 2, name: "Adjust quality (optional)", text: "Set your preferred quality (1–100) or enable lossless mode. Default quality 80 gives the best size-to-quality ratio." },
    { "@type": "HowToStep", position: 3, name: "Download WebP files", text: "Click Convert and download your WebP files individually or as a ZIP archive." },
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
