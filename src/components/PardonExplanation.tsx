import { usePauseWhenOffscreen } from '../hooks/usePauseWhenOffscreen'
import { InstitutionalLogo } from './InstitutionalLogo'
import { Reveal } from './Reveal'

const PRINCIPLES = ['Submission', 'Review', 'Determination']

/** Editorial section explaining what a pardon means within the AlphaWales framework. */
export function PardonExplanation() {
  const sectionRef = usePauseWhenOffscreen<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      aria-labelledby="pardon-meaning-title"
      className="relative isolate overflow-hidden border-y border-line bg-navy-950/60 py-24 lg:py-36"
    >
      <InstitutionalLogo
        size={720}
        detailed
        className="spin-slow-desktop pointer-events-none absolute -bottom-72 -left-64 -z-10 text-white opacity-[0.04]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(ellipse_70%_60%_at_100%_50%,rgba(13,71,161,0.3),transparent_70%)]"
      />

      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-4">
            <span aria-hidden className="h-px w-10 bg-sky/60" />
            Framework Note
          </p>
          <h2
            id="pardon-meaning-title"
            className="mt-7 font-display text-4xl leading-[1.1] font-medium tracking-[0.05em] text-balance text-white uppercase sm:text-5xl lg:text-[3.5rem]"
          >
            What does a pardon represent?
          </h2>
        </Reveal>

        <Reveal delay={160} className="lg:col-span-6 lg:col-start-7">
          <div className="border-l border-sky/60 pl-6 sm:pl-10">
            <p className="font-serif text-[1.625rem] leading-[1.32] text-pretty text-white sm:text-[2rem]">
              Within the AlphaWales framework, a pardon represents the conclusion of a
              formal review process in which an eligible case has been considered under the
              applicable criteria.
            </p>
            <p className="mt-8 text-base leading-relaxed text-pretty text-muted sm:text-lg">
              The demonstration illustrates how a structured institutional process could move from
              submission through review and final determination.
            </p>

            <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.6875rem] font-semibold tracking-[0.26em] text-mist uppercase">
              {PRINCIPLES.map((principle, index) => (
                <li key={principle} className="flex items-center gap-5">
                  {index > 0 && <span aria-hidden className="h-px w-8 bg-sky/60" />}
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
