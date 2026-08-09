"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { PageCard } from "@/components/layout/PageCard"
import { UploadDropzone } from "@/components/upload/UploadDropzone"
import { ToolInfo } from "@/components/layout/ToolInfo"
import { FAQ, type FAQItem } from "@/components/seo/FAQ"
import { RelatedTools, type RelatedTool } from "@/components/seo/RelatedTools"
import { usePendingFiles } from "@/context/FilesContext"

interface Feature {
  title: string
  body: string
}

interface ConverterLandingProps {
  h1: string
  description: string
  toolInfoHeading: string
  toolInfoDescription: string
  features: Feature[]
  faqItems: FAQItem[]
  relatedTools: RelatedTool[]
}

export function ConverterLanding({
  h1,
  description,
  toolInfoHeading,
  toolInfoDescription,
  features,
  faqItems,
  relatedTools,
}: ConverterLandingProps) {
  const router = useRouter()
  const { setPendingFiles } = usePendingFiles()

  const handleFiles = useCallback(
    (files: File[]) => {
      if (files.length === 0) return
      setPendingFiles(files)
      router.push("/editor")
    },
    [setPendingFiles, router],
  )

  return (
    <>
      <Navbar />
      <PageCard>
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{h1}</h1>
            <p className="mt-2 text-sm text-neutral-500">{description}</p>
          </div>
          <UploadDropzone onFiles={handleFiles} multiple />
          <ToolInfo
            heading={toolInfoHeading}
            description={toolInfoDescription}
            features={features}
          />
          <FAQ items={faqItems} />
          <RelatedTools tools={relatedTools} />
        </div>
      </PageCard>
    </>
  )
}
