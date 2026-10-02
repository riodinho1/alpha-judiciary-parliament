import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ShieldCheck, X } from 'lucide-react'
import { BorderGlint } from './BorderGlint'
import { Button } from './Button'

interface ReviewModalProps {
  open: boolean
  reference: string | null
  onClose: () => void
}

/** Matches the exit animation in index.css. */
const EXIT_MS = 180
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ReviewModal({ open, reference, onClose }: ReviewModalProps) {
  const [closing, setClosing] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const exitTimer = useRef<number | undefined>(undefined)

  const requestClose = useCallback(() => {
    setClosing(true)
    window.clearTimeout(exitTimer.current)
    exitTimer.current = window.setTimeout(() => {
      setClosing(false)
      onClose()
    }, EXIT_MS)
  }, [onClose])

  useEffect(() => () => window.clearTimeout(exitTimer.current), [])

  useEffect(() => {
    if (!open) return

    const card = cardRef.current
    card?.querySelector<HTMLElement>('[data-autofocus]')?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Pauses animations behind the dialog, so the blurred backdrop is rendered once.
    document.documentElement.classList.add('is-modal-open')

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        requestClose()
        return
      }
      if (event.key !== 'Tab' || !card) return

      // Keep keyboard focus inside the dialog.
      const focusable = Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement

      if (event.shiftKey && (current === first || !card.contains(current))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (current === last || !card.contains(current))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      document.documentElement.classList.remove('is-modal-open')
    }
  }, [open, requestClose])

  if (!open) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 ${
        closing ? 'modal-closing' : ''
      }`}
    >
      <div
        aria-hidden
        className="modal-backdrop fixed inset-0 bg-navy-950/[0.92] lg:bg-navy-950/85 lg:backdrop-blur-md"
        onClick={requestClose}
      />

      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
        className="modal-card panel-animated corner-marks my-auto w-full max-w-xl"
      >
        <BorderGlint />
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(25,118,210,0.32),transparent_70%)]" />

        <button
          type="button"
          onClick={requestClose}
          aria-label="Close dialog"
          className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center text-muted transition-colors duration-300 hover:text-white"
        >
          <X aria-hidden className="size-5" strokeWidth={1.5} />
        </button>

        <div className="relative px-6 pt-12 pb-8 text-center sm:px-12 sm:pt-14 sm:pb-10">
          <div className="relative mx-auto flex size-20 items-center justify-center">
            <span aria-hidden className="pulse-ring absolute inset-0 rounded-full border border-sky/60" />
            <span aria-hidden className="absolute inset-0 rounded-full border border-sky/50 bg-azure/15 shadow-[0_0_40px_-6px_rgba(25,118,210,0.95)]" />
            <ShieldCheck aria-hidden className="relative size-9 text-white" strokeWidth={1.25} />
          </div>

          <p className="eyebrow mt-8">Demonstration Environment</p>
          <h2
            id="review-modal-title"
            className="mt-4 font-display text-2xl leading-tight font-medium tracking-[0.08em] text-balance text-white uppercase sm:text-[1.75rem]"
          >
            Demonstration Review Initiated
          </h2>
          <p
            id="review-modal-description"
            className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted"
          >
            Your submission has been processed within the demonstration environment. No personal
            credentials or case information have been transmitted.
          </p>

          <div className="mt-8 border border-line bg-navy-950/70 px-3 py-6 sm:px-5">
            <p className="text-[0.625rem] font-semibold tracking-[0.3em] text-muted uppercase">
              Demonstration Reference
            </p>
            <p className="mt-3 font-display text-[clamp(0.95rem,4.6vw,1.875rem)] font-semibold tracking-[0.1em] whitespace-nowrap text-white [text-shadow:0_0_24px_rgba(25,118,210,0.9)] sm:tracking-[0.18em]">
              {reference}
            </p>
            <div aria-hidden className="hairline mx-auto mt-5 w-2/3" />
            <p className="mt-4 text-[0.625rem] font-semibold tracking-[0.2em] text-sky uppercase sm:tracking-[0.26em]">
              Demo Record — Not an Official Case Number
            </p>
          </div>

          <Button onClick={requestClose} data-autofocus className="mt-8 w-full">
            Return to Case Review
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
