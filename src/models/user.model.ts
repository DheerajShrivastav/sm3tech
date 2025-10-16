import mongoose, { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
  clerkId: string  // Added Clerk ID for linking
  name: string
  email: string
  avatar: string
  role?: 'Admin' | 'User' | string
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
