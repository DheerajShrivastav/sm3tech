import mongoose, { Document, model, Schema } from 'mongoose'

// Define the IAgency interface and export it
export interface IAgency extends Document {
  name: string,
  email: string,
  addharcard: string,
  photo: string
}

// Define the Agency schema
const AgencySchema = new Schema<IAgency>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    addharcard: {type: String, required: true},
    photo : {type:String }
    // owner should be required
  },
  { timestamps: true }
)

// Create and export the Agency model
export const Agency = mongoose.models?.Agency|| model<IAgency>('Agency', AgencySchema)
