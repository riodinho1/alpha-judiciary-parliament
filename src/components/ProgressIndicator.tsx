import { memo } from 'react'
import { Check } from 'lucide-react'

export interface ProgressGroup {
  numeral: string
  label: string
  completed: number
  total: number
}

interface ProgressIndicatorProps {
  completed: number
  total: number
  groups: ProgressGroup[]
}

const pad = (value: number) => String(value).padStart(2, '0')

export const ProgressIndicator = memo(function ProgressIndicator({
  completed,
  total,
  groups,
}: ProgressIndicatorProps) {
  return (
    <div className="panel p-6">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <p id="progress-label" className="eyebrow">
          Review Readiness
        </p>
        <p className="font-display text-2xl leading-none tracking-[0.06em] text-white">
          {pad(completed)}
          <span className="text-base text-muted"> / {pad(total)}</span>
        </p>
      </div>

      <div
        role="progressbar"
        aria-labelledby="progress-label"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
        aria-valuetext={`${completed} of ${total} fields complete`}
        className="mt-5 flex gap-1.5"
      >
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 transition-[background-color,box-shadow] duration-500 ${
              index < completed
                ? 'bg-sky shadow-[0_0_10px_rgba(25,118,210,0.95)]'
                : 'bg-white/10'
            }`}
            style={{ transitionDelay: `${index * 40}ms` }}
          />
        ))}
      </div>

      <ol className="mt-6 space-y-3.5">
        {groups.map((group) => {
          const done = group.completed === group.total
          return (
            <li key={group.label} className="flex items-center gap-4">
              <span
                className={`flex size-7 shrink-0 items-center justify-center border text-[0.625rem] font-semibold transition-[background-color,border-color,color,box-shadow] duration-500 ${
                  done
                    ? 'border-sky bg-azure text-white shadow-[0_0_18px_-4px_rgba(25,118,210,0.95)]'
                    : 'border-white/15 text-muted'
                }`}
              >
                {done ? <Check aria-hidden className="size-3.5" strokeWidth={2.5} /> : group.numeral}
              </span>
              <span
                className={`flex-1 text-xs tracking-[0.14em] uppercase transition-colors duration-500 ${
                  done ? 'text-white' : 'text-muted'
                }`}
              >
                {group.label}
              </span>
              <span className="text-[0.6875rem] text-muted tabular-nums">
                {group.completed}/{group.total}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
})
