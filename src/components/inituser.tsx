import { connectDB } from '@/lib/db'
import { User } from '@/models/user.model'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const InitUser = async () => {
  connectDB()
 const user = await currentUser()
 if (!user) return null

 try {
   const userData = await User.updateOne(
     { email: user.emailAddresses[0].emailAddress },
     {
       id: user.id,
       avatar: user.imageUrl,
     },
     {
       new: true,
       upsert: true,
     }
   )
   return userData
 } catch (error) {
   console.error(error)
   return null
 }
}

export default InitUser