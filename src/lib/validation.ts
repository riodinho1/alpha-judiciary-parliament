import type { FieldName, FormValues } from '../data/caseReview'

export type FormErrors = Partial<Record<FieldName, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MEMBERSHIP_PATTERN = /^ALPHA-\d{6}$/i
const CASE_PROFILE_PATTERN = /^ACP-\d{6}$/i

/** Local, in-browser validation only. Returns an error message or null. */
export function validateField(name: FieldName, rawValue: string): string | null {
  const value = rawValue.trim()

  switch (name) {
    case 'validatorId':
      if (!value) return 'Enter a demonstration validator ID.'
      if (value.length < 4) return 'Validator ID must be at least 4 characters.'
      return null
    case 'accessKey':
      if (!rawValue) return 'Enter a demonstration access key.'
      if (rawValue.length < 6) return 'Access key must be at least 6 characters.'
      return null
    case 'membershipNumber':
      if (!value) return 'Enter a membership registration number.'
      if (!MEMBERSHIP_PATTERN.test(value)) return 'Use the format ALPHA-000000.'
      return null
    case 'email':
      if (!value) return 'Enter an email address.'
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address.'
      return null
    case 'caseProfile':
      if (!value) return 'Enter a demonstration case profile number.'
      if (!CASE_PROFILE_PATTERN.test(value)) return 'Use the format ACP-000000.'
      return null
    case 'membershipStatus':
      return value ? null : 'Select a membership status.'
    case 'boardGrade':
      return value ? null : 'Select a board grade.'
  }
}

export function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  for (const name of Object.keys(values) as FieldName[]) {
    const message = validateField(name, values[name])
    if (message) errors[name] = message
  }
  return errors
}
