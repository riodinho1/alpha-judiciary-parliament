import { useState, type CSSProperties } from 'react'

interface Mote {
  left: number
  top: number
  size: number
  alpha: number
  blue: boolean
}

interface MoteLayer {
  motes: Mote[]
  /** Seconds to rise one full field-height. */
  rise: number
  /** Seconds per twinkle cycle. */
  twinkle: number
  /** Horizontal drift in pixels, and the seconds one sweep takes. */
  sway: number
  swayDuration: number
  /** Fraction (0–1) of each cycle to start at, so the layers never move in step. */
  phase: number
}

interface ParticleFieldProps {
  className?: string
}

/** Rise speeds in pixels per second — nearest layer first. */
const LAYER_SPEEDS = [9, 5.5, 3]

/** Fewer layers and fewer motes on smaller screens. */
function tierFor(width: number) {
  if (width < 400) return { layers: 1, perLayer: 12 }
  if (width < 768) return { layers: 2, perLayer: 10 }
  if (width < 1280) return { layers: 3, perLayer: 12 }
  return { layers: 3, perLayer: 18 }
}

const random = (min: number, max: number) => min + Math.random() * (max - min)

function createLayers(width: number, height: number): MoteLayer[] {
  const { layers, perLayer } = tierFor(width)
  return Array.from({ length: layers }, (_, index) => ({
    motes: Array.from({ length: perLayer }, () => ({
      left: random(0, 100),
      top: random(0, 100),
      size: Math.round(random(1, 3) * 2) / 2,
      alpha: random(0.15, 0.55),
      blue: Math.random() < 0.45,
    })),
    rise: Math.round(height / LAYER_SPEEDS[index]),
    twinkle: random(8, 13),
    sway: random(8, 16) * (index % 2 === 0 ? 1 : -1),
    swayDuration: random(16, 26),
    phase: Math.random(),
  }))
}

/**
 * Very fine, slow-rising motes of light.
 *
 * The motes are grouped into a few depth layers. Each layer is a sheet twice
 * the height of the field with its motes drawn twice, sliding up by exactly
 * half its height on a loop — a seamless, endless rise. Only `transform` and
 * `opacity` animate, on a handful of elements, so the field runs entirely on
 * the compositor: no script per frame, no repaint.
 */
export function ParticleField({ className = '' }: ParticleFieldProps) {
  const [layers] = useState(() =>
    createLayers(window.innerWidth, Math.max(window.innerHeight, 700)),
  )

  return (
    <div aria-hidden className={`particle-field ${className}`}>
      {layers.map((layer, layerIndex) => (
        <div
          key={layerIndex}
          className="mote-layer"
          style={
            {
              '--mote-sway': `${layer.sway.toFixed(0)}px`,
              animationDuration: `${layer.swayDuration.toFixed(0)}s, ${layer.twinkle.toFixed(1)}s`,
              animationDelay: `${(-layer.swayDuration * layer.phase).toFixed(1)}s, ${(-layer.twinkle * layer.phase).toFixed(1)}s`,
            } as CSSProperties
          }
        >
          <div
            className="mote-sheet"
            style={{
              animationDuration: `${layer.rise}s`,
              animationDelay: `${(-layer.rise * layer.phase).toFixed(0)}s`,
            }}
          >
            {[0, 1].map((copy) =>
              layer.motes.map((mote, moteIndex) => (
                <span
                  key={`${copy}-${moteIndex}`}
                  className="mote"
                  style={{
                    left: `${mote.left.toFixed(2)}%`,
                    top: `${((mote.top + copy * 100) / 2).toFixed(2)}%`,
                    width: mote.size,
                    height: mote.size,
                    background: mote.blue ? '#6fb1f2' : '#fff',
                    opacity: Number(mote.alpha.toFixed(2)),
                  }}
                />
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
