import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/compress-image`

export const metadata: Metadata = {
  title: "Compress Image Online Free — Squish",
  description:
    "Compress images online free. Reduce JPG, PNG, HEIC and WebP file sizes by up to 80% with no visible quality loss. Batch compress. Nothing uploaded — runs in your browser.",
  keywords: [
    "compress image online", "compress image online free", "image compressor",
    "reduce image size online", "compress jpg online", "compress png online",
    "reduce photo size", "image size reducer", "make image smaller online",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Compress Image Online Free",
    description: "Reduce image file sizes by up to 80% with no visible quality loss. Batch compress. Nothing uploaded.",
    url: PAGE, siteName: "Squish",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Image Compressor" }],
    type: "website", locale: "en_US",
  },
  twitter: {
    card: "summary_large_image", site: "@urudha", creator: "@urudha",
    title: "Compress Image Online Free",
    description: "Reduce image file sizes by up to 80% with no visible quality loss. Nothing uploaded.",
    images: [`${BASE}/og-image.png`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
}

const softwareSchema = {
  "@context": "https://schema.org", "@type": "SoftwareApplication",
  name: "Image Compressor", url: PAGE,
  applicationCategory: "MultimediaApplication", applicationSubCategory: "Image Compressor",
  operatingSystem: "Web", browserRequirements: "Requires JavaScript",
  description: "Compress JPG, PNG, HEIC and other images online free. Up to 80% smaller file size with no visible quality loss. Nothing uploaded.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Compress Image", item: PAGE },
  ],
}

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  name: "How to Compress Images Online for Free",
  description: "Reduce image file sizes by up to 80% in your browser with no software to install.",
  totalTime: "PT1M",
  tool: { "@type": "HowToTool", name: "Squish Image Compressor" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Upload your images", text: "Drag and drop your JPG, PNG, HEIC or other image files, or a ZIP archive." },
    { "@type": "HowToStep", position: 2, name: "Set the quality level", text: "Choose a quality level (1–100). Quality 80 gives the best balance of file size and visual quality." },
    { "@type": "HowToStep", position: 3, name: "Download compressed images", text: "Download your compressed WebP files individually or as a ZIP archive." },
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
