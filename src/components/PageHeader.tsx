import type { CSSProperties, ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  subtitle: string
  children?: ReactNode
}

const rise = (delay: number) => ({ '--rise-delay': `${delay}ms` }) as CSSProperties

/** Title block for the interior pages. */
export function PageHeader({ eyebrow, title, subtitle, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden border-b border-line pt-[8.5rem] pb-14 sm:pt-40 lg:pt-48 lg:pb-20">
      {/* Colonnade of light */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.045)_0,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_9.5rem)] [mask-image:linear-gradient(to_bottom,transparent,#000_30%,transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_55%_80%_at_50%_0%,rgba(25,118,210,0.22),transparent_70%)]"
      />

      <div className="shell">
        <p className="eyebrow hero-rise flex items-center gap-4" style={rise(0)}>
          <span aria-hidden className="h-px w-10 bg-sky/60" />
          {eyebrow}
        </p>
        <h1
          className="hero-rise mt-7 max-w-5xl font-display text-[2rem] leading-[1.1] font-medium tracking-[0.05em] text-balance text-white uppercase sm:text-5xl lg:text-6xl"
          style={rise(70)}
        >
          {title}
        </h1>
        <p
          className="hero-rise mt-6 max-w-2xl font-serif text-xl leading-snug text-mist italic sm:text-2xl"
          style={rise(140)}
        >
          {subtitle}
        </p>
        {children && (
          <div className="hero-rise mt-10" style={rise(210)}>
            {children}
          </div>
        )}
      </div>
    </header>
  )
}
