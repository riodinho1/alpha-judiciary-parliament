import type { CSSProperties } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { ROUTES } from '../data/navigation'
import { usePauseWhenOffscreen } from '../hooks/usePauseWhenOffscreen'
import { Button } from './Button'
import { HeroVisual } from './HeroVisual'
import { ParticleField } from './ParticleField'

const rise = (delay: number) => ({ '--rise-delay': `${delay}ms` }) as CSSProperties

const SITTING_STAGES = ['Validation', 'Assessment', 'Consideration']

/** Decorative floating glass card over the illustration — extra-large screens only. */
function HeroDocket() {
  return (
    <div className="hero-rise absolute right-[8%] bottom-[12%] hidden w-64 xl:block" style={rise(600)}>
      <div className="float-soft glass p-5 shadow-[0_30px_60px_-30px_rgba(2,8,18,0.9)]">
        <p className="text-[0.5625rem] font-semibold tracking-[0.3em] text-sky uppercase">
          Parliamentary Sitting
        </p>
        <p className="mt-2 font-display text-sm tracking-[0.14em] text-white uppercase">
          Chamber I — Review Docket
        </p>
        <ol className="mt-4 space-y-2.5">
          {SITTING_STAGES.map((stage, index) => (
            <li key={stage} className="flex items-center gap-3">
              <span className="w-4 text-[0.5625rem] font-semibold tracking-[0.1em] text-muted">
                0{index + 1}
              </span>
              <span className="h-px flex-1 bg-white/10">
                <span
                  className="block h-px bg-sky shadow-[0_0_8px_rgba(25,118,210,0.9)]"
                  style={{ width: `${100 - index * 30}%` }}
                />
              </span>
              <span className="w-24 text-[0.5625rem] tracking-[0.18em] text-mist uppercase">
                {stage}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function HeroSection() {
  const sectionRef = usePauseWhenOffscreen<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-[5.75rem] lg:pt-[6.25rem]"
    >
      {/* Illustration — a crest above the title on small screens, right-hand feature on large. */}
      <div
        aria-hidden
        className="hero-visual-enter pointer-events-none relative -z-10 mt-2 -mb-2 flex h-72 shrink-0 items-center justify-center [container-type:size] sm:h-96 lg:absolute lg:right-[-10%] lg:bottom-0 lg:m-0 lg:h-[calc(100%-5.5rem)] lg:w-[58%] xl:right-[-2%] xl:w-[51%]"
      >
        {/* The largest 10:11 box that fits, so every layer and the docket share one artboard. */}
        <div className="relative aspect-[10/11] w-[min(100cqw,calc(100cqh*10/11))]">
          <HeroVisual className="size-full" />
          <HeroDocket />
        </div>
      </div>

      {/* Left-hand readability veil on large screens */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 hidden w-[62%] bg-linear-to-r from-navy-950 via-navy-950/70 to-transparent lg:block"
      />
      <ParticleField className="-z-10" />

      <div className="shell flex flex-1 flex-col pt-6 pb-12 lg:justify-center lg:py-12">
        <div className="max-w-3xl lg:max-w-[31rem] xl:max-w-3xl">
          <p
            className="hero-rise inline-flex items-center gap-3 border border-white/15 bg-navy-950/75 px-4 py-2.5 text-[0.625rem] font-semibold tracking-[0.3em] text-mist uppercase"
            style={rise(0)}
          >
            <span aria-hidden className="relative flex size-1.5">
              <span className="pulse-ring absolute inset-0 rounded-full bg-sky" />
              <span className="relative size-1.5 rounded-full bg-sky" />
            </span>
            Official Parliamentary Assembly
          </p>

          <h1
            id="hero-title"
            className="hero-rise mt-8 font-display text-[10.5vw] leading-[1.04] font-medium tracking-[0.05em] text-white uppercase sm:text-[2.75rem] sm:whitespace-nowrap md:text-[3.4rem] lg:text-[3.25rem] xl:text-[4.25rem]"
            style={rise(80)}
          >
            <span className="block sm:inline">Alpha</span>{' '}
            <span className="block sm:inline">Judiciary</span>{' '}
            <span className="block bg-linear-to-r from-white via-white to-sky bg-clip-text text-transparent">
              Parliament
            </span>
          </h1>

          <div
            aria-hidden
            className="hero-rise mt-8 flex items-center gap-4"
            style={rise(160)}
          >
            <span className="h-px w-16 bg-linear-to-r from-sky to-transparent" />
            <span className="size-1.5 rotate-45 bg-sky shadow-[0_0_12px_2px_rgba(25,118,210,0.9)]" />
          </div>

          <p
            className="hero-rise mt-7 max-w-2xl font-serif text-2xl leading-snug text-white italic sm:text-[1.75rem]"
            style={rise(220)}
          >
            Independent Review. Parliamentary Consideration. Structured Clemency.
          </p>

          <p
            className="hero-rise mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-pretty text-muted sm:text-base"
            style={rise(300)}
          >
            The Alpha Judiciary Parliament provides a structured framework for the review and
            parliamentary consideration of eligible AlphaWales offender cases. Through a formalized
            review process, submitted cases may undergo validation, assessment and parliamentary
            consideration in accordance with established procedures.
          </p>

          <div
            className="hero-rise mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={rise(380)}
          >
            <Button to={ROUTES.caseReview} fullWidthOnMobile>
              Begin Case Review
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
            <Button to={ROUTES.pardonProcess} variant="secondary" fullWidthOnMobile>
              View Pardon Process
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="shell hero-rise pb-8" style={rise(520)}>
        <a
          href="#institution"
          className="group inline-flex items-center gap-3 text-[0.625rem] font-semibold tracking-[0.3em] text-muted uppercase transition-colors duration-300 hover:text-white"
        >
          <span className="flex size-8 items-center justify-center border border-white/15 transition-colors duration-300 group-hover:border-sky/60">
            <ChevronDown aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
          The Institution
        </a>
      </div>
    </section>
  )
}
