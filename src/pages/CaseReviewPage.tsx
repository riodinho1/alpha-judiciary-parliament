import { memo, useCallback, useMemo } from 'react'
import { ShieldAlert } from 'lucide-react'
import { CaseReviewForm, fieldControlId } from '../components/CaseReviewForm'
import { PageHeader } from '../components/PageHeader'
import { ProgressIndicator, type ProgressGroup } from '../components/ProgressIndicator'
import { Reveal } from '../components/Reveal'
import { ReviewModal } from '../components/ReviewModal'
import { FIELDS, FIELD_GROUPS } from '../data/caseReview'
import { useCaseReviewForm } from '../hooks/useCaseReviewForm'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const FIELDS_BY_GROUP = FIELD_GROUPS.map((group) => ({
  group,
  fields: FIELDS.filter((field) => field.group === group.id),
}))

/** Static, so it is rendered once rather than on every keystroke in the form. */
const CaseReviewHeader = memo(function CaseReviewHeader() {
  return (
    <PageHeader
      eyebrow="Preliminary Review"
      title="Case Validation & Review"
      subtitle="Submit the required case identifiers for preliminary review."
    >
      <p
        role="note"
        className="flex max-w-3xl items-start gap-4 border border-sky/35 bg-azure/[0.08] px-5 py-4 text-sm leading-relaxed text-mist"
      >
        <ShieldAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-sky" strokeWidth={1.5} />
        <span>
          <strong className="mr-1 font-semibold tracking-[0.14em] text-white uppercase">
            Demonstration Portal —
          </strong>
          Do not enter real passwords, authentication credentials, or sensitive personal
          information.
        </span>
      </p>
    </PageHeader>
  )
})

export function CaseReviewPage() {
  useDocumentTitle('Case Validation & Review')
  const form = useCaseReviewForm()
  const { errors, dismiss } = form

  // Keyed on the per-group counts, so the indicator only re-renders when a
  // field actually becomes valid or invalid — not on every keystroke.
  const completedKey = FIELDS_BY_GROUP.map(
    ({ fields }) => fields.filter((field) => !errors[field.name]).length,
  ).join(',')

  const groups = useMemo<ProgressGroup[]>(() => {
    const completed = completedKey.split(',').map(Number)
    return FIELDS_BY_GROUP.map(({ group, fields }, index) => ({
      numeral: group.numeral,
      label: group.title,
      total: fields.length,
      completed: completed[index],
    }))
  }, [completedKey])

  const closeModal = useCallback(() => {
    dismiss()
    // Return focus to the start of the (now cleared) form.
    requestAnimationFrame(() => document.getElementById(fieldControlId(FIELDS[0].name))?.focus())
  }, [dismiss])

  return (
    <>
      <CaseReviewHeader />

      <section aria-label="Case review interface" className="py-16 lg:py-24">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 xl:gap-16">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <Reveal>
                <div className="flex items-end justify-between gap-4 lg:block">
                  <h2 className="font-display text-[clamp(2rem,11vw,3rem)] leading-[0.98] font-medium tracking-[0.06em] text-white uppercase sm:text-6xl">
                    Case
                    <br />
                    Review
                  </h2>
                  <p
                    aria-hidden
                    className="font-display text-[clamp(3.25rem,18vw,6.5rem)] leading-[0.8] font-medium text-transparent [-webkit-text-stroke:1px_rgba(111,177,242,0.65)] sm:text-[9rem] lg:mt-8 lg:text-[11rem]"
                  >
                    02
                  </p>
                </div>
                <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
                  Provide demonstration information to simulate the preliminary AlphaWales
                  case-review workflow.
                </p>
              </Reveal>

              <Reveal delay={140} className="mt-10">
                <ProgressIndicator
                  completed={form.completedCount}
                  total={form.total}
                  groups={groups}
                />
              </Reveal>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <CaseReviewForm form={form} />
            </Reveal>
          </div>
        </div>
      </section>

      <ReviewModal open={form.status === 'complete'} reference={form.reference} onClose={closeModal} />
    </>
  )
}
