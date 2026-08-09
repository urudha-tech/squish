"use client"

import { ConverterLanding } from "@/components/seo/ConverterLanding"

export default function BatchImageConverterPage() {
  return (
    <ConverterLanding
      h1="Batch Image Converter Online Free"
      description="Convert hundreds of images at once to WebP. Drop a folder or ZIP archive. Nothing uploaded — everything runs in your browser."
      toolInfoHeading="Free Batch Image Converter — No Limits"
      toolInfoDescription="Squish lets you convert any number of images to WebP in one go. Drop a folder, a ZIP archive, or select hundreds of files at once. All conversion runs in your browser in parallel — no waiting for a server, no queue, no limits."
      features={[
        { title: "No File Limit", body: "Convert 1 image or 1,000. Squish processes them all in parallel in your browser with no queue or wait." },
        { title: "ZIP In, ZIP Out", body: "Drop a ZIP archive of images. Squish extracts, converts, and delivers a new ZIP preserving your folder structure." },
        { title: "Any Format to WebP", body: "JPG, PNG, HEIC, AVIF, GIF, BMP, SVG — all supported as input. Output is optimised WebP." },
      ]}
      faqItems={[
        { q: "How do I batch convert images online?", a: "Drop your images, a folder, or a ZIP archive onto the tool above. Squish converts all images to WebP in parallel in your browser and lets you download the results as a ZIP." },
        { q: "Is there a limit on how many images I can convert at once?", a: "No hard limit. Squish runs all conversions in parallel in your browser. For very large batches (1000+ images), performance depends on your device's memory." },
        { q: "Can I batch convert a ZIP file of images?", a: "Yes. Drop a ZIP archive and Squish extracts all images inside, converts them, and delivers a new ZIP with the same folder structure." },
        { q: "What formats can I batch convert?", a: "JPG, PNG, HEIC, AVIF, GIF, BMP, SVG and WebP are all supported as input. Output is WebP." },
        { q: "Is the batch converter free?", a: "Yes. Completely free with no file limit, no watermark, and no account required." },
      ]}
      relatedTools={[
        { href: "/editor",       label: "Full WebP Converter", description: "Full control over quality, lossless mode and per-file settings." },
        { href: "/jpg-to-webp",  label: "JPG to WebP",         description: "Convert a batch of JPG files specifically." },
        { href: "/compress-image", label: "Compress Image",    description: "Compress images for the web with quality control." },
      ]}
    />
  )
}
