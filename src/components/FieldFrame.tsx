import type { ReactNode } from 'react'
import { Check, CircleAlert } from 'lucide-react'

interface FieldFrameProps {
  /** id of the control this frame labels. */
  controlId: string
  index: string
  label: string
  hint?: string
  error?: string
  /** Show the confirmed-valid mark beside the label. */
  valid?: boolean
  children: ReactNode
}

export const fieldIds = (controlId: string) => ({
  label: `${controlId}-label`,
  hint: `${controlId}-hint`,
  error: `${controlId}-error`,
})

/** Label, numbered index, hint and error message shared by every form control. */
export function FieldFrame({ controlId, index, label, hint, error, valid, children }: FieldFrameProps) {
  const ids = fieldIds(controlId)

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <label
          id={ids.label}
          htmlFor={controlId}
          className="flex items-baseline gap-3 text-[0.6875rem] leading-snug font-semibold tracking-[0.2em] text-white uppercase"
        >
          <span aria-hidden className="text-[0.625rem] tracking-[0.1em] text-sky">
            {index}
          </span>
          {label}
        </label>
        <span
          aria-hidden
          className={`flex size-4 shrink-0 items-center justify-center rounded-full border border-sky/70 bg-azure/25 text-sky transition-[opacity,transform] duration-300 ${
            valid ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <Check className="size-2.5" strokeWidth={3} />
        </span>
      </div>

      {children}

      <div className="mt-2 min-h-5 text-xs leading-5">
        {error ? (
          <p id={ids.error} className="flex items-start gap-2 text-alert">
            <CircleAlert aria-hidden className="mt-[0.1875rem] size-3.5 shrink-0" />
            {error}
          </p>
        ) : (
          hint && (
            <p id={ids.hint} className="text-muted">
              {hint}
            </p>
          )
        )}
      </div>
    </div>
  )
}

/** Shared visual treatment for text inputs and the select trigger. */
export function controlClasses(invalid: boolean) {
  return [
    'h-13 w-full border bg-navy-950/70 text-base text-white outline-none sm:text-[0.9375rem]',
    'transition-[border-color,box-shadow,background-color] duration-300',
    'truncate placeholder:text-[0.8125rem] placeholder:text-muted/80 disabled:opacity-60 sm:placeholder:text-[0.9375rem]',
    invalid
      ? 'border-alert/70 focus-visible:shadow-[0_0_0_1px_rgba(232,154,154,0.5),0_0_26px_-8px_rgba(232,154,154,0.55)]'
      : 'border-white/[0.12] hover:border-white/25 focus-visible:border-azure focus-visible:bg-navy-950 focus-visible:shadow-[0_0_0_1px_rgba(25,118,210,0.65),0_0_28px_-6px_rgba(25,118,210,0.7)]',
  ].join(' ')
}
