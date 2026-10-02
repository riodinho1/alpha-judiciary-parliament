interface InstitutionalLogoProps {
  /** Rendered size in pixels. */
  size?: number
  className?: string
  /** Adds the outer tick ring — best at larger sizes. */
  detailed?: boolean
  /** Accessible name. Omit when the emblem is decorative. */
  title?: string
}

/**
 * Original AlphaWales emblem: an Alpha whose crossbar is the beam of a pair
 * of scales, set inside a circular seal. Not based on any real insignia.
 */
export function InstitutionalLogo({
  size = 40,
  className,
  detailed = false,
  title,
}: InstitutionalLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <circle cx="32" cy="32" r="30.5" stroke="currentColor" strokeWidth="1" />
      <circle
        cx="32"
        cy="32"
        r="26.5"
        stroke="#6FB1F2"
        strokeOpacity="0.85"
        strokeWidth="0.8"
        strokeDasharray="0.8 3.2"
      />
      {detailed && (
        <circle cx="32" cy="32" r="22.5" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.5" />
      )}
      {/* Alpha */}
      <path
        d="M22 45.5 32 18l10 27.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="miter"
      />
      {/* Scale beam and pans */}
      <path d="M16.5 30h31" stroke="#6FB1F2" strokeWidth="1.5" strokeLinecap="square" />
      <path
        d="M13.2 37.5a3.4 3.4 0 0 0 6.8 0M16.6 30l-3.4 7.5M16.6 30l3.4 7.5M44 37.5a3.4 3.4 0 0 0 6.8 0M47.4 30 44 37.5M47.4 30l3.4 7.5"
        stroke="#6FB1F2"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
