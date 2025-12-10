import mongoose, { Document, Schema } from 'mongoose';

// Interface for ComplianceReport document
export interface IComplianceReport extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;

  // Required Document Fields (12 required)
  consentOperatingCopy: string;
  consentEstablishCopy: string;
  environmentalClearance: string;
  plantLayout: string;
  airMonitoring: string;
  waterMonitoring: string;
  etpStpLogbook: string;
  hazardousWasteLogbook: string;
  cteComplianceReport: string;
  safetyAuditReport: string;
  environmentalAudit: string;
  annualReturns: string;

  // Optional Document Fields (3 optional)
  hazardousWasteAuth?: string;
  fireSafety?: string;
  membershipCETP?: string;

  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const ComplianceReportSchema = new Schema<IComplianceReport>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Required Documents
    consentOperatingCopy: {
      type: String,
      required: true,
    },
    consentEstablishCopy: {
      type: String,
      required: true,
    },
    environmentalClearance: {
      type: String,
      required: true,
    },
    plantLayout: {
      type: String,
      required: true,
    },
    airMonitoring: {
      type: String,
      required: true,
    },
    waterMonitoring: {
      type: String,
      required: true,
    },
    etpStpLogbook: {
      type: String,
      required: true,
    },
    hazardousWasteLogbook: {
      type: String,
      required: true,
    },
    cteComplianceReport: {
      type: String,
      required: true,
    },
    safetyAuditReport: {
      type: String,
      required: true,
    },
    environmentalAudit: {
      type: String,
      required: true,
    },
    annualReturns: {
      type: String,
      required: true,
    },

    // Optional Documents
    hazardousWasteAuth: {
      type: String,
      required: false,
    },
    fireSafety: {
      type: String,
      required: false,
    },
    membershipCETP: {
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

export const ComplianceReport =
  mongoose.models.ComplianceReport ||
  mongoose.model<IComplianceReport>('ComplianceReport', ComplianceReportSchema);
