import mongoose, { Document, model, Schema } from 'mongoose'

// Define the IAgency interface and export it
export interface IAgency extends Document {
  name: string
  email: string
  address: string
  logo: string
  phone: string
  website?: string // Optional fields should be marked as optional
  description?: string
  socialMedia?: string // Optional field
  services?: string
  tags?: string[] // Optional field
  location?: string
  owner: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

// Define the Agency schema
const AgencySchema = new Schema<IAgency>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    logo: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String },
    description: { type: String },
    socialMedia: { type: String }, // Added socialMedia field
    services: { type: String },
    tags: [{ type: String }], // Added tags field as an array of strings
    location: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // owner should be required
  },
  { timestamps: true }
)

// Create and export the Agency model
export const Agency = model<IAgency>('Agency', AgencySchema)
