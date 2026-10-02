import { memo, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { FieldName, InputField } from '../data/caseReview'
import { FieldFrame, controlClasses, fieldIds } from './FieldFrame'

interface FormFieldProps {
  id: string
  field: InputField
  value: string
  error?: string
  /** Show the confirmed-valid mark. */
  valid: boolean
  onChange: (name: FieldName, value: string) => void
  onBlur: (name: FieldName) => void
}

/**
 * Memoised: with stable handlers, typing in one field re-renders only that field.
 */
export const FormField = memo(function FormField({
  id,
  field,
  value,
  error,
  valid,
  onChange,
  onBlur,
}: FormFieldProps) {
  const [revealed, setRevealed] = useState(false)
  const ids = fieldIds(id)
  const Icon = field.icon
  const isSecret = field.kind === 'password'
  const describedBy = error ? ids.error : field.hint ? ids.hint : undefined

  return (
    <FieldFrame
      controlId={id}
      index={field.index}
      label={field.label}
      hint={field.hint}
      error={error}
      valid={valid}
    >
      <div className="group relative">
        <Icon
          aria-hidden
          strokeWidth={1.5}
          className={`pointer-events-none absolute top-1/2 left-4 size-[1.125rem] -translate-y-1/2 transition-colors duration-200 group-focus-within:text-sky ${
            error ? 'text-alert' : 'text-muted'
          }`}
        />

        {/* No `name` attribute: nothing here is ever serialised or submitted. */}
        <input
          id={id}
          type={isSecret ? (revealed ? 'text' : 'password') : field.kind}
          inputMode={field.kind === 'email' ? 'email' : undefined}
          value={value}
          placeholder={field.placeholder}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-required
          onChange={(event) => onChange(field.name, event.target.value)}
          onBlur={() => onBlur(field.name)}
          className={`peer ${controlClasses(Boolean(error))} pl-12 ${isSecret ? 'pr-12' : 'pr-4'}`}
        />

        {/* Focus underline */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-sky transition-transform duration-300 ease-expo peer-focus-visible:scale-x-100"
        />

        {isSecret && (
          <button
            type="button"
            onClick={() => setRevealed((current) => !current)}
            aria-label={revealed ? 'Hide access key' : 'Show access key'}
            aria-pressed={revealed}
            className="absolute top-1/2 right-1.5 flex size-10 -translate-y-1/2 items-center justify-center text-muted transition-colors duration-200 hover:text-white"
          >
            {revealed ? (
              <EyeOff aria-hidden className="size-[1.125rem]" strokeWidth={1.5} />
            ) : (
              <Eye aria-hidden className="size-[1.125rem]" strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>
    </FieldFrame>
  )
})
