import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/models/user.model'
import { currentUser } from '@clerk/nextjs/server'

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
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

    // Fetch specific user
    const user = await User.findById(params.userId)
      .select('_id email name role createdAt')
      .lean()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      user: JSON.parse(JSON.stringify(user))
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
