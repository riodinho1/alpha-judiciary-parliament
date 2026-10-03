import { Button } from '../components/Button'
import { ROUTES } from '../data/navigation'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page Not Found')

  return (
    <section className="shell flex min-h-svh flex-col items-center justify-center pt-28 pb-20 text-center">
      <p
        aria-hidden
        className="font-display text-[7rem] leading-none font-medium text-transparent [-webkit-text-stroke:1px_rgba(111,177,242,0.65)] sm:text-[10rem]"
      >
        404
      </p>
      <h1 className="mt-6 font-display text-2xl font-medium tracking-[0.08em] text-white uppercase sm:text-4xl">
        No Record at This Address
      </h1>
      <p className="mt-5 max-w-md text-muted">
        The requested parliamentary record or document cannot be located. Return to the Parliament to continue.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button to={ROUTES.home}>Return to Parliament</Button>
        <Button to={ROUTES.caseReview} variant="secondary">
          Begin Case Review
        </Button>
      </div>
    </section>
  )
}
