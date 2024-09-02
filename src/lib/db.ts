import mongoose from 'mongoose'
import { DB_NAME } from './constants'

export const connectDB = async () => {
  if ((mongoose.connections[0].readyState) === 1) {
    return
  }
  try {
    const conectionInstant = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    )
    
    console.log(`Connected to database ${conectionInstant.connection.host}}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export const db = connectDB()