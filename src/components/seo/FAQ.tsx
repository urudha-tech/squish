"use client"

import { useState } from "react"
import { JsonLd } from "./JsonLd"
import { ChevronDown } from "lucide-react"

export interface FAQItem {
  q: string
  a: string
}

export function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }

  return (
    <div className="mt-10 border-t border-neutral-100 dark:border-neutral-900 pt-10 pb-10">
      <JsonLd data={schema} />
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
        Frequently Asked Questions
      </h2>
      <dl className="space-y-2">
        {items.map(({ q, a }, i) => (
          <div
            key={i}
            className="rounded-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden"
          >
            <dt>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                aria-expanded={open === i}
              >
                {q}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
            </dt>
            {open === i && (
              <dd className="px-4 pb-4 pt-1 text-sm leading-relaxed text-neutral-500 border-t border-neutral-100 dark:border-neutral-800">
                {a}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </div>
  )
}
