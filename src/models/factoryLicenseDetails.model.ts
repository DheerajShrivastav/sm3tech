import mongoose, { Document, model, Schema } from 'mongoose'
import { string } from 'zod'

// Define the IAgency interface and export it
export interface IFactoryLicenseDetails extends Document {
  user: typeof mongoose.Schema.ObjectId
  manufacturingProcess: string
  industryRegistration: string
  landOwnershipCertificate: string
  detailedProposalOfPollutionControlSystem: string
  previousConsentCopy: string
  fixedAssets: string
  auditedBalanceSheet: string
  visitReport: string
  jvsReport: string
  localBodyNoc: string
  other: string
  companysAuthorizationLetter: string
  panCardCopyOfIndustry: string
  aadhaarCardOrPanCardCopyOfAuthorizedPerson: string
  industryBoardOfResolutionListofDirectors: string
  noIncreaseInPollutionLoadCertificate: string
  environmentClearanceCopyOfExistingProduct: string
  WarningNotice: string
  ShowCauseNotice: string
  ProposedDirections: string
  InterimDirections: string
  ClosureDirections: string
}

const FactoryLicenseDetails = new Schema<IFactoryLicenseDetails>(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    manufacturingProcess: {
      type: String,
      required: true,
    },
    industryRegistration: {
      type: String,
      required: true,
    },
    landOwnershipCertificate: {
      type: String,
      required: true,
    },
    detailedProposalOfPollutionControlSystem: {
      type: String,
      required: true,
    },
    previousConsentCopy: {
      type: String,
      required: true,
    },
    fixedAssets: {
      type: String,
      required: true,
    },
    auditedBalanceSheet: {
      type: String,
      required: true,
    },
    visitReport: {
      type: String,
      required: false,
    },
    jvsReport: {
      type: String,
      required: false,
    },
    localBodyNoc: {
      type: String,
      required: false,
    },
    other: {
      type: String,
      required: false,
    },
    companysAuthorizationLetter: {
      type: String,
      required: false,
    },
    panCardCopyOfIndustry: {
      type: String,
      required: false,
    },
    aadhaarCardOrPanCardCopyOfAuthorizedPerson: {
      type: String,
      required: false,
    },
    industryBoardOfResolutionListofDirectors: {
      type: String,
      required: false,
    },
    noIncreaseInPollutionLoadCertificate: {
      type: String,
      required: false,
    },
    environmentClearanceCopyOfExistingProduct: {
      type: String,
      required: false,
    },
    WarningNotice: {
      type: String,
      required: false,
    },
    ShowCauseNotice: {
      type: String,
      required: false,
    },
    ProposedDirections: {
      type: String,
      required: false,
    },
    InterimDirections: {
      type: String,
      required: false,
    },
    ClosureDirections: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

// Create and export the Agency model
export const Agency =
  mongoose.models?.Agency ||
  model<IFactoryLicenseDetails>('FactoryLicenseDetails', FactoryLicenseDetails)
