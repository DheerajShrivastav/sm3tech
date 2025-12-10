import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/models/user.model'
import { currentUser } from '@clerk/nextjs'

export async function GET() {
  try {
    const clerkUser = await currentUser()

    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    // Get current user from DB to check if admin
    const dbUser = await User.findOne({ clerkId: clerkUser.id })

    if (!dbUser || dbUser.role !== 'Admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Fetch all users
    const users = await User.find({})
      .select('_id email name role createdAt')
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      users: JSON.parse(JSON.stringify(users))
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
