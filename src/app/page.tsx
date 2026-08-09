"use client"

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ImageIcon, FileText, Film, Eraser, ShieldCheck,
  Palette, Stamp, Sliders, X, Upload,
} from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { usePendingFiles } from "@/context/FilesContext"
import { PageCard } from "@/components/layout/PageCard"
import { ToolInfo } from "@/components/layout/ToolInfo"

const ACTIONS = [
  {
    href: "/editor",
    label: "Convert to WebP",
    description: "Bulk convert JPG, PNG, HEIC and more. Zip input supported.",
    icon: ImageIcon,
    multi: true,
    acceptsZip: true,
  },
  {
    href: "/remove-bg",
    label: "Remove Background",
    description: "AI-powered cutout. Works on portraits and objects.",
    icon: Eraser,
    multi: true,
    acceptsZip: true,
  },
  {
    href: "/pdf",
    label: "Images to PDF",
    description: "Combine images into a single PDF. Custom page sizes.",
    icon: FileText,
    multi: true,
    acceptsZip: true,
  },
  {
    href: "/image-editor",
    label: "Image Editor",
    description: "Crop, rotate, adjust brightness, sharpen and more.",
    icon: Sliders,
    multi: false,
    acceptsZip: false,
  },
  {
    href: "/watermark",
    label: "Add Watermark",
    description: "Overlay text or logo across a batch of photos.",
    icon: Stamp,
    multi: true,
    acceptsZip: true,
  },
  {
    href: "/images-to-video",
    label: "Images to Video",
    description: "Turn a sequence of images into a WebM video.",
    icon: Film,
    multi: true,
    acceptsZip: true,
  },
  {
    href: "/palette",
    label: "Color Palette",
    description: "Extract dominant colors and sample pixels.",
    icon: Palette,
    multi: false,
    acceptsZip: false,
  },
  {
    href: "/exif",
    label: "EXIF Viewer",
    description: "Inspect metadata, GPS, camera settings. Strip for privacy.",
    icon: ShieldCheck,
    multi: false,
    acceptsZip: false,
  },
]

function fmtBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function Home() {
  const router = useRouter()
  const { setPendingFiles } = usePendingFiles()
  const [dropped, setDropped] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((incoming: File[]) => {
    const images = incoming.filter(
      (f) =>
        f.type.startsWith("image/") ||
        f.type === "application/zip" ||
        /\.(jpe?g|png|gif|webp|bmp|heic|heif|avif|svg|zip)$/i.test(f.name),
    )
    if (images.length === 0) return
    setDropped((prev) => {
      const existing = new Set(prev.map((f) => `${f.name}-${f.size}`))
      return [...prev, ...images.filter((f) => !existing.has(`${f.name}-${f.size}`))]
    })
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      addFiles(Array.from(e.dataTransfer.files))
    },
    [addFiles],
  )

  const pick = (href: string) => {
    setPendingFiles(dropped)
    router.push(href)
  }

  const clear = () => setDropped([])
  const totalSize = dropped.reduce((s, f) => s + f.size, 0)
  const hasZip = dropped.some((f) => f.type === "application/zip" || /\.zip$/i.test(f.name))
  const visibleActions = hasZip ? ACTIONS.filter((a) => a.acceptsZip) : ACTIONS

  return (
    <>
      <h1 className="sr-only">Squish — Free Online Image Tools</h1>
      <Navbar />
      <PageCard>
      <div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Headline */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Drop your images, pick an action
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Bulk convert, remove backgrounds, make PDFs and more - all in your browser. Nothing uploaded.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => dropped.length === 0 && fileInputRef.current?.click()}
          className={`relative flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            isDragging
              ? "border-neutral-400 bg-neutral-50 dark:border-neutral-500 dark:bg-neutral-900"
              : dropped.length > 0
              ? "cursor-default border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/30"
              : "cursor-pointer border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
          }`}
        >
          {dropped.length === 0 ? (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <Upload className="h-5 w-5 text-neutral-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Drop images here, or click to browse
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  JPG · PNG · HEIC · WebP · GIF · AVIF · SVG · ZIP - any amount
                </p>
              </div>
            </>
          ) : (
            <div className="w-full">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {dropped.length} file{dropped.length !== 1 ? "s" : ""} · {fmtBytes(totalSize)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                    className="text-xs text-neutral-500 underline hover:text-neutral-700 dark:hover:text-neutral-300"
                  >
                    Add more
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); clear() }}
                    className="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {dropped.slice(0, 12).map((f) => (
                  <span
                    key={`${f.name}-${f.size}`}
                    className="max-w-[180px] truncate rounded-md bg-neutral-200 px-2 py-0.5 text-xs text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300"
                  >
                    {f.name}
                  </span>
                ))}
                {dropped.length > 12 && (
                  <span className="rounded-md bg-neutral-200 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-700">
                    +{dropped.length - 12} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.heic,.heif,.zip"
          className="sr-only"
          onChange={(e) => { addFiles(Array.from(e.target.files ?? [])); e.target.value = "" }}
        />

        {/* Action cards - shown after files are dropped */}
        {dropped.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
              What do you want to do?
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {visibleActions.map(({ href, label, description, icon: Icon, multi }) => (
                <button
                  key={href}
                  onClick={() => pick(href)}
                  className="group flex items-start gap-3 rounded-xl border border-neutral-100 p-4 text-left transition-all hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-900"
                >
                  <div className="mt-0.5 shrink-0 rounded-lg bg-neutral-100 p-2 transition-colors group-hover:bg-neutral-200 dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
                    <Icon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {label}
                      </p>
                      {!multi && dropped.length > 1 && (
                        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          uses 1 file
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-neutral-500">{description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Direct links - shown when no files dropped */}
        {dropped.length === 0 && (
          <div className="mt-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
              Or go directly to a tool
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {visibleActions.map(({ href, label, description, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-start gap-3 rounded-xl border border-neutral-100 p-4 transition-all hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-900"
                >
                  <div className="mt-0.5 shrink-0 rounded-lg bg-neutral-100 p-2 transition-colors group-hover:bg-neutral-200 dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
                    <Icon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{label}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        <ToolInfo
          heading="Free Browser-Based Image Tools"
          description="Squish is a suite of free image tools that run entirely in your browser. Convert images to WebP, remove backgrounds with AI, compress and reduce image size, make PDFs, add watermarks, edit photos and more — all without uploading anything. Fast, private, and completely free."
          features={[
            { title: "Nothing Uploaded", body: "Every tool runs locally in your browser. Your images never touch a server — complete privacy guaranteed." },
            { title: "No Sign-Up Required", body: "Open the tool, drop your images, done. No account, no email, no subscription. Free forever." },
            { title: "Bulk Processing", body: "Convert, watermark or remove backgrounds from hundreds of images at once. Download results as a ZIP." },
          ]}
        />
      </div>

      </div>
      </PageCard>
    </>
  )
}
