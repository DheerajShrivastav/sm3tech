import mongoose, { Document, model, Schema } from 'mongoose'

// Define the IAgency interface and export it
export interface IAgency extends Document {
  user : typeof mongoose.Schema.ObjectId
  occupierDocuments: {
    name: string
    photo: string
    signature: string
  }
  applicantIdProof: {
    electionId?: string
    drivingLicense?: string
    aadharCard?: string
    passport?: string
    panCard?: string
  }
  previousFactoryLicense: {
    previousFactoryLicense?: string
    planApprovalLetter?: string
  }
  privateLimitedCompany?: {
    listOfDirectors?: string
    moa?: string
    boardResolution?: string
    form32?: string
  }
  listOfRawMaterials: {
    listOfRawMaterials?: string
  }
  ownershipDocuments: {
    leaveAndLicenseAgreement?: string
    midcAllotmentLetter?: string
    sevenTwelveExtract?: string
    taxReceipt?: string
  }
  localAuthorityNoC: {
    localAuthorityNoC?: string
    corporationNoC?: string
    grampanchayatNoC?: string
    midcNoC?: string
  }
  mpcbConsent: {
    mpcbConsent?: string
  }
  sketchFactory: {
    sketch?: string
  }
  electricityBill: {
    electricityBill?: string
    loadSanctionletter?: string
  }
  acceptanceLetter: {
    acceptanceLetter?: string
  }
  flowChart: {
    flowChart?: string
  }
  status: 'pending' | 'approved' | 'rejected'
}

// Define the Agency schema
const AgencySchema = new Schema<IAgency>(
  {
    user: { type: mongoose.Schema.ObjectId , ref: 'User', required: true },
    occupierDocuments: {
      name: { type: String, required: true },
      photo: { type: String, required: true },
      signature: { type: String, required: true },
    },
    applicantIdProof: {
      electionId: { type: String },
      drivingLicense: { type: String },
      aadharCard: { type: String },
      passport: { type: String },
      panCard: { type: String },
    },
    previousFactoryLicense: {
      previousFactoryLicense: { type: String },
      planApprovalLetter: { type: String },
    },
    privateLimitedCompany: {
      listOfDirectors: { type: String },
      moa: { type: String },
      boardResolution: { type: String },
      form32: { type: String },
    },
    listOfRawMaterials: {
      listOfRawMaterials: { type: String },
    },
    ownershipDocuments: {
      leaveAndLicenseAgreement: { type: String },
      midcAllotmentLetter: { type: String },
      sevenTwelveExtract: { type: String },
      taxReceipt: { type: String },
    },
    localAuthorityNoC: {
      localAuthorityNoC: { type: String },
      corporationNoC: { type: String },
      grampanchayatNoC: { type: String },
      midcNoC: { type: String },
    },
    mpcbConsent: {
      mpcbConsent: { type: String, required: true },
    },
    sketchFactory: {
      sketch: { type: String },
    },
    electricityBill: {
      electricityBill: { type: String },
      loadSanctionletter: { type: String },
    },
    acceptanceLetter: {
      acceptanceLetter: { type: String },
    },
    flowChart: {
      flowChart: { type: String },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

// Create and export the Agency model
export const Agency =
  mongoose.models?.Agency || model<IAgency>('Agency', AgencySchema)
