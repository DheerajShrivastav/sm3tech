import { ReactNode } from 'react'

// SubMenuItem interface
export interface SubMenuItem {
  title: string
  path: string
  icon?: ReactNode
  submenu?: boolean
  subMenuItems?: SubMenuItem[]
}

// SideNavItem interface with optional submenu and subMenuItems
export interface SideNavItem {
  title: string
  path: string
  icon?: ReactNode // Use ReactNode for JSX elements like icons
  submenu?: boolean // Optional submenu flag
  subMenuItems?: SubMenuItem[] // Optional submenu items array
  badge?: number // Optional badge for notifications or counts
}

import { z } from 'zod'

export const factoryLicenseDetailsSchema = z.object({
  manufacturingProcess: z.string().min(1, 'Manufacturing Process is required'),
  industryRegistration: z.string().min(1, 'Industry Registration is required'),
  landOwnershipCertificate: z
    .string()
    .min(1, 'Land Ownership Certificate is required'),
  detailedProposalOfPollutionControlSystem: z
    .string()
    .min(1, 'Detailed Proposal of Pollution Control System is required'),
  previousConsentCopy: z.string().min(1, 'Previous Consent Copy is required'),
  fixedAssets: z.string().min(1, 'Fixed Assets is required'),
  auditedBalanceSheet: z.string().min(1, 'Audited Balance Sheet is required'),
  visitReport: z.string().optional(),
  jvsReport: z.string().optional(),
  localBodyNoc: z.string().optional(),
  other: z.string().optional(),
  companysAuthorizationLetter: z.string().optional(),
  panCardCopyOfIndustry: z.string().optional(),
  aadhaarCardOrPanCardCopyOfAuthorizedPerson: z.string().optional(),
  industryBoardOfResolutionListofDirectors: z.string().optional(),
  noIncreaseInPollutionLoadCertificate: z.string().optional(),
  environmentClearanceCopyOfExistingProduct: z.string().optional(),
  WarningNotice: z.string().optional(),
  ShowCauseNotice: z.string().optional(),
  ProposedDirections: z.string().optional(),
  InterimDirections: z.string().optional(),
  ClosureDirections: z.string().optional(),
})
