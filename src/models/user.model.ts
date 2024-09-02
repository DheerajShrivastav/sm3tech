import mongoose, { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  avatar: string // added to match the schema
  role?: 'Admin' | 'User' | string
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // fixed typo
      trim: true,
    },
    
    avatar: {
      type: String, // cloudinary URL
      required: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
  },
  { timestamps: true }
)

export const User = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema)
