import type { FormEvent } from 'react'
import { ArrowRight, CircleAlert, LoaderCircle, Lock } from 'lucide-react'
import { FIELDS, FIELD_GROUPS, type FieldName } from '../data/caseReview'
import type { CaseReviewFormState } from '../hooks/useCaseReviewForm'
import { usePauseWhenOffscreen } from '../hooks/usePauseWhenOffscreen'
import { BorderGlint } from './BorderGlint'
import { Button } from './Button'
import { CustomSelect } from './CustomSelect'
import { FormField } from './FormField'
import { InstitutionalLogo } from './InstitutionalLogo'

interface CaseReviewFormProps {
  form: CaseReviewFormState
}

export const fieldControlId = (name: FieldName) => `field-${name}`

export function CaseReviewForm({ form }: CaseReviewFormProps) {
  const processing = form.status === 'processing'
  const errorCount = Object.keys(form.visibleErrors).length
  const showSummary = form.submitAttempted && errorCount > 0
  const percent = Math.round((form.completedCount / form.total) * 100)
  const formRef = usePauseWhenOffscreen<HTMLFormElement>()

  // Handled entirely in the browser: no request is made and nothing is stored.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const firstInvalid = form.submit()
    if (firstInvalid) document.getElementById(fieldControlId(firstInvalid))?.focus()
  }

  return (
    <form
      ref={formRef}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      aria-labelledby="case-form-title"
      aria-busy={processing}
      className="panel-animated corner-marks"
    >
      <BorderGlint />
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line px-6 py-5 sm:px-10">
        <div>
          <p className="text-[0.625rem] font-semibold tracking-[0.3em] text-sky uppercase">
            Form AJP-02 · Demonstration
          </p>
          <h2
            id="case-form-title"
            className="mt-2 font-display text-lg font-medium tracking-[0.12em] text-white uppercase sm:text-xl"
          >
            Preliminary Case Review
          </h2>
        </div>
        <p className="flex items-center gap-2.5 text-[0.625rem] font-semibold tracking-[0.24em] text-muted uppercase">
          <Lock aria-hidden className="size-3.5 text-sky" strokeWidth={1.75} />
          Local session only
        </p>
      </div>

      {/* Completion line */}
      <div aria-hidden className="h-px bg-white/5">
        <div
          className="h-px origin-left bg-sky shadow-[0_0_12px_rgba(25,118,210,0.95)] transition-transform duration-500 ease-expo"
          style={{ transform: `scaleX(${percent / 100})` }}
        />
      </div>

      <fieldset disabled={processing} className="min-w-0 space-y-9 px-6 pt-9 pb-4 sm:px-10">
        <legend className="sr-only">Case identifiers for preliminary review</legend>

        {FIELD_GROUPS.map((group) => (
          <div key={group.id} role="group" aria-labelledby={`group-${group.id}`}>
            <h3
              id={`group-${group.id}`}
              className="flex items-center gap-4 text-[0.6875rem] font-semibold tracking-[0.26em] text-muted uppercase"
            >
              <span aria-hidden className="font-display text-sm tracking-[0.1em] text-sky">
                {group.numeral}
              </span>
              {group.title}
              <span aria-hidden className="h-px flex-1 bg-white/[0.08]" />
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
              {FIELDS.filter((field) => field.group === group.id).map((field) => {
                const id = fieldControlId(field.name)
                const error = form.visibleErrors[field.name]
                const value = form.values[field.name]

                return (
                  <div key={field.name} className={field.wide ? 'md:col-span-2' : ''}>
                    {field.kind === 'select' ? (
                      <CustomSelect
                        id={id}
                        field={field}
                        value={value}
                        error={error}
                        disabled={processing}
                        onChange={form.setValue}
                        onBlur={form.markTouched}
                      />
                    ) : (
                      <FormField
                        id={id}
                        field={field}
                        value={value}
                        error={error}
                        valid={value !== '' && !form.errors[field.name]}
                        onChange={form.setValue}
                        onBlur={form.markTouched}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </fieldset>

      <div className="border-t border-line px-6 py-7 sm:px-10">
        <div aria-live="polite">
          {showSummary && (
            <p className="mb-5 flex items-start gap-3 border border-alert/40 bg-alert/[0.06] px-4 py-3 text-sm text-alert">
              <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
              {errorCount === 1
                ? 'One field requires attention before the review can be initiated.'
                : `${errorCount} fields require attention before the review can be initiated.`}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xs text-xs leading-relaxed text-muted">
            Processed locally within this browser. Nothing entered here is transmitted, logged, or
            stored.
          </p>
          <Button type="submit" disabled={processing} fullWidthOnMobile className="shrink-0">
            {processing ? (
              <>
                <LoaderCircle aria-hidden className="size-4 animate-spin" />
                Processing Review
              </>
            ) : (
              <>
                Initiate Case Review
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Processing overlay. The blur exists only while processing, and only on
          larger screens; the form beneath it is static, so it is computed once. */}
      <div
        role="status"
        aria-live="polite"
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden bg-navy-950/90 text-center transition-opacity duration-300 lg:bg-navy-950/80 ${
          processing ? 'opacity-100 lg:backdrop-blur-sm' : 'pointer-events-none opacity-0'
        }`}
      >
        {processing && (
          <>
            <span aria-hidden className="scan-line">
              <span className="block h-px bg-linear-to-r from-transparent via-sky to-transparent shadow-[0_0_24px_4px_rgba(25,118,210,0.7)]" />
            </span>
            <div className="relative flex size-24 items-center justify-center">
              <span
                aria-hidden
                className="absolute inset-0 animate-spin rounded-full border border-white/10 border-t-sky [animation-duration:1.4s]"
              />
              <InstitutionalLogo size={56} className="text-white" />
            </div>
            <p className="mt-8 font-display text-base tracking-[0.2em] text-white uppercase">
              Processing Demonstration Review
            </p>
            <p className="mt-3 text-xs tracking-[0.14em] text-muted">
              Validating identifiers locally — no data leaves this browser.
            </p>
          </>
        )}
      </div>
    </form>
  )
}
