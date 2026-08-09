import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/pdf`

export const metadata: Metadata = {
  title: "Images to PDF Converter - Combine Photos into PDF Free",
  description:
    "Convert JPG, PNG and photos to PDF free online. Combine multiple images into one PDF, set page sizes, drag to reorder. No uploads, instant download.",
  keywords: [
    "images to pdf", "jpg to pdf", "png to pdf", "combine images into pdf",
    "convert photos to pdf free", "merge images into pdf", "photo to pdf converter online",
    "image pdf maker", "pictures to pdf",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Images to PDF Converter - Free Online",
    description: "Combine JPG, PNG and other images into a PDF. Drag to reorder, custom page sizes. Nothing uploaded.",
    url: PAGE,
    siteName: "Squish",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@urudha",
    creator: "@urudha",
    title: "Images to PDF Converter - Free Online",
    description: "Combine JPG, PNG images into a PDF. Drag to reorder, custom page sizes.",
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
  name: "Squish Images to PDF",
  url: PAGE,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "PDF Creator",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  description:
    "Combine multiple JPG, PNG and other image formats into a single PDF file. Drag to reorder pages, set custom page sizes, instant download. No uploads required.",
  featureList: [
    "Combine multiple images into one PDF",
    "Drag to reorder pages",
    "Custom page sizes (A4, Letter, Fit)",
    "No file uploads",
    "Instant PDF download",
    "JPG and PNG support",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Images to PDF", item: PAGE },
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
