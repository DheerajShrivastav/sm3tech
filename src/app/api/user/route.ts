import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { connectDB } from '@/lib/db'
import { User } from '@/models/user.model'

export async function GET() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth()
  const user = await clerkClient.users.getUser(userId||'')

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Perform your Route Handler's logic
  await connectDB()
  let userData = await User.findOne({
    email: user.emailAddresses[0].emailAddress,
  })
    .lean()
    .exec()
  return NextResponse.json({ userId, userData }, { status: 200 })
}
export async function POST() {
  return NextResponse.json({ message: 'Hello, world!' })
}
