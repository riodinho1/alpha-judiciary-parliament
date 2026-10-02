# Alpha Judiciary Parliament — AlphaWales

A three-page **fictional demonstration** website. AlphaWales and the Alpha Judiciary Parliament do not exist; this is a design concept, not a judiciary, government authority, criminal-record system, or legal institution.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Pages

| Route             | Page                         |
| ----------------- | ---------------------------- |
| `/`               | Home                         |
| `/case-review`    | Case Validation & Review     |
| `/pardon-process` | The Pardon & Review Process  |

Routing is client-side (`BrowserRouter`), so a static host needs a fallback that serves `index.html` for unknown paths.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Lucide icons · React Router. Fonts (Cinzel, Cormorant Garamond, Inter) are self-hosted through Fontsource, so the site makes no third-party requests.

## Structure

```text
src/
  components/   Reusable UI (Navbar, HeroSection, CaseReviewForm, ProcessTimeline, …)
  pages/        One component per route
  layouts/      SiteLayout — navbar, footer, backdrop, scroll-to-top
  data/         Copy and configuration (navigation, form fields, process stages)
  hooks/        useCaseReviewForm, useInView, usePauseWhenOffscreen, usePrefersReducedMotion, useDocumentTitle
  lib/          Validation and demo-reference generation
  index.css     Design tokens (@theme) and motion
```

Colours are defined once as tokens in `src/index.css` — deep navy, blue and white only.

## Performance notes

- **Continuous animation is compositor-only.** Everything that loops (hero rings, light shafts, halo, particles, border highlight, diagram pulses) animates only `transform` and `opacity`. Don't add looping animations of `top`/`left`/`width`, gradients, or `box-shadow` — they force layout or repaint on every frame.
- **The hero illustration is layered** (`HeroVisual.tsx`): each moving part is its own element, and the detailed portico is painted once.
- **Particles are CSS** (`ParticleField.tsx`): a few drifting layers rather than a per-frame canvas loop, with fewer layers on small screens.
- **Off-screen sections pause** their animations (`usePauseWhenOffscreen`), and everything behind the dialog pauses while it is open.
- **`backdrop-filter` is desktop-only** (navbar, dialog backdrop). Below 1024px those surfaces are simply more opaque.
- **Fonts**: Latin subset, woff2 only; the three used above the fold are preloaded by a small plugin in `vite.config.ts`.
- **Hosting**: serve `/assets/*` with `Cache-Control: public, max-age=31536000, immutable` (file names are content-hashed). `npm run preview` already does this.

## Data handling

The case-review form is a front-end simulation:

- Validation runs locally; submitting makes **no network request**.
- Values live only in React state and are cleared when the simulated review completes. Nothing is written to `localStorage`, `sessionStorage`, cookies, the URL, or the console.
- Inputs have no `name` attribute, so nothing can be serialised by a native form submit.
- The reference shown in the dialog (`AJDP-DEMO-XXXXXX`) is random and is not derived from what was entered.
- There are no analytics, trackers, or IP lookups.
