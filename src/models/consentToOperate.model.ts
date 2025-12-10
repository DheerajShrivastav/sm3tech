import mongoose, { Document, Schema } from 'mongoose';

// Interface for ConsentToOperate document
export interface IConsentToOperate extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;

  // Required Document Fields (11 required)
  applicationForm: string;
  cteCopy: string;
  plantLayout: string;
  productionDetails: string;
  envMonitoringReports: string;
  cteComplianceReport: string;
  etpStpRecords: string;
  wasteDisposal: string;
  waterBalance: string;
  airPollutionControl: string;
  storageDetails: string;

  // Optional Document Fields (4 optional)
  hazardousWasteAuth?: string;
  membershipCertificates?: string;
  fireSafety?: string;
  renewalDocs?: string;

  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const ConsentToOperateSchema = new Schema<IConsentToOperate>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Required Documents
    applicationForm: {
      type: String,
      required: true,
    },
    cteCopy: {
      type: String,
      required: true,
    },
    plantLayout: {
      type: String,
      required: true,
    },
    productionDetails: {
      type: String,
      required: true,
    },
    envMonitoringReports: {
      type: String,
      required: true,
    },
    cteComplianceReport: {
      type: String,
      required: true,
    },
    etpStpRecords: {
      type: String,
      required: true,
    },
    wasteDisposal: {
      type: String,
      required: true,
    },
    waterBalance: {
      type: String,
      required: true,
    },
    airPollutionControl: {
      type: String,
      required: true,
    },
    storageDetails: {
      type: String,
      required: true,
    },

    // Optional Documents
    hazardousWasteAuth: {
      type: String,
      required: false,
    },
    membershipCertificates: {
      type: String,
      required: false,
    },
    fireSafety: {
      type: String,
      required: false,
    },
    renewalDocs: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const ConsentToOperate =
  mongoose.models.ConsentToOperate ||
  mongoose.model<IConsentToOperate>('ConsentToOperate', ConsentToOperateSchema);
