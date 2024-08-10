import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db"
import { User, IUser } from "@/models/user.model"
// write a query to save the current user's profile form clerk provider in mongodb

export const initUser = async (newUser: Partial<IUser>) => {
  // Assuming you have a function to get the current user, similar to `currentUser()`
  const user = await currentUser()
  if (!user) return

  // Find and update or create the user
  const userData = await User.updateOne(
    { email: user.emailAddresses[0].emailAddress }, // Query condition
    {
      ...newUser,
      id: user.id,
      avatar: user.imageUrl,
      name: `${user?.firstName} ${user?.lastName}`,
    }, // Update data
    {
      new: true, // Return the updated document
      upsert: true, // Create a new document if one doesn't match the query
    }
  )
  return userData
}
