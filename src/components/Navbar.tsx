import { useEffect, useState, type CSSProperties } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { NAV_ITEMS, ROUTES } from '../data/navigation'
import { Button } from './Button'
import { InstitutionalLogo } from './InstitutionalLogo'

const MOBILE_MENU_ID = 'mobile-navigation'

export function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    // Leaving the mobile breakpoint closes the menu.
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onBreakpoint = () => desktop.matches && setOpen(false)

    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Persistent demonstration designation */}
      <div className="border-b border-white/5 bg-navy-950">
        <p className="shell flex h-7 items-center justify-center gap-3 text-[0.5625rem] font-medium tracking-[0.24em] whitespace-nowrap text-muted uppercase sm:text-[0.625rem] lg:tracking-[0.3em]">
          <span aria-hidden className="size-1 shrink-0 rotate-45 bg-sky" />
          <span>
            Demonstration concept
            <span className="hidden md:inline"> — not an actual judiciary or government authority</span>
          </span>
          <span aria-hidden className="size-1 shrink-0 rotate-45 bg-sky" />
        </p>
      </div>

      {/* The blur radius stays constant (only the tint changes) and is skipped on
          small screens, where backdrop filters are costly while scrolling. */}
      <div
        className={`relative border-b transition-[background-color,border-color,box-shadow] duration-300 lg:backdrop-blur-md ${
          solid
            ? 'border-line bg-navy-950/[0.97] shadow-[0_20px_50px_-30px_rgba(2,8,18,0.95)] lg:bg-navy-950/80'
            : 'border-white/5 bg-navy-950/70 lg:bg-navy-950/30'
        }`}
      >
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link
            to={ROUTES.home}
            className="group flex items-center gap-3.5 text-white"
            aria-label="AlphaWales — Alpha Judiciary Parliament, home"
          >
            <InstitutionalLogo
              size={40}
              className="transition-[filter] duration-500 group-hover:drop-shadow-[0_0_10px_rgba(25,118,210,0.9)]"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.9375rem] font-semibold tracking-[0.2em] xs:text-[1.0625rem] xs:tracking-[0.26em]">
                ALPHAWALES
              </span>
              <span className="mt-1.5 hidden text-[0.5625rem] font-medium tracking-[0.3em] whitespace-nowrap text-muted uppercase sm:block lg:hidden xl:block">
                Alpha Judiciary Parliament
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === ROUTES.home}
                  className={({ isActive }) =>
                    `group relative block py-2 text-[0.6875rem] font-semibold tracking-[0.24em] whitespace-nowrap uppercase transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-muted hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-sky transition-transform duration-500 ease-expo ${
                          isActive
                            ? 'scale-x-100 shadow-[0_0_12px_1px_rgba(25,118,210,0.95)]'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button to={ROUTES.caseReview} size="md">
                Parliamentary Portal
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Button>
            </div>

            <button
              type="button"
              className="relative flex size-11 items-center justify-center border border-white/15 bg-white/[0.03] text-white transition-colors duration-300 hover:border-sky/60 lg:hidden"
              aria-expanded={open}
              aria-controls={MOBILE_MENU_ID}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <Menu
                aria-hidden
                className={`absolute size-5 transition-[opacity,transform] duration-300 ${
                  open ? 'scale-75 rotate-90 opacity-0' : 'opacity-100'
                }`}
              />
              <X
                aria-hidden
                className={`absolute size-5 transition-[opacity,transform] duration-300 ${
                  open ? 'opacity-100' : 'scale-75 -rotate-90 opacity-0'
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile navigation — an overlay panel animated with opacity and transform only. */}
        <div
          id={MOBILE_MENU_ID}
          inert={!open}
          className={`absolute inset-x-0 top-full max-h-[calc(100svh-5.75rem)] overflow-y-auto border-b border-line bg-navy-950/[0.98] shadow-[0_30px_60px_-30px_rgba(2,8,18,0.95)] transition-[opacity,transform,visibility] duration-300 ease-expo lg:hidden ${
            open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
          }`}
        >
          <div className="shell pt-2 pb-7">
            <ul>
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.to}
                  className={`border-b border-white/[0.07] transition-[opacity,transform] duration-300 ease-expo ${
                    open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                  }`}
                  style={{ transitionDelay: open ? `${40 + index * 40}ms` : '0ms' } as CSSProperties}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === ROUTES.home}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4.5 font-display text-lg tracking-[0.14em] uppercase transition-colors ${
                        isActive ? 'text-white' : 'text-muted hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-baseline gap-4">
                          <span className="font-sans text-[0.625rem] font-semibold tracking-[0.2em] text-sky">
                            0{index + 1}
                          </span>
                          {item.label}
                        </span>
                        <span
                          aria-hidden
                          className={`size-1.5 rotate-45 transition-colors ${
                            isActive ? 'bg-sky shadow-[0_0_10px_2px_rgba(25,118,210,0.9)]' : 'bg-white/15'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div
              className={`mt-6 transition-[opacity,transform] duration-300 ease-expo ${
                open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
              }`}
              style={{ transitionDelay: open ? '160ms' : '0ms' }}
            >
              <Button to={ROUTES.caseReview} size="lg" className="w-full">
                Parliamentary Portal
                <ArrowUpRight aria-hidden className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
