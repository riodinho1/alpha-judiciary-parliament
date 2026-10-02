import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { EMPTY_VALUES, FIELDS, type FieldName, type FormValues } from '../data/caseReview'
import { generateDemoReference } from '../lib/reference'
import { validateAll, type FormErrors } from '../lib/validation'

export type ReviewStatus = 'idle' | 'processing' | 'complete'

const PROCESSING_MS = 2000

/**
 * State for the demonstration case-review form.
 *
 * Everything lives in component memory only: values are never written to
 * storage, the URL, the console, or the network, and they are cleared as soon
 * as the simulated review completes.
 */
export function useCaseReviewForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES)
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [status, setStatus] = useState<ReviewStatus>('idle')
  const [reference, setReference] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const errors = useMemo(() => validateAll(values), [values])

  const visibleErrors = useMemo(() => {
    const shown: FormErrors = {}
    for (const { name } of FIELDS) {
      if (errors[name] && (touched[name] || submitAttempted)) shown[name] = errors[name]
    }
    return shown
  }, [errors, touched, submitAttempted])

  const completedCount = FIELDS.length - Object.keys(errors).length

  const setValue = useCallback((name: FieldName, value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
  }, [])

  const markTouched = useCallback((name: FieldName) => {
    setTouched((current) => (current[name] ? current : { ...current, [name]: true }))
  }, [])

  /** Returns the first invalid field, or null when the simulated review has started. */
  const submit = useCallback((): FieldName | null => {
    if (status !== 'idle') return null
    setSubmitAttempted(true)

    const firstInvalid = FIELDS.find(({ name }) => errors[name])
    if (firstInvalid) return firstInvalid.name

    setStatus('processing')
    timer.current = window.setTimeout(() => {
      // The reference is random — it is not derived from the entered values,
      // which are discarded here.
      setReference(generateDemoReference())
      setValues(EMPTY_VALUES)
      setTouched({})
      setSubmitAttempted(false)
      setStatus('complete')
    }, PROCESSING_MS)

    return null
  }, [errors, status])

  const dismiss = useCallback(() => {
    setStatus('idle')
    setReference(null)
  }, [])

  return {
    values,
    errors,
    visibleErrors,
    touched,
    submitAttempted,
    status,
    reference,
    completedCount,
    total: FIELDS.length,
    setValue,
    markTouched,
    submit,
    dismiss,
  }
}

export type CaseReviewFormState = ReturnType<typeof useCaseReviewForm>
