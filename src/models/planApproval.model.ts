import mongoose, { Document, model, Schema } from 'mongoose'

// Define the IPlanApproval interface and export it
export interface IPlanApproval extends Document {
  user: typeof mongoose.Schema.ObjectId

  // Required documents
  applicationForm: string
  siteLayout: string
  buildingPlan: string
  machineryLayout: string
  structuralDrawings: string
  ventilationPlan: string
  safetyMeasures: string
  landOwnership: string

  // Optional documents
  soilTest?: string
  environmentClearance?: string
  nabh1approval?: string
  otherDocuments?: string

  status: 'pending' | 'approved' | 'rejected'
}

// Define the PlanApproval schema
const PlanApprovalSchema = new Schema<IPlanApproval>(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },

    // Required documents
    applicationForm: { type: String, required: true },
    siteLayout: { type: String, required: true },
    buildingPlan: { type: String, required: true },
    machineryLayout: { type: String, required: true },
    structuralDrawings: { type: String, required: true },
    ventilationPlan: { type: String, required: true },
    safetyMeasures: { type: String, required: true },
    landOwnership: { type: String, required: true },

    // Optional documents
    soilTest: { type: String },
    environmentClearance: { type: String },
    nabh1approval: { type: String },
    otherDocuments: { type: String },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

// Create and export the PlanApproval model
export const PlanApproval =
  mongoose.models?.PlanApproval || model<IPlanApproval>('PlanApproval', PlanApprovalSchema)
