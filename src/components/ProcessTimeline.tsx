import { useEffect, useState } from 'react'
import type { ProcessStageData } from '../data/process'
import { useInView } from '../hooks/useInView'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ProcessStage, type StageState } from './ProcessStage'

interface ProcessTimelineProps {
  stages: ProcessStageData[]
}

const STEP_MS = 2600
const HOLD_MS = 4400

/**
 * Stage-by-stage timeline. Once in view it advances on its own; hovering,
 * focusing or selecting a stage takes over and pauses the progression.
 */
export function ProcessTimeline({ stages }: ProcessTimelineProps) {
  const reducedMotion = usePrefersReducedMotion()
  const { ref, inView: onScreen } = useInView<HTMLOListElement>({ threshold: 0.2, once: false })
  const [started, setStarted] = useState(false)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const last = stages.length - 1

  useEffect(() => {
    if (onScreen) setStarted(true)
  }, [onScreen])

  // The progression only runs while the timeline is actually on screen.
  useEffect(() => {
    if (reducedMotion || !onScreen || paused) return
    const timer = window.setTimeout(
      () => setActive((current) => (current === last ? 0 : current + 1)),
      active === last ? HOLD_MS : STEP_MS,
    )
    return () => window.clearTimeout(timer)
  }, [active, onScreen, paused, reducedMotion, last])

  // Nothing is lit until the timeline first scrolls into view.
  const current = started ? active : -1

  const stateOf = (index: number): StageState =>
    index === current ? 'active' : index < current ? 'complete' : 'upcoming'

  return (
    <ol
      ref={ref}
      aria-label="Stages of the pardon and review process"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`lg:grid lg:grid-cols-5 ${onScreen ? '' : 'anim-paused'}`}
    >
      {stages.map((stage, index) => (
        <ProcessStage
          key={stage.number}
          stage={stage}
          state={stateOf(index)}
          connectorFilled={index < current}
          isLast={index === last}
          onActivate={() => setActive(index)}
        />
      ))}
    </ol>
  )
}
