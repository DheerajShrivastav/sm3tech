import { Document, model, Schema } from 'mongoose'

interface IDocument extends Document {
  title: string
  document: string
  metadata: string
  tags: string[]
}
const DocumentSchema = new Schema(
  {
    name: { type: String, required: true },
    document: { type: String, required: true },
    metadata: { type: String },
    tages: { type: [String] },
    isPublic: { type: Boolean, default: true, required: true },
    isdownloadable: { type: Boolean, default: true, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    agency: { type: Schema.Types.ObjectId, ref: 'Agency' },
  },
  { timestamps: true }
)
const User = model<IDocument>('Document', DocumentSchema)
