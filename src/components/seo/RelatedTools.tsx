import Link from "next/link"

export interface RelatedTool {
  href: string
  label: string
  description: string
}

export function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <div className="mt-10 border-t border-neutral-100 dark:border-neutral-900 pt-10 pb-10">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
        Related Tools
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map(({ href, label, description }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-neutral-100 dark:border-neutral-800 px-4 py-4 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors group"
          >
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
              {label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
