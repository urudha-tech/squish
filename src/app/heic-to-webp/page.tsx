"use client"

import { ConverterLanding } from "@/components/seo/ConverterLanding"

export default function HeicToWebpPage() {
  return (
    <ConverterLanding
      h1="Convert HEIC to WebP Free Online"
      description="Convert iPhone HEIC photos to WebP in your browser. No uploads, no software to install. Works on Mac, Windows and Android."
      toolInfoHeading="HEIC to WebP Converter — Works on Any Device"
      toolInfoDescription="HEIC is Apple's default photo format for iPhone and iPad. While HEIC files are small and high quality, they aren't supported by most websites, design tools or non-Apple devices. Squish converts HEIC to WebP in your browser — no software needed, nothing uploaded."
      features={[
        { title: "Works Cross-Platform", body: "Convert HEIC photos from your iPhone on any device — Windows, Android, Mac or Linux — with no software to install." },
        { title: "Better Than JPEG Output", body: "WebP output is smaller than JPEG at the same quality, making it ideal for sharing or uploading HEIC photos anywhere." },
        { title: "Batch HEIC Conversion", body: "Drop multiple HEIC files or a ZIP archive and convert them all at once. Download results as a ZIP." },
      ]}
      faqItems={[
        { q: "What is a HEIC file?", a: "HEIC (High Efficiency Image Container) is the photo format used by iPhones and iPads. It offers better compression than JPG but isn't widely supported outside Apple devices." },
        { q: "How do I convert HEIC to WebP?", a: "Drop your HEIC files onto the converter above. Squish converts them to WebP instantly in your browser — no software or account needed." },
        { q: "Can I convert HEIC to WebP on Windows?", a: "Yes. Squish runs in any modern browser on Windows, Mac, Android or Linux. No software installation required." },
        { q: "Will the quality be good after converting HEIC to WebP?", a: "Yes. WebP at quality 80 produces excellent results with file sizes smaller than JPG. You can also choose lossless mode." },
        { q: "Are my HEIC files uploaded to a server?", a: "No. HEIC conversion runs entirely in your browser. Your files never leave your device." },
      ]}
      relatedTools={[
        { href: "/editor",       label: "Full WebP Converter", description: "Convert any format to WebP with full quality control." },
        { href: "/jpg-to-webp",  label: "JPG to WebP",         description: "Convert JPG images to WebP." },
        { href: "/image-editor", label: "Image Editor",         description: "Crop and resize photos after converting." },
      ]}
    />
  )
}
