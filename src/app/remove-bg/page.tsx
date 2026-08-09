"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ArrowLeft, Download, X, Loader2, Eraser } from "lucide-react"
import Link from "next/link"
import { formatBytes } from "@/lib/utils/fileUtils"
import { Navbar } from "@/components/layout/Navbar"
import { usePendingFiles } from "@/context/FilesContext"
import { PageCard } from "@/components/layout/PageCard"
import { ToolInfo } from "@/components/layout/ToolInfo"
import { FAQ } from "@/components/seo/FAQ"
import { RelatedTools } from "@/components/seo/RelatedTools"

interface BgFile {
  id: string
  file: File
  originalUrl: string
  resultUrl?: string
  status: "pending" | "processing" | "done" | "error"
  error?: string
}

type OutputFormat = "png" | "webp"

export default function RemoveBgPage() {
  const [files, setFiles] = useState<BgFile[]>([])
  const [format, setFormat] = useState<OutputFormat>("png")
  const [isRunning, setIsRunning] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const objectUrlsRef = useRef<Set<string>>(new Set())
  const { pendingFiles, clearFiles } = usePendingFiles()

  const makeUrl = (url: string) => { objectUrlsRef.current.add(url); return url }

  const addFiles = useCallback((incoming: File[]) => {
    const images = incoming.filter((f) => f.type.startsWith("image/"))
    const entries: BgFile[] = images.map((f) => ({
      id: `${f.name}-${f.size}-${f.lastModified}`,
      file: f,
      originalUrl: makeUrl(URL.createObjectURL(f)),
      status: "pending",
    }))
    setFiles((prev) => {
      const ids = new Set(prev.map((p) => p.id))
      return [...prev, ...entries.filter((e) => !ids.has(e.id))]
    })
  }, [])

  useEffect(() => {
    if (pendingFiles.length > 0) { addFiles(pendingFiles); clearFiles() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const remove = (id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id)
      if (f?.originalUrl) URL.revokeObjectURL(f.originalUrl)
      if (f?.resultUrl) URL.revokeObjectURL(f.resultUrl)
      return prev.filter((x) => x.id !== id)
    })
  }

  const runAll = useCallback(async () => {
    const pending = files.filter((f) => f.status === "pending" || f.status === "error")
    if (!pending.length) return

    setIsRunning(true)
    const { removeBackground } = await import("@imgly/background-removal")

    for (const entry of pending) {
      setFiles((prev) => prev.map((f) => f.id === entry.id ? { ...f, status: "processing" } : f))
      try {
        const blob = await removeBackground(entry.file, {
          device: "gpu",
          output: { format: format === "webp" ? "image/webp" : "image/png", quality: 0.92 },
        })
        const url = makeUrl(URL.createObjectURL(blob))
        setFiles((prev) => prev.map((f) => f.id === entry.id ? { ...f, status: "done", resultUrl: url } : f))
      } catch (e) {
        setFiles((prev) => prev.map((f) =>
          f.id === entry.id ? { ...f, status: "error", error: e instanceof Error ? e.message : "Failed" } : f
        ))
      }
    }

    setIsRunning(false)
  }, [files, format])

  const downloadOne = (entry: BgFile) => {
    if (!entry.resultUrl) return
    const a = document.createElement("a")
    a.href = entry.resultUrl
    const base = entry.file.name.replace(/\.[^.]+$/, "")
    a.download = `${base}_no_bg.${format}`
    a.click()
  }

  const downloadAll = () => files.filter((f) => f.status === "done").forEach(downloadOne)

  const reset = () => {
    files.forEach((f) => {
      if (f.originalUrl) URL.revokeObjectURL(f.originalUrl)
      if (f.resultUrl) URL.revokeObjectURL(f.resultUrl)
    })
    setFiles([])
  }

  const doneCount = files.filter((f) => f.status === "done").length
  const pendingCount = files.filter((f) => f.status === "pending" || f.status === "error").length

  return (
    <>
      <Navbar />
      <PageCard>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Remove Background
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            AI-powered background removal. Runs entirely in your browser - nothing uploaded.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault(); setIsDragging(false)
            addFiles(Array.from(e.dataTransfer.files))
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors sm:py-12 ${
            isDragging
              ? "border-neutral-400 bg-neutral-50 dark:border-neutral-500 dark:bg-neutral-900"
              : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
          }`}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
            <Eraser className="h-5 w-5 text-neutral-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Drop images here, or click to browse
            </p>
            <p className="mt-1 text-xs text-neutral-500">JPG, PNG, WebP · works best on portraits & objects</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => { addFiles(Array.from(e.target.files ?? [])); e.target.value = "" }}
          />
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-4">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Output:</span>
                {(["png", "webp"] as OutputFormat[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    disabled={isRunning}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                      format === f
                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
                {format === "png" && (
                  <span className="text-xs text-neutral-400">both support transparency</span>
                )}
              </div>
              <div className="flex gap-2">
                {doneCount > 1 && (
                  <button
                    onClick={downloadAll}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download all ({doneCount})
                  </button>
                )}
                <button
                  onClick={reset}
                  disabled={isRunning}
                  className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* File grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              {files.map((entry) => (
                <div key={entry.id} className="group relative rounded-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                  {/* Images side by side */}
                  <div className="grid grid-cols-2 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%3E%3Crect%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23e5e5e5%22/%3E%3Crect%20x%3D%228%22%20y%3D%228%22%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23e5e5e5%22/%3E%3C/svg%3E')]">
                    <div className="relative aspect-square">
                      <img src={entry.originalUrl} alt={`Original: ${entry.file.name}`} className="h-full w-full object-cover" />
                      <span className="absolute bottom-1 left-1 rounded bg-black/50 px-1 py-0.5 text-[10px] text-white">Original</span>
                    </div>
                    <div className="relative aspect-square bg-[repeating-conic-gradient(#d4d4d4_0%_25%,white_0%_50%)] bg-[length:16px_16px]">
                      {entry.status === "done" && entry.resultUrl ? (
                        <>
                          <img src={entry.resultUrl} alt={`Background removed: ${entry.file.name}`} className="h-full w-full object-cover" />
                          <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1 py-0.5 text-[10px] text-white">Result</span>
                        </>
                      ) : entry.status === "processing" ? (
                        <div className="flex h-full items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
                        </div>
                      ) : entry.status === "error" ? (
                        <div className="flex h-full items-center justify-center p-2">
                          <p className="text-center text-xs text-red-500">{entry.error ?? "Failed"}</p>
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-xs text-neutral-400">Preview</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-neutral-800 dark:text-neutral-200">
                        {entry.file.name}
                      </p>
                      <p className="text-[10px] text-neutral-400">{formatBytes(entry.file.size)}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 ml-2">
                      {entry.status === "done" && (
                        <button
                          onClick={() => downloadOne(entry)}
                          className="rounded p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => remove(entry.id)}
                        disabled={entry.status === "processing"}
                        className="rounded p-1 text-neutral-400 hover:text-red-500 disabled:opacity-30"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Run button */}
            {pendingCount > 0 && (
              <button
                onClick={runAll}
                disabled={isRunning}
                className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Removing backgrounds…
                  </>
                ) : (
                  <>
                    <Eraser className="h-4 w-4" />
                    Remove background{pendingCount > 1 ? `s (${pendingCount})` : ""}
                  </>
                )}
              </button>
            )}

            <p className="text-center text-xs text-neutral-400">
              First run downloads the AI model (~50 MB) - subsequent runs are instant.
            </p>
          </div>
        )}

        <ToolInfo
          heading="Free AI Background Remover"
          description="Squish removes image backgrounds directly in your browser using AI — no uploads, no account needed. Works on portraits, product photos, logos and objects. The result is a transparent PNG you can use anywhere."
          features={[
            { title: "100% Private", body: "Your images never leave your device. All AI processing runs locally in WebAssembly — nothing is sent to any server." },
            { title: "Works on Any Subject", body: "Optimised for people, products, animals and objects. The model handles complex edges like hair and fur." },
            { title: "Instant Download", body: "Get a transparent PNG in seconds. Use it in design tools, presentations, e-commerce listings or anywhere else." },
          ]}
        />
        <FAQ items={[
          { q: "How does the AI background remover work?", a: "Squish runs an AI segmentation model entirely in your browser using WebAssembly. The model detects the subject in your image and separates it from the background — no internet connection needed after the model loads." },
          { q: "Is my photo uploaded to a server?", a: "No. Your images never leave your device. All processing happens locally in your browser. Nothing is sent to any server." },
          { q: "What image formats are supported?", a: "JPG, PNG, WebP, HEIC, AVIF, BMP and most other common image formats are supported as input. Output is a transparent PNG or WebP." },
          { q: "Does it work on product photos and objects?", a: "Yes. The AI model works on portraits, product photos, animals, logos and objects. It handles complex edges like hair and fur." },
          { q: "Why does the first run take longer?", a: "The first run downloads the AI model (~50 MB). After that the model is cached in your browser and background removal is instant on subsequent visits." },
        ]} />
        <RelatedTools tools={[
          { href: "/editor",        label: "WebP Converter",  description: "Convert the result to WebP for smaller file sizes." },
          { href: "/image-editor",  label: "Image Editor",    description: "Crop, resize and adjust the cutout image." },
          { href: "/watermark",     label: "Add Watermark",   description: "Add a text or logo watermark to your images." },
        ]} />
      </div>
      </PageCard>
    </>
  )
}
