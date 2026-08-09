"use client"

import { ConverterLanding } from "@/components/seo/ConverterLanding"

export default function CompressImagePage() {
  return (
    <ConverterLanding
      h1="Compress Image Online Free"
      description="Reduce image file size without visible quality loss. Convert to WebP for the best compression available. Nothing uploaded."
      toolInfoHeading="Free Online Image Compressor"
      toolInfoDescription="Squish compresses images by converting them to WebP — the most efficient image format for web use. WebP delivers 25–80% smaller files compared to JPG and PNG at equivalent visual quality. No uploads, no account, no size limit."
      features={[
        { title: "Up to 80% Smaller", body: "WebP compression beats JPG and PNG on every benchmark. Convert and drastically cut your image file sizes." },
        { title: "Batch Compress", body: "Compress an entire folder of images at once. Drop a ZIP archive and Squish compresses all images inside it." },
        { title: "Control the Output", body: "Adjust the quality slider to balance file size and visual quality. Choose lossless for pixel-perfect compression." },
      ]}
      faqItems={[
        { q: "How do I compress an image online?", a: "Drop your image files onto the tool above. Squish converts them to WebP — the most efficient format available — and you download the compressed results." },
        { q: "How much will my images be compressed?", a: "WebP typically achieves 25–80% smaller file sizes than JPG or PNG at the same visual quality. Results vary by image content." },
        { q: "Will image quality be reduced after compression?", a: "At quality 80 (the default), the difference is invisible to the human eye. You can also choose lossless mode for zero quality loss." },
        { q: "Can I compress multiple images at once?", a: "Yes. Drop any number of images or a ZIP archive to batch compress them all in one go." },
        { q: "Is it free to compress images?", a: "Yes. Squish is completely free with no file size limit, no watermark, and no account required." },
      ]}
      relatedTools={[
        { href: "/editor",        label: "Full WebP Converter",  description: "Full control over quality, lossless mode and ZIP output." },
        { href: "/image-editor",  label: "Image Editor",         description: "Resize images before compressing for even smaller files." },
        { href: "/jpg-to-webp",   label: "JPG to WebP",          description: "Specifically compress JPG files to WebP." },
      ]}
    />
  )
}
