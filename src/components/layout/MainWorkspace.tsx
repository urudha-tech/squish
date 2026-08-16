"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Zap } from "lucide-react"
import { UploadDropzone } from "@/components/upload/UploadDropzone"
import { ConversionSettings } from "@/components/settings/ConversionSettings"
import { UploadQueue } from "@/components/queue/UploadQueue"
import { ResultsCard } from "@/components/results/ResultsCard"
import { DownloadCard } from "@/components/results/DownloadCard"
import { ComparisonPanel } from "@/components/results/ComparisonPanel"
import { useConversionQueue } from "@/hooks/useConversionQueue"
import { useFileIngestion } from "@/hooks/useFileIngestion"
import { useDownload } from "@/hooks/useDownload"
import type { ConversionOptions, ConversionJob } from "@/types/conversion"
import type { IngestedFile } from "@/types/upload"
import { useProcessing } from "@/context/ProcessingContext"

const DEFAULT_OPTIONS: ConversionOptions = {
  quality: 80,
  lossless: false,
  keepMetadata: false,
  targetSizeKb: null,
}

interface MainWorkspaceProps {
  initialFiles?: File[]
  onClose?: () => void
}

export function MainWorkspace({ initialFiles, onClose }: MainWorkspaceProps) {
  const [options, setOptions] = useState<ConversionOptions>(DEFAULT_OPTIONS)
  const [isDownloading, setIsDownloading] = useState(false)
  const [ingestError, setIngestError] = useState<string | null>(null)

  const { state, submit, reset, resubmitAll, hasFiles, getOriginalUrl, completed, total, isDone, progress } =
    useConversionQueue()
  const { ingest } = useFileIngestion()
  const { downloadResult, downloadAll } = useDownload()
  const { setIsProcessing } = useProcessing()

  const isProcessing = total > 0 && !isDone

  useEffect(() => { setIsProcessing(isProcessing) }, [isProcessing, setIsProcessing])

  const startedRef = useRef(false)
  useEffect(() => {
    if (!initialFiles || initialFiles.length === 0 || startedRef.current) return
    startedRef.current = true
    ingest(initialFiles).then((ingested) => {
      if (ingested.length > 0) {
        submit(ingested, optionsRef.current)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const optionsRef = useRef(options)
  optionsRef.current = options
  const pendingReconvertRef = useRef(false)

  // When quality, lossless, or targetSizeKb changes after conversion is done, reconvert.
  // If conversion is still running, set a flag - the isDone effect below picks it up.
  useEffect(() => {
    if (!hasFiles) return
    if (!isDone) { pendingReconvertRef.current = true; return }
    pendingReconvertRef.current = false
    const timer = setTimeout(() => resubmitAll(optionsRef.current), 600)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.quality, options.lossless, options.targetSizeKb])

  // When conversion finishes, fire any reconvert that was queued while it was running
  useEffect(() => {
    if (!isDone || !hasFiles || !pendingReconvertRef.current) return
    pendingReconvertRef.current = false
    const timer = setTimeout(() => resubmitAll(optionsRef.current), 600)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone])

  const handleFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return
      setIngestError(null)
      const ingested = await ingest(files)
      if (ingested.length === 0) {
        setIngestError("No supported images found. The file may contain unsupported formats or be empty.")
        return
      }
      submit(ingested, optionsRef.current)
    },
    [ingest, submit]
  )

  const handleDownload = useCallback(
    (job: ConversionJob) => {
      if (job.result) downloadResult(job.result)
    },
    [downloadResult]
  )

  const handleDownloadAll = useCallback(async () => {
    setIsDownloading(true)
    try {
      const results = completed.map((j) => j.result!).filter(Boolean)
      await downloadAll(results, "converted_webp.zip")
    } finally {
      setIsDownloading(false)
    }
  }, [completed, downloadAll])

  const handleReset = useCallback(() => {
    reset()
    startedRef.current = false
  }, [reset])

  const elapsed =
    state.startedAt && state.completedAt ? state.completedAt - state.startedAt : null

  // No files yet - dropzone only
  if (total === 0) {
    return (
      <div className="mx-auto max-w-2xl py-4 pb-16 sm:py-6 space-y-3">
        <UploadDropzone onFiles={handleFiles} multiple allowFolder />
        {ingestError && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
            {ingestError}
          </p>
        )}
      </div>
    )
  }

  // Files in progress or done - two-column on desktop, stacked on mobile
  return (
    <div className="py-4 pb-16 sm:py-6">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_360px]">

        {/* On mobile: right col renders first via order utilities so queue/results show at top */}

        {/* Left: dropzone → compare → footer actions */}
        <div className="order-2 flex flex-col gap-4 sm:order-1">
          <UploadDropzone
            onFiles={handleFiles}
            multiple
            allowFolder
            disabled={isProcessing}
            className="min-h-[140px] sm:flex-1 sm:min-h-[180px]"
          />

          {ingestError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
              {ingestError}
            </p>
          )}

          <ComparisonPanel
            jobs={state.jobs}
            getOriginalUrl={getOriginalUrl}
          />

          {isDone && (
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-neutral-400 underline-offset-2 hover:text-neutral-600 hover:underline dark:hover:text-neutral-300"
              >
                Convert more images
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-neutral-400 underline-offset-2 hover:text-neutral-600 hover:underline dark:hover:text-neutral-300"
                >
                  Back to home
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right: settings → results → download → file queue */}
        <div className="order-1 flex flex-col gap-3 sm:order-2">
          <ConversionSettings
            options={options}
            onChange={setOptions}
            disabled={isProcessing}
          />

          {isDone && <ResultsCard jobs={state.jobs} elapsed={elapsed} />}

          {isDone && (
            <DownloadCard
              jobs={state.jobs}
              onDownloadAll={handleDownloadAll}
              isDownloading={isDownloading}
            />
          )}

          <UploadQueue
            jobs={state.jobs}
            progress={progress}
            startedAt={state.startedAt}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </div>
  )
}
