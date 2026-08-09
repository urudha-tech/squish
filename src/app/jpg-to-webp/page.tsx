"use client"

import { ConverterLanding } from "@/components/seo/ConverterLanding"

export default function JpgToWebpPage() {
  return (
    <ConverterLanding
      h1="Convert JPG to WebP Free Online"
      description="Upload your JPG files and convert them to WebP instantly. No uploads to a server — everything runs in your browser."
      toolInfoHeading="JPG to WebP Converter — Free &amp; Private"
      toolInfoDescription="Squish converts JPG images to WebP directly in your browser. WebP files are 25–80% smaller than JPG at the same visual quality, making them ideal for websites, apps and social media. Drag and drop any number of JPGs, convert in bulk, and download as a ZIP."
      features={[
        { title: "25–80% Smaller Files", body: "WebP consistently outperforms JPG on file size. Switch your image library to WebP and cut your site's load time dramatically." },
        { title: "Batch Conversion", body: "Convert hundreds of JPGs at once. Drop a folder or ZIP archive and Squish handles all of them in parallel." },
        { title: "Nothing Uploaded", body: "All conversion happens locally in your browser. Your JPG files never leave your device." },
      ]}
      faqItems={[
        { q: "How do I convert JPG to WebP?", a: "Drop your JPG files onto the converter above or click to browse. Squish converts them to WebP instantly in your browser and lets you download the results." },
        { q: "Will the quality be the same after converting JPG to WebP?", a: "WebP at quality 80 (the default) is visually indistinguishable from JPG at quality 90, while being 25–34% smaller. You can also choose lossless mode for a pixel-perfect result." },
        { q: "Can I convert multiple JPGs at once?", a: "Yes. Drop as many JPG files as you need — or a ZIP archive of JPGs — and Squish converts them all in one go." },
        { q: "Is this JPG to WebP converter free?", a: "Yes, completely free. No account, no watermark, no file size limit." },
        { q: "Are my JPG files uploaded to a server?", a: "No. Conversion runs entirely in your browser using WebAssembly. Your files never leave your device." },
      ]}
      relatedTools={[
        { href: "/editor",        label: "Full WebP Converter",  description: "Convert any format to WebP with quality control and ZIP output." },
        { href: "/png-to-webp",   label: "PNG to WebP",          description: "Convert PNG images to WebP format." },
        { href: "/image-editor",  label: "Image Editor",         description: "Crop and resize your JPGs before converting." },
      ]}
    />
  )
}
