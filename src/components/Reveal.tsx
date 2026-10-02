import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  /** Delay in milliseconds — use for staggered entrances. */
  delay?: number
  className?: string
}

/** Fades and slides its children into place the first time they scroll into view. */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
