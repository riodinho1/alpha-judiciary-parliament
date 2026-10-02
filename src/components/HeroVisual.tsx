const ARTBOARD = '0 0 800 880'
const COLUMN_CENTERS = [170, 262, 354, 446, 538, 630]
const SEAL = { x: 400, y: 350 }

/**
 * Original abstract illustration: a backlit portico in front of a slowly
 * turning circular seal, under faint shafts of blue-white light.
 *
 * It is drawn as a stack of layers on a shared 800 × 880 artboard. Every
 * moving part (halo, light shafts, the two rings) is its own element, so its
 * animation is a compositor-only `transform`/`opacity` change, and the
 * detailed portico — the expensive part to draw — is painted exactly once.
 *
 * The parent must give this element a 10:11 box.
 */
export function HeroVisual({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`relative ${className}`}>
      {/* Atmosphere */}
      <div className="hero-halo breathe" />

      {/* Shafts of light — two layers shimmering out of phase */}
      <svg viewBox={ARTBOARD} fill="none" className="hero-layer ray">
        <defs>
          <linearGradient id="hv-ray-a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16" />
            <stop offset="70%" stopColor="#6FB1F2" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#6FB1F2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="300,-20 372,-20 250,880 60,880" fill="url(#hv-ray-a)" />
        <polygon points="446,-20 520,-20 760,880 560,880" fill="url(#hv-ray-a)" />
      </svg>
      <svg
        viewBox={ARTBOARD}
        fill="none"
        className="hero-layer ray"
        style={{ animationDelay: '-4.5s' }}
      >
        <defs>
          <linearGradient id="hv-ray-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16" />
            <stop offset="70%" stopColor="#6FB1F2" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#6FB1F2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="386,-20 430,-20 470,880 330,880" fill="url(#hv-ray-b)" />
      </svg>

      {/* Outer ring: tick marks and inscription */}
      <svg viewBox="104 54 592 592" fill="none" className="hero-ring hero-ring--outer spin-slow">
        <defs>
          <path
            id="hv-seal-text"
            d={`M ${SEAL.x - 262},${SEAL.y} a 262,262 0 1,1 524,0 a 262,262 0 1,1 -524,0`}
          />
        </defs>
        <circle
          cx={SEAL.x}
          cy={SEAL.y}
          r="292"
          stroke="#6FB1F2"
          strokeOpacity="0.5"
          strokeWidth="6"
          strokeDasharray="1 11.74"
        />
        <text
          fill="#E8EEF5"
          fillOpacity="0.5"
          fontSize="12.5"
          fontFamily="'Cinzel Variable', serif"
          fontWeight="500"
        >
          <textPath href="#hv-seal-text" textLength="1630" lengthAdjust="spacing">
            ALPHA JUDICIARY PARLIAMENT ✦ ALPHAWALES ✦ REVIEW · CONSIDERATION · CLEMENCY ✦
          </textPath>
        </text>
      </svg>

      {/* Inner ring, turning the other way */}
      <svg
        viewBox="174 124 452 452"
        fill="none"
        className="hero-ring hero-ring--inner spin-slow-reverse"
      >
        <circle
          cx={SEAL.x}
          cy={SEAL.y}
          r="222"
          stroke="#6FB1F2"
          strokeOpacity="0.35"
          strokeDasharray="46 12"
        />
        <circle cx={SEAL.x} cy={SEAL.y - 222} r="3.5" fill="#FFFFFF" />
        <circle cx={SEAL.x} cy={SEAL.y + 222} r="3.5" fill="#6FB1F2" />
      </svg>

      {/* Static artwork: fixed seal rings and the portico */}
      <svg
        viewBox={ARTBOARD}
        fill="none"
        className="hero-layer [mask-image:linear-gradient(to_bottom,#000_72%,transparent_100%)]"
      >
        <defs>
          <radialGradient id="hv-backlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6FB1F2" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#1976D2" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#1976D2" stopOpacity="0" />
          </radialGradient>
          <filter id="hv-blur" x="-60%" y="-20%" width="220%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <linearGradient id="hv-shaft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B9D8F8" stopOpacity="0.55" />
            <stop offset="12%" stopColor="#12305A" />
            <stop offset="50%" stopColor="#061426" />
            <stop offset="88%" stopColor="#12305A" />
            <stop offset="100%" stopColor="#6FB1F2" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="hv-stone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16365F" />
            <stop offset="100%" stopColor="#081A30" />
          </linearGradient>
          <linearGradient id="hv-door" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#6FB1F2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1976D2" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="hv-floor" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6FB1F2" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6FB1F2" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Fixed seal rings */}
        <circle cx={SEAL.x} cy={SEAL.y} r="318" stroke="#FFFFFF" strokeOpacity="0.07" />
        <circle cx={SEAL.x} cy={SEAL.y} r="276" stroke="#FFFFFF" strokeOpacity="0.16" />
        <circle cx={SEAL.x} cy={SEAL.y} r="244" stroke="#FFFFFF" strokeOpacity="0.16" />
        <circle cx={SEAL.x} cy={SEAL.y} r="196" stroke="#FFFFFF" strokeOpacity="0.06" />

        {/* Light from within the portico. The blur is static, so it is rasterised once. */}
        <ellipse cx="400" cy="590" rx="270" ry="250" fill="url(#hv-backlight)" />
        <rect x="366" y="452" width="68" height="304" fill="url(#hv-door)" filter="url(#hv-blur)" />
        <rect x="378" y="470" width="44" height="286" fill="url(#hv-door)" />

        {/* Pediment */}
        <path d="M118 332 400 208l282 124Z" fill="url(#hv-stone)" stroke="#FFFFFF" strokeOpacity="0.5" />
        <path d="M176 322 400 224l224 98Z" stroke="#6FB1F2" strokeOpacity="0.4" />
        {/* Emblem in the tympanum */}
        <g stroke="#FFFFFF" strokeLinecap="round">
          <circle cx="400" cy="284" r="24" strokeOpacity="0.75" fill="#061426" />
          <path d="M390 297 400 268l10 29" strokeWidth="2" strokeLinejoin="miter" />
          <path d="M385 281h30" stroke="#6FB1F2" strokeWidth="1.4" />
        </g>

        {/* Entablature */}
        <rect x="118" y="332" width="564" height="14" fill="#16365F" stroke="#FFFFFF" strokeOpacity="0.4" />
        <rect x="132" y="346" width="536" height="34" fill="url(#hv-stone)" stroke="#FFFFFF" strokeOpacity="0.22" />
        <text
          x="400"
          y="368"
          textAnchor="middle"
          fill="#E8EEF5"
          fillOpacity="0.72"
          fontSize="12"
          fontFamily="'Cinzel Variable', serif"
          fontWeight="600"
          letterSpacing="9"
        >
          ALPHA · JUDICIARY · PARLIAMENT
        </text>
        <rect x="126" y="380" width="548" height="10" fill="#16365F" stroke="#FFFFFF" strokeOpacity="0.3" />

        {/* Colonnade */}
        {COLUMN_CENTERS.map((cx) => (
          <g key={cx}>
            <rect x={cx - 25} y="390" width="50" height="8" fill="#1B3F6E" stroke="#FFFFFF" strokeOpacity="0.35" />
            <rect x={cx - 21} y="398" width="42" height="8" fill="#12305A" stroke="#FFFFFF" strokeOpacity="0.2" />
            <rect x={cx - 17} y="406" width="34" height="338" fill="url(#hv-shaft)" />
            {[-8, 0, 8].map((offset) => (
              <line
                key={offset}
                x1={cx + offset}
                y1="410"
                x2={cx + offset}
                y2="740"
                stroke="#FFFFFF"
                strokeOpacity="0.07"
              />
            ))}
            <rect x={cx - 21} y="744" width="42" height="6" fill="#12305A" stroke="#FFFFFF" strokeOpacity="0.2" />
            <rect x={cx - 25} y="750" width="50" height="6" fill="#1B3F6E" stroke="#FFFFFF" strokeOpacity="0.3" />
          </g>
        ))}

        {/* Steps */}
        <rect x="112" y="756" width="576" height="14" fill="url(#hv-stone)" stroke="#FFFFFF" strokeOpacity="0.3" />
        <rect x="88" y="770" width="624" height="14" fill="url(#hv-stone)" stroke="#FFFFFF" strokeOpacity="0.22" />
        <rect x="60" y="784" width="680" height="16" fill="url(#hv-stone)" stroke="#FFFFFF" strokeOpacity="0.16" />
        <rect x="0" y="800" width="800" height="1.5" fill="url(#hv-floor)" />
      </svg>
    </div>
  )
}
