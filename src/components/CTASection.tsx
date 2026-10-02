import { ArrowRight } from 'lucide-react'
import { Button } from './Button'
import { InstitutionalLogo } from './InstitutionalLogo'
import { Reveal } from './Reveal'

interface CTAAction {
  label: string
  to: string
}

interface CTASectionProps {
  title: string
  primary: CTAAction
  secondary: CTAAction
  tagline?: string
}

export function CTASection({ title, primary, secondary, tagline }: CTASectionProps) {
  return (
    <section aria-labelledby="cta-title" className="relative py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="panel corner-marks relative isolate overflow-hidden px-6 py-16 text-center sm:px-12 lg:py-24">
            {/* Overhead light and watermark seal */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(25,118,210,0.28),transparent_70%)]"
            />
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky to-transparent" />
            <InstitutionalLogo
              size={520}
              detailed
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.045]"
            />

            <InstitutionalLogo size={56} className="mx-auto text-white" />
            <h2
              id="cta-title"
              className="mx-auto mt-8 max-w-3xl font-display text-[1.75rem] leading-tight font-medium tracking-[0.06em] text-balance text-white uppercase sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button to={primary.to} fullWidthOnMobile>
                {primary.label}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button to={secondary.to} variant="secondary" fullWidthOnMobile>
                {secondary.label}
              </Button>
            </div>

            {tagline && (
              <p className="mt-12 text-[0.625rem] font-semibold tracking-[0.3em] text-muted uppercase sm:text-[0.6875rem] sm:tracking-[0.36em]">
                {tagline}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
