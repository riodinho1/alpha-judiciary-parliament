import type { Feature } from '../data/home'

export function FeatureCard({ number, title, description, icon: Icon }: Feature) {
  return (
    // The hover glow is a pre-painted layer that fades in, so lifting the card
    // animates only `transform` and `opacity`.
    <article className="group relative h-full transition-transform duration-500 ease-expo after:pointer-events-none after:absolute after:inset-0 after:opacity-0 after:shadow-[0_30px_60px_-34px_rgba(25,118,210,0.75)] after:transition-opacity after:duration-500 hover:-translate-y-1.5 hover:after:opacity-100">
      <div className="panel relative h-full overflow-hidden p-8 transition-colors duration-500 group-hover:border-sky/40 sm:p-10">
        {/* Top accent that draws across on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-[0.18] bg-sky transition-transform duration-700 ease-expo group-hover:scale-x-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 -bottom-7 font-display text-[8.5rem] leading-none font-medium text-white/[0.04] transition-colors duration-500 select-none group-hover:text-sky/10"
        >
          {number}
        </span>

        <div className="flex items-center justify-between">
          <span className="flex size-14 items-center justify-center border border-white/15 bg-navy-950/60 text-sky transition-[border-color,box-shadow,color] duration-500 group-hover:border-sky/60 group-hover:text-white group-hover:shadow-[0_0_30px_-8px_rgba(25,118,210,0.95)]">
            <Icon aria-hidden className="size-6" strokeWidth={1.4} />
          </span>
          <span className="text-[0.6875rem] font-semibold tracking-[0.3em] text-muted">
            {number}
          </span>
        </div>

        <h3 className="mt-10 font-display text-xl leading-snug font-medium tracking-[0.1em] text-white uppercase">
          {title}
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{description}</p>
      </div>
    </article>
  )
}
