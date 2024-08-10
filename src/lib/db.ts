import mongoose from 'mongoose'
import { DB_NAME } from './constants'


export const connectDB = async () => {
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