import mongoose, { Document, Schema } from 'mongoose';

// Interface for SafetyAuditReport document
export interface ISafetyAuditReport extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;

  // Document Field
  auditReport: string; // Required - Completed Safety Audit Report PDF

  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const SafetyAuditReportSchema = new Schema<ISafetyAuditReport>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    auditReport: {
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

export const SafetyAuditReport =
  mongoose.models.SafetyAuditReport ||
  mongoose.model<ISafetyAuditReport>('SafetyAuditReport', SafetyAuditReportSchema);
