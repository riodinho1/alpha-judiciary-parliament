import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  id?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
          <span aria-hidden className="h-px w-10 bg-sky/60" />
          {eyebrow}
          {centered && <span aria-hidden className="h-px w-10 bg-sky/60" />}
        </p>
      )}
      <h2
        id={id}
        className="mt-6 font-display text-[1.75rem] leading-[1.15] font-medium tracking-[0.06em] text-balance text-white uppercase sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
