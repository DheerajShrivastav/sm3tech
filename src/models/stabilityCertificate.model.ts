import mongoose, { Document, Schema } from 'mongoose';

// Interface for StabilityCertificate document
export interface IStabilityCertificate extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;

  // 10 Document Fields
  stabilityCertificate: string;    // Required - Form 1A
  structuralDesign: string;         // Required - Design & Load Calculations
  approvedDrawings: string;         // Required - Building Drawings/Layout
  materialCertificates: string;     // Required - Material Testing Certificates
  inspectionReport: string;         // Required - Engineer's Inspection Report
  selfDeclaration: string;          // Required - Owner/Competent Person's Declaration
  photographs: string;              // Required - Photographs of Structural Elements
  factoryLicenseProof: string;      // Required - Factory License Proof
  directorsList: string;            // Required - List of Directors/Occupiers
  ownershipProof: string;           // Required - Legal Proof of Ownership/Tenancy

  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const StabilityCertificateSchema = new Schema<IStabilityCertificate>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // All 10 documents are required
    stabilityCertificate: {
      type: String,
      required: true,
    },
    structuralDesign: {
      type: String,
      required: true,
    },
    approvedDrawings: {
      type: String,
      required: true,
    },
    materialCertificates: {
      type: String,
      required: true,
    },
    inspectionReport: {
      type: String,
      required: true,
    },
    selfDeclaration: {
      type: String,
      required: true,
    },
    photographs: {
      type: String,
      required: true,
    },
    factoryLicenseProof: {
      type: String,
      required: true,
    },
    directorsList: {
      type: String,
      required: true,
    },
    ownershipProof: {
      type: String,
      required: true,
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

export const StabilityCertificate =
  mongoose.models.StabilityCertificate ||
  mongoose.model<IStabilityCertificate>('StabilityCertificate', StabilityCertificateSchema);
