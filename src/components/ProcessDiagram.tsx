import { useEffect, useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ProcessStageData } from '../data/process'
import { useInView } from '../hooks/useInView'

interface ProcessDiagramProps {
  stages: ProcessStageData[]
}

const STEP_MS = 240
const PULSE_STEP_MS = 720

const ROW =
  'grid grid-cols-[1.25rem_3rem_1fr] items-center gap-3 xs:grid-cols-[2rem_3.5rem_1fr] xs:gap-4 sm:grid-cols-[3rem_3.5rem_1fr] sm:gap-6'

/** Vertical flow diagram that draws itself, node by node, when scrolled into view. */
export function ProcessDiagram({ stages }: ProcessDiagramProps) {
  const { ref, inView: onScreen } = useInView<HTMLOListElement>({ threshold: 0.25, once: false })
  const [drawn, setDrawn] = useState(false)
  const last = stages.length - 1

  useEffect(() => {
    if (onScreen) setDrawn(true)
  }, [onScreen])

  return (
    <ol
      ref={ref}
      aria-label="Process flow from submission to determination"
      // Draws itself once; afterwards the pulses only run while on screen.
      className={`diagram ${drawn ? 'is-visible' : ''} ${onScreen ? '' : 'anim-paused'} mx-auto w-full max-w-md`}
    >
      {stages.map((stage, index) => {
        const Icon = stage.icon
        return (
          <li key={stage.number}>
            <div
              className={`diagram-step ${ROW}`}
              style={{ '--step-delay': `${index * STEP_MS}ms` } as CSSProperties}
            >
              <span className="text-right text-[0.6875rem] font-semibold tracking-[0.2em] text-muted">
                {stage.number}
              </span>
              <span className="flex size-12 items-center justify-center rounded-full bg-white text-royal shadow-[0_0_0_6px_rgba(25,118,210,0.18),0_0_36px_-2px_rgba(25,118,210,0.9)] xs:size-14">
                <Icon aria-hidden className="size-5 xs:size-6" strokeWidth={1.5} />
              </span>
              <span className="min-w-0 font-display text-[0.8125rem] font-medium tracking-[0.1em] text-white uppercase xs:text-base xs:tracking-[0.14em] sm:text-lg sm:tracking-[0.16em]">
                {stage.shortLabel}
              </span>
            </div>

            {index < last && (
              <div aria-hidden className={ROW}>
                <span />
                <span className="relative flex h-16 justify-center py-2">
                  <span
                    className="diagram-line relative block h-full w-px bg-linear-to-b from-sky to-azure shadow-[0_0_10px_rgba(25,118,210,0.9)]"
                    style={{ '--step-delay': `${index * STEP_MS + 180}ms` } as CSSProperties}
                  >
                    <span
                      className="diagram-pulse"
                      style={{ '--pulse-delay': `${1600 + index * PULSE_STEP_MS}ms` } as CSSProperties}
                    />
                  </span>
                  <ChevronDown className="absolute bottom-0 size-4 translate-y-0.5 text-sky" strokeWidth={2} />
                </span>
                <span />
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
