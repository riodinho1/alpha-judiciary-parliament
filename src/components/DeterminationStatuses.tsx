import type { DemoStatus } from '../data/process'

interface DeterminationStatusesProps {
  statuses: DemoStatus[]
}

/** Possible outcomes of the final stage — labelled as demonstration statuses. */
export function DeterminationStatuses({ statuses }: DeterminationStatusesProps) {
  return (
    <div className="panel corner-marks">
      <div className="flex flex-col gap-3 border-b border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <h3 className="font-display text-sm font-medium tracking-[0.2em] text-white uppercase">
          Stage 05 — Possible Determinations
        </h3>
        <p className="inline-flex items-center gap-2.5 self-start border border-sky/40 bg-azure/10 px-3 py-1.5 text-[0.5625rem] font-semibold tracking-[0.26em] text-sky uppercase sm:self-auto">
          <span aria-hidden className="size-1 rotate-45 bg-sky" />
          Statutory Determinations
        </p>
      </div>

      <ul className="grid md:grid-cols-3">
        {statuses.map((status, index) => {
          const Icon = status.icon
          return (
            <li
              key={status.label}
              className={`group flex gap-5 px-6 py-8 transition-colors duration-500 hover:bg-white/[0.025] sm:px-10 ${
                index > 0 ? 'border-t border-line md:border-t-0 md:border-l' : ''
              }`}
            >
              <Icon
                aria-hidden
                strokeWidth={1.4}
                className="mt-0.5 size-6 shrink-0 text-sky transition-[filter] duration-500 group-hover:drop-shadow-[0_0_10px_rgba(25,118,210,0.95)]"
              />
              <div>
                <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-white uppercase">
                  {status.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{status.note}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
