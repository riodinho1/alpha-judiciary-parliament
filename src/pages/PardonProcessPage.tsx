import { CTASection } from '../components/CTASection'
import { DeterminationStatuses } from '../components/DeterminationStatuses'
import { PageHeader } from '../components/PageHeader'
import { PardonExplanation } from '../components/PardonExplanation'
import { ProcessDiagram } from '../components/ProcessDiagram'
import { ProcessTimeline } from '../components/ProcessTimeline'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ROUTES } from '../data/navigation'
import { DEMO_STATUSES, PROCESS_STAGES } from '../data/process'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function PardonProcessPage() {
  useDocumentTitle('The Pardon & Review Process')

  return (
    <>
      <PageHeader
        eyebrow="The Process"
        title="The Pardon & Review Process"
        subtitle="From preliminary validation to parliamentary determination."
      />

      <section aria-labelledby="timeline-title" className="py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              id="timeline-title"
              eyebrow="Five Stages"
              title="The Course of a Review"
            />
          </Reveal>

          <Reveal delay={120} className="mt-14 lg:mt-20">
            <ProcessTimeline stages={PROCESS_STAGES} />
          </Reveal>

          <Reveal className="mt-16 lg:mt-24">
            <DeterminationStatuses statuses={DEMO_STATUSES} />
          </Reveal>
        </div>
      </section>

      <PardonExplanation />

      <section aria-labelledby="diagram-title" className="py-24 lg:py-36">
        <div className="shell grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="diagram-title"
              eyebrow="Process Diagram"
              title="From Submission to Determination"
              description="A simplified view of the review sequence, in the order each stage is reached."
            />
          </Reveal>

          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <div className="panel corner-marks relative px-3 py-12 xs:px-5 sm:px-10 sm:py-16">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(25,118,210,0.18),transparent_75%)]"
              />
              <div className="relative">
                <ProcessDiagram stages={PROCESS_STAGES} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Begin a Case Review?"
        primary={{ label: 'Start Case Review', to: ROUTES.caseReview }}
        secondary={{ label: 'Return to Parliament', to: ROUTES.home }}
        tagline="AlphaWales • Alpha Judiciary Parliament"
      />
    </>
  )
}
