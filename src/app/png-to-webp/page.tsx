"use client"

import { ConverterLanding } from "@/components/seo/ConverterLanding"

export default function PngToWebpPage() {
  return (
    <ConverterLanding
      h1="Convert PNG to WebP Free Online"
      description="Upload your PNG files and convert them to WebP instantly. Smaller file sizes, same visual quality. Nothing uploaded."
      toolInfoHeading="PNG to WebP Converter — Free &amp; Private"
      toolInfoDescription="WebP offers superior compression for PNG images — especially those with transparency. Squish converts PNG to WebP directly in your browser, preserving transparency in the output. No uploads, no sign-up, no limits."
      features={[
        { title: "Transparency Preserved", body: "WebP fully supports alpha transparency, just like PNG. Convert PNG logos and cutouts without losing their transparent backgrounds." },
        { title: "Smaller Than PNG", body: "WebP lossless compression is typically 26% smaller than PNG. Lossy WebP can be 60–80% smaller while remaining visually identical." },
        { title: "Batch Convert", body: "Drop any number of PNGs or a ZIP archive. Convert the entire batch and download as a ZIP in one click." },
      ]}
      faqItems={[
        { q: "Does WebP support transparency like PNG?", a: "Yes. WebP supports full alpha transparency. Converting a transparent PNG to WebP preserves the transparency perfectly." },
        { q: "How much smaller will my PNG be after converting to WebP?", a: "WebP lossless is ~26% smaller than PNG. WebP lossy at quality 80 can be 60–80% smaller while looking visually identical." },
        { q: "Can I convert PNG logos and icons to WebP?", a: "Yes. WebP is ideal for logos, icons and graphics with transparency. The output retains sharp edges and transparent backgrounds." },
        { q: "Is this PNG to WebP converter free?", a: "Yes, completely free. No account, no watermark, no file size limit." },
      ]}
      relatedTools={[
        { href: "/editor",       label: "Full WebP Converter", description: "Convert any format to WebP with full quality control." },
        { href: "/jpg-to-webp",  label: "JPG to WebP",         description: "Convert JPG images to WebP format." },
        { href: "/remove-bg",    label: "Remove Background",   description: "Remove PNG backgrounds with AI before converting." },
      ]}
    />
  )
}
