import mongoose, { Document, Schema } from 'mongoose';

// Interface for ConsentToEstablish document
export interface IConsentToEstablish extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;

  // Required Document Fields (14 required)
  applicationForm: string;
  dpr: string;
  sitePlan: string;
  geoMap: string;
  processDescription: string;
  landOwnership: string;
  capitalInvestmentProof: string;
  nocFromAuthority: string;
  industryRegistration: string;
  pollutionControl: string;
  emp: string;
  powerWaterSanction: string;
  boardResolution: string;
  affidavit: string;

  // Optional Document Field
  localApproval?: string;

  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const ConsentToEstablishSchema = new Schema<IConsentToEstablish>(
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
    dpr: {
      type: String,
      required: true,
    },
    sitePlan: {
      type: String,
      required: true,
    },
    geoMap: {
      type: String,
      required: true,
    },
    processDescription: {
      type: String,
      required: true,
    },
    landOwnership: {
      type: String,
      required: true,
    },
    capitalInvestmentProof: {
      type: String,
      required: true,
    },
    nocFromAuthority: {
      type: String,
      required: true,
    },
    industryRegistration: {
      type: String,
      required: true,
    },
    pollutionControl: {
      type: String,
      required: true,
    },
    emp: {
      type: String,
      required: true,
    },
    powerWaterSanction: {
      type: String,
      required: true,
    },
    boardResolution: {
      type: String,
      required: true,
    },
    affidavit: {
      type: String,
      required: true,
    },

    // Optional Document
    localApproval: {
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

export const ConsentToEstablish =
  mongoose.models.ConsentToEstablish ||
  mongoose.model<IConsentToEstablish>('ConsentToEstablish', ConsentToEstablishSchema);
