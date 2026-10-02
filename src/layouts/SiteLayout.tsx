import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

/** Fixed, slowly drifting navy backdrop shared by every page. */
function SiteBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-navy-950 via-navy-900 to-navy-800" />
      <div className="backdrop-orb backdrop-orb--a" />
      <div className="backdrop-orb backdrop-orb--b" />
      <div className="backdrop-grid absolute inset-0" />
    </div>
  )
}

export function SiteLayout() {
  const { pathname } = useLocation()

  // Start every route at the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="relative flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-3 focus:text-xs focus:font-semibold focus:tracking-[0.2em] focus:text-navy-950 focus:uppercase"
      >
        Skip to main content
      </a>
      <SiteBackdrop />
      <Navbar />
      <main id="main" key={pathname} tabIndex={-1} className="page-enter flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
