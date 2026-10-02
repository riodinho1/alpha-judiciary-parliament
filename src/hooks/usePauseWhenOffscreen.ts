import { useEffect, useRef } from 'react'

/**
 * Pauses every CSS animation inside the element while it is scrolled out of
 * view (via the `.anim-paused` class), so off-screen decoration costs nothing.
 * The class is toggled directly on the node — no React re-render is involved.
 */
export function usePauseWhenOffscreen<T extends Element>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => node.classList.toggle('anim-paused', !entry.isIntersecting),
      { rootMargin: '80px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}
