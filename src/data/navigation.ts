export interface NavItem {
  label: string
  to: string
}

export const ROUTES = {
  home: '/',
  caseReview: '/case-review',
  pardonProcess: '/pardon-process',
} as const

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Case Review', to: ROUTES.caseReview },
  { label: 'Pardon Process', to: ROUTES.pardonProcess },
]
