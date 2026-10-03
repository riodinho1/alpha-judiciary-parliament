import {
  CircleCheck,
  CircleDashed,
  CircleMinus,
  FileText,
  Landmark,
  Scale,
  ShieldCheck,
  Stamp,
  type LucideIcon,
} from 'lucide-react'

export interface ProcessStageData {
  number: string
  title: string
  /** Short label used in the process diagram. */
  shortLabel: string
  description: string
  icon: LucideIcon
}

export const PROCESS_STAGES: ProcessStageData[] = [
  {
    number: '01',
    title: 'Case Submission',
    shortLabel: 'Submission',
    description:
      'The review process begins when the required case information is submitted through the designated review interface.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Identity & Case Validation',
    shortLabel: 'Validation',
    description:
      'Submitted information undergoes an initial validation stage to determine whether the case satisfies the requirements for further consideration.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Judicial Assessment',
    shortLabel: 'Judicial Review',
    description:
      'The case is presented for structured assessment against the applicable review criteria.',
    icon: Scale,
  },
  {
    number: '04',
    title: 'Parliamentary Consideration',
    shortLabel: 'Parliamentary Review',
    description:
      'Eligible cases may proceed to parliamentary consideration, where the relevant review board considers the available case information.',
    icon: Landmark,
  },
  {
    number: '05',
    title: 'Final Determination',
    shortLabel: 'Determination',
    description: 'A determination is recorded following completion of the review process.',
    icon: Stamp,
  },
]

export interface DemoStatus {
  label: string
  note: string
  icon: LucideIcon
}

/** Demonstration outcomes shown beneath the final stage. */
export const DEMO_STATUSES: DemoStatus[] = [
  {
    label: 'Pardon Granted',
    note: 'The case concludes with clemency granted under parliamentary authority.',
    icon: CircleCheck,
  },
  {
    label: 'Further Review',
    note: 'The case is returned to an earlier review board for additional consideration.',
    icon: CircleDashed,
  },
  {
    label: 'Not Eligible',
    note: 'The case does not meet the qualifying criteria of the framework.',
    icon: CircleMinus,
  },
]
