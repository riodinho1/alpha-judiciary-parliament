import { FileSearch, Landmark, Scale, type LucideIcon } from 'lucide-react'

export interface Feature {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export const FEATURES: Feature[] = [
  {
    number: '01',
    title: 'Case Review',
    description:
      'Submission details are reviewed against the information provided by the applicant.',
    icon: FileSearch,
  },
  {
    number: '02',
    title: 'Parliamentary Consideration',
    description:
      'Eligible submissions may proceed through a structured parliamentary review stage.',
    icon: Landmark,
  },
  {
    number: '03',
    title: 'Pardon Determination',
    description:
      'Following review, a case may receive a determination according to the framework established by AlphaWales.',
    icon: Scale,
  },
]

export interface Statistic {
  value: string
  label: string
}

/** Illustrative figures only — presented under a "Demonstration Data" label. */
export const STATISTICS: Statistic[] = [
  { value: '01', label: 'Case Review Framework' },
  { value: '03', label: 'Review Stages' },
  { value: '01', label: 'Parliamentary Board' },
  { value: '100%', label: 'Structured Process' },
]
