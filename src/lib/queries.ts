'use server'
import { useUser } from '@clerk/nextjs'
import { connectDB, db } from './db'
import { User, IUser } from '@/models/user.model'
import { currentUser } from '@clerk/nextjs/server'
import { Agency, IAgency } from '@/models/agency.model'
// Write a query to save the current user's profile from Clerk provider in MongoDB
export const initUser = async (newUser: Partial<IUser>) => {
  const user = await currentUser()
  if (!user) return

  // Find and update or create the user
  try {
    await connectDB()
    const userData = await User.updateOne(
      { email: user.emailAddresses[0].emailAddress }, // Query condition
      {
        ...newUser,
        id: user.id,
        avatar: user.imageUrl,
        name: `${user.firstName} ${user.lastName}`,
      }, // Update data
      { upsert: true } // Create the document if it doesn't exist
    )
    return userData
  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Error updating user')
  }
}
export const getUser = async () => {
  const user = await currentUser()
  if (!user) return

  try {
    await connectDB()
    const userData = await User.findOne({
      email: user.emailAddresses[0].emailAddress,
    })
    return userData
  } catch (error) {
    console.error('Error getting user:', error)
    throw new Error('Error getting user')
  }
}

export const upsertAgency = async (agencyData: Partial<IAgency>) => {
  // if (!agencyData.email) return null

  try {
    console.log("inside the upsertdata", agencyData)
    let agency = await Agency.findOne({_id: agencyData._id})
    if(agency){
      agency = await Agency.findByIdAndUpdate(
        agency._id,
        {$set: agencyData},
        {new: true}
      )
    }else{
      agency = new Agency({
        ...agencyData,
        users:[agencyData.email],
        email:agencyData.email,
        addharcard: agencyData.addharcard,
        photo : agencyData.photo,

      })
      await agency.save()
    }
    return JSON.stringify(agency)
  } catch (error) {
    console.log(error)
  }
}
