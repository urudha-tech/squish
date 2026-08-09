import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/batch-image-converter`

export const metadata: Metadata = {
  title: "Batch Image Converter Online Free — Squish",
  description:
    "Batch convert images online free. Convert hundreds of JPG, PNG, HEIC and other images to WebP at once. ZIP in, ZIP out. Nothing uploaded — runs in your browser.",
  keywords: [
    "batch image converter", "bulk image converter", "convert multiple images online",
    "batch convert images to webp", "bulk convert jpg png to webp",
    "batch image converter free", "convert images in bulk online",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Batch Image Converter Online Free",
    description: "Convert hundreds of images to WebP at once. ZIP in, ZIP out. No limits. Nothing uploaded.",
    url: PAGE, siteName: "Squish",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Batch Image Converter" }],
    type: "website", locale: "en_US",
  },
  twitter: {
    card: "summary_large_image", site: "@urudha", creator: "@urudha",
    title: "Batch Image Converter Online Free",
    description: "Convert hundreds of images to WebP at once. No limits. Nothing uploaded.",
    images: [`${BASE}/og-image.png`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
}

const softwareSchema = {
  "@context": "https://schema.org", "@type": "SoftwareApplication",
  name: "Batch Image Converter", url: PAGE,
  applicationCategory: "MultimediaApplication", applicationSubCategory: "Image Converter",
  operatingSystem: "Web", browserRequirements: "Requires JavaScript",
  description: "Batch convert hundreds of images to WebP online free. No file limit. ZIP in, ZIP out. Nothing uploaded.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Batch Image Converter", item: PAGE },
  ],
}

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  name: "How to Batch Convert Images Online",
  description: "Convert hundreds of images to WebP at once in your browser with no file limit.",
  totalTime: "PT2M",
  tool: { "@type": "HowToTool", name: "Squish Batch Image Converter" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Upload your images or ZIP", text: "Drag and drop your images, a folder, or a ZIP archive. Squish accepts any number of files." },
    { "@type": "HowToStep", position: 2, name: "Convert all images", text: "Squish converts all images to WebP in parallel in your browser. No server, no queue." },
    { "@type": "HowToStep", position: 3, name: "Download as ZIP", text: "Download all converted WebP files as a single ZIP archive, preserving your original folder structure." },
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
