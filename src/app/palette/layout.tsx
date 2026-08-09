import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"

const BASE = "https://squish.urudha.com"
const PAGE = `${BASE}/palette`

export const metadata: Metadata = {
  title: "Color Palette Extractor - Extract Colors from Image Online",
  description:
    "Extract color palette from any image online free. Get dominant colors as HEX, RGB or CSS variables. Perfect for designers and developers. Instant, no uploads.",
  keywords: [
    "color palette extractor", "extract colors from image", "image color picker",
    "dominant color finder", "hex color extractor", "color palette generator from image",
    "get colors from photo", "image color palette online", "css color variables from image",
  ],
  alternates: { canonical: PAGE },
  openGraph: {
    title: "Color Palette Extractor from Image - Free Online",
    description: "Extract dominant colors from any image. Get HEX, RGB and CSS variables instantly. No uploads.",
    url: PAGE,
    siteName: "Squish",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@urudha",
    creator: "@urudha",
    title: "Color Palette Extractor from Image - Free Online",
    description: "Extract dominant colors from any image. HEX, RGB and CSS variables.",
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
  name: "Squish Color Palette Extractor",
  url: PAGE,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Design Tool",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  description:
    "Extract dominant colors from any image online. Copy colors as HEX, RGB or CSS custom properties. Uses perceptual clustering for accurate results. No uploads required.",
  featureList: [
    "Dominant color extraction",
    "HEX color codes",
    "RGB values",
    "CSS custom properties",
    "Perceptual color clustering",
    "No file uploads",
    "Instant results",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${BASE}/#organization` },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Color Palette", item: PAGE },
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
