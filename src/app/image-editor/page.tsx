"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import {
  RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Crop,
  Download, X, Check, RefreshCcw, Sun, Contrast, Droplets,
  Sliders, ImageIcon, Wand2, Focus, Wind,
} from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { usePendingFiles } from "@/context/FilesContext"
import { PageCard } from "@/components/layout/PageCard"
import { ToolInfo } from "@/components/layout/ToolInfo"
import { FAQ } from "@/components/seo/FAQ"
import { RelatedTools } from "@/components/seo/RelatedTools"

interface Rect { x: number; y: number; w: number; h: number }

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

export default function ImageEditorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [baseUrl, setBaseUrl] = useState<string | null>(null)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [sharpen, setSharpen] = useState(0)
  const [denoise, setDenoise] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)
  const [mode, setMode] = useState<"adjust" | "crop">("adjust")
  const [cropRect, setCropRect] = useState<Rect | null>(null)
  const [cropDragStart, setCropDragStart] = useState<{ x: number; y: number } | null>(null)
  const [isDrop, setIsDrop] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const displayRef = useRef({ scale: 1, w: 0, h: 0 })

  // Unsharp-mask convolution applied after drawing
  const applySharpenKernel = (ctx: CanvasRenderingContext2D, w: number, h: number, amount: number) => {
    if (amount === 0) return
    const f = (amount / 100) * 1.5
    const kernel = [0, -f, 0, -f, 1 + 4 * f, -f, 0, -f, 0]
    const src = ctx.getImageData(0, 0, w, h)
    const dst = ctx.createImageData(w, h)
    const s = src.data, d = dst.data
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4
        for (let c = 0; c < 3; c++) {
          let v = 0
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const nx = Math.min(w - 1, Math.max(0, x + kx))
              const ny = Math.min(h - 1, Math.max(0, y + ky))
              v += s[(ny * w + nx) * 4 + c] * kernel[(ky + 1) * 3 + (kx + 1)]
            }
          }
          d[i + c] = Math.max(0, Math.min(255, v))
        }
        d[i + 3] = s[i + 3]
      }
    }
    ctx.putImageData(dst, 0, 0)
  }

  const redraw = useCallback((img?: HTMLImageElement) => {
    const canvas = canvasRef.current
    const i = img ?? imgRef.current
    if (!canvas || !i) return

    const containerW = canvas.parentElement?.parentElement?.clientWidth ?? 640
    const MAX_H = 500

    const isSwapped = rotation === 90 || rotation === 270
    const effW = isSwapped ? i.naturalHeight : i.naturalWidth
    const effH = isSwapped ? i.naturalWidth : i.naturalHeight

    const scale = Math.min(containerW / effW, MAX_H / effH, 1)
    const dispW = Math.round(effW * scale)
    const dispH = Math.round(effH * scale)

    canvas.width = dispW
    canvas.height = dispH
    displayRef.current = { scale, w: dispW, h: dispH }

    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, dispW, dispH)
    ctx.save()
    const blurPx = denoise > 0 ? ` blur(${((denoise / 100) * 2).toFixed(1)}px)` : ""
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${blurPx}`
    ctx.translate(dispW / 2, dispH / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1)
    ctx.drawImage(
      i,
      -(i.naturalWidth * scale) / 2,
      -(i.naturalHeight * scale) / 2,
      i.naturalWidth * scale,
      i.naturalHeight * scale,
    )
    ctx.restore()
    applySharpenKernel(ctx, dispW, dispH, sharpen)
  }, [brightness, contrast, saturation, sharpen, denoise, rotation, flipH, flipV, applySharpenKernel])

  useEffect(() => { redraw() }, [redraw])

  const loadFromUrl = useCallback((url: string) => {
    const img = new window.Image()
    img.onload = () => { imgRef.current = img; redraw(img) }
    img.src = url
  }, [redraw])

  const { pendingFiles, clearFiles } = usePendingFiles()

  const handleFiles = useCallback((files: File[]) => {
    const img = files.find((f) => f.type.startsWith("image/"))
    if (!img) return
    setFile(img)
    const url = URL.createObjectURL(img)
    setBaseUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return url })
    loadFromUrl(url)
    setCropRect(null)
    setMode("adjust")
    setRotation(0); setFlipH(false); setFlipV(false)
    setBrightness(100); setContrast(100); setSaturation(100)
  }, [loadFromUrl])

  useEffect(() => {
    if (pendingFiles.length > 0) { handleFiles(pendingFiles); clearFiles() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetAdjustments = () => {
    setBrightness(100); setContrast(100); setSaturation(100)
    setSharpen(0); setDenoise(0)
    setRotation(0); setFlipH(false); setFlipV(false)
    setCropRect(null)
  }

  const autoEnhance = () => {
    setBrightness(105)
    setContrast(115)
    setSaturation(115)
    setSharpen(35)
    setDenoise(0)
  }

  const rotate = (dir: 1 | -1) => setRotation((r) => (r + dir * 90 + 360) % 360)

  // Build full-resolution canvas with geometric transforms only (for crop base)
  const buildGeomCanvas = () => {
    const img = imgRef.current
    if (!img) return null
    const isSwapped = rotation === 90 || rotation === 270
    const effW = isSwapped ? img.naturalHeight : img.naturalWidth
    const effH = isSwapped ? img.naturalWidth : img.naturalHeight
    const c = document.createElement("canvas")
    c.width = effW; c.height = effH
    const ctx = c.getContext("2d")!
    ctx.translate(effW / 2, effH / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1)
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2)
    return c
  }

  // Build full-resolution canvas with all adjustments (for export)
  const buildExportCanvas = () => {
    const img = imgRef.current
    if (!img) return null
    const isSwapped = rotation === 90 || rotation === 270
    const effW = isSwapped ? img.naturalHeight : img.naturalWidth
    const effH = isSwapped ? img.naturalWidth : img.naturalHeight
    const c = document.createElement("canvas")
    c.width = effW; c.height = effH
    const ctx = c.getContext("2d")!
    const blurPx = denoise > 0 ? ` blur(${((denoise / 100) * 2).toFixed(1)}px)` : ""
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${blurPx}`
    ctx.translate(effW / 2, effH / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1)
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2)
    applySharpenKernel(ctx, effW, effH, sharpen)
    return c
  }

  const applyCrop = () => {
    if (!cropRect || cropRect.w < 4 || cropRect.h < 4) { setCropRect(null); return }
    const geom = buildGeomCanvas()
    if (!geom) return
    const { scale } = displayRef.current
    const cx = Math.round(cropRect.x / scale)
    const cy = Math.round(cropRect.y / scale)
    const cw = Math.max(1, Math.round(cropRect.w / scale))
    const ch = Math.max(1, Math.round(cropRect.h / scale))
    const c2 = document.createElement("canvas")
    c2.width = cw; c2.height = ch
    c2.getContext("2d")!.drawImage(geom, cx, cy, cw, ch, 0, 0, cw, ch)
    c2.toBlob((blob) => {
      if (!blob) return
      setBaseUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob) })
      loadFromUrl(URL.createObjectURL(blob))
      setCropRect(null)
      setMode("adjust")
      setRotation(0); setFlipH(false); setFlipV(false)
    }, "image/png")
  }

  const download = () => {
    const c = buildExportCanvas()
    if (!c) return
    c.toBlob((blob) => {
      if (!blob) return
      const a = document.createElement("a")
      a.href = URL.createObjectURL(blob)
      a.download = `${(file?.name ?? "image").replace(/\.[^.]+$/, "")}_edited.png`
      a.click()
    }, "image/png")
  }

  // Crop pointer events
  const getCropPos = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    return {
      x: clamp(e.clientX - rect.left, 0, displayRef.current.w),
      y: clamp(e.clientY - rect.top, 0, displayRef.current.h),
    }
  }

  const onCropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const pos = getCropPos(e)
    setCropDragStart(pos)
    setCropRect(null)
  }

  const onCropMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cropDragStart) return
    const pos = getCropPos(e)
    setCropRect({
      x: Math.min(cropDragStart.x, pos.x),
      y: Math.min(cropDragStart.y, pos.y),
      w: Math.abs(pos.x - cropDragStart.x),
      h: Math.abs(pos.y - cropDragStart.y),
    })
  }

  const onCropMouseUp = () => setCropDragStart(null)

  const hasImage = !!imgRef.current
  const isModified = brightness !== 100 || contrast !== 100 || saturation !== 100 || sharpen !== 0 || denoise !== 0 || rotation !== 0 || flipH || flipV

  const ADJUSTMENTS = [
    { label: "Brightness", Icon: Sun, value: brightness, set: setBrightness, min: 0, max: 200, def: 100, unit: "%" },
    { label: "Contrast",   Icon: Contrast, value: contrast, set: setContrast, min: 0, max: 200, def: 100, unit: "%" },
    { label: "Saturation", Icon: Droplets, value: saturation, set: setSaturation, min: 0, max: 200, def: 100, unit: "%" },
  ]

  const ENHANCE = [
    { label: "Sharpen", Icon: Focus, value: sharpen, set: setSharpen, min: 0, max: 100, def: 0, unit: "" },
    { label: "Denoise", Icon: Wind,  value: denoise, set: setDenoise, min: 0, max: 100, def: 0, unit: "" },
  ]

  return (
    <>
      <Navbar />
      <PageCard>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Image Editor</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Crop, rotate, flip, and adjust brightness, contrast & saturation. Runs entirely in your browser.
          </p>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => { handleFiles(Array.from(e.target.files ?? [])); e.target.value = "" }}
        />

        {/* Upload dropzone */}
        {!hasImage && (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDrop(true) }}
            onDragLeave={() => setIsDrop(false)}
            onDrop={(e) => {
              e.preventDefault(); setIsDrop(false)
              handleFiles(Array.from(e.dataTransfer.files))
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-12 text-center transition-colors ${
              isDrop
                ? "border-neutral-400 bg-neutral-50 dark:border-neutral-500 dark:bg-neutral-900"
                : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
            }`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
              <ImageIcon className="h-5 w-5 text-neutral-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Drop an image here, or click to browse
              </p>
              <p className="mt-1 text-xs text-neutral-500">JPG, PNG, WebP, GIF</p>
            </div>
          </div>
        )}

        {hasImage && (
          <div className="space-y-3">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-neutral-100 dark:border-neutral-800 px-3 py-2">
              {/* Mode toggle */}
              <div className="flex overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                {(["adjust", "crop"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); if (m !== "crop") setCropRect(null) }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                      mode === m
                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                        : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {m === "adjust" ? <Sliders className="h-3 w-3" /> : <Crop className="h-3 w-3" />}
                    {m === "adjust" ? "Adjust" : "Crop"}
                  </button>
                ))}
              </div>

              <div className="mx-1 h-5 w-px bg-neutral-200 dark:bg-neutral-700" />

              {/* Rotate */}
              <button onClick={() => rotate(-1)} title="Rotate 90° CCW" className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button onClick={() => rotate(1)} title="Rotate 90° CW" className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <RotateCw className="h-4 w-4" />
              </button>

              {/* Flip */}
              <button
                onClick={() => setFlipH((h) => !h)}
                title="Flip horizontal"
                className={`rounded-lg p-2 transition-colors ${
                  flipH
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                    : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <FlipHorizontal className="h-4 w-4" />
              </button>
              <button
                onClick={() => setFlipV((v) => !v)}
                title="Flip vertical"
                className={`rounded-lg p-2 transition-colors ${
                  flipV
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                    : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <FlipVertical className="h-4 w-4" />
              </button>

              <div className="flex-1" />

              {/* Reset */}
              {isModified && (
                <button onClick={resetAdjustments} title="Reset all" className="rounded-lg p-2 text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-neutral-200">
                  <RefreshCcw className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Change image */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs text-neutral-500 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
              >
                Change
              </button>

              {/* Download */}
              <button
                onClick={download}
                className="flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                <Download className="h-3.5 w-3.5" />
                Save PNG
              </button>
            </div>

            {/* Canvas + crop overlay */}
            <div className="flex justify-center rounded-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden bg-[repeating-conic-gradient(#e5e5e5_0%_25%,white_0%_50%)] dark:bg-[repeating-conic-gradient(#2a2a2a_0%_25%,#1a1a1a_0%_50%)] bg-[length:20px_20px]">
              <div className="relative">
                <canvas ref={canvasRef} className="block" />
                {mode === "crop" && (
                  <div
                    className="absolute inset-0 cursor-crosshair select-none"
                    onMouseDown={onCropMouseDown}
                    onMouseMove={onCropMouseMove}
                    onMouseUp={onCropMouseUp}
                    onMouseLeave={onCropMouseUp}
                  >
                    {cropRect && cropRect.w > 4 && cropRect.h > 4 && (
                      <div
                        style={{
                          position: "absolute",
                          left: cropRect.x,
                          top: cropRect.y,
                          width: cropRect.w,
                          height: cropRect.h,
                          border: "2px solid white",
                          boxShadow: "0 0 0 9999px rgba(0,0,0,0.45)",
                        }}
                      >
                        <span className="absolute -top-1 -left-1 h-2.5 w-2.5 rounded-sm bg-white" />
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-sm bg-white" />
                        <span className="absolute -bottom-1 -left-1 h-2.5 w-2.5 rounded-sm bg-white" />
                        <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-sm bg-white" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Crop action bar */}
            {mode === "crop" && (
              <div className="flex items-center gap-2 rounded-xl border border-neutral-100 dark:border-neutral-800 px-4 py-3">
                <p className="flex-1 text-xs text-neutral-500">
                  {cropRect && cropRect.w > 4 && cropRect.h > 4
                    ? `${Math.round(cropRect.w / displayRef.current.scale)} × ${Math.round(cropRect.h / displayRef.current.scale)} px`
                    : "Drag on the image to select the area to keep"}
                </p>
                {cropRect && cropRect.w > 4 && cropRect.h > 4 && (
                  <>
                    <button onClick={() => setCropRect(null)} className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-neutral-200">
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      onClick={applyCrop}
                      className="flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Apply crop
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Adjustment + Enhance sliders */}
            {mode === "adjust" && (
              <div className="space-y-3">
                {/* Basic adjustments */}
                <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-100 dark:divide-neutral-800 dark:border-neutral-800">
                  {ADJUSTMENTS.map(({ label, Icon, value, set, min, max, def, unit }) => (
                    <div key={label} className="px-4 py-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-neutral-400" />
                          <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-10 text-right text-xs tabular-nums text-neutral-400">{value}{unit}</span>
                          {value !== def && (
                            <button onClick={() => set(def)} className="text-[10px] text-neutral-400 underline hover:text-neutral-600 dark:hover:text-neutral-300">
                              reset
                            </button>
                          )}
                        </div>
                      </div>
                      <input type="range" min={min} max={max} step={1} value={value}
                        onChange={(e) => set(Number(e.target.value))}
                        className="w-full accent-neutral-900 dark:accent-neutral-100" />
                    </div>
                  ))}
                </div>

                {/* Enhance */}
                <div className="rounded-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <Wand2 className="h-3.5 w-3.5 text-neutral-400" />
                      <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Enhance</span>
                    </div>
                    <button
                      onClick={autoEnhance}
                      className="flex items-center gap-1.5 rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
                    >
                      <Wand2 className="h-3 w-3" />
                      Auto enhance
                    </button>
                  </div>
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {ENHANCE.map(({ label, Icon, value, set, min, max, def }) => (
                      <div key={label} className="px-4 py-3">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-3.5 w-3.5 text-neutral-400" />
                            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-6 text-right text-xs tabular-nums text-neutral-400">{value}</span>
                            {value !== def && (
                              <button onClick={() => set(def)} className="text-[10px] text-neutral-400 underline hover:text-neutral-600 dark:hover:text-neutral-300">
                                reset
                              </button>
                            )}
                          </div>
                        </div>
                        <input type="range" min={min} max={max} step={1} value={value}
                          onChange={(e) => set(Number(e.target.value))}
                          className="w-full accent-neutral-900 dark:accent-neutral-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <p className="text-center text-xs text-neutral-400">
              Nothing is uploaded - all edits happen locally in your browser.
            </p>
          </div>
        )}
        <ToolInfo
          heading="Free Online Image Editor — No Download Needed"
          description="Squish is a fast, free image editor that runs entirely in your browser. Crop, rotate, flip, resize, adjust brightness, contrast, saturation and sharpness — all without installing anything or uploading your photos."
          features={[
            { title: "Non-Destructive Editing", body: "Every adjustment is applied in real time so you can see changes instantly. Undo at any step before downloading." },
            { title: "Full Resize Control", body: "Set exact pixel dimensions or scale by percentage. Lock aspect ratio to avoid stretching." },
            { title: "Private by Design", body: "Your photos stay on your device. No cloud, no server — everything happens locally in your browser." },
          ]}
        />
        <FAQ items={[
          { q: "What can I do with the Squish image editor?", a: "You can crop, rotate, flip, resize, adjust brightness, contrast, saturation, sharpness and hue, and apply filters like blur and grayscale — all in your browser with no software to install." },
          { q: "Does it support HEIC and RAW files?", a: "HEIC is supported. RAW files (CR2, NEF, ARW) are not currently supported — convert RAW to JPG first using your camera software." },
          { q: "Are my edits saved anywhere?", a: "No. All edits happen locally in your browser. Download your edited image to save it — there is no account or cloud storage." },
          { q: "Can I undo edits?", a: "Yes. You can reset all adjustments back to the original at any point before downloading." },
        ]} />
        <RelatedTools tools={[
          { href: "/editor",     label: "WebP Converter",      description: "Convert the edited image to WebP for a smaller file size." },
          { href: "/remove-bg",  label: "Remove Background",   description: "Cut out the subject from any photo with AI." },
          { href: "/watermark",  label: "Add Watermark",       description: "Overlay text or a logo watermark on your image." },
          { href: "/palette",    label: "Color Palette",        description: "Extract the dominant colors from your image." },
        ]} />
      </div>
      </PageCard>
    </>
  )
}
