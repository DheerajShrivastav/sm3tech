import mongoose from 'mongoose'
import { DB_NAME } from './constants'

export const connectDB = async () => {
  if ((mongoose.connections[0].readyState) === 1) {
    return
  }
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error('MONGODB_URI is not set in environment')
    }

    // Connect using the provided URI. For SRV URIs (mongodb+srv) the driver
    // will perform a DNS SRV lookup; ensure your deployment environment allows
    // outbound DNS and that the Atlas cluster name is correct.
    const connString = `${uri.replace(/\/+$/, '')}/${DB_NAME}`
    const conectionInstant = await mongoose.connect(connString)

    // Log only the host (do not print credentials)
    const host = conectionInstant.connection.host || 'unknown-host'
    console.log(`Connected to database host: ${host}`)
  } catch (error) {
    console.error('MongoDB connection error:')
    console.error(error instanceof Error ? error.message : error)

    // Provide guidance for common deployment problems
    console.error('\nTroubleshooting tips:')
    console.error('- Verify MONGODB_URI is set correctly in your deployment environment (e.g., Vercel, Render, Railway).')
    console.error("- If your URI uses 'mongodb+srv', ensure the cluster DNS name is correct and that outbound DNS SRV queries are allowed from your host.")
    console.error('- Confirm your MongoDB Atlas project has the deployment IP allowed in Network Access (or use 0.0.0.0/0 for testing).')
    console.error('- To test DNS resolution locally run: `dig +short SRV _mongodb._tcp.<your-cluster>.mongodb.net`')

    // Rethrow so the platform shows a failing build/logs instead of silent exit
    throw error
  }
}

export const db = connectDB()