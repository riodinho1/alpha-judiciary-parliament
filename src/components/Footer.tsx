import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '../data/navigation'
import { InstitutionalLogo } from './InstitutionalLogo'

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line bg-navy-950/80">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky/60 to-transparent" />

      <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-5 text-white">
            <InstitutionalLogo size={64} detailed className="size-12 shrink-0 xs:size-16" />
            <div className="min-w-0">
              <p className="font-display text-xl font-semibold tracking-[0.2em] xs:text-2xl xs:tracking-[0.26em]">
                ALPHAWALES
              </p>
              <p className="mt-2 text-[0.625rem] font-medium tracking-[0.24em] text-muted uppercase xs:text-[0.6875rem] xs:tracking-[0.3em]">
                Alpha Judiciary Parliament
              </p>
            </div>
          </div>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="eyebrow">Navigation</p>
          <ul className="mt-6 space-y-3.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-3 text-sm whitespace-nowrap text-mist transition-colors duration-300 hover:text-white"
                >
                  <span
                    aria-hidden
                    className="h-px w-4 bg-white/25 transition-[width,background-color] duration-300 group-hover:w-7 group-hover:bg-sky"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-5">
          <p className="eyebrow">Institutional Notice</p>
          <p className="mt-6 border-l border-sky/50 pl-5 text-sm leading-relaxed text-muted">
            The Alpha Judiciary Parliament is the formal governing body overseeing case review, judicial assessment, and clemency determinations for AlphaWales.
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="shell flex flex-col gap-3 py-6 text-[0.6875rem] tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AlphaWales · Alpha Judiciary Parliament. All rights reserved.</p>
          <p className="tracking-[0.3em] uppercase">Official Parliamentary Authority</p>
        </div>
      </div>
    </footer>
  )
}
