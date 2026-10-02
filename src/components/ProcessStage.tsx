import type { ProcessStageData } from '../data/process'

export type StageState = 'upcoming' | 'active' | 'complete'

interface ProcessStageProps {
  stage: ProcessStageData
  state: StageState
  /** Whether the connector leading to the next stage is filled. */
  connectorFilled: boolean
  isLast: boolean
  onActivate: () => void
}

const NODE_STATES: Record<StageState, string> = {
  upcoming: 'border-white/15 bg-navy-900 text-muted',
  complete: 'border-sky/60 bg-navy-800 text-white',
  active:
    'border-sky bg-linear-to-b from-azure to-royal text-white shadow-[0_0_0_6px_rgba(25,118,210,0.16),0_0_36px_-4px_rgba(25,118,210,0.95)]',
}

export function ProcessStage({ stage, state, connectorFilled, isLast, onActivate }: ProcessStageProps) {
  const Icon = stage.icon
  const lit = state !== 'upcoming'

  return (
    <li
      aria-current={state === 'active' ? 'step' : undefined}
      onMouseEnter={onActivate}
      className="group relative flex gap-6 pb-12 last:pb-0 lg:block lg:pr-8 lg:pb-0"
    >
      {/* Connector to the next stage: vertical on small screens, horizontal on large. */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute top-16 bottom-2 left-7 w-px bg-white/10 lg:top-7 lg:right-2 lg:bottom-auto lg:left-16 lg:h-px lg:w-auto"
        >
          <span className={`timeline-fill ${connectorFilled ? 'is-filled' : ''}`} />
        </span>
      )}

      <button
        type="button"
        onClick={onActivate}
        onFocus={onActivate}
        aria-label={`Stage ${stage.number}: ${stage.title}`}
        className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,box-shadow] duration-700 ${NODE_STATES[state]}`}
      >
        {state === 'active' && (
          <span aria-hidden className="pulse-ring absolute inset-0 rounded-full border border-sky" />
        )}
        <Icon aria-hidden className="size-6" strokeWidth={1.4} />
      </button>

      <div className="min-w-0 flex-1 pt-0.5 lg:mt-9 lg:pt-0">
        <p
          className={`flex items-center gap-3 text-[0.6875rem] font-semibold tracking-[0.3em] uppercase transition-colors duration-700 ${
            lit ? 'text-sky' : 'text-muted'
          }`}
        >
          Stage {stage.number}
          <span
            aria-hidden
            className={`size-1 rotate-45 transition-[background-color,box-shadow] duration-700 ${
              state === 'active' ? 'bg-sky shadow-[0_0_10px_2px_rgba(25,118,210,0.95)]' : 'bg-white/20'
            }`}
          />
        </p>
        <h3 className="mt-3 font-display text-lg leading-snug font-medium tracking-[0.08em] text-white uppercase lg:text-[1.0625rem] xl:text-lg">
          {stage.title}
        </h3>
        <p
          className={`mt-3 text-sm leading-relaxed transition-colors duration-700 ${
            state === 'active' ? 'text-mist' : 'text-muted'
          }`}
        >
          {stage.description}
        </p>
      </div>
    </li>
  )
}
