import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>here is the Signin page</h1>
      <SignIn />
    </div>
  )
}

export default page