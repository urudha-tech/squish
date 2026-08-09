import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/png-to-webp`

export const metadata: Metadata = {
  title: "Convert PNG to WebP Free Online — Squish",
  description:
    "Convert PNG to WebP free online. Preserves transparency. Up to 80% smaller file size. Batch convert multiple PNGs. Nothing uploaded — runs in your browser.",
  keywords: [
    "png to webp", "convert png to webp", "png to webp converter", "png webp free",
    "convert png to webp online free", "bulk png to webp", "transparent png to webp",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Convert PNG to WebP Free Online",
    description: "Convert PNG to WebP in your browser. Transparency preserved. Up to 80% smaller. Nothing uploaded.",
    url: PAGE, siteName: "Squish",
    type: "website", locale: "en_US",
  },
  twitter: {
    card: "summary_large_image", site: "@urudha", creator: "@urudha",
    title: "Convert PNG to WebP Free Online",
    description: "Convert PNG to WebP in your browser. Transparency preserved. Nothing uploaded.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
}

const softwareSchema = {
  "@context": "https://schema.org", "@type": "SoftwareApplication",
  name: "PNG to WebP Converter", url: PAGE,
  applicationCategory: "MultimediaApplication", applicationSubCategory: "Image Converter",
  operatingSystem: "Web", browserRequirements: "Requires JavaScript",
  description: "Convert PNG images to WebP format free online. Transparency preserved. Batch conversion. Nothing uploaded.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "PNG to WebP", item: PAGE },
  ],
}

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  name: "How to Convert PNG to WebP Online",
  description: "Convert PNG images to WebP format free in your browser, preserving transparency.",
  totalTime: "PT1M",
  tool: { "@type": "HowToTool", name: "Squish PNG to WebP Converter" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Upload your PNG files", text: "Drag and drop your PNG files onto the converter, or click to browse." },
    { "@type": "HowToStep", position: 2, name: "Choose lossy or lossless", text: "For transparent logos and icons, use lossless. For photos, lossy quality 80 gives the best compression." },
    { "@type": "HowToStep", position: 3, name: "Download WebP files", text: "Download your WebP files individually or as a ZIP archive." },
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
