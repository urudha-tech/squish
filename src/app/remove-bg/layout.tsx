import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/remove-bg`

export const metadata: Metadata = {
  title: "Remove Image Background Free - AI Background Remover",
  description:
    "Remove image background free online. AI-powered background eraser — no uploads, no sign-up. Make transparent backgrounds instantly. Works on portraits, products and objects.",
  keywords: [
    "remove background online", "background remover free", "remove image background",
    "ai background remover", "transparent background maker", "background eraser online",
    "cut out background free", "remove bg free", "photo background remover",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Remove Image Background Free - AI Powered",
    description: "AI background removal in your browser. No uploads, no sign-up. Transparent PNG output in seconds.",
    url: PAGE,
    siteName: "Squish",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@urudha",
    creator: "@urudha",
    title: "Remove Image Background Free - AI Powered",
    description: "AI background removal in your browser. No uploads. Transparent PNG output.",
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
  name: "Squish AI Background Remover",
  url: PAGE,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Photo Editor",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript and WebAssembly",
  description:
    "Remove image backgrounds using AI directly in your browser. No uploads required. Outputs transparent PNG or WebP. Works on portraits, products, animals and objects.",
  featureList: [
    "AI-powered background removal",
    "Runs locally in WebAssembly",
    "No file uploads",
    "Transparent PNG and WebP output",
    "Batch processing",
    "Complex edge detection (hair, fur)",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Remove the Background from an Image Online",
  description: "Remove image backgrounds for free using AI directly in your browser. No uploads required.",
  totalTime: "PT1M",
  tool: { "@type": "HowToTool", name: "Squish Background Remover" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Upload your image", text: "Drag and drop your photo onto the tool or click to browse. Supports JPG, PNG, WebP, and HEIC." },
    { "@type": "HowToStep", position: 2, name: "Wait for AI processing", text: "The AI model detects the subject and removes the background. First run downloads the model (~50 MB); subsequent runs are instant." },
    { "@type": "HowToStep", position: 3, name: "Download the result", text: "Download your image as a transparent PNG or WebP, ready to use in any design tool or platform." },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Remove Background", item: PAGE },
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
