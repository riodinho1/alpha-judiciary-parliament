import {
  AtSign,
  FolderLock,
  Gavel,
  Hash,
  KeyRound,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'

export type FieldName =
  | 'validatorId'
  | 'accessKey'
  | 'membershipNumber'
  | 'email'
  | 'caseProfile'
  | 'membershipStatus'
  | 'boardGrade'

export type FormValues = Record<FieldName, string>

export const EMPTY_VALUES: FormValues = {
  validatorId: '',
  accessKey: '',
  membershipNumber: '',
  email: '',
  caseProfile: '',
  membershipStatus: '',
  boardGrade: '',
}

export type FieldGroupId = 'credentials' | 'record' | 'board'

interface BaseField {
  name: FieldName
  index: string
  label: string
  placeholder: string
  icon: LucideIcon
  group: FieldGroupId
  hint?: string
  /** Layout: span both columns of the form grid on wide screens. */
  wide?: boolean
}

export interface InputField extends BaseField {
  kind: 'text' | 'password' | 'email'
}

export interface SelectField extends BaseField {
  kind: 'select'
  options: string[]
}

export type FieldConfig = InputField | SelectField

export const FIELD_GROUPS: { id: FieldGroupId; numeral: string; title: string }[] = [
  { id: 'credentials', numeral: 'I', title: 'Validator Credentials' },
  { id: 'record', numeral: 'II', title: 'Applicant Record' },
  { id: 'board', numeral: 'III', title: 'Board Assignment' },
]

export const FIELDS: FieldConfig[] = [
  {
    name: 'validatorId',
    index: '01',
    kind: 'text',
    label: 'Validator ID',
    placeholder: 'Enter authorized validator ID',
    icon: ShieldCheck,
    group: 'credentials',
  },
  {
    name: 'accessKey',
    index: '02',
    kind: 'password',
    label: 'Access Key Pass',
    placeholder: 'Enter access key pass',
    icon: KeyRound,
    group: 'credentials',
    hint: 'Statutory authentication pass for authorized review personnel.',
  },
  {
    name: 'membershipNumber',
    index: '03',
    kind: 'text',
    label: 'Alpha Membership Registration Number',
    placeholder: 'e.g. ALPHA-000000',
    icon: Hash,
    group: 'record',
    wide: true,
  },
  {
    name: 'email',
    index: '04',
    kind: 'email',
    label: 'Email Address',
    placeholder: 'applicant@example.com',
    icon: AtSign,
    group: 'record',
  },
  {
    name: 'caseProfile',
    index: '05',
    kind: 'text',
    label: 'Criminal Case Profile No.',
    placeholder: 'e.g. ACP-000000',
    icon: FolderLock,
    group: 'record',
    hint: 'Registered case profile identifier (e.g. ACP-000000).',
  },
  {
    name: 'membershipStatus',
    index: '06',
    kind: 'select',
    label: 'Membership Status',
    placeholder: 'Select membership status',
    icon: UserCheck,
    group: 'board',
    options: ['Active', 'Pending Review', 'Suspended', 'Former Member', 'Probationary Record'],
  },
  {
    name: 'boardGrade',
    index: '07',
    kind: 'select',
    label: 'Grade of Parliamentary Board',
    placeholder: 'Select board grade',
    icon: Gavel,
    group: 'board',
    options: [
      'Preliminary Review Board',
      'Judicial Review Board',
      'Senior Parliamentary Board',
      'Executive Review Chamber',
    ],
  },
]
