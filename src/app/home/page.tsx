import { connectDB } from '@/lib/db'
import { initUser } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

type Props = {}

const Home = async (props: Props) => {
    connectDB()
    const user = await currentUser()
    
    if (user) {
      await initUser(user) 
    }
  return <div>Home user details are : {[user?.id, user?.emailAddresses[0].emailAddress]}</div>
}

export default Home